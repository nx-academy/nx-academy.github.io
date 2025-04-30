---
layout: ../../layouts/BlogPostLayout.astro

title: Comment (bien) utiliser les volumes Docker ?

---

# Comment (bien) utiliser les volumes Docker ?

<!-- ## Introduction

- Le cours sur Docker va bientôt pointer le bout de son nez. A l'occassion de sa sortie, les quatre prochaines fiches techniques seront dédiées à Docker.
- Une surprise vous attend en bas de l'article (le premier quiz auto-généré via IA et directement mis en prod via l'agent que j'ai développé).
- J'ai décidé de commencer par une fiche technique sur les volumes car c'est l'un des éléments essentiels à comprendre une fois qu'on a joué un peu avec Docker. Autrement dit, une fois qu'on a compris la différence entre les images et les conteneurs et qu'on a mis les mains dans le fichier docker-compose.yml
- C'est aussi l'une des principales premières difficultés. Les volumes ont deux utilisations possibles (nous allons revenir dessus). Bien comprendre les volumes (et ceux qu'ils permettent de résoudre) est essentiel pour bien les utiliser. -->

La sortie du cours sur Docker approche à grand pas. Pour cette occasion, sachez que **les quatre prochaines fiches techniques seront dédiées à cet outil**. C'est, selon moi, un indispensable à connaître.

Pour marquer le coup, une surprise vous attend en bas de l’article. Le tout premier quiz généré par IA, directement mis en ligne grâce à l’agent que j’ai développé. Oui, ça bosse pas mal en ce moment !

**On commence cette série Docker par les volumes**. Pourquoi ? Parce que c’est souvent à ce moment-là que les choses se compliquent. Quand on a compris la différence entre une image et un conteneur, qu’on a lancé ses premiers services via un `docker-compose.yml`,  on se heurte assez vite à cette question : _où sont passées les données ?_

**Les volumes sont l’un des premiers gros morceaux** à assimiler. Ils ont deux usages très différents (on y revient juste après). Savoir les utiliser correctement permet d’éviter pas mal de galères, notamment quand on bosse avec une base de données ou un simple serveur de développement.

## Pourquoi utilise-t-on des volumes en Docker ?

<!-- - Commençons par parler de la problématique résolue par les volumes. On les utilise principalement pour deux raisons :
  - La persistance de données, typiquement une base de données MySQL ou PostgreSQL. On va vouloir que ces données soient persister (comprendre: soient sauvegarder) quand on éteint et on redémarre le conteneur.
  - Le partage de fichiers entre la machine hôte (votre ordinateur par exemple) et le conteneur (dans lequel vous codez).
- Imaginez la scène, vous êtes en train de coder un serveur en Node.JS avec Express et vous voulez que le conteneur soit au courant des fichiers que vous êtes en train de modifier.
- J'aimerais bien une ou deux phrases sur comment ça marche "behind the scene". Peut-être que ce n'est pas l'endroit et qu'il vaut mieux le faire quand on décrit les types de volumes. -->

Avant de parler un peu de technique (on y vient juste après), j'aimerais prendre le temps de parler des problématiques résolues par les volumes.

<br>

Pour faire simple, on les utilise pour deux raisons :

- La persistance des données. C’est le cas typique d’une base de données MySQL ou PostgreSQL : vous lancez un conteneur, vous y stockez des données, vous le redémarrez et tout a disparu. Sans volume, un conteneur Docker n’a pas de mémoire durable. Il est fait pour être éphémère. En utilisant un volume, on sauvegarde les données à l’extérieur du conteneur et on les retrouve intactes (comprendre: sauvergarder) au redémarrage.

- Le partage de fichiers entre l’hôte et le conteneur. Imaginez que vous développiez un serveur Express en Node.js et vous souhaitiez que votre conteneur “voie” en temps réel les fichiers que vous modifiez. C’est là qu’intervient le montage de dossier : vous connectez un dossier local (celui de votre projet, par exemple) à un dossier dans le conteneur. Résultat : chaque changement est automatiquement pris en compte. Si vous ne faites pas ça, vous êtes obligé de redémarrer le conteneur à chaque fois.


<br>


Ces deux usages — persister et partager — sont très différents, mais tous deux passent par le système de volumes. Docker propose deux façons de les gérer : les bind mounts et les volumes nommés. On va voir dès maintenant la différence entre les deux.


## Deux types de volumes : bind mount vs volume nommé

## Comment les déclarer dans un docker-compose.yml

## Les commandes à connaître

## Cas pratique - Persister une base de données PostgreSQL

## Astuce bonus

## Ressources
