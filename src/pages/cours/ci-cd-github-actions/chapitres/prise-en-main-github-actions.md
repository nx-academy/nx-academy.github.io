---
layout: ../../../../layouts/ChapterLayout.astro

title: Prenez en main les Github Actions
description: "Apprenez à créer vos premières GitHub Actions : comprendre les
workflows, jobs, runners et steps, écrire du YAML et construire un premier
pipeline automatisé."

previousChapterLink: presentation-projet-fil-rouge
nextChapterLink: bonnes-pratiques-workflow-complexe

chapterNumber: 1
sectionNumber: 2
sectionTitle: Partie 2 - Découvrez les GitHub Actions
id: 3
---

<article>

# Prenez en main les GitHub Actions

![](/images/cours-ci-cd-github-actions/homme-lecture-livre.webp)

Avant de poursuivre la lecture de ce chapitre, veuillez vous mettre [sur la branche `partie-2/chapitre-1-debut`](https://github.com/nx-academy/Creez-des-pipelines-CI-CD-avec-les-GitHub-Actions/tree/partie-2/chapitre-1-debut). En plus de cette branche, nous allons utiliser [cette issue Github](https://github.com/nx-academy/Creez-des-pipelines-CI-CD-avec-les-GitHub-Actions/issues/5) comme problématique. Je vous invite à en prendre connaissance avant de passer à la lecture du chapitre.

## Il était une fois les GitHub Actions

Dans ce chapitre, vous allez créer vos deux premières GitHub Actions. Vous allez rapidement voir que cela n’a rien de bien compliqué. Il y a certes un vocabulaire à acquérir et une “philosophie” à comprendre mais c’est à peu près tout.

Dans le cadre d’une GitHub Actions, le code que vous allez écrire sera avant tout descriptif. C’est une différence majeure face à de la programmation pure. Pour gérer vos actions, vous écrirez du YML. Avant de vous présenter ce langage, j’ai envie de revenir sur les GitHub Actions en elle-même.

Les GitHub Actions sont une fonctionnalité de GitHub. Elles ont été introduites en 2018 et permettent à nous, les développeurs, d’automatiser certaines tâches (ou plus précisément à une série de tâches) durant nos développements.

Pour votre information, ces tâches sont souvent appelées workflows. Les tâches d’un workflow sont le plus souvent le build du code source, l’automatisation des tests et le déploiement du projet. Si vous vous souvenez du premier chapitre du cours, ces workflows correspondent aux étapes des pipelines CI/CD.

**Chaque action est définie comme un workflow autonome. Autonome ne signifie pas que le workflow est isolé**. Autrement dit, cela ne veut pas dire qu’un workflow ne peut pas interagir avec un autre workflow. Ici, le mot autonome signifie que le workflow peut se déclencher automatiquement, soit sans intervention humaine.

**Un workflow se déclenche en réponse à un événement**. Pensez ici à l’ouverture d’une Pull Request ou à un push sur une branche - `git push origin main`. Tous les workflows se situeront dans le dossier `.github/workflows`.

Chose assez intéressante à noter. J’ai écrit un peu plus haut que les GitHub Actions avaient été lancées en 2018. C’est assez “tard”, notamment si on compare à Jenkins et Travis CI. En effet, ces deux solutions existent depuis plus d’une décennie. Il est plus que probable que la sortie des GitHub Actions soit en lien avec le rachat de GitHub par Microsoft. Cela dit, avant les GitHub Actions, il était possible d’intégrer directement Travis CI et Jenkins à un repository GitHub. C’est ce que j’ai fait pendant de nombreuses années.

Revenons maintenant sur le YML, ou YAML. Si vous êtes dans le web depuis quelques années, il est possible que vous connaissiez déjà ce langage. YAML signifie “YAML Ain’t Markup Language”. C’est un langage principalement utilisé pour la configuration de logiciels et d’applications. Comme le Python, il se base sur l’indentation pour représenter les structures hiérarchiques. Sachez qu’il est très fréquent de se planter dans l’indentation d’un fichier YAML. Il est donc important de passer [par un validateur](ihttps://www.yamllint.com/).

Dernier point important, les fichiers YAML se terminent par `.yml` ou `.yaml`. J’ai tendance à utiliser la première mais les deux sont totalement valides. Ne soyez pas surpris si vous voyez l’un ou l’autre.

---

<br>

![](/images/cours-ci-cd-github-actions/scene-famille-dictionnaire.webp)

## Familiarisez-vous avec le vocabulaire

Si vous travaillez dans le domaine des nouvelles technologies depuis quelques années, vous le savez sûrement déjà mais connaître et utiliser les termes appropriés est particulièrement important. En effet, c’est ce qui va éviter les quiproquos avec vos collègues et c’est aussi ce qui va vous permettre d'expliquer précisément ce que vous souhaitez faire.

Les GitHub Actions ont donc un vocabulaire précis et il est important de l’apprendre le plus tôt possible.

Dans les prochains paragraphes, je vais prendre le temps de vous présenter et de vous expliquer les principaux termes techniques liés aux GitHub Actions. Vous n’avez pas forcément à tout mémoriser dès maintenant. Essayez plutôt de comprendre à quoi se rapporte chacun de ces termes. Je prendrai le temps de vous faire des piqûres de rappel sur chacun de ces termes tout au long du cours.

Le premier terme qui va nous intéresser est le terme workflow. Un workflow, c’est un peu la colonne vertébrale des GitHub Actions. Ce n’est d’ailleurs pas pour rien qu’on crée nos Github Actions dans le dossier `.github/workflows`.

<br>

Voici un workflow complet :

```yml
name: My First Workflow

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  lint:
    name: Linting
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: 14

      - name: Install Dependencies
        run: npm install

      - name: Run ESLint
        run: npm run lint
```

<br>

Un workflow consiste en une combinaison de tâches à réaliser (compiler le code, faire tourner des tests automatisés). Il est généralement constitué d’au moins trois grandes sections : `name`, `on` et `jobs`. `on` et `jobs` sont obligatoires et name est optionnelle (mais vivement recommandé).

```yml
name: My First Workflow
```

<br>

Vous vous serez certainement douté mais `name` correspond au nom de votre workflow. Il est conseillé ici de lui donner un nom assez descriptif. Cela vous permettra de les identifier plus facilement.

<br>

![Des exemples de Workflow de GitHub Actions](/images/cours-ci-cd-github-actions/exemple-workflow.webp)

<br>
<br>

```yml
on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
```

Les workflows sont déclenchés par un événement. Souvenez-vous que les événements peuvent être l’ouverture d'un Pull Request ou le push d’un commit sur une branche.

Dans l’exemple ci-dessus, notre workflow est déclenché au moment où on push du code sur la branche `main` ou à l’ouverture d’une Pull Request sur la branche `main`.

<br>

---

<br>

Intéressons-nous maintenant aux runners :

```yml
runs-on: ubuntu-latest
```

Pour exécuter des tâches, les workflows ont besoin de **runners**. Ce sont des machines virtuelles qui vont fournir un runtime. Le runtime désigne ici un environnement d'exécution. Par exemple, Node.js est un runtime. Dans l’exemple ci-dessus, nous utilisons la dernière version d’Ubuntu.

<br>

À l’intérieur de chacun des workflows, on va trouver les **jobs**.

```yml
jobs:
  lint:
    name: Linting
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
      [...]
```

Les jobs correspondent à un ensemble de tâches. Un job va par exemple être dédié au build de l’application, à un autre déploiement, etc. Il est important de savoir qu’un job comprend une ou plusieurs étapes. Par exemple, l’installation des dépendances avec npm i, le build de l’application avec npm run build, etc. Dans le cadre du bout de code ci-dessus, nous avons un job et il s’appelle lint.

Vous pouvez aussi voir que je lui ai donné un nom spécifique grâce à la propriété name: Linting. Ce nom apparaîtra dans ma CI.

Il peut être intéressant de faire tourner des jobs en parallèle. La parallélisation de jobs va vous permettre d’avoir une CI qui prend moins de temps à faire son cycle complet et donc de déployer plus rapidement. Rassurez-vous si c’est encore un peu abstrait. Je vous montrerai comment faire de la parallélisation de jobs dès le prochain chapitre.

<br>

---

<br>

Attardons-nous maintenant sur les steps :

```yml
steps:
  - name: Checkout code
    uses: actions/checkout@v2

  - name: Setup Node.js
    uses: actions/setup-node@v2
    with:
      node-version: 14

  - name: Install Dependencies
    run: npm install

  - name: Run ESLint
    run: npm run lint
```

Chaque job est composé de steps (d’étapes en français). Une étape correspond à
une tâche telle que npm i, npm run build, ls -al, etc. Si on reprend l’exemple
ci-dessus, mon job build est composé de trois steps. Il n’y a pas vraiment de
limites au nombre de steps que vous pouvez écrire.Attardons
Certaines personnes préfèrent écrire des jobs (et workflows) très longs composés de nombreuses steps. D’autres préfèrent en écrire des plus courts. Pour être honnête, je préfère la deuxième méthode. Je trouve que le code est plus lisible. Cela dit, cela peut parfois créer des jobs qui sont un peu trop dépendants entre eux et donc faire baisser au final la maintenabilité.

<br>

---

<br>

Regardez maintenant attentivement la première steps.

```yml
- name: Checkout repository
```

Vous êtes face ici à une action. Une action est un peu comme une fonction en programmation. C’est un bout de code réutilisable. Par exemple, l’action actions/checkout@v3 récupère le contenu d’un repository Git. Il existe plusieurs types d’actions. Vous les découvrirez dans le prochain chapitre.

<br>

---

<br>

J’ai conscience que je viens de vous lâcher pas mal d’informations. Pour vous aider dans votre apprentissage, je vous ai prévu un screencast reprenant l’ensemble des concepts dont je viens de parler. Je vais reprendre le workflow complet que vous venez de voir.

<br>

\*\*SCREENCAST: Familiarisez-vous avec le vocabulaire

<br>

Si vous découvrez ce vocabulaire pour la première fois. Je vous invite à faire une pause et à boire un café ou un thé. On se retrouve juste après votre pause. Je vous montrerais comment créer votre premier workflow.

---

<br>

![](/images/cours-ci-cd-github-actions/scene-construction-usine.webp)

## Créez un workflow simple

C’est bon, vous avez bien pris votre café ? Alors, on peut continuer. Comme promis, vous allez dans cette section créer et exécuter votre premier workflow. Ce workflow sera relativement simple : il affichera le mot Hello, World! dans la console de la CI.

Il sera composé d’un seul job contenant lui-même deux steps :

- la première step sera l’action actions/checkout@v3 ;
- la deuxième sera la commande echo “Hello, World!”.

Je vous invite à regarder la documentation des GitHub Actions pour découvrir ce que fait l’action actions/checkout@v3. Cela vous permettra de vous habituer à lire la documentation et le code source des actions que vous utiliserez.

Vous pouvez essayer de réaliser ce premier workflow de votre côté avant de regarder le screencast. À tout de suite !

<br>

**SCREENCAST: Clonez et installez le projet fil rouge - MacOS**

<br>

Le code de ce screencast se trouve sur la branche partie-2/chapitre-1/section-3-fin .

Maintenant que vous avez créé votre premier workflow, on va pouvoir
s’intéresser à la problématique du chapitre.

---

<br>

![](/images/misc/enfant-avion-papier.webp)

## Exercez-vous

Pour rappel, voici la problématique que nous essayons de résoudre dans ce chapitre. Je vous invite à utiliser la branche partie-2/chapitre-1/section-3-fin.

<br>

**SCREENCAST: Exercez-vous**

<br>

Le code source contenant la solution de cet exercice se trouve sur la branche partie-2/chapitre-1-fin.

---

<br>

![](/images/misc/vendeur-journaux.webp)

## Résumé

- Les GitHub Actions sont une fonctionnalité GitHub introduite en 2018. Elles permettent d’automatiser des tâches telles que le test et le déploiement d’applications directement depuis GitHub.
- Les GitHub Actions utilisent le YAML. Elles sont situées dans le dossier `.github/workflows`. Vous pouvez avoir plusieurs workflows par repository GitHub.
- Quand on utilise les GitHub Actions, il est important de connaître les termes `workflows`, `runners`, `jobs`, `steps` et `actions`. Il en existe d’autres que vous verrez plus tard dans le cours.
- Les `actions` sont proches des fonctions en programmation. Ce sont des instructions réutilisables. Pour votre information, il existe des actions officielles et des actions de la communauté.

</article>
