---
layout: ../../layouts/BlogPostLayout.astro

title: Le moine, le vape coder, le debugger et le learner
description:
  A force d'utiliser l'IA au travail et d'en parler avec mes éleves, j'ai pu
  établir les différents profils de développeur qui utiilisent l'IA. Alors, vous
  êtes quel type de dev IA vous ?

imgAlt:
  Un moine, un jeune avec une capuche, un bucheron et un adolescent posant sur
  une photo, pixel art
imgSrc: /images/articles/quatre-hommes-pose.webp

kind: Articles
author: Thomas
draft: false
publishedDate: 03/29/2025
---

Vous vous êtes déjà demandé le type de développeur que vous étiez ? Par exemple,
est-ce que vous êtes le genre de dev qui accorde plus d’importance à la
lisibilité du code ? Ou selon vous, la performance doit toujours passer en
premier ?

À l’époque où je travaillais encore [chez Datadog](https://www.datadoghq.com/),
nous avions des guidelines internes qui décrivaient les différents types de
développeurs. L’idée n’était pas de dire qu’un profil est meilleur qu’un autre
mais plutôt d’aider à trouver le bon équilibre dans une équipe.

On retrouvait notamment :

- le développeur qui écrit un code aussi lisible que possible, accessible à tout
  le monde, des juniors aux seniors. **J'avoue tendre personnellement vers ce
  type de profil** ;
- celui qui se concentre sur l’optimisation en rendant son code aussi rapide et
  efficace que possible, quitte à sacrifier un peu de lisibilité ;
- celui obsédé par le design pixel perfect et l’expérience utilisateur. Son
  objectif est de construire des interfaces que les utilisateurs aiment
  utiliser.

Mais pour moi, il manquait un dernier profil : le développeur junior. Son
approche est différente. Il ne se focalise pas encore sur la lisibilité ou la
performance. Son objectif principal est d’apprendre et de progresser. Parfois
même, il va volontairement complexifier une solution pour se challenger ou pour
se prouver qu’il en est capable.

<br>

**Mais vous êtes vous déjà demandé le type de dev que vous étiez quand vous
utilisiez l'IA ?** Je me suis récemment posé la question et je vais prendre le
temps de revenir dessus dans cet article

---

<img src="/images/articles/moine-devant-ordinateur.webp" alt="Le moine devant son ordinateur, pixel art" style="aspect-ratio: 1792 / 1024; object-fit: cover; width: 100%; display: block;" />

## The Monk

### TL;DR

Un développeur senior avec une configuration minimaliste et un état d’esprit
maximaliste. Il ne code pas forcément très rapidement mais avec intention.
**Pour lui, GPT est juste un outil de plus, pas une menace**.

### Description

**Le Monk code depuis un bon moment déjà. En général depuis au moins 7 à 10
ans**. Il connait plusieurs langages de programmation, a travaillé dans
différents types de boîtes. Il a appris à se concentrer sur l’essentiel : une
pensée claire et des outils précis.

Il maîtrise Vim (oui, je sais, j’aurais dû parler d’Emacs à la place 😉) et la
ligne de commande. Il préfère les environnements en terminal aux IDE trop
chargés. Il peut sembler old school dans ses habitudes mais il n’est pas bloqué
dans le passé. Au contraire, il voit l’IA comme une évolution naturelle de sa
boîte à outils. C'est une espèce de couteau suisse et pas un voleur d’emploi.

Le Monk prend son temps quand il code. Il sait que les deadlines comptent mais
il sait aussi identifier les parties critiques d’un système qui méritent d’être
soignées. Pour lui, GPT n’est pas là pour penser à sa place mais pour challenger
ses idées et proposer d’autres angles.

Il est aussi curieux intellectuellement : il veut comprendre comment fonctionne
l’IA en profondeur, pas seulement comment écrire de bons prompts.

### Son workflow

<br>

- **Double écran** : un pour son éditeur ou navigateur, l’autre pour GPT.
- **Interaction asynchrone** : il écrit un prompt, prend le temps de réfléchir à
  la réponse, l’adapte, puis l’intègre sans se presser.
- **Esprit refacto** : il nettoie souvent le code proposé par GPT, renomme des
  variables, réécrit des fonctions, voire repart de zéro en gardant juste
  l’idée.
- **Pas de distractions** : pas de suggestions Copilot en continu. Il préfère
  garder le contrôle total et rester concentré.

### Le prompt typique du Monk

> Voici une fonction que j’ai écrite. Peux-tu proposer des améliorations en
> termes de lisibilité et de performance — sans en changer la logique ?

---

<img src="/images/articles/adulte-capuche-hacker.webp" alt="Le Vape Coder devant son ordinateur, pixel art" style="aspect-ratio: 1792 / 1024; object-fit: cover; width: 100%; display: block;" />

## The Vape Coder

### TL;DR

Il va vite, casse des trucs, et laisse GPT les réparer. Il vit littéralement
dans l’écosystème IA. **Le code n’est qu’un moyen. La vitesse est le vrai
objectif**.

### Description

Le Vape Coder est à fond dans l’IA. Il a remplacé VSCode par Vector, iTerm2 par
Warp. Il est toujours au courant des dernières nouveautés : _« GPT-5, Claude
3.5, Gemini 1.5 ? Déjà testé. »_.

Son but n’est pas de peaufiner chaque ligne de code. Ce qui compte, c’est de
shipper vite, tester vite, itérer encore plus vite. Que ce soit pour prototyper
une feature, corriger un bug ou sortir un MVP complet, il avance. Et il avance
vite.

Son code n’est pas toujours très propre. Son architecture peut sembler
improvisée. **Mais ce qu’il perd en structure, il le gagne en vélocité**. Dans
un contexte de startup, de hackathon ou de projet solo, c’est une machine de
guerre.

### Workflow

<br>

- **Fenêtre unique, tout intégré** : GPT (Vector ou Copilot Chat) est intégré
  directement dans l’IDE ou le terminal. Un seul onglet pour tout faire.
- **Complétions de code en direct** : il accepte les suggestions de Copilot en
  temps réel, il navigue dedans comme on scrolle sur TikTok.
- **Prompt-then-code** : il balance souvent un truc du genre « écris-moi un
  endpoint Next.js pour faire ça », il modifie un peu puis il passe à autre
  chose.
- **Boucle d’itération rapide** : build → test → bug → fix → ship → repeat.
- **Prompts stack-aware** : ses prompts sont courts, précis et taillés pour son
  stack. Pas de blabla, que du résultat.
- **Obsédé des outils** : dernières extensions, plugins, wrappers CLI… s’il
  existe un moyen plus rapide, il l’a déjà trouvé.

### Le prompt typique du Vape Coder

> Génère un composant React avec Tailwind qui récupère des données depuis cet
> endpoint et les affiche sous forme de grille de cartes. Et rends ça joli.

---

<img src="/images/articles/bucheron-ordinateur.webp" alt="Le Debugger devant son ordinateur, pixel art" style="aspect-ratio: 1792 / 1024; object-fit: cover; width: 100%; display: block;" />

## The Debugger

### TL;DR

Il ne code pas avec l’IA mais il code à côté. Et quand quelque chose casse, GPT
est le premier appelé.

### Description

Le Debugger vient de l’école des développeurs old-school. Il n’est pas contre
l’IA. Au contraire, il est plutôt curieux mais il est suffisamment efficace sans
elle. Enfin, jusqu’à ce que quelque chose casse ^^.

Il utilise rarement GPT pour générer du code depuis zéro. À la place, il
copie-colle :

- des traces d’erreur,
- des fonctions qui plantent,
- des bugs incompréhensibles,
- des messages d’erreur tordus.

Il considère GPT comme un assistant de diagnostic, pas comme un copilote. Ce
qu’il veut, c’est comprendre en profondeur pourquoi ça marche ou pourquoi ça
casse. Il n’a pas peur d’affiner ses prompts plusieurs fois pour aller plus loin
que la simple solution.

Là où le Monk cherche la structure et l’élégance, le Debugger cherche la vérité
et les causes profondes. Il répare d’abord. Il nettoiera après.

### Workflow

<br>

- **Prompt orienté erreur** : il commence par copier-coller une stack trace, des
  logs ou un message d’erreur. Il demande ensuite à GPT de l’aider à comprendre
  ce qui se passe.
- **Contexte partiel** : il envoie des morceaux de code cassés ou des fonctions
  isolées en posant des questions du type « Qu’est-ce qui cloche ici ? »
- **Test d’hypothèses** : il demande à GPT de valider des suppositions, par
  exemple « Si je passe null ici, ça plante ? »
- **Reverse-engineering** : quand il doit bosser sur une API non documentée ou
  du vieux code legacy, il s’appuie sur GPT pour décrypter.
- **Peu de génération** : il demande rarement à GPT de « générer du code ». Ce
  qui l’intéresse, c’est le debug, la relecture et l’explication.
- **Prompt en cas de blocage** : l’IA est un dernier recours. Cela dit, quand il
  y a recours, c’est efficace.

### Le prompt typique du Debugger

> Cette fonction renvoie TypeError: Cannot read properties of undefined. Voici
> le code. Tu peux m’aider à comprendre pourquoi ça plante et comment le
> corriger ?

---

<img src="/images/articles/jeune-sweat-capuche-ordinateur.webp" alt="Le learner devant son ordinateur, pixel art" style="aspect-ratio: 1792 / 1024; object-fit: cover; width: 100%; display: block;" />

## The Learner

### TL;DR

Il débute. Utilise l’IA comme tuteur personnel, débuggeur et boost de confiance.
Il tâtonne encore mais a une énorme envie de progresser.

### Description

Le Learner est au début de son parcours de développeur. C’est peut-être un
junior, un étudiant en bootcamp, un autodidacte passionné ou quelqu’un en
reconversion.

Pour lui, GPT est un professeur, un mentor et parfois une béquille ^^.

Il ne comprend pas toujours le code que GPT lui propose. Cela dit, il lui fait
suffisamment confiance pour l’essayer. Parfois, il colle directement le code
dans son projet juste pour voir si ça fonctionne. Son approche par défaut, c’est
essais/erreurs.

Il ne cherche pas encore à optimiser la performance ou la lisibilité. Il est
encore en train d’apprendre comment toutes les pièces s’emboîtent. Ses prompts
sont souvent longs, exploratoires, remplis de contexte — comme s’il s’adressait
à un vrai professeur.

**Mais attention** : le Learner est en chemin vers un autre profil. Avec
suffisamment d’itérations, de questions et de feedback, le Learner d’aujourd’hui
peut devenir le Monk de demain.

### Workflow

<br>

- **Approche prompt-first** : avant même de coder, il demande souvent à GPT
  d’expliquer un concept, une structure ou comment démarrer.
- **Code avant compréhension** : il lance parfois du code qu’il ne comprend pas
  encore, puis demande des explications.
- **Apprentissage ligne par ligne** : il peut copier un extrait de code et
  demander « Tu peux m’expliquer ligne par ligne ? »
- **Théorie + pratique** : il pose à la fois des questions de fond et des
  questions pratiques — « Quelle est la différence entre var, let et const ? »
  puis « Aide-moi à écrire une fonction avec. »
- **Debug pour apprendre** : il ne colle pas une erreur juste pour la corriger
  mais pour comprendre pourquoi elle s’est produite.
- **Collectionne et adapte** : il crée souvent une bibliothèque personnelle de
  snippets, de prompts et d’explications GPT.

### Le prompt typique du Learner

> J’apprends JavaScript. Tu peux m’expliquer ce que fait cette fonction avec
> async/await, et comment je pourrais en écrire une moi-même ?

---

J’espère que cet article vous a plu ! Souvenez-vous que nous sommes rarement un
seul profil. La plupart d’entre nous sont un mélange et cela peut changer selon
le contexte.

Par exemple, je me considère comme un Monk quand il s’agit de langages de
programmation mais clairement un Learner dès qu’on parle de data science.

À bientôt et codez bien !

![Le moine, le vape coder, le debugger et le learner faisant au revoir avec la main, pixel art](/images/articles/quatre-hommes-au-revoir.webp)
