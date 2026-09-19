---
layout: ../../layouts/CheatSheetsLayout.astro

title: "Qu’est-ce qu’un agent IA ?"
description:
  "Un agent, c’est une boucle : un modèle, une liste d’outils, un critère
  d’arrêt. On voit ce qui le distingue d’un simple appel d’API, ce que
  « autonome » veut dire techniquement, et les trois choses que personne ne dit
  — le coût, les erreurs qui se composent, et l’arrêt qui ne vient pas."

imgAlt:
  Un petit robot qui tourne en rond sur un rail circulaire en attrapant des
  outils posés le long du parcours, pixel art
imgSrc: /images/cheatsheets/comprendre-les-agents-ia.webp

author: Thomas Dimnet
github: tdimnet
kind: Fiche technique
serie: ia
tags:
  - IA
  - Production
  - Coût
level: Intermédiaire
publishedDate: 11/23/2026

faq:
  - question: Qu’est-ce qu’un agent IA ?
    answer:
      "Un agent est une boucle autour d’un modèle de langage. On lui donne une
      liste d’outils qu’il peut appeler, et on le relance tant qu’il demande à
      s’en servir. À chaque tour, le modèle décide s’il appelle un outil ou s’il
      répond. Il n’y a ni intention ni volonté là-dedans : seulement une
      condition de sortie et un modèle qui produit la suite la plus probable."
  - question: Quelle est la différence entre un agent et un simple appel d’API ?
    answer:
      "Le nombre d’allers-retours et qui le décide. Un appel d’API, c’est une
      requête, une réponse, un coût connu d’avance. Un agent enchaîne un nombre
      de tours que vous ne connaissez pas avant de lancer, parce que c’est le
      modèle qui décide à chaque étape s’il continue. Le coût et la durée ne
      sont donc calculables qu’après coup."
  - question: Un agent IA est-il vraiment autonome ?
    answer:
      "Il est exactement aussi autonome que les outils qu’on lui a branchés. Un
      modèle seul ne peut rien faire d’autre que produire du texte. L’autonomie
      ne vient pas de son intelligence mais des droits d’écriture qu’on lui
      donne, et du garde-fou placé entre lui et la production — une proposition
      à valider, une pull request, ou rien du tout."
---

Le mot « agent » est devenu si large qu’il ne désigne plus grand-chose. Il sert
à vendre un assistant de traitement de texte, une intégration entre deux
services, et un système qui ouvre des pull requests tout seul la nuit.

<br>

Sous le bruit, l’objet est pourtant simple, et il tient en une phrase : **un
agent, c’est une boucle.** Un modèle, une liste d’outils, un critère d’arrêt. Le
reste est de la plomberie.

<br>

Cette fiche suit
[celle sur les tokens et le coût](/drafts/tokens-contexte-et-cout), dont elle
est la suite directe : un agent, c’est avant tout une facture qui se construit
toute seule.

---

## Un agent, c’est une boucle

Voici un agent complet. Pas un agent simplifié pour l’exemple : la structure
réelle, celle que tous les cadriciels du marché habillent différemment.

```python
historique = [instruction_de_depart, demande_de_l_utilisateur]

while True:
    reponse = appeler_le_modele(historique, outils=OUTILS)

    if reponse.est_du_texte:
        return reponse.texte          # le modèle estime avoir fini

    resultat = executer(reponse.outil, reponse.arguments)

    historique.append(reponse)        # ce que le modèle a demandé
    historique.append(resultat)       # ce que l'outil a répondu
```

<br>

C’est tout. **Il n’y a rien d’autre.** Ce qu’on vend sous le nom d’agent est une
variation autour de ces dix lignes : des outils plus nombreux, un historique
géré plus finement, des garde-fous autour de `executer`.

<br>

Trois choses méritent d’être notées tout de suite, parce que tout le reste de la
fiche en découle :

- **le modèle n’exécute rien.** Il produit du texte qui _demande_ l’exécution
  d’un outil. C’est votre code qui exécute, ou qui refuse ;
- **l’historique grossit à chaque tour**, de la demande d’outil et de son
  résultat ;
- **la boucle s’arrête quand le modèle produit du texte au lieu d’appeler un
  outil.** Autrement dit : quand il estime avoir fini. Retenez cette phrase, on
  y revient.

---

## Ce qui le distingue d’un simple appel d’API

|                         | Un appel d’API    | Un agent                            |
| ----------------------- | ----------------- | ----------------------------------- |
| Nombre d’allers-retours | 1, connu d’avance | inconnu, décidé en cours de route   |
| Qui décide de la suite  | vous              | le modèle                           |
| Effets de bord          | aucun             | tout ce que les outils savent faire |
| Coût                    | calculable avant  | calculable seulement après          |
| Durée                   | prévisible        | non                                 |
| Rejouable à l’identique | à peu près        | non                                 |

<br>

La ligne qui compte est la deuxième. **Dans un appel d’API, l’enchaînement est
dans votre code ; dans un agent, il est dans le modèle.** Vous ne déléguez pas
une tâche, vous déléguez le plan.

<br>

C’est exactement ce qui rend un agent utile sur les problèmes dont vous ne
connaissez pas les étapes à l’avance — et exactement ce qui le rend imprévisible
sur ceux dont vous les connaissez. D’où une règle qui vous fera économiser
beaucoup : **si vous savez écrire les étapes, écrivez-les.** Une boucle `for`
coûte moins cher, tombe en panne plus franchement, et se teste.

---

## « Autonome » ne veut pas dire ce qu’on croit

Un modèle seul ne peut rien faire. Il produit du texte, point. **Un agent n’est
pas autonome parce qu’il est intelligent, il est autonome parce qu’on lui a
donné des outils et le droit de s’en servir.**

<br>

L’autonomie n’est donc pas une propriété du modèle, c’est une propriété de ce
qu’on branche dessus. Quatre pièces, et une seule qui compte vraiment :

1. **Un déclencheur** — une horloge, un événement, une demande.
2. **Des outils** — ce que l’agent sait faire.
3. **Un garde-fou** — l’endroit où atterrit le résultat.
4. **Une trace** — de quoi relire après coup.

<br>

Les trois premières sont de la plomberie. **C’est la troisième qui décide de ce
que vous risquez**, et elle ne dépend pas du tout du modèle choisi.

<br>

Un exemple que je connais bien, parce que c’est celui de ce site. Un agent qui
travaille sur le dépôt et termine par une pull request hérite gratuitement de
tout ce qui est déjà en place : le formatage vérifié, les tests, la vérification
de types, et une relecture humaine avant fusion. Le même agent branché
directement sur la base de données écrit en production sans le moindre filet. Ce
n’est pas un agent plus dangereux que l’autre : **c’est le même agent, branché
ailleurs.**

<br>

La conséquence est plutôt agréable à vivre : le niveau d’autonomie ne se décide
pas agent par agent, en conscience, à chaque fois. Il se déduit du chemin
d’écriture. Choisissez le chemin, vous avez choisi le risque.

---

## Les trois choses que personne ne dit

### 1. Le coût croît avec les tours, et vous ne le connaissez pas d’avance

La fiche précédente montrait qu’une conversation coûte le carré de ses tours,
parce que l’historique est réexpédié en entier à chaque fois. Un agent suit la
même courbe, avec deux aggravations : **les résultats d’outils sont
volumineux**, et **ce n’est plus vous qui décidez du nombre de tours.**

<br>

Déroulons. Instruction de départ 1 000 tokens, demande 100, et à chaque tour un
appel d’outil d’une centaine de tokens dont le résultat en pèse 1 500 — une
réponse d’API tout à fait ordinaire.

| Tour | Entrée facturée | Entrée cumulée |
| ---- | --------------- | -------------- |
| 1    | 1 100           | 1 100          |
| 2    | 2 700           | 3 800          |
| 4    | 5 900           | 14 000         |
| 8    | 12 300          | 53 600         |

<br>

**Huit tours, 53 600 tokens d’entrée pour une seule demande** — près de
cinquante fois ce qu’aurait coûté un appel unique. Et huit tours, pour un agent,
c’est une journée ordinaire.

<br>

Ce n’est pas un argument contre les agents. C’est un argument pour **compter
avant**, avec la méthode de la fiche précédente, en prenant comme volume non pas
le nombre de demandes mais le nombre de demandes multiplié par le nombre de
tours attendus. Et pour **tronquer les résultats d’outils** : c’est le levier le
plus rentable de toute cette fiche, et le plus souvent oublié.

### 2. Les erreurs se composent

Celle-ci est purement arithmétique, et elle est brutale. Si chaque tour a une
probabilité d’être correct, la probabilité que la chaîne entière le soit est
leur produit.

| Nombre de tours | Fiabilité de 95 % par tour | Fiabilité de 99 % par tour |
| --------------- | -------------------------- | -------------------------- |
| 5               | 77 %                       | 95 %                       |
| 10              | 60 %                       | 90 %                       |
| 20              | 36 %                       | 82 %                       |

<br>

**Un agent juste à 95 % à chaque tour est juste à 36 % sur vingt tours.** Aucun
prompt ne rattrape ça, parce que ce n’est pas un problème de prompt, c’est une
multiplication.

<br>

Et il y a pire que le chiffre : le modèle ne sait pas qu’il s’est trompé au tour
trois. Il ne s’arrête pas, il ne prévient pas. **Il continue, et il construit
sur l’erreur** — avec le même aplomb que sur une hallucination, et pour la même
raison.

<br>

D’où une conclusion qui surprend souvent : **raccourcir la boucle est une mesure
de fiabilité avant d’être une mesure d’économie.** Un agent à trois tours bien
découpés bat un agent à quinze tours qui se débrouille, sur les deux tableaux à
la fois.

### 3. Le critère d’arrêt est la partie difficile

Relisez la boucle du début. Quand s’arrête-t-elle ? Quand le modèle produit du
texte au lieu d’appeler un outil. C’est-à-dire **quand le modèle estime avoir
fini**.

<br>

Ce n’est pas une condition de programme, c’est un jugement. Et il tombe en panne
dans les deux sens :

- **il s’arrête trop tôt** — l’agent annonce que c’est fait alors qu’il a sauté
  une étape. Le plus vicieux des deux, parce que la réponse a l’air complète ;
- **il ne s’arrête pas** — il relance le même outil, corrige sa correction,
  vérifie sa vérification. Le compteur tourne, et rien n’avance.

<br>

Vous ne réglerez jamais complètement ça par le prompt. On le règle par des
**bornes**, posées à côté du modèle et pas dedans : un nombre maximum de tours,
un budget de tokens par demande, une liste d’outils courte. C’est le disjoncteur
de la fiche précédente, appliqué à la boucle — il ne rend pas l’agent meilleur,
il borne ce qu’il peut coûter quand il va mal.

---

## Ce qui fait un agent qui tient en production

- **Peu d’outils, bien nommés.** Le modèle choisit un outil en lisant sa
  description. Quinze outils aux noms proches, c’est quinze occasions de se
  tromper à chaque tour — et la section précédente dit ce que ça donne une fois
  multiplié.
- **Des résultats d’outils courts.** Tronquez, filtrez, résumez avant d’insérer
  dans l’historique. Un outil qui renvoie 50 000 tokens de JSON brut fait
  exploser la facture et noie le modèle dans du bruit.
- **Un garde-fou à la hauteur du risque.** Une proposition à valider, une pull
  request, ou une écriture directe : c’est le seul vrai curseur.
- **Une trace par tour.** L’outil appelé, ses arguments, les tokens consommés.
  C’est le compteur de la fiche précédente, posé à l’échelle de la boucle. Sans
  lui, un agent qui dérape est un mystère ; avec lui, c’est une ligne de log.
- **Une clé d’API qui n’est pas dans le code.** Un agent, c’est du code qui
  tourne avec vos droits et qui appelle un service facturé — les réflexes de
  [la fiche sur les secrets dans GitHub Actions](/fiches/gerer-secrets-github-actions)
  s’appliquent tels quels.

---

## Astuce bonus - le meilleur agent est souvent celui qu’on n’écrit pas

La question à se poser avant d’en écrire un tient en une ligne : **la tâche
demande-t-elle du jugement ?**

<br>

« Ce tag est-il pertinent pour cette fiche ? », « ce commentaire apporte-t-il
quelque chose ? » — oui, du jugement, un agent se défend. « Ce fichier
existe-t-il ? », « ce lien pointe-t-il vers une page qui existe ? » — non, et un
agent y serait plus cher, plus lent et moins fiable qu’une poignée de lignes de
test.

<br>

Je me suis posé la question pour de bon sur ce site. Vérifier que chaque lien
interne mène quelque part, ça ressemble à une tâche d’agent : ça parcourt des
fichiers, ça croise des informations, ça produit un rapport. Sauf que c’est
entièrement déterministe. La bonne réponse n’est pas un agent, c’est une poignée
de lignes de test, bloquantes dans la chaîne d’intégration : ça tourne en une
seconde et ça donne toujours le même verdict. Un agent ferait la même chose pour
plus cher, moins vite, et avec une chance de se tromper.

<br>

**Si le script est écrivable, écrivez le script.** Gardez l’agent pour ce que le
script ne sait pas faire.

<hr>

Voilà la boucle démontée. Pour résumer en une phrase : **un agent, c’est un
modèle dans une boucle avec des outils — et les trois difficultés ne sont pas
dans le modèle mais autour de lui : ce que ça coûte, ce que les erreurs
deviennent en s’accumulant, et le moment de s’arrêter.**

Dans la prochaine fiche, on regarde la pièce dont on a parlé sans jamais la
définir : la **liste d’outils**. Il existe un protocole qui la standardise, il
s’appelle [MCP](/drafts/comprendre-le-protocole-mcp), et NX en fait tourner un
en production. À très vite 😉.

D’ici là, je vous invite :

- [à relire la fiche sur les tokens et le coût](/drafts/tokens-contexte-et-cout),
  parce que c’est elle qui donne les chiffres du tableau plus haut ;
- [à relire la fiche sur les LLM](/drafts/comprendre-les-llm) si la phrase « le
  modèle n’exécute rien » vous a fait tiquer ;
- [à jeter un œil à la fiche sur les secrets](/fiches/gerer-secrets-github-actions),
  qui reste la première chose à régler avant de lancer quoi que ce soit
  d’automatique.

## Ressources

- [ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629)
  — l’article de 2022 qui formalise la boucle décrite ici.
- [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
  — le retour d’expérience le plus honnête que j’aie lu sur le sujet, et qui dit
  lui aussi de commencer par ne pas écrire d’agent.
- [Le cours sur les agents de Hugging Face](https://huggingface.co/learn/agents-course)
  — gratuit, pratique, et pas dépendant d’un fournisseur.
