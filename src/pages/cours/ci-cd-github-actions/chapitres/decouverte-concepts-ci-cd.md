---
layout: ../../../../layouts/ChapterLayout.astro

title: Découvrez les concepts de CI/CD
description:
  Comprenez enfin les concepts de CI/CD, le rôle des pipelines, leurs étapes
  essentielles et les principaux CI Servers comme GitHub Actions. Un chapitre
  clair pour maîtriser les bases.

nextChapterLink: presentation-projet-fil-rouge

chapterNumber: 1
sectionNumber: 1
sectionTitle: Partie 1 - Appréhendez les CI/CD
id: 1
---

<article>

# Découvrez les concepts de CI/CD

![Un homme de dos contemplant une usine aux cheminées fumantes, pixel art](/images/cours-ci-cd-github-actions/scene-usine.webp)

## Familiarisez-vous avec les termes CI/CD

Jusqu’à il y a quelques années, quand je passais des entretiens, on me posait
régulièrement des questions sur des CI/CD. L’idée en soi n’était pas mauvaise.
Le ou la recruteuse souhaitait valider mes connaissances concernant ce concept.
Ce que je reproche peut-être un peu, c’était le côté très scolaire de ces
questions. En effet, c’est une excellente chose de connaître ces concepts et
d’être capable de les définir. C’en est une autre d’être capable de (bien) les
expliquer.

**Il est donc important de connaître non seulement ces termes, mais aussi
comment les CI et les CD fonctionnent via les CI Servers. Il est aussi important
de comprendre quelles problématiques sont résolues par ces technologies et ce
qui existait avant**. Ce chapitre va être l’occasion de nous plonger dans les
technologies des CI Servers, de comprendre quels sont les composants essentiels
(en termes de langages et de mode de fonctionnement) et de faire un bref rappel
des autres méthodes.

De nos jours, quand on parle de déploiement (et de développement) de logiciels,
on entend très souvent les concepts de CI et de CD, respectivement Intégration
Continue (Continuous Integration) et Déploiement Continu (Continuous
Deployment). Il est important de comprendre que ces deux concepts sont distincts
même s’ils partagent le même objectif. À savoir, améliorer la qualité,
l’efficacité et le déploiement de nos programmes.

L’Intégration Continue (CI) est très orientée “code”. Son objectif est de
vérifier que les modifications du code, apportées dans une Pull Request (PR),
sont déployables. Le principe d’une CI va donc être de vérifier la qualité du
code (via ESLint et SonarQube), le respect des conventions (Prettier), de
builder le projet (via `npm run build` et/ou docker), d'exécuter des tests
automatisés, etc.

**La CI doit vraiment être vue comme un garde fou**. Elle indique si le code est
déployable ou non. Si elle repère des erreurs (on dit souvent si un job fail),
alors elle arrête l'exécution des prochaines tâches. Vous recevrez souvent un
mail pour vous avertir que le CI a détecté une erreur et n’est pas allé au bout
de son exécution.

<br>

![Capture GitHub d'une liste de commits avec une infobulle « Some checks were not successful » : un check de linting en échec parmi les jobs](/images/cours-ci-cd-github-actions/exemple-erreur-github-action.webp)

<br>

**Le Déploiement Continu (CD) s’intéresse lui à la mise en production**. On
appelle ça aussi la livraison. Une fois que les modifications de votre code ont
été testées et buildées, ces modifications vont pouvoir être déployées.
L’objectif ici est de pouvoir déployer le plus facilement et le plus
tranquillement possible. C’est une tâche qui est un peu redondante (et pas
franchement passionnante). Elle sera la plupart du temps automatisée. Cela dit,
attention, une CD n’est pas tout le temps conseillé.

En fonction de votre équipe et de votre projet, une CD peut complexifier votre
projet et nécessite une plus grande surveillance. Il faut bien prendre en compte
qu’en mettant en place une CD, vous aurez parfois des déploiements défectueux et
qu’il faudra prévoir des plans de retour en arrière. Il est important de prendre
ça en considération quand vous mettez en place votre pipeline CI/CD.

---

<br>

![Un homme penché sur un grand plan d'usine bleu étalé sur une table, pixel art](/images/cours-ci-cd-github-actions/plan-usine.webp)

## Visualisez le fonctionnement d’une pipeline CI/CD

Le fonctionnement du CI est généralement le même quel que soit votre CI Server.
Je reviendrai un peu plus loin dans ce chapitre sur des CI Servers connus. Pour
l’instant, retenez simplement qu’un CI Server est le système qui surveille les
modifications du code sur un repository GitHub (ou GitLab). C’est sur ce CI
Server que vos librairies vont être installées, votre code va être buildé et
testé, etc.

Les CI Servers fonctionnent avec les principaux langages de programmation.
Autrement dit, vous pouvez faire tourner du TypeScript, du Python, du Php, du
Ruby, etc. Cela ne marchera pas forcément avec des langages plus “exotiques”
mais globalement, vous ne devriez pas avoir de difficultés à faire tourner votre
code.

<br>

Le plus souvent, un pipeline CI/CD suit le schéma suivant.

<br>

![Schéma d'une pipeline : du code et du commit vers l'intégration continue (build, tests unitaires et d'intégration) puis la livraison continue (review, staging, production)](/images/cours-ci-cd-github-actions/schema-pipeline.webp)

<br>

Je trouve ce schéma assez visuel et compréhensible. On y retrouve bien la
séparation entre l’intégration continue et le déploiement continu. Vous y
retrouvez aussi les grandes étapes composant une pipeline.

On peut décomposer une pipeline en 5 grandes étapes :

- Le déclencheur (ou événement déclencheur) - le lancement d’une pipeline va
  généralement commencer par un événement. Dans le schéma ci-dessus, c’est le
  commit. Il correspond ici soit à un push sur un repository
  (`git push origin nomDeMaBranche`) ou à une Pull Request. D’une manière
  générale, j’ai tendance à exécuter des pipelines au moment de l’ouverture
  d’une PR. Je reviendrais durant la suite du cours dessus mais sachez que c’est
  principalement pour des raisons de coût.
- L’installation des dépendances - une fois que votre pipeline a été lancée via
  votre événement, elle va commencer par installer les dépendances. C’est un peu
  comme quand vous récupérez un projet sur GitHub. Vous le clonez via la
  commande `git clone` puis vous installez les dépendances via la commande
  `npm install` ou `yarn`.
- La construction du code (le build) - à partir du moment où les dépendances
  sont installées, votre pipeline peut s’attaquer au “build” du code. Autrement
  dit, dans le cadre d’un projet TypeScript, elle va transpiler le code en
  JavaScript et l’optimiser en le minimisant.
- Les tests automatisés - vous avez peut-être déjà entendu la phrase “Tester,
  c’est douter”. Dans les faits, tester son code est important. Vous n’avez pas
  forcément besoin de tout tester. Cela dit, vous devez être en mesure de tester
  les parties les plus complexes de votre code. Je suis en train de vous
  préparer un cours sur les tests automatisés. En attendant, vous pouvez
  consulter
  [un cours que j’ai publié sur OpenClassrooms](https://openclassrooms.com/fr/courses/7159306-testez-vos-applications-front-end-avec-javascript).
- Le déploiement - Si vous regardez à nouveau le schéma ci-dessus, vous verrez
  qu’il existe plusieurs sous-étapes dans le déploiement. On va souvent déployer
  le code dans un environnement de staging (ou préproduction). Cet environnement
  est dit “iso-prod”. Autrement dit, il est identique à l’environnement de
  production. L’objectif est de s’assurer que le projet fonctionne toujours
  (comprendre : dans un état stable) suite aux modifications réalisées sur le
  code. Si tout est ok, le code sera aussi déployé en production. Dans le cadre
  du projet fil rouge de ce cours, on déploiera directement en production. Vous
  verrez dans un futur cours comment créer des pipelines de déploiement pour
  différents environnements. Pour votre compréhension, c’est important d’y aller
  étape par étape.
- Le monitoring - C’est l’un des aspects que j’aime le plus avec les
  technologies actuelles. Quand votre code est en production, vous allez vouloir
  vérifier que tout se passe bien avec des outils de surveillance. Je vous
  prépare un cours dessus 🙂.

<br>

Sachez qu’il peut s’ajouter d’autres étapes complémentaires. Par exemple, si
votre projet utilise un linter type ESLint, vous aurez tout intérêt à placer le
job du linter le plus tôt possible dans votre pipeline. Typiquement, vous le
mettriez avant même le build du code de sorte d’arrêter la pipeline le plus tôt
possible - Faire tourner des pipelines prend du temps et coûte de l’argent.
Après les tests, vous vous occuperez souvent de la partie Docker. À savoir,
builder puis publier l’image.

<br>

L’image suivante propose une représentation graphique des pipelines CI/CD.

<br>

![Boucle infinie du cycle CI/CD : plan, code, build, test, release, deploy, operate et monitor](/images/cours-ci-cd-github-actions/cycle-ci-cd.webp)

<br>

Ce schéma me plait particulièrement parce qu’il montre bien le côté répétitif
d’une pipeline de déploiement. À chaque fois que vous apportez une modification
à votre code, notamment que vous pushez ou créez une Pull Request, ces
différentes étapes vont s'exécuter.

Si vous avez déjà déployé manuellement un projet en utilisant un client ftp ou
scp, vous comprenez à quel point une pipeline CI/CD change la vie. Si ce n’est
pas le cas, pas de panique. Je vais profiter de la prochaine section pour vous
faire un bref rappel sur les méthodes de déploiement traditionnelles. Vous
découvrirez ensuite les problématiques résolues par ces technologies.

---

<br>

![Une vieille berline orange des années 1980 côte à côte avec une voiture blanche moderne, pixel art](/images/cours-ci-cd-github-actions/voitures-1980-2024.webp)

## Comprenez l’importance de ces technologies

Est-ce que les termes `ftp` et `scp` vous parlent ? Si ce n’est pas le cas, vous
avez de la chance 😀. Les premiers sites que j’ai déployés utilisaient ces
méthodes.

Pour rappel,

- FTP signifie File Transfer Protocol. Comme son nom anglais l’indique, c’est un
  protocole de communication utilisé pour transférer des fichiers entre un
  client (votre ordinateur par exemple) et un serveur. Le client FTP le plus
  connu est FileZilla. Vous l’utilisez en faisant un copier/coller de vos
  fichiers vers le serveur.
- SCP signifie Secure Copy Protocol. C’est aussi un protocole de transfert de
  fichier. Cela dit, il y a l’avantage d’être sécurisé via des clés SSH. Je vous
  prépare un blog post sur les clés SSH. Je mettrai à jour ce cours une fois que
  je l’aurais publié. Il existe des clients SCP mais j’ai de mon côté
  principalement utilisé la commande scp. Cette commande est disponible sur
  MacOS et Linux.

<br>

![Capture d'un terminal affichant la page du manuel (man) de la commande scp, OpenSSH secure file copy](/images/cours-ci-cd-github-actions/manuel-commande-scp.webp)

<br>

Pour être honnête, ce ne sont pas des méthodes très conseillées aujourd’hui.
J’ai tendance à appeler ça “des méthodes à la papa”. Ce sont des méthodes
manuelles. Autrement dit, vous devez les refaire pour chaque nouveau
déploiement. Elles sont source d’erreurs et prennent du temps. Autre chose, à
aucun moment, vous ne faites passer des tests. Si un déploiement échoue,
autrement dit si le site crash, vous ne pouvez pas revenir en arrière
facilement.

Une autre solution que j’ai vu dans l’un de mes précédents jobs était le
déploiement manuel directement sur les machines de production. Pour faire
simple, vous vous connectez sur une machine de production via SSH. Une fois sur
la machine de production, vous vous placez dans le projet et vous faites un git
`clone origin master` (ou main). Vous éteignez ensuite le serveur et vous le
relancez à la main. Il est tout à fait possible d’automatiser les actions du
déploiement via du code (des scripts bash). Cela dit, vous restez sur des
déploiements manuels. De plus, vous n’avez aucune garantie que les modifications
apportées au code vont vraiment fonctionner.

**Le point essentiel à tirer de ces méthodes est le temps. Ces méthodes prennent
beaucoup de temps et sont souvent répétitives**. Posez-vous la question ?
Préférez-vous passer du temps à faire tourner vos tests, builder votre code,
builder votre image Docker et ensuite réaliser la mise en production à la main
OU faire toutes ces étapes en allant vous prendre un café avec vos collègues ?

Il est aussi important de comprendre que de plus en plus de structures
(entreprises, administrations et associations) utilisent ces solutions. Elles
n’ont pas toutes un système de déploiement complet mais utilisent souvent des
éléments CI et/ou CD dans leurs processus de développement.

Être capable de comprendre comment elles fonctionnent et pouvoir mettre les
mains dans le cambouis est de plus en plus nécessaire. Cela ne vous a d’ailleurs
peut-être pas échappé : de plus en plus d’offres d’emplois demandent des
connaissances en pipeline de déploiements. La bonne nouvelle, c’est qu’une fois
que vous avez compris les principes de bases, vous pouvez vous en sortir assez
vite.

<br>

**Parlons maintenant un peu des inconvénients**. Je pense sincèrement que les
avantages des pipelines de déploiement compensent largement les inconvénients.
Cela dit, j’ai envie qu’on prenne un peu de temps pour en parler.

Je vois trois principaux inconvénients :

- Les coûts et notamment les coûts cachés - nous verrons ensemble le système de
  “pricing” des CI/CD dans la partie 2 de ce cours. Cela dit, il est important
  de comprendre que vous payez souvent les CI/CD à l'exécution. Vous allez le
  plus souvent passer par des systèmes d’abonnement. Plus vous buildez et
  déployez souvent, plus votre abonnement coûte de l’argent à vous et à votre
  entreprise. Il est donc important de bien prendre ça en compte.
- La complexité - si le projet est simple et ne contient qu’un ou deux services,
  la complexité devrait être relativement faible. C’est néanmoins quelque chose
  qui peut rapidement se complexifier et devenir difficile à maintenir et à
  déboguer.
- La sécurité - l’automatisation des pipelines peut introduire des
  vulnérabilités notamment sur les secrets (les variables d’environnement par
  exemple) et les clés d’API. Nous verrons dans la partie 2 quelques bonnes
  pratiques à respecter niveau sécurité 🙂.

<br>

Voilà pour les avantages et les inconvénients des pipelines CI/CD. On va
maintenant regarder de plus près quelques CI Servers connues.

---

<br>

![Trois voitures, jaune, rouge et bleue, exposées dans un hall de concession automobile, pixel art](/images/cours-ci-cd-github-actions/concession-voitures.webp)

## Quelques exemples de CI Servers

Il existe aujourd’hui beaucoup de solutions de CI Servers. Pour vous donner un
exemple, au cours des dernières années, j’ai été amené à utiliser pas moins
de 4. La bonne nouvelle, c’est qu’elles ont souvent le même système de
fonctionnement. Autrement dit, quand vous en apprenez une, vous êtes souvent
capable de comprendre comment une autre fonctionne.

Parmi les principales solutions de CI Servers, on peut donc citer Jenkins,
Travis CI, GitLab CI et bien sûr GitHub Actions.

- Jenkins est basé sur un système de jobs. Un job représente un ensemble de
  tâches à effectuer. Par exemple, le build d’un projet ou l’exécution de tests.
  On l’utilise aussi bien pour du développement web que mobile.
- Travis CI est l’une des premières solutions de CI que j’ai utilisée. L’un de
  ces principaux avantages est sa gratuité pour les projets open-source. On
  configure travis via le fichier .travis.yml
- GitLab CI est la solution de CI intégrée à la plateforme GitLab. L’intérêt
  principal de cette solution est son intégration avec vos repos GitLab. Cela
  vous permet de regrouper les outils.
- GitHub Actions est la réponse de GitHub aux autres solutions. Comme GitLab CI,
  elle propose une intégration complète allant du versionning du code jusqu’à
  l’hébergement des build. C’est une solution particulièrement puissante et
  utilisée par de nombreuses entreprises et organisations.

---

<br>

![Un vendeur de journaux dans une rue, pixel art](/images/misc/vendeur-journaux.webp)

## Résumé

- Bien que distincts, les concepts, ainsi que les solutions, de CI/CD sont
  souvent utilisés de paire. Les CI sont orientées code (build et tests) alors
  que les CD sont orientées déploiement.
- Une pipeline CI/CD est le plus souvent composé de 5 grandes étapes : le
  déclencheur, l’installation des dépendances, le build, les tests automatisés
  et le déploiement.
- Ces technologies sont clairement un “game changer”. Elles facilitent la
  collaboration entre les développeurs, augmentent la qualité des produits et
  les fréquences de livraison.
- Il existe de nombreuses solutions de CI/CD telles que Jenkins, Travis CI et
  GitHub Actions. Chaque solution présente ses particularités et ses avantages.
  Cela dit, leur mode de fonctionnement reste souvent le même.

</article>
