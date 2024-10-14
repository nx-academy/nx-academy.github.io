---
layout: ../../layouts/CheatSheetsLayout.astro

description: Comprendre le retour de fonction en JavaScript est essentiel pour tout développeur souhaitant maîtriser ce langage. Malheureusement, ce concept crucial est souvent sous-estimé dans les tutoriels. Dans cet article, nous prenons le temps d'expliquer en profondeur comment fonctionne le mot clé « return », son utilité, et comment l'utiliser efficacement dans vos projets.
imgAlt: un jeune programmeur assis devant un ordinateur rétro, en train de coder des valeurs de retour en javaScript, pixel art
imgSrc: /jeune-programmeur-code-valeurs-retour-javascript.webp
kind: Fiche technique
level: Débutant
title: Les retours de fonction en Javascript
---

<article>

# Les retours de fonction en Javascript

![un jeune programmeur assis devant un ordinateur rétro, en train de coder des valeurs de retour en javaScript, pixel art](/public/jeune-programmeur-code-valeurs-retour-javascript.webp)

A nos débuts en Javascript après avoir compris les types de données primitifs (Number, String, Boolean, `undefined`, Null et moins fréquemment Symbol et BigInt), on a tendance à se jeter sur les fonctions et les manipuler directement sans vraiment comprendre une notion clé de ces dernières "les retours de fonctions avec le mot clé `return`.
Celà n'est pas forcément une mauvaise chose, car lorsque l'on débute, on privilégie l'essentiel et la simplicité à l'exhaustivité.
J'ai donc décidé de partager avec vous mes récentes découvertes de cette notion clé.

## Qu'est ce qu'un retour de fonction `return` ?

Un retour de **fonction** est la valeur qu'une fonction **renvoie** après son exécution. Il est représenté par le mot clé **`return`**.
Chaque fois qu'une fonction est **appelée**, elle effectue ses opérations et peut renvoyer une valeur à l'endroit où elle a été appelée.

### Qu'est ce qu'une _fonction_ et que signifie _appelée_ une fonction ?

#### Qu'est ce qu'une _fonction_ ?

Avant d'approfondir le retour de fonction, il est essentiel de comprendre ce qu'est une fonction.
Une fonction est un bloc de code réutilisable qui en général effectue une tâche spécifique.
Elle peut accepter des **arguments** (valeurs d'entrée) et peut renvoyer une **valeur** en sortie.

> **Note** : un **argument** est une valeur que vous passez à une fonction lorsqu'elle est appelée. Ces arguments permettent à la fonction d'utiliser des données pour effectuer des calculs ou des opérations spécifiques.
>
> **Exemple d'une fonction qui additionne deux nombres** :
>
> ```javascript
> function additionner(a, b) {
>   return a + b;
> }
> ```
>
> Ici, `a` et `b` sont selon la situation les **arguments ou les paramètres** de la fonction.
> NB : On parle de **paramètres** lorsqu'on **définit** une fonction pour _la première fois_ et **d'arguments** lorsqu'on _l'appel_ pour l'utiliser en lui donnant des **valeurs ou arguments**.
>
> Quand vous appelez la fonction **additionner** comme suit : `additionner(3,5);`, les **arguments** `3` et `5` sont passés à la fonction, et elle renverra la somme `8`.
>
> **Exemple d'une fonction qui accepte des arguments plus complexes, comme un tableau (Array) :**
>
> ```javascript
> function afficherElements(liste) {
>   liste.forEach((element) => console.log(element));
> }
> afficherElements(["fraise", "pomme", "orange"]);
> ```
>
> Ici, le tableau `["fraise", "pomme", "orange"]` est passé en tant **qu'argument**, et la fonction l'affiche élément par élément dans la console.

#### Que signifie _appelée_ une fonction ?

**Appeler** une fonction signifie exécuter le bloc de code qu'elle contient en lui passant les **arguments** nécessaires. Cela permet de réutiliser _le bloc de code_ sans avoir à le _dupliquer_ en reécrivant la fonction de nouveau. Vous comprendrez donc que :

1. vous **_définisser_ une fois** votre fonction
2. et qu'ensuite vous **l'appellez** ailleurs dans votre code
3. pour pouvoir l'utiliser juste avec son nom et des **arguments**
4. **arguments** avec lesquels la fonction effectuera les opérations qui lui ont été assignées lors de sa **définition**.

### Comment fonctionne le retour de fonction `return` ?

- Le mot clé **`return`"** est utilisé pour spécifier la valeur à renvoyer.
- Une fois que **`return`** est exécuté, la fonction cesse son exécution et renvoie la valeur spécifiée.
- Si aucune valeur n'est retournée ou si **`return`** n'est pas utilisé, la fonction renvoie **`undefined`** par défaut. Et c'est la principale raison pour laquelle, on peut se permettre d'ignorer le **`return`** durant nos débuts en Javascript.

> **Note sur le retour de fonction par défaut en Javascript (`undefined`)**
> Lorsque vous `définissez` une fonction en Javascript, elle **retourne toujours quelque chose**, même si vous n'utilisez pas explicitement le mot-clé `return`. Si aucun `return` n'est spécifié, Javascript retourne automatiquement `undefined`. C'est un comportement par défaut du langage, qui indique que la fonction a été exécutée, mais qu'aucune valeur explicite n'a été donnée en sortie.
>
> Si vous avez du mal à suivre, je vous invite à lire d'abord ces articles détaillés que nous vous avons préparer sur [**le type primitif `undefined`**](https://nx.academy/fiches/comprendre-le-type-undefined-en-javascript/) et [**le retour de fonction par défaut `undefined`**](https://nx.academy/fiches/comprendre-le-retour-de-fonction-par-defaut-undefined-en-javascript/) en Javascript.

### Différents types de valeurs retournées

Les fonctions peuvent renvoyer différents types de valeurs, notamment :

- **Nombres** : Un résultat numérique (ex. : `42`)
- **Chaînes de caractères** : Texte (ex. : `"Bonjour"`)
- **Objets** : Une collection de paires clé-valeur (ex. : `{ nom: "Alice", age: 25 }`)
- **Tableaux** : Une liste de valeurs (ex. : `[1, 2, 3]`)
- **Autres fonctions** : Une fonction peut retourner une autre fonction (c'est le concept de la programmation fonctionnelle).

> [En savoir plus sur la programmation fonctionnelle dans notre article dédiée](https://nx.academy/fiches/comprendre-la-programmation-fonctionnelle-en-javascript/)

### Pourquoi utiliser des retours de fonctions `return` ?

- **Réutilisation du code** : vous pouvez écrire une fonction qui effectue une tâche spécifique (ex. : additionner deux nombres) et renvoie un résultat, puis utiliser ce résultat ailleurs dans votre programme.
- **Facilitation du débogage** : les retours de fonction permettent de vérifier quelles valeurs sont produites à différents points de votre programme (ex. : récupération et traitement de données reçues d'`API`).

> [En savoir plus avec trois cas d'usages professionnels fréquents où l'on débogue plus facilement avec des retours de fonction](https://nx.academy/fiches/trois-cas-d-usages-pros-frequents-pour-deboguer-avec-des-retours-de-fonction-en-javascript/)

### Cas d'usage des retours de fonction `return` : calcul du total d'une commande pour un site e-commerce

Prenons un exemple concret pour illustrer le concept des retours de fonction en JavaScript. Imaginons que nous développons une application e-commerce et que nous avons besoin d'une fonction pour calculer le total d'une commande, incluant les taxes.

**Étape 1 : définir le problème**

- Nous devons calculer le total d'une commande en ajoutant une taxe à un prix de base (Hors Taxe - HT).
- La taxe, supposons la TVA est de 20%.

**Etape 2 : créer la fonction de calcul de la taxe**

Ecrivons une fonction qui prends le montant de la commande Hors Taxe en paramètre et retourne le montant de la taxe.

```javascript
function calculerTaxe(prixDeBase) {
  const tauxTaxe = 0.2; //20% de taxe TVA
  return prixDeBase * tauxTaxe;
}
```

**Etape 3 : créer la fonction de calcul le total Toutes Taxes Comprises (TTC)**

Cette fonction prendra le prix de base HT de la commande, calculera la taxe à l'aide de la fonction `calculerTaxe` et retournera le total TTC.

```javascript
function calculerTotalCommande(prixDeBase) {
  const taxe = calculerTaxe(prixDeBase);
  const total = prixDeBase + taxe;

  return total;
}
```

**Etape 4 : utilisation des fonctions que l'on vient de `définir`**

Supposons que le client ait une commande de 100 euros.

```javascript
const prixCommande = 100;
const totalCommande = calculerTotalCommande(prixCommande);
console.log("Le total de la commande est : " + totalCommande + " euros.");
```

**Que se passe t-il en arrière plan ?**

1. `calculerTotalCommande(100)` est `appelé`.
2. à l'intérieur de `calculerTotalCommande(100)`, `calculerTaxe(100)` est `appelé`.
3. la fonction `calculerTaxe` calcule la taxe (20 euros) et la `retourne`.
4. `calculerTotalCommande` reçoit la taxe `retournée`, l'ajoute au `prixCommande` et retourne le total TTC.
5. le total (120 euros) est affiché dans la console.

### Cas d'usage des retours de fonction `return` par défaut : vérification du prix d'une commande avant de calculer la taxe

Pour illustrer un cas d'usage où une fonction peut ne rien `retourner`, considérons un scénario où nous voulons vérifier si un montant est valide avant même de calculer la taxe.

```javascript
function calculerTaxeAvecValidation(prixDeBase) {
  // vérification si prixDeBase inférieur ou égale à 0, la fonction affiche le message dans la console et ne retourne rien
  if (prixDeBase <= 0) {
    console.log("Montant invalide.");
    return; // Ne retourne rien, donc undefined
  }

  // sinon, elle effectue les opérations ci-dessous et retourne cette fois le prix de base HT multiplié par le taux de la taxe (20%)
  const tauxTaxe = 0.2; //20% de taxe TVA
  return prixDeBase * tauxTaxe;
}
```

### Cas d'usage des retours de fonction `return` pour retourner plus d'une valeur

Pour `retourner` plusieurs valeurs, nous pouvons utiliser un `objet` ou un `tableau`. Voici un exemple avec un `objet` :

```javascript
function calculerDetailsCommande(prixDeBase) {
  const taxe = calculerTaxe(prixDeBase);
  const total = prixDeBase + taxe;
  return { taxe, total }; // Retourne un objet avec les détails
}

// Utilisation de la fonction calculerDetailsCommande
const detailsCommande = calculerDetailsCommande(100);
console.log(
  `Taxe : ${detailsCommande.taxe} euros, Total : ${detailsCommande.total} euros.`
); // Affiche dans la console : Taxe 20 euros, Total : 120 euros.
```

## Conclusion et notions clé à garder en tête :

1. **Modularité** : les fonctions sont généralement conçues pour effectuer des tâches **spécifiques** et peuvent donc être **réutilisées**.
2. **Clarté** : chaque fonction a un but clair. `calculerTaxe` calcule seulement la taxe, tandis que `calculerTotalCommande` gère le calcul du total TTC.
3. **Retours de fonction** : les fonctions **renvoient** des valeurs qui peuvent être **utilisées** par d'autres fonctions. Cela contribue à la création de programmes (application, logiciels, etc) **bien structurés et faciles à maintenir**.
4. **Utiliser un retour de fonction** quand vous avez besoin d'une **valeur** (calcul, transformation de données, validation, etc.) ou quand la **fonction doit renvoyer un état** (succès, échec).
5. **Ne pas utiliser de retour de fonction** quand la fonction a pour but de déclencher une **action directe** (comme modifier l'`interface utilisateur`, faire une requête `HTTP` ou écouter un `évènement`) sans nécessiter de valeur utilisable par la suite.

Le bon usage des retours de fonction en milieu professionnel améliore la **clarté** du code, réduit les bugs et rend le code plus **modulaire** et **maintenable**.

> Si vous vous demander comment ? Je vous recommande vivement notre article sur [quand utiliser des retours de fonction `return` ou pas dans un contexte professionnel en Javascript](https://nx.academy/fiches/quand-utiliser-des-retours-de-fonction-ou-pas-en-javascript/).

## Ressources | Allez plus loin

- [Fonctions JavaScript (FR) - MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Functions)
- [Le mot-clé "return" (FR) - MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/return)
- [JavaScript Functions (EN) - W3Schools](https://www.w3schools.com/js/js_functions.asp)
- [JavaScript Return Statement (EN) - W3Schools](https://www.w3schools.com/jsref/jsref_return.asp)

</article>
