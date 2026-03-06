---
layout: ../../layouts/CheatSheetsLayout.astro

title: "Comment débuter avec Pygame ?"
description: Le Game loop et le pattern update/draw

author: Thomas
kind: Fiche technique
level: debutant
publishedDate: 03/07/2026
---

<article>

# Comment débuter avec Pygame ?

Si vous avez lu [mon bilan](/articles/review-nx-2025) ou mes
[projets pour 2026](/articles/projets-pour-2026), vous avez peut-être remarqué
que je n'en avais pas parlé. Et pourtant, depuis octobre 2025, je code des jeux
vidéo (entre autres choses). Je me suis totalement pris au jeu (sans mauvais jeu
de mots) et ça fait maintenant plusieurs mois que je travaille sur mon premier
projet : un jeu en Python avec Pygame.

Comme tout bon enseignant qui se respecte, j'ai décidé d'écrire dessus pour
enseigner ce que j'avais appris. Peut-être même que je finirais par en faire un
cours, soyons fous ! **Cette première fiche pose les bases** : comment
fonctionne une game loop et pourquoi le pattern update/draw est l'un des
premiers concepts à maîtriser quand on se lance dans le développement de jeux.

On va construire ensemble un petit idle game. Un compteur qui s'incrémente
automatiquement, un clic pour accélérer le score. Simple, mais suffisant pour
comprendre comment un jeu fonctionne vraiment sous le capot.

<br>

## Pygame, c'est une bibliothèque, pas un framework!

Avant d'écrire la moindre ligne de code, il y a une chose importante à
comprendre sur Pygame : **c'est une bibliothèque, pas un framework**.

Si vous venez du développement web, vous êtes probablement habitués à des
frameworks comme Django ou Laravel. Un framework, ça vous donne une structure.
Ca vous dit où mettre vos fichiers, comment organiser votre code et/ou quand
telle ou telle fonction est appelée. Vous suivez ses conventions, il s'occupe du
reste.

Pygame ne fait rien de tout ça. En fait, **c'est plus proche de React dans
l'esprit**. Vous décidez comment organiser votre code. Et si vous ne le faites
pas bien, ça peut vite devenir le bazar.

Concrètement, Pygame est une collection d'outils. Vous allez trouver des
fonctions pour ouvrir une fenêtre, dessiner des formes, jouer des sons et
détecter des événements au clavier et à la souris. Il s'appuie
[sur SDL (Simple DirectMedia Layer)](https://www.libsdl.org/) en arrière-plan,
une bibliothèque C qui donne accès à l'audio, au clavier, à la souris et à
l'affichage. Pygame est _simplement_ une surcouche Python par-dessus tout ça.

<br>

Voici à quoi ressemble le programme Pygame le plus simple possible :

```python
import sys
import pygame

pygame.init()

screen = pygame.display.set_mode((800, 600))
pygame.display.set_caption("My First Game")

clock = pygame.time.Clock()

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()

    screen.fill((30, 30, 30))
    pygame.display.flip()
    clock.tick(60)
```

Lancez ce code et vous obtiendrez une fenêtre noire de 800x600 pixels. Bon, ok,
vu comme ça, ce n'st pas très excitant mais, le fait est, qu'il se passe déjà
beaucoup de choses ici. On va décortiquer ça dans la section suivante.

<br>

## Focus sur la Game Loop

Vous voyez le `while True` dans le code précédent ? C'est la game loop. **Et
c'est probablement l'un des concepts les plus importants du développement de
jeux.**

Dans une application web, votre code s'exécute quand quelque chose se passe : un
utilisateur envoie une requête, vous la traitez, vous renvoyez une réponse et
votre code s'arrête. C'est le modèle Request/Response. Le serveur attend. Rien
ne se passe tant que personne ne frappe à la porte.

Un jeu fonctionne complètement différemment. **Votre code tourne en continu, 60
fois par seconde, qu'il se passe quelque chose ou non**. À chaque frame, le jeu
vérifie les entrées, met à jour son état et redessine l'écran. C'est ça, la game
loop. Elle tourne jusqu'à ce que le joueur ferme la fenêtre.

Pensez à un
[flipbook ou _foloscope en francais (j'ai appris un mot ^^)_](https://fr.wikipedia.org/wiki/Folioscope).
Chaque page est légèrement différente de la précédente. Feuilletez-le assez
vite, et vous obtenez l'illusion du mouvement. La game loop, c'est ce qui tourne
les pages.

<br>

Sa structure, en clair :

```python
while le_jeu_tourne:
    # 1. Vérifier les événements (clavier, souris, fermeture...)
    # 2. Mettre à jour l'état du jeu
    # 3. Tout dessiner à l'écran
    # 4. Attendre la prochaine frame
```

<br>

Mais alors, **pourquoi 60 FPS** ? C'est le seuil à partir duquel le mouvement
paraît fluide à l'œil humain. En dessous de 30 FPS, on commence à percevoir des
saccades. Entre 30 et 60, c'est acceptable. À 60, c'est fluide. Pour un jeu
Pygame, c'est le bon équilibre.

<br>

## Update et Draw : deux responsabilités distinctes

Maintenant que vous avez vu la game loop, parlons de ce qui se passe à
l'intérieur. **À chaque frame, votre jeu fait deux choses : il met à jour son
état et il dessine cet état à l'écran**. Ce sont deux responsabilités bien
distinctes et les garder séparées est l'une des meilleures habitudes à prendre
dès le début.

**L'Update, c'est là que vit votre logique**. C'est ici que vous déplacez des
personnages, incrémentez des compteurs, détectez des collisions et gérez les
entrées. Vous ne touchez pas à l'écran ici. Vous modifiez uniquement les données
qui décrivent votre monde.

**Draw, c'est là que vous prenez ces données et que vous les rendez visibles**.
Vous effacez l'écran, vous dessinez tout en fonction de l'état actuel et vous
affichez le résultat. Rien d'autre.

Ok, alors, pourquoi cette séparation est-elle si importante ? Imaginez que vous
mélangez les deux : vous déplacez un personnage et vous le dessinez dans le même
bloc de code. Ça fonctionne au début. Mais dès que votre jeu grossit. Par
exemple, en ajoutant des animations, une interface ou meme des overlays de
debug, vous ne savez plus où s'arrête la logique et où commence le rendu. Ça
devient vite ingérable.

<br>

En code, ça ressemble à ça :

```python
while True:
    # 1. Événements
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()

    # 2. Update
    # (la logique du jeu va ici)

    # 3. Draw
    screen.fill((30, 30, 30))
    # (le rendu va ici)
    pygame.display.flip()

    clock.tick(60)
```

Simple, propre et déjà prêt à grandir. Dans la section suivante, on va remplir
ces deux blocs et construire notre idle game.

<br>

## Construire un idle game

On va maintenant tout assembler. **L'objectif : un compteur qui s'incrémente
automatiquement et un clic pour accélérer le score.**

<br>

Voici le code complet :

```python
import sys
import pygame

pygame.init()

screen = pygame.display.set_mode((800, 600))
pygame.display.set_caption("My First Game")

clock = pygame.time.Clock()
font = pygame.font.SysFont("Arial", 32)

# État du jeu
score = 0
auto_increment = 1
click_bonus = 10
timer = 0.0
increment_interval = 1.0  # en secondes

running = True
while running:
    dt = clock.tick(60) / 1000.0  # delta time en secondes

    # 1. Événements
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.MOUSEBUTTONDOWN:
            score += click_bonus

    # 2. Update
    timer += dt
    if timer >= increment_interval:
        score += auto_increment
        timer = 0.0

    # 3. Draw
    screen.fill((30, 30, 30))
    score_text = font.render(f"Score: {score}", True, (255, 255, 255))
    hint_text = font.render("Cliquez pour gagner des points bonus !", True, (180, 180, 180))
    screen.blit(score_text, (300, 250))
    screen.blit(hint_text, (220, 320))
    pygame.display.flip()

pygame.quit()
sys.exit()
```

<br>

Décryptage des nouveaux éléments :

- `dt` (delta time) correspond, en secondes, au temps écoulé depuis la dernière
  frames. Plutôt que de compter des frames, on raisonne en temps réel. Votre
  logique devient ainsi indépendante du frame rate et se comporte de manière
  identique sur toutes les machines.
- `timer` est un _simple accumulateur_. À chaque frame, on y ajoute `dt`. Quand
  il atteint `increment_interval`, on incrémente le score et on le remet à zéro.
  C'est tout ce qu'il y a derrière un timer dans un jeu.
- `screen.blit` permet de dessiner du texte (ou des images) sur l'écran. On
  commence par transformer le texte en surface avec `font.render`, puis on la
  colle sur l'écran à la position souhaitée.

**Et voilà !** En moins de 50 lignes de code, vous avez un idle game fonctionnel
qui illustre la game loop, le pattern update/draw, le delta time et la gestion
des événements.

<br>

## Bonus - Testez votre Game Loop en changeant ses FPS

Vous pouvez facilement vérifier que votre logique est bien indépendante du frame
rate en changeant la valeur passée à clock.tick() :

```python
clock.tick(30)  # Essayez avec 30 FPS au lieu de 60
```

Si votre score s'incrémente toujours à la même vitesse, c'est que votre delta
time est correctement implémenté. Si le score ralentit, c'est que vous comptez
des frames quelque part au lieu de raisonner en temps réel. C'est un petit test
rapide mais très utile pour s'assurer que tout est bien en ordre.

---

Vous avez maintenant les bases pour démarrer avec Pygame. Dans les prochaines
fiches, on ira plus loin : gestion des sprites, système de caméra, et comment
structurer un projet qui dépasse les 50 lignes.

D'ici là, le code complet de cet article est disponible
[sur GitHub](https://github.com/tdimnet/learn-pygame-by-doing) avec les
instructions d'installation pour macOS, Linux et Windows.

<br>

## Ressources

- [La documentation officielle de Pygame](https://www.pygame.org/docs/)
- [Game Programming Patterns — Bob Nystrom](https://gameprogrammingpatterns.com/game-loop.html)
- [Code the Classics — Raspberry Pi Foundation](https://codeclassics.raspberrypi.com/)

</article>
