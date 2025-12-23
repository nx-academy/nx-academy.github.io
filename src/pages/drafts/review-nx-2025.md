---
layout: ../../layouts/BlogPostLayout.astro

title: Bilan de l'année 2025
description: 

imgAlt: Des personnes faisant une réunion dans une salle, pixel art
imgSrc: /images/articles/reunion-point.webp

kind: Articles
author: Thomas
draft: false
publishedDate: 01/01/2026
---

# Bilan de l'année 2025 de NX

![Des personnes faisant une réunion dans une salle, pixel art](/images/articles/reunion-point.webp)


## Introduction

- Comme pour l'année dernière, j'ai décidé de profiter des fetes de fin d'année
  pour dresser le bilan de NX en 2025. C'est un exercice auquel je vais essayer
  de me plier tous les ans, non seulement parce que je pense que c'est
  intéressant pour mes quelques lecteurs que pour moi-meme.

- Avant de rentrer dans le detail, je tiens à dire que je suis particulièrement
  content de mon travail sur NX en 2025. J'ai tendance à etre assez exigeant
  avec moi-meme et c'est assez rare que je sois pleinement satisfait. Cela ne
  veut pas dire que je suis content de tout ce que j'ai fait sur NX en 2025
  mais il n'empeche : j'ai bien bossé cette année !

- En reprenant l'article de l'année dernière, j'ai meme été surpris de
  certaines fonctionnalités que j'avais planifie et que j'allais totalement
  occulte (je pense aux quiz).

- Sans tarder, on peut aller dans les details !


## Deux cours ont été publiés sur la plateforme : Docker et CI/CD.

- J'avais prévu de sortir initialement un cours en 2025 : le cours sur Docker
  et docker-compose. Pour info, vous pouvez le trouver
  [ici](/cours/docker-et-docker-compose). Au final, j'ai été capable d'en
  sortir deux. Je ne pensep pas avoir été très bon niveau communication : je
  pense que j'aurais du en parler un peu plus sur les reseaux, notamment sur
  LinkedIn. Cela dit, je les ai quand meme sorti.

- C'etait des cours qui étaient déjà présents sur la version 1 de NX
  (Teachable). Cela dit, j'ai du fait un travail assez important coté code en
  créant notamment un Layout adapté à la landing page des cours. Autrement dit,
  il m'a fallu crée (designé et codé) une page de cours visuellement sympa et
  réutilisable coté code. Pour etre honnete, et sans vouloir me jeter trop de
  fleurs, je la trouve plutot pas mal.

- Pour info, j'ai aussi sorti 5 fiches dédiées servant de complément à ces
  cours. Ces fiches se retrouvent d'ailleurs sur la page d'accueil de chacun
  des cours (et ce manière quasiment automatisé).


## La fonctionnalité des quiz est sorti

- Pour etre honnete, j'avais totalement zappé que j'avais prévu de sortir cette
  fonctionnalité en 2025. Alors qu'honnetement, cette fonctionnalité fonctionne
  très bien et est très dans l'esprit du web en 2025.

- Elle m'a demandé de mettre en place un système de RAG (du Document based RAG)
  pour etre précis qui va aller lire mon site. J'ai donc mis en place un agent
  IA (vous pouvez le retrouver sur ce repository). Cet agent lit le contenu de
  ma fiche technique, puis génère des questions et des réponses au format JSON.
  Je prends ce JSON et je crée automatiquement une PR sur mon repository. Je
  réalise ensuite une relecture de mon cote avant de merger le code. 

- C'est l'une des premières fonctionnalités qui utilisent l'IA sur NX ; j'en ai
  d'autres depuis. Ca fait des mois que je dois faire un article de blog
  dessus. C'est clairement l'un des points que je dois améliorer. On y viendra
  dans les plans pour 2026.


## Le Recap a été lancé

- On continue dans les taches semi-automatisées avec de l'IA. Je les ai lancé
  en avril 2025. Je n'ai pas pensé à le lancer depuis deux mois (j'ai commencé
  un nouveau travail : j'y reviendrais plus tard). Cela dit, ce workflow
  semi-automatisé fonctionne très bien.

- Via un bot discord que j'ai codé, et qui me fait office de back office, je
  vais coller 4 articles que j'ai repéré dans le mois. Ce bot va ensuite
  envoyer l'URL de l'article aux APIs de GPT où ils vont être scrappés, puis
  résumé. Une fois résumé, je crée une PR sur mon repo que je relis de mon cote
  avant de la mettre en prod.

- J'ai fait pas mal de taches via de l'IA de ce type en 2025 et pour être, ca a
  été l'un des trucs les plus excitant qui m'a été donné de réaliser depuis
  longtemps.


## Le Feed a été lancé

- C'est l'une de mes plus grosses fièrtés de cette année ! Je n'avais pas
  forcément prévu de le faire mais c'est en prod et je m'en suis déjà servi
  plusieurs.

- Pour faire simple, le principe du Feed est de pouvoir créer des news
  rapidement depuis mon back office et de les mettre en prod, là encore
  rapidement. Chaque news feed contient un titre, un résumé et un lien.

- Pour créer une news, je passe par mon back office sur Discord, je génère une
  news via GPT et je lance ensuite une commande pour créer une news. Une fois
  les informations de cette news rentrées sur Discord, je vais insérer la
  donnée dans une base de données TursoDB puis regener un build de mon app pour
  pouvoir l'utiliser cote Astro. J'irais plus dans le detail dans l'article que
  je vais prendre le temps d'écrire durant les fetes.

- Bon, par contre, je l'ai mise en prod mais je n'ai pas pris le temps encore
  de faire un article dessus sur le site. Vous l'aurez compris, c'est
  clairement l'une des choses que je vais tenter d'améliorer pour 2026.

---

**Au final** :
- 2 cours ont été publiés
- 5 fiches techniques ont été publiés
- 9 articles ont été publiés
- 12 quiz ont été crées.
- 7 news feed ont été mises en ligne.

**transition** : NX se transforme petit à petit en media specialisé.

**Vous pouvez suivre les évolutions de NX via le changelog, que j'ai aussi
lancé cette anneé**.

J'avais initialement prévu de faire un article qui comprend à la fois 2025 et
2026. Cela dit, devant le contenu de l'année de 2025, je vais prendre le temps
d'écrire un article dédié à 2026 ! 

On se retrouve l'année prochaine.

Thomas


