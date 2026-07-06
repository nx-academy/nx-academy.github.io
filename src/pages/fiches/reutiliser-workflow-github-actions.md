---
layout: ../../layouts/CheatSheetsLayout.astro

title: "Comment réutiliser un workflow GitHub Actions ?"
description:
  "Marre de copier-coller les mêmes étapes d'un workflow à l'autre ? Découvrez
  comment mutualiser vos pipelines GitHub Actions avec les reusable workflows
  (workflow_call) et les composite actions : inputs, secrets, outputs et quand
  choisir l'un ou l'autre."

imgAlt:
  Des blocs de montage identiques réutilisés sur plusieurs chaînes d'usine,
  pixel art
imgSrc: /images/cheatsheets/reutiliser-workflow-github-actions.webp

author: Thomas
kind: Fiche technique
serie: cicd
level: Avancé
publishedDate: 07/07/2026
---

Vous vous souvenez, dans la fiche sur
[les déclencheurs de workflow](/fiches/declencher-workflow-github-actions), je
vous avais glissé qu'il existait `workflow_call` pour mutualiser un bloc de
tâches, et qu'on y reviendrait ? Eh bien nous y voilà.

Au bout de quelques projets, on finit toujours par recopier les mêmes étapes :
checkout, install, tests, lint… d'un repo à l'autre, d'un workflow à l'autre.
Et le jour où il faut changer un détail, il faut le changer **partout**. Pas
terrible.

Dans cette fiche (un cran plus avancée que les précédentes), on va voir comment
appliquer le principe **DRY** — _Don't Repeat Yourself_ — à vos workflows GitHub
Actions, avec deux outils : les **reusable workflows** et les **composite
actions**.

## Option 1 - Les reusable workflows (`workflow_call`)

Un _reusable workflow_, c'est un workflow entier que d'autres workflows peuvent
**appeler**, comme on appellerait une fonction. On le déclare avec le
déclencheur `workflow_call`.

<br>

Voici un workflow de tests réutilisable, qui accepte un paramètre d'entrée
(`input`) et un secret :

```yml
# .github/workflows/reusable-tests.yml
on:
  workflow_call:
    inputs:
      node-version:
        required: false
        type: string
        default: "20"
    secrets:
      NPM_TOKEN:
        required: false

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ inputs.node-version }}
      - run: npm ci
      - run: npm test
```

<br>

Et voici comment on l'appelle depuis un autre workflow. Notez le `uses:` au
niveau du **job** (et non d'un step) :

```yml
# .github/workflows/ci.yml
on:
  push:
    branches: [main]

jobs:
  call-tests:
    uses: ./.github/workflows/reusable-tests.yml
    with:
      node-version: "22"
    secrets: inherit
```

<br>

Quelques points clés :

- **`inputs`** → les paramètres que le workflow appelant peut passer ;
- **`secrets`** → les secrets transmis ; `secrets: inherit` passe tous ceux du
  workflow appelant d'un coup ;
- **`outputs`** → un reusable workflow peut aussi **renvoyer** des valeurs à
  celui qui l'appelle.

## Option 2 - Les composite actions

Un reusable workflow mutualise des **jobs** entiers. Mais parfois, vous voulez
juste factoriser **quelques steps** que vous répétez sans arrêt (checkout +
setup + install, par exemple). C'est le rôle des **composite actions**.

<br>

On crée une action locale dans un dossier, avec un fichier `action.yml` :

```yml
# .github/actions/setup-project/action.yml
name: Setup project
description: Checkout, installe Node et les dépendances

runs:
  using: composite
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: 20
        cache: "npm"
    - run: npm ci
      shell: bash
```

<br>

Et on l'utilise comme n'importe quelle action, mais avec un chemin local :

```yml
steps:
  - uses: ./.github/actions/setup-project
  - run: npm test
```

<br>

Petit piège à connaître : dans une composite action, **chaque step `run` doit
préciser son `shell`** (`shell: bash` par exemple). C'est vite oublié.

## Reusable workflow ou composite action ?

La question qui revient toujours. Voici comment je tranche :

|                          | Reusable workflow          | Composite action            |
| ------------------------ | -------------------------- | --------------------------- |
| **Ce qu'on mutualise**   | Un ou plusieurs jobs       | Quelques steps              |
| **Appelé au niveau**     | du _job_ (`uses:` sur job) | du _step_ (`uses:` sur step) |
| **Gère les secrets**     | ✅ (via `secrets`)         | Indirectement               |
| **Peut définir ses jobs / runners** | ✅              | ❌ (hérite du job appelant) |
| **Cas typique**          | Pipeline de tests/déploiement partagé | Suite de steps répétés |

<br>

La règle simple : **un bloc de steps** → composite action. **Un pipeline
complet** (avec ses propres jobs, runners, environnements) → reusable workflow.

## Bonus - Réutiliser un workflow d'un autre dépôt

Le vrai super-pouvoir, c'est de centraliser vos workflows dans **un seul dépôt**
et de les appeler depuis tous les autres. La syntaxe accepte une référence vers
un repo externe :

```yml
jobs:
  call-tests:
    uses: mon-orga/workflows-partages/.github/workflows/tests.yml@main
    secrets: inherit
```

<br>

Concrètement, une équipe peut maintenir **un catalogue de pipelines standardisés**
(tests, sécurité, déploiement) et tous les projets en héritent. Vous corrigez un
workflow à un seul endroit, et tout le monde en profite. C'est comme ça qu'on
passe de « quelques scripts CI » à une vraie plateforme interne.

<hr>

Et voilà, vous savez maintenant factoriser vos workflows au lieu de les
copier-coller ! Pour résumer : **`workflow_call` pour réutiliser des pipelines
entiers, les composite actions pour réutiliser des paquets de steps — et un dépôt
central pour partager le tout entre projets.**

Cette fiche clôt (pour l'instant) notre série sur les CI/CD avec GitHub Actions.
D'ici la prochaine, je vous invite :

- à revenir sur
  [Comment optimiser vos workflows GitHub Actions ?](/fiches/optimiser-workflows-github-actions)
  si vous cherchez d'abord à gagner en vitesse ;
- à (re)commencer
  [le cours sur les pipelines CI/CD avec les GitHub Actions](/cours/ci-cd-github-actions/).

## Ressources

- [Reusing workflows](https://docs.github.com/en/actions/using-workflows/reusing-workflows)
- [Creating a composite action](https://docs.github.com/en/actions/creating-actions/creating-a-composite-action)
- [Events that trigger workflows - workflow_call](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#workflow_call)
</content>
