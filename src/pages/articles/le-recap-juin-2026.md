---
layout: ../../layouts/BlogPostLayout.astro

title: "Le récap #7 - Juin 2026"
description: "Le récap est de retour ! Au sommaire de cette édition de juin :
faut-il encore apprendre à coder en 2026, qui seront les seniors de 2035 à
l'heure de l'IA, Frontend Masters qui devient Master.dev et la sortie d'Astro 7."

imgAlt: Un vendeur de journaux dans un kiosque parisien, pixel art
imgSrc: /images/articles/kiosque-journaux.webp

kind: Articles
author: Thomas
draft: false
publishedDate: 06/30/2026
---

Ça faisait un bail ! Le dernier récap remontait à septembre dernier et puis la
vie est passée par là. Le voilà de retour avec une petite nouveauté côté
coulisses : **c'est le premier que je fabrique avec Claude Code et non avec mon
outil maison**. Pour fêter ça, une édition très "métier" : on y parle beaucoup
de l'avenir du dev face à l'IA, avant de finir sur une bonne grosse release
technique.

Bonne lecture !

<br>

---

## Is Coding Still Worth Learning in 2026?

<small>Frontend Mentor</small>

La question est devenue un marronnier ! Avec l'IA qui génère du code à la
chaîne, est-ce que ça vaut encore le coup d'apprendre à coder ? La réponse de
Frontend Mentor est claire : oui, autant qu'avant, peut-être même plus. Ce qui
change, c'est ce sur quoi vous mettez l'accent quand vous apprenez. Le travail
se déplace vers le jugement, le goût, et surtout **savoir quoi construire** et
pas seulement savoir l'écrire.

Le conseil que je retiens et que je répète à longueur de temps : **en tant
qu'apprenant, ne laissez pas l'IA penser à votre place ni écrire du code que
vous n'avez pas déjà écrit vous-même des dizaines de fois**. Utilisez-la pour
poser des questions, débugger, relire du code que vous avez déjà produit. Le
reste, tel que la persévérance et le plaisir de construire, reste ce qui fait la
différence à l'arrivée.

[Lire l'article](https://www.frontendmentor.io/articles/is-coding-still-worth-learning)

<br>

---

## Who will be the senior engineers of 2035?

<small>James Stanier — The Engineering Manager</small>

Suite logique du sujet précédent. James Stanier pose une question qu'on n'entend
pas assez. Si l'IA absorbe les petites tâches et les corrections de bugs (exactement le terrain de jeu sur lequel les juniors faisaient leurs armes)
comment se forment les seniors de demain ? Il rappelle que **54% des leaders
d'ingénierie prévoient d'embaucher moins de juniors** en se disant que l'IA
permet aux seniors d'en faire plus.

Sauf que le pipeline de talents, ça ne se rattrape pas en six mois. **On est en
train de fabriquer (ou de ne pas fabriquer) les seniors de 2035 dès maintenant,
dans les décisions qu'on prend sur qui on recrute, qui on accompagne, et à qui
on donne le droit de se planter sans conséquence.** À méditer la prochaine fois
qu'on rogne sur l'alternance ou le mentorat pour "gagner en vélocité".

[Lire l'article](https://theengineeringmanager.substack.com/p/who-will-be-the-senior-engineers)

<br>

---

## Today, Frontend Masters becomes Master.dev

<small>Frontend Masters / Master.dev</small>

Petite news qui en dit long sur l'évolution du métier : Frontend Masters, la
plateforme de formation bien connue, se rebaptise **Master.dev**. La raison ? Le
mot "Frontend" ne collait plus à leur catalogue. Une bonne partie de leurs cours
les plus regardés n'a plus rien à voir avec le front : Go, Rust, bases de
données, cloud, Python, DevOps, et même des cours sur Claude Code et les agents
IA.

**La mission ne change pas — aider les devs à maîtriser leur craft, elle
s'élargit simplement pour coller à ce qu'ils font déjà.** Un rebrand qui acte
une réalité : le développeur "front" pur tend à disparaître au profit d'un
profil beaucoup plus large. J'avoue que le nom historique va me manquer mais le
geste est cohérent.

[Lire l'article](https://frontendmasters.com/blog/today-frontend-masters-becomes-master-dev/)

<br>

---

## Astro 7.0

<small>Astro</small>

On termine sur une release qui me parle particulièrement, parce que ce site tourne sous
Astro. La version 7 met le paquet sur la performance : le compilateur `.astro` a
été **réécrit en Rust**, le pipeline Markdown/MDX passe lui aussi par un
processeur Rust (Sätteri), et avec Vite 8 et son bundler Rolldown, les builds
sont annoncés **15 à 61% plus rapides**.

Côté fonctionnalités, on a droit à l'Advanced Routing avec un point d'entrée
`src/fetch.ts` qui donne un contrôle total sur le pipeline de requêtes, au route
caching qui se stabilise (avec des providers de cache CDN pour Netlify, Vercel
et Cloudflare), et clin d'œil à l'air du temps à un **support des agents de
code** : Astro peut détecter un agent, lancer le serveur de dev en arrière-plan
et sortir des logs en JSON exploitables par la machine. **Bref, une release qui
coche toutes les cases. Il va falloir que je trouve un moment pour migrer.**

[Lire l'article](https://astro.build/blog/astro-7/)

<br>

---

Bonne lecture et on se retrouve **au mois de juillet !**
