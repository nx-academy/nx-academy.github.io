---
layout: ../../layouts/CheatSheetsLayout.astro

title: Comprendre l'asynchrone en JavaScript
description: Explorez le fonctionnement de l'asynchrone en JavaScript. Apprenez les concepts clés comme les promesses, les callbacks, et async/await pour écrire un code efficace et non-bloquant. Découvrez des exemples pratiques pour maîtriser l'asynchronisme en développement web.
imgAlt: Une personne multitâche au bureau avec un symbole de boucle infinie, pixel art
imgSrc: /asynchrone_js.webp
---

<article>

# Comprendre l'Asynchrone en JavaScript 🚀

![Une personne multitâche au bureau avec un symbole de boucle infinie, pixel art](/asynchrone_js.webp)


## JavaScript est-il asynchrone ? ⏱️

Cela va peut-être en surprendre certains, mais non ! JavaScript est bel et bien synchrone ! Il est également **Single-Threaded** 🪡, ce qui signifie qu'il fonctione sur un seul thread(fil). Concrètement, mis à part les parties de code encapsulée dans un scope contenant du traitement asynchrone, le reste de la pile d'exécution sera traité directement et sans interruption par JavaScript. L'asynchrone lui, sera géré en parallèle...

## Qu'est-ce que l'asynchronisme en JavaScript ? 🤔

L'asynchronisme en JavaScript, c'est un peu comme commander une pizza 🍕 (Miam!). Vous passez votre commande, et au lieu de rester planté devant la porte du pizzaiolo, vous allez regarder Netflix 🎬, finir cet exo d'algorithmie sur Codewars  💻, ou même faire un petit somme 🛌. Quand la pizza est prête, on sonne à votre porte, et hop, vous pouvez manger ! 🍽️

En JavaScript, c'est pareil : vous lancez une opération (comme récupérer des données d'une API), et pendant que le JavaScript attend la réponse, il peut faire d'autres choses. Dès que la réponse arrive, il reprend l'exécution là où il s'était arrêté.

> ... Les explications suivantes sont un peu plus techniques 🛠️ et approfondies 🌌 sans être indispensable à une compréhension globale de l'asynchrone. Cependant, si vous êtes intéressé par ces précision , votre perception sur le sujet n'en sera que meilleure ! Alors si vous êtes partant, GO se préparer un petit café ☕ and let's dive deeper ! 🕳️

### Alors comment cela est-il possible ? 🔦

#### L'Event Loop : Le Cœur de l'Asynchrone en JavaScript 🔄

Dans le navigateur ou Node.js en ce qui concerne l'asynchrone, tout se passe au niveau de l'**Event Loop**(boucle infinie permettant de gérer tous les évènements asynchrone) et de la **Callback Queue**(fonctionnant un peu comme une `Stack`). 

L'**Event Loop** surveille constamment 🕯️ la **Call Stack**(pile d'exécution) la **CallBack Queue**(file d'attente des callbacks).

> Son rôle est de vérifier si la **Call Stack** est vide et ensuite de pousser les fonctions de la **Callback Queue** vers la **Call Stack** pour les exécuter.

#### La Call Stack 📚

Elle est utilisée pour gérer l'exécution des fonctions de manière synchrone. 

Les fonctions sont ajoutées au sommet de la pile pour être exécutées et sont retirées après leur exécution.

#### La Callback Queue 📥

Lorsque des opérations asynchrone (comme les timers, les requêtes AJAX, ou les évènements d'interface utilisateur) sont terminées, leurs callbacks correspondants sont placés dans la **CallBack Queue** pour y être traitées.

> La **Callback Queue** fonctionne selon le principe FIFO (First In, First Out): Le premier arrivé est le premier servi, comme à la pizzéria 🍕 !

#### Et pour finir, l'Exécution Asynchrone ⏳

Une fois que la **Call Stack** est vide, l'**Event Loop** prend le premier callback de la **Callback Queue** et l'exécute en l'ajoutant à la **Call Stack**.

Cela permet à JavaScript de gérer les tâches asynchrones sans bloquer l'exécution du code synchrone.

> Exemple simple...

```javascript
// La callback est placée dans la Callback Queueu après 1 seconde
setTimeout(() => {
    console.log("Ce message est affiché après 1 seconde");
}, 1000);

// Lorsque la réponse est reçue, la callback associée est placé dans la Callback Queue pour y être exécutée.
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => {
      console.log("Réponse AJAX reçue :", data);
    })
    .catch(error => {
        console.error("Erreur lors de la requête AJAX :", error);
    });
// Traitement synchrone ==> directement traité sur la pile d'exécution
console.log("Ce message est affiché immédiatement, avant les callbacks");
```

## Pourquoi l'asynchronisme est-il important ? 🌟

Maintenant, imaginez un monde où à chaque fois que vous envoyez un message, vous devez attendre une réponse avant de pouvoir faire autre chose. Super ennuyeux, non ? En JS, l'asynchronisme permet de :

- **Garder l'interface réactive** : Les utilisateurs peuvent continuer à cliquer sur des boutons et faire défiler des pages pendant que des tâches se déroulent en arrière-plan.
- **Gérer les opérations longues** : Comme les appels réseau, les requêtes à des bases de données, etc. Cela évite que votre application ne gèle comme un PC sous Windows 95 🧊.

## Les Trois Mousquetaires de l'asynchronisme en JavaScript 🏇🏽

1. **Callbacks** 🏴‍☠️ : Les callbacks sont les vétérans du JS asynchrone. Ce sont des fonctions qui sont passées en argument à d'autres fonctions et sont appelées lorsque l'opération asynchrone est terminée. Cependant, ils peuvent entraîner le redouté *callback hell* 🔥😱 (un cauchemar de code imbriqué).

   ```javascript
   console.log('Commander une pizza');
   setTimeout(() => {
       console.log('Pizza livrée !');
   }, 3000); // Attend 3 secondes (3000 millisecondes)
   console.log('Regarder une série en attendant');
   ```

2. **Promises** 🎁 : Les promises, c'est comme un engagement de livraison 📦. Elles permettent d'enchaîner des actions asynchrones de manière plus propre et de gérer les erreurs plus facilement. Avec les promises, fini le *callback hell*, bonjour les .then() enchaînés !

   ```javascript
   let commanderPizza = new Promise((resolve, reject) => {
       setTimeout(() => {
           resolve('Pizza livrée !');
       }, 3000);
   });

   commanderPizza
       .then(message => {
           console.log(message);
           console.log('Manger la pizza');
       })
       .catch(error => {
           console.log('Erreur : ', error);
       });
   ```

3. **async/await** 🕶️ : Si les promises sont cool, alors `async/await` est le maître du cool. Cela permet d'écrire du code asynchrone qui ressemble presque à du code synchrone. Fini les `.then()`, et bienvenue à un code plus lisible et facile à suivre.

   ```javascript
   async function commanderPizzaEtManger() {
       console.log('Commander une pizza');
       try {
           let message = await commanderPizza;
           console.log(message);
           console.log('Manger la pizza');
       } catch (error) {
           console.log('Erreur : ', error);
       }
   }

   commanderPizzaEtManger();
   console.log('Regarder une série en attendant');
   ```

## En résumé 📝

L'asynchronisme en JavaScript, c'est comme être multitâche sans devenir fou. Il permet d'effectuer des opérations lentes en arrière-plan sans bloquer tout le reste. Grâce à `callbacks`, `promises`, et `async/await`, on a les outils pour gérer les opérations asynchrones de manière efficace et propre. Et voilà, à vous les pizzas et le code fluide ! 🍕💻

## Ressources

- [Guide sur l'Asynchronisme en JavaScript - MDN Web Docs](https://developer.mozilla.org/fr/docs/Learn/JavaScript/Asynchronous)
- [Tutoriel JavaScript : Promises, Async/Await - JavaScript.info](https://javascript.info/async)
- [Vidéo sur l'Event Loop et l'Asynchronisme - YouTube](https://www.youtube.com/watch?v=8aGhZQkoFbQ) (Talk de Philip Roberts)
- [Comprendre l'Asynchronisme avec les Callbacks, Promises et Async/Await - FreeCodeCamp](https://www.freecodecamp.org/news/asynchronous-javascript-explained/)
- [Documentation officielle de Node.js sur l'Event Loop](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)
- [L'Event Loop en profondeur - Blog de Jake Archibald](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
- [Différences entre les callbacks, les promises et async/await - Blog de Flavio Copes](https://flaviocopes.com/javascript-async-await/)
- [JavaScript: The Good Parts - Eloquent JavaScript (Chapitre sur les Promises)](https://eloquentjavascript.net/11_async.html)
- [Exploration de l'Event Loop avec des exemples interactifs - Loupe](http://latentflip.com/loupe/)

 </article>
