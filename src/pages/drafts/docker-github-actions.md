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

On arrive à un moment passionnant en terme de pédagogie ! Un moment où deux concepts essentiels vont enfin se croiser : Docker d’un côté et les pipelines CI/CD de l’autre. Si vous avez suivi les cours sur NX (vous les avez suivi, hein ?), vous savez déjà manier les images Docker et déclencher un workflow GitHub Actions. Aujourd’hui, on va connecter les deux.

C’est aussi un moment charnière pour NX car cette fiche marque le début de la transition vers le futur cours sur la mise en production. Autrement dit, on var sortir de l’environnement local pour se rapprocher de la vraie vie. Et je ne vais pas vous mentir : ça m’excite pas mal (je suis comme ça, moi : la mise en prod, je trouve ça excitant).

Imaginez : vous avez une image Docker qui fonctionne parfaitement en local. Vous l’avez utilisée pendant votre développement, elle tourne bien et vous en êtes fier (et vous avez raison d'être fier !). Vous aimeriez maintenant la rendre disponible sur un registry Docker, pour pouvoir la déployer ailleurs et surtout, ne plus avoir à faire ça manuellement.

Grâce à ce que vous avez appris sur les GitHub Actions, vous savez déjà qu’il est possible d’automatiser ce genre de tâches. Et vous avez raison. C’est non seulement possible, mais en plus, c’est simple.

Allez, on entre dans le vif du sujet.


## Créez son token pour DockerHub

Dans cette fiche technique, on va se concentrer dans un premier temps sur Docker Hub, le registry public par défaut de Docker. Pour que GitHub Actions puisse pousser une image à votre place, il faut lui donner les bons identifiants et idéalement de manière sécurisé.

### Étape 1 – Connectez-vous à Docker Hub

Commencez par vous render sur [hub.docker.com](https://hub.docker.com), connectez-vous à votre compte ou créez-en un si ce n’est pas encore fait. C'est rapide et gratuit !

<br>


### Étape 2 – Générez un Access Token

Dans un cours normal, c’est là où je vous enregistre un petit screencast. Mais pour cette fois, je vais simplement vous décrire les étapes. (Peut-être que je repasserai plus tard sur cette fiche pour ajouter un GIF ou une vidéo.)

Rendez-vous sur :


```text
https://app.docker.com/accounts/<votreUsername>/settings/personal-access-token
```

Puis cliquez sur **Generate new token**. Quelques conseils au passage :

- donnez-lui un nom clair, par exemple `github-actions-nx-ai` ou `ci-myproject` ;
- spécifiez une date d’expiration : 30 à 90 jours selon les cas. Évitez les tokens illimités, c’est une mauvaise habitude ;
- cochez les droits **Read & Write**, ce qui permettra à GitHub Actions de lire et pousser vos images ;
- copiez bien le token immédiatement, vous ne pourrez plus y accéder ensuite.

<br>

Il est maintenant temps de créer vos premiers secrets sur GitHub

<br>

### Étape 3 – Ajoutez vos secrets dans GitHub

Retournez sur GitHub, ouvrez votre repository, puis cliquez sur :

```text
Settings → Secrets and variables → Actions → New repository secret
```

Ajoutez maintenant deux secrets :

- `DOCKER_USERNAME` → votre identifiant Docker Hub ;
- `DOCKERHUB_TOKEN` → le token que vous venez de générer.

<br>

Vous verrez parfois `DOCKER_USERNAME` ou `DOCKERHUB_TOKEN` déclarés directement dans le code du workflow comme variables d’environnement. Je vous déconseille fortement cette approche : ces valeurs seront visibles dans les logs si vous ne faites pas attention.

GitHub propose justement le système de secrets pour éviter ce genre de fuites. Ces secrets sont :

- chiffrés au repos et à la volée ;
- non visibles dans les logs (à moins d’être affichés explicitement, ce qu’on évite) ;
- réservés au scope du repo, ou définis à un niveau organisation si besoin.

<br>

C’est clairement la manière recommandée pour gérer vos identifiants dans un workflow GitHub Actions.


## Structurez votre workflow GitHub Actions

<!-- - Fichier `.github/workflows/docker.yml`
- Déclencheur `on: push`
- Utilisation d’une image officielle (Ubuntu)
- Utilisation des actions officielles de Docker -->

Maintenant que vos identifiants Docker Hub sont bien stockés sous forme de secrets, on va pouvoir écrire notre premier workflow GitHub Actions pour builder et pousser une image Docker automatiquement.



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
