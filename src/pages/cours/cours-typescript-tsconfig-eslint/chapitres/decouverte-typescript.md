---
layout: ../../../../layouts/BlogPostLayout.astro

title: Développez des applications avec TypeScript - Chapitre 1 - Découvrez TypeScript
description: Dans ce premier chapitre, découvrez les raisons de la popularité avec TypeScript. Comprenez son évolution au travers du temps et le terme de DX.
---

# Chapitre 1 - Découvrez TypeScript

## TypeScript, un superset du JavaScript

![Un superhéros en haut d'un immeuble, pixel art](/images/superhero.webp)

Le 1er octobre 2012, Microsoft annonce officiellement TypeScript par le biais d’Anders Hejlsberg. Pour la petite histoire, Anders Hejlsberg est un programmateur danois qui a notamment écrit le Turbo Pascal et le Delphi dans les années 80/90. Après plus de deux ans de développement en interne, Microsoft publie (on dit aussi release) la première version publique de TypeScript.

Vous pouvez jeter un œil à l’[annonce officielle](https://web.archive.org/web/20121003001910/https://blogs.msdn.com/b/somasegar/archive/2012/10/01/typescript-javascript-development-at-application-scale.aspx). Vous n’avez pas forcément besoin de tout lire ou de tout regarder : la vidéo dure plus de 50 minutes et TypeScript a évolué depuis. Ce qui est important ici, c’est la vision derrière la création de TypeScript.

<br />

![La page d'accueil de TypeScript](/images/typescript-homepage.png)

<br />

**TypeScript a été conçu pour pallier à des “lacunes” du JavaScript, notamment dans le développement et la maintenance d’applications**. Sachez ici qu’on ne parle pas de “petites” applications mais d'importants projets avec plusieurs dizaines voire centaines de contributeurs.

Si on remet le tout en perspective, TypeScript est sorti quelques années après NodeJS. NodeJS est sorti en 2009 et Express, le framework le plus utilisé en NodeJS en 2010. **On a eu donc au début des années 2010 un essor du JavaScript. C’était le fameux JavaScript everywhere**. Le problème, c’est qu’à force de l’utiliser, de nombreux ingénieurs, issus principalement d’autres langages de programmation tels que le Java ou le C#, se sont aperçus des faiblesses du JavaScript. Ici, on parle notamment du typage dynamique du JavaScript et de type safety (le fait de pouvoir changer le type d’une variable durant l'exécution d’un programme).

Il est important de comprendre que le JavaScript avait des faiblesses et qu’il était en train de devenir très populaire. Microsoft a donc proposé TypeScript pour structurer le langage et le rendre plus utilisable sur des projets d’envergure.

TypeScript est une version du JavaScript “sous hormone”. Autrement dit, c’est un renforcement, ou superset, du langage existant. Votre code TypeScript va être transcompilé en JavaScript pour être interprété par un navigateur web ou un runtime JavaScript. Pour info, en informatique, un transcompilateur (on dit aussi transpileur) est un type de compilateur. On prend le code source d’un langage de programmation et on le compile vers un autre langage de programmation. C’est grâce au transcompilateur de TypeScript qu’on peut exporter vers une version précise du JavaScript, l’ES2015 ou l’ES2022 par exemple. Vous verrez comment configurer le compilateur dans la partie 2.

Il existe quelques “concurrents” à TypeScript, tels que Flow et CoffeeScript mais ils restent aujourd’hui assez mineurs. **La majeure partie de la communauté JavaScript a effectué sa transition vers TypeScript**. Connaître TypeScript est donc aujourd’hui indispensable.

En octobre 2022, Microsoft a publié un billet sur son blog pour fêter les dix ans du TypeScript. Pour être honnête, le blog post en lui-même n’est pas très intéressant mais vous pouvez y jeter un œil en diagonale 🙂. Je vous invite par contre à lire cet article : il donne un bon complément d’information sur l’histoire de TypeScript et ses étapes importantes.

En octobre 2023, Microsoft a sorti un documentaire sur TypeScript. Vous pouvez le trouver ci-dessous !  

<iframe src="https://www.youtube.com/embed/U6s2pdxebSo" style="width: 100%; height: 400px; border: none; margin-bottom: 36px;"></iframe>

---

## À quelle problématique TypeScript répond ?

![Quelqu'un réflechissant sur un canapé](/images/homme-reflexion.webp)

Si vous avez déjà suivi l’un des mes cours, les prochaines lignes ne devraient pas vous surprendre. Quand j’apprends à utiliser un nouvel outil, un nouveau framework ou un nouveau langage, je me pose régulièrement la question : **“à quelle problématique cet outil ou ce langage tente de répondre ?”**. Non seulement, cela accélère mon apprentissage mais cela me permet de contextualiser l’information et la connaissance.

Si vous ne l’avez pas déjà fait, prenez le temps de vous poser la question avant d’aller plus loin. Profitez en pour vous boire un café ou un thé.

<img src="/images/homme-cafe.webp" alt="Un homme buvant un café assit dans un fauteuil, pixel art" style="height: 300px; width: auto; object-fit: contain; display: block; margin-left: auto; margin-right: auto; margin-top: 36px; margin-bottom: 36px;" />

Pendant longtemps, j’ai eu du mal à comprendre l’utilité de TypeScript.

**En effet, même si vous codez en TypeScript, l’environnement d'exécution, le fameux runtime, reste du JavaScript**. Ainsi toutes les déclarations de type pour vos variables ou vos fonctions disparaissent à la transcompilation. On reviendra dessus dans la prochaine section mais c’était clairement un problème pour moi. J’ai continué à me documenter et à lire des articles concernant TypeScript. Au fil de mes recherches, j’ai compris que la problématique résolue par TypeScript était d’un autre ordre : elle touchait à la DX.

DX signifie Developer Experience. C’est un concept qui s’est au cours des dernières années imposé comme central dans le monde de la programmation. 


[Selon cet excellent article de Red Hat](https://www.redhat.com/architect/developer-experience), on définit la DX comme :

> Les intéractions et sentiments qu’éprouve un ou une développeuse lorsqu’il ou elle travaille une base de code. Vous pouvez vous représenter la DX comme l'expérience utilisateur (l’UX) spécifiquement pour les développeurs.


La DX est avant tout liée au code et à la qualité de ce dernier. Autrement dit, à quel point le code est utilisable, compréhensible et n’est pas source de frustration. Vous avez tous des exemples dans votre vie de tous les jours où la DX n’a pas été à la hauteur de vos attentes. Imaginez que vous travaillez avec une librairie, par exemple, pour gérer des dates. Vous installez la librairie via Npm ou Yarn puis vous l'importez dans l’un de vos fichiers et commencez à travailler avec. Seulement, voilà, cette librairie n’a pas une documentation très détaillée, il manque des exemples concrets et le code source lui-même n’est pas très compréhensible. Au final, vous perdez de nombreuses heures à essayer de la faire fonctionner et finissez frustré(e). Vous venez de faire face à une mauvaise DX.

TypeScript est donc avant tout un outil de DX. Il va vous servir à documenter naturellement votre code via le typage. Il va aussi vous permettre d’éviter des erreurs communes. Par exemple, si une fonction retourne une valeur optionnelle, TypeScript va vous avertir de vérifier que la valeur retournée existe avant de réaliser un traitement. Vous aurez toujours des bugs dans votre code. Mais, d’une part, vous aurez moins, et d’autre part, vous aurez un code plus robuste.

Regardez l’exemple de code ci-dessous. 

```typescript
function makeSum(a: number, b?: number): number | void {
  if (b) {
    return a + b
  }

  return
}
```

**Ce code, écrit en TypeScript, contient de nombreuses informations** :

- a et b sont des nombres.
- b est un paramètre optionnel.
- La fonction `makeSum` retourne soit un nombre, soit ne retourne rien.


Essayez de changer la valeur de retour de la fonction et écrivez `string` au lieu de `number`.


```typescript
function makeSum(a: number, b?: number): string | void {
  if (b) {
    return a + b
  }

  return
}
```


Vous devriez avoir un message d’erreur de VsCode : `Type 'number' is not assignable to type 'string | void'.ts(2322)`.

**Le typage de la fonction, sa valeur de retour et le message d’erreur sont des éléments qui participent à la DX**. Ces éléments vont vous aider à faire votre métier plus sereinement. Cela dit, il y a quand même quelques limites à TypeScript.

---

## Quelles sont les limites de TypeScript ?

![Des personnes faisant face à un mur, pixel art](/images/personnes-devant-mur.webp)

Je vous ai déjà un peu parlé de cette notion de runtime un peu plus haut dans ce chapitre. C’est pour moi LA limitation principale à l’utilisation de TypeScript.

**En effet, même si votre environnement de développement utilise TypeScript, c’est bel et bien du JavaScript qui est exécuté en bout de chaîne**. Vous allez écrire votre code en TypeScript puis il va être transcompilé en JavaScript. Puis votre code sera soit interprété par votre navigateur, soit par NodeJS. Dans un sens, vous reviendrez donc dans les “travers” du JavaScript. Exit le typage fort par exemple ou la type safety.

**L’une des autres limites majeures de TypeScript est son côté “verbeux”**. On dit souvent qu’un langage ou un framework est “verbeux” quand une tâche ou une action à réaliser demande d’écrire plus de lignes de code qu’avec un autre langage ou framework. Par exemple, on dit souvent que le Java a un code verbeux, en comparaison du Python, parce qu’il demande de créer et de coder plus de fichiers pour réaliser la même action. Pour prendre un autre exemple, Redux, une célèbre librairie côté React, a souvent été considérée comme très verbeuse.

Cela dit, **la “verbosité” a aussi des avantages**. Le principal est le côté descriptif du code. Chaque variable, chaque objet et chaque étape sont ainsi décrits précisément.

Une dernière chose. Pendant longtemps de nombreuses librairies de l’écosystème JavaScript n'étaient pas passées en TypeScript. Cela peut sembler insignifiant dit comme ça mais c’était un véritable problème. Au moment d’installer une librairie, pour gérer des dates ou des modales par exemple, vous deviez typer vous-mêmes la librairie pour la rendre “TypeScript friendly”. C’est quelque chose qui pouvait prendre énormément de temps à l’époque. Heureusement, TypeScript s’est petit à petit imposé dans l’écosystème JavaScript. Toutes les librairies majeures ainsi que les nouvelles librairies qui se créent incorporent par défaut TypeScript et les fameux `@types`.

C’est un écosystème vivant et vous pouvez facilement en faire partie !

---

## L’écosystème autour de TypeScript

![Une ville de nuit ressemblant à New York, pixel art](/images/ville-nuit.webp)

TypeScript est un langage open-source. Cela signifie que son code source est consultable par toutes et par tous sur Internet. [Voici le repository GitHub officiel de TypeScript](https://github.com/microsoft/TypeScript). Vous pouvez y jeter un œil si vous le souhaitez pour suivre la roadmap et connaître les prochaines versions. Cela dit, ce n’est pas forcément un repository sur lequel vous allez pouvoir contribuer facilement.

**Si vous souhaitez contribuer dans le monde de l’open-source lié à TypeScript, je vous invite à regarder [le repository DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)**. Ce projet a pour objectif de créer les fichiers de types pour chacune des librairies de l’écosystème JavaScript/TypeScript. Cela peut non seulement vous permettre de rentrer dans le monde de l’open-source via un projet “simple” mais aussi de monter en compétences niveau code et niveau TypeScript. Si le monde de l’open-source vous intéresse, Je vous invite aussi à regarder ce repo. Il recense des projets open-source sur lesquels vous pouvez contribuer 🙂.

TypeScript a donc largement influencé l’écosystème JavaScript. **Aujourd’hui, la plupart des projets et des frameworks intègrent nativement le TypeScript**. Je vous invite par exemple à regarder du côté de Nest. Ce framework back-end pour NodeJS utilise aujourd’hui TypeScript par défaut. Pour info, je vous prépare un cours pour la rentrée 2023 dessus 🙂.

---

## Résumé

![Un vendeur de journaux dans une grande ville, pixel art](/images/vendeur-journaux.webp)


- TypeScript est un langage développé par Microsoft au début des années 2010. Il y a bien eu quelques concurrents, Flow et CoffeeScript, mais TypeScript s’est imposé aujourd’hui comme un standard dans l’écosystème JavaScript.

- TypeScript est un superset du JavaScript. Il permet d’ajouter des types au JavaScript et améliore ainsi la robustesse du code. Il permet d’augmenter la DX : le quotidien des programmeurs lorsqu’ils ou elles codent.

- N’oubliez pas que le TypeScript n’est pas exécuté côté NodeJS ou navigateur : c’est toujours du JavaScript qui est exécuté. 


[Passez au prochain chapitre](/cours/cours-typescript-tsconfig-eslint/chapitres/decouverte-projet-fil-rouge)

