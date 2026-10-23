# Les projets

> Cadrage écrit le 24 septembre 2026, après validation des deux règles qui le
> commandent. Rien n'est encore en ligne : ce document définit le format, puis
> déroule les deux premiers énoncés. La partie visuelle est confiée à Claude
> Design une fois ce cadrage figé.

## Ce qu'est un projet, ici

[`point-etape-rentree-2026`](../src/pages/articles/point-etape-rentree-2026.md)
donne déjà la moitié de la définition : « un projet suppose qu'il existe déjà,
quelque part, de quoi répondre aux questions qu'il soulève. Proposé trop tôt, il
devient un tutoriel qu'on recopie. »

Pris au mot, cela donne la propriété qui définit le format :

> **Un projet est un énoncé, pas un tutoriel. Il ne se suffit pas à lui-même, et
> c'est volontaire.** Il décrit un livrable, des contraintes et des critères de
> réussite. Le _comment_ n'est pas dedans : il est dans les fiches, vers
> lesquelles chaque étape renvoie.

C'est un sujet de travaux pratiques avec son barème. Ce qui tombe bien : c'est
le métier de l'auteur, et cela évite le « projet guidé en douze étapes » que
fait tout le monde et qui n'est qu'un cours déguisé.

### Contre quoi il se définit

Le site a déjà quatre façons de transmettre. Le projet est la cinquième, et il
n'a de sens que par ce qu'il refuse de faire.

| Format              | Ce qu'il promet                      | Qui conduit    |
| ------------------- | ------------------------------------ | -------------- |
| **Fiche technique** | une question, une réponse complète   | l'auteur       |
| **Article**         | un point de vue, un récit            | l'auteur       |
| **Cours**           | une progression complète et encadrée | l'auteur       |
| **Quiz**            | vérifier qu'on a compris             | le lecteur     |
| **Projet**          | un livrable à produire, seul         | **le lecteur** |

**Le cas du fil rouge mérite d'être traité à part**, parce qu'il existe déjà et
qu'on peut facilement écrire deux fois la même chose. Les deux cours ont un
chapitre « projet fil rouge » avec son dépôt : une application React, Node et
MongoDB pour
[le cours Docker](../src/pages/cours/docker-et-docker-compose/chapitres/presentation-projet-fil-rouge.md),
un portfolio pour
[le cours CI/CD](../src/pages/cours/ci-cd-github-actions/chapitres/presentation-projet-fil-rouge.md).
Le fil rouge est **l'exact inverse d'un projet** : il est guidé pas à pas,
screencasts à l'appui, et il ne laisse jamais le lecteur seul.

D'où la ligne de partage, qui est aussi ce qui donne au projet sa valeur ajoutée
:

> **Les fiches donnent les pièces. Le projet demande l'assemblage.** Chaque
> fiche répond complètement à sa question, isolément ; le projet est le seul
> endroit où elles doivent tenir ensemble, sous des contraintes que personne n'a
> posées pour le lecteur — la taille de l'image, les secrets qui ne traînent
> pas, la base qui n'est pas exposée, le cache qui fait gagner cinq minutes.

Formulée ainsi, la ligne ne dépend pas de l'existence des cours. C'est
volontaire : voir l'hypothèse des formations ci-dessous. Face au fil rouge, elle
se lit « le fil rouge fait marcher, le projet fait bien faire », mais elle reste
vraie pour un lecteur qui n'a suivi aucun cours.

### L'hypothèse des formations

Une réorganisation est envisagée, à terme : les cours deviendraient des
**formations**, c'est-à-dire des parcours qui assemblent des contenus existants
— fiches, articles, projets, quiz — au lieu de porter leurs propres chapitres.
L'intérêt est direct : une nouvelle formation coûterait un assemblage, pas neuf
chapitres et trente screencasts.

Ce que ça ferait au projet, si ça se fait : **le projet devient le fil rouge**.
Il cesse d'être un complément du cours pour en devenir la colonne vertébrale,
puisque c'est le seul contenu d'une formation qui soit cumulatif. Les fiches
sont autonomes par construction — c'est ce qui les fait bien référencer — donc
elles ne peuvent pas porter une progression. Le projet, si.

Le format décrit dans ce document ne change pas pour autant. Seule sa place
change : de contenu satellite, il passe au centre. Raison de plus pour que les
deux premiers énoncés soient bons.

## La règle : zéro prérequis externe

**Si une étape suppose une notion que NX ne couvre pas, le projet n'est pas prêt
à sortir.**

C'est la règle qui commande toutes les autres. Elle donne un critère objectif et
vérifiable pour répondre à « est-ce que ce projet peut sortir maintenant ? »,
elle protège le format de la dérive tutoriel — quand il manque une réponse, la
tentation est de l'écrire dans le projet — et elle transforme le catalogue en
actif plutôt qu'en décor.

Elle est **mécanisable**, et elle doit l'être : le champ `prerequis` du
frontmatter liste des chemins du site, et un test vérifie au build que chacun
résout vers un contenu publié. Un prérequis en `/drafts/` fait échouer le test.
Voir « routage et métadonnées » plus bas.

Conséquence immédiate, à reporter dans le cadrage concerné :
[`cluster-ia.md`](./cluster-ia.md) propose un projet IA comme premier ou
deuxième. C'est impossible tant que ses six fiches sont en brouillon, soit
jusqu'en décembre. **Le projet IA est le troisième ou le quatrième, pas avant
janvier 2027.**

## L'anatomie d'une page projet

Huit blocs, dans cet ordre.

> **Ajusté le 23/10/2026** après la première maquette de la page projet (ajout
> du starter, consigne explicite par étape, correction par étape). Cette
> anatomie suivra les maquettes suivantes : elle décrit l'état actuel, pas une
> règle figée.

1. **Le brief** — trois lignes : ce qu'on construit, à quoi ça sert. Plus le
   résultat visible, capture ou sortie de terminal.
2. **Le starter** — le point de départ à récupérer : un `.zip` servi par le
   site, et une commande pour copier le dossier (`degit`). La page montre son
   arborescence en quelques lignes. C'est l'étape 0 de la correction.
3. **Ce qu'il faut savoir avant** — la liste des fiches et chapitres prérequis,
   en dur. C'est à la fois le maillage interne et le test de la règle ci-dessus.
4. **Les étapes** — quatre à six, chacune formulée comme **un résultat à
   atteindre**, jamais comme une suite de commandes. Côté lecteur, une étape se
   lit dans cet ordre : **la consigne** (une ou deux phrases à l'impératif : ce
   qu'il faut faire, pas comment), **avant de commencer** (la question de
   prédiction), **c'est réussi quand** (le critère observable), **la règle** (la
   contrainte), **pour vérifier** (la question d'après), puis la fiche qui
   répond et **la correction de l'étape**, repliée. L'objectif d'apprentissage
   sert à concevoir l'étape ; sur la page, il se réduit à une ligne « pourquoi
   cette étape ».
5. **Les pièges** — trois ou quatre, ce qui va casser. Sans donner la
   réparation, ou en renvoyant à la fiche.
6. **Comment savoir que c'est fini** — une liste de vérifications que le lecteur
   fait seul, chacune observable. C'est ce qui remplace la correction
   automatique que le site ne peut pas avoir : pas de compte, pas de backend, et
   c'est très bien ainsi
   ([`l-atelier-presentation`](../src/pages/articles/l-atelier-presentation.md)
   l'assume déjà).
7. **Pour aller plus loin** — deux ou trois extensions, non guidées, sans
   correction.
8. **La correction complète** — un bloc visible en bas de page, qui renvoie à la
   suite des dossiers, du starter à la dernière étape.

### Ce qu'un projet ne contient jamais

- une commande complète à copier pour franchir une étape ;
- l'explication d'une notion — cela veut dire qu'il manque une fiche, et donc
  que le projet n'est pas prêt ;
- un bloc de code de plus de quelques lignes, sauf pour montrer un **résultat
  attendu** (une sortie, un extrait de log) ;
- un titre en question. Les fiches en ont le monopole ; un projet s'intitule par
  son livrable.

## Concevoir pour des lecteurs qui utiliseront l'IA

Noté le 24 septembre 2026. **Ce chantier n'est pas ouvert** — il l'est au moment
d'écrire les énoncés définitifs, pas avant. La note est ici pour qu'il ne se
perde pas.

Une partie des lecteurs fera le projet avec un modèle. Le leur interdire serait
à la fois inapplicable et malhonnête. La bonne réponse n'est pas de lutter,
c'est de **placer dans le parcours des questions qu'un modèle ne peut pas
traiter à la place du lecteur**, pour que le modèle mental se construise quand
même.

Trois leviers, par ordre de robustesse :

1. **La prédiction avant l'action.** Demander au lecteur de s'engager sur une
   réponse avant de mesurer : « avant de construire, à votre avis, quelle est la
   part des dépendances de développement dans la taille de l'image ? » Puis il
   mesure. **L'écart entre sa prédiction et le résultat est le moment où il
   apprend**, et un modèle ne peut pas s'engager à sa place — il peut donner la
   bonne réponse, ce qui ne produit précisément aucun écart.
2. **L'observation de son propre système.** « Lancez `docker history` sur
   _votre_ image : quelle couche pèse le plus, et pourquoi celle-là ? » La
   réponse dépend de son build. Pour la faire traiter par un modèle, il faut
   d'abord avoir regardé — ce qui est déjà l'essentiel.
3. **La panne provoquée.** « Supprimez le volume, relancez. Que se passe-t-il ?
   » Expliquer un échec construit davantage que produire un succès, et l'échec
   est le sien.

Ce que ça ajoute à l'anatomie décrite plus haut : **chaque étape porte une
question posée avant l'action et une vérification faite après**. La liste «
comment savoir que c'est fini » reste, elle vérifie le livrable ; les questions
d'étape, elles, vérifient la compréhension.

### Partir des objectifs d'apprentissage

Conséquence directe, et c'est une correction de méthode à faire sur ce document
: **les deux énoncés ci-dessous ont été écrits en partant des contraintes**,
parce que les contraintes se lisent directement dans le catalogue de fiches.
C'est un raccourci commode, mais l'ordre est inversé.

L'ordre juste est celui de la conception à rebours : **objectif d'apprentissage
→ critère de réussite → contrainte qui l'impose → étape**. « Image sous 150 Mo »
est une contrainte ; l'objectif derrière est « comprendre qu'une image est un
empilement de couches, et que ce qu'on y met y reste ». Les deux ne produisent
pas les mêmes questions d'étape, et c'est l'objectif qui doit gouverner.

Les énoncés qui suivent sont donc un **premier jet** : la structure et les
prérequis tiennent, la progression est à refaire depuis les objectifs. Cette
passe est le vrai travail restant avant de passer la main au visuel — davantage
que la mesure des seuils, qui pourrait d'ailleurs bouger après elle.

**Mise à jour du 14/10/2026** : la passe est faite pour le projet 1, dont les
étapes partent désormais de leurs objectifs. Le projet 2 reste un premier jet.

## La correction

Elle vit dans du code, **un dossier par étape**, et pas dans la page.

Trois raisons, dans l'ordre d'importance : le code ne pourrit pas dans du
Markdown non testé ; le lecteur ne peut pas copier la page entière d'un bloc ;
et il obtient un état par étape, ce qui est la bonne granularité pour comparer
sa solution à une autre.

**Décidé le 14/10/2026** : les corrections des premiers projets vivent dans ce
dépôt, sous `projets-corrections/<slug>/etape-<n>/` — hors de `src/pages/`, pour
qu'Astro ne les publie pas. Chaque dossier contient l'état complet de
l'application à la fin de l'étape ; le diff d'une étape est celui entre deux
dossiers voisins.

Pourquoi pas un commit par étape, comme prévu au départ : le dépôt squash-merge
ses PR, et les commits d'étape seraient fondus en un seul sur `main`. Le dossier
par étape est aussi plus simple à lire et à maintenir. Un dépôt dédié (en
submodule ou en subrepo) reste possible plus tard ; garder les corrections ici
au début permet aussi de les avoir sous la main en travaillant sur le site.

**Le starter est l'étape 0** (décidé le 23/10/2026) : `etape-0/` contient le
code de l'application sans aucun fichier propre au sujet du projet (pour le
projet 1 : aucun Dockerfile, aucun fichier Compose). La chaîne `etape-0` →
`etape-<n>` raconte alors tout le projet, et le diff de l'étape 1 montre
exactement ce que le lecteur a dû ajouter. Le `.zip` du starter est généré au
build et servi par le site, GitHub ne sachant pas zipper un sous-dossier.

**Une correction par étape, et elle se mérite quand même** : chaque étape
propose la sienne — le diff depuis l'étape précédente et le dossier complet —,
repliée, **après** sa question « pour vérifier ». Le lecteur la voit au moment
où il en a besoin, mais seulement une fois l'étape tentée. La correction
complète reste en bas de page.

## Routage et métadonnées

`src/pages/projets/<slug>.md` → `/projets/<slug>`, plus
`src/pages/projets/index.astro` et un `ProjectLayout.astro`. On reste sur le
routage par fichier, comme tout le reste du contenu.

```yaml
layout: ../../layouts/ProjectLayout.astro
title: "Conteneuriser une application full-stack, proprement"
description: "…"
imgAlt: "…"
imgSrc: /images/projets/<slug>.webp
author: Thomas Dimnet
github: tdimnet
kind: Projet
serie: docker
level: Intermédiaire
duree: Une soirée
correction: https://github.com/nx-academy/nx-academy.github.io/tree/main/projets-corrections/<slug>
prerequis:
  - /fiches/optimisation-images-docker
  - /cours/docker-et-docker-compose/chapitres/creation-premier-docker-compose
publishedDate: 10/12/2026
```

Trois choix à expliciter :

- **`serie` est une clé existante de [`series.ts`](../src/data/series.ts)**, pas
  une nouvelle. Un projet Docker remonte alors tout seul dans « À lire ensuite »
  des huit fiches Docker, via [`relatedContent`](../src/utils/relatedContent/).
  C'est le pont entre le catalogue et le projet, et il est gratuit.
- **`duree` remplace le temps de lecture.** Un projet ne se lit pas. On annonce
  une soirée ou un week-end, pas onze minutes.
- **`prerequis` est vérifié au build** par `src/utils/projets/` et son test
  colocalisé, selon la convention du dépôt. C'est la règle « zéro prérequis
  externe » rendue mécanique.

Pas d'entrée dans le header tant qu'il n'y a pas deux ou trois projets en ligne.
En attendant, les portes d'entrée sont `/cours` et `/fiches`.

## Mesurer ce que coûte un projet

L'article de rentrée promet deux à trois projets « pour voir ce que coûte un
projet, à écrire, à corriger, à maintenir, avant d'en promettre dix ». C'est une
promesse mesurable, donc elle se mesure.

Journal à tenir pour chacun des trois premiers, ici même :

| Projet | Écriture de l'énoncé | Écriture de la correction | Maintenance depuis | Publié le |
| ------ | -------------------- | ------------------------- | ------------------ | --------- |
| —      | —                    | —                         | —                  | —         |

La décision d'en faire plus se prend sur ce tableau, pas à l'intuition.

---

# Les deux premiers énoncés

L'ordre découle de la règle « zéro prérequis externe » appliquée au catalogue :
seuls Docker et CI/CD ont aujourd'hui de quoi répondre à toutes les questions
qu'un projet soulève. Le cloud sort en octobre, l'IA en décembre.

Et **le second reprend le livrable du premier**. Ce n'est pas une coquetterie :
cela teste la seule chose qui compte vraiment, savoir si une _chaîne_ de projets
tient. Cela produit aussi un artefact que le projet cloud pourra déployer quand
le cluster sera en ligne. La progression Docker → CI/CD → cloud → IA est
exactement celle des clusters existants, donc une recette déjà éprouvée.

## Projet 1 — Conteneuriser une application full-stack, proprement

`serie: docker` · `level: Intermédiaire` · `duree: Une soirée`

### Le brief

Le lecteur part d'un **starter** : une application React, Node et MongoDB,
fournie sans aucun fichier Docker. Personne ne tient la main, et six contraintes
s'ajoutent. À la fin, `docker compose up` démarre tout, l'image de l'API pèse
moins de 150 Mo, la base n'est joignable que par l'API, aucun secret n'est dans
l'image, et l'image est livrée sur un registry pour le projet 2.

Le starter garde l'histoire du fil rouge du cours Docker (« My MOOCs », une
liste de cours), sans ses fichiers Docker, et le projet ne dépend pas de l'état
dans lequel le lecteur a laissé le cours (décidé le 23/10/2026, après la
première maquette).

**Mais le code du fil rouge ne peut pas servir tel quel** (constaté le
23/10/2026 sur la branche `full-project` de
`nx-academy/Conteneurisez-vos-applications-avec-Docker`) : l'API se connecte à
MongoDB sans y lire ni écrire (deux routes, `/` et `/greetings`), le front est
le gabarit de Create React App, et les versions sont datées (Node 12,
`react-scripts` 3.1.1, Mongoose 4, MongoDB 3.7.9). L'étape 3 n'aurait rien à
vérifier, et le starter ne démarrerait sans doute pas sur un Node récent. Seul
`.example.env`, qui porte déjà deux secrets, est réutilisable tel quel.

Piste retenue pour la suite : un starter **neuf mais fidèle à l'histoire** — une
API Express (Node 22, MongoDB 8) avec une route pour lister les cours et une
pour en ajouter, un front React (Vite) qui les affiche et en ajoute, un
`.env.example` avec le mot de passe de la base et une clé d'API, aucun fichier
Docker.

**Le cours Docker est un prérequis obligatoire** (décidé le 14/10/2026) pour les
notions : le projet ne les réexplique pas. C'est aussi une donnée pour la
réflexion sur les formations : un projet adossé à un cours, c'est déjà une
formation en petit.

### Ce qu'il faut savoir avant

| Prérequis                                                                   | Sert à l'étape |
| --------------------------------------------------------------------------- | -------------- |
| `/fiches/optimisation-images-docker`                                        | 2              |
| `/fiches/bien-faire-multi-stage-build`                                      | 2              |
| `/fiches/bien-utiliser-volumes-docker`                                      | 3              |
| `/fiches/bien-gerer-reseaux-docker`                                         | 4              |
| `/fiches/bien-gerer-secrets-docker`                                         | 5              |
| `/fiches/presentation-registry-docker`                                      | 6              |
| `/cours/docker-et-docker-compose/chapitres/creation-premier-docker-compose` | 1              |

Sept prérequis, tous publiés. La règle est tenue.

### L'objectif

**Passer de « ça tourne » à « c'est bien fait », et savoir justifier chaque
choix.** Le fil rouge du cours fait marcher l'application ; le projet la fait
bien faire. Chaque étape correspond à une propriété d'une conteneurisation saine
: reproductible, légère, durable, cloisonnée, sans fuite, livrable.

Objectifs posés le 14/10/2026, en conception à rebours : objectif
d'apprentissage, puis critère, puis contrainte. À revoir une fois le projet
réellement déroulé.

### Les étapes

Chaque étape porte sa consigne, son objectif, son critère, sa contrainte, une
question posée **avant** l'action et une vérification faite **après** (voir «
concevoir pour des lecteurs qui utiliseront l'IA »). L'ordre ci-dessous est
celui de la conception ; la page les présente dans l'ordre de lecture décrit
dans « l'anatomie d'une page projet ».

1. **Tout démarre en une commande.**
   - _Consigne_ : écrire les Dockerfile du front et de l'API, puis un
     `docker-compose.yml` qui lance le front, l'API et MongoDB ensemble.
   - _Objectif_ : l'environnement d'exécution vit dans l'image, pas sur la
     machine ; Compose décrit un système — des services et leurs dépendances —,
     pas une suite de commandes.
   - _Critère_ : `docker compose up` lève les trois services et l'application
     répond.
   - _Contrainte_ : aucune dépendance installée sur la machine hôte, pas même
     Node.
   - _Avant_ : « Qu'est-ce qui fait tourner l'application sur votre machine
     aujourd'hui, et qui ne sera pas dans le conteneur ? »
   - _Après_ : arrêter MongoDB pendant que l'API tourne. Que se passe-t-il ?
2. **L'image de l'API passe sous les 150 Mo.**
   - _Consigne_ : noter la taille de l'image de l'API, puis réécrire son
     Dockerfile pour que l'image finale ne contienne que ce qui sert à
     l'exécution.
   - _Objectif_ : une image est un empilement de couches, ce qu'on y met y
     reste, et le contexte de build part entièrement au démon.
   - _Critère_ : `docker images` affiche moins de 150 Mo pour l'API.
   - _Contrainte_ : multi-stage obligatoire, et les dépendances de développement
     n'existent pas dans l'image finale. Le point de comparaison est la taille
     mesurée à l'étape 1.
   - _Avant_ : « À votre avis, quelle part de la taille vient des dépendances de
     développement ? » Le lecteur s'engage sur un chiffre, puis il mesure.
   - _Après_ : `docker history` sur _votre_ image. Quelle couche pèse le plus,
     et pourquoi celle-là ?
3. **Les données survivent à `docker compose down`.**
   - _Consigne_ : faire en sorte que les données de MongoDB soient conservées
     quand les conteneurs sont supprimés puis recréés.
   - _Objectif_ : le conteneur est jetable, les données ne le sont pas ; leurs
     cycles de vie sont séparés.
   - _Critère_ : après `down` puis `up`, les données sont là.
   - _Contrainte_ : un volume nommé, pas un montage de répertoire hôte.
   - _Avant_ : « Après `docker compose down`, où sont vos données ? »
   - _Après_ : `docker compose down -v`, puis relancer. Qu'est-ce qui a disparu,
     et pourquoi ?
4. **La base n'est plus joignable depuis la machine hôte.**
   - _Consigne_ : couper tout accès à MongoDB depuis la machine, sans casser la
     connexion entre l'API et la base.
   - _Objectif_ : sur un réseau Docker, les services se joignent par leur nom ;
     publier un port vers l'hôte n'est pas la même chose qu'être joignable sur
     le réseau interne. Chaque port publié est de la surface d'attaque.
   - _Critère_ : une connexion à MongoDB depuis l'hôte échoue, et l'application
     fonctionne toujours.
   - _Contrainte_ : plus aucun port de MongoDB publié ; seule l'API la joint,
     par le réseau.
   - _Avant_ : « Si vous retirez le port publié de MongoDB, l'API pourra-t-elle
     encore la joindre ? »
   - _Après_ : `docker network inspect`. Qui est sur quel réseau ?
5. **Aucun secret dans l'image ni dans le dépôt.**
   - _Consigne_ : sortir les secrets (mot de passe de la base, clés) de l'image
     et du dépôt ; ils sont fournis au lancement.
   - _Objectif_ : distinguer ce qui entre dans l'image au build de ce qui arrive
     à l'exécution ; une couche ne s'efface pas, l'historique Git non plus.
     L'étape réinvestit volontairement la notion de couche de l'étape 2.
   - _Critère_ : `docker history` sur l'image finale ne révèle rien, et le dépôt
     n'a aucune chaîne sensible dans son historique.
   - _Contrainte_ : les secrets arrivent à l'exécution, jamais au build.
   - _Avant_ : « Si vous supprimez le `.env` dans une instruction suivante du
     Dockerfile, est-il encore dans l'image ? »
   - _Après_ : retrouver, dans _votre_ historique d'image ou de dépôt, le
     dernier endroit où un secret aurait pu rester.
6. **L'image est livrée.**
   - _Consigne_ : donner une version à l'image de l'API et la publier sur un
     registry, pour que quelqu'un d'autre puisse la récupérer.
   - _Objectif_ : une image est un artefact versionné, qu'un autre doit pouvoir
     récupérer et retrouver à l'identique. C'est la charnière avec le projet 2,
     qui consomme précisément cette image.
   - _Critère_ : un `docker pull` d'un tag précis fonctionne depuis une autre
     machine.
   - _Contrainte_ : taguée autrement que `latest`.
   - _Avant_ : « Si deux personnes poussent `latest` le même jour, quelle
     version tourne en production ? »
   - _Après_ : tirer l'image par son tag sur une autre machine, et vérifier que
     c'est bien celle qu'on a construite.

### Les pièges

- L'image « optimisée » qui reste énorme parce que le `.dockerignore` manque, et
  que `node_modules` de l'hôte part dans le contexte de build.
- Le volume nommé qui garde l'ancien schéma, et une application qui échoue sans
  rien dire après un changement de modèle.
- Le secret retiré du fichier mais toujours présent dans l'historique Git — et
  dans une couche de l'image.
- `depends_on` qui ne veut pas dire « la base est prête », seulement « le
  conteneur est lancé ».

### Comment savoir que c'est fini

- `docker compose up` sur une machine propre, l'application répond.
- `docker images` : l'API est sous 150 Mo.
- `docker compose down && docker compose up`, les données sont là.
- Une connexion à MongoDB depuis l'hôte échoue.
- `docker history` ne montre aucun secret.
- `docker pull` de l'image, par son tag, depuis une autre machine fonctionne.

### Pour aller plus loin

Un `healthcheck` qui rend `depends_on` honnête ; un second fichier Compose pour
le développement, avec rechargement à chaud ; la même image en `arm64` et
`amd64`.

## Projet 2 — Construire et publier cette image depuis GitHub Actions

`serie: cicd` · `level: Intermédiaire` · `duree: Une soirée`

### Le brief

Reprendre l'image du projet 1 et ne plus jamais la construire à la main. À la
fin, un push sur `main` construit, teste et publie l'image, en moins de trois
minutes, sans qu'aucun secret n'apparaisse dans les logs.

Le fil rouge du cours CI/CD déploie un portfolio sur GitHub Pages : ce projet ne
le redit pas. Il s'attaque à ce que le cours ne fait pas — le cache, les
matrices, l'annulation des runs obsolètes, et la publication vers un registry.

### Ce qu'il faut savoir avant

| Prérequis                                      | Sert à l'étape |
| ---------------------------------------------- | -------------- |
| `/fiches/declencher-workflow-github-actions`   | 1              |
| `/fiches/deployer-image-docker-github-actions` | 2              |
| `/fiches/gerer-secrets-github-actions`         | 3              |
| `/fiches/optimiser-workflows-github-actions`   | 4              |
| `/fiches/artefact-github-actions`              | 5              |
| `/fiches/reutiliser-workflow-github-actions`   | 6              |
| Projet 1                                       | toutes         |

Six fiches, toutes publiées, plus le projet précédent. La règle est tenue.

### Les étapes

1. **Un push sur `main` déclenche le workflow ; un push sur une branche de
   travail, non.** _Contrainte_ : pas de `workflow_dispatch` comme roue de
   secours.
2. **L'image est publiée sur le registry à chaque push sur `main`.**
   _Contrainte_ : le tag contient le SHA du commit.
3. **Aucun secret n'apparaît dans les logs, y compris en cas d'échec.**
   _Contrainte_ : les identifiants du registry ne transitent pas par une
   variable d'environnement globale.
4. **Le workflow passe sous les trois minutes.** _Contrainte_ : la mesure se
   fait sur un second run, cache chaud, et le point de comparaison est le temps
   de l'étape 2.
5. **Les tests tournent sur deux versions de Node, en parallèle.** _Contrainte_
   : une seule définition de job.
6. **Deux pushes coup sur coup ne laissent tourner que le dernier.**
   _Contrainte_ : le premier run est annulé, pas seulement ignoré.

### Les pièges

- La clé de cache qui ne change jamais, donc un cache qui ne se met jamais à
  jour ; ou qui change à chaque run, donc un cache qui ne sert jamais.
- Le cache des couches Docker, qui n'est pas celui des dépendances npm, et qui
  se configure ailleurs.
- Le secret qui fuit par un `echo` de débogage laissé dans le workflow.
- La matrice qui multiplie aussi les publications d'image, et pousse deux fois
  le même tag.

### Comment savoir que c'est fini

- Un push sur une branche ne déclenche rien ; un push sur `main` publie.
- Le registry montre une image taguée par le SHA du dernier commit.
- Les logs d'un run en échec ne contiennent aucun secret.
- Le second run consécutif passe sous les trois minutes.
- Les deux versions de Node apparaissent comme deux jobs parallèles.
- Deux pushes rapprochés laissent un seul run actif.

### Pour aller plus loin

Extraire le job de build dans un workflow réutilisable appelé par deux dépôts ;
publier aussi un artefact de rapport de tests ; ne publier l'image que si le tag
Git est une version.

---

## Ce qui reste à trancher

- **Le starter du projet 1** : l'écrire (voir le brief du projet 1 : le code du
  fil rouge est trop mince et trop daté pour servir tel quel), puis vérifier
  qu'il démarre sans rien d'autre que Node. L'arborescence de la maquette est
  indicative.
- **La génération du `.zip` du starter** au build : un script, ou une étape de
  la CI de déploiement.
- ~~**Le dépôt de correction**~~ — **tranché le 14/10/2026** : dans ce dépôt, un
  dossier par étape. Voir « la correction ».
- **La passe « objectifs d'apprentissage »** : **faite pour le projet 1** le
  14/10/2026, reste à faire pour le projet 2.
- **Les seuils chiffrés** (150 Mo, trois minutes) sont à mesurer réellement
  avant publication. Un seuil faux décrédibilise tout l'énoncé. Le seuil
  **absolu** est retenu pour le projet 1 (décision du 14/10/2026) : il reste à
  le mesurer sur l'application du fil rouge.
- ~~**Le projet 1 exige-t-il d'avoir suivi le cours ?**~~ — **tranché le
  14/10/2026** : oui, c'est un prérequis obligatoire. Voir le brief.
- **L'ordre de publication** par rapport au planning de
  [`calendrier-editorial.md`](./calendrier-editorial.md), qui court déjà
  jusqu'au 14 octobre.
