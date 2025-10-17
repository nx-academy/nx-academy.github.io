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

![](/images/cours-ci-cd-github-actions/decolage-fusee.webp)

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

![](/images/cours-ci-cd-github-actions/comparaison-fusees.webp)

## Appréhendez les différents modes de déploiement

Le déploiement est une étape essentielle qui est trop souvent mise de côté dans les cours de programmation. On aborde souvent une technologie, par exemple React ou NestJS, on vous explique rapidement comment l’utiliser, les quelques conventions qui peuvent exister et c’est tout. Autrement dit, en tant que lecteur, on se retrouve souvent avec la frustration du type : “Ok, mais comment je mets ça en prod moi ?”.

Vous avez certainement compris que j’avais quelques cours de prévu sur les infrastructures Cloud et le déploiement d’applications. Cela dit, j’ai envie de profiter de ce dernier chapitre pour vous parler rapidement des différents modes et stratégies de déploiement. Quand on parle de stratégies de déploiement, les termes de Blue/Green déploiement, de canary testing et même d’A/B testing sont souvent utilisés. Elles sont le plus souvent mises en place par les DevOps et/ou administrateurs systèmes et réseaux d’une entreprise.

Le Blue/Green Deployment, par exemple, implique d'avoir deux environnements de production parallèles. Le passage de l’un à l’autre permet des mises à jour rapides et sécurisées. Le Canary Testing, en revanche, consiste à déployer la nouvelle version à un sous-ensemble d'utilisateurs pour évaluer sa performance avant un déploiement complet.

Chacune de ces stratégies a ses avantages et ses inconvénients. Comme souvent en informatique, il n’y a pas de solution miracle. En fonction de votre budget et de la criticité de l’application, vous pouvez décider d’utiliser une stratégie plutôt qu’une autre.

Si le sujet vous intéresse, je vous invite [à lire ce papier blanc d’AWS](https://docs.aws.amazon.com/whitepapers/latest/introduction-devops-aws/deployment-strategies.html) dédié aux différentes stratégies de déploiement.

---

<br>

![](/images/misc/enfant-avion-papier.webp)

## Exercez-vous

Pour rappel, [voici la problématique](https://github.com/nx-academy/Creez-des-pipelines-CI-CD-avec-les-GitHub-Actions/issues/8) que nous essayons de résoudre dans ce chapitre.

<br>

**SCREENCAST: Exercez-vous**

<br>

Le code source contenant la solution de cet exercice se trouve [sur la branche `partie-3/chapitre-2-fin`](https://github.com/nx-academy/Creez-des-pipelines-CI-CD-avec-les-GitHub-Actions/tree/partie-3/chapitre-2-fin).

---

<br>

![](/images/misc/vendeur-journaux.webp)

## Résumé

- Les GitHub Actions peuvent être utilisées pour déployer des applications React mais aussi des API REST en Node.JS et en Python.
- Il est possible de déployer sur les principaux Cloud Providers via des actions spécifiques. Vous pouvez déployer votre API et même des fonctions Lambda directement depuis vos GitHub Actions.
- Il existe différentes stratégies de déploiement. Nous les aborderons dans un futur cours 🙂.

---

<br>

![Un homme en train de lire une histoire sur un fauteuil, pixel art](/images/cours-docker-et-docker-compose/lecture-histoire.webp)

## Le mot de la fin

Ce cours est maintenant terminé. J’espère que vous avez pris autant de plaisir à le suivre que j’ai pris de plaisir à le concevoir. Grâce à ce cours, vous devriez être capable :

- De créer vos propres pipelines CI/CD avec GitHub Actions. Vous devriez être en mesure de faire tourner des tests, builder une application et la déployer en production sur GitHub Pages.
- De déboguer plus facilement vos pipelines. Il y aura bien sur des cas que vous n’avez pas vu dans le cours mais c’est normal. L’important ici est que vous ayez des bases solides.
- De savoir comment optimiser des pipelines notamment en créant plusieurs jobs. Vous devriez savoir comment paralléliser des jobs.

<br>

Il y a certains sujets, tels que les matrix et les conditionnels, que je n’ai pas abordés durant le cours. Je voulais que ce premier cours dédié au CI/CD soit à la fois accessible et utilisable par tous. La suite de ce cours abordera principalement la partie déploiement. Vous y verrez comment déployer des conteneurs Docker sur une infrastructure AWS. Sa sortie est prévue pour 2024.

<br>

Entre temps, voici quelques sujets sur lesquels je vous invite à vous pencher :

- J’ai un peu parlé des artefacts (artifacts en anglais) durant les screencasts. Jetez un œil [à cette action](https://github.com/actions/upload-artifact) et essayez de l’implémenter 🙂.
- Vous pouvez en profiter pour travailler sur votre portfolio. Vous avez toutes les cartes en main pour réaliser un portfolio qui se déploie automatiquement.
- Essayez d'approfondir les CI/CD. Comme souvent, vous ne pourrez le faire que par la pratique. Autrement dit, c’est le moment de pratiquer et de faire des essais.
- Essayez de déployer un portfolio sur Astro et/ou NextJS. Vous verrez que les étapes de la CI ne seront pas les mêmes.

<br>

Comme toujours, n’hésitez pas à me faire un feedback sur le cours par mail ou sur Discord.

Codez bien !

</article>
