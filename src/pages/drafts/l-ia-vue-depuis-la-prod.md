---
layout: ../../layouts/BlogPostLayout.astro

title: L’IA vue depuis la prod
description:
  "J’ai écrit trois articles sur l’IA sans jamais expliquer ce qu’est un LLM.
  J’ouvre un dossier pour combler ce trou, avec l’angle qui manque partout
  ailleurs : l’IA expliquée à quelqu’un qui sait déjà déployer un conteneur et
  lire une facture cloud."

imgAlt:
  Un développeur qui regarde un compteur de consommation accroché à un serveur,
  pixel art
imgSrc: /images/articles/l-ia-vue-depuis-la-prod.webp

kind: Articles
format: reflexion
serie: ia
tags:
  - IA
  - Production
  - NX Academy
author: Thomas Dimnet
github: tdimnet
draft: false
publishedDate: 11/02/2026
---

J’ai publié trois articles sur l’IA depuis février 2025. Aucun des trois
n’explique ce qu’est un modèle de langage.

Ce n’est pas un oubli. [Le premier](/articles/gpt-meileur-ami) raconte comment
ChatGPT devient un compagnon de travail,
[le deuxième](/articles/profils-ia-developpeur) essaie de ranger les
développeurs en quatre profils selon leur manière de s’en servir,
[le troisième](/articles/ne-plus-se-dedoubler) parle de ce que ça change à ma
façon de travailler. Trois articles d’usage. C’est ce qui m’intéressait, et ça
m’intéresse toujours.

Sauf qu’ils supposent tous acquis quelque chose qui ne l’est pas. On ne peut pas
sérieusement discuter de la place d’un outil dans son métier sans savoir ce que
l’outil fait. J’ouvre donc un dossier pour combler ce trou.

---

## Deux sortes de contenus, et rien entre les deux

Quand je cherche à comprendre un truc sur l’IA, je tombe sur deux familles de
textes.

La première vulgarise pour le grand public. Le cerveau artificiel, la machine
qui pense, les neurones. C’est écrit pour quelqu’un qui n’a jamais programmé, et
ça marche très bien pour ça. Le problème est que la métaphore remplace
l’explication : à la fin, on a une image mentale et aucun moyen de décider quoi
que ce soit avec.

La seconde est la documentation des fournisseurs. Elle est précise, elle est à
jour, et elle est écrite pour quelqu’un qui a déjà tout compris. Elle vous dit
comment appeler l’API. Elle ne vous dit pas pourquoi votre facture a triplé la
semaine dernière.

Entre les deux, il manque le texte que j’aurais voulu lire : celui qui s’adresse
à quelqu’un qui sait déjà mettre une application en production. Qui sait ce
qu’est une image, un registry, une facturation à l’usage. Qui n’a pas besoin
qu’on lui explique ce qu’est une API, mais qui n’a jamais eu de raison de
regarder ce qu’il y a dans un modèle.

---

## La même question qu’au cloud, en fait

Quand j’ai ouvert [le cluster cloud](/fiches/comprendre-le-cloud-public) au mois
d’août, la question de départ n’était pas « qu’est-ce que le cloud ». C’était
deux questions beaucoup plus terre à terre : **jusqu’où le fournisseur s’occupe
de ma pile**, et **qu’est-ce que ça coûte vraiment**.

Ces deux questions se posent à l’identique sur l’IA, et je trouve que personne
ne les pose dans cet ordre.

Un appel à un modèle, c’est de la facturation à l’usage. Exactement la même
mécanique que la machine virtuelle qu’on oublie d’éteindre, avec une différence
désagréable : l’unité facturée n’est pas une heure, c’est un token, et personne
n’a d’intuition de ce qu’est un token. On ne sait pas compter ce qu’on consomme.

Un agent, c’est une boucle qui appelle ce truc facturé à l’usage un nombre de
fois qu’on ne connaît pas à l’avance. Je laisse chacun imaginer ce que ça donne
la première fois.

Et la surprise, quand elle arrive, est très précisément la surprise de la
première facture cloud. J’ai écrit
[un article entier là-dessus](/drafts/le-cloud-est-il-vraiment-moins-cher) au
mois de septembre, et je me suis rendu compte en le relisant qu’il décrivait
aussi bien l’un que l’autre. Même mécanique, mêmes angles morts, même tête au
moment d’ouvrir la facture.

C’est l’angle de ce dossier : **l’IA expliquée à quelqu’un qui sait déjà
déployer un conteneur et lire une facture.** Pas de métaphore du cerveau. Des
ordres de grandeur.

---

## Ce qu’il y a dedans

Cinq fiches, une par semaine à partir de la semaine prochaine.

- **[Qu’est-ce qu’un LLM et comment ça marche ?](/drafts/comprendre-les-llm)**
  La fiche socle. Prédire le token suivant, et rien d’autre. Pourquoi ça produit
  quand même du texte utile, et pourquoi l’hallucination n’est pas un bug qu’on
  corrigera un jour.
- **Tokens, contexte et coût.** Comment un texte devient des tokens, pourquoi
  une conversation coûte de plus en plus cher à mesure qu’elle avance, et
  comment estimer une facture avant d’écrire la première ligne.
- **Qu’est-ce qu’un agent IA ?** Un modèle, des outils, un critère d’arrêt. Et
  les trois choses que les démos ne montrent jamais.
- **Qu’est-ce que le protocole MCP ?** Celle-là, je l’écris avec un serveur en
  production sous les yeux : c’est lui qui alimente [le Feed](/feed) depuis le
  printemps.
- **Comment créer un premier agent IA ?** La mise en pratique, et le moment où
  on repasse la main aux fiches Docker et cloud pour le faire tourner ailleurs
  que sur son portable.

Un ou deux articles viendront se glisser là-dedans. Je ne dis pas encore
lesquels, parce que je ne le sais pas encore.

---

## Ce qu’il n’y a pas dedans

Pas de prix au million de tokens. Pas de comparatif de modèles. Pas de
classement, pas de benchmark recopié, pas de prédiction sur 2031.

Ce n’est pas de la pudeur, c’est de la maintenance. Tout ça se périme en
quelques semaines, et un site qui promet des fiches de référence ne peut pas
publier des contenus qu’il faudra corriger tous les mois. J’ai déjà assez de mal
à sortir ceux qui ne bougent pas.

Et j’ai deux endroits pour ce qui bouge. [Le Feed](/feed), où je commente
l’actualité au fil de l’eau depuis qu’il a changé de nature. Et
[Le Récap](/articles/le-recap), tous les mois. C’est là que vit la rentrée 2026,
qui a été particulièrement chargée. Pas ici.

---

## Une réserve, pendant qu’on y est

C’est le deuxième format que j’ouvre en trois mois, après
[L’atelier](/drafts/l-atelier-presentation). Je n’ai aucune idée de si celui-ci
tient. Un dossier, pour l’instant, ça veut simplement dire : des contenus qui se
citent et une porte d’entrée. Si ça marche, ça deviendra peut-être quelque chose
de plus formel. Sinon, ça restera six contenus bien rangés, et ce ne sera pas
une perte.

L’objectif n’est pas d’avoir un avis sur l’IA. J’en ai un, il traîne dans le
Feed. L’objectif est qu’après ces cinq fiches, vous puissiez ouvrir la
documentation d’un fournisseur et savoir ce que vous lisez.

On commence lundi prochain, par le début.
