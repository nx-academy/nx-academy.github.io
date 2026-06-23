---
layout: ../../layouts/CheatSheetsLayout.astro

title: Comment prendre en main PICO-8 ? Installation et premiers pas
description:
  "Apprenez à prendre en main PICO-8 pas à pas : installation, version gratuite
  dans le navigateur, commandes du shell (load, run, save, splore), éditeurs
  intégrés et le trio _init/_update/_draw. Fiche technique débutant pour lancer
  votre première cartouche."

imgAlt:
  Une console rétro posée sur un bureau avec un curseur clignotant, pixel art
imgSrc: /images/cheatsheets/prendre-en-main-pico-8.webp

author: Thomas
kind: Fiche technique
level: Débutant
publishedDate: 06/17/2026

faq:
  - question: Comment installer PICO-8 ?
    answer:
      "Deux options : acheter la version complète (environ 15 $) sur le site de
      Lexaloffle, ou utiliser gratuitement l'édition éducation directement dans
      le navigateur sur pico-8-edu.com."
  - question: Faut-il payer pour essayer PICO-8 ?
    answer:
      "Non. L'édition éducation est gratuite et tourne dans le navigateur, ce
      qui suffit largement pour découvrir l'outil et suivre cette fiche."
  - question: Comment lancer un jeu sur PICO-8 ?
    answer:
      "Depuis le shell, tapez `load nomdujeu` pour charger une cartouche, puis
      `run` pour la lancer. La touche ESC fait l'aller-retour entre le shell et
      l'éditeur de code."

howTo:
  name: Lancer votre première cartouche PICO-8
  steps:
    - name: Ouvrir l'éditeur de code
      text:
        Lancez PICO-8 puis appuyez sur ESC pour passer du shell à l'éditeur de
        code.
    - name: Écrire le squelette du jeu
      text: Recopiez les trois fonctions _init, _update et _draw dans l'éditeur.
    - name: Revenir au shell
      text: Appuyez à nouveau sur ESC pour revenir au shell de commande.
    - name: Lancer le jeu
      text: Tapez la commande run puis Entrée pour exécuter votre cartouche.
    - name: Sauvegarder la cartouche
      text:
        Revenez au shell avec ESC et tapez save mon-premier-jeu pour enregistrer
        votre travail.
---

Si vous avez lu
[mon article sur la découverte de PICO-8](/articles/decouvrir-pico-8), vous
savez déjà pourquoi j'aime autant cet outil. Tout est réuni au même endroit et
on peut passer de l'idée au prototype jouable en une soirée.

Cette fois, **on va passer à la pratique**. L'objectif de cette fiche de vous
aider à installer PICO-8 sur votre ordinateur, à vous repérer dans son
environnement, taper les commandes essentielles et lancer votre toute première
cartouche. Au final, ça fait déjà pas mal d'étapes pour une première fiche
technique.

Il n'y a pas besoin d'expérience en Game Dev. Si vous savez ce qu'est une
variable et que vous savez installer un programme sur votre ordinateur, vous
avez largement de quoi suivre cette fiche.

---

## C'est quoi PICO-8, en une phrase ?

PICO-8 est une _fantasy console_, autrement dit c'est un environnement
tout-en-un qui regroupe un éditeur de code (en Lua), un éditeur de sprites, un
éditeur de map et un éditeur de son. On se sert de cet environnement pour créer
de "petits" jeux rétro et y jouer directement.

Concrètement, vous n'installez qu'un seul logiciel. Pas de toolchain à installer
et à configurer, pas de cinq programmes à faire dialoguer entre eux.

---

## Comment installer PICO-8 ?

<br>

![L'écran d'accueil de PICO-8](/images/cheatsheets/pico8-accueil.webp)

Vous avez deux options selon que vous voulez juste tester ou vous lancer
vraiment.

### Option 1 : essayer gratuitement dans le navigateur

Le plus rapide pour commencer sans rien dépenser, c'est l'**édition éducation**
de PICO-8. C'est une version allégée, officielle, jouable directement dans le
navigateur. Idéale pour suivre cette fiche sans installer quoi que ce soit. Au
moment de craquer sur PICO-8, je ne l'avais pas essayé. J'ai pris le temps de le
faire depuis et vraiment, ça fonctionne super bien.

Rendez-vous sur [www.pico-8-edu.com](https://www.pico-8-edu.com) et vous avez la
console sous les yeux en quelques secondes.

### Option 2 : acheter la version complète

Pour aller plus loin (export HTML, sauvegarde de cartouches en local et
navigateur de jeux intégré), il faut la version payante, autour de **15 $** sur
le [site officiel de Lexaloffle](https://www.lexaloffle.com/pico-8.php). Elle
tourne sur Windows, Mac et Linux. J'ai vu qu'il y avait quelques petites tweaks
à faire sur MacOS. Vous pouvez trouver plus d'informations
[sur le forum officiel](https://www.lexaloffle.com/bbs/?tid=142395).

C'est cette version que j'utilise chez moi. Elle tourne comme un charme sur mon
ordinateur Windows. Sachez que le reste de la fiche fonctionne avec les deux
versions.

<br>

| **Votre besoin**                             | **Version conseillée**  |
| -------------------------------------------- | ----------------------- |
| Juste tester, suivre un tuto                 | Édition éducation (web) |
| Sauvegarder ses cartouches en local          | Version complète        |
| Exporter son jeu en HTML/binaire             | Version complète        |
| Parcourir les jeux de la communauté (SPLORE) | Version complète        |

---

## L'environnement : un shell et des éditeurs

<br>

![Le shell d'accueil de PICO-8](/images/cheatsheets/pico8-shell.webp)

Au lancement, PICO-8 vous accueille sur une ligne de commande avec un curseur
clignotant. C'est ce qu'on appelle un **shell** et c'est le point de départ de
tout. C'est ici qu'on tape les commandes pour charger, lancer ou sauvegarder un
jeu.

C'est l'un des points auquels je m'attendais le moins quand j'ai commencé à
travailler PICO-8. Avoir une ligne de commandes rend le tout plus geeky et puis
intéressant. Vous pouvez taper la commande `help` pour connaître les commandes
possibles.

Pour revenir à notre shell, derrière cette interface en ligne de commande se
cache plusieurs **éditeurs** avec lesquels on communique via la commande `ESC`.

<br>

Pour basculer entre eux, on utilise les touches de fonction :

<br>

| **Touche** | **Éditeur**       | **À quoi ça sert**                 |
| ---------- | ----------------- | ---------------------------------- |
| `ESC`      | Shell ↔ éditeurs | Faire l'aller-retour avec le code  |
| Onglet 1   | Code              | Écrire le Lua de votre jeu         |
| Onglet 2   | Sprites           | Dessiner vos personnages et décors |
| Onglet 3   | Map               | Assembler vos sprites en niveaux   |
| Onglet 4   | Son (SFX)         | Créer vos effets sonores           |
| Onglet 5   | Musique           | Composer vos morceaux              |

<br>

Pour passer d'un éditeur à l'autre, cliquez sur les onglets en haut à droite, ou
utilisez les touches du clavier. Et pour revenir au shell à tout moment, c'est
`ESC`.

---

## Les commandes du shell à connaître

Voici les quelques commandes qui couvrent 90 % de votre quotidien sur PICO-8.
Tapez-les directement dans le shell, puis `Entrée`.

<br>

| **Commande**    | **Ce qu'elle fait**                                  |
| --------------- | ---------------------------------------------------- |
| `help`          | Pour afficher l'aide des commandes                   |
| `run`           | Lance le jeu actuellement en mémoire                 |
| `load nomdujeu` | Charge une cartouche (`.p8`) en mémoire              |
| `save nomdujeu` | Sauvegarde la cartouche en mémoire sous ce nom       |
| `folder`        | Ouvre le dossier des cartouches sur votre ordinateur |
| `splore`        | Ouvre le navigateur de jeux de la communauté         |
| `reboot`        | Repart d'une cartouche vierge                        |

<br>

Le couple gagnant au démarrage, c'est `load` puis `run`. Pendant qu'un jeu
tourne, appuyez sur `ESC` pour revenir à l'éditeur de code et à nouveau `ESC`
pour revenir au shell.

---

## Le squelette d'un jeu : \_init, \_update, \_draw

<br>

![L'éditeur de code de PICO-8](/images/cheatsheets/pico8-editeur-de-code.webp)

C'est le concept le plus important de toute cette fiche. Un jeu PICO-8 repose
sur **trois fonctions** que vous définissez et que la console appelle pour vous.
Vous n'écrivez jamais la game loop vous-même : vous remplissez ces trois cases.

```lua
function _init()
  -- appelée 1 fois au démarrage
  x = 64
end

function _update()
  -- appelée 30 fois par seconde : la logique
  x = x + 1
end

function _draw()
  -- appelée à chaque frame : l'affichage
  cls()
  circfill(x % 128, 64, 4, 12)
end
```

- `_init()` : appelée **une seule fois** au lancement. On y prépare l'état
  initial (positions, score, variables…). Ici, on place `x` au centre.
- `_update()` : appelée **30 fois par seconde**. C'est le cerveau du jeu : on y
  fait évoluer l'état. Ici, on déplace `x` d'un pixel à chaque frame.
- `_draw()` : appelée **à chaque frame** pour dessiner. `cls()` efface l'écran
  (sinon les dessins s'empilent), puis `circfill()` dessine un cercle plein.

La règle d'or à retenir : on sépare ce qui **change** (`_update`) de ce qui
**s'affiche** (`_draw`). C'est exactement le même pattern update/draw qu'on
retrouve ailleurs en game dev, par exemple dans
[ma fiche sur Pygame](/fiches/intro-a-pygame).

---

## Lancer votre première cartouche

![L'éditeur de code de PICO-8](/images/cheatsheets/pico8-premier-jeu.webp)

<br>

Mettons tout bout à bout. Voici la marche à suivre pour voir quelque chose
bouger à l'écran :

1. Lancez PICO-8 : vous êtes sur le shell.
2. Appuyez sur `ESC` pour ouvrir l'éditeur de code.
3. Recopiez le squelette `_init` / `_update` / `_draw` ci-dessus.
4. Appuyez sur `ESC` pour revenir au shell.
5. Tapez `run` puis `Entrée`.

Vous devriez voir un petit cercle traverser l'écran. Félicitations : vous venez
de lancer votre première cartouche !

Pour la sauvegarder, revenez au shell (`ESC`) et tapez `save mon-premier-jeu`.
PICO-8 crée un fichier `mon-premier-jeu.p8` que vous pourrez recharger plus tard
avec `load mon-premier-jeu`.

---

<br>

## Et ensuite ?

Vous savez maintenant installer PICO-8, naviguer entre le shell et les éditeurs
et lancer une cartouche. La prochaine étape logique, c'est de transformer ce
cercle qui bouge tout seul en un vrai petit jeu où **vous** contrôlez l'action.

C'est exactement le programme de la fiche suivante :
[créer un premier jeu simple avec PICO-8](/drafts/premier-jeu-simple-pico-8). On
y gère les entrées clavier, on affiche un score et on ramasse des objets.

## Ressources

- [Site officiel de PICO-8](https://www.lexaloffle.com/pico-8.php) — pour
  acheter et télécharger l'outil.
- [PICO-8 Education Edition](https://www.pico-8-edu.com) — la version gratuite
  dans le navigateur.
- [Le manuel officiel PICO-8](https://www.lexaloffle.com/dl/docs/pico-8_manual.html)
  — toute l'API et les éditeurs intégrés.
