---
layout: ../../layouts/CheatSheetsLayout.astro

title: "Docker, Docker Compose et Docker Swarm : quelles différences ?"
description:
  "Comprenez enfin la différence entre Docker, Docker Compose et Docker Swarm.
  Un conteneur, plusieurs conteneurs sur une machine ou une infrastructure
  répartie sur plusieurs serveurs : on démêle tout ça ensemble."

imgAlt:
  Trois bateaux porte-conteneurs de tailles différentes alignés dans un port,
  pixel art
imgSrc: /images/cheatsheets/docker-compose-swarm.webp

author: Thomas
kind: Fiche technique
level: Débutant
publishedDate: 24/06/2026
---

On démarre aujourd'hui une nouvelle série de fiches techniques dédiées à Docker.
Après les volumes, les registries ou encore le multi-stage build, j'ai eu envie
de revenir à un sujet plus fondamental, mais qui revient _tout le temps_ dans
les questions qu'on me pose.

**Docker, Docker Compose, Docker Swarm : c'est quoi la différence ?**

Trois noms qui se ressemblent, trois outils qu'on croise souvent dans les mêmes
tutos, et au final beaucoup de confusion. On parle de la même chose ? Est-ce que
l'un remplace l'autre ? Faut-il les trois pour mettre une application en prod ?

Dans cette fiche, on va clarifier tout ça une bonne fois pour toutes. Et vous
allez voir, une fois qu'on a la bonne image en tête, ça devient limpide.

---

## Pourquoi on les confond aussi souvent ?

Avant d'entrer dans le détail, on va prendre le temps de poser le contexte. Si
ces trois outils prêtent à confusion, c'est pour une bonne raison. **Ils
répondent au même besoin de base (faire tourner des conteneurs) mais à des
échelles différentes**.

<br>

Voici la façon la plus simple de se les représenter :

- **Docker** → je fais tourner **un** conteneur ;
- **Docker Compose** → je fais tourner **plusieurs** conteneurs **sur une seule
  machine** ;
- **Docker Swarm** → je fais tourner **plusieurs** conteneurs **réparti sur
  plusieurs machines**.

<br>

Vous pouvez les voir comme trois zooms successifs : on part d'un conteneur, puis
d'une application complète sur un poste, puis d'une infrastructure distribuée
sur un parc de serveurs. On va dérouler chacun de ces trois niveaux.

---

## Docker = faire tourner un conteneur

Docker, c'est la brique de base. C'est le moteur (on parle du _Docker Engine_)
qui permet de construire des images et de lancer des conteneurs.

<br>

Pour rappel, **une image, c'est un modèle figé** (votre application + tout ce
dont elle a besoin pour tourner). **Un conteneur, c'est une instance vivante de
cette image**. Si ces notions sont encore floues, je vous invite à
[commencer par le cours sur Docker](/cours/docker-et-docker-compose/).

<br>

À ce niveau-là, on travaille avec des commandes unitaires :

```bash
# On récupère une image et on lance un conteneur
docker container run -d -p 8080:80 nginx
```

<br>

Décryptage :

- `-d` lance le conteneur en arrière-plan (mode _detached_) ;
- `-p 8080:80` redirige le port 8080 de votre machine vers le port 80 du
  conteneur ;
- `nginx` est l'image utilisée.

<br>

C'est parfait pour tester une image ou lancer un service isolé. Mais dès que
votre application a besoin de plusieurs conteneurs (un serveur web, une base de
données, un cache Redis…), ça se complique. Vous allez devoir lancer chaque
conteneur à la main, gérer les ports, créer un réseau pour qu'ils communiquent,
re-taper toutes ces commandes à chaque redémarrage… Bref, c'est vite ingérable.

C'est exactement le problème que Docker Compose vient résoudre.

---

## Docker Compose = plusieurs conteneurs sur une machine

Docker Compose permet de décrire **toute votre application dans un seul
fichier** : le fameux `docker-compose.yml`. Au lieu de lancer vos conteneurs un
par un, vous les déclarez une fois et vous démarrez le tout avec une seule
commande.

<br>

Prenons un exemple classique avec une API et sa base de données PostgreSQL.

```yaml
services:
  api:
    image: mon-api:1.0.0
    ports:
      - "3000:3000"
    depends_on:
      - db

  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: exemple
    volumes:
      - pg_data:/var/lib/postgresql/data

volumes:
  pg_data:
```

<br>

Et pour tout lancer :

```bash
docker compose up -d
```

<br>

En une commande, Compose va :

- créer un réseau dédié pour que vos services communiquent entre eux (l'`api`
  peut joindre la base via le nom `db`, tout simplement) ;
- lancer chaque conteneur avec sa config ;
- gérer l'ordre de démarrage avec `depends_on`.

<br>

**C'est l'outil idéal en développement local** et pour des petits déploiements
sur un seul serveur. Vous avez tout sous les yeux, c'est versionné dans Git, et
n'importe qui peut relancer l'environnement complet à l'identique.

<br>

Mais Compose a une limite importante : **tout tourne sur une seule machine**. Si
ce serveur tombe, votre application tombe avec. Et si votre trafic explose, vous
ne pouvez pas répartir la charge sur plusieurs serveurs. C'est là qu'intervient
le dernier niveau : l'orchestration.

---

## Docker Swarm = orchestrer sur plusieurs machines

Docker Swarm, c'est l'orchestrateur intégré à Docker. Son rôle est de gérer un
**cluster**, autrement dit un ensemble de machines (on parle de _nodes_ ou
nœuds) qui travaillent ensemble comme si elles n'en formaient qu'une seule.

<br>

Dans un cluster Swarm, on distingue deux types de nœuds :

- les **managers**, qui orchestrent le cluster et décident où placer les
  conteneurs ;
- les **workers**, qui exécutent les conteneurs qu'on leur confie.

<br>

On initialise un cluster comme ceci :

```bash
# Sur la première machine (le manager)
docker swarm init

# Puis on déploie un service répliqué sur 3 conteneurs
docker service create --name api --replicas 3 -p 3000:3000 mon-api:1.0.0
```

<br>

Ce que Swarm apporte par rapport à Compose :

- **la répartition de charge** : vos 3 répliques sont distribuées sur les
  différentes machines du cluster ;
- **la tolérance aux pannes** : si une machine tombe, Swarm relance
  automatiquement les conteneurs ailleurs ;
- **le scaling** : besoin de plus de puissance ? Une commande suffit pour passer
  de 3 à 10 répliques ;
- **les mises à jour progressives** (_rolling updates_) : on déploie une
  nouvelle version sans coupure de service.

<br>

On entre ici dans le monde de la **production sérieuse** et de la haute
disponibilité. C'est plus puissant, mais aussi plus complexe à mettre en place
et à maintenir.

---

## Tableau récapitulatif

Pour y voir clair en un coup d'œil :

|                           | Docker              | Docker Compose           | Docker Swarm                 |
| ------------------------- | ------------------- | ------------------------ | ---------------------------- |
| **Échelle**               | 1 conteneur         | Plusieurs conteneurs     | Plusieurs machines           |
| **Fichier**               | — (commandes)       | `docker-compose.yml`     | `docker-compose.yml` (stack) |
| **Usage typique**         | Test, service isolé | Dev local, petit serveur | Production, haute dispo      |
| **Répartition de charge** | ❌                  | ❌                       | ✅                           |
| **Tolérance aux pannes**  | ❌                  | ❌                       | ✅                           |
| **Complexité**            | Faible              | Moyenne                  | Élevée                       |

---

## Alors, lequel choisir ?

La bonne nouvelle, c'est que **vous n'avez pas à choisir** : ces trois outils ne
sont pas concurrents, ils se complètent.

<br>

En pratique :

- vous utilisez **Docker** au quotidien dès que vous manipulez des conteneurs ;
- vous utilisez **Docker Compose** pour développer en local et pour la grande
  majorité des projets déployés sur un seul serveur ;
- vous passez à **Docker Swarm** (ou à un orchestrateur comme Kubernetes)
  uniquement quand vous avez un vrai besoin de répartition sur plusieurs
  machines.

<br>

Mon conseil ? **Ne sortez pas l'artillerie lourde trop tôt**. J'ai vu des
équipes monter un cluster Swarm ou Kubernetes pour un projet qui tournait
tranquillement sur une seule machine avec Docker Compose. Résultat : beaucoup de
complexité pour rien. _Simple is better than complex_, comme toujours.

---

## Astuce bonus - Compose et Swarm parlent (presque) le même langage

Voici une chose que peu de gens savent : **Swarm sait lire un fichier
`docker-compose.yml`**. Vous pouvez déployer une stack complète sur votre
cluster avec :

```bash
docker stack deploy -c docker-compose.yml mon-app
```

<br>

Concrètement, ça veut dire que le travail que vous faites avec Compose n'est pas
perdu si vous passez un jour à Swarm. Vous ajoutez simplement une section
`deploy` à vos services pour préciser le nombre de répliques et la stratégie de
mise à jour :

```yaml
services:
  api:
    image: mon-api:1.0.0
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
```

<br>

C'est tout l'intérêt de l'écosystème Docker : on apprend une syntaxe, et on la
réutilise du laptop jusqu'au cluster de production.

<hr>

Et voilà, vous ne devriez plus jamais confondre ces trois-là ! Pour résumer en
une phrase : **Docker fait tourner un conteneur, Compose en orchestre plusieurs
sur une machine, et Swarm les répartit sur tout un parc de serveurs**.

Dans les prochaines fiches de cette série, on va justement creuser ce qui se
cache derrière l'orchestration : la gestion des réseaux Docker, des secrets, et
un focus complet sur Docker Swarm. Restez dans le coin 😉.

D'ici là, je vous invite :

<!-- - [à faire le quiz](/quiz/difference-docker-compose-swarm) pour valider vos
  acquis ; -->

- [à (re)commencer le cours sur Docker et Docker Compose](/cours/docker-et-docker-compose)
  si ce n'est pas déjà fait.

## Ressources

- [La documentation officielle de Docker](https://docs.docker.com/get-started/)
- [La documentation officielle de Docker Compose](https://docs.docker.com/compose/)
- [La documentation officielle de Docker Swarm](https://docs.docker.com/engine/swarm/)
- [Déployer une stack avec docker stack deploy](https://docs.docker.com/engine/swarm/stack-deploy/)
