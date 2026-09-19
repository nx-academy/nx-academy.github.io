---
layout: ../../layouts/CheatSheetsLayout.astro

title: "Tokens, contexte et coût : comment estimer la facture ?"
description:
  "Une facture de modèle, c’est un nombre de tokens multiplié par deux tarifs.
  On voit comment un texte devient des tokens, pourquoi une conversation coûte
  de plus en plus cher à mesure qu’elle avance, les quatre postes qui font
  exploser une addition, et la méthode pour estimer un coût avant d’écrire la
  première ligne."

imgAlt:
  Un compteur électrique mécanique dont les roues défilent, branché sur une pile
  de feuilles de texte, pixel art
imgSrc: /images/cheatsheets/tokens-contexte-et-cout.webp

author: Thomas Dimnet
github: tdimnet
kind: Fiche technique
serie: ia
tags:
  - IA
  - Production
  - Coût
level: Intermédiaire
publishedDate: 11/16/2026

faq:
  - question: Comment sont facturés les tokens d’un LLM ?
    answer:
      "À deux compteurs distincts. Tout ce que vous envoyez au modèle est
      facturé en tokens d’entrée, tout ce qu’il répond en tokens de sortie, et
      les deux tarifs ne sont pas les mêmes — la sortie coûte généralement
      plusieurs fois l’entrée. L’unité facturée n’est donc ni la requête, ni le
      mot, ni le caractère, mais le fragment de texte issu du découpage du
      modèle."
  - question:
      Pourquoi une longue conversation avec un LLM coûte-t-elle de plus en plus
      cher ?
    answer:
      "Parce qu’un modèle n’a aucune mémoire entre deux appels. Pour qu’il ait
      l’air de suivre, l’application lui renvoie à chaque tour les instructions
      de départ et l’historique complet des échanges. Le contexte facturé
      grossit donc à chaque tour, et le coût total d’une conversation croît avec
      le carré du nombre de tours, pas avec le nombre de tours."
  - question: Comment estimer le coût d’une application qui utilise un LLM ?
    answer:
      "En quatre étapes : écrire un appel représentatif du pire cas réaliste, en
      compter les tokens d’entrée et de sortie avec le tokenizer du fournisseur,
      multiplier par le nombre de requêtes attendues sur la période, puis
      multiplier séparément par les deux tarifs affichés le jour de
      l’estimation. Les tarifs changent, la méthode non."
---

Une facture de modèle ressemble beaucoup à une facture cloud : personne ne la
regarde vraiment avant le jour où elle surprend. J’ai raconté ailleurs
[les 40 € d’un mois où je n’avais rien fait](/drafts/le-cloud-est-il-vraiment-moins-cher)
— un environnement de test éteint, mais dont le disque et les sauvegardes
tournaient toujours.

<br>

La mécanique est la même ici, avec une difficulté en plus : le compteur tourne
sur quelque chose qu’on ne voit pas. Une machine allumée, ça se repère dans une
console. Du texte réexpédié en silence à chaque appel, non.

<br>

Cette fiche suit [le pilier du dossier](/drafts/comprendre-les-llm), qui a posé
le mot « token » sans le creuser. **Vous n’y trouverez aucun tarif.** Les prix
au million de tokens changent plusieurs fois par an ; la manière de les
multiplier, non. C’est elle qu’on installe ici.

---

## Le token est l’unité facturée

Un modèle ne manipule ni des mots ni des caractères, mais des **tokens** : des
fragments de texte issus d’un découpage statistique. C’est cette unité-là qui
est comptée, à l’entrée comme à la sortie.

<br>

La règle de pouce, pour un ordre de grandeur rapide : **un token vaut à peu près
trois à quatre caractères**, et un texte français consomme environ une fois et
demie ce que consomme le même texte en anglais, parce que les découpages sont
appris sur des corpus massivement anglophones.

<br>

Ce que ça donne concrètement :

| Ce qu’on envoie                   | Ordre de grandeur, en tokens |
| --------------------------------- | ---------------------------- |
| Une question courte               | quelques dizaines            |
| Un mail                           | 200 à 400                    |
| Une page A4 en français           | 700 à 900                    |
| Un fichier source de 300 lignes   | 3 000 à 5 000                |
| La documentation d’une petite API | 20 000 à 50 000              |
| Un roman de 300 pages             | 200 000 et plus              |

<br>

**Ces chiffres sont des ordres de grandeur, pas une table de conversion.** Le
découpage exact dépend du modèle, et deux modèles de familles différentes ne
comptent pas pareil. Pour un vrai chiffre, il n’y a que deux méthodes fiables :
passer le texte dans le tokenizer publié par le fournisseur, ou lire le compte
que l’API vous renvoie après coup. On y revient à la fin de cette fiche.

---

## Entrée et sortie ne se facturent pas au même tarif

C’est le premier piège, et il est purement arithmétique : il n’y a pas un
compteur, il y en a deux.

<br>

- **Les tokens d’entrée** : tout ce que vous envoyez. Les instructions système,
  l’historique, les documents joints, la question.
- **Les tokens de sortie** : tout ce que le modèle produit.

<br>

La sortie coûte typiquement **plusieurs fois** l’entrée. Ce n’est pas un détail
de facturation, c’est ce qui décide quelles tâches sont bon marché et lesquelles
ne le sont pas :

- **classer, extraire, router, trier** — beaucoup d’entrée, trois mots de
  sortie. Ces tâches-là sont étonnamment peu chères, même sur de gros volumes ;
- **rédiger, traduire, résumer en long, générer du code** — la sortie pèse, et
  c’est elle qui fait la facture.

<br>

D’où un réflexe à prendre tout de suite : **plafonnez toujours la sortie.** Le
paramètre existe chez tous les fournisseurs, il s’appelle en général
`max_tokens`, et c’est le seul point d’arrêt matériel du côté de la génération.
Sans lui, une boucle mal fermée ou un prompt ambigu peut produire un pavé que
personne ne lira et que vous paierez intégralement.

---

## Le contexte est renvoyé en entier à chaque tour

Voici le mécanisme qui explique la majorité des factures qui surprennent, et il
découle directement du pilier : **un modèle n’a aucune mémoire entre deux
appels.**

<br>

Pour qu’une conversation ait l’air de se tenir, l’application réexpédie à chaque
tour les instructions de départ, tous les échanges précédents et la nouvelle
question. Le modèle relit tout, à chaque fois. Et **tout ce qu’il relit est
refacturé.**

<br>

Prenons une conversation ordinaire : un prompt système de 800 tokens, des
questions de 100 tokens, des réponses de 400.

| Tour | Entrée facturée | Sortie | Entrée cumulée depuis le début |
| ---- | --------------- | ------ | ------------------------------ |
| 1    | 900             | 400    | 900                            |
| 2    | 1 400           | 400    | 2 300                          |
| 3    | 1 900           | 400    | 4 200                          |
| 5    | 2 900           | 400    | 9 500                          |
| 10   | 5 400           | 400    | 31 500                         |
| 20   | 10 400          | 400    | 113 000                        |

<br>

Regardez la dernière ligne. Au vingtième tour, **un seul aller-retour coûte onze
fois le premier**, et la conversation entière en a coûté cent vingt-cinq fois.
Formulé autrement, et c’est la phrase à retenir de cette fiche :

> Le coût d’une conversation ne croît pas avec le nombre de tours, il croît avec
> le **carré** du nombre de tours.

<br>

Deux conséquences pratiques tombent de là. La première : une interface qui
n’offre aucun moyen de repartir de zéro est un piège à facture, et le bouton
« nouvelle conversation » est une optimisation de coût autant qu’un confort. La
seconde : au-delà de la fenêtre de contexte, quelque chose est jeté — vous payez
alors le maximum pour un modèle qui commence justement à oublier le début.

---

## Les quatre postes qui font exploser une addition

### 1. Le prompt système gras, multiplié par le nombre d’appels

Un prompt système de 2 000 tokens sur un service qui traite 50 000 appels par
jour, ce sont **100 millions de tokens d’entrée quotidiens** avant que le
moindre utilisateur ait posé une question.

<br>

La règle qui en découle est désagréable mais utile : **une phrase ajoutée au
prompt système n’est pas gratuite, elle est facturée autant de fois qu’il y a
d’appels.** Les instructions s’accumulent vite, souvent pour corriger un
comportement observé une fois. Relisez-les de temps en temps, comme on relit un
`Dockerfile` qui a grossi.

### 2. La boucle d’agent

Un agent enchaîne des tours tout seul : il appelle un outil, reçoit un résultat,
décide de la suite. Chaque tour ajoute au contexte l’appel **et** son résultat —
qui peut être une réponse d’API de plusieurs milliers de tokens.

<br>

C’est exactement le tableau précédent, à ceci près que ce n’est plus vous qui
décidez du nombre de tours. C’est le sujet entier de
[la prochaine fiche](/drafts/comprendre-les-agents-ia).

### 3. Le RAG mal découpé

Brancher un modèle sur vos documents suppose de lui en envoyer des morceaux.
Vingt extraits de 1 000 tokens passés « au cas où », ce sont 20 000 tokens
d’entrée à chaque requête, pour une question qui en tient trente.

<br>

Le réflexe « on en met plus, ça ne peut pas nuire » est faux deux fois : ça
coûte, et **ça dégrade la réponse**. Un contexte bien rangé vaut mieux qu’un
contexte plein.

### 4. Ce que personne ne compte

Le poste invisible, et souvent le plus vexant : les essais pendant le
développement, les tentatives relancées après une réponse mal formée, et surtout
**les tests automatisés qui appellent le vrai modèle à chaque poussée de code**.

<br>

Une suite de tests branchée sur une API facturée, déclenchée par une CI qui
tourne trente fois par jour, c’est une ligne de facture que personne n’a
décidée. Enregistrez les réponses une fois et rejouez-les, gardez les vrais
appels pour une poignée de tests lancés à la demande.

---

## Estimer avant d’écrire la première ligne

La bonne nouvelle, c’est que tout ce qui précède se réduit à une multiplication.
En quatre étapes.

<br>

1. **Écrivez un appel représentatif**, en vrai. Pas un exemple de
   documentation : votre prompt système réel, un document de taille réaliste,
   une question plausible. Et prenez le **pire cas raisonnable**, pas le cas
   moyen — c’est le pire cas qui remplit les factures.
2. **Comptez-le.** Le tokenizer du fournisseur avant l’envoi, ou le compte
   renvoyé par l’API après. Séparez bien entrée et sortie.
3. **Multipliez par le volume.** Nombre de requêtes par jour, nombre de jours.
   Si ce sont des conversations, utilisez le cumul du tableau plus haut, pas le
   coût d’un tour isolé.
4. **Multipliez par les deux tarifs**, séparément, tels qu’ils sont affichés le
   jour où vous estimez.

<br>

Ce qui s’écrit :

```
coût sur la période ≈ ( tokens d’entrée  × tarif entrée
                      + tokens de sortie × tarif sortie )
                      × nombre de requêtes sur la période
```

<br>

Déroulons-le sur un cas concret : un assistant interne, 200 collaborateurs, cinq
conversations par jour et par personne, six tours par conversation, avec les
tailles du tableau précédent.

<br>

- **Une conversation de six tours** : 12 900 tokens d’entrée cumulés, 2 400 de
  sortie.
- **Une journée** : 200 × 5 = 1 000 conversations, soit **12,9 millions de
  tokens en entrée** et **2,4 millions en sortie**.
- **Un mois de 22 jours ouvrés** : environ **284 millions en entrée** et **53
  millions en sortie**.

<br>

Il ne reste qu’une multiplication, et c’est la seule que cette fiche ne fera pas
à votre place : ouvrez la page de tarification de votre fournisseur, et
multipliez. 284 millions de tokens en entrée, c’est 284 fois le prix du million
affiché en entrée. Vous avez votre ordre de grandeur mensuel en deux minutes,
avant la première ligne de code.

<br>

Deux garde-fous autour de ce calcul. **Posez une alerte de budget** chez le
fournisseur le jour où vous ouvrez le compte, exactement comme sur un projet
cloud. Et **refaites l’estimation après une semaine de production réelle** :
l’écart entre les deux chiffres est l’endroit où vous apprendrez le plus sur
votre propre application.

---

## Les leviers, du plus rentable au moins rentable

- **Raccourcir le contexte.** C’est de très loin le premier levier, parce qu’il
  attaque le terme qui grossit tout seul. Résumer l’historique au lieu de le
  réexpédier mot pour mot, ne joindre que les documents pertinents, tronquer
  franchement.
- **Utiliser le cache de contexte.** La plupart des fournisseurs facturent
  nettement moins cher un début de requête déjà vu. Il suffit de mettre ce qui
  ne bouge pas — prompt système, documents de référence — **en tête**, et ce qui
  change à la fin. Ça ne modifie pas la réponse, ça ne coûte rien à mettre en
  place, et c’est le seul levier gratuit de cette liste.
- **Prendre le bon modèle pour la bonne tâche.** Un petit modèle pour classer,
  router et extraire ; le gros là où il apporte vraiment quelque chose. L’écart
  de tarif entre deux modèles d’une même famille se compte en ordre de grandeur,
  pas en pourcentage.
- **Plafonner.** Nombre maximum de tokens en sortie, nombre maximum de tours
  d’agent, budget maximum par requête. Un plafond n’est pas une optimisation,
  c’est un **disjoncteur** : il ne fait pas baisser la facture normale, il
  empêche la facture anormale.

---

## Astuce bonus - allumer le compteur au premier appel

Chaque réponse d’API renvoie le nombre de tokens réellement consommés, en entrée
et en sortie. Presque personne ne le lit. C’est pourtant la seule donnée qui
transforme une facture en information exploitable.

<br>

Enregistrez-la dès le premier appel, avec le contexte métier à côté :

```python
reponse = appeler_le_modele(prompt)

logger.info(
    "appel modèle",
    extra={
        "route": "/resumer",
        "tokens_entree": reponse.usage.input_tokens,
        "tokens_sortie": reponse.usage.output_tokens,
    },
)
```

<br>

Trois lignes, écrites avant la mise en production. Le jour où la facture double,
vous saurez **quelle route** l’a fait doubler, et pas seulement qu’elle a
doublé. C’est le même réflexe que d’étiqueter ses ressources cloud, et ça rend
le même service au même moment : trop tard pour être ajouté, indispensable pour
comprendre.

<hr>

Voilà le compteur démonté. Pour résumer en une phrase : **une facture de modèle,
c’est un nombre de tokens multiplié par deux tarifs — et sur ces trois termes,
le seul que vous maîtrisez vraiment, c’est le nombre de tokens.**

Dans la prochaine fiche, on regarde l’objet qui transforme le tableau des tours
en vrai problème de production : [l’agent](/drafts/comprendre-les-agents-ia),
c’est-à-dire une boucle où le modèle décide lui-même du nombre de tours. À très
vite 😉.

D’ici là, je vous invite :

- [à relire la fiche sur les LLM](/drafts/comprendre-les-llm) si les mots
  « contexte » et « inférence » vous ont fait hésiter ;
- [à lire l’article sur le coût du cloud public](/drafts/le-cloud-est-il-vraiment-moins-cher),
  qui raconte exactement la même surprise sur une autre facture ;
- [à revoir la fiche sur le cloud public](/fiches/comprendre-le-cloud-public),
  parce que la facturation à l’usage y est déjà expliquée en détail.

## Ressources

- [tiktoken](https://github.com/openai/tiktoken) — le tokenizer d’OpenAI, à
  lancer en local pour compter un texte avant de l’envoyer.
- [Tokenizers (Hugging Face)](https://huggingface.co/docs/tokenizers) — la
  bibliothèque qui implémente les découpages de la plupart des modèles ouverts.
- [Byte-Pair Encoding, expliqué](https://huggingface.co/learn/nlp-course/chapter6/5)
  — l’algorithme derrière ces découpages, si vous voulez comprendre pourquoi un
  mot rare coûte trois tokens.
