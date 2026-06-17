# Intro à Pico-8

## 1. Accroche (carnet, première personne)

Il y a quelques semaines, j'ai participé à ma première game jam sur itch.io. Je
ne vais pas trop m'étendre ici : j'y reviendrai dans un autre article. Mais pour
faire rapide : j'ai adoré et j'ai aussi appris énormément en très peu de temps.

J'ai développé mon jeu avec MonoGame. C'est un framework assez cool en C#. Ça
permet de faire pas mal de choses mais c'est un gros outil. Pour sortir le jeu,
je me suis vite retrouvé à jongler avec plusieurs logiciels à côté : Aseprite
pour les sprites et les spritesheets et Sonic Pi pour la musique. Ce n'était pas
insurmontable mais, en vrai, ça faisait beaucoup de pièces à assembler avant
même de poser la première ligne de gameplay.

C'est en cherchant à alléger tout ça, après la jam, que je suis tombé sur
PICO-8. Et là, j'ai eu un vrai déclic. En quelques minutes, j'ai compris le
potentiel de l'outil : tout est au même endroit. On code, on dessine, on
compose, on joue et le tout sans quitter le programme.

Sachez que cet article n'est pas un tutoriel. ou une fiche technique. Pour le
moment, c'est plutôt un "carnet", autrement dit le retour d'expérience d'un dev
qui découvre PICO-8 et qui a envie de partager pourquoi il trouve l'outil aussi
malin. Si vous êtes curieux de game dev, débutant, ou simplement quelqu'un qui
aimerait enfin _finir_ un jeu, vous devriez y trouver votre compte.

---

## 2. Qu'est-ce que PICO-8 ?

PICO-8 est ce qu'on appelle une _fantasy console_. En gros, c'est une console de
jeu qui n'a jamais existé. Personne n'a jamais fabriqué la machine. Son créateur
a simplement inventé ses caractéristiques, autrement dit un petit écran, une
poignée de couleurs, une mémoire minuscule, dans l'idée de recréer l'esprit des
vieilles consoles. Le côté « rétro » de la console n'est pas un accident lié à
l'âge, c'est un vrai choix de design, assumé de bout en bout.

Quand vous lancez PICO-8, vous tombez sur un petit environnement où tout est
réuni. Vous pouvez exécuter des jeux, coder les vôtres, dessiner vos sprites,
créer vos cartes et composer votre musique. Vous pouvez faire tout ça au même
endroit et sans avoir à installer le moindre outil supplémentaire. PICO-8
intègre directement les outils d'édition de code, de musique, de son, de sprites
et de map dans la console. C'est un peu l'équivalent d'un IDE pour le jeu vidéo
: un seul environnement qui centralise tout.

Pour l'utiliser, j'ai acheté la version payante sur le site officiel. C'est un
logiciel qui tourne sur votre ordinateur (Windows, Mac ou Linux) pour environ 15
$. Si vous voulez juste tester l'outil avant de sortir la carte bleue, sachez
qu'il existe aussi une édition éducation gratuite, une version allégée de PICO-8
officiellement réalisée par Lexaloffle, jouable directement dans le navigateur.
Pour le coup, je ne l'ai pas testé, j'ai directement craqué.

Côté code, on programme ses jeux en Lua. Je trouve ce langage de programmation
très lisible. Pour vous donner un repère, dans l'esprit ça m'a un peu rappelé
Ruby. Rien d'intimidant : c'est un langage léger qu'on prend en main vite.

---

## 3. Quel genre de jeux ça permet de faire ?

Beaucoup de choses, en réalité, du moment qu'on reste sur de petits formats.
Vous pouvez, par exemple, faire des plateformers, des puzzles, des shoot'em up,
des petits roguelikes ou des mini-RPG. Ici, Le dénominateur commun, ce n'est pas
le genre, c'est plutôt l'échelle. PICO-8 est taillé pour des jeux courts et
complets : le genre de jeu qu'on termine en une session et, surtout, qu'on
termine _tout court_. Comme la taille du code est volontairement limitée, les
jeux restent compacts : on peut les jouer et les finir d'une traite.

Tout ce petit monde vit dans un écosystème déjà bien fourni. PICO-8 embarque un
navigateur de cartouches intégré pour explorer ce que les autres ont créé. De
plus, la plupart de ces jeux se jouent directement dans le navigateur. Difficile
de faire plus simple pour partager ou découvrir un jeu.

Pour ma part, je vois surtout PICO-8 comme un formidable outil de prototypage.
L'idée : monter rapidement un prototype jouable, le partager, récolter des
retours et commencer à fédérer une communauté autour de votre concept. Si le
potentiel est là, rien ne vous empêche ensuite de passer à un outillage plus
costaud (MonoGame, Aseprite et compagnie) pour en faire une version «
commerciale » plus ambitieuse.

L'exemple parfait ici, c'est Celeste. Le jeu d'origine (aujourd'hui appelé
Celeste Classic) a été développé sous PICO-8 par Maddy Thorson et Noel Berry en
seulement quatre jours, dans le cadre d'une game jam, en 2016. Ce petit
prototype est devenu l'un des platformers indé les plus salués de son époque :
le jeu complet est sorti en janvier 2018, cette fois redéveloppé en C#. Une
seule et même idée, donc, qui tient parfaitement la route en version PICO-8 et
qui a servi de tremplin vers un jeu autrement plus ambitieux. Les deux à la
fois.

---

## 4. Pourquoi je trouve ça intéressant (perso)

PICO-8 me permet de me concentrer sur l'essence même du jeu vidéo, à savoir le
game design (j'ai beaucoup lu dessus dernièrement et je vais revenir dessus
bientôt). Il est tout à fait possible de faire un petit jeu mignon et soigner
ses pixels. Mais l'outil pousse surtout à travailler les _sensations de jeu_,
autrement dit la façon dont un saut répond, dont un déplacement « croustille »,
et comment la difficulté monte. Tout le reste est moins important. Il ne reste
que la seule question qui compte vraiment : est-ce que c'est bon à jouer ?

Le fait de pouvoir se concentrer sur le game design est, en grande partie, du au
fait que tout est centralisé. Il n'y a pas de chaîne d'outils à monter ou
d'allers-retours entre cinq logiciels. Via PICO-8, je code, je dessine, je
compose, le tout au même endroit. Le résultat, c'est que j'avance beaucoup plus
vite et je me prends beaucoup moins la tête. De plus, comme on revient aux
fondamentaux, à savoir la boucle de jeu, les sprites, les collisions, sans
framework lourd à apprivoiser, la boucle de feedback est quasi immédiate ! Je
modifie une ligne, je relance et je vois le résultat dans la seconde.

Il y a aussi un point que je trouve loin d'être négligeable : la distribution.
PICO-8 permet d'exporter son jeu en HTML/JavaScript, donc de le rendre jouable
dans un navigateur en un clic. Concrètement, ça veut dire qu'on peut diffuser
son jeu et le faire connaître très vite, sans demander à personne d'installer
quoi que ce soit. Pour un créateur qui cherche des retours ainsi qu'une
communauté, c'est précieux.

Enfin, une chose à laquelle je tiens. On peut tout à fait s'aider de l'IA pour
le code. Mais pour la musique et les sprites, on reste largement à devoir mettre
les mains dedans, à les faire soi-même. Et honnêtement ? Je trouve ça génial. Ce
travail manuel, c'est précisément ce qui donne à un jeu sa personnalité et sa
patte.

---

## 5. Les contraintes (et pourquoi c'est une force)

Pour moi, ce sont les contraintes qui font naître les meilleurs jeux. C'est
d'ailleurs en partie pour ça que je me suis mis aux game jams. J'aime créer sous
contrainte, un peu comme en cuisine, quand on doit composer avec ce qu'on a sous
la main plutôt qu'avec un garde-manger infini. Avoir un cadre me permet de
débloquer ma créativité.

Et, pour le coup, des contraintes, PICO-8 n'en manque pas. L'écran est une
petite grille de 128×128 pixels, la palette est fixée à 16 couleurs, et le code
lui-même est limité : un cartridge (un fichier de jeu) ne peut pas dépasser 8192
_tokens_. En gros, chaque mot, nombre, parenthèse ou signe de ponctuation
compte. Vous n'avez donc pas la place de vous éparpiller.

C'est précisément là que la contrainte devient une force. Quand l'espace est
compté, on arrête de tergiverser sur mille options et on va à l'essentiel. Ça
nous force à retrouver le cœur du jeu vidéo, à nous concentrer sur le game
design sans nous laisser polluer l'esprit par tout le superflu. Mieux : à devoir
faire tenir vos idées dans si peu de place, vous apprenez à écrire du code plus
efficace et à aborder chaque problème avec créativité. La limite ne bride pas
l'inventivité — elle la stimule.

Soyons honnêtes une seconde : ce cadre a aussi son revers. PICO-8 n'est pas fait
pour des jeux tentaculaires. Sur un projet ambitieux, vous finissez par toucher
le plafond de tokens — et il faut alors soit optimiser l'existant, soit porter
le jeu vers une plateforme plus large (on retombe sur le chemin évoqué plus
haut). Mais pour ce que PICO-8 vise — de petits jeux qui ont du caractère —, ces
limites ne sont pas un obstacle. Elles sont le terrain de jeu.

---

## 6. Un petit aperçu du code

Pas de panique, on ne va pas plonger dans un tutoriel complet ici. J'ai juste
envie de vous montrer à quoi ressemble le squelette d'un jeu PICO-8, histoire de
démystifier la chose.

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

Ce minuscule programme affiche le texte « hello pico-8! » qui se déplace
doucement vers la droite. Et il illustre tout le modèle mental :

- `_init()` est appelée une seule fois, au démarrage. C'est ici qu'on prépare
  l'état de départ. Dans notre cas, on place la variable `x` à 0.
- `_update()` est appelée à chaque frame, 30 fois par seconde. C'est le cœur
  logique du jeu : on y fait évoluer l'état. Ici, on incrémente `x`, donc la
  position avance image après image.
- `_draw()` est appelée elle aussi à chaque frame, pour dessiner. `cls()` efface
  l'écran (sinon le texte laisserait une traînée derrière lui), et `print()`
  affiche notre message à la position `x` sur l'axe horizontal, à 60 pixels du
  haut.

L'idée à retenir ici, c'est cette séparation : d'un côté ce qui _change_
(`_update`), de l'autre ce qui _s'affiche_ (`_draw`). Vous n'écrivez jamais la
boucle de jeu vous-même. Vous remplissez ces trois cases et le moteur se charge
du rythme. Une fois qu'on tient ça, on tient le fil de presque tous les jeux
PICO-8.

---

Je ne fais que commencer avec PICO-8 mais je sais déjà que je vais y rester un
moment. L'outil a quelque chose d'addictif : cette sensation de pouvoir passer
de l'idée au prototype jouable en une soirée, et ce, sans friction.

Du coup, je compte bien creuser le sujet ici sur NX. Dans les prochaines
semaines, j'aimerais écrire quelques tutoriels et peut-être tourner quelques
vidéos pour construire ensemble un petit jeu de plateforme, pas à pas. Si
l'envie de coder votre premier jeu vous titille, ce sera l'occasion idéale de
vous lancer.

En parallèle, je m'apprête à participer à une nouvelle game jam : la Retro
Recreation Jam, qui démarre dans quelques jours. Le principe : repartir d'un jeu
d'avant l'ère NES et le réinventer à sa sauce. J'ai déjà mon idée en tête mais
je vous en reparlerai plus en détail très bientôt.

En attendant, si cet article vous a donné envie d'essayer PICO-8, ne
réfléchissez pas trop : lancez la version d'essai dans votre navigateur, tapez
deux ou trois lignes, et voyez où ça vous mène. C'est souvent comme ça que
commencent les meilleures histoires.

## Ressources

- Le site officiel de PICO-8, pour acheter l'outil et découvrir la console :
  [lexaloffle.com/pico-8](https://www.lexaloffle.com/pico-8.php).
- Le manuel officiel, qui couvre toute l'API ainsi que les fonctions des
  éditeurs intégrés :
  [le manuel PICO-8](https://www.lexaloffle.com/dl/docs/pico-8_manual.html).
  [Lexaloffle](https://www.lexaloffle.com/dl/docs/pico-8_manual.html)
