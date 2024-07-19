---
layout: ../../layouts/CheatSheetsLayout.astro

title: Découvrir la propriété CSS box sizing
description: sd
---

<article>

# Découvrir la propriété CSS box sizing

![Un enfant rangeant ses jouets dans un carton dans sa chambre, pixel art](/enfant-rangeant-jouets.webp)

## Problématique | Situation personnelle

- Découverte de la propriété box sizing il y a plus de 10 ans maintenant sur un cours de teamtreehouse.
- Si la connaissance de cette propriété est répandu dans les ressources anglophones, je suis toujours étonné que les cours francophones n'en parlent que trop peu. En rédigeant cet article, j'ai jeté un oeil aux cours de HTML et CSS d'OpenClassrooms et il n'en est absolument pas question.
- Il existe tout de même bien des ressources telle que la cascade et alsa creation qui en parlent.
- Pourtant, cette propriété est essentielle pour réaliser des designs reponsives et maitrisés.

## Définition | Présentation avec des mots simples

- Définition en une à deux phrases
- A quoi sert cette propriété ?
- Pourquoi utilise-t-on souvent `box-sizing: border-box` ?

```css
* {
  box-sizing: border-box;
}
```

## Utilisation | Exemples avec des cas d'usage

- Pour moi, il n'y a qu'un seul cas d'utilisation possible
- Vérifier s'il n'en existe pas d'autres.
- Préciser que c'est comme se brosser les dents, c'est une bonne pratique de le faire si on veut éviter les carries.

La solution de Paul Irish : 

```css
/* apply a natural box layout model to all elements, but allowing components to change */
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
```

## Ressources | Allez plus loin

- [* { Box-sizing: Border-box } FTW](https://www.paulirish.com/2012/box-sizing-border-box-ftw/)
- [La propriété CSS box-sizing - MDN](https://developer.mozilla.org/fr/docs/Web/CSS/box-sizing)
- [Box-Sizing: The Secret to Simple CSS Layouts](https://blog.teamtreehouse.com/box-sizing-secret-simple-css-layouts)
- [Take Control of the Box Model with box-sizing](https://blog.teamtreehouse.com/take-control-of-the-box-model-with-box-sizing)
- [La propriété CSS box-sizing - Pierre Giraud](https://www.pierre-giraud.com/html-css-apprendre-coder-cours/box-sizing/)

</article>
