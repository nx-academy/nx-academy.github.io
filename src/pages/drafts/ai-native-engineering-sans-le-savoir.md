---
layout: ../../layouts/BlogPostLayout.astro

title: J’ai fait de l’AI-native engineering sans le savoir
description:
  "J’ai appris un terme à la mode, et je me suis rendu compte que je le
  pratiquais déjà sur NX depuis des mois. Ce que le mot recouvre vraiment, une
  fois qu’on retire le discours commercial, et ce qu’il ne dit pas."

imgAlt:
  Un développeur qui découvre avec surprise une étiquette collée sur son propre
  bureau, pixel art
imgSrc: /images/articles/ai-native-engineering-sans-le-savoir.webp

kind: Articles
format: reflexion
serie: ia
tags:
  - IA
  - Développeur
  - NX Academy
author: Thomas Dimnet
github: tdimnet
publishedDate: 12/14/2026
---

Hier, j’ai appris un nouveau terme : _AI-native engineering_. Je suis allé lire
ce qu’il voulait dire, et j’ai eu la réaction de Monsieur Jourdain qui découvre
qu’il fait de la prose depuis plus de quarante ans. J’en fais depuis des mois,
sur NX, sans le savoir.

Je ne l’ai pas fait par conviction. Je l’ai fait parce que c’était, à chaque
fois, la seule chose logique à faire. C’est justement ce qui m’intéresse dans ce
terme : il met un nom sur une série de décisions qui, prises une par une, ne
ressemblaient à rien de particulier.

---

## Ce que le mot veut dire

Le terme vient surtout de cabinets de conseil et d’éditeurs d’outils, avec
quelques articles de recherche publiés depuis 2025. Ça se sent : on y parle
beaucoup de « modèle opérationnel » et de « transformation ». Une fois qu’on
retire l’emballage, il reste une distinction simple, et plutôt juste.

- **Assisté par l’IA** : on garde sa façon de travailler et on y ajoute un
  outil. L’autocomplétion dans l’éditeur, un assistant qu’on ouvre quand on
  bloque.
- **Natif IA** : on réorganise la façon de travailler en partant du principe
  qu’une partie du travail sera faite par un modèle. Ce qui change, ce n’est pas
  l’outil, c’est la répartition des rôles, et donc tout ce qui l’entoure : la
  documentation, la relecture, les tests.

La différence est la même qu’entre mettre une application existante dans un
conteneur et concevoir une application pour tourner dans des conteneurs. Dans le
premier cas, on déplace le problème. Dans le second, on change de manière de
penser.

---

## Ce que j’ai fait, dans l’ordre

Rien de ce qui suit n’a été planifié. Chaque étape est venue d’un problème
concret.

### J’ai commencé à écrire avant d’écrire

Le dossier `docs/` du dépôt contient aujourd’hui neuf fichiers et un peu plus de
deux mille lignes. Aucun n’est publié sur le site. Ce sont des documents de
cadrage : le [cluster IA](/drafts/l-ia-vue-depuis-la-prod), le cluster cloud, le
calendrier éditorial, la dette éditoriale, les agents autonomes.

Au départ, je les écrivais pour moi. Puis je me suis rendu compte qu’ils
servaient surtout à autre chose : **quand je demande à un modèle d’écrire une
fiche, c’est ce document qu’il lit en premier.** L’angle, le public, les
contenus voisins à citer, le niveau. Sans lui, j’obtiens une fiche correcte et
interchangeable. Avec lui, j’obtiens une fiche de NX.

Le document de cadrage est devenu la vraie spécification. Le texte qui en sort
est presque une conséquence.

### J’ai écrit ce que je ne voulais pas

Le cadrage du cluster IA se termine par une section qui s’appelle « Ce que ce
cluster n’écrit pas » : aucun prix, aucun nom de modèle dans un titre, aucun
classement, aucune prédiction. Plus haut, on trouve des décisions datées,
« *Arbitré le 14/09/2026* ».

Je n’ai jamais écrit ce genre de chose pour une équipe humaine. Entre humains,
ces règles passent à l’oral, dans une revue, dans un « non, pas comme ça ». Un
modèle, lui, repart de zéro à chaque session. Ce qui n’est pas écrit n’existe
pas. Alors j’ai tout écrit, et je me suis aperçu en passant que ça me servait
autant à moi qu’à lui : je ne rouvre plus les mêmes discussions tous les mois.

### Tout passe par une pull request, même quand je suis seul

NX est un projet presque solo. La plupart du temps, il n’y a personne d’autre
que moi pour relire mes PR. Pourtant, tout passe par une pull request vers
`main`, et la CI tourne sur chacune.

La raison est devenue évidente une fois que des agents ont commencé à écrire
dans le dépôt. Le document sur les agents autonomes le formule mieux que moi :
NX a deux chemins d’écriture. Ce qui passe par une PR hérite gratuitement des
garde-fous — Prettier, les tests, `astro check`, ma relecture. Ce qui écrit
directement en base, via le serveur MCP qui alimente le Feed, part en production
sans filet. **Le niveau d’autonomie que je laisse à un agent ne se décide donc
pas agent par agent. Il se déduit du chemin par lequel il écrit.**

Je n’ai pas inventé cette règle. Je l’ai constatée.

### « Proposer avant d’écrire »

Deux des skills du dépôt — le changelog et l’audit des tags — reposent sur la
même phrase : l’agent propose, je valide. Il ne touche pas au changelog tant que
je n’ai pas dit oui.

C’est probablement la décision la plus « native » de toutes, et c’est aussi la
plus banale. Elle revient à dire que mon travail a changé de nature. J’écris
moins. Je cadre, j’arbitre, je relis.

---

## Ce que le terme ne dit pas

Il y a une chose que les articles sur l’AI-native engineering ne disent jamais,
et que NX m’a apprise un peu brutalement.

**L’IA a accéléré ce qui n’était pas mon goulot d’étranglement.** Au 14
septembre, huit brouillons étaient entièrement rédigés dans le dépôt, et aucun
n’avait son image de une. Le texte n’attend plus. Le visuel pixel art, lui,
attend toujours. Réorganiser le travail autour d’un modèle déplace le goulot, il
ne le supprime pas. Et il le déplace généralement vers ce que le modèle ne fait
pas, ou ce qu’on ne veut pas qu’il fasse.

La deuxième chose, c’est que tout cela ne tient que si on s’y tient. Le 12 août,
j’ai poussé directement sur `main`, sans PR. Le message de commit dit tout :
« *I push on Main without a PR, yeah, cool…* ». Un processus natif IA n’est pas
une propriété du projet. C’est une habitude, et une habitude se perd un soir de
fatigue.

La troisième, c’est que le vrai changement n’est pas technique. Si je devais
résumer ce que j’ai fait sans le savoir en une phrase : **j’ai déplacé ce que je
sais du projet de ma tête vers le dépôt.** Les conventions sont dans un
`CLAUDE.md`, les règles d’écriture dans des skills, les décisions dans `docs/`,
les pièges dans des tests. Ce qui reste dans ma tête, c’est le goût — ce qui
fait qu’un texte est un texte de NX. Et ça, pour l’instant, je n’ai pas trouvé
comment l’écrire.

---

## Alors, un mot à la mode ?

Oui. Et un mot à la mode peut quand même désigner quelque chose de réel. Si vous
avez déjà écrit un fichier pour expliquer votre projet à un assistant, refusé
qu’un agent pousse sans passer par la CI, ou pris l’habitude de noter vos
décisions pour ne plus les rediscuter, vous en faites probablement aussi.

Ce que le terme ne vous dira pas, c’est par où commencer. Mon conseil tient en
une ligne : regardez où vous avez déjà des garde-fous, et laissez l’IA écrire
là, et seulement là. Le reste suit.

La partie la plus concrète de tout ça — le fichier d’instructions, les skills,
les tests qui disent non — porte elle aussi un nom à la mode. J’en parle dans
[un article à part](/drafts/harness-engineering-sans-le-savoir). Et si vous vous
demandez quel profil de développeur IA fait ce genre de choses, j’avais tenté
[une classification](/articles/profils-ia-developpeur) l’an dernier. Le « vape
coder » est exactement ce que l’AI-native engineering prétend dépasser.
