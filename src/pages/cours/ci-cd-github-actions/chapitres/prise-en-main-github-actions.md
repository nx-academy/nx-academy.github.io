---
layout: ../../../../layouts/ChapterLayout.astro

title: Prenez en main les Github Actions
description: Une super description liée à ce chapitre.

previousChapterLink: presentation-projet-fil-rouge
nextChapterLink: bonnes-pratiques-workflow-complexe

chapterNumber: 1
sectionNumber: 2
sectionTitle: Partie 2 - Découvrez les GitHub Actions
id: 3
---

<article>

# Prenez en main les GitHub Actions 

![Un superhero regardant une ville de nuit, pixel art]()

Avant de poursuivre la lecture de ce chapitre, veuillez vous mettre [sur la branche `partie-2/chapitre-1-debut`](https://github.com/nx-academy/Creez-des-pipelines-CI-CD-avec-les-GitHub-Actions/tree/partie-2/chapitre-1-debut). En plus de cette branche, nous allons utiliser [cette issue Github](https://github.com/nx-academy/Creez-des-pipelines-CI-CD-avec-les-GitHub-Actions/issues/5) comme problématique. Je vous invite à en prendre connaissance avant de passer à la lecture du chapitre.

## Il était une fois les GitHub Actions

Dans ce chapitre, vous allez créer vos deux premières GitHub Actions. Vous allez rapidement voir que cela n’a rien de bien compliqué. Il y a certes un vocabulaire à acquérir et une “philosophie” à comprendre mais c’est à peu près tout.

Dans le cadre d’une GitHub Actions, le code que vous allez écrire sera avant tout descriptif. C’est une différence majeure face à de la programmation pure. Pour gérer vos actions, vous écrirez du YML. Avant de vous présenter ce langage, j’ai envie de revenir sur les GitHub Actions en elle-même.

Les GitHub Actions sont une fonctionnalité de GitHub. Elles ont été introduites en 2018 et permettent à nous, les développeurs, d’automatiser certaines tâches (ou plus précisément à une série de tâches) durant nos développements.

Pour votre information, ces tâches sont souvent appelées workflows. Les tâches d’un workflow sont le plus souvent le build du code source, l’automatisation des tests et le déploiement du projet. Si vous vous souvenez du premier chapitre du cours, ces workflows correspondent aux étapes des pipelines CI/CD.

**Chaque action est définie comme un workflow autonome. Autonome ne signifie pas que le workflow est isolé**. Autrement dit, cela ne veut pas dire qu’un workflow ne peut pas interagir avec un autre workflow. Ici, le mot autonome signifie que le workflow peut se déclencher automatiquement, soit sans intervention humaine.

**Un workflow se déclenche en réponse à un événement**. Pensez ici à l’ouverture d’une Pull Request ou à un push sur une branche - `git push origin main`. Tous les workflows se situeront dans le dossier `.github/workflows`.

Chose assez intéressante à noter. J’ai écrit un peu plus haut que les GitHub Actions avaient été lancées en 2018. C’est assez “tard”, notamment si on compare à Jenkins et Travis CI. En effet, ces deux solutions existent depuis plus d’une décennie. Il est plus que probable que la sortie des GitHub Actions soit en lien avec le rachat de GitHub par Microsoft. Cela dit, avant les GitHub Actions, il était possible d’intégrer directement Travis CI et Jenkins à un repository GitHub. C’est ce que j’ai fait pendant de nombreuses années.

Revenons maintenant sur le YML, ou YAML. Si vous êtes dans le web depuis quelques années, il est possible que vous connaissiez déjà ce langage. YAML signifie “YAML Ain’t Markup Language”. C’est un langage principalement utilisé pour la configuration de logiciels et d’applications. Comme le Python, il se base sur l’indentation pour représenter les structures hiérarchiques. Sachez qu’il est très fréquent de se planter dans l’indentation d’un fichier YAML. Il est donc important de passer par un validateur.

Dernier point important, les fichiers YAML se terminent par .yml ou .yaml. J’ai tendance à utiliser la première mais les deux sont totalement valides. Ne soyez pas surpris si vous voyez l’un ou l’autre.

</article>

