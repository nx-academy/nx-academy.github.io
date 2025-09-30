---
layout: ../../../../layouts/ChapterLayout.astro

title: Suivez les bonnes pratiques en créeant un workflow complexe
description: Une super description liée à ce chapitre.

previousChapterLink: prise-en-main-github-actions
nextChapterLink: decouverte-github-pages

chapterNumber: 2
sectionNumber: 2
sectionTitle: Partie 2 - Découvrez les GitHub Actions
id: 4
---

<article>

# Suivez les bonnes pratiques en créeant un workflow complexe

![Un superhero regardant une ville de nuit, pixel art]()

Avant de poursuivre la lecture de ce chapitre, veuillez vous mettre [sur la branche `partie-2/chapitre-2-debut`](https://github.com/nx-academy/Creez-des-pipelines-CI-CD-avec-les-GitHub-Actions/tree/partie-2/chapitre-2-debut). En plus de cette branche, nous allons utiliser [cette issue Github](https://github.com/nx-academy/Creez-des-pipelines-CI-CD-avec-les-GitHub-Actions/issues/6) comme problématique. Je vous invite à en prendre connaissance avant de passer à la lecture du chapitre.

## Familiarisez-vous avec le système de tarification

Au cours du chapitre précédent, vous avez déclenché vos premiers workflows grâce aux GitHub Actions. Il est fort probable que vous les ayez exécutés à plusieurs reprises. Mais une chose ne vous a-t-elle pas interpellés ?

Avez-vous eu à débourser le moindre centime pour l'exécution de ces workflows ?

C’est une différence majeure avec des services tels qu’Amazon Web Services (AWS). En effet, lors de la création d'un compte sur AWS (le root account), parmi les étapes requises, AWS exige la saisie de vos informations de carte de crédit. En d'autres termes, même avant d'avoir consommé leurs services, on vous sollicite pour vos données bancaires. Cette approche a tendance à susciter quelques inquiétudes. En tout cas, je sais qu’elle en a suscité de mon côté 😅.

GitHub, pour sa part, a décidé de faire les choses autrement avec les GitHub Actions. J'apprécie davantage cette démarche. Elle vous offre la possibilité de tester un service sans engager de frais. Des limites sont fixées, certes, mais tant que vous restez en deçà, vous n’aurez rien à payer.

Alors, quel est le coût réel des GitHub Actions ?

Le premier élément qui rentre en ligne de compte est si le repository est public ou privé. Souvenez-vous, les repositories publics sont ceux dont le code source est visible par tous. Par exemple, le code de ce cours est public.

<br>

![](/images/cours-ci-cd-github-actions/repository-publique-du-cours.webp)

<br>

Si le repository est public, les workflows exécutés seront gratuits. Vous avez bien lu. Vous n’avez rien à payer si vous exécutez des workflows sur un repository public. Pour votre information, Jenkins faisait la même chose à l’époque où je l’utilisais.

Cette démarche vise à promouvoir les projets open-source. Je trouve que c’est une excellente initiative. D’autant plus que cela vous permet de tester le service à moindre frais.

Dans le cadre des repositories privées, GitHub vous offre un certain nombre de minutes gratuites d'exécution par mois. Ce nombre de minutes dépendra de votre compte. Par exemple, dans le cadre d’un compte gratuit d’utilisateur, il sera de 2 000 minutes par mois. Si vous avez un compte pro, il sera de 3 000 minutes par mois. Pour votre information, je m’appuie [sur la documentation officielle des GitHub Actions](https://docs.github.com/en/billing/managing-billing-for-github-actions/about-billing-for-github-actions).

<br>

![](/images/cours-ci-cd-github-actions/github-actions-prix.webp)

<br>

Une fois que vous avez dépassé cette limite, vous serez facturé par minutes d'exécution. Il est important de souligner ici que deux éléments peuvent influer sur le tarif et les minutes gratuites : le nombre de CPU (autrement dit, la puissance de calcul de la machine qui va exécuter votre code) et le système d’exploitation.

En effet, les Github Actions peuvent être exécutées sur des machines sous Linux, Windows et MacOS. En fonction du type de machines que vous allez choisir, GitHub va appliquer un coefficient multiplicateur : le “Minute multipliers”.

- Sur Linux, ce coefficient est de 1. Autrement dit, 1 000 minutes seront consommés comme étant 1 000 minutes.
- Sur Windows, ce coefficient est de 2. Autrement dit, 1 000 minutes, vous seront consommés comme étant 2 000 minutes.
- Sur MacOS, ce coefficient est de 10. Autrement dit, 1 000 minutes, vous seront consommés comme étant 10 000 minutes.

<br>

Une fois ce nombre de minutes gratuit dépassé, vous serez facturé à la minute d'exécution. Jetez un œil à la capture d’écran ci-dessous.

<br>

![](/images/cours-ci-cd-github-actions/paiement-gh-actions.webp)

<br>

Cette capture vous montre le système de tarification des GitHub Actions. C’est un système de tarification assez “classique” de Cloud Computing où vous payez à l'exécution. D’où le fait de surveiller vos temps d'exécution de près et de savoir comment les optimiser au besoin. Il existe quelques stratégies à connaître pour optimiser vos workflows.

Je vous présenterais certaines d’entre elles dans la suite de ce chapitre. Ce qui est important ici, c’est d’essayer autant que possible de suivre les temps d'exécution de vos CI. J’ai quelques blog posts en préparation côte optimisation. Je mettrai à jour ce cours au fur et à mesure des publications 🙂.

Cela dit, si vous voulez prendre un peu d’avance, jetez un œil [à cet article](https://jcdan3.medium.com/4-ways-to-speed-up-your-github-action-workflows-a0b08067a6c6) et [cet autre article](https://betterprogramming.pub/how-to-speed-up-github-actions-by-avoiding-unnecessary-work-b51f02c6392b). Ils devraient vous aider à comprendre ces notions plus rapidement.

On va s’intéresser maintenant à la partie gestion des erreurs et débogage.

---

<br>

![Un élève en train de tricher dans une classe, pixel art]()

## Gérez et déboguez vos erreurs

Avant d’aller plus loin, assurez-vous de changer de branche et de vous positionner [sur la branche `partie-2/chapitre-2/section-2`](https://github.com/nx-academy/Creez-des-pipelines-CI-CD-avec-les-GitHub-Actions/tree/partie-2/chapitre-2/section-2).

Dans cette section, vous devrez analyser un workflow qui ne fonctionne pas. Vous verrez que dans la pratique, qu'il n'est pas rare de rencontrer des erreurs dans ses workflows, notamment lors de leurs créations. Le workflow en échec se trouve dans le fichier [`.github/workflows/workflow-with-errors.yml`](https://github.com/nx-academy/Creez-des-pipelines-CI-CD-avec-les-GitHub-Actions/blob/partie-2/chapitre-2/section-2/.github/workflows/workflow-with-errors.yml).

Les cas traditionnels de bug de CI sont une librairie qui n’est pas installée ou un script qui n’est pas reconnu et/ou pas exécuté. Le défi principal réside souvent dans le débogage, surtout lorsque l'on est débutant en CI/CD. Cela dit, si vous suivez mes recommandations, vous devriez rapidement être capable d’affronter des bugs simples.

Si vous avez déjà suivi [mon cours sur les bugs côté front-end d’OpenClassrooms](https://openclassrooms.com/fr/courses/7159296-deboguez-l-interface-de-votre-site-internet/7278716-adoptez-la-logique-de-debogage), il est probable que les phrases suivantes ne vous étonnent pas. Nous, les développeurs et développeuses, passons notre temps à résoudre des bugs et des erreurs. C’est une partie essentielle de notre travail et pour être tout à fait honnête, c’est l’une des parties qui me plaît le plus (avec la partie abstraction et architecture des solutions).

Être capable de déboguer rapidement est une compétence essentielle pour tout développeur. C’est quelque chose qui s'acquiert avec le temps et l’expérience. Cela dit, il est possible d'accélérer l’apprentissage de cette compétence en suivant une méthodologie simple et structurée.

<br>

Cette méthode est composée de quatre étapes :

1.  Observer le bug - L’idée ici est d’enquêter sur son origine, en s’intéressant aux messages d’erreurs (s’il y en a).
2.  Écrire un test répétable - Être capable de reproduire le bug est une étape essentielle. Tant pour corriger le bug que pour écrire un futur test automatisé.
3.  Tester sa théorie - C’est le moment d'émettre des hypothèses pour vérifier d’où vient le bug.
4.  Résoudre le bug - L’implémentation de la solution dans le code. Il est important d’essayer de tester quelques cas d’utilisation après pour voir si vous avez bien résolu le bug et aussi si vous n’en avez pas ajouté de nouveaux.

<br>

Dans le cadre des GitHub Actions, ce sont les logs émis par les actions elles-mêmes qui vont vous permettre de résoudre ce bug. Pour rappel, un log, ou journal d’événement en français, est du texte émis par un programme ou un service. Un log contient des informations comme la date et l’heure (à laquelle un événement a eu lieu) ainsi que son niveau de gravité.

<br>

![](/images/cours-ci-cd-github-actions/journal-logs.webp)

<br>

Les logs fournissent des données particulièrement importantes pour déboguer. Il existe différents types de logs : les applications logs, les systèmes logs, etc. Si vous souhaitez en apprendre plus sur le sujet, je vous invite à regarder [cette conférence de Daniel Maher](https://www.youtube.com/watch?v=39oA9W4J37I), un ancien de mes collègues de Datadog. Vous y trouverez des informations essentielles sur ce qui composent un log.

Dans le cadre des GitHub Actions, quand on exécute un workflow, chaque étape (souvenez-vous, les steps) génère ses propres logs, comme le montre la capture d’écran ci-dessous.

<br>

![](/images/cours-ci-cd-github-actions/exemples-log-ci-cd.webp)

<br>

Ces logs vont vous permettre d’observer le bug et d’en apprendre un peu plus sur celui-ci. Autrement dit, ils vont vous donner du contexte. Il est donc crucial de comprendre leur format et de savoir comment les interpréter. Les logs et erreurs seront signalisés en rouge comme le montre la capture d’écran suivante.

<br>

![](/images/cours-ci-cd-github-actions/workflows-erreurs.webp)

<br>

Ici, par exemple, vous pouvez voir les workflows qui sont « en succès » (comprendre : ceux qui sont allés à leur terme) et ceux qui sont en échec.

<br>

Quand un workflow est en échec, vous pouvez cliquer dessus pour avoir plus d’informations sur le job qui a échoué.

<br>

![](/images/cours-ci-cd-github-actions/log-erreur.webp)

<br>

Dans mon cas, en consultant les logs des GitHub Actions, je constate que le linter ESLint n'a pas fonctionné. C’est une information particulièrement importante pour déboguer. C’est la première étape de notre méthodologie de résolution de bugs.

Pour le reproduire, vous avez deux options :

- vous pouvez soit relancer le workflow. En effet, certaines erreurs sont parfois dues à des problèmes de réseaux ou à des dépendances indisponibles. Au final, c'est un peu comme redémarrer un ordinateur qui bugge ou supprimer le dossier node_modules avant de réinstaller les dépendances. Cependant, soyez prudent, car cela consomme des crédits GitHub Actions ;
- Vous pouvez essayer de le reproduire en local. En essayant, par exemple, de lancer le script. Ici, le script est npm run lint. L’avantage de cette méthode est qu’elle ne vous coûtera rien. L'inconvénient est que l'environnement de la CI peut différer de celui de votre ordinateur local. Il existe une librairie nommée act qui reproduit l’environnement d'exécution des GitHub Actions sur votre ordinateur. Je n'ai pas encore eu l'occasion de l'essayer, mais si je le fais, je publierai certainement un article de blog à ce sujet.

<br>

Il ne vous reste plus qu’à essayer de résoudre cette erreur. Prenez le temps nécessaire pour résoudre cette erreur, car c'est une étape importante dans votre apprentissage. Le screencast ci-dessous vous montre la stratégie de débogage en actions.

<br>

**SCREENCAST: Gérez et déboguez vos erreurs**

<br>

Notre CI est de nouveau opérationnel. Sachez que la solution se trouve [sur la branche `partie-2/chapitre-2/section-2-fin`](https://github.com/nx-academy/Creez-des-pipelines-CI-CD-avec-les-GitHub-Actions/tree/partie-2/chapitre-2/section-2-fin).
</article>
