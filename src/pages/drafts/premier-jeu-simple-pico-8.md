---
layout: ../../layouts/CheatSheetsLayout.astro

title: Créer un premier jeu simple avec PICO-8
description:
  Tutoriel PICO-8 pour débutants : créez votre premier mini-jeu en Lua. Déplacer
  un personnage avec btn(), dessiner avec circfill() et spr(), ramasser des
  objets, gérer un score et coder une collision simple. Code commenté pas à pas.

imgAlt: Un petit personnage pixel qui ramasse une pièce dorée à l'écran, pixel art
imgSrc: /images/cheatsheets/premier-jeu-simple-pico-8.webp

author: Thomas
kind: Fiche technique
level: Débutant
publishedDate: 06/17/2026
---

<article>

# Créer un premier jeu simple avec PICO-8

![Un petit personnage pixel qui ramasse une pièce dorée à l'écran, pixel art](/images/cheatsheets/premier-jeu-simple-pico-8.webp)

Dans la fiche précédente, on a vu
[comment prendre en main PICO-8](/drafts/prendre-en-main-pico-8) : l'installer,
naviguer entre les éditeurs et lancer une cartouche. Mais un cercle qui bouge
tout seul, ce n'est pas encore un jeu.

**Aujourd'hui, on en fait un vrai.** Petit, mais complet : vous déplacez un
personnage, des pièces apparaissent à l'écran, et chaque pièce ramassée fait
grimper votre score. On va le construire ensemble, étape par étape, en partant
de zéro.

Je vous montre tout le code en Lua, commenté. Recopiez-le au fur et à mesure
dans l'éditeur de code de PICO-8 (`ESC` depuis le shell), tapez `run` après
chaque étape, et regardez le jeu prendre vie.

## Ce qu'on va construire

Un mini-jeu de collecte. Les règles tiennent en une phrase : déplacez un carré
avec les flèches, touchez la pièce, marquez un point, une nouvelle pièce
apparaît. Simple, mais il contient déjà presque tout ce qui fait un jeu :
entrées, état, affichage, collisions et score.

On avance en quatre étapes :

1. Afficher et déplacer le joueur.
2. Faire apparaître une pièce.
3. Détecter la collision et compter les points.
4. Afficher le score.

## Étape 1 — Afficher et déplacer le joueur

On commence par poser le joueur au centre de l'écran et le faire bouger avec les
flèches du clavier. La fonction clé ici, c'est `btn(b)` : elle renvoie `true`
quand le bouton `b` est enfoncé.

PICO-8 numérote les boutons directionnels ainsi : `0` = gauche, `1` = droite,
`2` = haut, `3` = bas.

```lua
function _init()
  -- position du joueur, au centre de l'écran 128x128
  player = { x = 64, y = 64 }
end

function _update()
  -- on lit les flèches et on déplace le joueur
  if btn(0) then player.x -= 2 end -- gauche
  if btn(1) then player.x += 2 end -- droite
  if btn(2) then player.y -= 2 end -- haut
  if btn(3) then player.y += 2 end -- bas
end

function _draw()
  cls(1)                                  -- efface l'écran en bleu foncé
  rectfill(player.x, player.y,
           player.x + 6, player.y + 6, 12) -- un carré bleu clair
end
```

Tapez `run`. Vous contrôlez maintenant un petit carré avec les flèches. On tient
notre joueur.

> Astuce : en PICO-8, `player.x -= 2` est un raccourci pour
> `player.x = player.x - 2`. Pratique pour économiser des tokens (souvenez-vous,
> une cartouche est limitée à 8192 tokens).

## Étape 2 — Faire apparaître une pièce

Ajoutons un objet à ramasser. On lui donne une position, et on le dessine sous
forme de petit cercle jaune avec `circfill(x, y, rayon, couleur)`.

Pour placer la pièce à un endroit aléatoire, on utilise `rnd(n)` qui renvoie un
nombre aléatoire entre 0 et `n`, et `flr()` qui arrondit à l'entier inférieur.

```lua
function _init()
  player = { x = 64, y = 64 }
  spawn_coin() -- on place une première pièce
end

function spawn_coin()
  -- une position aléatoire, en gardant une marge pour rester à l'écran
  coin = { x = flr(rnd(120)) + 4, y = flr(rnd(120)) + 4 }
end

function _update()
  if btn(0) then player.x -= 2 end
  if btn(1) then player.x += 2 end
  if btn(2) then player.y -= 2 end
  if btn(3) then player.y += 2 end
end

function _draw()
  cls(1)
  rectfill(player.x, player.y, player.x + 6, player.y + 6, 12)
  circfill(coin.x, coin.y, 3, 10) -- la pièce, en jaune (couleur 10)
end
```

Relancez avec `run` : une pièce jaune apparaît. Mais pour l'instant, on lui
passe au travers sans rien déclencher. C'est l'objet de l'étape suivante.

## Étape 3 — Détecter la collision et compter les points

Voici le cœur du jeu : savoir quand le joueur touche la pièce. La méthode la
plus simple ici, c'est de mesurer la **distance** entre les deux. Si elle est
inférieure à un petit seuil, c'est qu'ils se touchent.

On déclare un `score` dans `_init()`, et dès qu'il y a contact, on incrémente le
score et on fait réapparaître une pièce ailleurs.

```lua
function _init()
  player = { x = 64, y = 64 }
  score = 0
  spawn_coin()
end

function _update()
  if btn(0) then player.x -= 2 end
  if btn(1) then player.x += 2 end
  if btn(2) then player.y -= 2 end
  if btn(3) then player.y += 2 end

  -- centre du joueur (le carré fait 6 px de côté)
  local px = player.x + 3
  local py = player.y + 3

  -- distance entre le joueur et la pièce
  local dx = px - coin.x
  local dy = py - coin.y
  if sqrt(dx * dx + dy * dy) < 6 then
    score += 1   -- un point de plus
    spawn_coin() -- une nouvelle pièce apparaît
  end
end
```

(Le `_draw()` ne change pas par rapport à l'étape 2.)

Tapez `run`. Désormais, chaque fois que votre carré touche la pièce, elle
disparaît et réapparaît ailleurs. Le jeu est jouable ! Il ne manque plus qu'à
voir son score.

## Étape 4 — Afficher le score

Dernière touche : afficher le score à l'écran avec
`print(texte, x, y, couleur)`. On l'ajoute dans `_draw()`, par-dessus le reste.

```lua
function _draw()
  cls(1)
  rectfill(player.x, player.y, player.x + 6, player.y + 6, 12)
  circfill(coin.x, coin.y, 3, 10)
  print("score: " .. score, 4, 4, 7) -- en haut à gauche, en blanc
end
```

L'opérateur `..` colle deux morceaux de texte ensemble (la concaténation en
Lua). On affiche donc « score: 0 », puis « score: 1 », et ainsi de suite.

## Le code complet

Voici le jeu en entier, prêt à recopier dans une cartouche vierge :

```lua
function _init()
  player = { x = 64, y = 64 }
  score = 0
  spawn_coin()
end

function spawn_coin()
  coin = { x = flr(rnd(120)) + 4, y = flr(rnd(120)) + 4 }
end

function _update()
  if btn(0) then player.x -= 2 end
  if btn(1) then player.x += 2 end
  if btn(2) then player.y -= 2 end
  if btn(3) then player.y += 2 end

  local px = player.x + 3
  local py = player.y + 3
  local dx = px - coin.x
  local dy = py - coin.y
  if sqrt(dx * dx + dy * dy) < 6 then
    score += 1
    spawn_coin()
  end
end

function _draw()
  cls(1)
  rectfill(player.x, player.y, player.x + 6, player.y + 6, 12)
  circfill(coin.x, coin.y, 3, 10)
  print("score: " .. score, 4, 4, 7)
end
```

N'oubliez pas de sauvegarder : `ESC` pour revenir au shell, puis
`save mon-jeu-de-pieces`.

## Les fonctions PICO-8 utilisées

Pour récapituler les briques qu'on a manipulées :

<br>

| **Fonction**              | **Rôle**                             |
| ------------------------- | ------------------------------------ |
| `btn(b)`                  | Vrai si le bouton `b` est enfoncé    |
| `cls(c)`                  | Efface l'écran avec la couleur `c`   |
| `rectfill(x0,y0,x1,y1,c)` | Dessine un rectangle plein           |
| `circfill(x,y,r,c)`       | Dessine un cercle plein              |
| `print(txt,x,y,c)`        | Affiche du texte                     |
| `rnd(n)` / `flr(n)`       | Nombre aléatoire / arrondi inférieur |
| `sqrt(n)`                 | Racine carrée (pour la distance)     |

## Pour aller plus loin

Vous avez un jeu complet en une cinquantaine de lignes. À partir de là, des tas
de pistes s'ouvrent pour vous entraîner :

- remplacez le carré par un vrai **sprite** (dessiné dans l'éditeur de sprites,
  affiché avec `spr()`) ;
- ajoutez un **compte à rebours** pour transformer ça en course contre la montre
  ;
- jouez un petit **son** à chaque pièce ramassée avec `sfx()` ;
- faites **bouger la pièce** pour corser la difficulté.

Si vous découvrez tout juste l'outil, (re)lisez d'abord
[l'article de découverte de PICO-8](/drafts/decouvrir-pico-8) et la fiche
[prendre en main PICO-8](/drafts/prendre-en-main-pico-8). Et si vous venez
plutôt de Python, jetez un œil à [ma fiche sur Pygame](/fiches/intro-a-pygame) :
vous retrouverez exactement le même pattern update/draw.

## Ressources

- [Le manuel officiel PICO-8](https://www.lexaloffle.com/dl/docs/pico-8_manual.html)
  — la liste complète des fonctions de l'API.
- [PICO-8 Education Edition](https://www.pico-8-edu.com) — pour coder ce jeu
  gratuitement dans le navigateur.
- [Site officiel de PICO-8](https://www.lexaloffle.com/pico-8.php) — la version
  complète de l'outil.

</article>
