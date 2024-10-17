---
layout: ../../layouts/CheatSheetsLayout.astro

description: Cet article démystifie le type `undefined` en Javascript, essentiel pour éviter les bugs et créer des applications robustes. Nous allons explorer ses différences avec `null`, les bonnes pratiques pour le gérer efficacement et comment comprendre son utilisation dans les API et les objets complexes. Maîtriser `undefined` vous permettra d'améliorer la qualité et la maintenabilité de votre code. Et en passant vous éviter d'affreuses migraines.
imgAlt: Développeurs collaborant sur un code JavaScript autour du concept undefined en pixel art
imgSrc: /collaborating-on-undefined-pixel-art.webp
kind: Fiche technique
level: Débutant
title: Comprendre le type undefined en Javascript
---

<article>

# Comprendre le type undefined en Javascript

![Développeurs collaborant sur un code JavaScript autour du concept undefined en pixel art](/public/collaborating-on-undefined-pixel-art.webp)

Maîtriser le type `undefined` en Javascript est crucial pour tout développeur qui souhaite créer des applications robustes et éviter des bugs subtils. Pourtant, ce concept est souvent négligé, surtout par les développeurs moins expérimentés. Combien de fois avons nous rencontré des erreurs ou des comportements inattendus dans notre code simplement parce qu'une variable ou une propriété n'avait pas de valeur définie ?

Dans cet article, nous allons démystifier ce type si particulier qu'on retrouve dans tous les programmes. Nous explorerons en profondeur comment `undefined` se manifeste dans Javascript, quelles sont les différences avec le type `null` (souvent confondu) et quelles bonnes pratiques adopter pour le gérer efficacement. Que vous travailliez sur des API, que vous manipuliez des objets complexes, ou que construisiez des interfaces utilisateurs réactives, comprendre comment et quand le type `undefined` apparaît vous permettra de produire un code plus propre et plus maintenable.

En appliquant ces connaissances, vous pourrez éviter des erreurs courantes et améliorer significativement la robustesse de vos projets professionnels. Let's go ! 😉🚀

## Introduction au type `undefined`

En Javascript, `undefined` est un type primitif qui représente l'absence de valeur assignée à une variable ou à une `propriété` d'objet [en savoir plus avec notre article sur les propriétés d'objets en Javascript](). C'est l'un des sept (7) types primitifs en Javascript, aux côtés de `string`, `number`, `boolean`, `symbol`, `bigint` et `null`.

## Définition et caractéristiques du type `undefined`

- **Type primitif** : `undefined` est un type primitif distinct.
- **Valeur par défaut** : si une variable est _déclarée_ mais non _initialisée_, sa valeur par défaut est `undefined`.
- **Unique** : il n'existe qu'une seule valeur possible pour ce type.

```javascript
let variableNonInitialisée; //c-a-d un contenant (pot) à qui l'on a pas attribué de contenu
console.log(variableNonInitialisée); // va afficher et contiendra `undefined`
```

## Différences entre `undefined` et `null`

Bien que `undefined` et `null` représentent tous deux l'absence de valeur, ils sont utilisés différemment :

1. `undefined` :

   - Indique qu'une variable a été _déclarée_ mais n'a pas encore reçu de valeur (initialisée) ;
   - Est retourné par défaut lorsqu'une fonction ne retourne rien _explicitement_ (comprenez lorsqu'on ne lui attribue pas explicitement un `return`) ;
   - Indique l'absence d'une propriété dans un `objet` **[lire notre fiche technique dédiée au objet en Javascript]()**.

2. `null` :

- Utilisé pour représenter délibérement l'absence de valeur ;

  > **Ex.** lorsqu'une valeur n'est pas encore connue ou n'existe pas, `null` est utilisé pour remplir cette cellule. Par exemple, si tu gères une base de données de clients et que certains champs comme "numéro de téléphone" ne sont pas obligatoires, les cellules correspondantes aux clients sans numéro peuvent être définies à `null` pour indiquer qu'il n'y a pas de valeur.
  >
  > **Mais pourquoi faire ?**
  >
  > Disons que votre entreprise souhaite analyser les données de ses clients. Si certains clients n'ont pas fourni leur numéro de téléphone (donc la valeur est `null`), cette information peut aider l'entreprise à comprendre qui n'a pas encore fourni ces détails et peut déclencher des actions comme envoyer des rappels. De même, lors de la prise de décision, savoir qu'une valeur est null peut orienter les choix faits par les responsables en montrant des lacunes ou des besoins spécifiques.
  >
  > **Retenez ceci**
  >
  > `undefined` signifie qu'une variable a été _déclarée mais n'a pas encore reçu de valeur_, tandis que `null` est utilisé pour indiquer _explicitement l'absence d'une valeur_. Dans le contexte d'une base de données, `null` est souvent préféré parce qu'il clarifie l'intention : on dit que la valeur est _volontairement vide_, pas juste _non définie ou oubliée_.
  >
  > Avec `undefined`, il serait plus difficile de savoir si l'absence de valeur est _intentionnelle_ ou un _oubli_, ce qui pourrait fausser les analyses ou les décisions prises en se basant sur ces valeurs.

- Souvent assigné à une variable pour réinitialiser sa valeur ou indiquer qu'elle est vide.

  > **Ex** : c’est très utile pour éviter les erreurs lors de l’exécution des requêtes, permettant à votre programme (code, application, script) de distinguer entre une valeur _non initialisée_ et une valeur _intentionnellement vide_.

```javascript
let a;
let b = null;

console.log(a); //undefined
console.log(b); //null
```

## Comment `undefined` est généré

Plusieurs scénarios peuvent produire une valeur `undefined`, voilà les plus fréquents :

1. **Variables non initialisées :**

```javascript
let x;
console.log(x); // x = `undefined`
```

2. **Fonctions sans `return` explicite :**

```javascript
function maFonction() {
  //instructions à exécuter par la fonction...
}
console.log(maFonction()); // la fonction renvoie `undefined`
```

3. **Accès à des propriétés inexistantes :**

```javascript
const obj = { nom: "Alice" };
console.log(obj.age); // renvoie `undefined` car la propriété "age" n'existe pas sur cet objet
```

4. **Indices inexistants dans les tableaux :**

```javascript
const tableau = [1, 2, 3];
console.log(tableau[5]); // renvoie undefined car souvenez vous l'index des tableaux commencent à 0 et ici on à les index 0, 1 et 2 mais pas 5.
```

5. **Arguments non passés à une fonction qui l'attend**

```javascript
function saluer(nom) {
  console.log(`Bonjour, ${nom}`);
}

saluer(); // renvoie "Bonjour, `undefined`" car vous n'avez pas passer l'argument "nom" qui est attendu par la fonction.
```

## Vérifier si une valeur est `undefined`

Pour déboguer vos programmes, vous aurez aussi souvent besoin de vérifier si une valeur est `undefined`, on aborde les différentes méthodes, ci-dessous :

1. **Opérateur `typeof` :**

```javascript
if (typeof variable === "undefined") {
  console.log(variable); // renvoie `undefined`
}
```

2. **Comparaison stricte :**

```javascript
if (variable === undefined) {
  console.log(variable); // renvoie aussi `undefined`
}
```

3. **Opérateur de comparaison abstraite (moins recommandé en raison de la possibilité de coercition) :**

```javascript
if (variable == null) {
  // Vérifie si "variable" est `null` ou `undefined`
  console.log(variable); // renvoie `null` ou `undefined`.

  // Note : l'opérateur de comparaison abstraite (==) est moins recommandé en raison de la possibilité de coercition.
  // On aurait pu vérifier avec `undefined` mais il faudrait être sûr que la variable ne puisse être que `undefined`.
  // Sinon, il faudrait deux vérifications comme suit : variable === null || variable === undefined, ce qui est moins concis.
}
```

> **Rappel sur la coercition :**
>
> La coercition, c'est quand JavaScript convertit automatiquement les types de données pour que les valeurs soient comparables. Par exemple, si tu compares une chaîne de caractères et un nombre :
>
> ```javascript
> console.log("5" == 5); // renvoie true car on utilise l'opérateur de comparaison abstraite et obligeons Javascript à rendre comparables deux types de données à la base différents.
>
> // Ici, JavaScript convertit la chaîne '5' en nombre 5, puis compare les deux. Cela peut parfois créer des bugs inattendus, c’est pourquoi il faut faire attention!
> // Exemple de bugs inatendus :
> console.log(false == 0); // renvoie true au lieu de false car false est converti en 0 par Javascript. Comprenez que la coercition sous entends qu'un boolean (false) est égal à un nombre (0). Ce qui poserait problème car l'on sait qu'on utilise souvent les booléens (true/false) pour vérifier des conditions strictes pour passer à la suite de notre programme ou pas.
> if (false == 0) {
>   console.log("Bug: condition évaluée à true"); // peut causer des comportements inattendus si vous oubliez la conversion automatique de Javascript (coercition)
> }
> // JavaScript convertit false en 0, ce qui peut entraîner des bugs
> ```

## Les bonnes pratiques pour gérer `undefined`

1. **Initialiser les variables :**

Il est recommandé de toujours initialiser les variables avec une valeur par défaut pour éviter les surprises liées à `undefined`.

```javascript
// Une variable qui doit recevoir un nombre (compteur) :
let compteur = 0; // on l'initialise à 0

// Une variable qui doit recevoir du texte (nom) :
let nom = ""; // on l'initialise en chaîne vide
```

2. **Utiliser des valeurs par défaut dans vos fonctions :**

Avec les paramètres par défaut introduit depuis ES6 (2015).

```javascript
function saluer(nom = "Invité") {
  console.log(`Bonjour, ${nom}`);
}

saluer(); // renvoie "Bonjour, Invité" au lieu de `undefined` malgré qu'on ai n'a pas passer d'argument "nom" à la fonction lors de son utilisation (dans le jargon, on dit aussi qu'on appel ou qu'on invoque la fonction)
```

3. **Vérifier l'existence des propriétés :**

Dans l'idéal, il est très recommandé de toujours vérifier l'existence des propriétés d'objets avant de les utiliser dans son programme.

```javascript
if (obj && obj.propriete) {
  console.log(obj.propriete); // On vérifie l'existence de l'obj puis de la propriété avant d'éxecuter le bloc de code entre {}
}
```

4. **Utiliser l'opérateur de coalescence nulle `??` :**

Il a été introduit dans ES2020 pour fournir une valeur par défaut si la valeur est `null` ou `undefined`.

```javascript
let nom = utilisateur.nom ?? "Anonyme"; // renvoie "Anonyme" par défaut lorsqu'on le nom de l'utilisateur est  `null` ou `undefined`.
```

## Cas d'usage courants en milieu professionnel

1. **Gestion des paramètres de fonction :**

Lorsque vous créez des fonctions réutilisables, il est courant de gérer des paramètres qui peuvent ne pas être fournis.

Dans l'exemple ci-dessous, _options_ est un objet qui peut contenir plusieurs paramètres, comme taille et couleur.

La ligne _options = {}_ signifie que si aucun objet _options_ n'est passé en _argument_, un objet vide sera utilisé par défaut.
Ensuite, l'opérateur de coalescence nulle ?? est utilisé pour fournir des valeurs par défaut aux propriétés de _options_ si elles sont `null` ou `undefined`.

```javascript
function configurer(options = {}) {
  const taille = options.taille ?? 10; // Si options.taille est `null` ou `undefined`, taille sera 10
  const couleur = options.couleur ?? "bleu"; // Si options.couleur est `null` ou `undefined`, couleur sera "bleu"
  // ...etc.
}
```

2. **Traitement des réponses d'API :**

Lorsque tu fais des requêtes à une API, il se peut que certaines propriétés des données reçues soient absentes ou non définies.

```javascript
fetch(
  "/api/utilisateur"
    .then((response) => response.json())
    .then((data) => {
      const email = data.email ?? "Email non fourni";
      console.log(email);
    })
);
```

> **Note :**
> à lire uniquement si vous n'êtes pas à l'aise avec la fonction ci-dessus. Sachez aussi que vous pouvez utiliser async await avec les blocs try catch qui est plus fréquent dans du code moderne :
>
> fetch('/api/utilisateur') : envoie une requête à l'API à l'URL spécifiée.
>
> .then(response => response.json()) : prend la réponse de l'API (normalement en format JSON) et la transforme en un objet JavaScript utilisable.
>
> .then(data => { ... }) : une fois que les données sont converties en objet JavaScript, cette fonction est exécutée avec cet objet comme argument. Souvenez vous des fonctions fléchées anonymes ou arrow fonction qu'on note comme suit "=>".
>
> À l'intérieur de ce dernier .then, on utilise l'opérateur de coalescence nulle (??). Cet opérateur renvoie la valeur de gauche si elle n'est pas `null` ni `undefined`, sinon il renvoie la valeur de droite.
>
> Donc, const email = data.email ?? "Email non fourni"; signifie :
>
> Si data.email est défini (c'est-à-dire pas null ni undefined), alors email prendra cette valeur.
>
> Si data.email est null ou undefined, alors email prendra la valeur "Email non fourni".
>
> Enfin, console.log(email); affiche la valeur de email dans la console.
>
> Pratique, non ? Cela évite d'avoir des erreurs lorsque des propriétés manquent dans les réponses API.

3. **Structures conditionnelles :**

Vous pouvez utiliser `undefined` pour contrôler le flux de votre application.

```javascript
let utilisateurActif;

if (utilisateurActif === undefined) {
  // Rediriger automatiquement vers la page de connexion
}
```

4. **Validation de données :**

Vous pouvez utiliser `undefined` pour vérifier si certaines données sont présentes avant de procéder à la suite de votre programme.

```javascript
function enregistrerProduit(produit) {
  if (produit.nom === undefined) {
    throw new Error("Le nom du produit est requis.");
  }

  // ...Ensuite enregistrer le produit
}
```

5. **Optimisation de la mémoire (moins courant mais bon à savoir) :**

En réinitialisant des variables à `undefined`, vous signalez au ramasse-miettes (garbage collector du moteur JavaScript) que la mémoire peut potentiellement être libérée si ces variables ne sont plus nécessaires.

```javascript
let grandObjet = {
  /*... les propriétés de l'objet*/
};
// Après utilisation
grandObjet = undefined;
```

Noter tout de même que réinitialiser des variables à `undefined` pour la gestion de la mémoire n'est pas si fréquent dans un cadre professionnel. Les moteurs JavaScript modernes sont assez efficaces pour gérer la mémoire de manière autonome. C'est plus souvent dans les situations où tu manipules des objets de grande taille ou des ressources intensives que tu devrais explicitement gérer la mémoire. Toutefois, pour des performances optimales, il est toujours bon de comprendre comment fonctionne la gestion de la mémoire avec par exemple, le type `undefined`.

## Les pièges courants avec `undefined` et comment les éviter

1. **Confusion entre `undefined` et `null` :**

Comme mentionné précédemmment, bien

2. **Utilisation incorrecte de l'opérateur `==` :**

Souvenez vous les résultats inatendus en raison de la coercitionde type.

```javascript
console.log(undefined == null); // renvoie true
console.log(undefined == 0); // renvoie false
```

Vous l'avez compris, privilégiez toujours l'opérateur `===` pour éviter des surprises.

3. **Déclaration globale non intentionnelle :**

Oublier le mot clé `var`, `let` ou `const` peut créer _une variable globale implicite_, ce qui peut-être `undefined`.
En d'autres termes, cela signifie que la variable est automatiquement ajoutée à l'objet global (`window` dans les navigateurs), ce qui peut causer des bugs difficiles à diagnostiquer.

```javascript
function mauvaiseFonction() {
  variableGlobale = "Je suis globale"; // Mauvaise pratique
}
```

Dans l'exemple ci-dessus, `variableGlobale` n'a pas été déclarée avec `var`, `let` ou `const`. Par conséquent, JavaScript crée une _variable globale accessible partout dans ton code_. Cela peut poser des problèmes car d'autres parties de ton code peuvent modifier cette variable par inadvertance, ce qui conduit à des comportements imprévisibles.

Pour éviter cela, tu devrais toujours déclarer tes variables avec `var`, `let` ou `const` :

```javascript
function bonneFonction() {
  let variableLocale = "Je suis locale"; // Bonne pratique
}
```

Cela crée une variable locale qui n'est accessible qu'à l'intérieur de la fonction `bonneFonction`.

4. **Accès à des propriétés imbriquées :**

Quand tu accèdes à des propriétés imbriquées dans un objet en JavaScript, il y a un risque que certaines de ces propriétés n'existent pas, ce qui peut entraîner des erreurs. Par exemple, essayer d'accéder à `utilisateur.adresse.ville` quand `adresse` est `undefined` déclenche une erreur car JavaScript ne peut pas lire une propriété sur `undefined`.

Pour éviter cela, utilise l'opérateur d'accès optionnel (`?`). Cet opérateur vérifie d'abord si la propriété existe avant d'essayer d'y accéder. Si `adresse` est `undefined` ou `null`, il renverra `undefined` au lieu d'essayer d'accéder à `ville` et de générer une erreur. Cela agit comme un garde-fou.

Imagine un portail verrouillé : tu vérifies d'abord s'il est ouvert (si `adresse` existe) avant de passer (accéder à `ville`). S'il est fermé (`undefined` ou `null`), tu t'arrêtes et dis simplement _"Portail fermé"_ (`undefined`) sans essayer de forcer le passage (ce qui générerait une erreur).

```javascript
const utilisateur = {};

// Erreur si on essaye d'accéder  directement à "utilisateur.adresse.ville" en faisant :
const ville = utilisateur.adresse.ville;
// Utilisez plutôt l'opérateur d'accès optionnel (?.)
const ville = utilisateur.adresse?.ville;
```

Cet opérateur rend le code plus robuste et évite les erreurs inattendues lorsqu'on manipule des objets complexes ou dont la structure peut varier.

Voilà, vous en savez suffisamment pour naviguer dans vos projets sans vous arracher les cheveux (ou du moins en économisant quelques mèches). 😉

## Ressources | Allez plus loin

- [Type undefined (FR) - MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/undefined)
- [JavaScript undefined (EN) - W3Schools](https://www.w3schools.com/jsref/jsref_undefined.asp)
- [Undefined in JavaScript (EN) - GeeksforGeeks](https://www.geeksforgeeks.org/undefined-in-javascript/)
- [All you need to know about keyword ‘Undefined’ in JavaScript (EN) - Medium](https://medium.com/@pruthvimandaliya007/all-you-need-to-know-about-keyword-undefined-in-javascript-02562952fc22)
- [null et undefined (EN) - web.dev](https://www.geeksforgeeks.org/undefined-in-javascript/)
- [Beginner’s Guide: Dealing with Undefined in JavaScript (EN) - Medium](https://medium.com/front-end-weekly/beginners-guide-dealing-with-undefined-in-javascript-d98ac7e413db)

</article>
