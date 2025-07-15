---
layout: ../../layouts/CheatSheetsLayout.astro

title: Quand et comment déclencher un workflow GitHub Actions ?
description: 

imgAlt: 
imgSrc: 

author: Thomas
kind: Fiche technique
level: Débutant
publishedDate: 09/05/2025
---

<article>

# Quand et comment déclencher un workflow GitHub Actions ?

Je vous l'avais promis ! Je commence à faire la transition vers un autre grand classique de la boîte à outils DevOps : les CI serveurs. 

Personnellement, c’est l’un de mes aspects préférés. Automatiser des tâches récurrents est toujours très satisfaisant. Ca me fait toujours beaucoup penser à des jeux vidéos d'usine type Factorio ou Satisfactory. C'est l'une des nombreuses raisons qui me font aimer et faire de l'informatique.

Dans cette fiche technique, **on va s’intéresser à un concept fondamental de ces outils d’automatisation : les déclencheurs**.

Parce que non (hélas), un workflow GitHub Actions ne s’exécute pas tout seul. Chaque fichier `.yml` a besoin d’un ou plusieurs événements pour savoir quand il doit tourner. C’est justement pour ça qu’on parle de déclencheur.

## C’est quoi un déclencheur ?

Un déclencheur est l’événement qui active l’exécution d’un workflow. Si vous avez déjà codé un peu en JavaScript (normalement, oui, hein ?), pensez à la méthode `addEventListener`. C'est exactement le même principe. On écoute un événement, et dès qu’il se produit, on lance une action.

Dans un fichier de configuration CI (comme `deploy.yml` chez moi), on les déclare dans le champ `on`. C’est ce champ qui permet de dire à GitHub Actions : _Fais tourner ce workflow quand il se passe ça_.

Sachez qu'on peut combiner plusieurs déclencheurs dans un même workflow.

```yml
on:
  # Premier déclencheur 
  push:
    branches:
      - main
  # Deuxième déclencheur 
  pull_request:
    branches:
      - main
```

Dans cet exemple, le workflow se lancera :
- à chaque git push sur la branche main ;
- à chaque ouverture ou mise à jour d’une pull request vers main.

<br>

Plutôt pratique, non ?

## Les déclencheurs les plus courants

Vous l’aurez compris. Il n’existe pas un mais plusieurs déclencheurs avec les GitHub Actions. Chacun correspond à un type d’événement. On va donc prendre un moment pour les passer en revue avec à chaque fois un exemple concret et un petit retour d’expérience maison.

<br>

### Le déclencheur `push`
Le déclencheur push s’active à chaque fois que vous poussez du code (git push) sur une ou plusieurs branches définies.

```yml
on:
  push:
    branches:
      - main
```

Dans cet exemple, **le workflow se lance à chaque push sur la branche `main`**. C’est parfait pour lancer automatiquement des tests ou déployer une application.

Typiquement sur NX, je l’utilise pour déployer le site en production. Chaque push sur la branche main déclenche le build et hop ! La nouvelle version est en ligne.

<br>

### Le déclenceur `pull_request`
Ce déclencheur s’active à l’ouverture ou à la mise à jour d’une pull request. Autrement dit, dès que quelqu’un propose du code à intégrer dans une branche, `main` par exemple.

```yml
on:
  pull_request:
    branches:
      - main
```

C’est très utile pour lancer automatiquement des vérifications avant la fusion d’une PR : linter, tests, formatage…

Sur NX, je l’utilise pour lancer Prettier, ESLint et mes tests unitaires à chaque PR. Comme ça, je garde mon workflow de build et de déploiement proprement réservé à la branche main.

<br>

### Le déclenceur `workflow_dispatch`
Celui-ci est un peu à part : il permet de lancer manuellement un workflow depuis l’interface GitHub. En gros, en un clic, vous pouvez lancer directement le workflow depuis GitHub.

```yml
on:
  workflow_dispatch:
```

Ce déclencheur est très pratique pour des actions ponctuelles comme un script de nettoyage, une génération de rapport ou une publication volontaire.

Sur NX, pour être honnête, je l’utilise rarement. Cela dit, il m’a déjà dépanné pour des opérations manuelles liées à la configuration des repositories ou aux enregistrements DNS. Typiquement, ce sont des actions que je veux pouvoir lancer à la demande, sans qu’elles tournent automatiquement.

---

Pour info, il existe `workflow_call` qui permet de mutualiser un bloc de tâches. Mais on y reviendra une autre fois.

## Comment bien configurer ses déclencheurs ?

<!-- - En réalité, c'est assez simple :). Vous pouvez soit faire un seul déclenceur, soit en combiné plusieurs.
- Exemple de plusieurs déclencheurs.
- Tableau du déclencheur en fonction du contexte. -->

Pour être honnête, configurer ses déclencheurs, c’est plutôt simple. Vous pouvez en utiliser un seul, comme `push`, ou bien en combiner plusieurs dans un même fichier yml.

Voici un exemple combiné :

```yml
on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
```

Ici, le workflow se déclenchera :
- quand vous poussez du code sur la branche `main` ;
- ou quand quelqu’un crée ou met à jour une pull request vers `main`.

<br>

Et pour vous aider à choisir le bon déclencheur selon votre contexte, je vous ai préparé un tableau récapitulatif :

<br>

| **Besoin identifié**      | **Déclencheur conseillé**      |
| ------------- | ------------- |
| Lancer un test à chaque commit | `push` |
| Vérifier le code avant de fusionner une pull request | `pull_request` |
| Déclencher un script manuellement | `workflow_dispatch` |
| Mutualiser un bloc d’actions dans plusieurs workflows | `workflow_call` (à venir) |
| Lancer une tâche de manière régulière (ex : chaque nuit) | `schedule` (voir bonus) |

<br>
<br>

Je vais maintenant vous montrer quelques exemples de workflow complets histoire que vous puissez vous faires une idée globale.

## Exemples de workflow complets 

### Pour une application ReactJS

### Pour une API Flask (Python)

## Bonus – Le déclencheur CRON avec schedule

- Permet de planifier un workflow.
- Exemple
- Explication de la syntaxe CRON + lien utile.
- Cas d’usage : générer un rapport, nettoyage, etc.
- Typiquement sur NX, je pourrais m'en servir pour mon système de recap (que je fais pour le moment à la main). D'ailleurs, je crois que je vais bientôt implémenter ça en CRON :D.

## Conclusion

- Recap.
- Teasing de la prochaine fiche
- Lien vers le quiz
- Lien vers le cours sur Docker (en attendant le cours sur les pipelines CI/CD).

## Ressources

</article>
