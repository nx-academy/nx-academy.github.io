---
layout: ../../layouts/CheatSheetsLayout.astro

title: Isometric Rendering
description: "A mettre à jour"

imgAlt:
imgSrc:

author: Thomas
kind: Fiche technique
level: Débutant
publishedDate: 03/17/2026
---

<article>

# Comment afficher une grille isométrique avec Pygame ?

Si vous avez lu [ma fiche d'introduction à Pygame](/fiches/intro-a-pygame), vous
savez maintenant comment fonctionne une game loop et pourquoi le pattern
update/draw est fondamental. On a même construit un petit idle game ensemble.

On va maintenant passer à quelque chose de plus visuel. Et on va commencer par
une question, dans un city builder, comment afficher une carte sur laquelle
poser des bâtiments ? Via une grille isométrique. C'est une technique utilisée
dans SimCity, Age of Empires ou Civilization. Cette technique donne l'illusion
de profondeur sans avoir besoin d'un moteur 3D.

Dans cette fiche, on va construire cette grille étape par étape. On fera d'abord
une vue de dessus classique (comme aux echecs), puis on appliquera la projection
isométrique. On ajoutera aussi la détection de survol à la souris. On dit aussi
le hover. Tout cela implique de comprendre un concept clé dans le dev de jeux
video : la conversion entre systèmes de coordonnées (sexy hein ^^).

Le code complet est disponible
[sur GitHub](https://github.com/tdimnet/learn-pygame-by-doing).

<br>

## C'est quoi une vue isométrique ?

<br>

## Dessiner une grille top-down

<br>

## Ajouter le hover (top-down)

<br>

## Passer en vue isométrique

<br>

## Faire fonctionner le hover en iso

<br>

## Bonus – Un pattern à retenir : grid ↔ screen

</article>
