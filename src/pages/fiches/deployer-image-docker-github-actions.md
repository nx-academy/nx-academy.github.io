---
layout: ../../layouts/CheatSheetsLayout.astro

title: "Comment déployer une image Docker depuis GitHub Actions ?"
description:
  "Apprenez à construire, taguer et déployer une image Docker automatiquement
  avec GitHub Actions : connexion au registry, docker/build-push-action, push
  sur Docker Hub ou GHCR et déploiement sur votre serveur. Le pont entre Docker
  et la CI/CD."

imgAlt:
  Un bras robotisé qui dépose un conteneur Docker sur un tapis roulant vers un
  serveur, pixel art
imgSrc: /images/cheatsheets/deployer-image-docker-github-actions.webp

author: Thomas
kind: Fiche technique
serie: cicd
level: Intermédiaire
publishedDate: 07/07/2026
---

Voici une fiche que j'attendais d'écrire depuis un moment, parce qu'elle fait le
lien entre deux séries de NX : **Docker** d'un côté, **les CI/CD avec GitHub
Actions** de l'autre.

Jusqu'ici, vous avez appris à
[construire une image Docker](/cours/docker-et-docker-compose/) et à
[déclencher un workflow GitHub Actions](/fiches/declencher-workflow-github-actions).
Aujourd'hui, on assemble les deux : **comment faire pour qu'à chaque push,
GitHub Actions construise votre image Docker et la déploie automatiquement ?**

C'est exactement ce qui transforme un projet « qui marche sur ma machine » en
une vraie application livrée en continu. On y va.

## La grande idée : build → push → deploy

Avant le code, posons le schéma mental. Déployer une image Docker depuis un
workflow, ça se résume presque toujours à trois étapes :

- **Build** → GitHub Actions construit l'image à partir de votre `Dockerfile` ;
- **Push** → l'image est envoyée sur un _registry_ (Docker Hub, GHCR…) ;
- **Deploy** → votre serveur récupère cette image et lance le conteneur.

<br>

Si la notion de registry est floue, je vous renvoie à la fiche
[Qu'est-ce qu'un registry Docker ?](/fiches/presentation-registry-docker) :
c'est le maillon central de toute cette chaîne. Le registry, c'est l'entrepôt
d'où partent et où arrivent vos images.

<br>

On va dérouler ces trois étapes une par une.

## Étape 1 - Se connecter au registry

Impossible de pousser une image sans s'authentifier auprès du registry. Pour ça,
GitHub met à disposition l'action officielle
[`docker/login-action`](https://github.com/docker/login-action).

<br>

Voici la connexion à **Docker Hub** :

```yml
- name: Connexion à Docker Hub
  uses: docker/login-action@v3
  with:
    username: ${{ secrets.DOCKERHUB_USERNAME }}
    password: ${{ secrets.DOCKERHUB_TOKEN }}
```

<br>

Vous remarquez le `${{ secrets.DOCKERHUB_TOKEN }}` ? **On ne met JAMAIS un mot
de passe en clair dans un workflow.** On passe par les secrets GitHub. Si vous
ne savez pas encore comment ça marche, gardez cette fiche sous le coude :
[Comment gérer les secrets dans GitHub Actions ?](/fiches/gerer-secrets-github-actions).
On s'en sert dès maintenant.

## Étape 2 - Construire et pousser l'image

Une fois connecté, on enchaîne avec
[`docker/build-push-action`](https://github.com/docker/build-push-action), qui
fait le build **et** le push en une seule étape :

```yml
- name: Build et push de l'image
  uses: docker/build-push-action@v6
  with:
    context: .
    push: true
    tags: moncompte/mon-api:latest
```

<br>

Décryptage :

- `context: .` → le dossier qui contient votre `Dockerfile` ;
- `push: true` → une fois l'image construite, on l'envoie sur le registry ;
- `tags:` → le nom et le tag de l'image publiée.

<br>

Un conseil au passage : **évitez de tout taguer en `latest`**. C'est pratique
mais on ne sait plus quelle version tourne réellement. Préférez taguer avec le
SHA du commit, comme pour les artefacts :

```yml
tags: moncompte/mon-api:${{ github.sha }}
```

## Le workflow complet (build + push)

Mettons les deux étapes bout à bout dans un workflow déclenché à chaque push sur
`main` :

```yml
name: Build & Push Docker image

on:
  push:
    branches: [main]

jobs:
  build-and-push:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout du code
        uses: actions/checkout@v4

      - name: Connexion à Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build et push
        uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: moncompte/mon-api:${{ github.sha }}
```

À ce stade, à chaque push sur `main`, votre image fraîchement construite se
retrouve sur Docker Hub. Il ne reste plus qu'à la déployer.

## Étape 3 - Déployer l'image sur votre serveur

Le push, c'est bien, mais votre serveur ne va pas deviner qu'une nouvelle image
est disponible. Il faut lui dire d'aller la chercher et de relancer le
conteneur.

<br>

L'approche la plus simple et la plus répandue : se connecter en SSH au serveur
depuis le workflow, puis lancer un `docker pull` suivi d'un `docker run`. On
utilise pour ça l'action
[`appleboy/ssh-action`](https://github.com/appleboy/ssh-action) :

```yml
- name: Déploiement sur le serveur
  uses: appleboy/ssh-action@v1
  with:
    host: ${{ secrets.SSH_HOST }}
    username: ${{ secrets.SSH_USER }}
    key: ${{ secrets.SSH_KEY }}
    script: |
      docker pull moncompte/mon-api:latest
      docker stop mon-api || true
      docker rm mon-api || true
      docker run -d --name mon-api -p 3000:3000 moncompte/mon-api:latest
```

<br>

Là encore, tout ce qui est sensible (l'adresse du serveur, l'utilisateur, la clé
SSH) passe par des **secrets**. On ne met rien en dur.

<br>

Le `|| true` après `docker stop` et `docker rm` est un petit réflexe utile : au
tout premier déploiement, le conteneur n'existe pas encore, et sans ça le
workflow échouerait bêtement.

## Bonnes pratiques

Quelques réflexes pour un déploiement propre :

- **Taguez avec le SHA du commit** (`${{ github.sha }}`) pour savoir exactement
  quelle version tourne, et gardez éventuellement un `latest` en parallèle.
- **Optimisez votre image** avant de la déployer : une image légère se pousse et
  se récupère plus vite. Voir
  [Comment optimiser une image Docker ?](/fiches/optimisation-images-docker) et
  [Comment faire un multi-stage build ?](/fiches/bien-faire-multi-stage-build).
- **Utilisez le cache de build** de `build-push-action` pour ne pas tout
  reconstruire à chaque fois (on en reparlera dans la fiche sur l'optimisation
  des workflows).
- **Séparez build et déploiement en deux jobs** si vous voulez, par exemple, ne
  déployer que si les tests passent.

## Bonus - Docker Hub ou GHCR ?

Vous n'êtes pas obligé de passer par Docker Hub. GitHub propose son propre
registry, **GHCR** (`ghcr.io`), directement intégré à vos dépôts.

<br>

Son gros avantage : pas besoin de créer un token à part, vous pouvez utiliser le
`GITHUB_TOKEN` fourni automatiquement à chaque workflow :

```yml
- name: Connexion à GHCR
  uses: docker/login-action@v3
  with:
    registry: ghcr.io
    username: ${{ github.actor }}
    password: ${{ secrets.GITHUB_TOKEN }}
```

<br>

Pensez juste à donner la permission `packages: write` à votre job :

```yml
jobs:
  build-and-push:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
```

<br>

Mon conseil : si votre code est déjà sur GitHub, **GHCR est souvent le choix le
plus simple** — tout reste au même endroit.

<hr>

Et voilà, vous savez maintenant construire et déployer une image Docker en
continu depuis GitHub Actions ! Pour résumer : **on build l'image, on la pousse
sur un registry, et le serveur va la chercher pour relancer le conteneur — le
tout automatiquement à chaque push.**

C'est vraiment le moment où Docker et la CI/CD se rejoignent. D'ici là, je vous
invite :

- à sécuriser tout ça avec la fiche
  [Comment gérer les secrets dans GitHub Actions ?](/fiches/gerer-secrets-github-actions)
  ;
- à (re)découvrir
  [le cours sur les pipelines CI/CD](/cours/ci-cd-github-actions/) et
  [le cours sur Docker](/cours/docker-et-docker-compose/).

## Ressources

- [docker/build-push-action](https://github.com/docker/build-push-action)
- [docker/login-action](https://github.com/docker/login-action)
- [Publishing Docker images (GitHub Docs)](https://docs.github.com/en/actions/tutorials/publishing-packages/publishing-docker-images)
- [Working with the Container registry (GHCR)](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
  </content>
