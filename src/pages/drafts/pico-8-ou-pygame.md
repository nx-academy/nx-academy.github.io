---
layout: ../../layouts/BlogPostLayout.astro

title: "PICO-8 ou Pygame : quel outil pour créer ton premier jeu ?"
description:
  "PICO-8 ou Pygame ? On compare les deux outils pour débuter le game dev :
  langage (Lua vs Python), contraintes, distribution, courbe d'apprentissage et
  cas d'usage. Le comparatif clair pour choisir par quoi commencer."

imgAlt: Deux manettes rétro face à face, l'une PICO-8 l'autre Python, pixel art
imgSrc: /images/articles/pico-8-ou-pygame.webp

kind: Articles
author: Thomas
draft: true
publishedDate: 06/17/2026
---

# PICO-8 ou Pygame : quel outil pour créer ton premier jeu ?

Depuis quelques mois, je code des jeux vidéo. J'ai commencé avec
[Pygame](/fiches/intro-a-pygame) en Python, puis je suis tombé sur
[PICO-8](/drafts/decouvrir-pico-8), une console fantastique qui m'a tout de
suite séduit. Forcément, la question revient souvent quand j'en parle autour de
moi : **par lequel commencer ?**

La réponse courte : les deux sont d'excellents points de départ, mais ils ne
visent pas tout à fait la même chose. PICO-8 te donne un studio complet sous
contrainte ; Pygame te donne une bibliothèque libre dans l'écosystème Python.
Voyons ça en détail pour que tu puisses choisir en connaissance de cause.

## C'est quoi PICO-8 ? C'est quoi Pygame ?

Avant de comparer, posons les définitions, parce qu'on ne compare pas vraiment
deux objets de même nature.

**PICO-8** est une _console fantastique_ : un logiciel tout-en-un (autour de 15
$) qui embarque un éditeur de code Lua, un éditeur de sprites, de map et de son.
On y crée de petits jeux rétro sous des contraintes volontaires (écran 128×128,
16 couleurs, 8192 tokens de code), et on les exporte en un clic pour les jouer
dans le navigateur.

**Pygame** est une _bibliothèque_ Python, gratuite et open source. Elle ne
fournit ni éditeur ni contraintes : elle te donne des briques (fenêtre, images,
sons, événements clavier) que tu assembles toi-même, dans ton propre
environnement Python, avec les outils que tu veux à côté.

Autrement dit : PICO-8 est un **studio complet et cadré**, Pygame est une
**boîte à outils libre** que tu intègres à un écosystème existant.

## Le comparatif en un coup d'œil

<br>

| **Critère**            | **PICO-8**                                 | **Pygame**                                   |
| ---------------------- | ------------------------------------------ | -------------------------------------------- |
| Nature                 | Console fantastique tout-en-un             | Bibliothèque Python                          |
| Langage                | Lua                                        | Python                                       |
| Prix                   | ~15 $ (version éducation gratuite)         | Gratuit, open source                         |
| Outils inclus          | Code, sprites, map, son, musique           | Aucun (à toi de choisir : Aseprite, etc.)    |
| Contraintes            | Fortes et assumées (128×128, 16 couleurs)  | Aucune imposée                               |
| Distribution           | Export HTML en un clic, jouable navigateur | Tu gères l'empaquetage (PyInstaller, web…)   |
| Courbe d'apprentissage | Très douce, feedback immédiat              | Douce si tu connais déjà Python              |
| Idéal pour             | Prototypes, jeux rétro courts, game jams   | Apprendre la prog par le jeu, projets libres |
| Limite principale      | Plafond de tokens sur gros projets         | Tout à construire/configurer soi-même        |

## Le langage : Lua contre Python

Avec **Pygame**, tu codes en **Python**. Si tu apprends déjà la programmation,
c'est un énorme avantage : tu réutilises un langage répandu, ultra-documenté, et
les compétences que tu gagnes servent bien au-delà du jeu vidéo (data, web,
scripts…).

Avec **PICO-8**, tu codes en **Lua**. C'est un langage léger et très lisible —
dans l'esprit, il m'a un peu rappelé Ruby. On le prend en main en une soirée. En
revanche, il est surtout utilisé dans le jeu vidéo (beaucoup de moteurs
l'embarquent comme langage de script), donc son champ d'application est plus
étroit que Python.

Verdict : si ton objectif est **d'apprendre à programmer** au sens large, le duo
Python et Pygame coche plus de cases. Si ton objectif est **de faire des jeux
vite**, le Lua de PICO-8 ne sera jamais un frein.

## Les contraintes : un cadre ou une page blanche ?

C'est, pour moi, la différence la plus structurante.

PICO-8 t'impose un cadre serré : 128×128 pixels, 16 couleurs, 8192 tokens. Ça
peut faire peur, mais c'est précisément sa force. Quand l'espace est compté, tu
vas à l'essentiel, tu travailles le _game feel_ plutôt que de te disperser, et
tu finis réellement tes jeux. La contrainte nourrit la créativité.

Pygame, lui, ne t'impose rien. Résolution, couleurs, taille du projet : tout est
ouvert. C'est grisant, mais c'est aussi une page blanche. Sans cadre, on peut
vite se perdre, repousser les décisions, et ne jamais terminer. Il faut
t'imposer toi-même tes limites.

Verdict : si tu as tendance à ne jamais finir tes projets, le cadre de PICO-8
est un cadeau. Si tu veux une liberté totale et que tu sais te discipliner,
Pygame te laisse tout l'espace.

## La distribution : faire jouer les autres

Sur ce point, PICO-8 a une vraie longueur d'avance. Tu exportes ton jeu en
HTML/JavaScript en un clic, et n'importe qui peut y jouer dans son navigateur,
sans rien installer. Pour récolter des retours et bâtir une communauté, c'est
imbattable.

Avec Pygame, la diffusion demande plus de travail : il faut empaqueter ton jeu
(par exemple avec PyInstaller pour un exécutable), ou passer par des solutions
tierces pour le faire tourner dans un navigateur. Rien d'impossible, mais c'est
une étape de plus à gérer.

## Alors, lequel choisir ?

Pas de mauvais choix ici. Tout dépend d'où tu pars et de ce que tu vises.

**Choisis PICO-8 si :**

- tu veux créer un jeu **complet et jouable très vite**, idéalement en game jam
  ;
- tu aimes (ou veux apprendre à aimer) l'esthétique **rétro** ;
- tu as besoin d'un **cadre** pour enfin finir tes projets ;
- tu veux **partager** ton jeu en un clic dans le navigateur.

**Choisis Pygame si :**

- tu **apprends Python** et tu veux le pratiquer via un projet ludique ;
- tu veux une **liberté totale** sur la taille et le style de ton jeu ;
- tu préfères un outil **gratuit et open source** ;
- tu envisages des compétences réutilisables **au-delà du jeu vidéo**.

Mon conseil, honnêtement ? Si tu débutes complètement, commence par PICO-8 pour
le plaisir immédiat de voir un jeu tourner, puis explore Pygame quand tu veux
plus de liberté (ou que tu apprends Python en parallèle). Les deux se
nourrissent : les fondamentaux que tu travailles d'un côté — la game loop, le
pattern update/draw, les collisions — se transposent directement de l'autre.

## Pour démarrer concrètement

Quel que soit ton choix, j'ai de quoi te lancer pas à pas :

- Côté PICO-8 : [découvrir l'outil](/drafts/decouvrir-pico-8), puis
  [le prendre en main](/drafts/prendre-en-main-pico-8) et enfin
  [créer un premier jeu simple](/drafts/premier-jeu-simple-pico-8).
- Côté Pygame : [comment bien débuter avec Pygame](/fiches/intro-a-pygame).

## Ressources

- [Site officiel de PICO-8](https://www.lexaloffle.com/pico-8.php) — pour
  découvrir et acheter la console fantastique.
- [Site officiel de Pygame](https://www.pygame.org) — la bibliothèque, sa
  documentation et ses exemples.
- [PICO-8 Education Edition](https://www.pico-8-edu.com) — pour tester PICO-8
  gratuitement dans le navigateur.
