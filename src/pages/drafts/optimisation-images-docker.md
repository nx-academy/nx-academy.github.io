---
layout: ../../layouts/CheatSheetsLayout.astro

title: Comment optimiser une image Docker ?
description: Découvrez les bonnes pratiques pour optimiser une image Docker et réduire sa taille, accélérer le build et renforcer la sécurité sans changer votre code.

author: Thomas
kind: Fiche technique
level: intermediaire
publishedDate: 07/04/2025
---

<article>

# Comment optimiser une image Docker ?

![Une vendeuse asiatique utilisant un balancer dans un magasin, pixel art](/cheatsheets/magasin-chinois.png)

Ca y est : le cours sur Docker [est officiellement disponible](/cours/docker-et-docker-compose) ! Si ce n’est pas encore fait, je vous invite à le suivre avant d’attaquer cette fiche. J'y pose toutes les bases : images, conteneurs, Dockerfile, volumes, docker compose, etc.

Dans les prochaines fiches techniques, on va commencer à faire doucement la transition vers l’automatisation (un autre sujet cher à mon coeur). Petit teaser : en septembre, un cours complet sur les CI/CD avec GitHub Actions est prévu.

Mais avant d’automatiser quoi que ce soit, il y a une étape indispensable à connaître : **l’optimisation des images Docker**. Pourquoi ? Parce qu’une image lourde, c’est souvent :

- plus long à builder, en local comme en CI ;
- plus long à envoyer sur un registry ;
- plus long à télécharger ;
- et plus lent à démarrer en production.

<br>

Autre chose, une image trop volumineuse embarque souvent des dépendances ou des fichiers inutiles. Résultat : le nombre de points d’entrée potentiels pour une attaque augmente. C’est ce qu’on appelle [la surface d’attaque](https://fr.wikipedia.org/wiki/Surface_d%27attaque). **Plus une image est complexe, plus elle expose d’éléments à surveiller ou à sécuriser**.

Dans cette fiche, on va donc voir ensemble plusieurs bonnes pratiques concrètes pour réduire la taille de vos images et améliorer la sécurité de vos déploiements.


## Choississez une base plus légère

Quand vous cherchez une image sur DockerHub, vous avez peut-être déjà remarqué qu’il en existe plusieurs variantes. Prenons[ l’image officielle de Node.js sur DockerHub](https://hub.docker.com/_/node/) : vous y verrez des tags comme alpine, bullseye, buster, buster-slim, etc. **Sachez que ces noms désignent la distribution Linux sur laquelle l’image est construite**.

Par exemple : 
- alpine → [Alpine Linux](https://www.alpinelinux.org/), ultra légère ;
- buster, bullseye → différentes versions de Debian ;
- slim → une version épurée, sans outils inutiles comme `man`, `apt cache`, etc.

<br>

_Petite anecdote perso_ : pendant longtemps, je ne savais pas que ces tags faisaient référence à des distributions Linux. Je pensais que c’était juste des noms randoms pour nommer les images.

En réalité, **ça change complètement ce que contient votre image, à savoir donc sa taille, sa compatibilité et ses performances**. C'est un peu comme une pizza si vous préférez une base sauce tomate (moins calorique) ou une base crème. Du coup, avec quelques exemples : 

- `node` → version complète, assez lourde ;
- `node:slim` → même base, mais allégée ;
- `python` → version par défaut (souvent Debian) ;
- `python:alpine` → version très compacte (quelques Mo seulement).

<br>

**Attention avec les images alpines**. Elle est souvent recommandée pour sa taille mais ce n’est pas toujours la meilleure option. Il m'est arrivé parfois d'avoir des problèmes de dépendances, notamment en Python avec des librairies SQL. Elle est idéale pour des services simples (comme un worker en Node.js) mais elle n’est pas adaptée à tous les projets.


## Nettoyez votre image après l'installation

C’est un point auquel on ne pense pas toujours (en tout cas, il m'arrive régulièrement de l'oublier). A chaque fois que vous installez des dépendances, que ce soit via `apt install` ou `npm install`, vous ajoutez du cache dans votre image.


Au final, votre image embarque des fichiers inutiles tels que des fichiers temporaires, des logs, de la documentation, etc. Ces fichiers peuvent facilement peser plusieurs dizaines de Mo.


### Exemple de nettoyage simple avec APT

<br>

```dockerfile
RUN apt-get update && apt-get install -y curl \
    && rm -rf /var/lib/apt/lists/*
```

<br>

Dans cet exemple :
- on installe curl ;
- puis on supprime les listes téléchargées pendant le `apt-get update`.

<br>

### Pourquoi tout faire dans le même RUN ?

Chaque RUN dans un Dockerfile crée un nouveau layer (on va revenir sur la notion de layer dans un instant).

<br>

Donc si vous faites ça :

```dockerfile
RUN apt-get update && apt-get install -y curl
RUN rm -rf /var/lib/apt/lists/*
```

Alors le cache supprimé dans le deuxième RUN existe toujours dans le layer précédent. Pour que le nettoyage soit réellement pris en compte, il faut le faire dans la même instruction RUN.


## Réduisez le nombre de layers

C’est quelque chose que j’ai volontairement peu abordé dans mon cours sur Docker. Je préférais d’abord que vous compreniez ce qu’est un conteneur et comment le construire avant d’entrer dans le fonctionnement interne des images. Maintenant que vous êtes à l’aise avec la création d’images, il est temps de parler des layers.

Chaque fois que vous écrivez une instruction dans un Dockerfile (`FROM`, `RUN`, `COPY`, `ADD`, etc.), Docker crée un nouveau _layer_. 

**Un layer correspond à une couche empilée dans l’image finale**. C'est un peu comme  une pile de briques : chaque instruction ajoute une brique. L’ensemble des briques forme l’image. Ces layers sont :
- cachés à l’utilisateur mais utilisés pour le cache et l’optimisation ;
- persistés ; ils vont donc peser dans la taille totale de l’image ;
- immuables ; ce qui veut dire qu’un RUN ne peut pas supprimer un fichier créé dans un layer précédent.

<br>

Du coup, plus vous avez de layers dans votre image, plus votre image va devenir lourde et va prendre du temps à se construire. C'est quelque chose qu'on soit éviter autant que possible avec Docker.

Voici un exemple :

```dockerfile
# ❌ Version non optimisée
RUN apt-get install -y curl
RUN rm -rf /var/cache

#✅ Version optimisée
RUN apt-get install -y curl && rm -rf /var/cache
```

Dans l'exemple ci-dessus, le cache est supprimé dans le premier cas mais il reste stocké dans le layer précédent. Dans le second, tout est fait dans le même layer donc l’image finale est plus légère.


## Utilisez un `.dockerignore`

Vous avez probablement déjà utilisé un fichier `.gitignore` pour éviter de versionner certains fichiers dans un dépôt Git. Pensez à des fichiers tel que les `.env` ou les dépendances (les fameux `node_modules`).

Le `.dockerignore`, c’est exactement le même principe mais pour Docker. Son role est d'exclure certains fichiers ou dossiers de votre contexte de build. Autrement dit, ces fichiers ne seront même pas transmis à Docker pendant le build.

Pourquoi c’est important ? Parce que tout le contenu de votre dossier est envoyé à Docker lors d’un build (sauf ce que vous ignorez explicitement). Certains fichiers, comme vos logs, vos `node_modules`, vos fichiers de dev ou pire votre dossier `.git`, peuvent alourdir inutilement votre image.


### Exemple de `.dockerignore` minimal

<br>

```.dockerignore
.git
node_modules
*.log
*.env
dist/
```

Bien sûr, ce fichier doit être adapté à chaque projet. Mais ce genre de base est souvent un bon départ. Au besoin, vous pouvez vous inspirer en parti de votre fichier `.gitignore`.


## Vérifiez la taille de son image

Optimiser une image, c’est bien. Vérifier que l’optimisation fonctionne, c’est encore mieux.

Docker propose plusieurs commandes pour analyser la taille de vos images. Il est recommandé de les utiliser régulièrement dans votre workflow, surtout avant de pousser une image sur un registry ou de l’intégrer dans un pipeline CI/CD. C'est vraiment le détail qui peut faire la différence.

J'ai vu des infras où les images n'étaient jamais inspectées. C'était clairement pas l'idéal pour la CI. Je vous invite donc à utiliser :

- `docker image ls` - c’est la commande de base pour avoir une vue d’ensemble rapide sur vos images. Elle affiche toutes les images présentes sur votre machine avec notamment leur nom, leur tag et leur taille ;
- `docker image inspect nom_image` - cette commande affiche des informations détaillées sur une image, à savoir sa structure interne, sa taille, ses layers et sa configuration. Elle est parfaite pour diagnostiquer ce qui se trouve dans votre image ;
- `docker history nom_image` - cette dernière commande affiche l’historique de construction de l’image, layer par layer. Vous verrez la taille de chaque étape, ce qui permet d’identifier rapidement les instructions qui alourdissent l’image. Plutôt pratique, non ?

<br>

Avec ces trois commandes, vous êtes en mesure de suivre l'état de vos images et de leur taille simplement :).


## Astuce bonus - Évitez `ADD`, préférez `COPY`

Dans un Dockerfile, vous avez peut-être déjà utilisé l'instruction `ADD` pour copier des fichiers dans votre image. Pour être honnête, sauf cas très particulier, vous devriez lui préférer `COPY`.

<br>

```dockerfile
# ✅ Préféré
COPY ./app /app

# ❌ À éviter sans besoin spécifique
ADD ./app /app
```

<br>

Pourquoi ? Parce que :
- `ADD` peut faire plus de choses. Par exemple, décompresser une archive `.tar.gz` ou récupérer une URL distante ;
- mais ces fonctionnalités ne sont pas toujours explicites et peuvent introduire des comportements inattendus (les fameux effets de bord).

Donc, pour faire simple, si vous avez juste besoin de copier des fichiers ou des dossiers, utilisez `COPY`. C’est plus clair, plus prévisible et plus sécurisé.

---

Vous l’aurez compris ! Une image Docker optimisée, c’est une image :
- plus rapide à builder ;
- plus légère à pusher ;
- plus rapide à puller
- et plus sûre à exécuter.


Et tout ça sans changer votre code ! Je vous invite à essayer d'adopter ces réflexes à adopter dès maintenant et notamment si vous commencez à travailler avec des pipelines CI/CD. D'ailleurs, le prochain cours sera justement dédié à ce sujet : les CI/CD avec GitHub Actions. 

Il est prévu pour septembre. Vous y apprendrez à automatiser des pipelines de test, de build et de déploiement.

D'ici là, je vous invite 
- [à faire le quiz](/quiz/optimisation-images-docker) pour valider vos acquis ;
- [à commencer le cours sur Docker et docker compose](/cours/docker-et-docker-compose) si ce n'est pas déjà fait.

## Ressources

- quelques liens

</article>
