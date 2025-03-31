---
layout: ../../../../layouts/ChapterLayout.astro

title: Créez votre premier Dockerfile
description: Une nouvelle super description dédiée à Docker

previousChapterLink: presentation-projet-fil-rouge
nextChapterLink: creation-premier-docker-compose

chapterNumber: 1
sectionNumber: 2
id: 4
---

<article>

# Créez votre premier Dockerfile

Avant de poursuivre la lecture de ce chapitre, veuillez vous mettre [sur la branche `partie-2/chapitre-1-debut`](https://github.com/nx-academy/Conteneurisez-vos-applications-avec-Docker/tree/partie-2/chapitre-1-debut). En plus de cette branche, nous allons utiliser [cette issue Github](https://github.com/nx-academy/Conteneurisez-vos-applications-avec-Docker/issues/1) comme problématique. Je vous invite à en prendre connaissance avant de passer à la lecture du chapitre.

![Un superhero regardant une ville de nuit, pixel art](/docker-port.webp)

## Le Dockerfile, le squelette de votre application

Dans les premiers chapitres, vous avez vu comment récupérer une image Node.js en utilisant la commande `docker image pull`. **Cette commande est bien pratique pour récupérer une image. Cela dit, elle montre rapidement ses limites quand on souhaite travailler avec**. En effet, une fois que vous avez récupéré l’image, vous allez voir lui ajouter des fichiers, installer des librairies, peut-être la préparer pour la production, etc. Chaque étape correspond à une instruction bien précise.


Le schéma ci-dessous montre un enchaînement d’instructions assez courant.


<br>

![Le schéma d'une suite d'instructions d'un Dockerfile](/schema-instructions-docker.png)

<br>

Essayez de voir ça comme un voyage à l’étranger. Le point de départ est le moment où vous préparez le départ depuis chez vous. Vous sortez vos affaires de votre armoire, vous préparez vos valises, puis vous prenez le train, arrivez à votre destination, puis vous vous rendez à l'hôtel, etc. Travailler avec Docker, c’est un peu pareil. **Vous allez grâce à votre Dockerfile réaliser une série d’étapes [par le biais d’instructions](https://docs.docker.com/engine/reference/builder/)**. Il existe un peu plus d’une dizaine d’instructions.


Dans ce chapitre, on va se concentrer sur les instructions `FROM`, `ADD`. `COPY` et `CMD`. **Le Dockerfile représente le squelette de notre application**. Autrement dit, C’est l’API REST en Node.js que nous allons créer. Ce fichier va nous permettre de définir notre image de base. Nous lui ajouterons des fichiers et installerons nos dépendances grâce à npm. À la fin de ce chapitre, nous aurons une image Docker prête à l’emploi. Elle ne contiendra pas encore notre API REST et elle demandera encore un peu de travail pour être optimiser pour la production. Mais pour le moment, nous y allons étape par étape.


Avant de découvrir ces instructions ensemble, je vous invite à télécharger [l’extension VSCode Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker). Cette extension ajoute des indications sur vos fichiers Dockerfile, en vous donnant par exemple des explications sur ce que font telle ou telle commande. C’est ce qu’on appelle [l’Intellisense](https://code.visualstudio.com/docs/editor/intellisense).


---

<br>

![Un vigile à l'entrée d'une boite de nuit, pixel art](/homme-magasin-voiture.webp)

## Ajoutez des instructions sur votre Dockerfile

Commencez par regarder le Dockerfile ci-dessous. Pour votre information, ce snippet, ou morceau de code en français, se trouve [sur ce gist Github](https://gist.github.com/tdimnet/96a5d87fea9955c7824a99534821047a).


<br>

```Dockerfile
# Je récupère une image ubuntu 18
FROM ubuntu:18.04

# Je copie l'intégralité de mon répertoire courant dans un répertoire /app
COPY . /app

# Je précise que mon répertoire de travail dans mon image sera /app
WORKDIR /app

# Je lance la commande
CMD [ "echo", "hello, world" ]
```

<br>

Créez un fichier appelé Dockerfile dans le dossier du projet fil rouge. Votre arborescence devrait ressembler à ça. Recopiez le code ci-dessus dans ce fichier.


<br>

![Une capture d'écran de l'arborescence du projet sous VsCode](/arborescence-projet.png)

<br>

Je vais maintenant vous demander de lancer deux commandes. Pas d’inquiètude, je vous expliquerais juste après ce qu’elles font. Cela dit, n’oubliez pas d’utiliser `--help`, par exemple `docker image –help`.

<br>

```bash
# Commande 1
docker image build . -t my-first-app

# Commande 2
docker container run my-first-app
```

<br>

Vous devriez normalement voir s’afficher dans votre console *hello, world*. **Vous venez, sans le savoir, de builder votre image Docker à partir d’un Dockerfile** et de lancer votre premier contenu à partir d’une image que vous avez créée.


Il y a deux choses importantes à noter ici :

- **Le build est une étape qui prend généralement un peu de temps**. En effet, si l’image de base n’est pas présente sur votre ordinateur, vous allez devoir la télécharger (la puller) depuis un registry Docker. Puis, vous devrez potentiellement installer des librairies.
- **Le lancement du conteneur par contre est quasiment instantané**. Voici la grande force de la conteneurisation. D’ailleurs, vous pouvez vous amuser à lancer le conteneur encore et encore, cela ne changera en rien sa rapidité d’exécution.

Je vais profiter du screencast ci-dessous pour reprendre les concepts dont je viens de parler mais je vais aussi vous présenter les instructions du Dockerfile et vous donner quelques exemples.

À tout de suite !

<br>

**screencast**

<br>

Vous venez de voir comment construire (builder) et lancer notre image. Je vous ai aussi présenté les quatre instructions de notre Dockerfile.

<br>

Voici un récapitulatif de ce que je viens de vous dire.

- **L’instruction `FROM` demande à Docker de récupérer une image depuis un registry Docker**, en l'occurrence [de ce registry](https://hub.docker.com/_/ubuntu). Nous récupérons plus précisément la version 18.04 d’Ubuntu. Cette partie 18.04 correspond au tag de l’image. Nous verrons les tags un peu plus bas dans ce chapitre.
- **L’instruction `COPY` sert à copier des fichiers de la machine hôte**, ici mon ordinateur, vers l’image. Je lui dis ici de prendre tous les fichiers et dossiers contenus dans mon répertoire courant et de tous les mettre dans un dossier nommé app. Notre dossier app contiendra les fichiers `.gitignore`, `app.js`, `Dockerfile` et `README.md`. Si vous n’êtes pas trop à l’aise avec Linux, sachez que /app sera situé à la racine de mon image, autrement dit au même endroit que les dossiers bin, etc, etc.
- **L’instruction `WORKDIR` me permet de me positionner dans un répertoire**. C’est un peu comme un `cd ./app`. Il va me permettre de spécifier le dossier dans lequel je travaille.
- **L’instruction `CMD` me permet de lancer une commande par défaut**. Ici, la commande par défaut est `echo hello, world`. Elle pourrait être node start, npm run dev, etc. N’oubliez pas que je peux surcharger cette commande quand je lance mon conteneur, `docker container run my-first-app ls | grep app` par exemple.

<br>

Bon, ça fait pas mal de choses ! Si vous voyez que tout ne rentre pas du premier coup, je vous invite à revenir sur ce chapitre dans quelques jours ou après avoir pratiqué un peu. Vous serez heureux de voir que vous avez compris plus de choses que vous ne le pensez. Nous verrons aussi dans les prochains chapitres comment optimiser ses images et la sécurité. Mais pour l’instant, allons-y étape par étape.


</article>

