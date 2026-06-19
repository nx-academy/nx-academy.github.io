---
layout: ../../layouts/BlogPostLayout.astro

title: "Découvrir PICO-8, la fantasy console pour créer des jeux"
description:
  "PICO-8, c'est quoi ? Une console fantastique pour créer de petits jeux rétro.
  Carnet de bord d'un développeur : ce que c'est, ce qu'on peut en faire, ses
  contraintes et pourquoi j'adore cet outil."

imgAlt:
  PICO-8, une console fantastique pour créer des jeux rétro, illustration pixel
  art
imgSrc: /images/articles/decouvrir-pico-8.webp

kind: Articles
author: Thomas
draft: true
publishedDate: 06/17/2026

tags:
  - Game dev
  - PICO-8
  - Carnet de bord
  - Rétro

faq:
  - question: PICO-8 est-il gratuit ?
    answer:
      "La version complète de PICO-8 est payante (autour de 15 $) sur le site de
      Lexaloffle. Il existe aussi une édition éducation gratuite, jouable
      directement dans le navigateur."
  - question: En quel langage programme-t-on sur PICO-8 ?
    answer:
      "Les jeux PICO-8 se codent en Lua, un langage léger et très lisible qu'on
      prend en main rapidement."
  - question: Quelles sont les limites techniques de PICO-8 ?
    answer:
      "Un écran de 128×128 pixels, une palette fixe de 16 couleurs et un code
      limité à 8192 tokens par cartouche. Ces contraintes sont volontaires et
      font partie de l'esprit de la console."
  - question: Peut-on faire un vrai jeu commercial avec PICO-8 ?
    answer:
      "Oui. PICO-8 est idéal pour prototyper, et certains prototypes sont
      devenus des jeux complets : Celeste, par exemple, a démarré comme un jeu
      PICO-8 avant sa version commerciale."
---

## Comment j’ai découvert PICO-8 ?

**Il y a quelques semaines, j'ai participé à ma toute première game jam
[sur itch.io](https://itch.io/jam/campfire-creators-jam-2)**. Je ne vais pas
trop m'étendre dessus ici. J'ai prévu de revenir dessus dans un autre article.
Mais rapidement, je peux vous dire que j'ai adoré et j'ai appris énormément en
très peu de temps.

**J'ai décidé d'utiliser MonoGame pour créer mon jeu pour la Jam. C'est un
framework C# plutôt intéressant**. Il permet de faire beaucoup de choses mais ça
reste un framework (comprendre : c'est assez lourd et verbeux). Pour sortir le
jeu, je me suis vite retrouvé à jongler avec plusieurs autres programmes à côté.
Je pense notamment à Aseprite pour les sprites et les spritesheets et Sonic Pi
pour la musique. Ce n'était pas insurmontable mais, honnêtement, ça faisait
beaucoup de pièces à assembler avant même d'écrire la première ligne de
gameplay.

**Après la jam, j'ai cherché une autre solution possible et je suis tombé sur
PICO-8** et ça m'a rapidement convaincu. J'ai rapidement compris le potentiel de
l'outil où tout se trouve au même endroit. On code, on dessine, on compose et on
joue, le tout sans jamais quitter le programme (PICO-8 est un programme qu'on
installe sur sa machine).

Petite précision avant d'aller plus loin. Cet article n'est ni un tutoriel ni
une fiche technique. Pour l'instant, c'est plutôt un « carnet de bord »,
autrement dit **les notes de terrain d'un développeur qui découvre PICO-8 et qui
a envie de partager pourquoi il trouve l'outil si malin**. Si vous êtes curieux
de game dev, débutant, ou simplement quelqu'un qui aimerait enfin _terminer_ un
jeu, vous devriez y trouver votre compte.

---

## C'est quoi PICO-8 ?

**PICO-8 est ce qu'on appelle une _fantasy console_. En gros, c'est une console
de jeu qui n'a jamais existé**. Personne n'a jamais fabriqué la machine. Son
créateur en a simplement inventé les caractéristiques, c'est-à-dire un écran
minuscule, une poignée de couleurs, une quantité de mémoire dérisoire, avec
l'idée de recréer l'esprit des vieilles consoles. **Le côté « rétro » de la
console n'est pas un accident lié à l'âge**. C'est un véritable choix de design,
assumé de bout en bout.

Quand vous lancez PICO-8, vous atterrissez dans un environnement où tout est
réuni. Vous pouvez lancer des jeux, coder les vôtres, dessiner vos sprites,
construire vos maps et composer votre musique. Tout ça au même endroit et sans
avoir à installer le moindre outil supplémentaire. PICO-8 embarque directement
les éditeurs de code, de musique, de son, de sprites et de map. C'est un peu
comme un IDE pour le jeu vidéo.

Pour l'utiliser, j'ai acheté la version payante
[sur le site officiel](https://www.lexaloffle.com/pico-8.php). **C'est un
logiciel qui tourne sur votre ordinateur (Windows, Mac ou Linux) pour environ 15
$**. Si vous voulez juste tester l'outil avant de sortir la carte bleue, sachez
qu'il existe aussi
[une édition éducation gratuite](https://www.pico-8-edu.com/). C'est une version
allégée de PICO-8 réalisée officiellement par Lexaloffle, jouable directement
dans le navigateur. Pour info, je ne l'ai pas testée. J'ai directement décidé de
l'acheter.

**Côté code, on programme ses jeux en Lua**. Je trouve ce langage très lisible.
Pour vous donner un point de repère, dans l'esprit il m'a un peu rappelé Ruby.
Rien d'intimidant : c'est un langage léger qu'on prend en main rapidement.

---

## Quels types de jeux peut-on faire ?

En vrai, on peut faire pas mal de choses tant qu'on reste sur de petits formats.
On peut faire des plateformers, des puzzles, des shoot'em up, de petits
roguelikes ou des mini-RPG. Ici, le dénominateur commun n'est pas le genre,
c'est l'échelle. **PICO-8 est pensé pour des jeux courts et complets**. En gros,
le genre de jeu qu'on finit en une session et, surtout, qu'on _finit tout
court_. Comme la taille du code est volontairement limitée, les jeux restent
compacts. On peut y jouer et les terminer d'une traite.

Tout ce petit monde vit dans un écosystème déjà bien fourni. **PICO-8 embarque
un navigateur de cartouches intégré pour explorer ce que les autres ont créé**.
En plus de ça, la plupart de ces jeux se jouent directement dans le navigateur.
Difficile de rendre le partage ou la découverte d'un jeu plus simple.

**Personnellement, je vois surtout PICO-8 comme un formidable outil de
prototypage**. On va pouvoir créer rapidement un prototype jouable, le partager,
récolter des retours et commencer à construire une communauté autour de son
concept. Si le potentiel est là, rien n'empêche ensuite de passer à une
toolchain plus costaude (MonoGame, Aseprite et compagnie) pour en faire une
version « commerciale » plus ambitieuse.

L'exemple parfait ici, c'est
[Celeste](<https://en.wikipedia.org/wiki/Celeste_(video_game)>). Le jeu
original, aujourd'hui appelé Celeste Classic, a été développé sous PICO-8 par
Maddy Thorson et Noel Berry en seulement quatre jours en 2016. Le prototype est
ensuite devenu l'un des plateformers indé les plus acclamés de son époque. Le
jeu complet est sorti en janvier 2018, cette fois redéveloppé en C#. Une seule
et même idée, donc, qui tient parfaitement debout en tant que jeu PICO-8 et qui
a servi de tremplin vers un jeu bien plus ambitieux.

---

## Pourquoi je trouve ça intéressant ?

**PICO-8 me permet de me concentrer sur l'essence même du jeu vidéo : le game
design** (j'ai beaucoup lu là-dessus ces derniers temps, et j'y reviendrai
bientôt). Il est tout à fait possible de faire un mignon petit jeu et de
peaufiner ses pixels. Mais l'outil pousse à travailler le _game feel_, soit la
façon dont un saut répond, dont le déplacement procure une sensation nerveuse et
satisfaisante, dont la difficulté monte. Le reste compte moins. On se concentre
sur une seule et même question : est-ce que c'est agréable à jouer ?

**Pouvoir se concentrer sur le game design tient, en grande partie, au fait que
tout est centralisé**. Pas de toolchain à mettre en place, pas d'allers-retours
entre cinq programmes. Avec PICO-8, je code, je dessine, je compose, le tout au
même endroit. J'avance donc beaucoup plus vite et je me prends bien moins la
tête. De plus, comme on revient aux fondamentaux (comprendre : la game loop, les
sprites, les collisions) sans gros framework à dompter, la boucle de feedback
est quasi instantanée ! Je modifie une ligne, je relance et je vois le résultat
en moins d'une seconde.

Il y a aussi un point que je trouve loin d'être négligeable : la distribution.
**PICO-8 permet d'exporter son jeu en HTML/JavaScript, le rendant jouable dans
un navigateur en un clic**. Concrètement, ça veut dire qu'on peut diffuser son
jeu et le faire connaître très vite, sans demander à qui que ce soit d'installer
quoi que ce soit. Pour un créateur en quête de retours autant que de communauté,
c'est précieux.

Enfin, un point qui me tient à cœur. On peut tout à fait s'appuyer sur l'IA pour
le code. Mais pour la musique et les sprites, on reste largement contraint de
mettre les mains dans le cambouis et de les faire soi-même. Et honnêtement ? Je
trouve ça génial. Ce travail manuel, c'est précisément ce qui donne à un jeu sa
personnalité et son caractère.

---

## Les contraintes (et pourquoi c'est une force)

**Pour moi, ce sont les contraintes qui font naître les meilleurs jeux**. C'est
en partie pour ça que je me suis mis aux game jams. J'aime créer sous
contrainte, un peu comme en cuisine. Avoir un cadre, c'est ce qui débloque ma
créativité et ça me force à ne pas aller trop loin (avoir un cadre, ça me cadre
^^)

**Et des contraintes, PICO-8 n'en manque pas**. L'écran est une petite grille de
128×128 pixels, la palette est fixée à 16 couleurs et le code lui-même est
limité. Une cartouche (un fichier de jeu) ne peut pas dépasser 8192 _tokens_. En
gros, chaque mot, chiffre, parenthèse ou signe de ponctuation compte. On n'a
donc tout simplement pas la place de s'éparpiller.

**Cela dit, PICO-8 n'est pas fait pour les jeux ambitieux**. Sur un gros projet,
genre un City Builder, vous pouvez taper assez rapidement le plafond des tokens
et là, il faudra soit optimiser l'existant, soit porter le jeu sur une
plateforme plus grande comme Monogame. Mais pour ce que vise PICO-8, soit des
petits jeux avec du caractère,ces limites ne sont pas un obstacle. C'est le
terrain de jeu.

---

## Un coup d'œil rapide au code

Pas de panique, on ne va pas plonger dans un tutoriel complet ici. Je veux juste
vous montrer à quoi ressemble le squelette d'un jeu PICO-8, histoire de
démystifier tout ça.

Tout tourne autour de trois fonctions que vous définissez, et que PICO-8 appelle
pour vous :

```lua
function _init()
  x = 0
end

function _update()
  x = x + 1
end

function _draw()
  cls()
  print("hello pico-8!", x, 60)
end
```

<br>
<br>

Ce minuscule programme affiche le texte « hello pico-8! » qui dérive doucement
vers la droite.

- `_init()` est appelée une seule fois. C'est là qu'on met en place l'état
  initial. Dans notre cas, on fixe la variable `x` à 0.
- `_update()` est appelée à chaque frame, 30 fois par seconde. C'est le cœur
  logique du jeu : c'est là qu'on fait évoluer l'état. Ici, on incrémente `x`,
  si bien que la position avance frame après frame.
- `_draw()` est aussi appelée à chaque frame, pour dessiner. `cls()` efface
  l'écran (sinon le texte laisserait une traînée derrière lui), et `print()`
  affiche notre message à la position `x` sur l'axe horizontal, à 60 pixels du
  haut.

Ce qu'il faut retenir ici, c'est cette séparation. D'un côté ce qui _change_
(`_update`), de l'autre ce qui _s'affiche_ (`_draw`). Vous n'écrivez jamais la
game loop vous-même. Vous remplissez ces trois cases et le moteur s'occupe du
timing. Une fois que vous avez ça, vous tenez le fil de presque tous les jeux
PICO-8.

---

## Et maintenant ?

**Je débute tout juste avec PICO-8, mais je sais déjà que je vais y rester un
bon moment**. L'outil a quelque chose d'addictif. Il permet d'avoir très
rapidement d'un prototype jouable.

<!--
Du coup, je compte bien creuser le sujet ici sur NX. Si vous voulez aller plus
loin tout de suite, j'ai préparé deux fiches techniques pour démarrer pas à pas
: [comment prendre en main PICO-8](/drafts/prendre-en-main-pico-8) (installation
et premiers pas), puis
[créer un premier jeu simple](/drafts/premier-jeu-simple-pico-8). Et si vous
hésitez encore avec un autre outil, j'ai aussi comparé
[PICO-8 et Pygame](/drafts/pico-8-ou-pygame).
-->

Je m'apprête également à participer à une nouvelle game jam :
[la Retro Recreation Jam](https://itch.io/jam/retro-recreation-2026). Elle
démarre dans quelques jours et le thème est prendre un jeu d'avant l'ère NES et
le réimaginer à sa façon. J'ai déjà mon idée en tête mais je vous en dirai plus
très bientôt.

En attendant, si cet article vous a donné envie d'essayer PICO-8, ne
réfléchissez pas trop : lancez la version gratuite dans votre navigateur, tapez
deux-trois lignes et regardez où ça vous mène. C'est souvent comme ça que
commencent les plus belles histoires.

## Ressources

- Le site officiel de PICO-8, pour acheter l'outil et explorer la console :
  [lexaloffle.com/pico-8](https://www.lexaloffle.com/pico-8.php).
- Le manuel officiel, qui couvre toute l'API ainsi que les fonctions des
  éditeurs intégrés :
  [le manuel PICO-8](https://www.lexaloffle.com/dl/docs/pico-8_manual.html).
