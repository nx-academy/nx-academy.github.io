---
layout: ../../layouts/CheatSheetsLayout.astro

title: Découvrir la propriété CSS Clamp
description: sd
---

<article>

# Découvrir la fonction CSS Clamp

![Quelqu'un mesurant un salon avec un mètre, pixel art](/homme-mesure-salon.webp)

<!-- ## Problématique | Situation personnelle -->
<!-- ## A la recherche des tailles de police responsive. -->

J'ai récemment travaillé sur un projet [dans le cadre du parcours "Building Responsive Layouts"](https://www.frontendmentor.io/learning-paths/building-responsive-layouts--z1qCXVqkD) de Frontend Mentor. Comme tous les parcours de Frontend Mentor, celui-ci inclut des projets pratiques et des articles techniques. Chaque parcours vous fait travailler un aspect très précis du front-end, par exemple, l'accessibilité web ou le responsive web design.

Au cours de ce projet, je me suis intéressé à la gestion responsive des tailles de polices. Autrement dit, je cherchais des manières optimales d'utiliser les propriétés `line-height` et `font-size`. **Il est important de comprendre que les tailles de polices varient en fonction des tailles d'écran**. En effet, plus votre écran est grand, plus vous pouvez afficher des polices de grande taille. À l'inverse, sur un téléphone, où l'espace est limité, les tailles de police seront souvent plus petites.

En parcourant les ressources fournies, je suis tombé [sur une excellente ressource de web.dev](https://web.dev/learn/design/typography). Elle mentionnait la fonction CSS `clamp()`. Pour être parfaitement honnête, je ne connaissais pas cette fonction. J'ai découvert une fonction CSS particulièrement pratique et puissante. L'objectif de cette fiche technique est de vous donner toutes les armes pour être capable de l'intégrer facilement dans vos projets !


## Un outil idéal pour la gestion responsive des polices

Selon le [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp), 

> The clamp() CSS function clamps a middle value within a range of values between a defined minimum bound and a maximum bound. The function takes three parameters: a minimum value, a preferred value, and a maximum allowed value.

La fonction CSS `clamp()` permet de définir une valeur en fonction de trois paramètres : une valeur minimale, une valeur idéale et une valeur maximale. Elle assure ainsi que la valeur finale reste toujours entre la valeur minimale et la valeur maximale en visant la valeur idéale quand c'est possible.


Par exemple :

```css
h1 {
  font-size: clamp(1rem, 2.5vw, 2rem);
}
```

Si on prend le temps de revenir sur le code ci-dessus,

- La taille mininal sera d'1rem, autrement dit, 16 pixels.
- La taille idéale sera de 2.5vw, soit 2.5% de la largeur de la fenêtre.
- La taille maximale sera de 2rem.


La fonction `clamp` peut être utiliser pour gérer plus facilement la partie responsive de nos polices. Ce qui aurait demandé avant plusieurs lignes de CSS et l'utilisation de media queries est maintenant réalisable en une seule ligne. Point important, cette fonction [est en grande partie supportée](https://caniuse.com/css-math-functions) par nos différents navigateurs.

Sachez que les cas d'utilisation ne se résument pas uniquement à la gestion de la taille des polices. Vous pouvez aussi le faire sur les marges intérieures et/ou extérieures mais aussi sur les largeurs des éléments. On va maintenant s'intéresser à quelques exemples pratiques.


## Utilisation | Exemples d'utilisation de la propriété clamp

Comme je vous le disais en introduction, j'ai utilisé en premier lieu la fonction `clamp` avec la propriété `font-size`. Je devais styliser une balise `h1`. Elle devait faire au minimum 40 pixels et au maximum 64. Pour des soucis d'accessibilité, j'utilise les `rem` comme unité de valeur.

Mon code CSS ressemblait à quelque chose comme ça : 

```css
h1 {
  font-size: 2.5rem;

  @media screen and (min-width: 90rem) {
    font-size: 4rem;
  }
}
```

- Avec des font sizes
- Avec des line height ?


## Ressources | Allez plus loin

- https://developer.mozilla.org/fr/docs/Web/CSS/clamp
- https://css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport/
- https://web.dev/articles/min-max-clamp
- https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/
- https://caniuse.com/css-math-functions

</article>
