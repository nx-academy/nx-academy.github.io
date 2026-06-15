---
layout: ../../../../layouts/ChapterLayout.astro

title: Suivez les bonnes pratiques en créeant un workflow complexe
description:
  "Apprenez à optimiser vos GitHub Actions : comprendre la tarification,
  déboguer efficacement, appliquer les bonnes pratiques de sécurité et créer des
  workflows complexes."

previousChapterLink: prise-en-main-github-actions
nextChapterLink: decouverte-github-pages

chapterNumber: 2
sectionNumber: 2
sectionTitle: Partie 2 - Découvrez les GitHub Actions
id: 4
---

<article>

# Suivez les bonnes pratiques en créeant un workflow complexe

![Pixel art d'une personne comparant des aspirateurs en rayon avec leurs étiquettes de prix](/images/cours-ci-cd-github-actions/comparaison-prix-produits.webp)

Avant de poursuivre la lecture de ce chapitre, veuillez vous mettre
[sur la branche `partie-2/chapitre-2-debut`](https://github.com/nx-academy/Creez-des-pipelines-CI-CD-avec-les-GitHub-Actions/tree/partie-2/chapitre-2-debut).
En plus de cette branche, nous allons utiliser
[cette issue Github](https://github.com/nx-academy/Creez-des-pipelines-CI-CD-avec-les-GitHub-Actions/issues/6)
comme problématique. Je vous invite à en prendre connaissance avant de passer à
la lecture du chapitre.

## Familiarisez-vous avec le système de tarification

Au cours du chapitre précédent, vous avez déclenché vos premiers workflows grâce
aux GitHub Actions. Il est fort probable que vous les ayez exécutés à plusieurs
reprises. Mais une chose ne vous a-t-elle pas interpellés ?

Avez-vous eu à débourser le moindre centime pour l'exécution de ces workflows ?

C’est une différence majeure avec des services tels qu’Amazon Web Services
(AWS). En effet, lors de la création d'un compte sur AWS (le root account),
parmi les étapes requises, AWS exige la saisie de vos informations de carte de
crédit. En d'autres termes, même avant d'avoir consommé leurs services, on vous
sollicite pour vos données bancaires. Cette approche a tendance à susciter
quelques inquiétudes. En tout cas, je sais qu’elle en a suscité de mon côté 😅.

GitHub, pour sa part, a décidé de faire les choses autrement avec les GitHub
Actions. J'apprécie davantage cette démarche. Elle vous offre la possibilité de
tester un service sans engager de frais. Des limites sont fixées, certes, mais
tant que vous restez en deçà, vous n’aurez rien à payer.

Alors, quel est le coût réel des GitHub Actions ?

Le premier élément qui rentre en ligne de compte est si le repository est public
ou privé. Souvenez-vous, les repositories publics sont ceux dont le code source
est visible par tous. Par exemple, le code de ce cours est public.

<br>

![En-tête GitHub du repository public nx-academy du cours avec ses onglets Code, Issues, Actions](/images/cours-ci-cd-github-actions/repository-publique-du-cours.webp)

<br>

Si le repository est public, les workflows exécutés seront gratuits. Vous avez
bien lu. Vous n’avez rien à payer si vous exécutez des workflows sur un
repository public. Pour votre information, Jenkins faisait la même chose à
l’époque où je l’utilisais.

Cette démarche vise à promouvoir les projets open-source. Je trouve que c’est
une excellente initiative. D’autant plus que cela vous permet de tester le
service à moindre frais.

Dans le cadre des repositories privées, GitHub vous offre un certain nombre de
minutes gratuites d'exécution par mois. Ce nombre de minutes dépendra de votre
compte. Par exemple, dans le cadre d’un compte gratuit d’utilisateur, il sera de
2 000 minutes par mois. Si vous avez un compte pro, il sera de 3 000 minutes par
mois. Pour votre information, je m’appuie
[sur la documentation officielle des GitHub Actions](https://docs.github.com/en/billing/managing-billing-for-github-actions/about-billing-for-github-actions).

<br>

![Grille tarifaire GitHub : plans Free, Team et Enterprise avec leurs minutes CI/CD mensuelles](/images/cours-ci-cd-github-actions/github-actions-prix.webp)

<br>

Une fois que vous avez dépassé cette limite, vous serez facturé par minutes
d'exécution. Il est important de souligner ici que deux éléments peuvent influer
sur le tarif et les minutes gratuites : le nombre de CPU (autrement dit, la
puissance de calcul de la machine qui va exécuter votre code) et le système
d’exploitation.

En effet, les Github Actions peuvent être exécutées sur des machines sous Linux,
Windows et MacOS. En fonction du type de machines que vous allez choisir, GitHub
va appliquer un coefficient multiplicateur : le “Minute multipliers”.

- Sur Linux, ce coefficient est de 1. Autrement dit, 1 000 minutes seront
  consommés comme étant 1 000 minutes.
- Sur Windows, ce coefficient est de 2. Autrement dit, 1 000 minutes, vous
  seront consommés comme étant 2 000 minutes.
- Sur MacOS, ce coefficient est de 10. Autrement dit, 1 000 minutes, vous seront
  consommés comme étant 10 000 minutes.

<br>

Une fois ce nombre de minutes gratuit dépassé, vous serez facturé à la minute
d'exécution. Jetez un œil à la capture d’écran ci-dessous.

<br>

![Tableau des tarifs GitHub Actions à la minute selon le système d'exploitation et le nombre de vCPU](/images/cours-ci-cd-github-actions/paiement-gh-actions.webp)

<br>

Cette capture vous montre le système de tarification des GitHub Actions. C’est
un système de tarification assez “classique” de Cloud Computing où vous payez à
l'exécution. D’où le fait de surveiller vos temps d'exécution de près et de
savoir comment les optimiser au besoin. Il existe quelques stratégies à
connaître pour optimiser vos workflows.

Je vous présenterais certaines d’entre elles dans la suite de ce chapitre. Ce
qui est important ici, c’est d’essayer autant que possible de suivre les temps
d'exécution de vos CI. J’ai quelques blog posts en préparation côte
optimisation. Je mettrai à jour ce cours au fur et à mesure des publications 🙂.

Cela dit, si vous voulez prendre un peu d’avance, jetez un œil
[à cet article](https://jcdan3.medium.com/4-ways-to-speed-up-your-github-action-workflows-a0b08067a6c6)
et
[cet autre article](https://betterprogramming.pub/how-to-speed-up-github-actions-by-avoiding-unnecessary-work-b51f02c6392b).
Ils devraient vous aider à comprendre ces notions plus rapidement.

On va s’intéresser maintenant à la partie gestion des erreurs et débogage.

---

<br>

![Pixel art d'un enfant concentré assemblant un puzzle sur une table en bois](/images/cours-ci-cd-github-actions/enfant-puzzle.webp)

## Gérez et déboguez vos erreurs

Avant d’aller plus loin, assurez-vous de changer de branche et de vous
positionner
[sur la branche `partie-2/chapitre-2/section-2`](https://github.com/nx-academy/Creez-des-pipelines-CI-CD-avec-les-GitHub-Actions/tree/partie-2/chapitre-2/section-2).

Dans cette section, vous devrez analyser un workflow qui ne fonctionne pas. Vous
verrez que dans la pratique, qu'il n'est pas rare de rencontrer des erreurs dans
ses workflows, notamment lors de leurs créations. Le workflow en échec se trouve
dans le fichier
[`.github/workflows/workflow-with-errors.yml`](https://github.com/nx-academy/Creez-des-pipelines-CI-CD-avec-les-GitHub-Actions/blob/partie-2/chapitre-2/section-2/.github/workflows/workflow-with-errors.yml).

Les cas traditionnels de bug de CI sont une librairie qui n’est pas installée ou
un script qui n’est pas reconnu et/ou pas exécuté. Le défi principal réside
souvent dans le débogage, surtout lorsque l'on est débutant en CI/CD. Cela dit,
si vous suivez mes recommandations, vous devriez rapidement être capable
d’affronter des bugs simples.

Si vous avez déjà suivi
[mon cours sur les bugs côté front-end d’OpenClassrooms](https://openclassrooms.com/fr/courses/7159296-deboguez-l-interface-de-votre-site-internet/7278716-adoptez-la-logique-de-debogage),
il est probable que les phrases suivantes ne vous étonnent pas. Nous, les
développeurs et développeuses, passons notre temps à résoudre des bugs et des
erreurs. C’est une partie essentielle de notre travail et pour être tout à fait
honnête, c’est l’une des parties qui me plaît le plus (avec la partie
abstraction et architecture des solutions).

Être capable de déboguer rapidement est une compétence essentielle pour tout
développeur. C’est quelque chose qui s'acquiert avec le temps et l’expérience.
Cela dit, il est possible d'accélérer l’apprentissage de cette compétence en
suivant une méthodologie simple et structurée.

<br>

Cette méthode est composée de quatre étapes :

1.  Observer le bug - L’idée ici est d’enquêter sur son origine, en
    s’intéressant aux messages d’erreurs (s’il y en a).
2.  Écrire un test répétable - Être capable de reproduire le bug est une étape
    essentielle. Tant pour corriger le bug que pour écrire un futur test
    automatisé.
3.  Tester sa théorie - C’est le moment d'émettre des hypothèses pour vérifier
    d’où vient le bug.
4.  Résoudre le bug - L’implémentation de la solution dans le code. Il est
    important d’essayer de tester quelques cas d’utilisation après pour voir si
    vous avez bien résolu le bug et aussi si vous n’en avez pas ajouté de
    nouveaux.

<br>

Dans le cadre des GitHub Actions, ce sont les logs émis par les actions
elles-mêmes qui vont vous permettre de résoudre ce bug. Pour rappel, un log, ou
journal d’événement en français, est du texte émis par un programme ou un
service. Un log contient des informations comme la date et l’heure (à laquelle
un événement a eu lieu) ainsi que son niveau de gravité.

<br>

![Terminal affichant des logs de démarrage d'une base de données MySQL horodatés](/images/cours-ci-cd-github-actions/journal-logs.webp)

<br>

Les logs fournissent des données particulièrement importantes pour déboguer. Il
existe différents types de logs : les applications logs, les systèmes logs, etc.
Si vous souhaitez en apprendre plus sur le sujet, je vous invite à regarder
[cette conférence de Daniel Maher](https://www.youtube.com/watch?v=39oA9W4J37I),
un ancien de mes collègues de Datadog. Vous y trouverez des informations
essentielles sur ce qui composent un log.

Dans le cadre des GitHub Actions, quand on exécute un workflow, chaque étape
(souvenez-vous, les steps) génère ses propres logs, comme le montre la capture
d’écran ci-dessous.

<br>

![Détail d'un job GitHub Actions en succès montrant les logs de chaque étape, dont le checkout](/images/cours-ci-cd-github-actions/exemples-log-ci-cd.webp)

<br>

Ces logs vont vous permettre d’observer le bug et d’en apprendre un peu plus sur
celui-ci. Autrement dit, ils vont vous donner du contexte. Il est donc crucial
de comprendre leur format et de savoir comment les interpréter. Les logs et
erreurs seront signalisés en rouge comme le montre la capture d’écran suivante.

<br>

![Liste de commits GitHub avec des coches vertes pour les workflows réussis et des croix rouges pour ceux en échec](/images/cours-ci-cd-github-actions/workflows-erreurs.webp)

<br>

Ici, par exemple, vous pouvez voir les workflows qui sont « en succès »
(comprendre : ceux qui sont allés à leur terme) et ceux qui sont en échec.

<br>

Quand un workflow est en échec, vous pouvez cliquer dessus pour avoir plus
d’informations sur le job qui a échoué.

<br>

![Job Linting en échec dans GitHub Actions : l'étape Run linter affiche l'erreur eslint not found, exit code 127](/images/cours-ci-cd-github-actions/log-erreur.webp)

<br>

Dans mon cas, en consultant les logs des GitHub Actions, je constate que le
linter ESLint n'a pas fonctionné. C’est une information particulièrement
importante pour déboguer. C’est la première étape de notre méthodologie de
résolution de bugs.

Pour le reproduire, vous avez deux options :

- vous pouvez soit relancer le workflow. En effet, certaines erreurs sont
  parfois dues à des problèmes de réseaux ou à des dépendances indisponibles. Au
  final, c'est un peu comme redémarrer un ordinateur qui bugge ou supprimer le
  dossier node_modules avant de réinstaller les dépendances. Cependant, soyez
  prudent, car cela consomme des crédits GitHub Actions ;
- Vous pouvez essayer de le reproduire en local. En essayant, par exemple, de
  lancer le script. Ici, le script est npm run lint. L’avantage de cette méthode
  est qu’elle ne vous coûtera rien. L'inconvénient est que l'environnement de la
  CI peut différer de celui de votre ordinateur local. Il existe une librairie
  nommée act qui reproduit l’environnement d'exécution des GitHub Actions sur
  votre ordinateur. Je n'ai pas encore eu l'occasion de l'essayer, mais si je le
  fais, je publierai certainement un article de blog à ce sujet.

<br>

Il ne vous reste plus qu’à essayer de résoudre cette erreur. Prenez le temps
nécessaire pour résoudre cette erreur, car c'est une étape importante dans votre
apprentissage. Le screencast ci-dessous vous montre la stratégie de débogage en
actions.

<br>

<iframe src="https://player.vimeo.com/video/1140466664?h=1c8b6a9134&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" title="Screencast 5 - Découvrez le projet fil rouge"></iframe>

<br>

Notre CI est de nouveau opérationnel. Sachez que la solution se trouve
[sur la branche `partie-2/chapitre-2/section-2-fin`](https://github.com/nx-academy/Creez-des-pipelines-CI-CD-avec-les-GitHub-Actions/tree/partie-2/chapitre-2/section-2-fin).

---

<br>

![Pixel art d'un responsable casqué présentant une affiche Safety First à des ouvriers dans une usine](/images/cours-ci-cd-github-actions/consignes-securite.webp)

## Suivez les bonnes pratiques de sécurité

Quand on utilise les GitHub Actions, il y a souvent quelques règles de sécurité
à respecter. La sécurité en informatique, c’est comme le brossage des dents. Ce
n'est pas une garantie à 100 % contre les problèmes, mais ça réduit
significativement les risques.

En suivant des bonnes pratiques de sécurité, vous allez donc diminuer le risque
de divulguer des informations confidentielles, telles que des clés d'API, des
tokens ou des accès AWS. C’est quelque chose de très fréquent sur GitHub.

L'un des éléments clés pour sécuriser vos GitHub Actions est le choix des
actions que vous utilisez. Dans le chapitre précédent, au moment de vous
présenter le vocabulaire, je vous ai parlé des actions.

Souvenez-vous, elle avait la forme suivante :

```yml
- name: Checkout repository
  uses: actions/checkout@v3
```

Pour rappel, une action se rapproche d’une fonction en programmation. C’est un
bout de code réutilisable. Il existe deux catégories d’actions :

- Les actions officielles - elles sont fournies et maintenues par GitHub et des
  partenaires de confiance. Elles sont généralement bien documentées, mises à
  jour régulièrement et sécurisées ;
- Les actions tierces - elles sont créées et maintenues par des membres de la
  communauté. Elles n’ont pas été approuvées ou vérifiées par GitHub. La qualité
  et la sécurité de ces dernières peuvent donc varier grandement.

<br>

D’une manière générale, je vous invite à vous servir des actions officielles
autant que possible. Vous pouvez en trouver
[la majeure partie sur ce repository](https://github.com/actions/).

<br>

![Profil GitHub vérifié de l'organisation GitHub Actions avec ses dépôts officiels épinglés comme starter-workflows et setup-node](/images/cours-ci-cd-github-actions/github-actions-repo-officiel.webp)

<br>

Si vous décidez de passer par une action de la communauté, pensez bien à
vérifier l’auteur et à lire le code source de l’action en question. Pensez aussi
à demander l’avis de vos collègues et de vos pairs : ils auront certainement une
solution à vous conseiller.

Un autre élément crucial à prendre en compte est l'utilisation des secrets. Les
secrets correspondent à des variables d’environnements. Elles vous permettent de
stocker par exemple des clés d’API, des tokens, des mots de passe, etc.

Vous pouvez les ajouter en vous rendant sur l’onglet Secrets and variables de la
page Settings de votre repository.

<br>

![Page GitHub Actions secrets and variables des Settings du dépôt, sans aucun secret enregistré](/images/cours-ci-cd-github-actions/github-secrets.webp)

<br>

Puis, vous pouvez y accéder directement dans vos actions GitHub.

```yml
jobs:
  example_job:
    runs-on: ubuntu-latest
    env:
      MY_SECRET: ${{ secrets.MY_SECRET }}
```

Notre projet fil rouge n’utilise pas de secrets. Je ne peux donc pas vous
montrer un exemple d’utilisation. Cependant, j’ai quelques contenus de prévu
autour de ces notions pour 2024. Je mettrais à jour ce cours à ce moment 🙂.

---

<br>

![Pixel art d'un opérateur supervisant depuis un pupitre une grande usine aux nombreuses cuves et tuyauteries](/images/cours-ci-cd-github-actions/construction-usine-complexe.webp)

## Créez un workflow complexe

Nous allons maintenant nous intéresser à la création d’un workflow complexe. Le
terme “complexe” ici ne veut pas dire que le job sera difficile à comprendre
mais plutôt qu’il sera composé de plusieurs jobs. Cela va notamment nous
permettre d’ajouter des dépendances entre les jobs. Autrement dit, qu’un job ne
se lance pas avant qu’un autre soit terminé.

À la fin de cette section, vous aurez couvert une grande partie des thématiques
liés aux GitHub Actions. Il vous en restera certes d’autres à étudier, mais les
bases seront là.

Commencez par regarder le code ci-dessous :

```yml
name: A workflow with multiple jobs

on:
  push:
    branches: ["partie-2/chapitre-2/section-4-fin"]

jobs:
  first-job:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v2

  second-job:
    needs: first-job
    runs-on: ubuntu-latest

    steps:
      - name: Another job
        run: echo "Second job depends on first one"
```

Ce workflow est composé de deux jobs. Ils ont chacun une étape (steps) et
tournent sur des VM utilisant la dernière version d’ubuntu. À votre avis, que
veut dire la propriété needs ?

<br>

---

![Un élève en train de tricher dans une classe, pixel art](/enfant-puzzle.webp)

---

<br>

La propriété needs permet de définir des dépendances entre des jobs au sein d’un
même workflow. Autrement dit, needs vous permet de spécifier qu’un job ne peut
se lancer tant que le job dont il dépend n’est pas terminé. Si le premier job
échoue (on dit qu’il fail), le deuxième n’est jamais lancé.

Je vais profiter du screencast ci-dessous pour reprendre ces informations et
vous faire créer quelques exemples de workflow complexes. À tout de suite !

<br>

<iframe src="https://player.vimeo.com/video/1140466727?h=358f16483d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" title="Screencast 5 - Découvrez le projet fil rouge"></iframe>

<br>

Le code correspond à la fin de ce screencast se trouve
[sur la branche `partie-2/chapitre-2/section-4-fin`](https://github.com/nx-academy/Creez-des-pipelines-CI-CD-avec-les-GitHub-Actions/tree/partie-2/chapitre-2/section-4-fin).

---

<br>

![Pixel art d'un enfant pliant un avion en papier jaune sur une table près d'une fenêtre](/images/misc/enfant-avion-papier.webp)

## Exercez-vous

Pour rappel,
[voici la problématique](https://github.com/nx-academy/Creez-des-pipelines-CI-CD-avec-les-GitHub-Actions/issues/6)
que nous essayons de résoudre dans ce chapitre. N’oubliez pas de vous
positionner
[sur la branche `partie-2/chapitre-2/section-4-fin`](https://github.com/nx-academy/Creez-des-pipelines-CI-CD-avec-les-GitHub-Actions/tree/partie-2/chapitre-2/section-4-fin).

<br>

<iframe src="https://player.vimeo.com/video/1140466792?h=5d618fb56d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" title="Screencast 5 - Découvrez le projet fil rouge"></iframe>

<br>

Le code source contenant la solution de cet exercice se trouve
[sur la branche `partie-2/chapitre-2-fin`](https://github.com/nx-academy/Creez-des-pipelines-CI-CD-avec-les-GitHub-Actions/tree/partie-2/chapitre-2-fin).

---

<br>

![Pixel art d'un jeune vendeur de journaux criant Extra ! dans un mégaphone au coin d'une rue](/images/misc/vendeur-journaux.webp)

## Résumé

- Le système de tarification des GitHub Actions vous permet de les utiliser
  gratuitement. En fonction du compte GitHub dont vous disposez, vous pouvez
  exécuter un certain nombre de minutes gratuites par mois.
- Faites bien attention à la consommation de vos pipelines CI/CD. Une fois la
  limite dépassée, des frais seront appliqués à la minute. N’oubliez pas que ce
  système de tarification dépend de si votre repository est public ou privé.
- Pour débogguer une CI, essayez toujours de procéder de la manière suivante.
  Analysez les logs de votre CI, tentez de le reproduire et essayez ensuite de
  le corriger.
- Tirez parti de la parallélisation des jobs pour faire des jobs plus courts et
dédiés seulement à certaines tâches. Utilisez la propriété needs pour signaler
une dépendance entre plusieurs jobs.
</article>
