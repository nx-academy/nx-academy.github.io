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

## Introduction

- Le cours sur Docker [est officiellement sorti](/cours/docker-et-docker-compose). Si ce n'est pas déjà fait, je vous invite à le suivre avant de continuer la lecture de cette fiche !
- Dans les prochaines fiches techniques, nous allons commencer à faire la transition vers les CI/CD. Petit teasing : le prochain cours portera sur les CI/CD avec les GitHub Actions. Il est prévu pour sortir en septembre.
- Alors, pourquoi il est important de parler d'optimisation d'images Docker. Parce qu'une image lente est plus longue à builder (que ce soit en local ou via une CI), qu'elle plus lourde à envoyer vers un registry Docker et donc plus longue à récupérer et parce que le conteneur prend aussi plus de temps à démarrer.
- Autre chose, plus votre image est lourde, plus elle utilise potentiellement des librairies inutiles dont elle n'a pas besoin. Cela peut augmenter la surface d'attaque.
- Dans cette fiche, nous allons voir plusieurs bonnes pratiques pour optimiser la taille de ses images.


## Choississez une base plus légère

- Avez-vous déjà remarqué en vous rendant sur DockerHub qu'il exitait différentes version des images. Par exemple, si on regarde la page officielle de Node.JS sur Dockerhub, on verra qu'il y a des tags comme `alpine`, `bullseye`, `buster-slim`, etc.
- Présentation des images officielles “fat” vs “slim” vs alpine
- Exemples concrets :
  - node → node:slim
  - python → python:alpine
- Annectote perso : pendant longtemps, je n'ai pas compris que `alpine` ou `buster-slim` se référaient à des distributions linux. (j'aimerais bien en dire un peu plus sur ce sujet).
- Pourquoi utiliser une image alpine n'est pas toujours une bonne idée ?

## Nettoyez votre image après l'installation

- C'est un point auquel on pense assez peu souvent. A chaque fois que vous installez des librairies, que ce soit avec Node.JS ou même `apt install`, vous ajoutez du cache.
- A quoi set le cache ? Pourquoi l'installation d'applications génère du cache ?

- Supprimer le cache APT, les fichiers temporaires, les .log, les *.md, etc.
```dockerfile
RUN apt-get update && apt-get install -y ... \
    && rm -rf /var/lib/apt/lists/*

```
- Pourquoi le faire dans le même RUN ?

## Réduisez le nombre de layers

- C'est quelque chose dont j'ai relativement peu parler dans mon cours sur Docker. Je préfèrerais me concentrer sur la compréhension de Docker avant de parler du concept de layers.
- Définition d'un layer Docker.
- Fusionner plusieurs RUN dans un seul
- Ce que fait Docker en “layerisant”
- Exemples 

```dockerfile
RUN apt-get install -y curl
RUN rm -rf /var/cache
```

```dockerfile
RUN apt-get install -y curl && rm -rf /var/cache
```

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
