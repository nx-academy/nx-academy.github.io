---
layout: ../../layouts/CheatSheetsLayout.astro

title: Comment faire un multi-stage build ?
description: Une super description
---

<article>

# Comment faire un multi-stage build ?

Avant de commencer, sachez que [le cours sur Docker et Docker Compose](/cours/docker-et-docker-compose/) est actuellement disponible sur NX Academy. Je vais continuer à publier des fiches techniques sur Docker, tout en préparant progressivement la transition vers le prochain cours : les pipelines CI/CD avec GitHub Actions, prévu pour septembre/octobre.


**C’est justement à la croisée de ces deux sujets que se trouve le multi-stage build.**


Vous avez suivi [mes conseils d’optimisation d’image Docker](/fiches/optimisation-images-docker/) mais malgré tout, votre image Docker dépasse encore le giga ? Vous retrouvez des outils de développement, des fichiers de build ou encore un dossier `node_modules` complet dans votre image finale ?

Pas de panique, c'est normal ! **Il vous manque une étape essentielle : le multi-stage build**.

Dans cette fiche technique, on va voir ensembles comment séparer les étapes de build et d’exécution dans votre Dockerfile. Notre Objectif ? Ne garder que l’essentiel dans l’image finale.


## Pourquoi faire un multi-stage build ?

Avant d'aller plus loin, je vais prendre le temps de définir un concept : celui d'image dite "naïve". Sachez qu'on parle d'image Docker naïve quand cette dernière contient tout ce qui a servi à la construire, sans distinction entre ce qui est nécessaire à l’exécution et ce qui ne l’est pas.

Autrement dit, cette image Docker content notre code, nos dépendances, nos outils de compilation, nos fichiers temporaires ou de tests (pas franchement utile pour la production) et parfois même un `.git` ou un dossier `node_moduless`. Bref Tout est un peu mélangé : il y a des dépendances dont on va se servir en développement, d'autres uniquement pour la production.


[Dans la fiche précédente](/fiches/optimisation-images-docker/), on a vu comment supprimer les fichiers inutiles. Mais que faire des dépendances de développement ? Des outils de build ? On en a forcément besoin à un moment, non ?


On va prendre un exemple : vous codez une API REST en Node.JS. Pour être plus rigoureux, vous décidez d'utiliser TypeScript. Seulement, à la fin, le moteur d'excecution (le runtime) est du JavaScript. Vous avez besoin de `tsc` pour transcompiler mais ce transcompilateur n’a rien à faire dans l’image finale. Idem pour node_modules/dev.


Si vous ne séparez pas bien les étapes, vous risquez :
- une image inutilement lourde (et donc plus lente à builder, pusher, puller) ;
- une surface d’attaque plus grande (plus de dépendances = plus de failles potentielles) ;
- un manque de maîtrise sur ce qui se retrouve réellement dans votre image.

<br>

C’est là que le multi-stage build entre en jeu. Il vous permet de séparer proprement les étapes de build (compilation, packaging, etc.) de l’environnement d’exécution.

## Les principes de base du multi-stage

- Un Dockerfile peut contenir plusieurs FROM. Souvenez-vous, l'instruction `FROM` correspond à (ajouter une petite phrase de définition).
- Chaque bloc FROM va correspondre à un stage indépendant.
- Vous pouvez copier ce qui vous intéresse d’un stage à l’autre avec COPY --from=.

```dockerfile
# Stage builder
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Autre stage (sans nom)
FROM node:18-slim
WORKDIR /app

# Ici, on copie l'app buildée depuis le stage builder.
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/index.js"]
```

- AS builder : on nomme un stage pour y faire référence ;
- On installe tout dans builder, on ne copie que le dist/ dans la deuxième image. Notez que les deux stages n'ont pas la même base d'image Node.JS : le stage builder a une plus grosse image.
- Le runtime n’a pas besoin de node_modules, ni du code source non compilé

## Les avantages de cette technique

- Image plus petite (souvent 2 à 5 fois plus légère) ;
- Moins de dépendances → meilleure sécurité
- Séparation claire entre build et prod

## Quelques limites et pièges à éviter

- Copier trop de fichiers → recréer le problème
- Mal structurer les étapes (ex: node_modules en prod)
- Pas nécessaire pour les scripts simples ou mono-fichier
- Il arrive parfois de voir des infras avec plusieurs fichiers Dockerfile pour le même projet. Par exemple, `prod.Dockerfile`, `stagging.Dockerfile` et `dev.Dockerfile`. C'est clairement une fausse bonne idée (c'est même un anti-pattern). Expliquer pourquoi.

## Exemples complémentaires

### Python

### Php

## Bonus - Nommez vos stages

- COPY --from=builder
- Possibilité d’avoir un stage test, un build, un prod
- Debug : utiliser docker build --target builder pour s’arrêter à une étape
- Permet aussi d'éviter des commentaires : quand quelque chose est bien nommé, on a pas besoin de commentaires.

## Conclusion

</article>
