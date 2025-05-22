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

```dockerfile
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

Vous devriez normalement voir s’afficher dans votre console _hello, world_. **Vous venez, sans le savoir, de builder votre image Docker à partir d’un Dockerfile** et de lancer votre premier contenu à partir d’une image que vous avez créée.

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

---

<br>

![Un vigile à l'entrée d'une boite de nuit, pixel art](/homme-magasin-voiture.webp)

## Choisissez la bonne image Docker

Parlons maintenant un peu des types et des tags d’image Docker. Je suis assez content de pouvoir vous en parler dès maintenant. Le choix de l’image et du tag est souvent quelque chose sur lequel on rencontre quelques difficultés quand on apprend Docker. **Il existe plusieurs bonnes pratiques à suivre quand on travaille avec des images Docker**.

**La première bonne pratique est d’essayer de garder votre image la plus petite possible**. Une image est dite “petite”, on dit aussi légère, quand son nombre de mega-bites est faible. Plus vous choisissez une petite image, plus le nombre de librairies qu’elle embarque est limité. Cela vous permet non seulement de déployer cette image plus rapidement, autrement dit le build prend moins de temps, mais aussi de ne pas embarquer des libraires Linux inutiles. Par exemple, vous n’avez pas forcément besoin que Git, Python ou des libraires réseaux soient installés sur votre image. **Embarquer peu de librairies est non seulement utile pour le temps de build et la taille de l’image mais aussi pour la sécurité**. Qui dit moins de librairies dit moins de librairies à devoir mettre à jour.

<br>

Ok, maintenant, tapez la commande :

```bash
docker system prune –all
```

**Cette commande va vous permettre de nettoyer votre système et de supprimer non seulement tous vos conteneurs mais aussi toutes vos images**. C’est une commande que j’utilise assez régulièrement, en plus des commandes `docker container prune` et `docker image prune`. Vous pouvez faire un `docker image ls` avant de passer à la suite, vous ne devriez plus avoir d’images sur votre ordinateur.

<br>

Lancez ensuite ces deux commandes :

```bash
docker image pull node

docker image pull node:alpine
```

<br>

Maintenant, lancez la commande docker image ls. Vous devriez avoir un résultat similaire au mien :

```bash
REPOSITORY   TAG   	IMAGE ID   	CREATED    	SIZE
node     	alpine	4c67af820943   17 hours ago   175MB
node     	latest	c080a37e3dd2   6 days ago 	949MB
```

Vous pouvez voir que l’image alpine est beaucoup plus petite que l’image de base de Node. [L’image de Node Alpine](https://github.com/nodejs/docker-node/blob/0adf29a4daa744d828d23a8de4c4397dc43d5761/18/alpine3.17/Dockerfile) correspond [à la distribution Alpine Linux](https://www.alpinelinux.org/). Il s’agit d’une distribution Linux particulièrement petite. D’ailleurs, vous pouvez faire un essai.

<br>

Tapez dans votre terminal la commande :

```bash
docker container run -ti node bash
```

Cette commande lance le conteneur Docker de l’image Node et vous lance dans un terminal bash.

<br>

Vous devriez avoir un résultat similaire.

```bash
root@530bbeb24740:/#
```

Tapez maintenant `git`. Vous verrez que la documentation de git apparaît. Tapez `exit` pour sortir du conteneur.

<br>

Pour l’image alpine, les commandes sont légèrement différentes.

```bash
docker container run -ti node:alpine bin/sh

# Voici que m’affiche mon conteneur
/ #
```

Essayez de taper git maintenant. Vous devriez avoir la réponse `bin/sh: git: not found`. **Et oui, git n’est pas installé par défaut sur les images alpine !** Vous pouvez taper exit pour sortir du conteneur.

<br>

Nous allons travailler, pour le moment, avec une image type buster-slim où Buster avec une image d’une distribution Debian et slim est une version particulièrement légère. C’est une bonne image pour débuter avec Docker. Nous verrons dans les derniers chapitres du cours comment optimiser notre image pour la production. J’en profite pour vous recommander [un excellent article Medium](https://medium.com/swlh/alpine-slim-stretch-buster-jessie-bullseye-bookworm-what-are-the-differences-in-docker-62171ed4531d) qui présente les différences entre les différentes images Docker.

Pour résumer ce que nous venons de voir. **Essayez de toujours prendre l’image la plus petite**. Je vous recommande d’utiliser _une buster_ ou _une buster-slim_ pour commencer. Cela va vous permettre de construire votre image et de rendre fonctionnel votre projet. Je m’occupe généralement de l’optimisation dans un deuxième.

---

Maintenant, parlons de la deuxième bonne pratiques : les tags !

Jusqu’à présent, nous avons manipulé les images suivantes : _ubuntu:18.04_, _node_ et _node-alpine_. Les tags des images sont situés sur la partie droite, autrement dit après les : Notre image ubuntu a le tag 18.04. Nous lui disons donc de récupérer l’image Ubuntu ayant ce tag particulier. Je vous entends déjà derrière votre écran me dire, “_Merci Thomas, j’avais compris ça. Par contre, je ne comprends pas pourquoi les deux images node n’ont pas de tags_”.

En fait, **ces deux images ont un tag implicite, le tag `latest`. Ce tag correspond à la dernière version de l’image**. Sur le papier, ça peut sembler une bonne idée de toujours utiliser ce tag implicite : qui ne rêve pas d’avoir une image la plus à jour possible. C’est idéal niveau sécurité et on sait qu’on est toujours à jour.

En pratique, ce n’est pas vraiment une bonne idée. Admettons que vous utilisez le tag latest, la version de node utilisée serait la 19. Puis, une nouvelle version majeure de node sort, la 20. Votre projet risque de ne plus fonctionner correctement. **Il faut donc de manière générale éviter d’utiliser le tag latest dans les Dockerfile**. Dans le cadre de notre projet fil rouge, nous devrons utiliser la version 12.22 de NodeJS. Il nous faudra le spécifier dans le Dockerfile. Sauf contres indications, pour le projet fil rouge par exemple, j’ai tendance à utiliser les versions LTS, pour Long-term Support. C’est là que j’aurais le meilleur ratio entre stabilité et nouvelles fonctionnalités du langage. Actuellement, j’utiliserais donc l’image `node:18.15-buster-slim`.

---

<br>

![Un vigile à l'entrée d'une boite de nuit, pixel art](/homme-magasin-voiture.webp)

## Exercez-vous

Pour rappel, [voici la problématique](https://github.com/nx-academy/Conteneurisez-vos-applications-avec-Docker/issues/1) que nous essayons de résoudre dans ce chapitre. Je vous demande de créer un Dockerfile avec la version 12.22 de NodeJS et de lancer la fonction `sayHello` contenu dans le fichier `app.js`.

Amusez-vous bien !

<br>

**screencast**

<br>

Le code source contenant la solution de cet exercice se trouve [sur la branche `partie-2/chapitre-1-fin`](https://github.com/nx-academy/Conteneurisez-vos-applications-avec-Docker/tree/partie-2/chapitre-1-fin).

---

<br>

![Un vigile à l'entrée d'une boite de nuit, pixel art](/homme-magasin-voiture.webp)

## Résumé

- Un Dockerfile correspond au squelette de votre application. C’est une série d’étapes dont le rôle est de télécharger un environnement d'exécution (le runtime), d’ajouter les fichiers requis et d’installer les librairies.
- La commande `docker image build` vous permet de builder une image Docker à partir d’un Dockerfile. Vous pouvez lui donner un nom avec l’option -t ou --tag.
- La commande `docker container run` vous permet de lancer un conteneur. Vous devez soit lui donner l’id de l’image, soit son nom. Vous pouvez utiliser docker image ls pour retrouver les images présentes sur votre ordinateur.
- De manière générale, il est important d’utiliser les plus petites images possibles, autrement dit celles qui embarquent le moins de librairies. Vous pouvez commencer avec des images type buster-slim. Nous verrons dans un prochain chapitre comment optimiser notre Dockerfile pour la production.

</article>
