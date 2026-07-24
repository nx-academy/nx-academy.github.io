---
layout: ../../layouts/BlogPostLayout.astro

title: "Le récap #8 - Juillet 2026"
description: "Au sommaire de cette édition de juillet : un banc d'essai de
frameworks front, l'histoire de Java en documentaire, l'IA qui rebat les cartes
de l'emploi des jeunes, une arnaque au faux entretien technique côté sécurité, et
un bonus htmx sur le travail avec l'IA."

imgAlt: Un vendeur de journaux dans un kiosque parisien, pixel art
imgSrc: /images/articles/kiosque-journaux.webp

kind: Articles
format: recap
serie: veille
tags:
  - Veille
  - Le Récap
author: Thomas
draft: false
publishedDate: 07/24/2026
---

Deux récaps d'affilée : la série a retrouvé son rythme, et j'avoue que ça fait
du bien. Édition de juillet un peu buissonnière — on passe d'un banc d'essai de
frameworks front à l'histoire de Java, avant d'attaquer le gros morceau du
mois : la place des jeunes sur le marché du travail à l'heure de l'IA. On
termine côté sécurité avec une arnaque au recrutement plutôt vicieuse, et un
petit bonus htmx pour la route.

Bonne lecture !

<br>

---

## Framework Benchmarks

<small>Alicia Sykes (Lissy93)</small>

Le principe est aussi simple qu'ambitieux : construire la même application dans
chaque framework front — React, Vue, Svelte, Solid, Qwik, Angular, Preact, Lit,
Alpine, VanJS, jusqu'à jQuery et du Vanilla — puis tout benchmarker sur un pied
d'égalité. Les résultats confirment ce qu'on pressent depuis un moment : **Solid
et Svelte tiennent le haut du pavé** côté performances et poids de bundle, quand
React et Angular restent solides mais plus gourmands.

Mon petit regret : **dommage de ne pas y voir Astro**. C'est un peu logique — le
banc d'essai compare des frameworks « réactifs » côté client sur une même app
interactive, terrain sur lequel Astro (statique d'abord, îlots d'interactivité)
joue une autre partition. N'empêche, la comparaison aurait été instructive.

[Lire l'article](https://framework-benchmarks.as93.net/)

<br>

---

## The Java Story — The Official Documentary

<small>Documentaire officiel Java</small>

On change complètement de registre avec ce documentaire qui retrace toute
l'histoire de Java, du projet baptisé « Oak » dans les couloirs de Sun
Microsystems jusqu'au statut de standard de l'entreprise, présent sur des
milliards d'appareils. Trente ans au compteur et toujours là.

C'est le genre de piqûre de rappel que j'aime bien : on a vite fait d'enterrer
Java sous les langages à la mode, mais **peu de technos peuvent se targuer d'une
telle longévité**. Une heure agréable à regarder, y compris (surtout ?) si vous
n'écrivez jamais une ligne de Java.

[Lire l'article](https://www.youtube.com/watch?v=ZqGSg4b_cZA)

<br>

---

## L'intelligence artificielle semble rompre un schéma historique

<small>via tech.rocks</small>

Merci à **tech.rocks** de m'avoir fait passer cet article, qui prolonge à
merveille le sujet « les seniors de 2035 » du récap précédent. La thèse : depuis
trois siècles, chaque grande révolution technique avait plutôt profité aux
jeunes générations. L'IA générative, elle, semble **inverser la tendance** et
éroder leur place sur le marché du travail.

Les chiffres donnent le vertige. Un baromètre BCG X (15 pays) mesure **41 % de
salariés qui redoutent que l'IA leur coûte leur emploi** ; la Deutsche Bank note
qu'un quart des 18-34 ans sont très inquiets, contre un dixième des plus de 55
ans. Côté recherche, Hosseini et Lichtinger (Harvard) montrent une **baisse de
8 % des effectifs débutants** dans les entreprises déjà passées à l'IA, et
Brynjolfsson (Stanford), pourtant techno-optimiste, relève une **chute de 13 %
de l'emploi des 22-25 ans** sur les métiers les plus exposés depuis l'arrivée de
ChatGPT.

Ils appellent ça un **« changement technologique biaisé en faveur de la
séniorité »**. Le problème est concret : les tâches qu'on confiait aux débutants
— un programme simple, une première esquisse, du tri de documents — sont
justement celles que l'IA automatise. **Si on ne réinvente pas les parcours
d'entrée dans le métier, on scie la branche sur laquelle poussent les seniors de
demain.** Exactement ce que je racontais le mois dernier.

[Lire l'article](https://www.linkedin.com/posts/nicolas-mariotte-211714_lintelligence-artificielle-semble-rompre-share-7379151480529920001-pVRZ/)

<br>

---

## Contagious Interview : du malware planqué dans des SVG

<small>Elastic Security Labs</small>

Une histoire qui devrait parler à tous ceux qui passent des entretiens
techniques. Elastic Security Labs a débusqué une campagne (baptisée REF9403,
attribuée à un groupe nord-coréen) qui piège les candidats développeurs : un
faux poste, un « coding challenge » à cloner et à lancer… et le piège se
referme.

Le plus vicieux, c'est la planque. Le code malveillant est **fragmenté dans les
commentaires HTML de fichiers SVG** — des images de drapeaux nationaux,
parfaitement anodines — puis réassemblé et exécuté à chaque démarrage du
serveur. À la clé, une charge en quatre étapes alignée sur **OTTERCOOKIE** : vol
d'identifiants de navigateur et de wallets crypto, vol de fichiers, RAT via
Socket.IO, vol de presse-papiers. Détail glaçant : au moment de la publication,
**aucun antivirus ne détectait quoi que ce soit**. Morale : réfléchissez à deux
fois avant de lancer `npm install && npm start` sur le projet d'un « recruteur »
un peu trop pressé.

[Lire l'article](https://www.elastic.co/security-labs/contagious-interview-malware-svg-steganography)

<br>

---

## Bonus — Working With AI: A Concrete Example

<small>htmx — Carson Gross</small>

Pour finir, un petit bonus signé htmx : un retour d'expérience honnête sur ce
que donne le travail avec une IA sur un vrai bout de code. Le constat est nuancé
et rejoint le fil rouge du mois. Là où l'IA **brille**, c'est l'investigation et
surtout la **génération de tests** — abondante, fastidieuse à écrire à la main,
exactement le genre de corvée qu'on délègue volontiers.

Là où ça coince, c'est pour trouver une solution vraiment propre : sans
connaissance fine du codebase, l'assistance aurait tranquillement **introduit de
la dette technique**. Bref, un excellent exécutant, un architecte discutable —
ce qui, mine de rien, boucle assez bien avec tout le reste de cette édition.

[Lire l'article](https://htmx.org/essays/working-with-ai/)

<br>

---

Bonne lecture et on se retrouve **au mois d'août !**
