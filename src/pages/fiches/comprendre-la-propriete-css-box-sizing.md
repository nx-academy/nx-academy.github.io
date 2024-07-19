---
layout: ../../layouts/CheatSheetsLayout.astro

title: Comprendre la propriété CSS box sizing
description: sd
---

<article>

# Comprendre la propriété CSS box sizing

![Un enfant rangeant ses jouets dans un carton dans sa chambre, pixel art](/enfant-rangeant-jouets.webp)


J'ai découvert la propriété CSS `box-sizing` il y a plus de 10 ans (ça ne nous rajeunit pas !) grâce à un cours [sur Teamtreehouse](https://teamtreehouse.com/). À cette époque, j'utilisais énormément les cours de Teamtreehouse pour me former en développement web.

Au fil des années, j'ai constaté une réelle différence entre les ressources anglophones et francophones, notamment concernant l'apprentissage de cette propriété. Bien que la propriété `box-sizing` soit couramment enseignée dans les cours anglophones, elle reste encore méconnue pour de nombreux développeurs francophones, surtout les plus juniors. C'est, selon moi, un vrai problème : beaucoup de développeurs en herbe ne connaissent pas cette propriété et ne savent pas à quel point elle est utile.

Attention, je ne dis pas qu'elle va littéralement transformer vos intégrations et résoudre tous vos ennuis. Cela dit, elle vous permettra d'avoir des designs plus prédictibles. En fait, **avoir du code CSS prédictible est l'essence même d'une bonne intégration**. Utiliser `box-sizing` va grandement simplifier la gestion des mises en page. Elle va aussi vous éviter des calculs complexes pour ajuster les dimensions des éléments. Pour faire simple, elle va rendre vos projets plus robustes et plus faciles à maintenir.


## Définition | Présentation avec des mots simples

- Définition en une à deux phrases
- A quoi sert cette propriété ?
- Pourquoi utilise-t-on souvent `box-sizing: border-box` ?

```css
* {
  box-sizing: border-box;
}
```

## Utilisation | Différencier border-box de content-box

- Pour moi, il n'y a qu'un seul cas d'utilisation possible
- Vérifier s'il n'en existe pas d'autres.
- Préciser que c'est comme se brosser les dents, c'est une bonne pratique de le faire si on veut éviter les carries.

La solution de Paul Irish : 

```css
/* apply a natural box layout model to all elements, but allowing components to change */
html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
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
