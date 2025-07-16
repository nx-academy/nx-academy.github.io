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

## Introduction - Pourquoi parler des artefacts ?

- Ca y est le cours sur les pipelines CI/CD est officiellement disponible sur NX ! A cette occasion, on va revenir sur un concept essentiel : les artefacts.
- Sans le savoir, si vous avez suivi le cours, vous vous en êtes servi en fin de cours pour déployer l'application ReactJS.
- Vous allez voir que ce concept n'est pas si complexe à comprendre et voilà pouvoir les mettre en application très facilement.
- Mise en contexte rapide (= à quel moment, on va avoir besoin d'un artefact ?)


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