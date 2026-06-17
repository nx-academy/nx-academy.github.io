# Intro à Pico-8

## 1. Accroche (carnet, première personne)

Le déclic : pourquoi tu t'es mis à PICO-8 récemment (curiosité, envie de revenir à quelque chose de petit / fini, contraste avec un gros projet comme Buildings…)
Une phrase qui pose la promesse de l'article : pas un tuto, un retour d'expérience de dev qui découvre l'outil
Éventuellement : à qui ça parle (dev curieux de game dev, débutant, quelqu'un qui veut finir un jeu)

Retour : Globalement, je suis en phase avec les points que tu souhaites
aborder. Pour info, j'ai eu le déclic après avoir soumis mon premier jeu à un Gam Jam sur itch.io. C'est un point sur lequel je reviendrais dans un autre article
mais en gros, j'ai fait ma première Jam récemment, j'ai adoré et j'ai beaucoup
appris. J'ai fait le jeu en Monogame et globlalement, j'ai adoré. Mais c'est un gros outil qui me demande d'avoir plusieurs autres outils à cote (comme Aseprite pour les images et les spritesheets).
J'ai donc fait quelques recherches après la Jam et j'ai découvert Pico-8 et
j'ai rapidement compris le potentiel de l'outil.


---


## 2. Qu'est-ce que PICO-8 ?

La notion de fantasy console : une console fictive avec des specs volontairement limitées
Tout est intégré : éditeur de code (Lua), éditeur de sprites, de map, de son/musique — un seul outil, pas de chaîne d'outils à monter
Le cartridge .p8 : code + assets dans un seul fichier, partageable tel quel [à vérifier : le format .p8.png]
L'édition éducation gratuite en navigateur vs la version payante [à vérifier : prix, dispo]


Retour :
- Ici, j'aimerais bien ajouter que je ne comprends pas forcément le terme de
  fantasy console. Mais ce que je peux dire, c'est que c'est une console qui
  permet de faire des jeux retro.
- Comme tu le dis, tout est intégré. On peut exécuter des jeux, les coder,
  dessiner des sprites, faire de la musique.
- J'ai acheté l'édition payante : https://www.lexaloffle.com/pico-8.php. C'est
  un software que vous allez faire tourner sur votre ordinateur.
- Pour info, vous allez coder vos jeux en Lua. C'est un langage qui se raproche
  un peu du Ruby. Je le trouve perso assez lisible.

---


## 3. Quel genre de jeux ça permet de faire ?

Petits jeux complets et arcade : plateformers, puzzles, shoot'em up, roguelikes minimalistes
L'écosystème : le BBS / la communauté, les jeux jouables directement dans le navigateur
1-2 exemples concrets et marquants pour illustrer [à choisir : Celeste original, ou autres titres communautaires]
Le point clé : on parle de jeux qu'on termine, pas de projets qui s'éternisent

Retour :
- Parfait, je n'ai pas grand chose à redire là-dessus.
- Je pense que ca permet de faire avant tout des prototypes que l'on va pouvoir
  partager facilement. Une fois que vous avez testé le prototype et son
  potentiel et que vous avez vos retours (et construit une communauté), vous
  pouvez passer sur Monogame et Aseprite pour faire une version "commerciale"
  de votre jeu.
- Et effectivement, je parlerais principalement de Celeste, qui est l'exemple
  le plus parlant de succès sur Pico-8 (qui a d'ailleurs été développé lors
  d'une jam).


---


## 4. Pourquoi je trouve ça intéressant (perso)

Le scope forcément petit → on va au bout, on apprend le cycle complet (concevoir → coder → finir → publier)
Retour aux fondamentaux : boucle de jeu, sprites, collisions, sans framework lourd ni setup
Le plaisir de l'immédiateté : tu lances, tu codes, tu vois le résultat en quelques secondes
(Lien possible avec ta voix : ce que ça change par rapport à un gros projet long)

Retour :
- Pour moi, c'est vraiment un outil qui permet de se concentrer sur l'essence
  meme du jeu vidéo, a savoir le Game design. On peut certes faire un jeu un
  peu mignon mais on peut surtout grace à Pico-8 se concentrer sur les
  sensations de jeu.
- L'avantage d'avoir l'éditeur intégré pour les sprites et la musique, c'est
  aussi qu'on a pas à multiplier les outils. Un peu comme un IDE en
  programmation, c'est un environnement où tout va etre centralisé. Ce qui
  permet d'aller beaucoup plus vite et de moins se prendre la tete.
- Niveau distrubtion, le fait de pouvoir exporter son projet en HTML/JavaScript
  est pour moi non négligeable. Ca permet vraiment de pouvoir distribuer et
  faire connaitre son jeu assez vite.
- On peut s'aider de l'IA pour le code mais pour la musique et les sprites, on
  reste aussi beaucoup à devoir le faire à la main. Ce qui est une super chose,
  je trouve.

---


## 5. Les contraintes (et pourquoi c'est une force)

Les specs : 128×128, 16 couleurs, budget de tokens/caractères limité [à vérifier : chiffres exacts]
La thèse : la contrainte comme moteur créatif, pas comme frustration — on arrête de tergiverser sur les options, on crée
Les choses honnêtes à savoir : Lua peut surprendre, ce n'est pas fait pour des gros jeux, la courbe d'apprentissage de l'éditeur intégré
Le bon état d'esprit pour aborder l'outil

Retour :
- Exactement, pour moi, ce sont les contraintes qui permettent de créer les
  meilleurs jeux. C'est aussi pour ça que je me suis mis à faire des Jams. Je
  suis quelqu'un qui aime créer (ou cuisiner) sur la contrainte. J'aime qu'on
  m'impose des choses.
- Du coup, il y a beaucoup de "contraintes" sur Pico-8. On a une grille d'écran
  limité : 128 par 128 et 16 couleurs. On est aussi limité sur le nombre de
  caractères.
- Cela force vraiment le joueur à retrouver l'essence du jeu video et encore
  une fois, cela force à se concentrer sur le game design sans se faire
  "polluer l'esprit" par des choses externes.

---


## 6. Un petit aperçu du code

Le cycle de vie : _init() → _update() → _draw() (ton triptyque)
Un exemple minimal : un print() dans _draw, peut-être une variable qui bouge dans _update
Insister : c'est juste pour montrer le modèle mental, pas un tuto

Retour :
- Très bien, je te laisse le faire.


---


## 7. Pour aller plus loin

Le site officiel / la doc / le manuel [liens à vérifier]
La communauté (BBS, ressources d'apprentissage marquantes)
Teaser du cluster : « dans un prochain article, on fait un premier petit jeu » → maillage interne

Retour :
- on peut mettre un lien vers le site officiel et la doc si besoin. pas besoin
  de mettre des liens vers la communauté.

---


## 8. Clôture (optionnelle, carnet)

Où tu en es toi avec l'outil, ce que tu comptes en faire
Invitation discrète à essayer

Retour :
- Je mettrais ici le teaser du Cluster. En gros, que je vais écrire quelques
  tutos et peut-etre faire des vidéos pour réaliser un mini jeu de plateforme.
- Que je vais bientot commencer une nouvelle jam :
  https://itch.io/jam/retro-recreation-2026 et que j'ai déjà trouvé le jeu que
  je veux faire (j'en parlerais plus en détails prochainement).
