---
layout: ../../layouts/BlogPostLayout.astro

title: On fait le bilan ?
description: Je (Thomas) prends le temps de revenir sur l'année 2024 et je vous parle un peu de ce que j'ai prévu pour l'année 2025 sur NX.

imgAlt: Des personnes faisant une réunion dans une salle, pixel art
imgSrc: /reunion-point.webp

kind: Articles
author: Thomas
draft: false
publishedDate: 01/25/2025

---

# On fait le bilan ?

![Des personnes faisant une réunion dans une salle, pixel art](/reunion-point.webp)

Bonne année 2025 à toutes et à tous ! Oui, je sais, on est déjà à la fin du mois de janvier, mais comme on dit : *il n’est jamais trop tard pour bien faire*. Et quoi de mieux que ce début d’année pour prendre un peu de recul, faire le point sur 2024 et partager avec vous ce qui est prévu pour NX en 2025 ?

En plus, je viens tout juste de mettre à jour Astro de la version 4 à la version 5. Ça m’a donné un petit coup de motivation supplémentaire pour prendre un moment et écrire cet article. Alors, asseyez-vous confortablement : c’est parti pour un bilan et quelques perspectives excitantes pour l’année à venir !

---

## Il s'est passé quoi en 2024 ?

### Un nouveau site

L'année 2024 a été marqué par la fermeture de beta.nx.academy. Ce site était propulsé par Teachable. Si cette solution proposait des fonctionnalités intéressantes, elle avait aussi son lot de contraintes. Son coût, assez élevé, pesait dans la balance. Les gains en termes de SEO et d’identité graphique n’étaient aussi pas à la hauteur de mes attentes. Il était donc temps de tourner la page et de chercher une solution plus adaptée.


C’est ainsi qu’est née la nouvelle version de nx.academy, cette fois développée avec Astro. Depuis son lancement, je suis très satisfait de ce framework. L'expérience de développement avec Astro est fluide, agréable. Elle me permet d’avoir un contrôle bien plus précis sur le site. À ce jour, je ne regrette absolument pas ce choix. Je n'ai pas encore vraiment vu les limites de ce framework (comprendre : il y a forcément des limites). Je verrais cela au fur et à mesure.


Cela dit, je suis conscient que le site est encore loin d’être complet. De nombreuses fonctionnalités manquent pour en faire une vraie plateforme de cours en ligne. Pour le moment, il s'apparente plus à un blog (ce qui est pas mal en soi mais un peu éloigné de ce que je souhaite). Mais comme le dit si bien l’adage : *qui va doucement va sûrement*.


### De nouveaux contributeurs

L’année 2024 a également été marquée par l’arrivée de nouveaux contributeurs sur NX Academy : [Lionel](https://github.com/Escanor1986), [Oumar](https://github.com/OumarYanni) et [Yacine](https://github.com/yaswecan). **Un immense merci à eux pour leur aide précieuse et leur participation**. Chacun apporte son propre style d’écriture et ses intérêts. C’est vraiment motivant de ne plus être seul à faire vivre NX et de voir d’autres voix s’exprimer sur la plateforme.


Bien sûr, il reste encore des ajustements à faire pour que la partie "contribution" soit complètement rodée, mais je tire beaucoup de positif de cette expérience. Lionel, Oumar et Yacine ont rapidement pris en main la création d’articles, et cela sans trop de difficultés, ce qui est une belle réussite.

Pour 2025, j’aimerais voir avec eux s’ils souhaitent continuer à contribuer. Je pense également qu’il y a des pistes d’évolution à explorer sur les formats d’articles. Mais comme toujours : un pas à la fois. En attendant, je tiens à les remercier chaleureusement une fois de plus pour leur implication et leur créativité.


### Un manque flagrant de temps

Si je devais résumer l'année 2024 en un mot, ce serait probablement : **manque de temps**. NX n’a pas avancé autant que je l’aurais souhaité. Cela s’explique en grande partie par mon emploi du temps chargé. Depuis un peu plus d’un an, j’ai pris un poste d’enseignant en informatique. C'est un travail que j’apprécie énormément. Mais ce poste me prend un tout petit peu plus de temps que je ne l’avais imaginé au départ.

Le site, par conséquent, tourne un peu au ralenti. Mais loin de me décourager, je prends mon mal en patience et j'en profite pour m'améliorer. J’ai commencé à mieux réfléchir à mon organisation. L'idée est de trouver des moyens de gérer mon temps de manière plus efficace. J’ai d'ailleurs déjà quelques pistes pour 2025 afin d’améliorer cet équilibre et continuer à faire avancer NX.

---

## Quelles nouveautés prévues sur NX en 2025 ?

### Intégrer les cours de l'ancienne plateforme (et tant pis si c'est pas parfait)

L’une de mes priorités absolues pour 2025 est d’intégrer les cours de l’ancienne version du site à la nouvelle. Ces contenus, que j’avais pris soin de rédiger sur la première plateforme, méritent une seconde vie. J'ai reçu des mails de personnes intéressées pour suivre mon cours sur Docker par exemple. Avec le recul que j’ai maintenant sur Astro, je suis assez confiant quant à la manière de m’y prendre.

Je suis également conscient que tout ne sera pas parfait dès le départ. C’est un point sur lequel je travaille : accepter qu’un premier jet imparfait est mieux que rien. Ce sera une base sur laquelle je pourrai itérer et apporter des améliorations au fil du temps. 

Une fois ces cours intégrés, je pourrai enfin me pencher sur les nouveaux contenus qui patientent quelque part dans les méandres de mon Google Drive. Ce sera l’occasion de faire un tri et de leur donner une place sur NX, étape par étape.


### Sortir la fonctionnalité des quiz

Parmi les fonctionnalités prioritaires pour 2025, les quiz occupent une place de choix. J’ai commencé à travailler dessus cet été, mais faute de temps, je n’ai pas pu avancer autant que je l’aurais souhaité. Cela dit, ils restent en haut de ma liste et je suis déterminé à les finaliser dans les mois à venir.

Les quiz seront intégrés avec React, en s’appuyant sur le concept d’islands d’Astro. Pour ceux qui ne connaissent pas, Astro permet une hydratation partielle, c’est-à-dire que seules les parties interactives du site, comme les quiz, sont alimentées par du React. Cela allège considérablement les performances tout en offrant une expérience utilisateur fluide.

Aujourd’hui, le système de quiz est fonctionnel dans ses grandes lignes. Ce qui reste à faire, c’est ajouter un système de points et finaliser le design. Cela va me demander de me replonger dans Figma pour apporter une touche visuelle cohérente et soignée. Une fois ces étapes terminées, cette fonctionnalité pourra enfin voir le jour sur NX !


### Cap sur les maths et la data science

Comme beaucoup de développeurs, j’ai été surpris et impressionné par l’essor de l’IA en 2023. Depuis, j’ai intégré l’IA dans mon quotidien : elle m’aide à coder, à préparer des séquences pédagogiques et à concevoir des exercices. Ces outils ont changé très fortement ma manière de travailler.

En novembre dernier, j’ai décidé de franchir un cap et de me former à la data science et au machine learning. Pour l’instant, mon apprentissage se concentre principalement sur les bases mathématiques indispensables : algèbre linéaire, statistiques et probabilités. Ce sont des sujets complexes (mais ultra intéressant). Ils me permettent de mieux comprendre les rouages.

Le plus intéressant, c’est que cet apprentissage m’inspire déjà pour la création de contenus. Je vois émerger pas mal d’idées pour de nouveaux articles et fiches techniques, cette fois axés sur les mathématiques. Une belle manière de combiner ma passion pour le partage de connaissances et mon envie de progresser dans ce domaine. Ce qui me mène tout naturellement au dernier point de cette section !


### Un trello pour les gouverner tous

Je suis de plus en plus conscient du besoin d’une meilleure organisation, aussi bien en interne qu’en externe. Ces derniers mois, j’ai reçu plusieurs mails de personnes m’encourageant à continuer le projet. Ces messages m’ont beaucoup touché, car ils me rappellent que NX a du potentiel et qu’il est attendu. Je tiens à préciser que je n’ai jamais eu l’intention d’abandonner NX : mon véritable obstacle reste, comme souvent, le manque de temps.

Pour répondre à ce besoin, je vais m’atteler à mettre en place un outil de suivi, que ce soit un Trello ou peut-être un GitHub Project. L’idée est de créer une feuille de route claire et réaliste, regroupant les articles et les cours à venir. Je souhaite que cet outil soit accessible à toutes et à tous. Ainsi, vous pourrez suivre plus précisément l’évolution de NX et voir où en est chaque projet.


---


Un grand merci pour votre soutien tout au long de cette aventure avec NX.

On se retrouve très bientôt avec un nouvel article (allez, cette fois, on y croit vraiment !). En attendant, prenez soin de vous et surtout… codez bien !


<br>
<span class="author">Thomas</span>
