---
layout: ../../../../layouts/ChapterLayout.astro

title: Créez votre premier docker-compose 
description: Une nouvelle super description dédiée à Docker

previousChapterLink: creation-premier-dockerfile
nextChapterLink: gestion-reseau-infrastructure

chapterNumber: 2
sectionNumber: 2
id: 5
---

<article>

# Créez votre premier docker compose

Avant de poursuivre la lecture de ce chapitre, veuillez vous mettre[ sur la branche `partie-2/chapitre-2-debut`](https://github.com/nx-academy/Conteneurisez-vos-applications-avec-Docker/tree/partie-2/chapitre-2-debut). En plus de cette branche, nous allons utiliser [cette issue Github](https://github.com/nx-academy/Conteneurisez-vos-applications-avec-Docker/issues/2) comme problématique. Je vous invite à en prendre connaissance avant de passer à la lecture du chapitre.

![Un superhero regardant une ville de nuit, pixel art](/docker-port.webp)

## Le fichier `docker-compose`, le squelette de votre infrastructure

Dans le chapitre précédent, je vous ai présenté le Dockerfile comme étant le squelette de votre application. **Un Dockerfile ne représente qu’un pan de votre application**, une API REST par exemple. Or, une infrastructure moderne peut comprendre plusieurs API REST, réalisant chacune une tâche bien précise. Votre infrastructure peut aussi comporter une ou plusieurs bases de données. Une base de données SQL, par exemple pour les factures de vos utilisateurs, et une base de données NoSQL, type MongoDB, pour les données de session de vos utilisateurs. **Bref, votre Dockerfile n’est clairement pas adapté pour gérer des infrastructures**. Souvenez-vous, les conteneurs sont des unités isolées par nature.

</article>

