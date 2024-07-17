---
title: Comprendre la propriété CSS Clamp
description: sd
---

# Comprendre la propriété CSS Clamp

## Problématique | Situation personnelle
- Qu'est-ce qui m'a ammené à me servir de cette propriété ?


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
