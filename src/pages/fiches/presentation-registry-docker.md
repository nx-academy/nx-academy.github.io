---
layout: ../../layouts/CheatSheetsLayout.astro

title: Qu'est-ce qu'un registry Docker?
description: Comprenez ce qu’est un registry Docker, comment publier et récupérer vos images et maîtrisez le workflow build → tag → push → pull → run.

imgAlt: Une installation portuaire où un bateau est en train d'être déchargé de ses conteneurs, pixel art
imgSrc: /images/cheatsheets/registry-docker.webp

author: Thomas
kind: Fiche technique
level: intermédiaire
publishedDate: 06/06/2025
---

<article>

# Qu'est-ce qu'un registry Docker?

![Une installation portuaire où un bateau est en train d'être déchargé de ses conteneurs, pixel art](/images/cheatsheets/registry-docker.webp)

On continue notre série dédiée à Docker avec les registries Docker. Je me suis rendu compte que j'avais abordé ce concept dans le cours sans vraiment faire un chapitre dédié. Cette fiche technique est l'occasion de revenir sur cette notion et de l'approfondir.

On va partir d’un problème simple. Imaginez que vous avez codé un projet en local avec Docker. Déjà, bravo ! Ça veut dire que vous avez un environnement conteneurisé, reproductible et que votre application peut tourner à l’identique chez tout le monde. Mais voilà : votre serveur de production, lui, n’a pas Git d’installé : vous ne pouvez donc pas récupérer le code du projet et lancer la commande `docker image build . -t mon-projet`. Autre point, vous aimeriez pouvoir déployer votre projet avec une image toute prête. Alors comment faire ?

C’est là qu’entrent en jeu les registries Docker. Ces serveurs sont conçus pour stocker, versionner et distribuer des images Docker. Un peu comme GitHub ou GitLab mais pour les conteneurs.

## C'est quoi un registry Docker ?

Un registry Docker correpond un service de stockage et de distribution d’images Docker. Vous pouvez le voir comme l’équivalent de GitHub mais pour les conteneurs. D'ailleurs, GitHub peut héberger des images Docker. On y reviendra un peu plus bas.

Comme pour un repo Git, un registry peut être :

- public, autrement dit, tout le monde peut accéder à vos images ;
- ou privé, ce qui veut dire que vous contrôlez qui a le droit d’y accéder.

<br>

Le plus connu des registries est [Docker Hub](https://hub.docker.com/). C’est d'ailleurs le registry par défaut. Si vous tapez `docker image pull nginx`, Docker va chercher [l’image sur Docker Hub](https://hub.docker.com/_/nginx), même si vous ne le précisez pas.

<br>

Sachez qu'il existe des alternatives à Docker Hub :

- GitHub Container Registry (GHCR) ;
- GitLab Container Registry ;
- Google Container Registry (GCR) ;
- Amazon ECR.

<br>

Il est même possible d'héberger son propre registry Docker directement sur vos serveurs.

---

Avant d’aller plus loin, on va faire un petit détour par la façon dont les images Docker sont nommées et taguées. Vous allez vite comprendre pourquoi on commence par là avant de parler d’authentification.

## Comment fonctionne une image taguée ?

On va partir sur un premier exemple : `ghcr.io/mon-orga/mon-image:1.0.0`. Si vous avez suivi mon cours Docker, et notamment [le chapitre sur les images](/cours/docker-et-docker-compose/chapitres/creation-premier-dockerfile), une partie de cette ligne devrait déjà vous sembler familière.

Décortiquons-la ensemble :

- `ghcr.io` → c’est le nom du registry. Ici, il s’agit de GitHub Container Registry.
- `mon-orga` → c’est le nom de l’organisation ou de l’utilisateur. Par exemple [nx-academy](https://github.com/nx-academy) (organisation) ou [tdimnet](https://github.com/tdimnet) (utilisateur). Par contre, vous ne pouvez pas être les deux en même temps : une image est rattachée soit à un compte perso, soit à une organisation.
- `mon-image` → c’est le nom de l’image. Par exemple : `nx-ai`, `nodejs`, `mon-app`, etc.
- `1.0.0` → c’est le tag, autrement dit la version de l’image. Vous pouvez faire le parallèle avec des versions de Node.js : 20.04, 22.02, etc.

<br>

Voici un autre exemple, cette fois hébergé sur Docker Hub : `tdimnet/php_template-project-with-ci:latest`. Pour votre information, [cette image existe réellement](https://hub.docker.com/repository/docker/tdimnet/php_template-project-with-ci/general). Comme elle est stockée sur Docker Hub, le registry par défaut, je peux me permettre d’omettre le nom du registry dans la commande.

---

Ok, passons maintenant à la suite logique : comment envoyer une image vers un registry et comment la récupérer.

## Pushez et pullez vos images Docker

### Authentifiez-vous sur un registry Docker

Avant d’envoyer vos images dans un registry ou d’en récupérer certaines, notamment si elles sont privées, il faut vous y authentifier. On va prendre l'exemple ici de [Docker Hub](hub.docker.com). Créez votre compte (c'est gratuit) si ce n’est pas déjà fait.

<br>

![La page de création de compte de DockerHub](/images/cheatsheets/screenshot-dockerhub.webp)

<br>

Une fois votre compte crée, ouvrez votre terminal et lancez la commande :

```bash
docker login
```

<br>

Docker vous demande alors :

- votre nom d’utilisateur,
- votre mot de passe (ou token d’accès si vous avez activé la double authentification).

**Point important** : n'oubliez pas de lancer Docker (ou Docker Desktop) sur votre machine avant d'essayer de vous connecter. Si tout se passe bien, vous devriez voir le message suivant :

```bash
Login Succeeded
```

Vous êtes maintenant prêt à pousser vos images dans votre registry Docker.

### Taguez et poussez votre image

Une fois que vous êtes connecté à votre registry, vous pouvez envoyer votre image Docker. Mais avant ça, il y a une étape importante : le tag.

#### Étape 1 – Buildez votre image

Si ce n’est pas déjà fait, commencez par construire votre image localement :

```bash
docker image build . -t monimage:1.0.0
```

Vous venez de créer une image nommée `monimage` en version 1.0.0. Mais pour l’envoyer sur un registry, Docker doit savoir à quel compte ou organisation elle appartient.

<br>

#### Étape 2 – Taguez l’image

Il faut donc re-tagger cette image avec le nom du compte Docker Hub :

```bash
docker image tag monimage monpseudo/monimage:1.0.0
```

Ici, `monpseudo` est votre identifiant Docker Hub (ou le nom de votre organisation).

Pourquoi cette étape est-elle nécessaire ? Parce que Docker utilise ce nom pour savoir où envoyer l’image. Sans ça, il ne peut pas deviner que vous voulez la publier sur `docker.io/monpseudo`.

<br>

#### Étape 3 – Poussez votre image

C’est le moment d’envoyer votre image sur Docker Hub :

```bash
docker push monpseudo/monimage:1.0.0
```

Docker contacte le registry, vérifie vos identifiants (grâce à docker login) et y envoie votre image.

<br>

#### Workflow avec un registry différent que DockerHub (ici, GitHub Container Registry)

<br>

```bash
# Vous taguez avec le nom du registry :
docker image tag monimage ghcr.io/mon-orga/monimage:1.0.0

# Puis vous poussez :
docker push ghcr.io/mon-orga/monimage:1.0.0
```

---

Maintenant que votre image est en ligne, vous pouvez la récupérer depuis n’importe quelle machine. On voit dès maintenant.

### Récupérez votre image

Une fois votre image envoyée sur un registry, vous pouvez la récupérer depuis n’importe quelle machine avec une simple commande `docker image pull`.

<br>

Imaginons que vous ayez envoyé votre image vers Docker Hub sous le nom `monpseudo/monimage`. Voici comment la récupérer et la lancer :

```bash
# Récupère l'image
docker image pull monpseudo/monimage

# Lance le conteneur avec l'image
docker container run monpseudo/monimage
```

<br>

Si vous avez bien suivi la partie sur les tags, vous pouvez aussi ajouter la version souhaitée :

```bash
docker image pull monpseudo/monimage:1.0.0
```

<br>

#### Exemple avec GitHub Container Registry (GHCR)

Même principe, mais cette fois avec une image hébergée sur GHCR :

```bash
docker image pull ghcr.io/mon-orga/monimage:1.0.0
docker container run ghcr.io/mon-orga/monimage:1.0.0
```

**Attention** : Si l’image est privée, vous devrez vous être authentifié avec `docker login ghcr.io` avant d’y accéder.

---

Et voilà. Peu importe l’ordinateur ou le serveur, tant que vous avez Docker installé et accès au registry, vous pouvez récupérer votre image et la lancer.

## Astuce bonus - Changez de registry dans votre `docker-compose.yml`

Quand vous utilisez Docker Compose, vous pouvez très bien spécifier une image provenant d’un registry autre que Docker Hub.

Par exemple, si votre image est stockée sur GitHub Container Registry (GHCR), voici à quoi pourrait ressembler votre `docker-compose.yml` :

```yml
services:
  web:
    image: ghcr.io/mon-orga/monimage:1.0.0
    ports:
      - "3000:3000"
```

<br>

Même logique pour une image stockée sur Docker Hub :

```yml
services:
  api:
    image: monpseudo/monimage:1.0.0
    ports:
      - "8080:8080"
```

<br>

Pensez simplement à vous être authentifié (docker login) si vous travaillez avec une image privée.
Et si vous êtes en CI/CD, vous devrez souvent fournir un token d’accès ou un secret dans vos variables d’environnement pour automatiser tout ça.

<hr>

Maintenant que vous maîtrisez le concept de registry, vous avez entre les mains tout le workflow pour partager et déployer vos images Docker :
<br>
`build → tag → push → pull → run`.

C’est une étape clé dès que vous commencez à travailler en équipe, à déployer sur un serveur ou à automatiser vos déploiements. Et comme pour Git, plus tôt vous prenez l’habitude de publier vos images, mieux c’est.

La suite logique ? Brancher tout ça sur un pipeline CI/CD. Mais ça, on en reparlera 😉. D'ici là, je vous laisse entre [les mains du quiz](/quiz/presentation-registry-docker) pour vérifier que vous avez bien compris ce qu'on vient de voir.

## Ressources

- La documentation officielle sur Docker Hub
- GitHub Container Registry (GHCR)
- Docker push – Référence CLI
- Docker tag – Référence CLI
- Configurer un registry privé Docker

</article>
