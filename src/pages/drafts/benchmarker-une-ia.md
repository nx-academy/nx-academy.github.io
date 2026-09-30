---
layout: ../../layouts/BlogPostLayout.astro

title: Benchmarker une IA, qu’est-ce que ça veut vraiment dire ?
description:
  "Chaque nouveau modèle arrive avec son tableau de scores. J’ai voulu
  comprendre ce qu’il y a derrière : comment on fabrique un benchmark, ce qu’il
  mesure vraiment, et pourquoi il faut le lire comme une suite de tests qu’on
  n’a pas écrite."

imgAlt:
  Un développeur qui examine un podium de robots avec une loupe et un
  chronomètre, pixel art
imgSrc: /images/articles/benchmarker-une-ia.webp

kind: Articles
format: reflexion
serie: ia
tags:
  - IA
  - Développeur
  - Tests
author: Thomas Dimnet
github: tdimnet
publishedDate: 01/04/2027
---

Chaque annonce de modèle se ressemble. Un nom, une date, et un tableau : une
dizaine de lignes aux noms étranges, des pourcentages, quelques cases en gras
pour montrer où le nouveau venu fait mieux que les autres.

Pendant longtemps, j’ai lu ces tableaux comme on lit un classement de football.
Plus haut, c’est mieux. Puis je me suis demandé ce que voulait dire,
concrètement, « 87 % » sur une ligne dont je ne connaissais même pas le nom. Et
je me suis rendu compte que je n’en avais aucune idée.

Cet article ne compare aucun modèle. Il n’y a pas de classement, et il n’y en
aura pas : il serait faux dans trois mois. Il essaie de répondre à une question
plus simple et plus durable : **qu’est-ce qu’on fait, exactement, quand on
benchmarke une IA ?**

---

## Un benchmark, c’est trois choses

Quand on retire le vocabulaire, un benchmark se résume à trois ingrédients.

1. **Un jeu de questions.** Quelques centaines ou quelques milliers de tâches,
   figées, publiées. Des QCM, des problèmes de maths, des bugs à corriger.
2. **Une façon de noter.** Comparer à la bonne réponse, lancer des tests,
   demander un avis à un humain, ou à un autre modèle.
3. **Un protocole.** Quel prompt on envoie, combien d’exemples on donne au
   modèle avant la question, combien d’essais on lui accorde, avec quelle
   température.

Le troisième ingrédient est celui dont on parle le moins, et c’est souvent là
que tout se joue. Le même modèle, sur le même jeu de questions, peut gagner ou
perdre plusieurs points selon la formulation du prompt ou le nombre d’essais.
Deux chiffres obtenus avec deux protocoles différents ne se comparent pas, même
s’ils portent le même nom.

Si vous écrivez des tests, vous avez déjà l’intuition : un benchmark, c’est une
**suite de tests**. Avec une différence de taille : ce n’est pas vous qui l’avez
écrite, et ce n’est pas votre code qu’elle teste.

---

## Les trois grandes familles

Les noms qui suivent sont des exemples datés, cités parce qu’on les croise
partout en 2026. Ils seront remplacés. Les familles, elles, restent.

### Les questionnaires

Le modèle le plus simple : un QCM géant. MMLU, par exemple, pose des milliers de
questions à choix multiples dans des dizaines de disciplines, du droit à la
médecine en passant par la physique. La notation est triviale : bonne lettre ou
mauvaise lettre.

C’est facile à lancer, facile à comparer, et ça mesure une chose précise : la
capacité à reconnaître la bonne réponse parmi quatre. Ce n’est pas la même chose
que savoir résoudre un problème, et encore moins savoir le faire dans votre
contexte.

### Les tâches vérifiables

Ici, on ne demande pas au modèle de choisir une réponse, on lui demande de
produire quelque chose qu’une machine peut vérifier. Pour le code, c’est
naturel : on lui donne une fonction à écrire, et on lance des tests unitaires.
Ils passent ou ils ne passent pas.

SWE-bench pousse l’idée plus loin : il prend de vrais tickets de vrais projets
open source, donne au modèle le dépôt tel qu’il était avant la correction, et
vérifie que les tests ajoutés par la correction humaine passent après la sienne.
C’est ce qui se rapproche le plus du travail d’un développeur, et c’est pour ça
qu’on en parle autant.

On croise souvent une notation du type `pass@1` ou `pass@10`. Elle répond à la
question : si on laisse au modèle un essai, ou dix, quelle proportion des
problèmes résout-il au moins une fois ? La nuance compte. Dix essais, en
pratique, c’est dix fois le coût, et quelqu’un pour choisir la bonne réponse.

### Les préférences humaines

La troisième famille renonce à la bonne réponse. On montre à des gens deux
réponses anonymes à la même question, ils choisissent celle qu’ils préfèrent, et
on en déduit un classement, avec le même système de points que les échecs.
LMArena (anciennement Chatbot Arena) est l’exemple le plus connu.

C’est la seule famille qui mesure ce que ressent un utilisateur. C’est aussi la
plus facile à biaiser : une réponse plus longue, mieux mise en forme ou plus
aimable gagne souvent, qu’elle soit juste ou non.

Une variante s’est généralisée : remplacer l’humain par un autre modèle, qui
note les réponses. On appelle ça _LLM-as-a-judge_. C’est beaucoup moins cher, et
ça pose une question évidente : qui note le juge ?

---

## Pourquoi c’est si brumeux

Si les benchmarks paraissent flous, ce n’est pas parce qu’ils sont mal faits.
C’est parce qu’ils souffrent de quatre problèmes structurels, que les tableaux
d’annonce ne mentionnent jamais.

**La contamination.** Les jeux de questions sont publics. Les modèles sont
entraînés sur une grande partie du web. Tôt ou tard, les questions — et parfois
les réponses — se retrouvent dans les données d’entraînement. Le modèle ne
résout plus le problème, il s’en souvient. C’est l’équivalent d’un élève qui a
eu le sujet la veille.

**La saturation.** Quand tous les modèles dépassent 90 % sur un benchmark, il ne
départage plus personne. On en crée un plus difficile, qui sature à son tour un
ou deux ans plus tard. C’est pour ça que les noms changent sans cesse dans les
tableaux.

**La loi de Goodhart.** « *Quand une mesure devient un objectif, elle cesse
d’être une bonne mesure.* » Dès qu’un benchmark sert d’argument commercial, les
équipes optimisent pour lui, consciemment ou non. Le score monte plus vite que
la capacité qu’il était censé mesurer.

**Le protocole de l’éditeur.** Les chiffres d’une annonce sont presque toujours
produits par l’éditeur du modèle, avec son propre protocole, sur les benchmarks
qu’il a choisi de montrer. Ce n’est pas forcément malhonnête. Mais ce n’est pas
une mesure indépendante, et les cases vides du tableau en disent parfois autant
que les cases en gras.

---

## Ce qui compte vraiment : votre propre benchmark

Les équipes qui construisent sérieusement avec des modèles finissent toutes par
faire la même chose : elles écrivent leur propre jeu de tests. Dans le métier,
on appelle ça des _evals_.

Le principe est exactement celui d’un benchmark public, à l’échelle d’un projet.
Vingt ou cinquante cas tirés de votre usage réel. Une façon de noter —
automatique quand c’est possible, un juge ou un humain quand ça ne l’est pas. Un
protocole fixe, pour que deux mesures se comparent.

Sur NX, par exemple, la génération de quiz par IA se prêterait très bien à
l’exercice : une quinzaine de chapitres de cours, des critères simples (une
seule bonne réponse, des distracteurs plausibles, pas de question hors du
chapitre), et on sait tout de suite si un changement de modèle ou de prompt
améliore les choses ou les dégrade.

C’est là que le mot « benchmark » redevient utile pour un développeur. Un
tableau d’annonce vous dit comment un modèle se comporte sur les questions de
quelqu’un d’autre. Vos evals vous disent comment il se comporte sur les vôtres.
Seule la seconde information vous aide à décider.

---

## Cinq questions à poser à un chiffre

La prochaine fois que vous croisez un tableau de scores, voici ce que je me pose
désormais comme questions, dans l’ordre.

1. **Qu’est-ce que ce benchmark mesure ?** Reconnaître une bonne réponse,
   produire du code qui passe des tests, plaire à un humain ?
2. **Qui a fait la mesure ?** L’éditeur, ou quelqu’un d’indépendant ?
3. **Avec quel protocole ?** Combien d’essais, quel prompt, et est-ce le même
   pour tous les modèles du tableau ?
4. **Le benchmark est-il saturé ou contaminé ?** Si tout le monde est à 90 %,
   l’écart de deux points ne veut plus dire grand-chose.
5. **Est-ce que ça ressemble à mon usage ?** Si la réponse est non, le chiffre
   est une information, pas un argument.

Aucune de ces questions ne demande de savoir comment fonctionne un modèle de
langage. Si vous voulez quand même le savoir,
[la fiche sur les LLM](/drafts/comprendre-les-llm) pose les bases, et
[celle sur les tokens et le coût](/drafts/tokens-contexte-et-cout) explique
pourquoi « dix essais » n’est jamais gratuit.
