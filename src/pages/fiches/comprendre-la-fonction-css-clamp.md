---
layout: ../../layouts/CheatSheetsLayout.astro

title: Comprendre la fonction CSS Clamp
description: La fonction CSS Clamp est particulièrement utile. Nous nous en servons chez NX Academy pour rendre les polices responsives. En une ligne, vous pouvez adapter la taille de la police sur vos différentes formats. Pratique, non ?

imgAlt: Quelqu'un mesurant un salon avec un mètre, pixel art
imgSrc: /homme-mesure-salon.webp

kind: Fiche technique
level: Intermédiaire
author: Thomas
draft: false
publishedDate: 07/17/2024
---

<article>

# Comprendre la fonction CSS Clamp

![Quelqu'un mesurant un salon avec un mètre, pixel art](/homme-mesure-salon.webp)

J'ai récemment travaillé sur un projet [dans le cadre du parcours "Building Responsive Layouts"](https://www.frontendmentor.io/learning-paths/building-responsive-layouts--z1qCXVqkD) de Frontend Mentor. Comme tous les parcours de Frontend Mentor, celui-ci inclut des projets pratiques et des articles techniques. Chaque parcours vous fait travailler un aspect très précis du front-end, par exemple, l'accessibilité web ou le responsive web design.

Au cours de ce projet, je me suis intéressé à la gestion responsive des tailles de polices. Autrement dit, je cherchais des manières optimales d'utiliser les propriétés `line-height` et `font-size`. **Il est important de comprendre que les tailles de polices varient en fonction des tailles d'écran**. En effet, plus votre écran est grand, plus vous pouvez afficher des polices de grande taille. À l'inverse, sur un téléphone, où l'espace est limité, les tailles de police seront souvent plus petites.

En parcourant les ressources fournies, je suis tombé [sur une excellente ressource de web.dev](https://web.dev/learn/design/typography). Elle mentionnait la fonction CSS `clamp()`. Pour être parfaitement honnête, je ne connaissais pas cette fonction. J'ai découvert une fonction CSS particulièrement pratique et puissante. L'objectif de cette fiche technique est de vous donner toutes les armes pour être capable de l'intégrer facilement dans vos projets !

Pour votre information, **1 rem sera égal à 16 pixels**.

## Pourquoi la fonction clamp est-elle utile ?

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

- La taille mininale sera d'1rem, autrement dit, 16 pixels.
- La taille idéale sera de 2.5vw, soit 2.5% de la largeur de la fenêtre.
- La taille maximale sera de 2rem.

La fonction `clamp` peut être utiliser pour gérer plus facilement la partie responsive de nos polices. Ce qui aurait demandé avant plusieurs lignes de CSS et l'utilisation de media queries est maintenant réalisable en une seule ligne. Point important, cette fonction [est en grande partie supportée](https://caniuse.com/css-math-functions) par nos différents navigateurs.

Sachez que les cas d'utilisation ne se résument pas uniquement à la gestion de la taille des polices. Vous pouvez aussi le faire sur les marges intérieures et/ou extérieures mais aussi sur les largeurs des éléments. On va maintenant s'intéresser à quelques exemples pratiques.

## Comment utiliser la fonction clamp ?

Comme je vous le disais en introduction, j'ai utilisé en premier lieu la fonction `clamp` avec la propriété `font-size`. Je devais styliser une balise `h1`. Elle devait faire au minimum 40 pixels et au maximum 64. Pour des soucis d'accessibilité, j'utilise les `rem` comme unité de valeur.

Mon code CSS ressemblait à quelque chose comme ça :

```css
h1 {
  font-size: 2.5rem; /* = 40 pixels */

  @media screen and (min-width: 90rem) {
    font-size: 4rem; /* = 64 pixels */
  }
}
```

Le problème principal de ce code, en dehors de son côté "verbeux", est qu'il n'est pas totalement responsive. En effet, en-dessous de 90 rem (1440 pixels), la police reste à 40 pixels. C'est ok pour les téléphones portables, mais ça peut être un problème pour les ordinateurs portables et les tablettes. C'est là que la fonction `clamp` rentre en jeu.

```css
h1 {
  font-size: clamp(2.5rem, 1.9718rem + 2.2535vw, 4rem);
}
```

Dans cet exemple, les valeurs minimale et maximale sont de 40 et 64 pixels. Jusque ici, rien de nouveau.

La valeur idéale, par contre, est dynamique. Elle comprend une valeur fixe, `1.9818rem` et une valeur relative `2.2535vw`. Cette combinaison permet d'ajuster la taille de la police de manière plus précise en fonction de la largeur de la fenêtre.

- Sur un écran de 768 pixels, la valeur idéale sera de 48.84768 pixels.
- Sur un écran de 1024 pixels, la valeur idéale sera de 54.6144 pixels.

Pour les deux exemples ci-dessus, on utilisera la valeur idéal et non les valeurs minimale et maximal puisque la valeur idéale sera située entre les deux.

Sachez que la fonction `clamp` n'est pas limitée à la propriété `font-size`.

```css
/* Ici, un exemple avec la propriété line-height */
h1 {
  line-height: clamp(2.25rem, 2.0739rem + 0.7512vw, 2.75rem);
}

/* Et ici avec une propriété margin */
.container {
  margin: clamp(1rem, 1.574rem + 2.5vw, 3rem);
}
```

## Comment calculer la valeur idéale ?

Quand on voit le calcul de la valeur idéale, il y a de quoi avoir des sueurs froides. Surtout si les mathématiques vous ont traumatisé. La bonne nouvelle, c'est que j'ai trouvé [cet outil](https://fluid.style/type?min=1&max=1.125&min-bp=2&max-bp=90&unit=%22rem%22). Je l'ai découvert [sur cet excellent article de CSS Tricks](https://css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport/).

![Capture d'écran de l'application permettant de calculer la valeur idéale avec la fonction clamp](/screenshot-app-calcul-valeur-ideal.png)

Avec cet outil, vous spécifiez la taille d'écran minimum et maximum, puis la valeur minimum et maximum de la police (la propriété `font-size`) et enfin la valeur de votre `rem`.

Vous n'avez maintenant plus d'excuses pour ne pas vous en servir dans vos projets :).

## Ressources

- [La fonction Clamp - MDN](https://developer.mozilla.org/fr/docs/Web/CSS/clamp)
- [Linearly Scale font-size with CSS clamp() Based on the Viewport](https://css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport/)
- [CSS min(), max(), and clamp()](https://web.dev/articles/min-max-clamp)
- [Modern Fluid Typography Using CSS Clamp](https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/)
- [CSS math functions min(), max() and clamp()](https://caniuse.com/css-math-functions)
- [An accessible fluid type generator](https://fluid.style/type?min=1&max=1.125&min-bp=2&max-bp=90&unit=%22rem%22)

</article>
