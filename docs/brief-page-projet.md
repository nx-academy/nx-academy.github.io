# Brief — la page « projet » de NX Academy

> Brief à coller dans Claude Design pour dessiner la page projet. Rédigé le
> 15/10/2026 à partir de [`projets.md`](./projets.md), qui reste la référence en
> cas d'écart.

## Ce qu'on dessine

Un nouveau format de contenu pour NX Academy : le **projet**. Ce n'est ni une
fiche, ni un cours, ni un tutoriel. C'est **un énoncé de travaux pratiques avec
son barème** : il décrit un livrable, des contraintes et des critères de
réussite, et renvoie vers les fiches du site pour le « comment ». Le lecteur
avance **seul** ; la page doit le donner à sentir.

À dessiner, par ordre de priorité :

1. **La page d'un projet** (`/projets/<slug>`), remplie avec le projet 1
   ci-dessous. Desktop et mobile, thème sombre et thème clair.
2. **La page d'index** (`/projets`) : la liste des projets, deux pour commencer.
   Plus simple, à faire une fois la première validée.

## Les règles à respecter

- **Suivre le design system** (README, `colors_and_type.css`) : deux thèmes
  actifs (sombre par défaut, clair), **pas le thème été**. Couleurs uniquement
  via les tokens `var(--*)`.
- Bordures fines, **pas d'ombres**, surfaces plates, une transition `0.4s ease`.
  Illustration pixel art en 16:9 en tête, rayon 16px.
- **Réutiliser le module de lecture existant** plutôt qu'inventer : en-tête
  éditorial (kicker, titre, chapô, signature), sommaire collant, chips mono,
  accordéon type FAQ, carte auteur, « À lire ensuite ».
- Le site a **très peu de JavaScript** et **aucun tracking** : tout ce qui
  s'ouvre ou se replie passe par `<details>` ; pas de compte, pas de backend.
- Accessibilité avant l'effet : contrastes, ordre de lecture, navigation au
  clavier.
- Tout le texte est **en français**, au « je » / « vous », en sentence case.

## Ce qui distingue un projet d'une fiche

- Le titre est **un livrable**, jamais une question (les fiches ont le monopole
  des titres en question).
- Pas de temps de lecture : on annonce une **durée de travail** (« Une soirée
  »).
- Les étapes sont des **résultats à atteindre**, pas des commandes. Aucune
  commande complète à copier, aucun bloc de code long — seulement, au besoin,
  une courte sortie de terminal attendue.
- Chaque étape renvoie vers **la fiche qui répond**.
- La correction est **un lien en bas de page**, après la liste de vérifications.
  Elle doit se mériter : ne pas la mettre en avant.

## L'anatomie de la page, dans l'ordre

1. **En-tête** — kicker `Projet · Docker`, titre, chapô, signature, et à la
   place du temps de lecture : la durée (`Une soirée`) et le niveau
   (`Intermédiaire`). Illustration pixel art.
2. **Le brief** — trois lignes : ce qu'on construit, à quoi ça sert, le résultat
   visible.
3. **Ce qu'il faut savoir avant** — la liste des prérequis (cours + fiches),
   chacun relié à l'étape où il sert. C'est un bloc important : le projet n'est
   faisable qu'avec eux.
4. **L'objectif** — une phrase forte, en exergue.
5. **Les étapes** — six, numérotées. Chacune porte : son **objectif**, son
   **critère** (« à la fin de l'étape… »), sa **contrainte** (ce qu'on
   s'interdit), une question **Avant** (le lecteur s'engage sur une réponse
   avant d'agir), une vérification **Après**, et le lien vers la fiche. C'est le
   cœur de la page : il faut que les six se parcourent bien et que « Avant » / «
   Après » soient très lisibles.
6. **Les pièges** — trois ou quatre, sans la réparation.
7. **Comment savoir que c'est fini** — une liste de vérifications que le lecteur
   fait seul, chacune observable. Une liste à cocher peut avoir du sens (sans
   rien envoyer nulle part).
8. **Pour aller plus loin** — deux ou trois extensions, sans correction.
9. **La correction** — un lien discret vers le dossier de correction, un dossier
   par étape.

Le sommaire collant peut suivre les six étapes.

## Le contenu du projet 1, pour remplir la maquette

**Titre** : Conteneuriser une application full-stack, proprement **Série** :
Docker · **Niveau** : Intermédiaire · **Durée** : Une soirée

**Brief** : On repart de l'application du fil rouge du cours Docker — React,
Node, MongoDB. Le cours l'a fait tourner. Ici, personne ne tient la main, et des
contraintes s'ajoutent. À la fin, `docker compose up` démarre tout, l'image de
l'API pèse moins de 150 Mo, la base n'est joignable que par l'API, aucun secret
n'est dans l'image, et l'image est livrée sur un registry.

**Objectif** : Passer de « ça tourne » à « c'est bien fait », et savoir
justifier chaque choix.

**Prérequis** :

- Cours « Conteneurisez vos applications avec Docker », chapitre « Créez votre
  premier docker compose » — étape 1
- Comment optimiser une image Docker ? — étape 2
- Comment faire un multi-stage build ? — étape 2
- Comment (bien) utiliser les volumes Docker ? — étape 3
- Comment bien gérer les réseaux Docker ? — étape 4
- Comment bien gérer les secrets en Docker ? — étape 5
- Qu'est-ce qu'un registry Docker ? — étape 6

**Les étapes** :

1. **Tout démarre en une commande.** Objectif : l'environnement d'exécution vit
   dans l'image, pas sur la machine. Critère : `docker compose up` lève les
   trois services et l'application répond. Contrainte : aucune dépendance
   installée sur la machine, pas même Node. Avant : « Qu'est-ce qui fait tourner
   l'application sur votre machine aujourd'hui, et qui ne sera pas dans le
   conteneur ? » Après : arrêtez MongoDB pendant que l'API tourne. Que se
   passe-t-il ?
2. **L'image de l'API passe sous les 150 Mo.** Objectif : une image est un
   empilement de couches, et ce qu'on y met y reste. Contrainte : multi-stage
   obligatoire, pas de dépendances de développement dans l'image finale. Avant :
   « À votre avis, quelle part de la taille vient des dépendances de
   développement ? » Après : lancez `docker history` sur votre image. Quelle
   couche pèse le plus, et pourquoi ?
3. **Les données survivent à `docker compose down`.** Objectif : le conteneur
   est jetable, les données ne le sont pas. Contrainte : un volume nommé, pas un
   dossier de la machine. Avant : « Après `docker compose down`, où sont vos
   données ? » Après : `docker compose down -v`, puis relancez. Qu'est-ce qui a
   disparu ?
4. **La base n'est plus joignable depuis la machine.** Objectif : les services
   se joignent par leur nom ; publier un port n'est pas la même chose qu'être
   joignable. Contrainte : aucun port de MongoDB publié. Avant : « Sans port
   publié, l'API pourra-t-elle encore joindre la base ? » Après :
   `docker network inspect`. Qui est sur quel réseau ?
5. **Aucun secret dans l'image ni dans le dépôt.** Objectif : ce qui entre au
   build ne s'efface pas. Contrainte : les secrets arrivent à l'exécution,
   jamais au build. Avant : « Si vous supprimez le `.env` plus loin dans le
   Dockerfile, est-il encore dans l'image ? » Après : cherchez, dans votre image
   et votre historique Git, le dernier endroit où un secret aurait pu rester.
6. **L'image est livrée.** Objectif : une image est un artefact versionné, qu'un
   autre doit pouvoir récupérer à l'identique — c'est elle que le projet 2
   reprendra. Contrainte : un tag autre que `latest`. Avant : « Si deux
   personnes poussent `latest` le même jour, quelle version tourne en production
   ? » Après : tirez l'image par son tag sur une autre machine.

**Les pièges** :

- L'image « optimisée » qui reste énorme parce que le `.dockerignore` manque.
- Le volume qui garde l'ancien schéma, et une application qui échoue sans rien
  dire.
- Le secret retiré du fichier mais toujours dans l'historique Git — et dans une
  couche de l'image.
- `depends_on` qui ne veut pas dire « la base est prête ».

**Comment savoir que c'est fini** :

- `docker compose up` sur une machine propre, l'application répond.
- `docker images` : l'API est sous 150 Mo.
- `docker compose down && docker compose up`, les données sont là.
- Une connexion à MongoDB depuis la machine échoue.
- `docker history` ne montre aucun secret.
- `docker pull` de l'image, par son tag, depuis une autre machine fonctionne.

**Pour aller plus loin** : un `healthcheck` qui rend `depends_on` honnête ; un
second fichier Compose pour le développement ; la même image en `arm64` et
`amd64`.

**Correction** : un dossier par étape, sur GitHub.

## Ce que j'attends en sortie

- Deux ou trois directions pour la page projet, côte à côte, puis une version
  retenue en sombre et en clair, desktop et mobile.
- Un **handoff** comme ceux du Feed et des Mises à jour : la page en HTML/CSS,
  avec les tokens du design system, et un README qui liste les composants
  réutilisés et les nouveaux.
