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

- Quand utiliser un artefact vs quand ne pas en utiliser un 
- Ne pas abuser des artefacts pour stocker tout un projet
- Éviter les fichiers trop volumineux (GitHub impose des quotas)
- Bien nommer ses artefacts (ex : build-${{ github.sha }})
- Ne pas confondre artefact temporaire (téléchargeable) et cache partagé (ex : node_modules)


## Exemple concret - Build d'un projet front

Un job qui :
- installe les dépendances (npm ci)
- génère un dossier dist avec npm run build
- utilise actions/upload-artifact pour uploader dist

```yml
- name: Build frontend
  run: npm run build

- name: Upload dist as artifact
  uses: actions/upload-artifact@v4
  with:
    name: frontend-build
    path: dist/

```

## Exemple concret - Génération d'un rapport de test

Un job qui :
- exécute des tests avec couverture
- archive le fichier coverage/index.html ou l’ensemble du dossier coverage

```yml
- name: Run tests
  run: npm test -- --coverage

- name: Upload coverage report
  uses: actions/upload-artifact@v4
  with:
    name: coverage-report
    path: coverage/
```

Ces rapports sont ensuite téléchargeables depuis l’interface GitHub.

## Bonus - Limiter la durée de rétention d'un artefact

GitHub permet de spécifier une durée personnalisée de rétention en jours :

```yml
with:
  name: frontend-build
  path: dist/
  retention-days: 3
```

Tu peux indiquer que par défaut, la rétention est de 90 jours, mais qu’il est recommandé de la baisser pour les fichiers non critiques (ex : artefacts temporaires d’un projet perso).

Peut-être préciser à quoi sert la rétention ? Pourquoi voulons-nous garder un artefact aussi longtemps ? Impact sur les coûts ?

## Conclusion

- Récapitulatif de ce qu’est un artefact
- À quoi ça sert : partager, réutiliser, archiver des résultats dans un workflow
- Invitation à revenir sur le cours CI/CD
- Invitation à faire le quiz pour valider la compréhension

## Ressources

- [Store and share data with workflow artifacts](https://docs.github.com/en/actions/tutorials/store-and-share-data)
- [GitHub Actions Deep Dive - aCloudGuru](https://www.pluralsight.com/courses/github-actions-deep-dive)


</article>