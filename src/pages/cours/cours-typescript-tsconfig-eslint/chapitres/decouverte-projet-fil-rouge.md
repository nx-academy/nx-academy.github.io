---
layout: ../../../../layouts/BlogPostLayout.astro

title: Développez des applications avec TypeScript - Chapitre 2 - Découvrez le projet fil rouge
description: Dans ce premier deuxième, découvrez le projet fil rouge du cours développez des application avec TypeScript. Clonez et installez le projet sur votre ordinateur (Mac et Windows).
---

# Chapitre 2 - Prenez en main le projet fil rouge 

## Découvrez le projet fil rouge

![Quelqu'un ouvrant un coffre à trésor sur un plage](/images/tresor-plage.webp)

Dans ce cours, vous allez réaliser une interface en ligne de commandes, ou CLI, de programmeurs et programmeuses connues. Cet outil vous permettra d’afficher des informations telles que l'âge, la nationalité, le compte Twitter et même les livres écrits par ces rockstars ! Certaines données sont optionnelles et d’autres sont obligatoires. **Cela va non seulement vous faire travailler la notion de type mais vous apprendre à bien les structurer**. Vous verrez quand et comment créer un alias de `type` via le mot clé type et à l’utiliser dans un autre alias.

Il est possible qu’à l’heure actuelle vous soyez un peu perdu avec le terme alias de `type`. Sachez que c’est un mot clé en TypeScript. Un alias de type en TypeScript est une manière de créer un nouveau nom pour un type existant. Il permet de donner un nom plus descriptif à un type afin de le réutiliser plus facilement et de rendre le code plus lisible.. Vous verrez dès le chapitre 1 de la partie 3 des exemples de types TypeScript. Autrement dit, pas d'inquiétude si vous ne saisissez pas tout tout de suite. On va y aller progressivement 🙂.

Grâce au projet fil rouge, vous pourrez voir une liste de développeurs mais aussi voir les détails concernant un ou une développeuse. Le code de l’application sera exécutée directement dans votre console et vous n’aurez pas besoin d’un navigateur type Firefox. Cela va vous permettre d’avoir un apprentissage simplifié. On apprend toujours mieux quand on limite le nombre d’inconnus. Si vous voulez voir un projet avec TypeScript côté navigateur, je vous invite à regarder, idéalement après avoir suivi ce cours, mon cours sur les paradigmes de programmation objet et fonctionnelle avec TypeScript.

Je vais profiter du screencast ci-dessous pour vous montrer le projet en action. À tout de suite !

<iframe src="https://www.youtube.com/embed/QItLoCcIA1s" style="width: 100%; height: 400px; border: none;"></iframe>


Pour créer les données du projet, j’ai utilisé ChatGPT. Passez par cet outil m’a fait économiser de nombreuses heures de travail fastidieuses et pas franchement intéressantes. Je vous invite [à lire le tuto que j’ai rédigé à cette occasion](https://blog.nx.academy/g%C3%A9n%C3%A9rez-un-jeu-de-donn%C3%A9es-avec-chatgpt-a82de55056e3). D’ailleurs, vous vous demandez peut-être si vous devez prendre le temps de vous former à cet outil. De mon point de vue, c’est quelque chose qui va devenir rapidement obligatoire. Avec les outils d’IA et de No Code, [le métier de développeur est actuellement en mutation](https://blog.nx.academy/d%C3%A9veloppeur-un-m%C3%A9tier-en-mutation-f1bd182e3e67). Ne voyez pas cela comme quelque chose de négatif mais apprenez plutôt à en tirer parti. Il y a tout un tas de tâches redondantes que vous allez pouvoir automatiser grâce à l’IA. Je vous prépare quelques cours à ce sujet 🙂.

Dans les deux prochaines sections, vous allez découvrir comment cloner et lancer le projet fil rouge sur MacOS puis sur Windows. Je prendrais aussi un peu de temps pour vous montrer le code généré par TypeScript.

---


## Clonez le projet fil rouge sur MacOS


![Quelqu'un travaillant devant son ordinateur avec un terminal ouvert, pixel art](/images/ordinateur-terminal-nuit.webp)

[Voici le repository GitHub](https://github.com/nx-academy/Developpez-des-applications-avec-TypeScript) contenant le projet fil rouge du cours. Vous pouvez, si vous le souhaitez, suivre les étapes d’installation et lancer le projet de votre côté.

N’hésitez pas ensuite à regarder le screencast pour aller plus loin.

<iframe src="https://www.youtube.com/embed/UhHHiytiTyc" style="width: 100%; height: 400px; border: none;"></iframe>

Le projet est maintenant installé sur votre ordinateur. Dès la prochaine partie, vous commencerez à mettre les mains dans le cambouis ! 

---

## Clonez le projet fil rouge sur Windows

![Quelqu'un travaillant devant son ordinateur avec un terminal ouvert, pixel art](/images/ordinateur-terminal-nuit.webp)

[Voici le repository GitHub](https://github.com/nx-academy/Developpez-des-applications-avec-TypeScript) contenant le projet fil rouge du cours. Vous pouvez, si vous le souhaitez, suivre les étapes d’installation et lancer le projet de votre côté.

N’hésitez pas ensuite à regarder le screencast pour aller plus loin.

<iframe src="https://www.youtube.com/embed/3qZqBgmSo8A" style="width: 100%; height: 400px; border: none;"></iframe>

Le projet est maintenant installé sur votre ordinateur. Dès la prochaine partie, vous commencerez à mettre les mains dans le cambouis ! 

---

## Contribuez !

![Une salle de classe, pixel art](/images/salle-de-classe.webp)

Il ne me reste plus qu’une chose à vous dire avant de passer à la partie dédiée à la configuration de TypeScript. Vous allez voir que les données que j’utilise pour le CLI ne comprennent que deux programmeuses et deux programmeurs. Il est possible que vous en connaissiez que vous aimeriez retrouver dans ce projet. Il est aussi possible que vous ayez envie de vous tater à l’open-source et que vous cherchiez un projet pour apprendre.

Si c’est le cas, n’hésitez surtout pas à en ajouter via une Pull Request. Non seulement, ça sera un bon cas d’utilisation pour TypeScript, mais cela vous permettra aussi d’exprimer votre voix et qu’une partie de ce cours soit un peu à vous.

Maintenant que les bases sont en place, il est temps de passer à la configuration de TypeScript et d’ESLint !

---

## Résumé

![Un vendeur de journaux dans une grande ville, pixel art](/images/vendeur-journaux.webp)


- Le projet fil rouge du cours est une application en ligne de commandes ou CLI. Ce CLI va vous permettre d’afficher dans votre console des développeurs et développeuses célèbres.

- Le projet sera codé en TypeScript puis compilé et exécuté en JavaScript. Le code JavaScript sera contenu dans le dossier dist.

- N’hésitez surtout pas à contribuer en ajoutant un ou une développeuse que 
vous aimeriez retrouver dans cette liste. Cela vous permettra de commencer à contribuer en open-source. 
