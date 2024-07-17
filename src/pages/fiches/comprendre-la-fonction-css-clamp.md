---
layout: ../../layouts/CheatSheetsLayout.astro

title: Comprendre la propriété CSS Clamp
description: sd
---

<article>

# Comprendre la fonction CSS Clamp

![Quelqu'un mesurant un salon avec un mètre, pixel art](/public/homme-mesure-salon.webp)

## Problématique | Situation personnelle

J'ai récemment travaillé sur un projet dans le cadre du parcours "Building Responsive Layouts" proposé par Frontend Mentor. Comme tous les parcours de Frontend Mentor, celui-ci inclut des projets pratiques et des articles techniques. Chaque parcours vous fait travailler un aspect très précis du front-end, par exemple, l'accessibilité web ou le responsive web design.

Au cours de ce projet, j'ai été amené à étudier la gestion responsive des tailles de polices, notamment les propriétés `font-size` et `line-height`. **Il est important de comprendre que les tailles de polices varient en fonction des tailles d'écran**. Cela fait sens quand on y réfléchit : plus votre écran est grand, plus vous pouvez afficher des polices de grande taille. À l'inverse, sur un téléphone, où l'espace est limité, les tailles de police seront souvent plus petites.

En parcourant les ressources fournies, je suis tombé sur un article qui mentionnait la fonction CSS `clamp()`. Pour être parfaitement honnête, je ne connaissais pas cette fonction. J'ai découvert une fonction CSS particulièrement pratique et puissante. L'objectif de cette fiche technique est de vous donner toutes les armes pour être capable de l'intégrer facilement dans vos projets !


## Présentation | Définition avec des mots simples

[Selon le MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp), 

> The clamp() CSS function clamps a middle value within a range of values between a defined minimum bound and a maximum bound. The function takes three parameters: a minimum value, a preferred value, and a maximum allowed value.


Autrement dit, cette fonction CSS permet de définir une valeur qui reste dans une plage donnée, en fonction de trois paramètres : une valeur minimale, une valeur préférée (idéale), et une valeur maximale. Elle garantit que la valeur ne sera jamais inférieure au minimum ni supérieure au maximum, tout en cherchant à atteindre la valeur idéale. Cela simplifie la gestion des dimensions responsives en CSS, en évitant l'utilisation de media queries complexes et en offrant une solution précise et flexible pour des tailles adaptatives.


## Utilisation | Exemples d'utilisation de la propriété clamp
- Avec des font sizes
- Avec des line height ?


## Ressources | Allez plus loin

- https://developer.mozilla.org/fr/docs/Web/CSS/clamp
- https://css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport/
- https://web.dev/articles/min-max-clamp
- https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/
- https://caniuse.com/css-math-functions

</article>
