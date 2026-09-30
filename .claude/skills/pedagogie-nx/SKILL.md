---
name: pedagogie-nx
description: >
  La façon d'enseigner et d'écrire de Thomas sur NX Academy : partir d'un
  problème concret plutôt que d'une définition, faire faire avant de nommer,
  montrer l'artefact réel au lieu de le décrire, dire ce qu'on laisse dehors,
  rendre la main au lecteur. Plus la voix : je / vous / on, scène d'ouverture
  datée, une phrase-clé en gras par section, chute courte, aveu d'erreur. À
  utiliser dès qu'on rédige, réécrit, relit ou critique un contenu NX — fiche,
  chapitre de cours, article, projet — ou qu'on juge s'il « enseigne » vraiment,
  même si ce n'est pas demandé explicitement. Complète typo-francaise (la
  typographie), ne la remplace pas.
---

# Enseigner et écrire comme sur NX

Ce skill décrit une manière de faire, pas un gabarit. Il est tiré des textes de
Thomas — `/methode`, `/a-propos`, les cours Docker et CI/CD, les articles de
2026 — et les passages qui le prouvent sont dans
[references/passages-temoins.md](references/passages-temoins.md). En cas de
doute sur une règle, relire le passage plutôt que la règle.

La typographie (espaces, guillemets, tirets) relève de `typo-francaise`. Les
deux skills s'appliquent ensemble.

## Le principe, en une phrase

> Une formation ne se juge pas à ce qu'elle contient. Elle se juge à ce qu'elle
> a choisi de laisser dehors, pour que le reste tienne. — `/methode`

Trois gestes en découlent, et tout le reste en est une conséquence :

1. **Choisir** ce qui compte maintenant, et le dire.
2. **Ordonner par le moment où le lecteur en a besoin**, pas par le sommaire
   d'un livre ni par l'ordre dans lequel l'auteur l'a vécu.
3. **Assumer ce qu'on laisse dehors**, comme une décision et pas comme une
   excuse.

## Les gestes d'enseignement

Chacun est un test qu'on peut faire passer à un texte. Un contenu « feignant »
en rate plusieurs, en général les mêmes : il raconte au lieu de montrer, et il
ne rend jamais la main.

### 1. Le problème avant la définition

On ne commence pas par ce qu'est une chose. On commence par la situation où on
en a besoin : l'API à migrer avant l'Adapter, la commande `pull` qui montre ses
limites avant le Dockerfile. La définition arrive ensuite, comme une réponse.

**Test** : la première section après l'ouverture est-elle une définition, une
étymologie, un « d'où vient le mot » ? Si oui, la déplacer après le premier
problème concret.

### 2. Faire avant de nommer

Le geste signature : « Je vais vous demander de lancer deux commandes. Pas
d'inquiétude, je vous expliquerai juste après. » Puis : « **Vous venez, sans le
savoir, de builder votre image.** » Le lecteur agit, constate, et le mot vient
se poser sur ce qu'il a déjà fait.

**Test** : le lecteur fait-il quelque chose — lancer, ouvrir, cocher, classer,
compter — avant qu'on lui donne le terme ? Dans un article, ça peut être aussi
léger qu'une question à laquelle il répond pour lui-même.

### 3. Montrer l'artefact, pas le décrire

Un Dockerfile s'affiche, il ne se résume pas. Même règle pour un fichier de
configuration, un test, un extrait de document, un message de commit, une sortie
de terminal. « Le fichier contient une règle sur les brouillons » ne vaut pas
les trois lignes du fichier.

**Test** : chaque fois que le texte dit « j'ai écrit un X », « il y a un test
qui », « le document explique que » — l'extrait est-il là ? Et s'il annonce
« une vingtaine de lignes suffisent », les vingt lignes sont-elles là ?

### 4. Dire ce qu'on laisse dehors

« Dans ce chapitre, on va se concentrer sur `FROM`, `COPY`, `WORKDIR` et
`CMD`. » Nommer le périmètre, et nommer ce qui viendra plus tard (« les networks
viendront, le jour où on aura un vrai problème qu'ils résolvent »).

**Test** : le lecteur sait-il, avant la moitié du texte, ce qui ne sera _pas_
traité ici, et où le trouver ?

### 5. Une analogie du quotidien, développée puis lâchée

Le voyage à l'étranger pour les instructions du Dockerfile, la pizza pour IaaS /
PaaS / SaaS, le cheval de trait pour le harnais. Une seule par notion, tirée de
la vie courante, poussée assez loin pour porter la notion (plusieurs
correspondances, pas une seule), puis abandonnée avant qu'elle ne mente.

**Test** : l'analogie tient-elle en une phrase ? C'est trop court, elle décore.
Est-ce qu'elle revient à chaque section ? C'est trop long, elle remplace.

### 6. L'erreur racontée, la sienne d'abord

Thomas enseigne à partir de ce qu'il a cassé : pousser direct en prod à ses
débuts, le commit « *I push on Main without a PR* », les 404 des brouillons. Le
lecteur apprend de l'erreur, et il se reconnaît dedans sans être jugé (« Je ne
le juge pas. J'ai été exactement à sa place. »).

**Test** : l'erreur est-elle racontée avec assez de détail pour qu'on la
reconnaisse chez soi — le symptôme, la cause, la réparation ?

### 7. Rendre la main

Un texte NX se termine sur quelque chose que le lecteur peut faire en fermant
l'onglet, chez lui, sur son projet. Pas une morale : un geste. Une porte
d'entrée unique plutôt qu'une liste (« Quatre briques, mais une seule porte
d'entrée »).

**Test** : quelle est la première action concrète que le lecteur peut faire
demain matin ? Si la réponse tient dans « réfléchir à », elle n'existe pas.

### 8. Rassurer sur le rythme

« Si tout ne rentre pas du premier coup, revenez sur ce chapitre dans quelques
jours. » « Pas besoin de tout savoir. » On donne au lecteur la permission de ne
pas tout comprendre maintenant, parce que l'ordre a été pensé pour ça.

## La voix

- **Qui parle.** « Je » pour l'expérience et l'avis. « Vous » pour le lecteur
  (vouvoiement dans les fiches et les cours, et par défaut dans les articles).
  « On » pour la progression commune (« on va se concentrer sur »). Le « tu »
  n'apparaît que dans l'essai de `/methode`, pour une scène vécue — ne pas
  l'étendre.
- **L'ouverture est une scène.** Un moment daté et concret : « L'autre soir, il
  était tard », « Mon tout premier poste de développeur », « Un collègue, chez
  Scaleway ». Jamais « Dans le monde d'aujourd'hui » ni « ces dernières
  semaines » (illisible quatre mois plus tard).
- **Une phrase-clé en gras par section**, parfois deux. C'est la phrase qu'on
  retiendrait si on ne lisait que le gras. Au-delà, le gras ne signale plus
  rien.
- **La chute courte.** Une section se termine souvent sur une phrase sèche qui
  retourne l'idée : « Plus on va vite, plus la rigueur en amont compte. Pas
  moins. » Une par section au plus, sinon ça devient un tic.
- **Les phrases courtes et les fragments** sont permis : « Tout est vrai. Tout
  est utile. Un jour. » Mais ils ponctuent un raisonnement, ils ne le remplacent
  pas.
- **L'aparté entre parenthèses** : « (vraiment bonne) », « (parfois trop
  vite) ». Rare, et toujours pour nuancer, jamais pour faire un clin d'œil.
- **L'understatement.** Pas de révolution, pas de promesse, pas de « game
  changer ». On constate, on nuance, on dit ce qu'on ne sait pas.
- **Les sections séparées par `---`** dans les articles.
- **Le concret NX comme preuve**, jamais comme sujet. NX sert d'exemple réel
  parce que c'est le seul terrain que Thomas connaît de l'intérieur. Mais le
  lecteur n'a pas NX : chaque exemple NX doit déboucher sur ce qu'il en fait
  chez lui.

## Ce que chaque format doit au lecteur

| Format                | Ce qu'il promet                          | Le minimum pédagogique                                                                                  |
| --------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Chapitre de cours     | Savoir faire une chose de plus           | Branche de départ, manipulation guidée, puis explication, puis récapitulatif. Le lecteur tape le code.  |
| Fiche technique       | Répondre à une question précise          | Titre en question, intuition (souvent une analogie), exemple reproductible, pièges, « lequel choisir ». |
| Article `reflexion`   | Changer la façon de voir un sujet        | Une thèse, un exemple réel montré, un outil de pensée réutilisable, un geste pour le lecteur.           |
| Article `recap/bilan` | Dire ce qui s'est passé et ce qu'on en a | Des faits datés, des chiffres vérifiés, ce qui a raté.                                                  |

Un article de réflexion reste un contenu qui enseigne. La différence avec une
fiche, c'est qu'il n'enseigne pas une commande : il enseigne une distinction,
une grille, une manière de trier. Si le lecteur ne repart avec aucun outil de
pensée qu'il peut appliquer ailleurs, c'est un billet d'humeur.

## Relire un contenu : la grille

À passer sur tout brouillon, dans l'ordre. Chaque « non » est un chantier.

1. Le premier problème concret arrive-t-il avant la première définition ?
2. Le lecteur fait-il au moins une chose avant qu'on lui donne un terme ?
3. Chaque artefact évoqué (fichier, test, commande, extrait) est-il montré ?
4. Le texte dit-il ce qu'il laisse dehors ?
5. L'ordre suit-il le besoin du lecteur, ou la chronologie de l'auteur ?
6. Y a-t-il un outil de pensée réutilisable hors du contexte de l'exemple ?
7. Le texte se termine-t-il sur un geste concret pour le lecteur ?
8. Chaque fait daté ou chiffré est-il encore vrai dans le dépôt aujourd'hui ?
9. Le gras, lu seul, raconte-t-il le texte ?

Rendre la relecture sous forme de diagnostic (ce qui manque, où, pourquoi), puis
de proposition de plan. **Proposer avant de réécrire** : Thomas valide la
direction avant qu'on touche au texte.

## Ce que ce skill ne sait pas faire

Le goût. Ce qui fait qu'un texte est un texte de NX ne se réduit pas à une liste
de gestes. Deux conséquences :

- **Ne pas imiter les tics.** Empiler des fragments, du gras et des chutes
  produit une parodie. Les gestes d'enseignement comptent plus que les marques
  de style.
- **Chaque correction de Thomas est une donnée.** Quand il réécrit un passage ou
  refuse une tournure, proposer d'ajouter le cas à
  `references/passages-temoins.md` (rubrique « Corrections »). C'est comme ça
  que ce skill s'améliore — voir `docs/voix-et-pedagogie.md`.
