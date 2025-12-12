---
layout: ../../../../layouts/ChapterLayout.astro

title: Prenez en main le projet fil rouge
description:
  "Découvrez le projet fil rouge du cours Docker : une application React,
  Node.js et MongoDB à cloner, configurer et préparer à la conteneurisation pas
  à pas."

previousChapterLink: installation-et-configuration-docker
nextChapterLink: creation-premier-dockerfile

chapterNumber: 3
sectionNumber: 1
sectionTitle: Partie 1 - Initiez-vous à Docker et au projet fil rouge
id: 3
---

<article>

# Prenez en main le projet fil rouge

![Un homme asiatique en train de lire un manuel de montage, pixel art](/images/cours-docker-et-docker-compose/homme-lecture-manuel.webp)

## Découvrez le projet fil rouge

Maintenant que Docker Desktop est installé et tourne sur votre ordinateur, et
que, accessoirement, vous vous êtes un peu chauffé les mains avec vos premières
commandes Docker, il est l’heure de découvrir le projet fil rouge du cours.

Dans ce cours, nous allons travailler sur un projet full-stack. Ce projet
comprend un front-end en React, une API Rest en Node JS avec Express et une base
de données NoSQL en MongoDB. À la fin de ce cours, vous aurez un projet
entièrement dockerisé qui pourra s’installer et se lancer en deux commandes.

Je vais profiter du screencast ci-dessous pour vous monter le rendu final du
projet. Sachez que je ne vous montrerais que très peu de code dans ce
screencast, je me chargerais de le faire dans une autre vidéo.

<br>

<iframe src="https://player.vimeo.com/video/1096175923?h=0d217df608&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" title="Screencast 5 - Découvrez le projet fil rouge"></iframe>

<br>

Vous allez maintenant cloner le projet fil rouge sur votre ordinateur.

---

<br>

![Un vigile à l'entrée d'une boite de nuit, pixel art](/images/cours-docker-et-docker-compose/homme-dossier-armoire.webp)

## Clonez le projet fil rouge

Vous pouvez dès à présent récupérer le projet
[sur ce repository GitHub](https://github.com/nx-academy/Conteneurisez-vos-applications-avec-Docker).
Clonez et suivez les étapes d’installation. Pour vous faciliter la vie, je vous
ai prévu ce screencast.

<br>

<iframe src="https://player.vimeo.com/video/1096176009?h=e28b08095b&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" title="Screencast 6 - Clonez le projet fil rouge"></iframe>

<br>

Bien, maintenant que le projet est installé et tourne sur votre machine. Il est
temps de s’intéresser au code du projet.

---

<br>

![Un professeur de mathématique ayant un eureka, pixel art](/images/cours-docker-et-docker-compose/prof-math-eureka.webp)

## Appréhendez le code du projet

Pour éviter de trop complexifier votre apprentissage, je vous ai prévu un projet
relativement simple niveau code. Il est composé :

- D’un front-end en React. Ce front communique avec une API Rest via un endpoint
  : `/greetings`.
- Une API Rest utilisant Node.js et Express. Cette API communique avec une base
  de données MongoDB.

Le front et le back utilisent tous deux une vieille version de Node.js, à savoir
la 12. Dans le screencast ci-dessous, je vais prendre le temps de vous présenter
le code plus en détail.

<br>

<iframe src="https://player.vimeo.com/video/1096176059?h=452b397b88&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" title="Screencast 7 - Appréhendez le code du projet"></iframe>

<br>

Bien, il ne me reste plus qu’à vous parler de la problématique globale du cours.

---

<br>

![Un groupe de personnes en train de jouer à un escape game, pixel art](/images/cours-docker-et-docker-compose/groupe-escape-game.webp)

## Découvrez la problématique globale du cours

Voilà, enfin, l’une des sections que j’attends depuis le début. Au moment de
créer ce cours, j’ai eu une idée de projet fil rouge qui m’a beaucoup excitée.
Quand j’en ai parlé autour de moi, j’ai pu voir que ce projet les excitait
aussi. Je vais donc vous présenter la problématique globale du cours, ce projet
fil rouge va vous permettre de comprendre pourquoi Docker peut vous sauver la
vie.

Imaginez que vous venez d’arriver dans une entreprise. La stack utilisée est en
full JavaScript, aussi bien côté front-end que back-end. La plupart des projets
de l’entreprise sont à jour tant en termes de dépendances que de runtime.
Souvenez-vous que les dépendances correspondent à vos librairies, par exemple
Mongoose ou Tailwind, et le runtime correspond à l'environnement d'exécution,
autrement dit NodeJS dans sa version 18. La plupart des projets utilise Node 18
et Mongoose 7. Quand vous arrivez dans l’entreprise, vous installez NodeJS,
peut-être via NVM, et vous en profitez aussi pour installer MongoDB 6 sur votre
ordinateur. Jusque-là, pas de problèmes, vous êtes capable de faire tourner les
projets facilement et rapidement sur votre ordinateur.

Un beau jour, l’un de vos collègues vient vous voir. Il est bien embêté. On lui
a demandé de reprendre un vieux projet existant de l’entreprise pour y intégrer
de nouvelles fonctionnalités. Le projet tourne actuellement sur une machine de
production. Seulement voilà, il utilise Node 12, MongoDB 3 et a de nombreuses
majeures de retard. Par exemple, Mongoose est en version 4.

Votre collègue a bien essayé d’installer le projet à coup de `npm install` et a
trouvé une version de MongoDB 3 mais il n’a pas réussi à faire fonctionner le
projet sur son ordinateur. Pire même, il pense que cela a créé des problèmes sur
ces autres projets. Votre mission va donc être de dockeriser l’ensemble de
l’environnement pour pouvoir facilement reprendre le projet, le partager avec
vos collègues puis réaliser des montées de version.

Ce projet fil rouge est un cas classique d’utilisation de Docker. Il m’est déjà
arrivé de devoir reprendre des projets en Python 2 ou Php 5 pour fixer des
failles de sécurité ou migrer le projet d’un serveur à un autre.

---

<br>

![Un vendeur de journaux dans la rue, pixel art](/images/cours-docker-et-docker-compose/vendeur-journaux.webp)

## Résumé

- Le projet fil rouge est composé d’un front-end en ReactJS, d’un back-end en
  Express/Node.JS et d’une base de données MongoDB.
- Le projet utilise des technologies dépréciées. Il ne fonctionne pas
  directement “out of the box” et a besoin d’être dockerisé avant d’être repris
  en main.

</article>
