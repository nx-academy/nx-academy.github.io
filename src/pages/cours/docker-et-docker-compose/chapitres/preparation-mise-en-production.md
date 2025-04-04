---
layout: ../../../../layouts/ChapterLayout.astro

title: Préparez votre application pour la production
description: Une nouvelle super description dédiée à Docker

previousChapterLink: developpement-environnement-conteneurisation

chapterNumber: 3
sectionNumber: 3
id: 9
---

<article>

# Préparez votre application pour la production 

Avant de poursuivre la lecture de ce chapitre, veuillez vous mettre [sur la branche partie-3/chapitre-3-debut](https://github.com/nx-academy/Conteneurisez-vos-applications-avec-Docker/tree/partie-3/chapitre-3-debut). En plus de cette branche, nous allons utiliser [cette issue Github](https://github.com/nx-academy/Conteneurisez-vos-applications-avec-Docker/issues/6) comme problématique. Je vous invite à en prendre connaissance avant de passer à la lecture du chapitre.

![Un superhero regardant une ville de nuit, pixel art](/docker-port.webp)

## Différenciez les environnements de développement et de production

Nous arrivons à la fin de ce cours sur Docker. Et oui, c’est déjà le dernier chapitre ! Il y a d’autres notions relatives à Docker dont j’aurais bien aimé parler mais je garde ça pour un futur cours dédié aux infrastructures réseaux et à la mise en production d’applications.

Dans ce chapitre, nous allons revenir un peu sur notre Dockerfile. En effet, j’ai volontairement simplifié le Dockerfile durant la majeure partie du cours. Mon objectif était que vous vous concentriez sur les concepts autour de Docker et docker-compose et comment mettre en place votre environnement de développement. Vous allez maintenant découvrir comment optimiser vos images Docker pour la production grâce au multi-staging.

Mais avant d’aller plus loin, j’ai envie de vous poser une question.
Qu’est-ce qui distingue un environnement de développement d’un environnement de production ? Si la réponse ne vous vient pas comme ça, ce n’est pas grave. Faites une recherche rapide sur Internet.

<br>

![](/cours-docker/meme-docker.png)

<br>

C’est bon, vous avez trouvé ?

La principale différence entre un environnement de développement et un environnement de production est sa taille (en méga ou giga octets). La taille d’une image influe sur la rapidité d'exécution de l'environnement. Un environnement de développement est très souvent plus lourd que celui de production.

On y retrouve l’ensemble des dépendances, dont celles de développement. L’accent n’est pas mis sur la vitesse d'exécution mais plus sur l’expérience de développement. Par exemple, avoir des logs d’erreurs complets, avoir des outils d’analyse de qualité de code (EsLint et Prettier) et d’autres outils tels que Nodemon.

Contrairement à un environnement de développement, un environnement de production se doit d’être le plus léger et le plus rapide possible. C’est un peu comme une Formule 1 lors des qualifications. Vous n’embarquez que le nécessaire et supprimez le superflu. Vous optimisez votre image pour la production en faisant bien attention aux dépendances dans votre `package.json` mais vous devez aussi optimiser votre image Docker pour qu’elle soit la plus légère possible. C’est le moment de privilégier des distributions telles [que des images alpines](https://www.docker.com/blog/how-to-use-the-alpine-docker-official-image/). Sachez qu’il existe deux approches pour optimiser ses images Docker.

---

<br>

![Un vigile à l'entrée d'une boite de nuit, pixel art](/homme-magasin-voiture.webp)

## Utilisez un seul Dockerfile pour plusieurs environnements

Quand on souhaite optimiser une image Docker pour la production, on peut souvent envisager deux solutions. La première solution est de créer plusieurs fichiers Dockerfile. Un fichier `dev.Dockerfile`, `stagging.Dockerfile` et `prod.Dockerfile`. Ce genre d’approche va vous permettre d’avoir un fichier bien écrit par environnement.

<br>

Par exemple, mon fichier `prod.Dockerfile` pourrait ressembler à ça :

```dockerfile
FROM node:18-alpine

ENV NODE_ENV=production

WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .  

CMD ["node", "server.js"]
```

<br>

Et mon dev.Dockerfile à ça :

<br>

```dockerfile
FROM node:18

ENV NODE_ENV=dev

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

CMD ["nodemon", "server.js"]
```

<br>

C’est une approche qui peut sembler assez logique, cela dit, ce n’est pas forcément une bonne pratique (c’est même [un anti-pattern](https://fr.wikipedia.org/wiki/Antipattern)). En effet, vous allez avoir des images différentes pour vos environnements et c’est ce que Docker essaye d’éviter. Idéalement, vous ne souhaitez avoir qu’un fichier Dockerfile pour l’ensemble de votre projet.

La deuxième solution est donc d’avoir un fichier Dockerfile. Votre fichier Dockerfile sera un peu plus long mais grâce au multi-staging, vous pourrez exécuter certaines commandes en fonction de votre environnement. Par exemple, ajoute uniquement les fichiers contenus dans le dossier public pour notre web-app ou utilise la commande `npm run build` plutôt que `npm ci`.

<br>

Mais du coup, le multi-staging, c’est quoi ?

---

<br>

![Un vigile à l'entrée d'une boite de nuit, pixel art](/homme-magasin-voiture.webp)

## Découpez votre image `web` avec le multi staging

**Le principe du multi-staging en Docker est d’avoir plusieurs images dans votre fichier Dockerfile**. Souvenez-vous, l’instruction `FROM` vous permet de définir l’image sur laquelle vous souhaitez travailler. Grâce au multi-staging, vous aurez plusieurs instructions `FROM` à l’intérieur de vos fichiers Dockerfile.

</article>
