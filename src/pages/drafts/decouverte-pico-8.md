
# Intro à Pico 8

## 1. Accroche (carnet, première personne)

- Il y a quelques mois maintenant, j'ai écrit une fiche technique sur le
  développement de jeux vidéo avec Pygame. Pour rappel, je me suis pas mal
  servi pour travailler sur mon city builder.
- Depuis, j'ai commencé à explorer d'autres outils. J'ai notamment pris en main
  Monogame qui est en C# et j'ai participé à une Game Jam sur itch.io. Je vais
  bientot écrire un article dessus mais vous pouvez trouver le jeu en attendant
  ici: https://tdimnet.itch.io/campfire-stories
- Suite à cette Jam, j'ai commencé à regarder un autre outil : Pico-8 et
  j'avoue avoir été ultra séduit par l'outil. J'ai un peu conscience que je suis en train de mettre la charue avant les
  boeufs. Autrement dit, je présente un nouvel outil avant d'expliquer
  pourquoi j'ai choisi cet outil. Mais bon, sachez que j'y reviendrais d'ici
  peu.
- Dans cet article, je vais prendre le temps un peu de revenir sur Pico-8, sur
  son fonctionnement et pourquoi je pense que c'est l'une des meilleures
  solutions pour développer des jeux vidéo simplement. Cet article se veut
  résolument tout public :). 

## 2. Qu'est-ce que PICO-8 ?

- Bon, alors, la première question : Pico-8, c'est quoi ? C'est ce qu'on
  appelle une "fantasy console". Je vous avoue que je ne trouve pas forcément
  le terme très parlant. En gros, c'est une console fictive. À la différence de
  la Super Nes ou d'une Sega, cette console n'a jamais existé (en physique en
  tout cas).
- D'ailleurs, je pense que plus qu'une console, c'est surtout un environnement
  de développement où tout est intégré. Vous avez votre eidteur de texte (vous
  allez coder en Lua), un éditeur de sprites, de niveaux, de son et de musique.
  J'y reviendrais un peu plus tard dessus dans l'article mais c'est ce que je
  trouve le plus intéressant avec Pico 8.
- Du coup, Pico-8 vous permet de télécharger et de faire tourner des jeux mais
  aussi de les créer. C'est un peu un outil tout en un qui vous permet de tout
  faire.
- Je crois savoir qu'il existe une version gratuite mais pour le coup, j'ai
  décidé de passer par la version payante de l'outil. Ca m'a couté 10/15 euro
  et je trouve que ca vaut totalement l'investissement. Vous pouvez acheter et
  télécharger le logiciel ici : https://www.lexaloffle.com/pico-8.php

## 3. Quel genre de jeux ça permet de faire ?

- Alors, qu'est-ce qu'on peut faire comme jeu avec Pico-8 ? Principalement des
  jeux "tintés" retro. Vous allez pouvoir faire des jeux de plateformes (Mario,
  Celeste, Super Meat Boy), des puzzles games, des shoot'em up, des roguelikes
  et meme des clickers.
- Il y a un gros cote retro assez jeu. Pensez vraiment à ce qui a fait les
  bases du jeu vidéo. Vous n'allez pas pouvoir faire des jeux avec des gros
  moteurs 3D ou meme des FPS. Ce n'est pas vraiment adapté.
- Ces jeux peuvent tourner dans la console virtuelle de Pico-8 mais peuvent
  aussi dans votre navigateur (ce qui est idéal pour partager rapidement des
  prototypes).
- Pico-8 a permis de développer quelques jeux célèbres aujourd'hui tel que
  Celeste. Il faut savoir qu'avant de tourner sur Monogame (tiens, tiens,
  comment on se retrouve, la première version de Celeste a été développé sur
  Pico-8).
- L'idée globale ici est donc de pouvoir développer assez rapidement des jeux
  ou des prototypes de jeu. En gros, de tester un concept, avec des assets
  visuels et sonores, avant de potentiellement passer sur quelque chose de plus
  "industriel" (un combo Monogame + Aseprite par exemple).


## 4. Pourquoi je trouve ça intéressant (perso)

Le scope forcément petit → on va au bout, on apprend le cycle complet (concevoir → coder → finir → publier)
Retour aux fondamentaux : boucle de jeu, sprites, collisions, sans framework lourd ni setup
Le plaisir de l'immédiateté : tu lances, tu codes, tu vois le résultat en quelques secondes
(Lien possible avec ta voix : ce que ça change par rapport à un gros projet long)

## 5. Les contraintes (et pourquoi c'est une force)

Les specs : 128×128, 16 couleurs, budget de tokens/caractères limité [à vérifier : chiffres exacts]
La thèse : la contrainte comme moteur créatif, pas comme frustration — on arrête de tergiverser sur les options, on crée
Les choses honnêtes à savoir : Lua peut surprendre, ce n'est pas fait pour des gros jeux, la courbe d'apprentissage de l'éditeur intégré
Le bon état d'esprit pour aborder l'outil

## 6. Un petit aperçu du code

Le cycle de vie : _init() → _update() → _draw() (ton triptyque)
Un exemple minimal : un print() dans _draw, peut-être une variable qui bouge dans _update
Insister : c'est juste pour montrer le modèle mental, pas un tuto

## 7. Pour aller plus loin

Le site officiel / la doc / le manuel [liens à vérifier]
La communauté (BBS, ressources d'apprentissage marquantes)
Teaser du cluster : « dans un prochain article, on fait un premier petit jeu » → maillage interne

## 8. Clôture (optionnelle, carnet)

Où tu en es toi avec l'outil, ce que tu comptes en faire
Invitation discrète à essayer
