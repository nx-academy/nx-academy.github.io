---
layout: ../../layouts/BlogPostLayout.astro

title: "Le récap #4 - Juillet 2025"
description: Découvrez les actus tech incontournables de juillet 2025.Nouveautés ECMAScript, impact de l’IA sur l’emploi, usages concrets de WebAssembly, IA et émotions humaines et une sélection des meilleurs claviers mécaniques pour développeurs. Une veille claire, experte et sans bullshit.

imgAlt: Un vendeur de journaux dans un kiosque parisien, pixel art
imgSrc: /images/articles/kiosque-journaux.webp

kind: Articles
author: Thomas
draft: false
publishedDate: 07/25/2025
---

# Le récap #4 - Juillet 2025

<img src="/images/articles/kiosque-journaux.webp" alt="Un vendeur de journaux dans un kiosque parisien, pixel art" style="aspect-ratio: 1792 / 1024; object-fit: cover; width: 100%; display: block; object-position: top" />

<br>

## ECMAScript 2025 : ce qui arrive bientôt en JavaScript

<small>Axel Rauschmayer</small>

Axel Rauschmayer passe en revue les fonctionnalités proposées pour ECMAScript 2025, et comme d’habitude, c’est à la fois ultra-technique et limpide. On y retrouve notamment :

- les **pinned properties** (`obj.#x`) pour éviter les collisions de clés ;
- les nouveaux attributs `deletable` et `fixed` pour contrôler la mutabilité des objets ;
- la gestion de `Symbol.dispose` pour le nettoyage automatique des ressources ;
- ou encore des raffinements sur les decorators, `Array.fromAsync()` et Module Blocks.

C’est dense, mais si vous voulez comprendre où va le langage JS en profondeur, c’est une lecture incontournable. À réserver à celles et ceux qui aiment lire des spécifications avec un café très serré.

[Lire l'article](https://2ality.com/2025/06/ecmascript-2025.html)

<br>

---

## L’IA bouleverse la recherche d’emploi jusque chez Indeed et Glassdoor

<small>Dan Patterson – CBS News</small>

Glassdoor et Indeed ont annoncé plusieurs centaines de licenciements, principalement dans leurs équipes produit et ingénierie. En cause ? L’arrivée de l’IA générative, qui transforme en profondeur la façon dont les utilisateurs recherchent et trouvent un emploi.

L’article revient sur l’impact croissant de l’IA dans les plateformes RH : recommandations personnalisées, réponses aux offres d’emploi générées automatiquement, tri automatisé des candidatures… Même les géants du secteur doivent **adapter leur modèle et réduire leurs effectifs humains**.

Une lecture intéressante pour prendre du recul sur la vague d’automatisation, et ses effets parfois contre-intuitifs : les entreprises qui "font" l’IA sont aussi les premières à en subir les conséquences.

[Lire l'article](https://www.cbsnews.com/news/indeed-glassdoor-layoffs-ai-job-search/)

<br>

---

## WebAssembly : oui, mais pour quoi faire ?

<small>Andy Wingo – ACM Queue</small>

Alors que WebAssembly fête ses 10 ans, Andy Wingo fait le point sur ce qui fonctionne réellement avec Wasm… et ce qui relève encore du fantasme. Il revient sur les promesses non tenues (le jeu vidéo, le remplacement de JavaScript), les cas d’usage qui marchent (Photoshop web, SQLite, Google Sheets avec WasmGC), et les nouveaux territoires d'exploration : plug-ins isolés, virtualisation légère et surtout le modèle de composants Wasm, soutenu par des géants du cloud comme Microsoft ou Fastly.

L’idée forte : Wasm est à son meilleur quand l’isolation fine est cruciale, mais qu’on veut éviter le poids des containers. À l'inverse, pour les interfaces utilisateur ou le développement web classique, JS/TS reste plus adapté.

Un article ultra complet, à la fois technique, stratégique et visionnaire, qui aide à mieux situer où Wasm est pertinent aujourd’hui — et où il pourrait l’être demain (edge computing, IoT, extensions, voire noyau Linux ?).

[Lire l'article](https://queue.acm.org/detail.cfm?id=3746171)

<br>

---

## Me confier à ChatGPT ne m’a pas isolée, cela m’a rendue plus humaine

<small>Jennifer Percy – The New York Times, traduit par Courrier international</small>

Dans cette chronique Modern Love, la journaliste Jennifer Percy raconte comment ses échanges avec ChatGPT sont devenus une forme de thérapie parallèle. En pleine rupture amoureuse, elle se surprend à s’ouvrir à l’IA, à lui poser des questions existentielles, et à recevoir en retour des réponses souvent plus douces et empathiques que celles des humains.

Loin des récits dystopiques habituels, l’article propose une réflexion intime et nuancée sur notre rapport à la machine : peut-on parler d’amitié ? L’illusion de relation suffit-elle à apaiser une solitude réelle ? Et surtout, qu’est-ce que cela dit de nous si une IA nous aide à nous sentir… plus humains ?

Une lecture touchante et dérangeante à la fois, qui pose de vraies questions sur le rôle des IA dans notre vie émotionnelle.

[Lire l'article](https://www.courrierinternational.com/article/modern-love-me-confier-a-chatgpt-ne-m-a-pas-isolee-cela-m-a-rendue-plus-humaine_232829)

<br>

---

## Bonus - Les meilleurs claviers mécaniques pour les développeurs

<small>Codecademy</small>

Un article léger mais efficace, qui passe en revue 8 claviers mécaniques pensés pour les développeurs : du Keychron K8 au Das Keyboard 4, en passant par le Moonlander ou encore le vénérable HHKB. Chaque clavier est présenté avec ses points forts (switches, ergonomie, connectivité…) et son public cible : mobile, typiste exigeant, amateur de custom…

Si vous hésitez à franchir le cap du méca, ou si vous cherchez le bon prétexte pour encore upgrader votre setup, ce guide tombe à pic.

_Spoiler : oui, votre clavier peut améliorer votre posture… ou juste vous rendre heureux à chaque frappe._

[Lire l'article](https://www.codecademy.com/resources/blog/best-mechanical-keyboards-for-programmers)

<br>
        
---

Bonne lecture, bonnes vacances et on se retrouve **au mois d'août** !
