---
layout: ../../layouts/CheatSheetsLayout.astro

title: Comment optimiser une image Docker ?

author: Thomas
kind: Fiche technique
level: intermediaire
publishedDate: 06/04/2025
---

<article>

# Comment optimiser une image Docker ?

Ca y est : le cours sur Docker [est officiellement disponible](/cours/docker-et-docker-compose) ! Si ce n’est pas encore fait, je vous invite à le suivre avant d’attaquer cette fiche. J'y pose toutes les bases : images, conteneurs, Dockerfile, volumes, docker compose, etc.

Dans les prochaines fiches techniques, on va commencer à faire doucement la transition vers l’automatisation (un autre sujet cher à mon coeur). Petit teaser : en septembre, un cours complet sur les CI/CD avec GitHub Actions est prévu.

Mais avant d’automatiser quoi que ce soit, il y a une étape indispensable à connaître : **l’optimisation des images Docker**. Pourquoi ?

<br>

Parce qu’une image lourde, c’est :
- plus long à builder (en local comme en CI) ;
- plus long à envoyer sur un registry ;
- plus long à télécharger ;
- et plus lent à démarrer en production.

<br>

Autre chose, une image trop volumineuse embarque souvent des dépendances ou des fichiers inutiles. Résultat : le nombre de points d’entrée potentiels pour une attaque augmente. C’est ce qu’on appelle la surface d’attaque. **Plus une image est complexe, plus elle expose d’éléments à surveiller ou à sécuriser**.

Dans cette fiche, on va donc voir ensemble plusieurs bonnes pratiques concrètes pour réduire la taille de vos images et améliorer la sécurité de vos déploiements.


## Choississez une base plus légère

Quand vous cherchez une image sur DockerHub, vous avez peut-être déjà remarqué qu’il en existe plusieurs variantes. Prenons[ l’image officielle de Node.js sur DockerHub](https://hub.docker.com/_/node/) : vous y verrez des tags comme alpine, bullseye, buster, buster-slim, etc. **Sachez que ces noms désignent la distribution Linux sur laquelle l’image est construite**.

Par exemple : 
- alpine → [Alpine Linux](https://www.alpinelinux.org/), ultra légère ;
- buster, bullseye → différentes versions de Debian ;
- slim → une version épurée, sans outils inutiles comme `man`, `apt cache`, etc.

<br>

_Petite anecdote perso_ : pendant longtemps, je ne savais pas que ces tags faisaient référence à des distributions Linux. Je pensais que c’était juste des “saveurs” de l’image. En réalité, ça change complètement ce que contient votre image, à savoir donc sa taille, sa compatibilité et ses performances. C'est un peu comme une pizza si vous préférez une base sauce tomate (moins calorique) ou une base crème.

<br>

Du coup, avec quelques exemples : 
- `node` → version complète, assez lourde ;
- `node:slim` → même base, mais allégée ;
- `python` → version par défaut (souvent Debian) ;
- `python:alpine` → version très compacte (quelques Mo seulement).

<br>

**Attention avec les images alpines**. Elle est souvent recommandée pour sa taille mais ce n’est pas toujours la meilleure option. Il m'est arrivé parfois d'avoir des problèmes de dépendances, notamment en Python. Elle est idéale pour des services simples (comme un worker en Node.js) mais elle n’est pas adaptée à tous les projets.

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

Chaque fois que vous écrivez une instruction dans un Dockerfile (`FROM`, `RUN`, `COPY`, `ADD`, etc.), Docker crée un nouveau _layer_. **Un layer correspond à une couche empilée dans l’image finale**. C'est un peu comme  une pile de briques : chaque instruction ajoute une brique. L’ensemble des briques forme l’image.

<br>

Ces layers sont :
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

Dans l'exemple ci-dessus, le cache est supprimé dans le premier cas mais il reste stocké dans le layer précédent alors que dans le second, tout est fait dans le même layer, donc l’image finale est plus légère.

## Utilisez un `.dockerignore`

- Vous avez déjà probablement utilisé un `.gitignore` pour masquer certains de vos fichiers de l'index `.git`, par exemple les fichiers `.env`.
- Expliquer le rôle du fichier
- Éviter d’envoyer .git, node_modules, fichiers de dev dans le contexte de build.
- Vérifier la partie `.git` mais oublier de l'enlever dans un projet open source où vous poussez l'image peut augmenter la surface d'attaque. Il peut vous permettre de récupérer des credentials.
- Exemple de .dockerignore minimal :
```
.git
node_modules
*.log
```

## Vérifiez la taille de son image

- Il y a quelques commandes importantes à connaître pour vérifier la taille de ces images. Il est recommandé de leur faire régulièrement dans votre workflow.
- `docker image ls` - explication en une phrase de la commande
`docker image inspect` - explication en une phrase de la commande
`docker history nom_image` - explication en une phrase de la commande

## Astuce bonus - Supprimez le shell

Si votre image n’exécute qu’un seul script ou service, il est possible de la builder sans shell du tout.

## Conclusion

- Conclusion
- Teasing futur cours sur les CI/CD.
- Lien vers le cours sur Docker
- Lien vers le quiz.
- Si possible (si j'ai déjà préparé un ou deux exercices), donners les liens.

## Ressources

</article>
