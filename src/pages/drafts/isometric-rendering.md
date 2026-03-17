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

Dans cette fiche, on va **construire cette grille étape par étape**. On fera
d'abord une vue de dessus classique (comme aux echecs), puis on appliquera la
projection isométrique. On ajoutera aussi la détection de survol à la souris. On
dit aussi le hover. Tout cela implique de comprendre un concept clé dans le dev
de jeux video : la conversion entre systèmes de coordonnées (sexy hein ^^).

Le code complet est disponible
[sur GitHub](https://github.com/tdimnet/learn-pygame-by-doing).

<br>

## C'est quoi une vue isométrique ?

**La vue isométrique est une technique d'affichage qui donne l'illusion de
profondeur sur un écran 2D sans utiliser de vrai moteur 3D**. Simple comme
définition, non ?

<br>

Pour aller un peu plus loin, on va comparer trois approches :

- Dans un jeu 3D classique comme Minecraft, la caméra se trouve dans un espace
  tridimensionnel. Autrement dit, les objets lointains paraissent plus petits.
- Dans un jeu 2D vu de dessus comme Stardew Valley, tout est plat. Il n'y a donc
  pas de profondeur, ni d'élévation (on pourrait aussi appeler ca de la
  geographie).
- L'isométrique se situe entre les deux. On observe le monde depuis un angle
  fixe, généralement à 30 degrés par rapport au sol. Ça donne l'impression de
  volume mais sans les calculs complexes du rendu 3D.

<br>

C'est une technique particulièrement populaire dans les jeux de stratégie et de
gestion parce qu'elle :

- montre clairement l'élévation et la structure des bâtiments ;
- est peu coûteuse à calculer, on dessine "juste" des sprites plats dans le bon
  ordre ;
- passe très bien à l'échelle même avec des centaines de tuiles à l'écran.

Le dernier point est particulièrement important avec Pygame. C'est une librairie
qui tourne uniquement sur CPU, on doit donc faire attention à l'optimisation des
performances.

La contrepartie est que l'angle de caméra est fixe. On ne peut pas faire pivoter
la vue. Pour un city builder, c'est tout à fait acceptable : je veux un
affichage lisible, pas une caméra libre.

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
