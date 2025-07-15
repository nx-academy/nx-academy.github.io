---
layout: ../../layouts/CheatSheetsLayout.astro

title: Quand et comment déclencher un workflow GitHub Actions ?
description: 

imgAlt: 
imgSrc: 

author: Thomas
kind: Fiche technique
level: Débutant
publishedDate: 09/05/2025
---

<article>

# Quand et comment déclencher un workflow GitHub Actions ?

## Introduction - Pourquoi parle-t-on de déclencheurs ?

- C'était promis ! Je commence à faire la transition vers un autre élément clé de la boite à outils DevOps : les fameuses CI serveurs.
- C'est l'un de mes points préférés dans le DevOps. Automatiser des tâches récurrents est toujours très satisfaisant. Ca me fait toujours beaucoup penser à des jeux vidéos d'usine type Factorio ou Satisfactory. C'est l'une des nombreuses raisons qui me font aimer et faire de l'informatique.
- Dans cette fiche technique, on va s'intéresser à un concept essentiel des CI serveurs : les déclencheurs ! 
- Parce que non, un workflow GitHub Actions ne tourne pas "magiquement". En effet, chaque workflow a besoin d’un ou plusieurs déclencheurs pour savoir quand s’exécuter.

## C’est quoi un déclencheur dans GitHub Actions ?

- Définition du concept de déclencheur en quelques mots (pas besoin de faire 3 phrases dessus). Peut-être faire une comparaison avec les `addEventListener` côté JavaScript
- Dans notre fichier de configuration CI, par exemple, `deploy.yml` chez moi, il est situé dans le champ `on`.
- On peut définir un ou plusieurs déclencheurs.
- Exemple de code générique contenant deux déclencheurs.

## Les déclencheurs les plus courants

### Le déclencheur `push`

### Le déclenceur `pull_request`

### Le déclenceur `workflow_dispatch`

## Comment bien les configurer ?

## Quel déclencheur choisir selon le contexte ?

## Bonus – Le déclencheur CRON avec schedule

## Conclusion

## Ressources

</article>
