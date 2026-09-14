---
layout: ../../layouts/CheatSheetsLayout.astro

title: "Qu’est-ce qu’un LLM et comment ça marche ?"
description:
  "Un LLM prédit le token suivant, et rien d’autre. On voit ce que ça veut dire
  concrètement : comment un texte devient des tokens, ce que « entraîner »
  signifie par rapport à « utiliser », pourquoi un modèle n’a aucune mémoire
  entre deux appels et pourquoi il hallucine par construction."

imgAlt:
  Une machine à écrire mécanique qui devine la lettre suivante avant qu’on la
  tape, pixel art
imgSrc: /images/cheatsheets/comprendre-les-llm.webp

author: Thomas Dimnet
github: tdimnet
kind: Fiche technique
serie: ia
tags:
  - IA
  - Production
level: Débutant
publishedDate: 11/09/2026

faq:
  - question: Qu’est-ce qu’un LLM exactement ?
    answer:
      "Un grand modèle de langage est un programme entraîné à prédire le
      fragment de texte suivant à partir de tout ce qui précède. Il ne comprend
      pas la question, il ne consulte aucune base de connaissances au moment de
      répondre : il calcule, pour chaque suite possible, laquelle est la plus
      probable compte tenu de son entraînement, en choisit une, et recommence."
  - question: Pourquoi un LLM invente-t-il des réponses fausses ?
    answer:
      "Parce qu’il optimise la plausibilité, pas la vérité. Un modèle n’a pas de
      notion de vrai ou de faux, seulement une notion de « ce qui ressemble à
      une suite crédible ». Une référence bibliographique inventée a exactement
      la même forme qu’une vraie, donc rien dans le mécanisme ne permet de les
      distinguer. C’est pour cette raison que l’hallucination n’est pas un bug
      qu’on corrigera un jour."
  - question: Un LLM se souvient-il de nos conversations précédentes ?
    answer:
      "Non. Un modèle n’a aucune mémoire entre deux appels. Si une application
      semble se souvenir, c’est qu’elle renvoie l’historique dans la requête
      suivante, à ses frais. C’est aussi pour ça qu’une longue conversation
      coûte de plus en plus cher à mesure qu’elle avance."
---

On utilise ces outils tous les jours et, la plupart du temps, on ne sait pas
vraiment ce qu’il y a dedans. Ce n’est pas grave pour écrire un mail. Ça le
devient dès qu’il faut choisir un modèle, estimer un coût, expliquer à un client
pourquoi la réponse est fausse, ou décider si on met ça en production.

Cette fiche ouvre [le dossier IA](/drafts/l-ia-vue-depuis-la-prod) et pose le
vocabulaire utilisé dans toutes les suivantes. Elle ne contient aucune
mathématique et aucune métaphore du cerveau.

---

## Un LLM prédit le fragment suivant, et rien d’autre

Un **grand modèle de langage** (_large language model_, LLM) est un programme
qui répond toujours à la même question, quelle que soit la vôtre :

> Compte tenu de tout le texte que je viens de lire, quel est le fragment de
> texte le plus probable ensuite ?

Il calcule une probabilité pour un très grand nombre de suites possibles, en
choisit une, l’ajoute au texte, **puis recommence depuis le début** avec ce
texte allongé d’un fragment. Un paragraphe de réponse, c’est cette opération
répétée quelques centaines de fois.

<br>

Rien d’autre ne se passe. Le modèle ne comprend pas votre question, ne consulte
aucune base de données et ne réfléchit pas avant de commencer sa phrase. Il n’a
même pas de plan : quand il écrit le premier mot d’une réponse, le dernier
n’existe pas encore.

<br>

**C’est déjà l’essentiel de ce qu’il faut retenir.** Presque tous les
comportements surprenants d’un LLM se déduisent de cette seule phrase, y compris
ceux qu’on prend pour des défauts, et on va les dérouler un par un.

---

## Un token n’est pas un mot

Le modèle ne manipule ni des lettres ni des mots, mais des **tokens** : des
fragments de texte issus d’un découpage statistique appris sur son corpus. Les
morceaux fréquents deviennent un seul token, les rares sont découpés en
plusieurs.

<br>

Concrètement, et en ordre de grandeur :

- un mot courant et fréquent tient souvent en **un seul token** ;
- un mot long, rare ou accentué en prend **deux ou trois** ;
- la ponctuation, les espaces et les sauts de ligne **comptent** ;
- un texte en français consomme **plus de tokens** que le même texte en anglais,
  parce que les corpus d’entraînement sont massivement anglophones — le
  découpage est donc optimisé pour l’anglais ;
- du code source, avec son indentation et ses symboles, en consomme encore plus.

<br>

Retenez surtout ceci : **le token est l’unité facturée**. Pas le mot, pas le
caractère, pas la requête. Tout ce que vous envoyez et tout ce que le modèle
répond est compté en tokens, à l’entrée comme à la sortie, et généralement à des
tarifs différents. C’est le sujet entier de la prochaine fiche, alors on ne fait
que poser le mot ici.

---

## Entraîner et utiliser sont deux métiers différents

La confusion la plus fréquente, et la plus coûteuse en réunion.

<br>

**L’entraînement** est la phase où le modèle est construit. On lui fait lire un
corpus gigantesque et on ajuste, des milliards de fois, des paramètres internes
appelés **poids** pour qu’il prédise de mieux en mieux la suite d’un texte. Ça
dure des semaines, ça mobilise des milliers de processeurs graphiques, ça coûte
une somme qui ne concerne que quelques entreprises au monde. À la fin, on
obtient un fichier de poids : le modèle.

<br>

**L’inférence** est la phase où on s’en sert. Les poids ne bougent plus. Vous
envoyez du texte, le modèle calcule, il répond. C’est rapide, c’est répétable,
c’est facturé à l’usage.

<br>

Si l’analogie cloud vous parle : l’entraînement, c’est construire la centrale
électrique ; l’inférence, c’est payer votre électricité au compteur. En tant que
développeur, **vous ne ferez jamais que de l’inférence**, sauf cas très
particulier.

<br>

Une conséquence pratique passe souvent à la trappe : les poids ne changent pas
quand vous utilisez le modèle. **Rien de ce que vous envoyez n’est appris.** Un
modèle ne « retient » pas votre code, ne s’améliore pas parce que vous l’avez
corrigé, et ne connaît rien de ce qui s’est passé après la fin de son
entraînement. Ce que les fournisseurs font de vos données par ailleurs est une
autre question, contractuelle celle-là, et qui mérite d’être lue.

---

## Le modèle n’a aucune mémoire

C’est le point le plus contre-intuitif, et celui qui explique le plus de choses.

<br>

**Entre deux appels, un modèle ne se souvient de rien.** Chaque requête part
d’une page blanche. Si une application semble se souvenir de votre conversation,
c’est qu’elle vous renvoie l’historique : à chaque nouveau message, elle
réexpédie au modèle les instructions de départ, tous les échanges précédents et
votre nouvelle question. Le modèle relit tout, à chaque fois.

<br>

Ce paquet de texte s’appelle le **contexte**, et il a une taille maximale — la
_fenêtre de contexte_. Trois conséquences qu’on rencontre toutes en production :

- **une conversation coûte de plus en plus cher à mesure qu’elle avance**,
  puisqu’on repaie l’historique entier à chaque tour ;
- **au-delà de la fenêtre, quelque chose est jeté** — généralement le début, ce
  qui donne cette impression désagréable que le modèle « oublie » ce qu’on lui a
  dit au bout de vingt minutes ;
- **une fenêtre très grande n’est pas gratuite** : elle est facturée, et la
  qualité des réponses ne s’améliore pas linéairement avec la quantité de texte
  qu’on y entasse. Un contexte bien rangé vaut mieux qu’un contexte plein.

<br>

Tenez ce point : c’est lui qu’on retrouvera dans
[la fiche sur les agents](/drafts/comprendre-les-agents-ia), où une boucle
d’outils fait grossir le contexte à chaque tour.

---

## Pourquoi ça hallucine, et pourquoi ça ne se corrigera pas

Un modèle produit parfois, avec le plus grand aplomb, une réponse entièrement
fausse : une fonction qui n’existe pas, une référence bibliographique inventée,
une date plausible et erronée. On appelle ça une **hallucination**, et le mot
est trompeur parce qu’il suggère un accident.

<br>

Il n’y a pas d’accident. Reprenez la phrase du début : le modèle produit la
suite **la plus probable**, pas la plus vraie. Il n’a aucune notion de vrai ou
de faux, seulement une notion de plausible.

<br>

Or une référence inventée a exactement la même forme qu’une vraie : un nom
d’auteur crédible, un titre crédible, une année crédible. **Rien, dans le
mécanisme de prédiction, ne permet de les distinguer** — et le modèle n’affiche
aucune hésitation, parce qu’une phrase hésitante serait, elle aussi, simplement
une suite de tokens.

<br>

On réduit le phénomène, on ne le supprime pas. En donnant au modèle la
documentation dans le contexte plutôt qu’en comptant sur sa mémoire. En lui
donnant des outils pour aller chercher l’information au lieu de la deviner. En
vérifiant systématiquement ce qui est vérifiable.

<br>

D’où la règle de terrain, qui vaut pour tout ce dossier : **ne posez jamais une
question dont vous ne pouvez pas contrôler la réponse.** Un LLM est un excellent
outil quand la vérification est rapide — du code qu’on exécute, un texte qu’on
relit, une piste qu’on creuse. Il est dangereux exactement là où la vérification
coûte cher.

---

## Modèle, API et produit sont trois choses différentes

Trois mots qu’on emploie l’un pour l’autre, alors qu’ils ne désignent pas du
tout la même chose. La distinction devient utile au moment de comparer deux
offres ou de reproduire un résultat.

<br>

| Ce dont on parle | Ce que c’est                              | Ce qui change d’un jour à l’autre            |
| ---------------- | ----------------------------------------- | -------------------------------------------- |
| **Le modèle**    | Un fichier de poids, figé, versionné      | Rien, tant que vous épinglez sa version      |
| **L’API**        | L’accès facturé à ce modèle               | Les tarifs, les quotas, les versions servies |
| **Le produit**   | L’interface, ses instructions, ses outils | À peu près tout, sans préavis                |

<br>

Une bonne partie des désaccords sur « le modèle est devenu moins bon » porte en
réalité sur le produit : des instructions système modifiées, un outil ajouté, un
comportement ajusté. Le modèle, lui, n’a pas bougé d’un poids.

<br>

Pour un développeur, la conséquence est concrète : **en production, épinglez une
version de modèle.** C’est exactement le réflexe qu’on a déjà avec une image
Docker, et pour les mêmes raisons — voyez
[la fiche sur les registries](/fiches/presentation-registry-docker) si le
parallèle vous intéresse. Un `latest` qui change tout seul, en IA comme
ailleurs, c’est une régression qu’on découvre un lundi matin.

---

## Astuce bonus - deux appels identiques, deux réponses différentes

Vous envoyez deux fois exactement la même requête et vous obtenez deux réponses
différentes. Ce n’est pas un défaut, c’est un réglage.

<br>

À chaque étape, le modèle dispose d’une liste de suites possibles avec leurs
probabilités. Plutôt que de toujours prendre la plus probable — ce qui produit
un texte correct mais très plat — il en **tire une au hasard**, en respectant
ces probabilités. Le paramètre qui pilote la brutalité de ce tirage s’appelle
souvent la **température** : basse, le modèle joue la sécurité ; haute, il ose
des suites improbables, pour le meilleur et pour le pire.

<br>

Ce qu’il faut en faire, en pratique :

- **pour du code, de l’extraction de données ou de la classification**,
  descendez la température au minimum : vous voulez la réponse la plus probable,
  pas la plus créative ;
- **pour du texte**, laissez-la plus haute, sinon c’est illisible ;
- **pour vos tests automatisés**, ne testez jamais l’égalité stricte d’une
  réponse de modèle. Même à température nulle, rien ne vous garantit un résultat
  identique d’un appel à l’autre. Testez la forme, le schéma, la présence des
  champs attendus — pas la chaîne de caractères.

<hr>

Voilà, la boîte est ouverte. Pour résumer en une phrase : **un LLM prédit le
fragment suivant à partir de tout ce qu’on lui donne, sans mémoire entre deux
appels et sans notion de vérité — et tout ce qui vous surprendra ensuite se
déduit de ces trois points.**

Dans la prochaine fiche, on s’attaque à la question que ce dossier a promis de
traiter sérieusement : **tokens, contexte et coût**, ou comment estimer une
facture avant d’avoir écrit une ligne de code.

D’ici là, je vous invite :

- à relire [la porte d’entrée du dossier](/drafts/l-ia-vue-depuis-la-prod), si
  vous voulez savoir où tout ça nous emmène ;
- à jeter un œil à
  [mes trois articles sur l’usage de l’IA](/articles/profils-ia-developpeur),
  qui posaient les mêmes questions par l’autre bout.

## Ressources

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762) — l’article de
  2017 qui introduit l’architecture transformer, à la base de tous les modèles
  actuels.
- [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)
  — la même chose, en images, pour qui veut aller voir sous le capot.
- [Le cours de NLP de Hugging Face](https://huggingface.co/learn/nlp-course) —
  gratuit, en ligne, et la meilleure porte d’entrée pratique que je connaisse.
