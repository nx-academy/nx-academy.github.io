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

On arrive à un moment passionnant en terme de pédagogie ! Un moment où deux concepts essentiels vont enfin se croiser : Docker d’un côté et les pipelines CI/CD de l’autre. Si vous avez suivi les cours sur NX (vous les avez suivi, hein ?), vous savez déjà manier les images Docker et déclencher un workflow GitHub Actions. Aujourd’hui, on va connecter les deux.

C’est aussi un moment charnière pour NX car cette fiche marque le début de la transition vers le futur cours sur la mise en production. Autrement dit, on var sortir de l’environnement local pour se rapprocher de la vraie vie. Et je ne vais pas vous mentir : ça m’excite pas mal (je suis comme ça, moi : la mise en prod, je trouve ça excitant).

Imaginez : vous avez une image Docker qui fonctionne parfaitement en local. Vous l’avez utilisée pendant votre développement, elle tourne bien et vous en êtes fier (et vous avez raison d'être fier !). Vous aimeriez maintenant la rendre disponible sur un registry Docker, pour pouvoir la déployer ailleurs et surtout, ne plus avoir à faire ça manuellement.

Grâce à ce que vous avez appris sur les GitHub Actions, vous savez déjà qu’il est possible d’automatiser ce genre de tâches. Et vous avez raison. C’est non seulement possible, mais en plus, c’est simple.

Allez, on entre dans le vif du sujet.


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
