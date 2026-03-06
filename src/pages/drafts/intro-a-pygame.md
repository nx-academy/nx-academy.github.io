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

## Pygame, c'est une bibliothèque, pas un framework!

Avant d'écrire la moindre ligne de code, il y a une chose importante à
comprendre sur Pygame : c'est une bibliothèque, pas un framework.

Si vous venez du développement web, vous êtes probablement habitués à des
frameworks comme Django ou Laravel. Un framework vous donne une structure : il
vous dit où mettre vos fichiers, comment organiser votre code, quand telle ou
telle fonction est appelée. Vous suivez ses conventions, il s'occupe du reste.

Pygame ne fait rien de tout ça. C'est plus proche de React : vous décidez
comment organiser votre code. Et si vous ne le faites pas bien, ça peut vite
devenir le bazar.

Concrètement, Pygame est une collection d'outils — des fonctions pour ouvrir une
fenêtre, dessiner des formes, jouer des sons, détecter les entrées clavier et
souris. Il s'appuie sur SDL (Simple DirectMedia Layer) en arrière-plan, une
bibliothèque C qui donne accès à l'audio, au clavier, à la souris et à
l'affichage. Pygame est simplement une surcouche Python par-dessus tout ça.

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

Lancez ce code, et vous obtiendrez une fenêtre noire de 800x600 pixels. Pas très
excitant pour l'instant — mais il se passe déjà beaucoup de choses ici. On va
décortiquer ça dans la section suivante.

</article>
