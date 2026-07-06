---
layout: ../../layouts/CheatSheetsLayout.astro

title: "Comment bien gérer les secrets en Docker ?"
description:
  "Mots de passe, tokens, clés d'API : découvrez comment gérer vos secrets en
  Docker sans les exposer dans vos images, vos logs ou votre dépôt Git, avec les
  variables d'environnement, les Docker secrets et BuildKit."

imgAlt:
  Un coffre-fort ancien entrouvert d'où s'échappe une lueur dorée, pixel art
imgSrc: /images/cheatsheets/secrets-docker.webp

author: Thomas
kind: Fiche technique
serie: docker
tags:
  - Production
  - Sécurité
level: Intermédiaire
publishedDate: 24/08/2026
---

On poursuit notre série Docker. Après
[la gestion des réseaux](/fiches/bien-gerer-reseaux-docker/), on s'attaque à un
sujet sensible (au sens propre comme au figuré) : **les secrets**.

Mot de passe de base de données, token d'API, clé privée, identifiants d'un
registry… Toute application un peu sérieuse manipule des informations qu'il ne
faut surtout pas laisser traîner. Et avec Docker, il y a quelques pièges
classiques dans lesquels on tombe presque tous au début.

Le souci, c'est qu'un secret qui fuite ne se rattrape pas. Une fois qu'un mot de
passe s'est retrouvé dans une image publique ou dans l'historique d'un dépôt
Git, on considère qu'il est compromis : il faut le révoquer et en générer un
nouveau. Autant prendre les bons réflexes dès le départ.

Dans cette fiche, on va voir ce qu'il ne faut **jamais** faire, puis les bonnes
méthodes pour gérer vos secrets proprement, du build jusqu'à l'exécution.

---

## Ce qu'il ne faut surtout pas faire

Commençons par les erreurs les plus courantes. Si vous reconnaissez l'une de vos
pratiques ici, pas de panique : on corrige tout ça juste après.

### Écrire un secret en dur dans le Dockerfile

C'est l'erreur numéro un. On est tenté d'écrire :

```dockerfile
# ❌ À NE JAMAIS FAIRE
ENV DB_PASSWORD=super-mot-de-passe
```

<br>

Le problème ? **Ce mot de passe est gravé dans l'image, dans un layer.**
N'importe qui ayant accès à l'image peut le récupérer avec une simple commande
`docker history` ou `docker image inspect`. Et si vous poussez cette image sur
un registry public, votre secret est exposé au monde entier.

### Passer un secret via un ARG au build

On pourrait croire que `ARG` est plus sûr que `ENV` puisqu'il n'existe que
pendant le build. C'est faux : **la valeur reste visible dans l'historique de
l'image**. C'est exactement le même problème.

```dockerfile
# ❌ Visible dans docker history
ARG API_TOKEN
```

### Committer un fichier `.env` dans Git

Le fichier `.env` est très pratique, mais s'il finit dans votre dépôt, tous vos
secrets sont versionnés et accessibles dans l'historique Git… même après
suppression. Pensez toujours à l'ajouter à votre `.gitignore`.

<br>

La règle d'or à retenir : **un secret ne doit jamais se retrouver dans une image
ni dans un dépôt Git**. Voyons maintenant comment faire correctement.

---

## Méthode 1 - Les variables d'environnement à l'exécution

La méthode la plus simple consiste à injecter les secrets **au lancement** du
conteneur, et non au build. Le secret n'est alors jamais stocké dans l'image.

```bash
docker container run -e DB_PASSWORD=super-mot-de-passe mon-api
```

<br>

En Docker Compose, on passe généralement par un fichier `.env` (bien ignoré par
Git !) couplé à la directive `env_file` :

```yaml
services:
  api:
    image: mon-api
    env_file:
      - .env
```

<br>

C'est suffisant pour beaucoup de projets, mais soyons honnêtes sur les limites :
les variables d'environnement restent **visibles** via `docker inspect`, peuvent
fuiter dans les logs ou les rapports d'erreur, et sont héritées par les
processus enfants. Pour des secrets vraiment sensibles, on peut faire mieux.

---

## Méthode 2 - Les Docker secrets

Docker propose un mécanisme dédié : les **secrets**. L'idée est élégante : au
lieu d'exposer le secret dans une variable, Docker le monte sous forme de
fichier dans le conteneur, dans `/run/secrets/`. Ce montage vit en mémoire et
n'apparaît ni dans l'image, ni dans `docker inspect`.

<br>

Voici comment les déclarer dans un `docker-compose.yml` :

```yaml
services:
  api:
    image: mon-api
    secrets:
      - db_password

secrets:
  db_password:
    file: ./db_password.txt
```

<br>

Décryptage :

- on déclare un secret `db_password` dont la valeur est lue depuis un fichier
  local ;
- on l'attache au service `api` ;
- dans le conteneur, le secret est disponible en lecture dans le fichier
  `/run/secrets/db_password`.

<br>

Côté application, il suffit donc de **lire le fichier** plutôt qu'une variable
d'environnement :

```javascript
import { readFileSync } from "node:fs";

const dbPassword = readFileSync("/run/secrets/db_password", "utf-8").trim();
```

<br>

C'est nettement plus sûr. Beaucoup d'images officielles (PostgreSQL, MySQL…)
supportent d'ailleurs une variante `_FILE` de leurs variables, par exemple
`POSTGRES_PASSWORD_FILE`, justement pour pointer vers un secret monté. C'est un
réflexe à prendre : avant d'écrire un mot de passe dans une variable
d'environnement, vérifiez si l'image que vous utilisez ne propose pas déjà une
version `_FILE`.

<br>

> Bon à savoir : les Docker secrets prennent tout leur sens avec **Docker
> Swarm**, où ils sont chiffrés et distribués de façon sécurisée à travers le
> cluster avec `docker secret create`. En Compose simple, ils restent un bon
> moyen d'éviter les variables d'environnement en clair.

---

## Méthode 3 - Les secrets au build avec BuildKit

Parfois, vous avez besoin d'un secret **pendant le build** : par exemple un
token pour télécharger un paquet privé. On a vu qu'`ARG` était une mauvaise
idée. La bonne solution, c'est le système de secrets de **BuildKit**, le moteur
de build moderne de Docker.

```dockerfile
# syntax=docker/dockerfile:1
FROM node:20

RUN --mount=type=secret,id=npm_token \
    NPM_TOKEN=$(cat /run/secrets/npm_token) npm install
```

<br>

Et on lance le build en passant le secret :

```bash
docker build --secret id=npm_token,src=./npm_token.txt .
```

<br>

L'avantage est décisif : le secret est disponible **uniquement le temps de cette
instruction `RUN`** et ne laisse **aucune trace** dans les layers de l'image
finale. C'est la méthode à privilégier dès que vous avez besoin d'un secret au
moment du build.

---

## Tableau récapitulatif

Trois méthodes, trois contextes. Voici comment choisir :

| Méthode                       | Quand l'utiliser                                | Sécurité |
| ----------------------------- | ----------------------------------------------- | -------- |
| **Variables d'environnement** | Projets simples, secrets peu sensibles          | Correcte |
| **Docker secrets**            | Secrets sensibles à l'exécution, contexte Swarm | Bonne    |
| **Secrets BuildKit**          | Secret nécessaire uniquement pendant le build   | Bonne    |

<br>

Dans la pratique, ces méthodes se combinent très bien : on peut très bien
utiliser BuildKit pour récupérer un paquet privé au build, et des Docker secrets
pour injecter le mot de passe de la base à l'exécution. L'important est de
toujours se poser la question : _à quel moment ai-je besoin de ce secret, et qui
pourrait le lire ensuite ?_

---

## Astuce bonus - Pensez aux gestionnaires de secrets

Pour aller plus loin, sachez que dès qu'un projet grossit, on confie souvent les
secrets à un **outil dédié** plutôt qu'à des fichiers. On peut citer :

- **HashiCorp Vault**, la référence open source ;
- **AWS Secrets Manager**, **Google Secret Manager** ou **Azure Key Vault** chez
  les fournisseurs cloud ;
- les **secrets de votre CI/CD** (par exemple les _secrets_ GitHub Actions) pour
  injecter des valeurs au moment du déploiement.

<br>

Ces outils apportent le chiffrement, la rotation automatique des secrets et la
gestion fine des accès. C'est l'étape suivante naturelle quand vos besoins
dépassent le simple fichier monté dans un conteneur.

<hr>

Et voilà ! Vous avez maintenant tout pour gérer vos secrets proprement. Si vous
ne deviez retenir qu'une chose : **un secret ne se met jamais dans une image ni
dans Git**. Pour le reste, choisissez selon votre contexte : variables
d'environnement pour le simple, Docker secrets pour le sensible, BuildKit pour
le build.

Dans la prochaine fiche, on s'attaquera enfin au gros morceau qu'on tease depuis
le début de cette série : **Docker Swarm**. À très vite 😉.

D'ici là, je vous invite :

- [à faire le quiz](/quiz/bien-gerer-secrets-docker) pour valider vos acquis ;
- [à relire la fiche sur les registries Docker](/fiches/presentation-registry-docker/)
  où l'on parlait déjà de tokens d'authentification.

## Ressources

- [La documentation officielle sur les secrets en Compose](https://docs.docker.com/compose/how-tos/use-secrets/)
- [Les secrets BuildKit au build](https://docs.docker.com/build/building/secrets/)
- [docker secret – Référence CLI (Swarm)](https://docs.docker.com/reference/cli/docker/secret/)
- [HashiCorp Vault](https://www.vaultproject.io/)
