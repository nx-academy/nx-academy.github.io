---
layout: ../../layouts/CheatSheetsLayout.astro

title: Les retours de fonction en Javascript
description:
  Comprendre le retour de fonction en JavaScript est essentiel pour tout
  développeur souhaitant maîtriser ce langage. Malheureusement, ce concept
  crucial est souvent sous-estimé dans les tutoriels. Dans cet article, je
  prends le temps d'expliquer comment fonctionne le mot clé « return » et son
  utilité.

imgAlt:
  un jeune programmeur assis devant un ordinateur rétro, en train de coder des
  valeurs de retour en javaScript, pixel art
imgSrc: /images/cheatsheets/jeune-programmeur-code.webp

kind: Fiche technique
level: Débutant
author: Oumar
publishedDate: 10/18/2024
---

<article>

# Les retours de fonction en Javascript

![un jeune programmeur assis devant un ordinateur rétro, en train de coder des valeurs de retour en javaScript, pixel art](/images/cheatsheets/jeune-programmeur-code.webp)

A nos débuts en Javascript après avoir compris les types de données primitifs
(Number, String, Boolean, undefined et Null), on a tendance à se jeter sur les
fonctions et les manipuler directement sans vraiment comprendre une notion clé
de ces dernières les retours de fonctions avec le mot clé `return`.

Celà n'est pas forcément une mauvaise chose, car lorsque l'on débute, on
privilégie l'essentiel et la simplicité à l'exhaustivité. J'ai donc décidé de
partager avec vous mes récentes découvertes de cette notion clé.

## Qu'est ce qu'un retour de fonction ?

**Un retour de fonction est la valeur qu'une fonction renvoie après son
exécution**. Il est représenté par le mot clé `return`.

Chaque fois qu'une fonction est appelée, elle effectue ses opérations et peut
renvoyer une valeur à l'endroit où elle a été appelée.

## Qu'est ce qu'une fonction ?

Avant d'approfondir le retour de fonction, il est essentiel de comprendre ce
qu'est une fonction. Une fonction est un bloc de code réutilisable qui en
général effectue une tâche spécifique.

**Elle peut accepter des arguments(valeurs d'entrée) et peut renvoyer une valeur
en sortie**.

Un argument est une valeur que vous passez à une fonction lorsqu'elle est
appelée. Ces arguments permettent à la fonction d'utiliser des données pour
effectuer des calculs ou des opérations spécifiques.

```javascript
function additionner(a, b) {
  return a + b;
}
```

Dans la fonction ci-dessus, `a` et `b` sont selon la situation les arguments ou
les paramètres de la fonction.

> NB : On parle de paramètres lorsqu'on définit une fonction pour la première
> fois et d'arguments lorsqu'on l'appelle pour l'utiliser en lui donnant des
> valeurs ou arguments.

Quand vous appelez la fonction additionner, par exemple `additionner(3,5);`, les
arguments `3` et `5` sont passés à la fonction et elle renvoit la somme `8`.

```javascript
function afficherElements(liste) {
  liste.forEach((element) => console.log(element));
}
afficherElements(["fraise", "pomme", "orange"]);
```

Ici, le tableau `["fraise", "pomme", "orange"]` est passé en tant qu'argument.
La fonction l'affiche élément par élément dans la console.

## Que signifie appelée une fonction ?

Appeler une fonction signifie exécuter le bloc de code qu'elle contient en lui
passant les arguments nécessaires. Cela permet de réutiliser le bloc de code
sans avoir à le dupliquer en reécrivant la fonction de nouveau.

Autrement dit,

- vous définisser votre fonction une fois
- ensuite vous l'appellez dans votre code
- avec son nom et des arguments
- arguments avec lesquels la fonction effectuera les opérations qui lui ont été
  assignées lors de sa définition.

## Comment fonctionne le retour de fonction `return` ?

Le mot clé `return` est utilisé pour spécifier la valeur à renvoyer. Une fois
que `return` est exécuté, la fonction cesse son exécution et renvoie la valeur
spécifiée.

Si aucune valeur n'est retournée ou si `return` n'est pas utilisé, la fonction
renvoie `undefined`.

**C'est la principale raison pour laquelle on peut se permettre d'ignorer le
`return` durant nos débuts en Javascript.**

> Note sur le retour de fonction par défaut en Javascript (`undefined`) Lorsque
> vous `définissez` une fonction en Javascript, elle retourne toujours quelque
> chose, même si vous n'utilisez pas explicitement le mot-clé `return`.
>
> Si aucun `return` n'est spécifié, Javascript retourne automatiquement
> `undefined`. C'est un comportement par défaut du langage, qui indique que la
> fonction a été exécutée, mais qu'aucune valeur explicite n'a été donnée en
> sortie.

## Différents types de valeurs retournées

Les fonctions peuvent renvoyer différents types de valeurs et notamment :

- Nombres - un résultat numérique (ex. : `42`)
- Chaînes de caractères - du texte (ex. : `"Bonjour"`)
- Objets - une collection de paires clé-valeur (ex. :
  `{ nom: "Alice", age: 25 }`)
- Tableaux - une liste de valeurs (ex. : `[1, 2, 3]`)
- autres fonctions - une fonction peut retourner une autre fonction (c'est le
  concept de la programmation fonctionnelle).

## Découvrez un cas d'usage

Prenons un exemple concret pour illustrer le concept des retours de fonction en
JavaScript. Imaginez que nous développiez une application e-commerce et que vous
ayiez besoin d'une fonction pour calculer le total d'une commande, taxes
incluses..

### Étape 1 : définir le problème

- Nous devons calculer le total d'une commande en ajoutant une taxe à un prix de
  base (Hors Taxe - HT).
- La taxe, supposons la TVA est de 20%.

### Etape 2 : créer la fonction de calcul de la taxe

Ecrivons une fonction qui prends le montant de la commande Hors Taxe en
paramètre et retourne le montant de la taxe.

```javascript
function calculerTaxe(prixDeBase) {
  const tauxTaxe = 0.2; //20% de taxe TVA
  return prixDeBase * tauxTaxe;
}
```

### Etape 3 : créer la fonction de calcul le total Toutes Taxes Comprises (TTC)

Cette fonction prendra le prix de base HT de la commande, calculera la taxe à
l'aide de la fonction `calculerTaxe` et retournera le total TTC.

```javascript
function calculerTotalCommande(prixDeBase) {
  const taxe = calculerTaxe(prixDeBase);
  const total = prixDeBase + taxe;

  return total;
}
```

### Etape 4 : utilisation de nos fonctions calculerTaxe et calculerTotalCommande

Supposons que le client ait une commande de 100 euros.

```javascript
const prixCommande = 100;
const totalCommande = calculerTotalCommande(prixCommande);
console.log("Le total de la commande est : " + totalCommande + " euros.");
```

### Que se passe t-il en arrière plan ?

- `calculerTotalCommande(100)` est appelé.
- à l'intérieur de `calculerTotalCommande(100)`, `calculerTaxe(100)` est appelé.
- la fonction `calculerTaxe` calcule la taxe (20 euros) et la retourne.
- `calculerTotalCommande` reçoit la taxe retournée, l'ajoute au prixCommande et
  retourne le total TTC.
- le total (120 euros) est affiché dans la console.

## En bref

- Les fonctions sont généralement conçues pour effectuer des tâches spécifiques
  et peuvent donc être réutilisées.
- Chaque fonction a un but clair. `calculerTaxe` calcule seulement la taxe
  tandis que `calculerTotalCommande` gère le calcul du total TTC.
- Les fonctions renvoient des valeurs qui peuvent être utilisées par d'autres
  fonctions. Cela contribue à la création de programmes (application, logiciels,
  etc) bien structurés et faciles à maintenir.
- Utiliser un retour de fonction quand vous avez besoin d'une valeur (calcul,
  transformation de données, validation, etc.) ou quand la fonction doit
  renvoyer un état (succès, échec). 5- Ne pas utiliser de retour de fonction
  quand la fonction a pour but de déclencher une action directe sans nécessiter
  de valeur utilisable par la suite.

## Ressources | Allez plus loin

- [Fonctions JavaScript (FR) - MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Functions)
- [Le mot-clé "return" (FR) - MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/return)
- [JavaScript Functions (EN) - W3Schools](https://www.w3schools.com/js/js_functions.asp)
- [JavaScript Return Statement (EN) - W3Schools](https://www.w3schools.com/jsref/jsref_return.asp)

</article>
