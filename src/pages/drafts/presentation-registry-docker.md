---
layout: ../../layouts/CheatSheetsLayout.astro

title: Qu'est-ce qu'un registry Docker ?

author: Thomas
kind: Fiche technique
level: intermédiaire
publishedDate: 06/06/2025
---

<article>

# Qu'est-ce qu'un registry Docker ?

## Introduction

- On continue sur notre série dédiée à Docker avec les registry Docker. Je me suis rendu compte que j'avais abordé ce concept dans le cours sans vraiment faire un chapitre dédié. Cette fiche technique est l'occasion de revenir sur cette notion et de l'approfondir.
- On va partir d'un problème "simple". Vous avez codé un projet sur votre ordinateur en utilisant Docker. Avant toute chose, bravo ! Ca veut dire que votre environnement est conteneurisé et que votre projet va fonctionner chez tout le monde. Mais voilà, votre serveur lui n'a pas Git d'installer. Vous souhaitez avoir une image prête à l'emploi en production.
- Autrement dit, une image Docker reste locale (autrement dit sur votre ordinateur) tant qu’on ne l’a pas envoyée quelque part. Comment la partager à d'autres personnes et notamment dans un environnement de production ?
- Solution : les registries Docker. Ce sont des serveurs où sont stockées, versionnées, partagées les images. Un peu comme GitHub ou GitLab pour votre code.

## C'est quoi un registry Docker ?

- Définition
  - C'est un service de stockage et de distribution d’images Docker. Un peu comme pour GitHub mais pour les images Docker. D'aillaurs, sachez qu'il est possible d'héberger des images Docker sur GitHub. On y revient dans quelques instants.
  - Comme pour GitHub, votre registry peut être publique (tout le monde y accès) ou privée (vous autorisez l'accès à seulement certaines personnes).
  - DockerHub est le plus connu et le registry par défault. Mais il existe d'autres registries telles que GitHub Container Registry, GitLab, GCR (Google Container Registry). Il est même possible d'héberger votre propre registry Docker sur vos serveurs.


On va faire un petit détour via les images et leur système de tag avant de revenir à la partie authentification sur un registry. Vous allez vite comprendre pourquoi je fais ça.

## Comment fonctionne une image taguée ?



## Authentifiez-vous sur un registry Docker ?

### Tagez et poussez une image

### Pullez une image

## Astuce bonus

## Ressources

</article>
