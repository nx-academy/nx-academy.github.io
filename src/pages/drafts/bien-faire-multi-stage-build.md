---
layout: ../../layouts/CheatSheetsLayout.astro

title: Comment faire un multi-stage build ?
description: Une super description
---

<article>

# Comment faire un multi-stage build ?

## Introduction - une image trop grosse, encore ?

- Pour rappel, le cours sur Docker et docker compose est actuellement disponible.
- Je continue petit à petit ma transition vers le prochain cours : celui sur les CI/CD avec GitHub Actions.
- C'est une notion que j'aborde dans ce chapitre mais j'avais envie de revenir dessus plus en détails dans une fiche technique tant cela me semble une notion essentielle.

- Vous avez buildé votre image et vous l'avez optimisé, notamment grâce à ma fiche technique mais elle pèse encore 1 Go. Vous avez des outils de dev, des fichiers de build, voire node_modules complet dans l’image finale ?

Dans cette fiche technique, vous allez voir comment séparer les étapes dans un Dockerfile pour ne garder que l’essentiel dans l’image finale.


## Pourquoi faire un multi-stage build ?

- Une image “naïve” contient tout : code, dépendances, outils de compilation, fichiers temporaires. On a certes vu comment enlever les fichiers temporaires dans ma précédente fiche technique mais que faire des dépendances de développement.
- Après tout, si on veut utiliser notre image Docker aussi bien dans un environnement de développement que de production, on aura besoin à un moment d'avoir toutes nos dépendances, non ?
- Idem pour une partie de notre code, notre runtime peut-être du Node.JS mais si on code en TypeScript, on aura besoin des deux. 

- Cela nous amène à des problèmes tels que :
  - une taille d'image inutilement grande (et donc plus longue à builder) ;
  - des risques de sécurité (la fameuse surface d'attaque)
  - moins de maîtrise sur le contenu

- Il est donc important de savoir séparer ce qui sert à build de ce qui sert à exécuter. C'est là que le multi-stage build rentre en jeu.

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
