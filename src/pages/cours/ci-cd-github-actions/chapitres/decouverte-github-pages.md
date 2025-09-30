---
layout: ../../../../layouts/ChapterLayout.astro

title: Initiez-vous à GitHub Pages
description: Une super description liée à ce chapitre.

previousChapterLink: bonnes-pratiques-workflow-complexe
nextChapterLink: deploiement-portfolio

chapterNumber: 1
sectionNumber: 3
sectionTitle: Partie 3 - Mettez en place une pipeline CI/CD avec GitHub Pages et les GitHub Actions
id: 5
---


<article>

# Initiez-vous à GitHub Pages 

![Un superhero regardant une ville de nuit, pixel art]()

Avant de poursuivre la lecture de ce chapitre, veuillez vous mettre [sur la branche `partie-3/chapitre-1-debut`](https://github.com/nx-academy/Creez-des-pipelines-CI-CD-avec-les-GitHub-Actions/tree/partie-3/chapitre-1-debut). En plus de cette branche, nous allons utiliser [cette issue Github](https://github.com/nx-academy/Creez-des-pipelines-CI-CD-avec-les-GitHub-Actions/issues/7) comme problématique. Je vous invite à en prendre connaissance avant de passer à la lecture du chapitre.

## Découvrez GitHub Pages

Dans cette dernière partie du cours, vous allez découvrir GitHub Pages. Vous verrez comment le configurer et automatiser vos déploiements.

Mais avant d’aller plus loin, j’ai une bonne nouvelle à vous annoncer. Ces deux derniers chapitres seront moins denses et moins compliqués que les précédents. Bien sûr il y aura quelques nouveautés mais elles seront en moindre quantité que dans les chapitres précédents.

<br>

![](/images/cours-ci-cd-github-actions/home-github-pages.webp)

<br>

On va commencer par s’intéresser à GitHub Pages.

GitHub Pages est un service d’hébergement gratuit offert par GitHub. Il permet d'héberger directement des sites webs dits statiques depuis des repositories GitHub. Le terme clé à retenir ici est “statique”. Cela signifie que vous ne pouvez pas faire tourner du code côté serveur. Il ne vous sera donc pas possible d’utiliser des langages tels que Node.js, Php ou Python via GitHub Pages. Vous devrez uniquement utiliser le HTML, le CSS et le JavaScript.

J’en profite pour faire un parallèle ici avec AWS et son service S3. AWS est la solution de cloud computing d’AWS. Parmi ses nombreux services, il y a S3. S3 permet de faire du stockage objet.

J'évoque AWS S3 ici car, tout comme GitHub Pages, il est couramment utilisé pour héberger des sites web statiques. Il offre ainsi une alternative pertinente à GitHub Pages. Pour votre information, je suis en train de préparer quelques cours sur les infrastructures cloud et notamment AWS. Ces quelques lignes me permettent de commencer à forger votre model mental en douceur.

En plus d'héberger gratuitement votre site, GitHub Pages va s’occuper de créer pour vous un domaine personnalisé. Ce domaine sera à l’adresse `${username}.github.io`, username correspondant à votre nom d’utilisateur. Par exemple, mon username sur GitHub est `tdimnet`, mon domaine personalisé sera donc `tdimnet.github.io`.

Sachez qu’il est tout à fait possible d’utiliser un nom de domaine personnalisé. Dans mon cas, il y a 8/9 ans, j’ai hébergé mon portfolio via GitHub Pages et on pouvait le consulter à l’adresse [tdimnet.com](https://tdimnet.com). Pour être honnête, je ne m’en sers plus aujourd’hui et je trouve ça tout aussi simple (et moins cher) d’utiliser directement le nom de domaine personnalisé de GitHub Pages.

Autre chose, GitHub Pages gère pour vous les certificats SSL. Cela signifie que votre site sera accessible via https. Le trafic vers et depuis votre site sera donc crypté. Ce qui est toujours une bonne chose niveau sécurité.

Je vous invite [à lire cet article du MDN](https://developer.mozilla.org/fr/docs/Learn/Common_questions/Tools_and_setup/Using_Github_pages) pour prendre un peu d’avance 🙂.

---

<br>

![Un élève en train de tricher dans une classe, pixel art]()

## Découvrez les cas d’utilisation de GitHub Pages

L'un des usages les plus courants de GitHub Pages est l'hébergement de portfolios. Ce n’est d’ailleurs pas pour rien que l’objectif de ce cours est de vous permettre d’automatiser le déploiement de votre portfolio. Vous pouvez développer votre portfolio avec React, NextJS, Angular ou même Vue et l’héberger sur GitHub Pages.

Cela dit, il existe d’autres cas d’utilisation pour GitHub Pages et j’ai bien envie de vous faire chercher la réponse. Je vous mets au défi : ouvrez un nouvel onglet et cherchez d'autres utilisations courantes de GitHub Pages.

<br>

---

![Un élève en train de tricher dans une classe, pixel art]()

---

<br>

Alors, qu'avez-vous trouvé ?

En plus du portfolio, il existe deux autres utilisations fréquentes de GitHub Pages : la documentation et le blog.

[Docusaurus](https://github.com/facebook/docusaurus) et [MkDocs](https://github.com/mkdocs/mkdocs/tree/master) sont deux outils, parmi d’autres, qui permettent d'héberger la documentation d’un projet. De nombreuses librairies utilisent d’ailleurs GitHub Pages pour héberger leur documentation. On peut citer Bootstrap, Leaflet et Jekyll.

L’intégration complète de GitHub avec GitHub Pages permet aux contributeurs de facilement modifier (et suivre les modifications) d’une documentation, Une fois ces modifications acceptées, elles sont déployées automatiquement en prod. Je serais intéressé de savoir si vous utilisez d’autres outils de votre côté (dans le cas où votre documentation est sur GitHub Pages).

De nombreux développeurs ont également utilisé GitHub Pages pour héberger leurs blogs. Jekyll, un générateur de sites statiques écrit en Ruby, est d’ailleurs directement intégré avec GitHub Pages. Il vous permet d’obtenir les fonctionnalités classiques d’un blog simplement, à savoir d’ajouter des catégories et des tags et de mettre en place un système de gestion de commentaires via Disqus.

<br>

![](/images/cours-ci-cd-github-actions/home-jekyll.webp)

<br>

Pour l’avoir personnellement utilisé il y a quelques années, Jekyll est une solution solide pour réaliser un blog. Cela dit, je trouve que passer par Medium est aujourd’hui une solution plus simple et plus solide encore.

Pour la petite histoire, Jekyll et GitHub ont une histoire commune. Tom Preston-Werner. Il est à la fois l’un des cofondateurs de GitHub et le créateur de Jekyll. Je vous invite [à lire l’un de ses posts d’introduction à Jekyll](https://tom.preston-werner.com/2008/11/17/blogging-like-a-hacker). Cet article date du 17 novembre 2008. Ça commence à remonter 🙂.

Ce qui est essentiel à retenir ici, vous pouvez utiliser GitHub Pages pour de nombreux cas d’usage, telles que de la documentation, un blog, un portfolio et même un site vitrine.

---

<br>

![Un élève en train de tricher dans une classe, pixel art]()

## Configurez GitHub Pages

Avant de poursuivre votre lecture, veuillez vous mettre [sur la branche `partie-3/chapitre-1/section-3`](https://github.com/nx-academy/Creez-des-pipelines-CI-CD-avec-les-GitHub-Actions/tree/partie-3/chapitre-1/section-3).

Il existe deux manières de configurer GitHub Pages. Vous pouvez soit réaliser votre déploiement à partir d’une branche, soit le faire via les GitHub Actions. La première méthode est la plus traditionnelle. Pour être honnête, j’ai tendance à conseiller la deuxième. Elle est à la fois plus simple et plus sûre.

En effet, la méthode traditionnelle ne comprend pas certaines étapes cruciales, telles que l'exécution des tests. Cela a tendance à augmenter le risque d'introduire des bugs dans votre application en production.

Les GitHub Actions, en revanche, offrent un cadre de déploiement plus structuré. Chaque modification du code peut être automatiquement testée et validée avant d’être déployée. Cette approche renforce non seulement la sécurité et la fiabilité de votre application. Elle facilite également la traçabilité de votre processus de déploiement. Vous avez une vue complète de chaque étape, ce qui permet d’identifier et de résoudre rapidement d’éventuels problèmes.

Cela dit, j’ai quand même envie de vous apprendre à utiliser les deux méthodes. Cela vous permettra de voir les différences entre elles.

Vous allez voir comment le faire via le screencast ci-dessous.

<br>

**SCREENCAST: Configurez GitHub Pages**

<br>

Vous devriez maintenant être prêt pour résoudre la problématique de ce chapitre.

---

<br>

![Un élève en train de tricher dans une classe, pixel art](/enfant-puzzle.webp)

## Exercez-vous



</article>
