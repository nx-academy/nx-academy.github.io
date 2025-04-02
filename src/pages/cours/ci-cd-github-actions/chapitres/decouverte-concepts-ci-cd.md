---
layout: ../../../../layouts/ChapterLayout.astro

title: Découvrez les concepts de CI/CD
description: Une super description liée à ce chapitre.

nextChapterLink: presentation-projet-fil-rouge

chapterNumber: 1
sectionNumber: 1
id: 1
---

<article>

# Découvrez les concepts de CI/CD

![Un superhero regardant une ville de nuit, pixel art](/docker-port.webp)

## Familiarisez-vous avec les termes CI/CD

Jusqu’à il y a quelques années, quand je passais des entretiens, on me posait régulièrement des questions sur des CI/CD. L’idée en soi n’était pas mauvaise. Le ou la recruteuse souhaitait valider mes connaissances concernant ce concept. Ce que je reproche peut-être un peu, c’était le côté très scolaire de ces questions. En effet, c’est une excellente chose de connaître ces concepts et d’être capable de les définir. C’en est une autre d’être capable de (bien) les expliquer.

**Il est donc important de connaître non seulement ces termes, mais aussi comment les CI et les CD fonctionnent via les CI Servers. Il est aussi important de comprendre quelles problématiques sont résolues par ces technologies et ce qui existait avant**. Ce chapitre va être l’occasion de nous plonger dans les technologies des CI Servers, de comprendre quels sont les composants essentiels (en termes de langages et de mode de fonctionnement) et de faire un bref rappel des autres méthodes.

De nos jours, quand on parle de déploiement (et de développement) de logiciels, on entend très souvent les concepts de CI et de CD, respectivement Intégration Continue (Continuous Integration) et Déploiement Continu (Continuous Deployment). Il est important de comprendre que ces deux concepts sont distincts même s’ils partagent le même objectif. À savoir, améliorer la qualité, l’efficacité et le déploiement de nos programmes.

L’Intégration Continue (CI) est très orientée “code”. Son objectif est de vérifier que les modifications du code, apportées dans une Pull Request (PR), sont déployables. Le principe d’une CI va donc être de vérifier la qualité du code (via ESLint et SonarQube), le respect des conventions (Prettier), de builder le projet (via `npm run build` et/ou docker), d'exécuter des tests automatisés, etc.

**La CI doit vraiment être vue comme un garde fou**. Elle indique si le code est déployable ou non. Si elle repère des erreurs (on dit souvent si un job fail), alors elle arrête l'exécution des prochaines tâches. Vous recevrez souvent un mail pour vous avertir que le CI a détecté une erreur et n’est pas allé au bout de son exécution.

<br>

![](/cours-ci-cd/exemple-erreur-github-action.png)

<br>

Le Déploiement Continu (CD) s’intéresse lui à la mise en production. On appelle ça aussi la livraison. Une fois que les modifications de votre code ont été testées et buildées, ces modifications vont pouvoir être déployées. L’objectif ici est de pouvoir déployer le plus facilement et le plus tranquillement possible. C’est une tâche qui est un peu redondante (et pas franchement passionnante). De ce fait, elle sera très souvent automatisée. Cela dit, ce n’est pas forcément tout le temps conseillé.

En fonction de votre équipe et de votre projet, une CD peut complexifier votre projet et nécessite une plus grande surveillance. Il faut bien prendre en compte qu’en mettant en place une CD, vous aurez parfois des déploiements défectueux et qu’il faudra prévoir des plans de retour en arrière. Il est important de prendre ça en considération quand vous mettez en place votre pipeline CI/CD.

---

<br>


![Un élève en train de tricher dans une classe, pixel art](/enfant-puzzle.webp)

## Visualisez le fonctionnement d’une pipeline CI/CD

Le fonctionnement du CI est généralement le même quel que soit votre CI Server. Je reviendrai un peu plus loin dans ce chapitre sur des CI Servers connus. Pour l’instant, retenez simplement qu’un CI Server est le système qui surveille les modifications du code sur un repository GitHub (ou GitLab). C’est sur ce CI Server que vos librairies vont être installées, votre code va être buildé et testé, etc.

Les CI Servers fonctionnent avec les principaux langages de programmation. Autrement dit, vous pouvez faire tourner du TypeScript, du Python, du Php, du Ruby, etc. Cela ne marchera pas forcément avec des langages plus “exotiques” mais globalement, vous ne devriez pas avoir de difficultés à faire tourner votre code.

<br>

Le plus souvent, un pipeline CI/CD suit le schéma suivant.

<br>

![](/cours-ci-cd/schema-pipeline.jpg)

<br>

Je trouve ce schéma assez visuel et compréhensible. On y retrouve bien la séparation entre l’intégration continue et le déploiement continu. Vous y retrouvez aussi les grandes étapes composant une pipeline.

</article>
