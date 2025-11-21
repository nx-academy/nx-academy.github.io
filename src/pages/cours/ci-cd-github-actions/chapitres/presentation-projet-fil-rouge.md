---
layout: ../../../../layouts/ChapterLayout.astro

title: Prenez en main le projet fil rouge
description: Clonez, installez et explorez le projet fil rouge utilisé dans ce cours CI/CD. Découvrez sa structure, ses librairies et préparez votre environnement pour la suite du parcours.

previousChapterLink: decouverte-concepts-ci-cd
nextChapterLink: prise-en-main-github-actions

chapterNumber: 2
sectionNumber: 1
sectionTitle: Partie 1 - Appréhendez les CI/CD
id: 2
---

<article>

# Prenez en main le projet fil rouge

![](/images/misc/enfant-jeu-de-constructions.webp)

## Découvrez le projet fil rouge

Dans ce cours, vous allez apprendre comment mettre en place une pipeline CI/CD complète. Vous verrez comment créer des événements et lancer des jobs pour vérifier votre code avec un linter, faire tourner des tests automatisés et déployer sur GitHub Pages.

Le projet fil rouge est une application React utilisant TypeScript, Vite et Tailwind. Il correspond à une application tout ce qu’il y a de plus moderne. J’ai configuré pour vous l’environnement de développement. Cet environnement comprend un linter (ESLint) et un formater (Prettier).

Mon objectif avec ce projet est que vous ayez un point de départ pour réaliser votre portfolio. Il vous restera certes à trouver le storytelling derrière ainsi qu’à définir votre identité graphique mais toute la partie configuration (ce que j’appelle souvent le « bootstrapage » du projet) aura été fait pour vous. Mieux même, vous serez capable de parler des concepts de CI/CD en entreprise ou en entretien d’embauche.

Dans ce chapitre, je vais vous montrer où et comment récupérer le projet fil rouge. Vous verrez dans un second temps l’organisation du code et les différentes librairies installées. De cette façon, vous pourrez durant la suite du cours vous concentrer sur l’essentiel. Autrement dit, l’apprentissage des CI/CD.

Pour votre information, ce projet a été réalisé avec VSCode et Node.js 18. Assurez-vous d’être sur la bonne version de Node avant de démarrer le cours. Pour rappel, vous pouvez vérifier votre version avec la commande `node -v`.

Je vous invite à regarder le screencast ci-dessous pour découvrir le projet fil rouge en détails.

<br>

**SCREENCAST: Découvrez le projet fil rouge**

<br>

Vous allez maintenant cloner le projet fil rouge sur votre ordinateur.

---

<br>

![](/images/misc/installation-programme.webp)

## Clonez et installez le projet fil rouge sous MacOS

Vous pouvez dès à présent récupérer le projet [sur ce repository GitHub](https://github.com/nx-academy/Creez-des-pipelines-CI-CD-avec-les-GitHub-Actions). Clonez et suivez les étapes d’installation.

Pour vous faciliter la vie, je vous ai prévu ce screencast.

<br>

**SCREENCAST: Clonez et installez le projet fil rouge - MacOS**

<br>

Bien, maintenant que le projet est installé et tourne sur votre machine. Il est temps de s’intéresser au code du projet.

---

<br>

![](/images/misc/installation-programme.webp)

## Clonez et installez le projet sous Windows

Vous pouvez dès à présent récupérer le projet [sur ce repository GitHub](https://github.com/nx-academy/Creez-des-pipelines-CI-CD-avec-les-GitHub-Actions). Clonez et suivez les étapes d’installation.

Pour vous faciliter la vie, je vous ai prévu ce screencast.

<br>

**SCREENCAST: Clonez et installez le projet fil rouge - Windows**

<br>

Bien, maintenant que le projet est installé et tourne sur votre machine. Il est temps de s’intéresser au code du projet.

---

<br>

![](/images/misc/visite-appartement.webp)

## Familiarisez-vous avec l’organisation du projet

Pour rappel, le projet utilise ReactJS. Si vous avez déjà utilisé cette librairie, vous savez qu’il n’existe pas vraiment d’organisation du code à suivre. Quand je parle d’organisation du code, je parle de comment les dossiers et les fichiers sont nommés et agencés. Au fil des années, j’ai adopté une méthodologie en termes de nomage et de structuration des fichiers.

Je vais prendre le temps de vous l’expliquer dans le screencast ci-dessous. Vous trouverez un résumé des points principaux de cette méthodologie aprés le screencast.

Autre détail important, je vais prendre le temps de vous expliquer les librairies que j’ai installées et les scripts que vous pouvez exécuter. Vous ne devriez rien trouver de particulièrement bloquant.

<br>

**SCREENCAST: Familiarisez-vous avec l'organisation du projet**

<br>

Si on résume, voici ce que vous venez de voir :

- Tout le code est contenu dans le dossier `src`.
- Chaque composant est placé dans son propre dossier. Je nomme le fichier principal de chaque composant `index.js` pour faciliter sa localisation et son importation au sein du projet.
- Chaque composant est également exporté par défaut. Cette pratique simplifie les importations, éliminant le besoin de déstructurer les importations ou de mémoriser les noms exacts des exportations.

<br>

En adoptant ces principes, je m'assure d'une structure et gestion de code optimisées, capables de s'adapter à l'évolution et à la complexification du projet.

---

<br>

![](/images/misc/personnes-travaillant-voiture.webp)

## Contribuez !

Chaque projet de NX Academy est open-source. Cela signifie que vous pouvez non seulement le consulter et le partager de manière publique mais que vous pouvez aussi contribuer dessus.

Pour ce projet, un bon exercice est de proposer la même base du projet mais avec un autre framework, tel qu’Angular ou Vue. Il est possible que je travaille dessus en 2024. Cela dit, si le chantier vous intéresse et que vous aimeriez y prendre part, n’hésitez surtout pas à me contacter via Discord ou en ouvrant une issue sur le projet.

Autre chose. Si vous voyez des erreurs ou si quelque chose ne vous semble pas clair dans le cours (ça peut toujours arriver). Je vous invite à créer [une issue sur le projet](https://github.com/nx-academy/Creez-des-pipelines-CI-CD-avec-les-GitHub-Actions/issues/new).

Dernier point : si vous utilisez ce template pour réaliser votre portfolio, envoyez le moi. Je serais ravi de voir ce que vous avez réalisé :).

---

<br>

![](/images/misc/vendeur-journaux.webp)

## Résumé

- Le projet fil rouge consiste à la mise en place du pipeline CI/CD complète pour une application utilisant React, TypeScript et Tailwind.
- Ce projet est idéal comme base pour votre portfolio. Il vous permettra d’automatiser les déploiements de ce dernier et de pouvoir présenter vos compétences en entretien.
- Vous êtes tout à fait libre d’utiliser une autre librairie front-end tel que NextJS, Astro ou Vue. Contactez-moi si le sujet vous intéresse.

</article>
