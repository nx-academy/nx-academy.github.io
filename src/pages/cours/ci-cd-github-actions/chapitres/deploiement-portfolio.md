---
layout: ../../../../layouts/ChapterLayout.astro

title: Déployez votre portfolio
description: Une super description liée à ce chapitre.

previousChapterLink: decouverte-github-pages

chapterNumber: 2
sectionNumber: 3
sectionTitle: Partie 3 - Mettez en place une pipeline CI/CD avec GitHub Pages et les GitHub Actions
id: 6
---

<article>

# Déployez votre portfolio


![Un superhero regardant une ville de nuit, pixel art]()

Avant de poursuivre la lecture de ce chapitre, veuillez vous mettre [sur la branche `partie-3/chapitre-2-debut`](https://github.com/nx-academy/Creez-des-pipelines-CI-CD-avec-les-GitHub-Actions/tree/partie-3/chapitre-2-debut). En plus de cette branche, nous allons utiliser [cette issue GitHub comme problématique](https://github.com/nx-academy/Creez-des-pipelines-CI-CD-avec-les-GitHub-Actions/issues/8). Je vous invite à en prendre connaissance avant de passer à la lecture du chapitre.

## Tirez parti des GitHub Actions pour vos déploiement

Dans ce dernier chapitre, votre objectif sera d'automatiser intégralement le déploiement du projet fil rouge en utilisant GitHub Actions. Cette automatisation englobe l'installation des dépendances, la construction de l'application, son test et son déploiement. Vous serez ainsi initiés à la mise en place d'une pipeline CI/CD complète.

Le projet fil rouge concerne le déploiement d'une application React sur GitHub Pages. Sachez qu’il est tout à fait possible de se servir des GitHub Actions pour déployer d’autres types d’applications, par exemple, des API Rest en Node.js ou en Python et même des packages Npm. Cela dit, si vous les utilisez pour déployer une API REST, vous utiliserez une autre solution d'hébergement que GitHub Pages.

```yml
name: Build and Push Node.js app to Docker Hub

on:
  push:
    branches:
      - main

jobs:
  build-and-push:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up QEMU
        uses: docker/setup-qemu-action@v1

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v1

      - name: Login to Docker Hub
        uses: docker/login-action@v1
        with:
          username: ${{ secrets.DOCKER_HUB_USERNAME }}
          password: ${{ secrets.DOCKER_HUB_PASSWORD }}

      - name: Build and push
        uses: docker/build-push-action@v2
        with:
          context: .
          file: ./Dockerfile
          push: true
          tags: your-dockerhub-username/your-repo-name:tagname
```

Ce snippet de code vous montre comment déployer une API Rest en Node.js via une GitHub Actions. C’est typiquement le genre de jobs que vous pouvez lancer une fois que les tests sont passés. Vous noterez qu’on utilise ici des actions officielles de Docker. Elles permettent de se connecter à dockerhub, de builder l’application et d’y envoyer l’application une fois buildée. Vous remarquerez aussi qu’on utilise des secrets GitHub.

<br>

Prenons maintenant l’exemple d’une application déployée sur Heroku.

```yml
name: Deploy Node.js app to Heroku

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Install Heroku CLI
        run: curl https://cli-assets.heroku.com/install.sh | sh

      - name: Login to Heroku
        run: heroku login -i
        env:
          HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}

      - name: Deploy to Heroku
        run: git push https://heroku:$HEROKU_API_KEY@git.heroku.com/your-heroku-app-name.git HEAD:main
```

L’un des éléments les plus intéressants de ce workflow se situe dans la section Install Heroku CLI. Vous pouvez voir qu’on peut directement utiliser des scripts shells sur les VM des GitHub Actions.

Je vous encourage à explorer d'autres options de déploiement et à comprendre leurs particularités et avantages. Nous aurons l'occasion de revenir sur ce sujet dans un cours ultérieur, où nous approfondirons ces concepts et explorerons d'autres scénarios et plateformes de déploiement 🙂.

On va d’ailleurs en profiter pour parler un peu de déploiement !

---

<br>

![Un élève en train de tricher dans une classe, pixel art]()

## Appréhendez les différents modes de déploiement

Le déploiement est une étape essentielle qui est trop souvent mise de côté dans les cours de programmation. On aborde souvent une technologie, par exemple React ou NestJS, on vous explique rapidement comment l’utiliser, les quelques conventions qui peuvent exister et c’est tout. Autrement dit, en tant que lecteur, on se retrouve souvent avec la frustration du type : “Ok, mais comment je mets ça en prod moi ?”.

Vous avez certainement compris que j’avais quelques cours de prévu sur les infrastructures Cloud et le déploiement d’applications. Cela dit, j’ai envie de profiter de ce dernier chapitre pour vous parler rapidement des différents modes et stratégies de déploiement. Quand on parle de stratégies de déploiement, les termes de Blue/Green déploiement, de canary testing et même d’A/B testing sont souvent utilisés. Elles sont le plus souvent mises en place par les DevOps et/ou administrateurs systèmes et réseaux d’une entreprise.

Le Blue/Green Deployment, par exemple, implique d'avoir deux environnements de production parallèles. Le passage de l’un à l’autre permet des mises à jour rapides et sécurisées. Le Canary Testing, en revanche, consiste à déployer la nouvelle version à un sous-ensemble d'utilisateurs pour évaluer sa performance avant un déploiement complet.

Chacune de ces stratégies a ses avantages et ses inconvénients. Comme souvent en informatique, il n’y a pas de solution miracle. En fonction de votre budget et de la criticité de l’application, vous pouvez décider d’utiliser une stratégie plutôt qu’une autre.

Si le sujet vous intéresse, je vous invite [à lire ce papier blanc d’AWS](https://docs.aws.amazon.com/whitepapers/latest/introduction-devops-aws/deployment-strategies.html) dédié aux différentes stratégies de déploiement.


</article>

