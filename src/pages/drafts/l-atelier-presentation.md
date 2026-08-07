---
layout: ../../layouts/BlogPostLayout.astro

title: "L’atelier : NX depuis une tablette"
description:
  Depuis quelques mois, je fais l’essentiel de NX depuis ma tablette. J’ouvre
  une série sur les décisions techniques du projet et sur ce que chacune a
  fermé. On commence par ce que ça coûte.

imgAlt: Quelqu’un travaillant sur une tablette dans un jardin, pixel art
imgSrc: /images/articles/tablette-jardin.webp

kind: Articles
format: reflexion
serie: atelier
tags:
  - NX Academy
  - L'atelier
author: Thomas Dimnet
draft: false
publishedDate: 07/28/2026
---

Depuis quelques mois, je fais l’essentiel de NX depuis ma tablette. Les news
publiées via mon serveur MCP, les lots d’articles techniques.

Une tablette est un mauvais poste de travail. C’est précisément pour ça que ça
marche. Ce qui est pénible à faire dessus ne se fait pas — et ce qui est pénible
à faire dessus, la plupart du temps, n’était pas nécessaire. La contrainte trie
à ma place, et je m’en accommode mieux que je ne l’aurais cru.

Avant de raconter ce que cette contrainte m’a apporté, je veux dire ce qu’elle
m’a coûté. Parce qu’elle coûte quelque chose, et je préfère commencer par là.

---

## Ce que je ne sais pas

Il n’y a pas de tracking sur NX. C’est assumé depuis le début, et ça reste une
couche de moins à maintenir. Le prix est réel : je ne sais pas ce qui est lu.
Pas de statistiques, pas de courbes, aucune idée de savoir si un article a
touché dix personnes ou mille. Pour un projet dont l’objet est de transmettre,
c’est un renoncement qui pique. Je publie, et le texte disparaît de mon tableau
de bord, parce qu’il n’y a pas de tableau de bord. J’écris pour des lecteurs que
je ne compte pas.

Il y a plus trivial, du même ordre. L’adresse thomas@nx.academy reçoit mais
n’envoie pas. Quand je réponds à un message, c’est depuis une adresse
personnelle. Petit, permanent, un peu gênant.

Je le dis tout de suite : cette série ne sera pas un catalogue de bonnes
décisions.

---

## Pourquoi je travaille comme ça

Je suis seul sur NX. Pas d’équipe derrière, pas de relais quand quelque chose
casse. Chaque couche que j’ajoute est une couche que je devrai maintenir,
corriger, mettre à jour — et c’est autant de temps pris sur le reste. Un outil
de plus, c’est une dépendance de plus, une chose de plus à surveiller le jour où
elle tombe. Rationaliser le temps et les coûts n’est pas une posture. C’est ce
qui fait que le projet tient dans la durée plutôt que de s’arrêter au premier
coup de fatigue. La question n’est pas de savoir si je peux construire une
chose. Elle est de savoir si je voudrai encore la maintenir dans deux ans. La
plupart du temps, la réponse est non, et ça m’évite de commencer.

NX compte pour moi. C’est mon jardin, et je ne m’en suis jamais caché.

Le reste tient dans un constat sec. Le vrai gain n’est pas d’aller plus vite.
C’est le temps que je ne passe pas devant l’écran. Une bonne partie de ce
travail consiste à décider de ne pas développer. On enchaîne.

---

## L’atelier, c’est quoi ?

L’atelier fonctionne sur une règle simple. Chaque article prend une décision
technique de NX et raconte ce qu’elle a fermé. Pas ce qu’elle a ouvert : ce
qu’elle a fermé. Choisir, c’est écarter, et ce sont les portes fermées qui ont
une histoire.

Il y a de quoi faire. Le serveur MCP qui me permet de publier depuis la
tablette. Le choix de TursoDB pour la base de données. Astro plutôt qu’autre
chose pour le site. Les workflows qui s’appuient sur l’IA dans la fabrication
des contenus. Autant de sujets à venir, que je ne traite pas ici.

La règle, encore, parce qu’elle est le cœur du contrat : si une décision n’a
rien coûté, elle ne fait pas un article. Une décision facile n’apprend rien à
personne, moi compris. C’est cette ligne qui sépare l’atelier d’un devlog. Un
devlog raconte ce qu’on a fait. L’atelier raconte ce qu’on a renoncé à faire. Ce
qui coûte laisse une trace : un compromis, une chose abandonnée, une contrainte
qu’on finit par accepter. C’est ça que je veux garder.

---

## À quel rythme ?

Pas de cadence fixe. Un article quand il y a une décision à raconter, pas quand
le calendrier le réclame. Je préfère un texte qui a une raison d’exister à un
rendez-vous tenu pour la forme. Je le dis une fois, je ne le défendrai pas
davantage. Il y aura des mois sans rien. Ce n’est pas un abandon, c’est qu’il
n’y avait rien à raconter.

Le premier article de la série portera sur le serveur MCP. C’est la pièce qui me
permet de publier NX depuis une tablette. Je raconterai ce qu’elle m’a coûté, et
ce que j’ai accepté de ne pas faire pour qu’elle existe.
