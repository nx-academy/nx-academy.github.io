---
layout: ../../layouts/CheatSheetsLayout.astro

title: "Comment optimiser vos workflows GitHub Actions ?"
description:
  "Vos workflows GitHub Actions sont lents ? Découvrez comment les accélérer :
  cache des dépendances, matrices de test en parallèle, concurrency pour annuler
  les runs obsolètes, jobs conditionnels et timeouts. Des pipelines plus rapides
  et moins gourmands."

imgAlt:
  Un tapis roulant d'usine accéléré avec des rouages bien huilés, pixel art
imgSrc: /images/cheatsheets/optimiser-workflows-github-actions.webp

author: Thomas
kind: Fiche technique
serie: cicd
level: Intermédiaire
publishedDate: 07/07/2026
---

Au début, on est juste content que notre workflow tourne. Puis vient le moment où
on attend 6 minutes à chaque push pour un simple `npm test`… et là, on commence à
trouver le temps long.

Un workflow lent, ce n'est pas qu'un confort en moins : c'est un **feedback plus
lent** (vous attendez avant de savoir si votre code passe) et **plus de minutes
consommées** sur votre quota GitHub Actions.

Dans cette fiche, on va voir les leviers les plus efficaces pour **accélérer vos
workflows GitHub Actions** sans rien sacrifier. C'est un peu l'équivalent CI/CD de
la fiche [Comment optimiser une image Docker ?](/fiches/optimisation-images-docker) :
on cherche à faire pareil, mais en moins de temps.

## Levier n°1 - Mettre en cache les dépendances

C'est de loin le gain le plus rentable. À chaque run, réinstaller toutes vos
dépendances depuis zéro, c'est du temps perdu. Le cache permet de les réutiliser
d'un run à l'autre.

<br>

La bonne nouvelle, c'est que les actions `setup-*` intègrent déjà un cache. Pour
Node.js, il suffit d'une ligne :

```yml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: 20
    cache: "npm"
```

<br>

Le `cache: "npm"` va automatiquement mettre en cache votre dossier de
dépendances et le restaurer au run suivant. Simple et redoutablement efficace.

<br>

Pour des cas plus spécifiques, il existe l'action générique
[`actions/cache`](https://github.com/actions/cache), où vous définissez
vous-même quoi mettre en cache et avec quelle clé :

```yml
- name: Cache des dépendances
  uses: actions/cache@v4
  with:
    path: ~/.npm
    key: npm-${{ hashFiles('package-lock.json') }}
```

La clé basée sur `hashFiles(...)` garantit qu'on recharge le cache uniquement
tant que le `package-lock.json` n'a pas changé.

## Levier n°2 - Paralléliser avec une matrice

Vous devez tester votre code sur plusieurs versions de Node ? Ne les enchaînez
pas les unes après les autres : lancez-les **en parallèle** avec une matrice.

```yml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node: [18, 20, 22]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node }}
      - run: npm ci
      - run: npm test
```

<br>

GitHub va créer **trois jobs en parallèle**, un par version. Résultat : vous
testez trois configurations dans le temps d'une seule. C'est aussi valable pour
tester plusieurs OS, plusieurs versions de Python, etc.

## Levier n°3 - Annuler les runs obsolètes avec `concurrency`

Voici un gaspillage classique : vous poussez trois commits d'affilée sur une PR,
et GitHub lance trois workflows complets… alors que seul le dernier vous
intéresse.

<br>

Le mot-clé `concurrency` règle ça en annulant automatiquement les runs en cours
devenus inutiles :

```yml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

<br>

Traduction : « pour un même workflow sur une même branche, garde seulement le run
le plus récent et annule les autres ». Vous économisez des minutes sans rien
perdre d'utile.

## Levier n°4 - Ne lancer que ce qui est nécessaire

Pourquoi relancer toute la CI si vous n'avez modifié qu'un fichier de
documentation ? Deux outils pour ça.

<br>

Le filtre `paths` au niveau du déclencheur, pour ne partir que si certains
fichiers changent :

```yml
on:
  push:
    branches: [main]
    paths:
      - "src/**"
      - "package.json"
```

<br>

Et la condition `if` au niveau d'un job ou d'un step, pour l'exécuter seulement
dans certains cas :

```yml
deploy:
  if: github.ref == 'refs/heads/main'
  runs-on: ubuntu-latest
  steps:
    - run: ./deploy.sh
```

Ici, le déploiement ne se lance que sur la branche `main`, jamais sur une PR.

## Levier n°5 - Poser des garde-fous

Deux réglages simples qui évitent les mauvaises surprises :

- `timeout-minutes` empêche un job bloqué de tourner (et de consommer vos
  minutes) pendant des heures :

```yml
jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 10
```

- `fail-fast: false` dans une matrice permet, au contraire, de **ne pas** tout
  arrêter dès qu'un job échoue — pratique quand vous voulez voir le résultat de
  toutes les versions, pas seulement la première qui casse :

```yml
strategy:
  fail-fast: false
  matrix:
    node: [18, 20, 22]
```

## Bonus - Le cache pour vos images Docker

Si vous
[déployez une image Docker depuis GitHub Actions](/fiches/deployer-image-docker-github-actions),
sachez que `docker/build-push-action` sait aussi utiliser un cache pour ne pas
reconstruire toutes les couches à chaque fois :

```yml
- uses: docker/build-push-action@v6
  with:
    context: .
    push: true
    tags: moncompte/mon-api:latest
    cache-from: type=gha
    cache-to: type=gha,mode=max
```

<br>

Combiné à un bon
[multi-stage build](/fiches/bien-faire-multi-stage-build), c'est le combo gagnant
pour des builds d'images vraiment rapides en CI.

<hr>

Et voilà, vos workflows devraient déjà tourner nettement plus vite ! Pour
résumer les réflexes : **on met les dépendances en cache, on parallélise avec une
matrice, on annule les runs obsolètes, on ne lance que le nécessaire, et on pose
des garde-fous.**

D'ici là, je vous invite :

- à découvrir comment
  [réutiliser un workflow](/fiches/reutiliser-workflow-github-actions) pour aller
  encore plus loin dans l'industrialisation ;
- à (re)commencer
  [le cours sur les pipelines CI/CD](/cours/ci-cd-github-actions/) si besoin.

## Ressources

- [Caching dependencies to speed up workflows](https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows)
- [Using a matrix for your jobs](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs)
- [Control the concurrency of workflows and jobs](https://docs.github.com/en/actions/using-jobs/using-concurrency)
- [Usage limits, billing, and administration](https://docs.github.com/en/actions/learn-github-actions/usage-limits-billing-and-administration)
</content>
