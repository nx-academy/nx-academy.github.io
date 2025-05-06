---
layout: ../../layouts/CheatSheetsLayout.astro

title: Comment (bien) utiliser les volumes Docker ?
description: Découvrez comment utiliser les volumes Docker pour persister vos données ou partager des fichiers entre votre machine et vos conteneurs.

imgAlt: Une femme en train de brancher une clé USB dans un ordinateur, pixel art
imgSrc: /femme-cle-usb.png

author: Thomas
kind: Fiche technique
level: Intermédiaire
publishedDate: 05/01/2025
---

<article>

# Comment (bien) utiliser les volumes Docker ?

<!-- <small>Temps de lecture estimé : 5 minutes</small> -->

![Une femme en train de brancher une clé USB dans un ordinateur, pixel art](/femme-cle-usb.png)

La sortie du cours sur Docker approche à grand pas. Pour cette occasion, sachez que **les quatre prochaines fiches techniques seront dédiées à cet outil**. C'est, selon moi, un indispensable à connaître.

Pour marquer le coup, une surprise vous attend en bas de l’article. Le tout premier quiz généré par IA, directement mis en ligne grâce à l’agent que j’ai développé. Oui, ça bosse pas mal en ce moment !

**On commence cette série Docker par les volumes**. Pourquoi ? Parce que c’est souvent à ce moment-là que les choses se compliquent. Quand on a compris la différence entre une image et un conteneur, qu’on a lancé ses premiers services via un `docker-compose.yml`,  on se heurte assez vite à cette question : _où sont passées les données ?_ ou _comment bien gérés mes données dans mon conteneur sans avoir à rebuild à chaque fois ?_

**Les volumes sont l’un des premiers gros morceaux** à assimiler. Ils ont deux usages très différents (on y revient juste après). Savoir les utiliser correctement permet d’éviter pas mal de galères, notamment quand on bosse avec une base de données ou un simple serveur de développement.

## Pourquoi utilise-t-on des volumes en Docker ?

Avant de parler un peu de technique (on y vient juste après), j'aimerais prendre le temps de parler des problématiques résolues par les volumes.

<br>

Pour faire simple, on les utilise pour deux raisons :

- La persistance des données. C’est le cas typique d’une base de données MySQL ou PostgreSQL : vous lancez un conteneur, vous y stockez des données, vous le redémarrez et tout a disparu. Sans volume, un conteneur Docker n’a pas de mémoire durable. Il est fait pour être éphémère. En utilisant un volume, on sauvegarde les données à l’extérieur du conteneur et on les retrouve intactes au redémarrage.
- Le partage de fichiers entre l’hôte et le conteneur. Imaginez que vous développiez un serveur Express en Node.js et vous souhaitiez que votre conteneur “voie” en temps réel les fichiers que vous modifiez. C’est là qu’intervient le montage de dossier : vous connectez un dossier local (celui de votre projet, par exemple) à un dossier dans le conteneur. **Résultat : chaque changement est automatiquement pris en compte**. Si vous ne faites pas ça, vous êtes obligé de redémarrer le conteneur à chaque fois.


<br>


Ces deux usages, persister et partager,  sont très différents. Cela dit, ils passent tous deux par le système de volumes. On va voir dès maintenant comment gérer ces deux usages avec Docker.


## Deux types de volumes : bind mount vs volume nommé

Avant toute chose, sachez que les deux usages que nous venons de voir utilise la même directive Docker : les `volumes`.

- Le bind mount connecte directement un dossier de votre machine hôte au conteneur. Ce que vous modifiez en local est aussitôt visible dans le conteneur.
- Le volume nommé, lui, est un espace de stockage géré et maintenu par Docker, souvent utilisé pour stocker des données de manière durable et isolée.

<br>

![Un schéma représentant un bind mount et un volume nommé, source https://mingeun2154.github.io](/bind-and-named-volumes.jpeg)

Dans le schéma ci-dessus, vous pouvez voir nos deux types de volumes : le bind mount et le volume nommé. _source https://mingeun2154.github.io_

<br>

Si vous vous demandez comment ça marche _behind the scenes_, sachez que :

- avec un bind mount, vous dites à Docker : “Utilise ce dossier sur ma machine et monte le (on pourrait dire aussi partage le) dans mon conteneur”.
- avec un volume nommé, Docker crée un espace de stockage dans son propre système interne (`/var/lib/docker/volumes/`). C'est plus proche ici d'une sauvegarde que d'un partage de fichier.

Allez, on va regarder maintenant comment on déclare des volumes dans un `docker-compose.yml` !


## Comment les déclarer dans un docker-compose.yml ?

### Développez en local avec un bind mount

Admettons que vous travailliez sur un projet Node.js avec Express. Vous voulez que chaque changement de fichier soit immédiatement pris en compte dans le conteneur (idéal avec un nodemon par exemple). Voici comment faire :

```yaml
services:
  web:
    image: node
    volumes:
      - ./app:/usr/src/app
```

<br>

Décryptage :
- `./app` est un dossier local (relatif au fichier `docker-compose.yml`) ;
- `/usr/src/app` est le dossier monté dans le conteneur ;
- tout changement dans `./app` est automatiquement visible dans le conteneur.


### Persistez des données avec un volume nommé

On va partir sur une base de données PostgreSQL. Pour s'assurer que les données soient conservées même après l'arrêt ou la suppression du conteneur, on déclare un volume nommé comme ci-dessous :


```yaml
services:
  db:
    image: postgres
    environment:
      POSTGRES_PASSWORD: exemple
    volumes:
      - pg_data:/var/lib/postgresql/data

volumes:
  pg_data:
```

<br>

Décryptage :
- `pg_data` est le nom du volume qu'on crée ;
- `/var/lib/postgresql/data` est le chemin dans le conteneur où PostgreSQL stocke ses données ;
- La clé `volumes`, tout en bas, permet de définir explicitement le volume, mais si on l’omet, Docker le crée quand même automatiquement. (Pratique, non ?)


## Astuce bonus – Montez un volume en lecture seule

Sachez qu'il est possible de monter un volume (bind ou nommé) en lecture seule dans un conteneur. Cela peut être utile si vous voulez éviter toute modification involontaire. Par exemple, on peut penser à un dossier de config dans lequel vous souhaitez uniquement lire des informations.

```yaml
volumes:
  - ./config:/app/config:ro

```

<br>

Le `:ro` à la fin signifie read-only (lecture seule). Si le conteneur essaie d’écrire dedans, il renverra une erreur.

<hr>

Et voilà ! Les volumes Docker peuvent être un peu pertubants de premier abord. Il y a souvent beaucoup d'incompréhensions sur comment bien les utiliser. Je vous invite [à faire ce quiz pour valider vos connaissances](/quiz/bien-utiliser-volumes-docker) et on se retrouve pour le mois prochain pour une fiche technique dédiée aux registries Docker !


## Ressources

- [La documentation officielle sur les volumes Docker](https://docs.docker.com/engine/storage/volumes/)
- [Travailler avec les volumes Docker - LabEx](https://labex.io/fr/tutorials/docker-working-with-docker-volumes-389189)
- [La documentation officielle sur les bind mounts Docker](https://docs.docker.com/get-started/workshop/06_bind_mounts/)

</article>