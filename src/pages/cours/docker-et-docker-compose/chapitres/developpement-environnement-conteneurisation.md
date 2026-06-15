---
layout: ../../../../layouts/ChapterLayout.astro

title: "Développez dans un environnement conteneurisé"
description:
  Apprenez à développer directement dans un conteneur grâce à l’extension VSCode
  DevContainer et à intégrer front-end, back-end et base de données dans un
  projet full-stack Dockerisé.

previousChapterLink: installation-et-configuration-services
nextChapterLink: preparation-mise-en-production

chapterNumber: 2
sectionNumber: 3
sectionTitle: Partie 3 - Développez dans un environnement ISO Prod
id: 8
---

<article>

# Développez dans un environnement conteneurisé

![Un homme travaillant dans un porte conteneur, pixel art](/images/cours-docker-et-docker-compose/travail-conteneur.webp)

Avant de poursuivre la lecture de ce chapitre, veuillez vous mettre
[sur la branche `partie-3/chapitre-2-debut`](https://github.com/nx-academy/Conteneurisez-vos-applications-avec-Docker/tree/partie-3/chapitre-2-debut).
En plus de cette branche, nous allons utiliser
[cette issue Github](https://github.com/nx-academy/Conteneurisez-vos-applications-avec-Docker/issues/5)
comme problématique. Je vous invite à en prendre connaissance avant de passer à
la lecture du chapitre.

## Utilisez VSCode pour développer dans votre conteneur

Vous abordez maintenant un chapitre un peu à part du reste du cours. En effet,
vous allez, dans ce chapitre, découvrir et paramétrer une extension VSCode.
Cette extension vous permettra de coder directement dans un conteneur Docker, le
tout sans sortir de VSCode. C’est un peu le meilleur des deux mondes.

En plus de cette extension, vous allez découvrir l’intégralité du code source du
projet fil rouge. Souvenez-vous que vous avez mis en place Docker avec une
méthodologie interactive. Vous avez vu comment paramétrer Docker, puis
docker-compose, puis créer une API Rest et enfin connecter cette API Rest à une
base de données MongoDB. Il est donc grand temps de rattacher les wagons et
d’intégrer l’ensemble du projet, autant le front-end que le back-end. À la fin
du chapitre, vous aurez un projet full-stack entièrement dockerisé comprenant un
front-end, un back-end et une base de données MongoDB. Vous pourrez facilement
partager ce projet avec vos collègues en sachant qu’il fonctionnera partout.

<br>

![Schéma du fonctionnement de DevContainer : VS Code local relié via un port exposé au serveur VS Code dans le conteneur, code source partagé par volume](/images/cours-docker-et-docker-compose/schema-devcontainer.webp)

<br>

Passons à la présentation de l’extension DevContainer.

Sachez que je connais et utilise l’extension DevContainer depuis quelques
années. J’ai rédigé en mai 2021
[un blog post](https://medium.com/@tdimnet/utiliser-lextension-vscode-devcontainer-pour-simplifier-le-d%C3%A9veloppement-python-18861befe442)
présentant cette extension et comment l’utiliser. Dans ce blog post, j’utilise
un projet Python et Node mais globalement la configuration reste la même. Je
vous invite à lire : il apporte un bon complément d’informations.

[Selon la documentation officielle](https://code.visualstudio.com/docs/devcontainers/create-dev-container),
l’extension DevContainer permet d'utiliser un conteneur Docker comme
environnement de développement complet. Elle vous permet d'ouvrir n'importe quel
dossier d'un conteneur et de tirer parti de l'ensemble des fonctionnalités de
Visual Studio Code. Au moment de paramétrer l’extension, VSCode va créer pour
vous un dossier .devcontainer. Il contiendra à l’intérieur un fichier
`docker-compose.yml` et un fichier de configuration appelé `devcontainer.json`.
Commencez par lire la documentation et essayez de paramétrer cette extension de
votre côté puis regardez les screencasts ci-dessous.

---

<br>

![Un adolescent installant une carte graphique sur son ordinateur, pixel art](/images/cours-docker-et-docker-compose/montage-pc.webp)

## Installez et paramétrez l’extension DevContainer

Dans ce screencast, je vais vous montrer comment installer et paramétrer
l’extension DevContainer. Pensez bien à vous mettre
[sur la branche `partie-3/chapitre-2-debut`](https://github.com/nx-academy/Conteneurisez-vos-applications-avec-Docker/tree/partie-3/chapitre-2-debut).
Pour votre information, je réalise ce screencast sur MacOS. Si vous avez des
difficultés d'installation sur Windows, n'hésitez surtout pas à me contacter.

<br>

<iframe src="https://player.vimeo.com/video/1096177694?h=f94055badf&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" title="Screencast 15 - Installez et paramétrez l’extension DevContainer"></iframe>

<br>

Félicitations, l’extension DevContainer est maintenant installée et prête à
utiliser sur votre ordinateur. Le code correspond à la fin de cette vidéo se
trouve
[sur la branche partie-3/chapitre-2/section-2](https://github.com/nx-academy/Conteneurisez-vos-applications-avec-Docker/tree/partie-3/chapitre-2/section-2).

<br>

Vous allez maintenant pouvoir faire fonctionner le projet fil rouge dans son
intégralité.

---

<br>

![Un homme inspectant une voiture dans un garage, pixel art](/images/cours-docker-et-docker-compose/inspect-voiture.webp)

## Découvrez les modifications apportées au projet fil rouge

Avant de poursuivre la lecture de cette section, pensez bien à changer de
branche en vous positionnant
[sur la branche partie-3/chapitre-2/section-3](https://github.com/nx-academy/Conteneurisez-vos-applications-avec-Docker/tree/partie-3/chapitre-2/section-3).
Sachez que j’utiliserai docker-compose sans l’extension DevContainer pour lancer
le projet.

J’ai maintenant une confession à vous faire. Je pensais initialement vous donner
ce qui va suivre comme problématique pour ce chapitre. Cela dit, en travaillant
dessus, je me suis aperçu que cela risquait d’être un peu trop complexe.

En effet, nous allons maintenant ajouter le front à notre projet fil rouge.
Idéalement, j’aurais souhaité ajouter la partie front via un registry Docker,
tel que DockerHub. Cela aurait permis d’avoir deux conteneurs totalement isolés
et indépendants. Le problème, c’est que cela vous aurait empêché de pouvoir
lancer facilement le front et le back en environnement de développement.

La limitation ici vient principalement de l’extension DevContainer. Elle permet
de se placer uniquement dans un conteneur Docker et non dans les deux. Si je
trouve une solution plus élégante, je mettrai à jour ce cours.

Notre projet fil rouge va être composé de deux dossiers :

- `api`, qui va désormais contenir notre API REST en Express. Ce dossier
  contient un Dockerfile. C’est celui que nous allons utiliser pour builder
  notre application Express ET React.
- `web`, qui va contenir notre application React. Ce dossier contient un
  Dockerfile qui nous sera utile pour le prochain chapitre.

Pour l’instant, les deux éléments ne communiquent pas entre eux. C’est votre job
de le faire 🙂. Vous pouvez essayer de faire fonctionner le front et le back
avant de regarder le screencast ci-dessous. Pensez bien à faire un npm i dans
les deux dossiers.

<br>

<iframe src="https://player.vimeo.com/video/1096177902?h=d6575a760b&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" title="Screencast 16 - Découvrez les modifications apportées au projet fil rouge"></iframe>

<br>

Maintenant que vous avez découvert l’ensemble du projet. Il est temps de clore
ce chapitre avec le traditionnel exercice.

---

<br>

![Un enfant en train de s'entrainer à faire un avion en papier, pixel art](/images/cours-docker-et-docker-compose/enfant-avion-papier.webp)

## Exercez-vous

Pour rappel,
[voici la problématique](https://github.com/nx-academy/Conteneurisez-vos-applications-avec-Docker/issues/5)
que nous essayons de résoudre dans ce chapitre. Pensez bien à vous positionner
[sur la branche `partie-3/chapitre-2/section-3`](https://github.com/nx-academy/Conteneurisez-vos-applications-avec-Docker/tree/partie-3/chapitre-2/section-3).

<br>

<iframe src="https://player.vimeo.com/video/1096177977?h=22f860521c&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" title="Screencast 17 - Exercez-vous - Développez dans un environnement conteneurisé"></iframe>

<br>

Le code source contenant la solution de cet exercice se trouve
[sur la branche `partie-3/chapitre-2-fin`](https://github.com/nx-academy/Conteneurisez-vos-applications-avec-Docker/tree/partie-3/chapitre-2-fin).

---

<br>

![Un vendeur de journaux dans la rue, pixel art](/images/cours-docker-et-docker-compose/vendeur-journaux.webp)

## Résumé

- L’extension DevContainer vous permet d’allier le confort de VSCode avec celui
  de Docker. C’est un peu le meilleur des deux mondes réunis.
- Pensez bien à supprimer le volume du service api dans votre fichier
  `docker-compose`. Cela peut vous créer des problèmes de cache avec VSCode.

</article>
