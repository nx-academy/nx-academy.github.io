---
layout: ../../layouts/CheatSheetsLayout.astro

title: Comment faire un multi-stage build ?
description:
  Découvrez comment optimiser vos images Docker grâce au multi-stage build.
  Réduisez la taille de vos images, améliorez la sécurité et maîtrisez vos
  déploiements en production avec cette technique incontournable.

imgAlt:
  Une scène d'immeubles avec 6 appartements où l'intérieur est visible, pixel
  art
imgSrc: /images/cheatsheets/scene-immeuble.webp

author: Thomas
kind: Fiche technique
level: Avancé
publishedDate: 09/12/2025
---

<article>

# Comment faire <br> un multi-stage build ?

![Une scène d'immeubles avec 6 appartements où l'intérieur est visible, pixel art](/images/cheatsheets/scene-immeuble.webp)

Avant de commencer, sachez que
[le cours sur Docker et Docker Compose](/cours/docker-et-docker-compose/) est
actuellement disponible sur NX Academy. Je vais continuer à publier des fiches
techniques sur Docker, tout en préparant progressivement la transition vers le
prochain cours : les pipelines CI/CD avec GitHub Actions, prévu pour
septembre/octobre.

**C’est justement à la croisée de ces deux sujets que se trouve le multi-stage
build.**

Vous avez suivi
[mes conseils d’optimisation d’image Docker](/fiches/optimisation-images-docker/)
mais malgré tout, votre image Docker dépasse encore le giga ? Vous retrouvez des
outils de développement, des fichiers de build ou encore un dossier
`node_modules` complet dans votre image finale ?

Pas de panique, c'est normal ! **Il vous manque une étape essentielle : le
multi-stage build**.

Dans cette fiche technique, on va voir ensembles comment séparer les étapes de
build et d’exécution dans votre Dockerfile. Notre Objectif ? Ne garder que
l’essentiel dans l’image finale.

## Pourquoi faire un multi-stage build ?

Avant d'aller plus loin, je vais prendre le temps de définir un concept : celui
d'image dite "naïve". Sachez qu'on parle d'image Docker naïve quand cette
dernière contient tout ce qui a servi à la construire, sans distinction entre ce
qui est nécessaire à l’exécution et ce qui ne l’est pas.

Autrement dit, cette image Docker content notre code, nos dépendances, nos
outils de compilation, nos fichiers temporaires ou de tests (pas franchement
utile pour la production) et parfois même un `.git` ou un dossier
`node_moduless`. Bref Tout est un peu mélangé : il y a des dépendances dont on
va se servir en développement, d'autres uniquement pour la production.

[Dans ma fiche précédente](/fiches/optimisation-images-docker/), on a vu comment
supprimer les fichiers inutiles. Mais que faire des dépendances de développement
? Des outils de build ? On en a forcément besoin à un moment, non ?

Prenons un exemple : vous codez une API REST en Node.js. Pour plus de rigueur,
vous utilisez TypeScript. Mais à la fin, le code exécuté sera du JavaScript.
Vous avez donc besoin de tsc pour transcompiler, mais ce transcompilateur n’a
rien à faire dans l’image finale. Idem pour les node_modules de développement.

Si vous ne séparez pas bien les étapes, vous risquez :

- une image inutilement lourde (et donc plus lente à builder, pusher, puller) ;
- une surface d’attaque plus grande (plus de dépendances = plus de failles
  potentielles) ;
- un manque de maîtrise sur ce qui se retrouve réellement dans votre image.

<br>

C’est là que le multi-stage build entre en jeu. Il vous permet de séparer
proprement les étapes de build (compilation, packaging, etc.) de l’environnement
d’exécution.

## Les principes de base du multi-stage

Un Dockerfile peut contenir plusieurs instructions `FROM`. Pour rappel, **`FROM`
définit l’image de base à partir de laquelle on construit une image Docker**.

Dans le cadre d’un multi-stage build, chaque `FROM` démarre un nouveau stage,
complètement indépendant. On peut voir _les stages_ comme les étages d’un
immeuble : chaque étage a sa propre fonction, et même s’il est possible de faire
passer des éléments d’un étage à l’autre, chaque stage est isolé.

L’instruction `COPY --from=` permet de copier ce qui vous intéresse d’un stage
vers un autre. Voici un exemple simple :

<br>

```dockerfile
# Étape 1 : le stage de build
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Étape 2 : le stage d’exécution (plus léger)
FROM node:18-slim
WORKDIR /app

# On copie uniquement le résultat de la compilation
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/index.js"]
```

<br>

Dans cet exemple :

- `AS builder` permet de nommer un stage. Cela nous permet d'y faire référence
  plus tard. Un peu comme une fonction ou une variable en programmation ;
- dans le premier stage, on installe toutes les dépendances (y compris dev) et
  on compile l’application ;
- dans le deuxième stage, on repart sur une image plus légère, ici
  `node:18-slim`, et on ne copie que le dossier `dist/` contenant l’app
  transcompilée.

<br>

Ainsi, notre image finale ne contient ni le code source, ni les `node_modules`,
ni les outils de build. On garde uniquement ce qui est nécessaire à l’exécution
et vous venez de gagner quelques précieuses dizaines (ou centaines) de Mo.

## Les avantages de cette technique

On va continuer avec notre comparaison sur les immeubles. Quand on déménage, on
essaye la plupart du temps de garder l'essentiel et de jetter le reste (en tout
cas, c'est que j'essaye de faire). **Le multi-stage build, c'est un peu
pareil**.

On essaye de garder l'essentiel à chaque étape et d'éliminer le superflu. Cela
nous donne plusieurs versions de nos images plus propres, plus légères et aussi
plus sûres.

### Des images plus légères

En ne conservant que ce qui est nécessaire à l’exécution et pas les dépendances
de dev, les outils de compilation ou les fichiers temporaires, on réduit
considérablement la taille de l’image. Les images buildés avec du multi-stage
build (on dit aussi multi-stagging) sont souvent 2 à 5 fois plus légère qu’une
image "naïve".

### Une meilleure sécurité

Vous l'aurez compris mais moins de dépendances, c'est moins de surface
d’attaque. En production, vous n’avez pas besoin de vos outils de tests, de git,
ni de vos configs de dev. En les excluant, vous réduisez le risque d’introduire
des vulnérabilités.

### Une séparation claire entre les étapes

Le multi-stage build permet de structurer votre Dockerfile. Vous allez avoir
différents stages qui matchent vos différents environnements : un stage pour la
partie build, un stage pour la partie dev, un pour les tests, un autre pour la
pré-prod et enfin un pour la prod.

Cette séparation rend votre pipeline de build plus lisible, plus maintenable et
plus proche d’un workflow CI/CD propre.

## Quelques limites et pièges à éviter

Vous l'aurez compris, le multi-stage build, c'est bien (c'est même très bien !).
Il y a quelques petits pièges à éviter. Ils ne sont pas méchants. Pensez juste à
les avoir en tête quand vous mettez en place votre image.

### Copier trop de fichiers

Le premier piège est de copier trop de fichiers depuis un stage précédent. Si
vous copiez toute l’application, y compris les dépendances, fichiers de config
ou de test, vous recréez exactement le problème que vous essayiez de résoudre.
Vous allez vous retrouver avec une image trop lourde.

Dans ce type de cas, soyez sélectif dans vos `COPY --from=`. Ne récupérez que ce
dont votre runtime a réellement besoin ; souvent un dossier `dist/`, une binaire
ou un ensemble de fichiers statiques.

### Mal structurer les étapes

L'autre écueil classique est mal structurer vos étapes, autrement dit de ne pas
faire la bonne commande au bon moment. Je pense par exemple à :

- installer les dépendances dans le stage de build et les recopier entièrement
  dans le stage final, y compris les dépendances de dev.
- copier le dossier `node_modules` complet dev + prod.
- lancer un `npm install` dans le mauvais stage.

<br>

Ici, il est important que vous adoptiez une structure claire. Dans le stage de
build, installez tout. Dans le stage final, installez seulement ce qui est
nécessaire. Vous pouvez utiliser la commande `npm ci --only=production` si
besoin. Si cette commande ne vous parle pas, je vous invite
[à lire cet excellent thread](https://stackoverflow.com/questions/9268259/how-do-you-prevent-install-of-devdependencies-npm-modules-for-node-js-package)
sur stackOverflow.

### Pas utile pour les scripts simples

Pas besoin de sortir l’artillerie lourde pour un simple script Python ou un
petit projet en Bash. Si votre projet tient en un fichier ou deux, restez simple
: un seul `FROM` suffira.

Je sais qu'en informatique, on a souvent tendance à faire de l'overengineering
(soit par ego, soit pour se rassurer sur son niveau). Honnêtement, faites simple
! **Simple is better than complex**.

### Le piège des Dockerfiles multiples

Il m'est parfois arrivé de voir des projets avec plusieurs Dockerfiles :

```text
Dockerfile.dev
Dockerfile.staging
Dockerfile.prod
```

Sur le papier, ça paraît propre. On se dit qu'on a un fichier Dockerfile par
environnement. En réalité, c’est un anti-pattern.

- On duplique beaucoup de code entre ces fichiers ;
- les différences sont souvent minimes ; parfois juste une instruction ou deux ;
- Et surtout, on introduit un risque de divergence : la prod ne reflète plus la
  réalité du build de dev et inversement.

Bref, ici, c'est important de centraliser tout dans un seul `Dockerfile`. Votre
image doit être la plus bête (on pourrait dire aussi stateless) possible. Tirez
parti des arguments (ARG) ou des variables d’environnement (ENV) pour ajuster
les comportements selon le contexte.

## Bonus - Nommez vos stages

Nommez ces stages n'est pas obligatoire mais je vous le recommande fortement
recommandé.

```dockerfile
FROM node:18 AS builder
FROM node:18-slim AS runtime
```

En donnant à votre stage un nom explicite (builder, runtime, test, lint, etc.),
on comprend instantanément le rôle de chaque étape. Plus besoin de commenter
chaque `FROM`. Quand c’est bien nommé, le nom devient le commentaire.

Idem pour les instructions `COPY --from=` qui deviennent tout de suite beaucoup
plus claires :

```docker
# Avant
COPY --from=0 /app/dist ./dist

# Après
COPY --from=builder /app/dist ./dist
```

Je nomme systématiquement mes stages dès que je travaille en multi-stage.

---

Voilà qui conclut cette fiche technique !

Le multi-stage build (ou multi-stagging) est un concept essentiel en Docker.
Grâce à lui, vous pouvez optimiser vos images et déployer des applications plus
légères, plus sûres et plus maîtrisées.

Une fiche technique sur la mise en place d’un multi-stage build dans une
pipeline CI pourrait bien arriver bientôt :).

D’ici là :

- [faites le quiz](/quiz/bien-faire-multi-stage-build) pour valider vos acquis ;
- commencez
  [le cours sur Docker et Docker Compose](/cours/docker-et-docker-compose) si ce
  n’est pas déjà fait.

## Ressources

- [Multistage Image Builds in Docker: A Comprehensive Guide from Basics to Mastery](https://medium.com/@lexitrainerph/multistage-image-builds-in-docker-a-comprehensive-guide-from-basics-to-mastery-5884b547950)
- [How to Build Smaller Container Images: Docker Multi-Stage Builds](https://labs.iximiuz.com/tutorials/docker-multi-stage-builds)
- [Docker Multi-Stage Builds: An In-depth Guide](https://ercanermis.com/docker-multi-stage-builds-an-in-depth-guide/)

</article>
