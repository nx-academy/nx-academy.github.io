---
layout: ../../layouts/CheatSheetsLayout.astro

title: Comprendre le mot clef "this"
description: sd
---

<article>

# Comprendre le mot clef "this"

![Deux personnes dans une cuisine différente, pixel art](/this_context.webp)

Dans le cadre [d'un cours en ligne avancé sur le JavaScript disponible sur la plateforme Udemy](https://www.udemy.com/course/pro-javascript/), qui comprend des cours vidéos ainsi que des supports écrits et des exercices pratiques à réaliser par soi-même, j'ai été confronté à l'utilisation du mot clef "this" lors de la réalisation d'un exo consistant à "revisiter" le jeu Puissance 4 par le biais de la POO (programmation orientée objet).

Durant ce projet, je me suis particulièrement intéressé à l'utilisation des `classes` et de la manière dont est géré le mot clef "this" dans ce cadre, et en dehors. **Il est primordiale de bien saisir les différences de comportement de "this" lorsqu'il est utilisé :**

- En `mode strict` ou `mode non-strict`.
- Dans le `context global` (référence à l'objet window du navigateur), dans des `objets littéraux`, des `fonctions`(fléchée ou non) ou des `classes`(sucre synthaxique permettant leur utilisation en JS).
- Avec les `méthodes d'instance` disponible depuis `l'objet global`( p/e : window.addEventListener(event, callback()) ).
- Suivant son `contexte d'exécution` et son `environnement lexical`.

J'ai agrémenté mes recherches sur [la rubrique lui étant dédiée dans la documentation du MDN Web Doc](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/this) qui offre déjà une base pour comprendre le fonctionnement du "this".

## Pourquoi est-ce important de comprendre le mot clef "this" ?

Il est souvent méconnu par certains dévéloppeurs dans le cadre d'une utilisation avancé et peut très vite poser de gros problèmes dans l'exécution de votre code s'il n'est pas compris et implémenter correctemment, en toutes connaissances de causes. Qui ne s'est jamais "arraché les cheveux" après plusieurs heures de debbug suite à une gestion incorrect de ce "merveilleux" mot clef ?? 😅

## Comment l'utiliser suivants les cas de figures ?
