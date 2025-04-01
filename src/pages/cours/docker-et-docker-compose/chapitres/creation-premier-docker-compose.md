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

Bonne nouvelle, **le rôle du fichier `docker-compose` est justement de gérer des infrastructures pour vous**. Grâce à un fichier docker-compose, vous allez pouvoir générer facilement des infrastructures comprenant un front-end, un ou plusieurs back-end, une ou plusieurs API, une ou plusieurs bases de données, etc. En quelques commandes, vous allez pouvoir générer et lancer une infrastructure complète. Ces commandes vous permettront de récupérer les images que vous n’avez pas sur votre ordinateur (ou votre serveur), d’installer les dépendances et des services tiers (base de données, caching). Je trouve qu’il y a toujours quelque chose de très satisfaisant de pouvoir lancer son infrastructure rapidement et sans se prendre la tête.

<br>

Ça vous dit pas de voir un exemple dès maintenant ?

Créez un fichier `docker-compose.yml` à la racine de votre projet. Vous pouvez ensuite copier/coller le code ci-dessous. Pour votre information, j’ai récupéré ce code [sur ce repository Github](https://github.com/docker/awesome-compose). Il contient de nombreux exemples de fichiers docker-compose. N’hésitez surtout pas à y jeter un œil !

<br>

```yml
services:
 db:
   # We use a mariadb image which supports both amd64 & arm64 architecture
   image: mariadb:10.6.4-focal
   # If you really want to use MySQL, uncomment the following line
   #image: mysql:8.0.27
   command: '--default-authentication-plugin=mysql_native_password'
   volumes:
     - db_data:/var/lib/mysql
   restart: always
   environment:
     - MYSQL_ROOT_PASSWORD=somewordpress
     - MYSQL_DATABASE=wordpress
     - MYSQL_USER=wordpress
     - MYSQL_PASSWORD=wordpress
   expose:
     - 3306
     - 33060
 wordpress:
   image: wordpress:latest
   ports:
     - 80:80
   restart: always
   environment:
     - WORDPRESS_DB_HOST=db
     - WORDPRESS_DB_USER=wordpress
     - WORDPRESS_DB_PASSWORD=wordpress
     - WORDPRESS_DB_NAME=wordpress
volumes:
 db_data:
```

<br>

Je ne vais pas rentrer dès maintenant dans le détail de toutes les propriétés du fichier. J’ai d’abord envie de vous montrer la construction de votre infrastructure. Ouvrez votre terminal et tapez la commande `docker compose up`. 

Docker Compose va se charger de récupérer les images de [MariaDB](https://hub.docker.com/_/mariadb) et de [WordPress](https://hub.docker.com/_/wordpress). Une fois que votre ligne de commande s’est un peu calmée, ouvrez votre navigateur et rendez-vous sur http://localhost. Vous devriez avoir un écran similaire au mien ci-dessous.

<br>

![Une capture d'écran de la page d'installation de WordPress](/wordpress-installer.png)

<br>

Si vous avez déjà installé WordPress sur votre ordinateur, vous savez à quel point cette étape est chiante (oui, le mot est lancé) ! Vous devez passer par Wamp ou Mamp. Cette suite vous installe Apache, MySQL et Php directement sur votre ordinateur. Avec tous les défauts que cela comprend : c’est difficile à mettre à jour, ça encrasse votre ordinateur, c’est compliqué si vous souhaitez utiliser une version différente de MySQL sur un autre projet, etc.

Pour la petite aparté, sachez que cette stack technique s’appelle couramment le LAMP (Linux Apache MySQL Php). C’était une stack très populaire au milieu des années 2000. Il y a eu d’autres types de stack depuis tel que [le MEAN](https://en.wikipedia.org/wiki/MEAN_(solution_stack)) (MongoDB, Express, Angular et NodeJS) et le MERN (MongoDB, Express, React et NodeJS).

Docker, grâce à docker-compose, vous apporte une solution clé en main. **Vous pouvez facilement créer votre stack WordPress, avec les versions de MySQL/MariaDB que vous voulez, et le tout sans encrasser votre ordinateur**. Faites un simple `ctrl + c` pour quitter l'environnement. Regardons maintenant un peu le fichier docker-compose en détails avant de s’amuser à faire le notre.

---

<br>

![Un vigile à l'entrée d'une boite de nuit, pixel art](/homme-magasin-voiture.webp)

## Ajoutez des propriétés à votre fichier `docker-compose`

Reprenons le fichier docker-compose précédent.

<br>

```yml
services:
 db:
   # We use a mariadb image which supports both amd64 & arm64 architecture
   image: mariadb:10.6.4-focal
   # If you really want to use MySQL, uncomment the following line
   #image: mysql:8.0.27
   command: '--default-authentication-plugin=mysql_native_password'
   volumes:
     - db_data:/var/lib/mysql
   restart: always
   environment:
     - MYSQL_ROOT_PASSWORD=somewordpress
     - MYSQL_DATABASE=wordpress
     - MYSQL_USER=wordpress
     - MYSQL_PASSWORD=wordpress
   expose:
     - 3306
     - 33060
 wordpress:
   image: wordpress:latest
   ports:
     - 80:80
   restart: always
   environment:
     - WORDPRESS_DB_HOST=db
     - WORDPRESS_DB_USER=wordpress
     - WORDPRESS_DB_PASSWORD=wordpress
     - WORDPRESS_DB_NAME=wordpress
volumes:
 db_data:
```

<br>

Ce fichier est écrit [en Yaml](https://fr.wikipedia.org/wiki/YAML). Vous pouvez aussi bien écrire `docker-compose.yml` et `docker-compose.yaml`. J’ai tendance à privilégier la première version (elle contient une lettre de moins) mais en pratique, rien ne change. Si vous n’êtes pas habitué à ce type de fichiers, sachez que **c’est un format très courant pour les fichiers de configuration**. Il tire parti de l’indentation pour structurer l’information. Un peu comme le Python où vous allez utiliser l’indentation pour créer vos blocs.

Dans l’exemple ci-dessus, la propriété `environment` contenu dans le service `wordpress` contient quatre valeurs imbriquées. Vous verrez qu’il est très courant de se planter avec l’indentation de ses fichiers Yaml. Je vous invite à passer [par un validateur](https://www.yamllint.com/) si vous n’êtes pas sûr de votre indentation. C’est quelque chose que je fais très régulièrement.

Notre fichier docker-compose comprend deux services : db et wordpress. Chaque service est contenu dans le bloc services. Commençons par regarder le service wordpress ; il est plus “simple”. Il contient quatre propriétés :

- **`image` qui correspond à l’image que mon service va utiliser**. Ici, il n’utilise pas une image locale via un Dockerfile. Au lieu de ça, il récupère une image WordPress sur DockerHub. Notez d’ailleurs qu’on récupère la dernière version. Le fameux tag latest. Souvenez-vous, ce n’est pas forcément une bonne pratique.
- **`ports` vous permet d’exposer des ports**. Le prochain chapitre est consacré aux ports et plus largement au(x) réseau(x) (on dit aussi networking). Là, pour faire simple, on branche le port 80 de notre ordinateur au port 80 du conteneur. Si vous oubliez cette étape, vous ne serez pas capable de communiquer avec votre conteneur. 80 est souvent le port par défaut du HTTP, d’où le fait que je puisse écrire http://localhost et non http://localhost:80 (qui fonctionne aussi).
- **`restart` définit les politiques de redémarrage de votre conteneur**. Si un de vos conteneurs rencontre une erreur critique et s’éteint brusquement, il se rallume. Je vous avoue ne pas forcément utiliser cette commande dans mes fichiers docker-compose mais bon, comme ça, vous savez que ça existe. Sachez, par contre, que ces conteneurs vont redémarrer chaque fois que vous rallumez votre ordinateur. Vous pouvez écrire docker compose down pour les stopper de manière permanente.
- **`environment` ajoute des variables d’environnements à votre service**. Vous pouvez voir quelles sont les variables d'environnement dans l’un de vos conteneurs avec la commande env (on va bientôt voir ça ensemble). Sachez qu’il est aussi possible d’ajouter un fichier d'environnement à la place. C’est clairement beaucoup plus sécurisé ; ça vous évite d’avoir des variables d'environnement qui trainent dans votre code. Nous verrons ça ensemble très bientôt.

<br>

Ces quatre propriétés sont très courantes. Elles reviennent dans beaucoup de fichiers docker-compose. Habituez-vous à les voir et à comprendre leur sens. Encore une fois, il n’y a pas besoin de tout connaître. Il faut surtout savoir bien chercher l’information. D’ailleurs, vous pouvez trouver la référence de ces propriétés [sur la documentation officielle de Docker](https://docs.docker.com/compose/compose-file/compose-file-v3/). **Pour info, j’ai tapé _docker compose file reference_ dans mon moteur de recherche**. Comme vous pouvez le constater, il existe beaucoup de propriétés.

</article>

