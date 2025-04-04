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

**Le principe du multi-staging en Docker est d’avoir plusieurs images dans votre fichier Dockerfile**. Souvenez-vous, l’instruction `FROM` vous permet de définir l’image sur laquelle vous souhaitez travailler. Grâce au multi-staging, vous aurez plusieurs instructions `FROM` à l’intérieur de vos fichiers Dockerfile. Par exemple :

<br>

```dockerfile
FROM golang:1.16
WORKDIR /go/src/github.com/alexellis/href-counter/
RUN go get -d -v golang.org/x/net/html  
COPY app.go ./
RUN CGO_ENABLED=0 go build -a -installsuffix cgo -o app .

FROM alpine:latest  
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=0 /go/src/github.com/alexellis/href-counter/app ./
CMD ["./app"]
```

<br>

J’ai repris cet exemple de la documentation officielle de Docker. Regardez l’avant dernière instruction : `COPY --from=0 /go/src/github.com/alexellis/href-counter/app ./`.

L’option `--from=0` me permet de récupérer dans l’étape contenant l’image golang. Cela dit, je ne suis pas forcément très fan de cette notation : on a un nombre magique, 0, qui se balade dans notre Dockerfile. Ce n’est pas forcément l’idéal pour s’y référer. **La bonne nouvelle, c’est qu’on va pouvoir donner des noms à ces étapes**.

<br>

Si on reprend l’exemple précédent : 

<br>

```dockerfile
FROM golang:1.16 AS builder
WORKDIR /go/src/github.com/alexellis/href-counter/
RUN go get -d -v golang.org/x/net/html  
COPY app.go ./
RUN CGO_ENABLED=0 go build -a -installsuffix cgo -o app .

FROM alpine:latest  
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /go/src/github.com/alexellis/href-counter/app ./
CMD ["./app"] 
```

<br>

Regardez la première instruction : `FROM golang:1.16 AS builder`. On donne un nom précis à cette étape, à savoir builder. Le mot AS est utilisé pour donner un alias. Puis, plus dans le Dockerfile, on peut s’y référer via l’option `COPY --from=builder /go/src/github.com/alexellis/href-counter/app ./`. **L’étape 0 est maintenant identifiée comme l’étape builder**.

<br>

Notre projet fil rouge comprend deux fichiers Dockerfile : un pour le front-end et l’autre pour le back-end. On va profiter de cette section pour faire le multi-stage de notre web-app. Voici le format qu’elle aura à la fin du screencast.

<br>

```dockerfile
FROM node:12.22-buster-slim AS base
WORKDIR /web

COPY package*.json ./
RUN npm ci
COPY . .


FROM base AS build
RUN REACT_APP_API_URL=http://localhost:3000 npm run build


FROM nginx:1.17 AS prod
COPY --from=build /web/build /usr/share/nginx/html 
```

<br>

Et voici le fichier docker-compose :

<br>

```yml
version: "3"

services:
  web:
    build:
      context: web
      target: prod
    depends_on:
      - database
    ports:
      - 80:80

  api:
    build: api
    stdin_open: true
    tty: true
    depends_on:
      - database
    environment:
      DB_URL: 'myUrl'
      DB_NAME: 'mooc-db'
      PORT: 3000
      ME_CONFIG_MONGODB_ADMINUSERNAME: root
      ME_CONFIG_MONGODB_ADMINPASSWORD: example
      ME_CONFIG_MONGODB_URL: mongodb://root:example@database:27017
    env_file:
      - ./.env
    ports:
      - 3000:3000

  database:
    image: mongo:3.7.9
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example
```

<br>

On se retrouve tout de suite pour le screencast !

<br>

**screencast**

<br>

Le code source correspond à la fin du screencast se trouve [sur la branche `partie-3/chapitre-3/section-3`](https://github.com/nx-academy/Conteneurisez-vos-applications-avec-Docker/tree/partie-3/chapitre-3/section-3).

---

<br>

![Un vigile à l'entrée d'une boite de nuit, pixel art](/homme-magasin-voiture.webp)

## Exercez-vous

Pour rappel, [voici la problématique](https://github.com/nx-academy/Conteneurisez-vos-applications-avec-Docker/issues/6) que nous essayons de résoudre dans ce chapitre.

<br>

**screencast**

<br>

Le code source contenant la solution de cet exercice se trouve [sur la branche partie-3/chapitre-3-fin](https://github.com/nx-academy/Conteneurisez-vos-applications-avec-Docker/tree/partie-3/chapitre-3-fin).

---

<br>

![Un vigile à l'entrée d'une boite de nuit, pixel art](/homme-magasin-voiture.webp)

## Résumé

- L’une des différences principales entre un environnement de développement et de production est sa taille. Les environnements de production sont plus légers. Cela leur permet de contenir non seulement moins de failles de sécurité mais aussi de “booter” plus rapidement.
- Bien qu’il soit possible de créer un fichier Dockerfile par environnement, ce n’est pas forcément une pratique recommandée. Il est préférable d’avoir un seul fichier Dockerfile.
- Le multi staging consiste à avoir un seul fichier Dockerfile et à lui donner des instructions spécifiques à un environnement. Par exemple, lance la commande `npm install –ci` plutôt que `npm install`. C’est le fichier docker-compose qui va vous permettre de sélectionner le “bon” environnement.

---

<br>

![Un vigile à l'entrée d'une boite de nuit, pixel art](/homme-magasin-voiture.webp)

## Le mot de la fin

Ce cours est maintenant terminé. **J’espère que vous avez pris autant de plaisir à le suivre que j’ai pris de plaisir à le concevoir**. Grâce à ce cours, vous devriez être capable :

- de comprendre comment fonctionne Docker et les problématiques résolues par ce dernier. C’est, mine de rien, un avantage particulièrement intéressant en entreprise ;
- de créer vos propres images Docker grâce au Dockerfile.
- de créer vos propres infrastructures grâce à docker compose et au fichier docker-compose.yml ;
- de mettre les mains dans le cambouis en cas de problèmes avec Docker.

<br>

Sachez que je n'ai pas parlé :

- de certaines des nouveautés Docker, notamment Docker Buildx.
- de certaines optimisations supplémentaires que vous pouvez faire via le multistaging.
- plus globalement de la partie mise en production via un registry Docker. C’est l’un des prochains cours que je prépare 😊.

<br>

Vous vous demandez peut-être maintenant quelle(s) suite(s) donner à ce cours. Je pense qu'il y en a plusieurs :
- je vous invite à reprendre une application existante utilisant une API et une base de données et à la dockeriser.
- vous pouvez aussi reprendre un projet complet (y compris un projet d’entreprise) et le dockeriser pour vos collègues.

Comme toujours, n’hésitez surtout pas à me faire un feedback sur le cours par mail.

Codez bien !

<br>

![Un vigile à l'entrée d'une boite de nuit, pixel art](/homme-magasin-voiture.webp)

</article>
