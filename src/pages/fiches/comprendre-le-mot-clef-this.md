---
layout: ../../layouts/CheatSheetsLayout.astro

title: Comprendre le mot clef "this"
description:
  Découvrez le mot-clé 'this' en JavaScript avec des exemples concrets et
  Apprenez ses subtilités de 'this' dans différents contextes.

imgAlt: Deux personnes dans une cuisine séparée, pixel art
imgSrc: /images/cheatsheets/scene-duo-ambiance.webp

author: Lionel
kind: Fiche technique
level: Débutant
publishedDate: 08/22/2024
---

J'ai récemment été confronté à l'utilisation du mot clé this
[dans un cours sur le JavaScript sur Udemy](https://www.udemy.com/course/pro-javascript/).
Le cours proposait de réaliser un jeu de Puissance 4 en programmation orienté
objet.

Durant ce projet, je me suis particulièrement intéressé à l'utilisation des
classes et à la manière dont le mot clef "this" est géré. **Il est primordiale
de bien saisir les différences de comportement de "this" lorsqu'il est utilisé
:**

- En `mode strict` ou `mode non-strict`.
- Dans le `context global` (référence à l'objet window du navigateur), dans des
  `objets littéraux`, des `fonctions`(fléchée ou non) ou des `classes`(sucre
  synthaxique permettant leur utilisation en JS).
- Les méthodes d'instances `.call()`, `.apply()` && `.bind()`;
- Suivant son `contexte d'exécution` et son `environnement lexical`.
- Avec les `méthodes d'instance` disponible depuis `l'objet global`( p/e :
  window.addEventListener(event, callback()) ).

J'ai agrémenté mes recherches sur
[la rubrique lui étant dédiée dans la documentation du MDN Web Doc](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/this)
qui offre déjà une base pour comprendre le fonctionnement du "this".

## Pourquoi revenir sur le this en JavaScript ?

Il est souvent méconnu par certains dévéloppeurs et peut très vite poser de gros
problèmes dans l'exécution de votre code s'il n'est pas compris et implémenter
correctemment.

Qui ne s'est jamais "arraché les cheveux" après plusieurs heures de debbug suite
à une gestion incorrect de ce "merveilleux" mot clef ? 😅

Pour ma part, j'ai rencontré de grosses difficultés lors d'un de mes premiers
projets en JavaScript. Je tentais d'utiliser `this` dans un écouteur d'évènement
en utilisant une fonction fléchée. Je n'avais pas saisi la subtilité à l'époque
! Nous aborderons d'ailleurs ce point plus loin dans la fiche... !

Alors si vous êtes prêt à faire chauffer votre matière grise, préparez-vous un
bon petit café ☕ et à l'abordage !

## Les différents cas d'utilisation du this

### Utilisation de this dans le contexte Global (objet window dans le navigateur)

Quand vous créez un fichier JavaScript, même vide, et que vous le charger dans
le navigateur, cela aura un effet : **créer le contexte global, en d'autres
termes, l'objet "window", objet auquel le fameux "this" fait référence.**

Que l'on soit mode strict ou mode non strict, `this` fait référence à `window`.

Prenons comme exemple le code suivant, donné comme seule instruction dans votre
module JS :

```javascript
console.log("this is : ", this);
// ou encore
console.log("this is : ", window);
// Window {window: Window, self: Window, document: document, name: '', location: Location, …}
console.log(window === this);
// true
```

Si vous tapez ce code dans votre console du navigateur, vous obtiendrez le même
résultat pour les deux logs.

Je vous épargnes l'entièreté des méthodes composant l'objet window, retenons
simplement que dans ce contexte global, "this" fait référence à l'objet global,
"window".

Vous pouvez invoquer n'importe quelle méthode de cette objet window en utilisant
le "this", jusqu'à l'objet window lui même.

```javascript
console.log("this is : ", this.window);
// Window {window: Window, self: Window, document: document, name: '', location: Location, …}
console.log(this.document.location);
// Location {ancestorOrigins: DOMStringList, href: 'chrome-error://chromewebdata/', origin: 'null', protocol: 'chrome-error:', host: 'chromewebdata', …}
```

### Utilisation dans le cadre d'objets littéraux

> Un petit trick pour se faciliter la vie avec le "this" est de se demander ce
> qu'il y a gauche du . lorsque vous invoquez une méthode d'un objet. Lorsque
> vous appelez cette méthode, **"this" fait référence à l'objet qui précède le
> point (.) lors de l'appel de la méthode**.

Au niveau du mode strict ou mode non strict, dans le cadre des objets littéraux
par exemple, Nous aurons ici quelques différences de comportement dans certains
cas.

Déclarons tout d'abord un objet quelconque "on the fly" dans l'objet global et
attribuons lui une méthode avec deux arguments et quelques propriétés.

```js
const fluffy = {
  name: "Fluffy",
  color: "Rainbow",
  species: "Unicorn",

  sayHi(style, humor) {
    return `${this.name} the ${style} ${this.species} with the ${this.color} color and the ${humor} humor says hi !`;
  },
};

console.log(fluffy.sayHi("pretty", "bright")); // Ici, pas de différence mode strict ou non !
// Fluffy the pretty Unicorn with the Rainbow color and the bright humor says hi !
```

`this` fera référence à l'objet dans lequel il est utilisé.

Si maintenant je décide pour une raison quelconque de stocker cet appel de
méthode dans une variable, alors le comportement variera selon le mode utilisé :

```js
// Déclaration de propriétés globales
name = "Global Name";
color = "Global Color";
species = "Global Species";

console.log(fluffy.sayHi("pretty", "bright")); // Ici, toujours pas de différence mode strict ou non !
// Fluffy the pretty Unicorn with the Rainbow color and the bright humor says hi !

const fluffySayHi = fluffy.sayHi;

console.log(fluffySayHi("pretty", "bright"));
// En mode non strict: 'Global Name the Global Species with the Global Color color says hi!'
// En mode strict: 'undefined the pretty undefined with the undefined color and the bright humor says hi!'
```

> Pourquoi ce comportement ?

En mode strict, lorsque `this` n'est pas défini explicitement dans une fonction,
il reste `undefined`. Cela signifie que toutes les références à `this.name`,
`this.species` et `this.color` renvoient undefined.

En mode non strict, lorsque this n'est pas défini explicitement, il fait
référence à l'objet global (qui est window dans un navigateur). Comme les
propriétés `name`, `species` et `color` n'existent pas sur l'objet global, elles
sont donc également undefined.

> Comment y remédier ?

C'est ici qu'entre en jeu nos méthodes d'instances `.call()`, `.apply()` &&
`.bind()` ! Le choix entre .call(), .apply() && .bind() dépend de vos besoins.

## Les méthodes d'instances .call(), .apply() && .bind()

### Invoquer this à la demande avec .call()

Si vous devez faire appel une seule fois à une méthode d'instance tout en
reliant son "this" à l'objet souhaité, vous pouvez utiliser la méthode `.call()`
qui invoquera immédiatemment la fonction avec les arguments fournis. Elle prend
au minimum un paramètre, l'objet auquel vous souhaitez lier votre méthode, ainsi
qu'un nombre de paramètre supplémentaire étant fontion du nombre d'arguments
attendu par votre méthode d'instance de l'objet lié. Pour autant, Celle-ci ne
liera pas définitivement l'objet à votre méthode d'instance. Reprenons notre
exemple ci-dessus dans sa continuité :

```js
const fluffy = {
  name: "Fluffy",
  color: "Rainbow",
  species: "Unicorn",

  sayHi(style, humor) {
    return `${this.name} the ${style} ${this.species} with the ${this.color} color and the ${humor} humor says hi !`;
  },
};
const fluffySayHi = fluffy.sayHi;

fluffySayHi.call(fluffy, "pretty", "bright"); // mode strict ou non
// 'Fluffy the pretty Unicorn with the Rainbow color and the bright says hi !'
```

### Passez this et ses arguments avec .apply():

Dans un cas similaire, mais où vous souhaitez passer un tableau d'objets en
argument, c'est ici alors qu'intervient l'usage de la méthode `.apply()`. La
principale différence avec la méthode `.call()`, se situe dans la manière dont
sont passés les paramètres des méthodes d'instances liées à l'objet. Ils le sont
sous forme de tableau, mais le résultat sera identique au niveau de votre
console :

```js
fluffySayHi.apply(fluffy, ["pretty", "bright"]); // mode strict ou non
// 'Fluffy the pretty Unicorn with the Rainbow color and the bright says hi !'
```

### Fixer this pour de bon avec .bind():

Le dernier cas de figure est préconisé lorsque vous désirez lié définitivement
votre méthode d'instance au "this" de l'objet ciblé. Dans cette hypothèse, nous
utiliserons la méthode `.bind()`. Au niveau des arguments passé en paramètre à
cette méthode, `.bind()` fonctionne de la même manière que `.call()`. Au niveau
de l'invocation de la méthode, celle-ci ne l'est pas immédiatemment,
`.bind()`retourne une nouvelle fonction avec this et des arguments partiellement
appliqués, qui peut être appelée ultérieurement avec des arguments
supplémentaires.

```js
const fluffy = {
  name: "Fluffy",
  color: "Rainbow",
  species: "Unicorn",

  sayHi(style, humor) {
    return `${this.name} the ${style} ${this.species} with the ${this.color} color and the ${humor} says hi !`;
  },
};

const fluffySayHi = fluffy.sayHi.bind(fluffy);

console.log(fluffySayHi("pretty", "bright")); // mode strict ou non
// 'Fluffy the pretty Unicorn with the Rainbow color and the bright says hi !'
```

> Retenons donc jusqu'ici que le comportement du this varie en fonction du
> contexte dans lequel il est invoqué et en fonction du mode strict ou mode non
> strict. Suivant ce cas de figures, il peut y avoir une perte du "this", donc
> du contexte. Il alors indiqué d'utiliser les méthodes `.call()`, `.apply()` &&
> `.bind()` que nous venons de voir ci-dessus afin de récupérer ce qui fut perdu
> ^^ !

A présent, si votre tasse de café est vide, que la motivation est toujours là et
que vous n'avez pas perdu le fil, je vous propose de remplir votre tasse pour un
tour d'horizon des mystères "liés" au "this"... 🌌 !

## this et les fonctions fléchées :

C'est partis, je vous ais parlé plus haut (au début du blog) de
`contexte d'exécution` et `d' environnement lexical`, et bien c'est ici que cela
fera sens principalement.

> Au niveau du `contexte d'exécution`, cela fait référence à la façon dont une
> fonction est appelée et à ce à quoi "this" fait référence dans ce contexte.
> Prenons les cas suivants :

- Appel direct d'une fonction depuis `l'objet global` (window) :

Lorsque vous appelez une fonction de manière directe, this fait référence à
l'objet global (window en environnement navigateur) en mode non-strict. En mode
strict, this est undefined.

```js
function fluffy() {
  console.log(this);
}
fluffy(); // window (ou undefined en strict mode)
```

- Appel de la fonction utilisée comme constructor avec le mot clé `new`:

Dans ce cas, la subtilité, comme nous le verrons juste après avec les classes,
est que "this" fait référence à la nouvelle instance créé. Nous ne rentrerons
pas dans les détails du mot clef `new` mais ce comportement vient du fait que
son usage fait que l'objet crée par son biais, **fait hérité le prototype de la
fonction constructrice à son instance lorsqu'elle est créée**. Cela permet donc
à l'instance d'accéder aux propriétés et méthodes définies sur le prototype du
constructeur.

```js
function Unicorn(name) {
  this.name = name;
}

const fluffy = new Unicorn("Fluffy");
console.log(fluffy.name); // 'Fluffy'
```

> Au niveau de `l'environnement lexical`, cela fait référence à l'environnement
> où une fonction est définie. En particulier, les fonctions fléchées (=>) n'ont
> pas leur propre this. Elles héritent de "this" de l'environnement lexical dans
> lequel elles ont été définies.

- Les fonctions fléchées :

Les fonctions fléchées ne créent pas leur propre "this". Elles utilisent le
"this" du contexte où elles ont été définies.

```js
function Unicorn(name) {
  this.name = name;
  this.getName = () => {
    console.log(this.name);
  };
}

const fluffy = new Unicorn("Fluffy");
console.log(fluffy.name); // 'Fluffy'
const getName = fluffy.getName;
getName(); // 'Fluffy' (hérite de `this` de Unicorn)
```

- Les fonctions "normales" :

Contrairement aux fonctions fléchées, les fonctions normales créent leur propre
"this" en fonction de la façon dont elles sont appelées.

```js
function Unicorn(name) {
  this.name = name;
  this.getName = function () {
    console.log(this.name);
  };
}

const fluffy = new Unicorn("Fluffy");
console.log(fluffy.name); // 'Fluffy'
const getName = fluffy.getName;
getName(); // undefined (this n'est plus lié à l'instance de Person)
```

Nous arrivons tout doucement à la fin de ce topic, et il est temps parce que, je
ne sais pas vous, mais je commence à voir des licornes partout à force d'écrire
ces exemples de lignes de code 😜

## Concernant l'usage de this avec les classes ES6

En ES6, les classes introduisent une syntaxe plus simple et plus claire pour
créer des objets et gérer l'héritage. Le comportement de this dans les
`classes ES6` suit des règles spécifiques qui sont en grande partie similaires à
celles des `fonctions constructrices`, mais avec quelques nuances importantes.

- Les méthodes de classes && le constructeurs :

Dans les méthodes de classe && le constructeur, this fait référence à l'instance
de la classe.

```js
class Unicorn {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

const fluffy = new Unicorn("Fluffy");
console.log(fluffy.getName); // 'Fluffy'
console.log(fluffy.name); // 'Fluffy'
```

- Les fonctions fléchées dans les classes :

Les fonctions fléchées n'ont pas leur propre this. Elles héritent de this du
contexte lexical dans lequel elles sont définies. Cela s'avère particulièrement
utile dans les classes pour éviter des problèmes de contexte :

```js
class Unicorn {
  constructor(name) {
    this.name = name;
  }

  getNameArrow = () => {
    return this.name;
  };
}

const fluffy = new Unicorn("Fluffy");
const getNameArrow = fluffy.getNameArrow;
console.log(getNameArrow()); // 'Fluffy'
```

- Héritage et 'super' :

Dans ce cas, **"this" fera référence à l'instance de la SOUS-CLASSE** et pas à
la classe parente !!!

Nous avons fait le tour concernant les classes, fonctions, etc... Il nous reste
un dernier point à aborder avant de conclure...

## Comprendre le Comportement de this dans les Méthodes comme .addEventListener() et .setTimeout()

> En JavaScript, comme nous l'avons vu, la valeur de "this" peut varier **en
> fonction du contexte d'exécution**, notamment lorsqu'elle est utilisée dans
> des méthodes telles que `.addEventListener()` et `.setTimeout()`.

- "this" dans .addEventListener() :

Lorsque vous ajoutez un gestionnaire d'événements avec `.addEventListener()`,
"this" fait référence à l'élément sur lequel l'événement a été écouté.

```js
const button = document.querySelector("button");

button.addEventListener("click", function () {
  console.log(this); // Référence au bouton
  this.style.backgroundColor = "blue";
});
```

Dans cet exemple, le "this" à l'intérieur de la fonction du gestionnaire
d'événements fait référence au bouton sur lequel l'événement "click" s'est
produit.

- "this" dans .setTimeout() :

Avec `.setTimeout()`, la fonction de rappel (callback) est appelée par
l'environnement global (window dans un navigateur), ce qui signifie que "this"
fait référence à l'objet global.

```js
function sayHi() {
  console.log(this); // Référencera 'window' en mode non strict
}

setTimeout(sayHi, 1000);
```

Pour maintenir la liaison/référence du "this", vous pouvez utiliser une fonction
fléchée (arrow function) ou la méthode `.bind()`que nous avons vu plus haut ^^.

- Avec une fonction fléchée : Comme nous l'avons déjà vu, les fonctions fléchées
  ne créent pas leur propre "this", elles héritent donc de "this" du contexte où
  elles sont définies.

```js
const unicorn = {
  name: "Fluffy",
  greet: function () {
    setTimeout(() => {
      console.log(this.name); // Référencera 'Fluffy'
    }, 1000);
  },
};

person.greet();
```

- Avec .bind() :

Comme nous l'avons vu également, Vous pouvez lier explicitement this à la
fonction de rappel en utilisant bind.

```js
const unicorn = {
  name: "Fluffy",
  greet: function () {
    setTimeout(
      function () {
        console.log(this.name); // Référencera 'Fluffy'
      }.bind(this),
      1000,
    );
  },
};

person.greet();
```

---

Nous voilà arrivés à la fin de ce topic sur le mot clef "this" en JavaScript.
J'espère que le concept est désormais plus clair pour vous et que vous avez
apprécié cette exploration, ponctuée de licornes et de mystères techniques.

Gardez en tête que la maîtrise de this est essentielle pour écrire un code
JavaScript propre et efficace.

Alors, armez-vous de votre café et plongez dans vos projets avec une nouvelle
compréhension de ce petit mot si crucial !

## Ressources

- [Cours JavaScript sur Udemy](https://www.udemy.com/course/pro-javascript/)
- [Référence sur `this` - MDN Web Docs](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/this)
- [Articles JavaScript - GeeksforGeeks](https://www.geeksforgeeks.org/)
- [Guide sur `this` et l'orientation objet - JavaScript.info](https://javascript.info/object-methods#method-this)
- [Tutoriels JavaScript - Dyma](https://dyma.fr/cours/javascript)
