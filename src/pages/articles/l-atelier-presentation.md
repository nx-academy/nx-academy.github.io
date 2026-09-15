---
layout: ../../layouts/BlogPostLayout.astro

title: "L’atelier ou NX depuis une tablette"
description:
  NX n’a pas de compte utilisateur, pas de tracking, pas d’API et pas de
  backend. Il a un serveur MCP. Premier article d’une série sur les décisions
  techniques du projet et sur ce que chacune a fermé.

imgAlt: Quelqu’un travaillant sur une tablette dans un jardin, pixel art
imgSrc: /images/articles/tablette-jardin.webp

kind: Articles
format: reflexion
serie: nx
tags:
  - NX Academy
  - L'atelier
author: Thomas Dimnet
github: tdimnet
publishedDate: 09/17/2026
---

Ce matin, depuis mon canapé, et surtout via ma tablette, j’ai pushé du code sur
NX. Pas de PC portable ou de terminal ouvert. Voilà comment je fais tourner NX
depuis quelques mois. Les brèves du Feed partent via mon serveur MCP, les fiches
techniques sortent par lots via Claude Code et je n’ouvre plus l’ordinateur que
pour ce qui ne tient vraiment pas sur une tablette.

On sera tous d’accord pour se le dire une tablette est un mauvais poste de
travail. Ce qui est pénible à faire dessus ne se fait pas et ce qui est pénible
à faire dessus, la plupart du temps, n’était pas nécessaire. La contrainte trie
à ma place et je m’en accommode mieux que je ne l’aurais cru.

Cela dit, si je peux travailler comme ça, ce n’est pas un exploit technique.
C’est surtout qu’il n’y a presque rien à faire tourner.

---

## Ce que NX n’a pas

NX est un site de cours, un projet perso, un jardin d’expérimentation et un
petit média. Voici la liste de ce qu’il n’a pas.

**Pas de compte.** Vous ne créez rien pour lire NX. Pas d’inscription, pas de
mot de passe oublié, pas de base d’utilisateurs à protéger. Ce que ça ferme,
c'est je ne peux pas vous suivre d’un appareil à l’autre (et c'est tant mieux
!). La reprise de lecture existe, mais elle vit dans le `localStorage` de votre
navigateur. Vous changez de machine et elle est perdue.

**Pas de tracking.** Pas de statistiques, pas de courbes, aucune idée de savoir
si un article a touché dix personnes ou mille. Pour un projet dont l’objet est
de transmettre, c’est le renoncement qui pique le plus. J’écris pour vous sans
jamais savoir combien vous êtes. Honnêtement, c'est parfois assez dur à vivre.

**Pas d’API.** Rien à documenter, à versionner, à maintenir pour les autres. Il
y a un flux RSS et un sitemap et ça couvre les besoins réels.

**Pas de framework CSS.** Du CSS écrit à la main, propriété par propriété. Ce
que ça ferme pas de grille toute faite et une page un peu tordue me prend plus
de temps qu’à quelqu’un qui dégaine Tailwind.

**Pas de backend.** Rien ne tourne quand vous chargez une page. Le site est une
pile de fichiers statiques sur GitHub Pages. La base de données est lue au
moment du build, jamais pendant votre visite.

Le vrai gain n’est pas d’aller plus vite, c’est le temps que je ne passe pas
devant l’écran. **Une bonne partie de ce travail consiste à décider de ne pas
développer.**

---

## Le seul truc qui bouge

Sauf qu’un site, même statique, ça se met à jour. Et là, la réponse classique
c’est un back-office avec une interface d’administration, des formulaires, une
authentification, un éditeur de texte riche, une prévisualisation. Des semaines
de travail pour des pages que je serais le seul à voir.

[nx-mcp](https://github.com/nx-academy/nx-mcp) fait le même travail sans
interface. C’est un serveur MCP hébergé dans un conteneur serverless chez
Scaleway, que je branche à Claude. Concrètement, quand je publie une brève, je
donne l’idée et la source, le modèle rédige, une passe de relecture cale le
texte sur ma façon d’écrire, le serveur écrit la ligne dans la base Turso, puis
déclenche un build GitHub qui régénère le site. Je n’ai pas quitté ma
conversation et les brèves ne partent d’ailleurs pas que sur NX.

Ce que ça ferme, et ce n’est pas rien il n’y a aucun moyen de publier sur NX
sans passer par un LLM. Pas de formulaire de secours, pas d’écran de connexion.
Le jour où le serveur tombe, il me reste l’édition d’un fichier à la main et un
commit mais on est déjà loin du canapé.

---

## Le Storybook dont personne n’avait besoin

Je n’ai pas toujours travaillé comme ça, loin de là.

Il y a quelques années, sur un POC d’application React Native, j’ai monté un
Storybook. Avec les tests qui vont avec. Sur un POC. L’objet du projet était de
savoir s’il y avait un marché, autrement dit de mettre une maquette qui marche
entre les mains de quelques personnes et de regarder leur tête. Le Storybook n’a
servi à personne, pas même à moi.

Pourquoi je l’ai fait ? Parce que ça se faisait. Parce qu’un développeur sérieux
documente ses composants et teste son code. Parce que ça me rassurait sur mon
propre niveau. C’était bon pour l’ego et parfaitement inutile pour le projet.

Je retrouve cette mécanique un peu partout et je ne jette la pierre à personne
puisque j’y suis passé. On ne construit pas la chose dont on a besoin, on
construit la chose qui prouve qu’on sait la construire. La question n’est pas de
savoir si je peux construire quelque chose. Elle est de savoir si je voudrai
encore la maintenir dans deux ans. La plupart du temps, la réponse est non, et
ça m’évite de commencer.

---

## Alors, l’atelier, c’est quoi ?

Dans [le point d’étape de rentrée](/articles/point-etape-rentree-2026),
j’annonçais une nouvelle série. La voici. Chaque article prendra une décision
technique de NX et racontera ce qu’elle a fermé.

Il y a de quoi faire. Le choix de [Turso](https://turso.tech/) pour la base de
données, [Astro](https://astro.build/) plutôt qu’autre chose pour le site, et
surtout les workflows IA que j’utilise pour fabriquer les contenus. Les brèves,
les [fiches techniques](/fiches), les images. Je les prendrai les uns après les
autres, un par article.

Une règle quand même. Si une décision n’a rien coûté, elle ne fera pas un
article. Une décision facile n’apprend rien à personne, moi compris.

---

## À quel rythme ?

Je n'ai pas de cadence fixe. Un article quand il y a une décision à raconter,
pas quand le calendrier le réclame. Je préfère un texte qui a une raison
d’exister à un rendez-vous tenu pour la forme. Il y aura des mois sans rien. Ce
n’est pas un abandon, c’est qu’il n’y avait rien à raconter.

En attendant, si une décision que vous voyez passer sur le site vous intrigue,
dites-le-moi.
[Une issue sur le dépôt](https://github.com/nx-academy/nx-academy.github.io/issues/new)
fait très bien l’affaire. Il y a des choix que je ne pense plus à expliquer
parce qu’ils me paraissent évidents, et c’est souvent là qu’il y a quelque chose
à raconter.
