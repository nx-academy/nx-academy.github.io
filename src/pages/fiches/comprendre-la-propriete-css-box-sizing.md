---
layout: ../../layouts/CheatSheetsLayout.astro

title: Comprendre la propriété CSS box sizing
description: Résolvez des possibles problèmes de mise en page avec la propriété CSS Box sizing.
imgAlt: Un enfant rangeant ses jouets dans un carton dans sa chambre, pixel art
imgSrc: /enfant-rangeant-jouets.webp
---

<article>

# Comprendre la propriété CSS box sizing

![Un enfant rangeant ses jouets dans un carton dans sa chambre, pixel art](/enfant-rangeant-jouets.webp)


J'ai découvert la propriété CSS `box-sizing` il y a plus de 10 ans (ça ne nous rajeunit pas !) grâce à un cours [sur Teamtreehouse](https://teamtreehouse.com/). À cette époque, j'utilisais énormément les cours de Teamtreehouse pour me former en développement web. C'est une propriété CSS que j'ai rapidement utilisé lors de mes intégrations. Pour être honnête, je ne comprenais pas forcément comment elle fonctionnait. Par contre, je savais qu'il était important de l'ajouter.


Je continue d'utiliser cette propriété aujourd'hui. Je l'intègre directement [via le reset CSS de Josh Comeau](https://www.joshwcomeau.com/css/custom-css-reset/). J'ai découvert au fil des années que beaucoup de développeurs en herbe ne connaissaient pas cette propriété. Je pense ici principalement à des développeurs francophones. Je pense que cela vient de la différence entre les ressources anglophones et francophones dédiées au développement front. J'ai, par exemple, passé au revu le cours de HTML et CSS d'OpenClassrooms avant d'écrire cette fiche. Il n'en n'est jamais fait question. C'est un peu dommage.


Je ne dis pas qu'elle va littéralement transformer vos intégrations et résoudre tous vos ennuis. Cela dit, elle vous permettra d'avoir des designs plus prédictibles. En fait, **avoir du code CSS prédictible est l'essence même d'une bonne intégration**. Utiliser `box-sizing` va grandement simplifier la gestion des mises en page. Elle va aussi vous éviter des calculs complexes pour ajuster les dimensions des éléments. Pour faire simple, elle va rendre vos projets plus robustes et plus faciles à maintenir.


## Une propriété liée au modèle de boite (box model) du CSS

[Selon le MDN](https://developer.mozilla.org/fr/docs/Web/CSS/box-sizing),

> La propriété CSS box-sizing définit la façon dont la hauteur et la largeur totale d'un élément est calculée.

Autrement dit, elle définit si la largeur et la hauteur spécifiées d'un élément, incluent ou excluent, les bordures (`border`) et marges intérieures (`padding`). On utilise souvent la valeur `border-box` avec la propriété `box-sizing` : elle rend les dimensions des éléments plus prévisibles. L'autre valeur possible pour cette propriété est `content-box`. Vous verrez très bientôt la différence entre ces deux propriétés. Il vous faut dans un premier temps revenir sur le modèle de boite du CSS.


Le modèle de boite du CSS est utilisé pour décrire la structure et le comportement des éléments HTML en termes de dimensions et d'espacement. Chaque élément est représenté comme une boîte rectangulaire composée de quatre parties principales. Un peu comme une poupée russe.


```text
+-------------------------------+
|           Margin               |
|  +-------------------------+  |
|  |        Border            |  |
|  |  +-------------------+  |  |
|  |  |     Padding        |  |  |
|  |  |  +-------------+  |  |  |
|  |  |  |  Content     |  |  |  |
|  |  |  +-------------+  |  |  |
|  |  +-------------------+  |  |
|  +-------------------------+  |
+-------------------------------+
```



- Définition en une à deux phrases
- A quoi sert cette propriété ?
- retour sur le box model en CSS
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



## Comment l'utiliser ?


Le code que vous verez le plus souvent

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

```


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
