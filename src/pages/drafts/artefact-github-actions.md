---
layout: ../../layouts/CheatSheetsLayout.astro

title: Qu'est-ce qu'un artefact GitHub Actions ?
description:

author: Thomas
kind: Fiche technique
level: Débutant
publishedDate: 10/03/2025
---

<article>

# Qu'est-ce qu'un artefact GitHub Actions ?

Ça y est, [le cours sur les pipelines CI/CD avec les GitHub Actions](/cours/ci-cd-github-actions/) est officiellement disponible sur NX ! À cette occasion, on va revenir sur un concept essentiel : les artefacts (ou _artifacts_ en anglais).

Si vous avez suivi le cours jusqu’au bout, vous vous en êtes peut-être servi sans le savoir. Je pense au moment où on déploye une application ReactJS. Vous allez voir que c’est un outil simple et pratique mais aussi très puissant.

Sachez qu'on se sert des artefacts quand on souhaite conserver ou transférer un résultat généré par un job. Par résultat, vous pouvez penser à un dossier `dist/` pour une application front, un rapport de test, une archive et même une capture d’écran.

Bref, à chaque fois qu’on veut mettre de côté un fichier produit pendant un workflow, l’artefact devient notre meilleur pote.


## Qu'est-ce qu'un artefact GitHub Actions ?

Quand on parle d'artefact avec les GitHub Actions, on pense à un fichier ou un dossier généré pendant un workflow que l’on souhaite conserver. 

Ce dernier peut, ensuite, être téléchargé manuellement depuis l’interface de GitHub ou alors réutilisé dans un autre job.

Par exemple, on peut avoir besoin d'un artefact pour :
- un build frontend, le fameux dossier `dist/`, qu’on veut déployer dans un job suivant ;
- un rapport de test qu’on veut analyser plus tard ;
- un fichier zip, un binaire compilé ou un log personnalisé.

<br>

Pour créer un artefact, on utilise généralement l’action officielle [`actions/upload-artifact`](https://github.com/actions/upload-artifact).


Ca donne quelque chose comme ceci :

```yml
- name: Upload build
  uses: actions/upload-artifact@v4
  with:
    name: build
    path: dist/
```

**Ce petit bloc va mettre de côté le dossier `dist/` sous le nom `build`**.

---

Typiquement sur NX, je passe par un artefact pour uploader mon site, développé en Astro, sur GitHub Pages. Voici le code contenant mon upload :

```yml
# Je Build mon app
- name: Building project
  run: npm run build

# Je configure GitHub Pages
- name: Setting up Pages
  uses: actions/configure-pages@v3

# J’uploade l’artefact généré par le build
- name: Uploading artifact
  uses: actions/upload-pages-artifact@v3
  with:
    path: "./dist"

# Je déploie le tout sur GitHub Pages
- name: Deploying to GitHub Pages
  id: deployment
  uses: actions/deploy-pages@v4

# Le tout en prenant un café avec un collègue :D
```

<br>

Plutôt pas mal, non ?


## Bonnes pratiques et pièges à éviter

De manière générale, les artefacts sont des outils bien pratiques. Cela dit, il y a quelques bonnes pratiques à respecter histoire que tout se passe bien.

**Mon conseil : n'abusez pas des artefacts pour stocker tout et n'importe quoi**. Dans le repo Astro de NX, par exemple, je ne stocke que le site dans sa version buildée, soit le dossier `dist/`. Je n’ai pas besoin de tout garder :

- le dossier `raw/` contient des images assez lourdes ;
- le dossier `node_modules/` n’a aucun intérêt à être archivé dans un artefact.


<br>

Il est important de ne pas confondre artefact et cache :

- un artefact est un fichier ou dossier téléchargeable, même une fois le job terminé. Il est pensé pour être consulté ou utilisé plus tard.
- Un cache, lui, est réutilisé automatiquement dans les jobs ou workflows suivants. Il sert surtout à accélérer l’exécution, comme pour éviter de réinstaller les dépendances à chaque fois.

<br>


Sachez qu'il est possible, et même recommander ^^, de bien nommer, le nom de vos artefacts. Par exemple :

```yml
name: build-${{ github.sha }}
```

Cette ligne vous permet d’identifier clairement à quel commit correspond chaque artefact. Très utile quand on veut s’y retrouver dans l’historique.

---

Globalement, si vous suivez ces quelques règles, tout devrait bien se passer. Allé, on passe maintenant à quelques exemples.


## Exemple concret - Build d'un projet front

On va commencer avec un premier exemple complet. Admettons que vous souhaitiez déployer une application React et que vous souhaitez générer un build de production, histoire de l'archiver pour un déploiement ultérieur.

Ici, on va créer un job GitHub Actions qui :
- installe les dépendances ;
- lance la commande `npm run build` pour générer le dossier `dist/` ;
- uploade ce dossier comme artefact.

<br>

Voici le job complet :

```yml
jobs:
  build-frontend:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Build app
        run: npm run build

      - name: Upload build as artifact
        uses: actions/upload-artifact@v4
        with:
          name: frontend-build
          path: build/
```


## Exemple concret - Génération d'un rapport de test

Autre cas d’usage courant : générer un rapport de couverture de test dans le but de le rendre disponible en tant qu’artefact.

Ce genre de cas est particulièrement utile quand vous souhaitez :
- vérifier la couverture après chaque push ;
- conserver une trace de l’évolution de la qualité de vos tests ;
- ou partager facilement le rapport avec un membre de l’équipe.

<br>

Voici un exemple de job complet :

```yml
jobs:
  test-and-report:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Run tests with coverage
        run: npm test -- --coverage

      - name: Upload coverage report
        uses: actions/upload-artifact@v4
        with:
          name: coverage-report
          path: coverage/
```

 Une fois le job terminé, le rapport sera disponible dans l’interface GitHub _sous l’onglet Summary_ du workflow dans la section _Artifacts_.


## Bonus - Limiter la durée de rétention d'un artefact

Par défaut, GitHub conserve vos artefacts pendant 90 jours. C’est pratique pour garder une trace mais, en pratique, ce n'est pas toujours nécessaire. Surtout sur des projets persos ou des artefacts temporaires.

Sachez qu'il est possible de personnaliser cette durée avec le paramètre `retention-days` :

```yml
with:
  name: frontend-build
  path: dist/
  retention-days: 3
```

Dans cet exemple, l’artefact sera supprimé automatiquement **au bout de 3 jours**.

<br>

Si vous vous demandez pourquoi il peut être intéressant de raccourir la durée de vie d'un artefact, sachez qu'on s'en sert principalement pour :

- pour éviter de saturer votre quota de stockage ;
- pour ne pas garder de fichiers inutiles à long terme (ex. : builds intermédiaires, rapports éphémères) ;
- pour limiter les coûts sur des projets très actifs.


<br>

Pour être honnête, je m'en sers assez peu sur NX, parce que je ne dépasse pas les cotas même quand je suis très actif dessus. Mais c'est quelque chose de bon à savoir.


## Conclusion

- Récapitulatif de ce qu’est un artefact
- À quoi ça sert : partager, réutiliser, archiver des résultats dans un workflow
- Invitation à revenir sur le cours CI/CD
- Invitation à faire le quiz pour valider la compréhension

## Ressources

- [Store and share data with workflow artifacts](https://docs.github.com/en/actions/tutorials/store-and-share-data)
- [GitHub Actions Deep Dive - aCloudGuru](https://www.pluralsight.com/courses/github-actions-deep-dive)


</article>