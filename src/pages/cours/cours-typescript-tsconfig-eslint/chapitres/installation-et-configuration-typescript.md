---
layout: ../../../../layouts/BlogPostLayout.astro

title: Chapitre 3 - Installez et Configurez TypeScript - Développez des applications avec TypeScript.
description: Dans ce troisième chapitre, vous installerez TypeScript grâce à npm. Vous verrez ensuite comment configurer le fichier tsconfig.json.
---

# Chapitre 3 - Installez et configurez TypeScript

Avant de poursuivre la lecture de ce chapitre, veuillez vous mettre _[sur la branche partie-2/chapitre-1-debut](https://github.com/nx-academy/Developpez-des-applications-avec-TypeScript/tree/partie-2/chapitre-1-debut)_. En plus de cette branche, nous allons utiliser [cette issue GitHub](https://github.com/nx-academy/Developpez-des-applications-avec-TypeScript/issues/1) comme problématique. Je vous invite à en prendre connaissance avant de passer à la lecture du chapitre.

## Installez TypeScript avec npm

La première chose à faire est d’installer TypeScript. En effet, TypeScript n’est pas installé par défaut sur votre ordinateur. Pour installer TypeScript, vous aurez besoin de [NodeJS](https://nodejs.org/en). Quand vous installez NodeJS sur votre ordinateur, que vous soyez sur Pc ou Mac, vous installez le package manager npm.

**On sert le plus souvent d’un package manager pour installer les librairies d’un programme**. On appelle souvent ces librairies des dépendances et on traduit le package manager en français comme un gestionnaire de dépendances (ou gestionnaire de paquets). Ce type d’outil vous permet non seulement d’installer des librairies mais aussi de les mettre à jour. Sachez que quand vous installez une librairie, elle contient souvent elle-même des librairies qui contiennent elles-mêmes des librairies. Le rôle du package manager sera donc de gérer les relations entre vos dépendances et d’installer les bonnes versions de celle-ci. C’est mine de rien un boulot assez conséquent !

**Le principe du package manager n’est pas exclusif au JavaScript**. Quasiment tous les langages de programmation en utilisent un. En effet, vous allez souvent passer par des librairies pour éviter d’avoir à réinventer la roue sur chacun de vos programmes. Python utilise principalement [pip](https://pypi.org/project/pip/), Rust utilise [Cargo](https://doc.rust-lang.org/cargo/), Php utilise [Composer](https://getcomposer.org/), etc. D’ailleurs, les OS (Windows, MacOS, Linux) ont aussi leur propre package manager : Windows a [Chocolatey](https://chocolatey.org/), MacOS a [Homebrew](https://brew.sh/) et Linux en a de nombreux différents (apt, yum, etc.) en fonction de la distribution.

Pendant longtemps, avant l'avènement de NodeJS et npm, la gestion des dépendances en JavaScript ressemblait un peu au far west. On utilisait souvent des Content Delivery Networks (CDNs) pour inclure des bibliothèques externes, ajoutant manuellement des balises `<script>` dans le code HTML. Il existait aussi des systèmes de build et des outils de gestion de tâches comme Grunt et Gulp qui apportaient une certaine forme d'organisation.

Il y aussi eu quelques tentatives de créer des gestionnaires de paquets spécifiques à JavaScript, comme Bower. Ils s'occupaient les dépendances front-end. C'était certes moins élégant et systématique que les solutions modernes avec npm. Cela dit, ces méthodes permettaient de garder un semblant d'ordre.

**Dans ce chapitre, vous allez installer une seule librairie : TypeScript**. Vous allez la récupérer sur le site de Npm. Vous pouvez jeter un œil [à sa documentation officielle](https://www.npmjs.com/package/typescript) avant d’aller plus loin.


![La page de TypeScript sur le site de npm](/images/typescript-npm.png)


Je vais vous demander d’installer TypeScript comme une dépendance de développement. À savoir une dépendance qui ne sera présente que durant l’environnement de développement et non en environnement de production. Ce qui fait assez sens au final : je vous ai dit au début du cours que TypeScript était avant tout pour la DX. Vous utilisez TypeScript pendant que vous programmez un projet et non lorsqu’il est en production.

<br />

Ouvrez votre terminal, placez vous dans le répertoire du projet et tapez :


```shell
npm install -D typescript@5.1.3
```

<br />


**Cette commande va installer TypeScript dans sa version 5.1.3**. Elle va vous créer plusieurs fichiers et un dossier.

- un fichier `package.json` - cet élément central va non seulement contenir toutes les dépendances que votre projet utilise mais aussi des scripts (nous verrons ça à la fin du chapitre) et des informations globales à votre projet (son nom, sa version, etc.)

- un fichier `package-lock.json` - cet autre élément central vous permet de gérer les versions des librairies installées. En somme, quand votre ordinateur installe une librairie pour la première fois, il va faire un certain nombre de calculs pour vérifier que ces librairies sont compatibles entre elles.

- un dossier `node_modules` - ce dossier comprend toutes les librairies de votre projet. C’est un fichier qui est souvent dans votre `.gitignore`. 


J’ai conscience que je suis en train de vous lâcher pas mal d’informations. Si vous connaissez déjà l’écosystème JavaScript, ça devrait normalement aller. Cela dit, pour ceux et celles qui ne le connaissent pas vraiment, ça peut faire beaucoup. Je vous ai donc prévu un screencast dédié à l’installation de TypeScript. 

Le code source correspond à la fin de ce screencast se trouve sur la branche _[partie-2/chapitre-1/section-1](https://github.com/nx-academy/Developpez-des-applications-avec-TypeScript/tree/partie-2/chapitre-1/section-1)_.


## Configurez TypeScript avec le fichier tsconfig.json

Maintenant que TypeScript est installé sur votre ordinateur, il est temps de passer à sa configuration et notamment à celle de son transpileur. Souvenez-vous, TypeScript est un langage transcompilé. Votre code TypeScript va être transpilé en JavaScript pour pouvoir ensuite être exécuté. **Le rôle du fichier `tsconfig.json` est donc de gérer les règles de transcompilation du TypeScript vers le JavaScript**.

Grâce à ce fichier, vous allez par exemple pouvoir :

- préciser les fichiers et/ou dossiers à transcompiler ;
- supprimer les commentaires de code ;
- ajouter des règles de “Type Checking”, pour, par exemple, ne pas autoriser les types `any`;
- transcompiler en une version précise de JavaScript.

C’est un fichier qui peut contenir beaucoup d’informations comme le montre la documentation officielle. Vous n’avez pas à tout retenir mais plus à comprendre ce qui, et ne peut pas, être fait. **Pour vous aider, on va voir un premier exemple de fichier `tsconfig.json` et je vais le décrypter pour vous**.

<br />

Jetez un œil au snippet de code ci-dessous.

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "noImplicitAny": true,
    "removeComments": true,
    "sourceMap": true
  },
  "files": [
    "core.ts",
    "sys.ts",
    "types.ts",
    "scanner.ts",
    "parser.ts",
    "utilities.ts",
    "binder.ts",
    "checker.ts",
    "emitter.ts",
    "program.ts",
    "commandLineParser.ts",
    "tsc.ts",
    "diagnosticInformationMap.generated.ts"
  ]
}
```

<br />

Je vais vous présenter point par point ce que fait ce fichier dans le screencast ci-dessous. Vous pouvez prendre des notes si vous le souhaitez mais sachez que je vous ai préparé un résumé de ce que j’ai dit juste après.

# VIDEO

Si on résume :

- Le fichier `tsconfig.json` plus haut comprend deux grands blocs : `compilerOptions`, dont le rôle est de gérer les règles de transcompilation de TypeScript vers JavaScript, et `files`, dont le rôle est de spécifier une liste de fichiers TypeScript qui vont être inclus dans le programme.

- L’option `module` sert à préciser le système de modules que vous souhaitez avoir dans votre programme. Pour faire simple, côté TypeScript, vous utiliserez les mots clés `export` et `import` pour respectivement importer des bouts de code, des fonctions ou même des classes entre vos fichiers. C’est quelque chose qu’on verra ensemble dans la partie 3. Grâce à l’option `module`, vous pourrez donc spécifier les règles d’export. Vous pouvez d’or et déjà jeter un œil à cette partie de la documentation sur les modules.

- L’option `noImplicitAny` vous aide à définir si vous autorisez les types `any` dans votre code. Nous reviendrons sur ce type bientôt mais sachez qu’un type `any` correspond à un type qui n’a pas de type défini. Autrement dit, cela peut être un nombre, une chaîne de caractères, etc. TypeScript est un langage fortement typé et utilisé un type `any` revient en quelque sorte à faire un anti-pattern. **C’est clairement quelque chose qu’on veut éviter**.

- L’option `removeComments` supprime les commentaires de code quand le code TypeScript est transcompilé en JavaScript. Cela peut sembler contre intuitif mais souvenez-vous que vous n’avez pas à toucher au code JavaScript : vous codez en TypeScript désormais.

- L’option `sourceMap` indique si vous souhaitez ou non générer un fichier de source. **Ce type de fichier vous aide principalement à déboguer du code**. Vous serez capable de voir de quel fichier TypeScript le code buggé provient. En vrai, c’est quelque chose de super utile !

<br />

Maintenant que vous avez pris en main le navigateur, il est temps de se lancer dans la compilation. Ça tombe bien, les prochains lignes sont dédiées à ça.

Courage, vous n’êtes plus très loin de la fin de ce chapitre 🙂. 


## Lancez des commandes spécifiques à TypeScript

Avant d’aller plus loin, je vais vous demander de créer deux fichiers.

<br />

Un fichier `tsconfig.json` : 

```json
{
  "compilerOptions": {
	"module": "CommonJS"
  },
  "files": [
	"app.ts"
  ]
}
```

<br />


Et un fichier `app.ts` :

```typescript
function sayHello() {
  console.log("Hello!")
}

sayHello()
```

<br />

Créez ces deux fichiers à la racine du projet. Vous ne devriez pas forcément avoir de difficultés à comprendre ce que font les deux fichiers. **Il ne vous reste maintenant plus qu’à lancer le transcompilateur TypeScript**. La bonne nouvelle, c’est qu’il est déjà installé sur votre projet. **Il se trouve dans le répertoire `node_modules`**.

## Exercez-vous

Pour rappel, [voici la problématique](https://github.com/nx-academy/Developpez-des-applications-avec-TypeScript/issues/1) que nous essayons de résoudre dans ce chapitre.


Le code source contenant la solution de cet exercice se trouve sur la branche _[partie-2/chapitre-1-fin](https://github.com/nx-academy/Developpez-des-applications-avec-TypeScript/tree/partie-2/chapitre-1-fin)_.

## Résumé

- Le compilateur TypeScript s’installe grâce à Npm. Npm est un package manager Node.JS. C’est un outil qui vous permet d’installer et de mettre à jour les librairies facilement sur un projet.

- Les `devDependencies` correspondent à des dépendances/librairies de développement. Autrement dit, ce sont des librairies que vous utiliserez uniquement quand vous programmez un projet et non quand il sera en production sur un serveur.

- Le fichier `tsconfig.json` a pour objectif de compiler le code TypeScript en code JavaScript. C’est ici que vous allez préciser dans quelle version de TypeScript vous souhaitez exporter votre code.

- N’oubliez pas que les `node_modules` correspondent aux librairies installées dans votre projet. Vous trouverez aussi à l’intérieur des exécutables dans le dossier `.bin`. 
