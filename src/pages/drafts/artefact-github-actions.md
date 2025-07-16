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

- Définition : un artefact est un fichier ou dossier généré pendant un workflow GitHub Actions et mis à disposition en fin de job. Il peut être téléchargé ou utilisé dans un autre job.
- Pourquoi on a besoin des artefacts dans nos applications ?
- Exemple d'un artefact avec l'action `actions/upload-artifact`
- Différence avec les logs, caches et secrets (optionnel)


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

</article>