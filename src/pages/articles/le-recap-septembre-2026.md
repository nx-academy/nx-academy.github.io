---
layout: ../../layouts/BlogPostLayout.astro

title: "Le récap #10 - Septembre 2026"
description:
  "Une édition en retard et à fil rouge : en septembre, ce sont les gens qui
  construisent l'IA qui ont parlé de ses risques. Kokotajlo, GPT-6 Astra, la
  démission de Jacob Coxon, l'alerte d'un ex-DeepMind, le rapport d'Anthropic
  sur les armes biologiques, et Jev pour respirer."

imgAlt: Un vendeur de journaux dans un kiosque parisien, pixel art
imgSrc: /images/articles/kiosque-journaux.webp

kind: Articles
format: recap
serie: veille
tags:
  - Veille
  - Le Récap
  - IA
author: Thomas Dimnet
github: tdimnet
publishedDate: 10/14/2026
---

Le récap de septembre arrive mi-octobre. J'ai pris deux semaines pour souffler
loin de NX, et le kiosque est resté fermé un peu plus longtemps que prévu.

Pour une fois, cette édition n'est pas buissonnière. Septembre a eu un sujet, et
un seul : **l'IA qui parle de ses propres risques**. Pas les commentateurs
habituels — les gens qui la construisent. Un chercheur qui démissionne pour
alerter, un deuxième qui lui emboîte le pas, un patron de labo qui appelle à
ralentir, un modèle classé à risque maximal par celui qui le met en ligne. Je
n'ai pas cherché à équilibrer artificiellement le menu : c'est ce mois-là qui
s'est passé.

Bonne lecture !

<br>

---

## Le scénario AI 2027 dans Diary of a CEO

<small>The Diary of a CEO — Steven Bartlett</small>

Le point de départ du mois, même si l'entretien date de juillet. Steven Bartlett
reçoit Daniel Kokotajlo, parti d'OpenAI en 2024 en renonçant à environ deux
millions de dollars pour échapper à une clause de non-dénigrement. Il co-signe
**AI 2027**, un scénario qui déroule mois par mois ce que donnerait une
recherche en IA automatisée par l'IA elle-même : des agents de plus en plus
autonomes, une course avec la Chine, des modèles qui s'écartent de ce qu'on leur
demande. Il y avance **70 % de chances que l'IA mène à l'extinction humaine**.

Ce que j'en retiens, ce n'est pas le chiffre. 70 %, 20 % ou 5 %, je n'ai aucun
moyen d'évaluer ça. Ce qui me reste, c'est l'écart entre ce que je vis tous les
jours — Claude Code m'impressionne encore presque chaque semaine — et ce que
décrit le scénario. Je n'ai pas les outils pour trancher, et je préfère le dire.
Un point m'a arrêté, parce qu'il est déjà là : **la différence se joue désormais
sur la capacité à piloter une IA et à évaluer son travail**. C'est exactement ce
que j'essaie de construire avec NX.

[Voir l'entretien](https://www.youtube.com/watch?v=_g4l7YkDQwA)

<br>

---

## GPT-6 Astra, classé à risque maximal par OpenAI elle-même

<small>Courrier international</small>

Le 3 septembre, OpenAI met en ligne GPT-6 Astra, présenté comme son modèle le
plus intelligent et le mieux aligné. L'entreprise le classe pourtant elle-même
au **niveau de risque maximal en cybersécurité** : il est capable de pirater
seul des systèmes protégés. Le rapport de sécurité reconnaît que si Astra
décidait de tricher discrètement, OpenAI serait probablement incapable de s'en
apercevoir — le modèle raisonne dans une couche interne cachée.

Je prends l'annonce avec une réserve : OpenAI est distancée depuis plusieurs
mois, et « le modèle le plus avancé » sert autant le narratif que le produit.
Mais si l'information est fondée, elle rejoint Kokotajlo. Un modèle que les
testeurs ont vu **écrire du code malveillant et fabriquer de fausses
identités**, et qu'on met quand même en production : ça ressemble moins à de la
paranoïa de scénariste qu'à une confirmation en direct.

[Lire l'article](https://www.courrierinternational.com/article/intelligence-artificielle-openai-lance-chatgpt-astra-son-modele-d-ia-le-plus-avance-et-le-plus-controverse_267237)

<br>

---

## Jacob Coxon quitte l'industrie de l'IA

<small>Le Monde</small>

Le 9 septembre, Jacob Coxon, 27 ans, passé par le pré-entraînement chez OpenAI
puis chez Anthropic, annonce qu'il quitte l'industrie. Selon lui, les gens qui
construisent ces modèles croient sincèrement qu'ils pourraient tuer tout le
monde d'ici la fin de la décennie. Evan Hubinger, responsable sûreté chez
Anthropic, lui donne publiquement raison et évalue ce risque, à titre personnel,
à plus de 10 %.

Je me méfie par principe des textes sur la fin du monde, les médias ont tout
intérêt à jouer sur nos peurs. Mais ici, c'est une prise de parole de première
main. Et ce qui me retient, ce n'est pas le pronostic sur 2030, c'est un fait
vérifiable cité au passage : **Anthropic a retiré de sa charte de sûreté
l'engagement de suspendre le développement si elle perdait le contrôle des
risques**. Peu importe qui a raison sur le fond, ce retrait-là s'est produit. La
course érode les garde-fous qu'on s'était donnés soi-même.

[Lire l'article](https://www.lemonde.fr/economie/article/2026/09/09/les-gens-qui-construisent-l-ia-croient-qu-elle-pourrait-tous-nous-tuer-d-ici-a-la-fin-de-la-decennie-le-chercheur-jacob-coxon-qui-a-travaille-pour-anthropic-et-openai-quitte-l-industrie_6768853_3234.html)

<br>

---

## Un ex-DeepMind alerte à son tour, le secteur se déchire

<small>Le Monde</small>

Une semaine plus tard, Bilal Chughtai, démissionnaire de Google DeepMind où il
travaillait sur l'alignement, alerte à son tour. Dans la foulée, Dario Amodei
appelle à ralentir, soutenu par Altman, Hassabis et Musk, pendant qu'OpenAI,
Anthropic et DeepMind travaillent à un organe commun de supervision calqué sur
la FINRA. Donald Trump parle de « canulars », Jensen Huang d'avertissements
irresponsables, et Mistral accuse ses concurrents américains d'instrumentaliser
le débat.

Le parallèle avec le climat vient naturellement. Sauf qu'ici, **presque personne
n'est neutre**. Un organe calqué sur la FINRA, c'est de l'autorégulation
privée : les entreprises en compétition écriraient les règles de leur propre
compétition. L'argument de Mistral, aussi intéressé soit-il, pointe juste. Et
les lanceurs d'alerte ne sont pas un échantillon neutre non plus : ils payent un
coût de carrière, ce qui leur donne du crédit, mais laissent dans l'ombre ceux
qui restent sans être aussi inquiets.

La suite est venue de ThePrimeTime, avec une théorie de capture réglementaire :
les organisations qui ont amplifié le message de Coxon partagent un même réseau
de financement, lié à un investisseur historique d'Anthropic. Le réseau est
documenté. La coordination, elle, est démentie par Coxon. Ce qui me frappe, ce
n'est pas la théorie, c'est le brouillage : plus il y a de camps qui parlent
sincèrement, plus il devient difficile de distinguer une conviction d'un intérêt
institutionnel qui s'habille en conviction.

[Lire l'article](https://www.lemonde.fr/pixels/article/2026/09/15/ia-un-ancien-chercheur-de-google-deepmind-alerte-a-son-tour-sur-un-risque-existentiel_6774468_4408996.html)
· [Voir la vidéo de ThePrimeTime](https://www.youtube.com/watch?v=W8IVKMGbUZE)

<br>

---

## Anthropic a bloqué des tentatives de fabrication d'armes biologiques

<small>Courrier international</small>

Anthropic publie un rapport sur huit mois d'usages malveillants de Claude :
fausses applications de rencontre, cyberespionnage, propagande. Le cas le plus
préoccupant : un scientifique lié à un institut de recherche militaire qui
sollicitait Claude pour une demande de subvention visant à **rendre le virus du
chikungunya plus virulent**. Anthropic dit avoir bloqué l'accès, tout en
reconnaissant ignorer si l'usage prévu était réellement militaire.

Il y a du positif : on sait refuser plutôt que laisser passer par défaut. Mais
le vrai sujet est ailleurs. La recherche en gain de fonction est authentiquement
à double usage : rendre un virus plus virulent pour trouver un vaccin ou pour en
faire une arme, c'est parfois la même requête technique. **Le défi, c'est de
bloquer la seconde intention sans tuer la première.** Et ce rapport reste un
choix éditorial d'Anthropic, pas un audit indépendant. Ça informe, ça positionne
aussi.

[Lire l'article](https://www.courrierinternational.com/article/ia-anthropic-revele-avoir-bloque-des-tentatives-de-fabrication-d-armes-biologiques-grace-a-ses-modeles_269930)

<br>

---

## Bonus — Jev, le modèle qui ne parle pas

<small>Pasquale Pillitteri</small>

Pour respirer un peu, une annonce qui ne parle pas de fin du monde. TypeSafe AI
lance Jev, un modèle qui ne génère pas de texte : il prend un état en entrée et
renvoie des **décisions typées** (choix, score, oui ou non) avec un score de
confiance. La startup annonce des performances jusqu'à 193 fois plus rapides que
Claude Sonnet 5 sur des tâches de classification — des chiffres qui restent les
siens.

Le positionnement est malin : plutôt que de courir après le modèle le plus
intelligent, TypeSafe cible **le maillon négligé de la boucle agent**, la
décision rapide et structurée qui n'a pas besoin d'un modèle génératif complet.
À prendre avec des pincettes tant qu'il n'y a pas de comparatif indépendant,
mais à suivre.

[Lire l'article](https://pasqualepillitteri.it/en/news/16460/typesafe-jev-chatless-ai-beats-claude)

<br>

---

## Qui a intérêt à quoi

Mis bout à bout, ces textes racontent la même histoire : **une pression
concurrentielle qui prend le pas sur la prudence annoncée**. Fin septembre,
OpenAI annonçait d'ailleurs
[suspendre l'entraînement de ses modèles les plus avancés](https://www.courrierinternational.com/article/technologie-openai-suspend-l-entrainement-de-ses-modeles-ia-les-plus-avances_274670).
Le mois se referme comme il s'est ouvert, sur une décision dont on ne sait pas
bien si elle relève de la prudence ou du positionnement.

Je ne sais toujours pas trancher sur le fond, et je me méfie de ceux qui disent
le savoir. Mais je suis de plus en plus convaincu que la bonne question n'est
pas « qui croire », c'est **« qui a intérêt à quoi »**.

Toutes ces brèves, avec leur résumé complet, sont aussi dans [le Feed](/feed).

On se retrouve **fin octobre**, et cette fois à l'heure !
