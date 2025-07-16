---
layout: ../../layouts/CheatSheetsLayout.astro

title: Comment déployer une image Docker depuis les GitHub Actions ?
description: 

author: Thomas
kind: Fiche technique
level: Avancé
publishedDate: 11/07/2025
---

<article>

# Comment déployer une image Docker depuis les GitHub Actions ?

## Introduction - Docker + GitHub Actions = Love

- On arrive à un moment passionnant dans lequel on va pouvoir lier deux notions importants : Docker d'un côté et les pipelines CI/CD de l'autre.
- Ce qui rend ce moment d'autant plus cool pour moi est que les deux cours sont disponibles sur NX et aussi que je commence à faire la transition vers le futur cours sur la mise en production.
- Dans un sens, on arrive un peu à la croisée des chemins et je ne vais pas vous cacher que ça m'excite beaucoup ! Mais trève de bavardages, on va rentrer dans le vif du sujet.
- Imaginez que vous avez une image Docker fonctionnelle ; vous vous en servi dans votre environnement de développement et vous aimeriez bien la partager facilement sur un registry Docker sans avoir à le faire manuellement.
- Grâce à tout ce que vous avez vu sur les pipelines CI/CD, vous savez maintenant que c'est possible, et facilement. Allé, on est parti !


## Créez son token pour DockerHub

- Dans cette fiche technique, nous allons nous concentrer dans un premier temps sur Dockerhub.
- Accès à hub.dockerhub.com
- Création d'un Access Token (voir s'il y a des règles de sécurité et/ou des bonnes pratiques à avoir en tête quand on le fait).
- Ajout des deux secrets dans GitHub : DOCKER_USERNAME et DOCKERHUB_TOKEN.


## Structurez votre workflow GitHub Actions

- Fichier `.github/workflows/docker.yml`
- Déclencheur `on: push`
- Utilisation d’une image officielle (Ubuntu)
- Utilisation des actions officielles de Docker

## Bonnes pratiques et limites (si pertinents)

- Eviter le tag `lastest` qui ne veut rien dire. Vous pouvez essayer de passer plutôt par `${{ github.sha }}` ou `github.ref_name` (expliquer ces notions). L'idéal étant de faire du sémantique versionning.
- Attention aux secrets ! Activer les permissions minimes sur les tokens, surtout si DockerHub est privé !
- N'oubliez le `.dockerignore` !

## Exemple complet commenté

- Exemple complet de pipeline avec decryptage.
- Ajout d'un exemple concret que j'utilise sur NX (peut-être nx-ai qui push sur Dockerhub et que je fais ensuite runner en local sur mon raspberry pi)

## Bonus - Poussez sur GHCR

- Ajout du scope write:packages
- Secrets :
    - GHCR_TOKEN
    - GHCR_USERNAME (ou ${{ github.actor }})
- Tag au format ghcr.io/mon-orga/monapp
- Mention que GitHub Actions peut aussi servir de registry privé interne

## Conclusion

- Résumé du workflow `build → tag → push`.
- Lien vers le quiz
- Lien vers les cours CI/CD et le cours Docker

## Ressources

</article>
