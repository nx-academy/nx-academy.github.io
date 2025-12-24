---
layout: ../../layouts/BlogPostLayout.astro

title: "Bilan 2025 de NX Academy = du contenus, de l'IA et de l'automatisation"
description:
  "Bilan de l’année 2025 de NX : cours Docker et CI/CD, quiz générés par IA,
  recap automatisé, feed de veille et évolution de la plateforme."

imgAlt: Des personnes faisant une réunion dans une salle, pixel art
imgSrc: /images/articles/reunion-point.webp

kind: Articles
author: Thomas
draft: false
publishedDate: 01/01/2026
---

# Bilan de l'année 2025 de NX

![Des personnes faisant une réunion dans une salle, pixel art](/images/articles/reunion-point.webp)

Comme l’année dernière, j’ai décidé de profiter des fêtes de fin d’année pour
dresser le bilan de NX en 2025. C’est un exercice auquel je vais essayer de me
plier tous les ans. A la fois parce que je pense que ça peut être intéressant
pour les quelques personnes qui suivent NX (mais si, vous êtes des milliers, je
le sais) mais aussi parce que ça m’aide moi-même à prendre du recul.

Avant d’entrer dans le détail, je tiens à dire une chose : je suis
particulièrement content du travail réalisé sur NX en 2025. J’ai tendance à être
assez exigeant avec moi-même et c’est assez rare que je sois pleinement
satisfait. Ça ne veut pas dire que tout est parfait (loin de là) mais,
objectivement, j’ai bien bossé cette année.

En relisant l’article de l’année dernière, j’ai même été surpris de retrouver
certaines fonctionnalités que j’avais prévues… et totalement oubliées
entre-temps (je pense notamment aux quiz).

Sans tarder, entrons dans le détail.

## Deux cours ont été publiés sur la plateforme : Docker et CI/CD.

À l’origine, j’avais prévu de sortir un seul cours en 2025 : le cours sur Docker
et docker-compose. Il est disponible [ici](/cours/docker-et-docker-compose). Au
final, j’ai réussi à en sortir [deux](/cours).

Je n’ai probablement pas été très bon côté communication : j’aurais clairement
dû en parler davantage sur les réseaux, notamment sur LinkedIn mais l’essentiel
est là. Les cours sont sortis.

Ces contenus existaient déjà sur la version 1 de NX (hébergée à l’époque sur
Teachable) mais ils ont nécessité un vrai travail côté code. J’ai notamment créé
un layout dédié aux pages de cours : design, intégration, réutilisabilité… bref,
une vraie landing page de cours, pensée pour durer. Sans vouloir trop me jeter
des fleurs, je suis plutôt content du résultat.

À noter également : j’ai publié 5 fiches techniques complémentaires à ces cours.
Elles sont d’ailleurs automatiquement mises en avant sur les pages d’accueil des
cours concernés, ce qui était un objectif important pour moi.


---


## La fonctionnalité des quiz est sorti

Pour être honnête, j’avais totalement oublié que j’avais prévu de sortir cette
fonctionnalité en 2025. Et pourtant, avec le recul, elle fonctionne très bien et
correspond assez bien à l’esprit du web en 2025.

Sa mise en place m’a demandé de travailler sur un système de RAG et plus
précisément du document-based RAG. J’ai donc développé un agent IA qui va lire
le contenu d’une fiche technique, générer automatiquement des questions et
réponses au format JSON, puis créer une pull request sur le repository de NX. De
mon côté, je relis, j’ajuste si besoin, puis je merge.

C’est l’une des premières fonctionnalités de NX à utiliser de l’IA de manière
assez poussée. Depuis, d’autres ont suivi. Ça fait des mois que je me dis qu’il
faudrait que j’écrive un article détaillé sur le sujet. Clairement, c’est un
point que je dois améliorer et j’y reviendrai dans les plans pour 2026.


---


## Le Recap a été lancé

On continue dans la lignée des tâches semi-automatisées avec de l’IA. Le Recap a
été lancé en avril 2025. Je n’ai pas pensé à le publier ces deux derniers mois —
j’ai changé de travail entre-temps, j’y reviendrai plus tard — mais le workflow
fonctionne très bien.

Concrètement, via un bot Discord que j’ai développé (et qui me sert de
back-office), je colle chaque mois quatre articles que j’ai repérés. Le bot
envoie ensuite les URLs aux APIs de GPT : les articles sont analysés, puis
résumés. Une fois le recap généré, une PR est automatiquement créée sur le
repository. Je relis, j’ajuste si nécessaire puis je mets en production.

J’ai mis en place pas mal de workflows de ce type en 2025, et, pour être
honnête, c’est probablement l’une des choses les plus excitantes que j’ai eu
l’occasion de construire depuis longtemps.


---


## Le Feed a été lancé

C’est sans doute l’une de mes plus grosses fiertés de l’année. Ce n’était pas
forcément prévu au départ, mais le Feed est aujourd’hui en production et je m’en
suis déjà servi plusieurs fois.

L’idée est simple : pouvoir créer et publier des brèves rapidement. Chaque news
du Feed contient un titre, un résumé et un lien vers la source.

Là encore, tout passe par mon back-office Discord. Je génère une news via GPT,
je valide les informations, puis une commande permet d’insérer la donnée dans
une base TursoDB avant de relancer un build de l’application pour l’exploiter
côté Astro. Je prendrai le temps de détailler tout ça dans un article dédié que
je compte écrire pendant les fêtes.

Évidemment, comme souvent, j’ai mis la fonctionnalité en production… sans encore
avoir écrit l’article qui va avec. Vous l’aurez compris : c’est clairement l’un
des axes d’amélioration pour 2026.

---

## L'année 2025 en quelques chiffres

Sur l’année 2025, NX, c’est :

- 2 cours publiés ;
- 5 fiches techniques publiées ;
- 9 articles publiés ;
- 12 quiz créés ;
- 7 news du Feed mises en ligne.

<br>

Petit à petit, NX est en train de se transformer en un média spécialisé, au-delà
d’une simple plateforme de cours. Je ne sais pas si ça marchera ou pas ou si c'est une bonne chose mais en tout cas, ça me ressemble :).
Vous pouvez suivre l’évolution du projet via le changelog que j’ai également lancé cette année.

J’avais initialement prévu de faire un article couvrant à la fois 2025 et 2026.
Vu la densité de cette année, je préfère finalement prendre le temps d’écrire un
article dédié à ce qui arrive en 2026.

On se retrouve l’année prochaine.

<br>
<span class="author">Thomas</span>
