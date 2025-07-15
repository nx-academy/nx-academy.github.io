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

## Introduction - Pourquoi parle-t-on de déclencheurs ?

- C'était promis ! Je commence à faire la transition vers un autre élément clé de la boite à outils DevOps : les fameuses CI serveurs.
- C'est l'un de mes points préférés dans le DevOps. Automatiser des tâches récurrents est toujours très satisfaisant. Ca me fait toujours beaucoup penser à des jeux vidéos d'usine type Factorio ou Satisfactory. C'est l'une des nombreuses raisons qui me font aimer et faire de l'informatique.
- Dans cette fiche technique, on va s'intéresser à un concept essentiel des CI serveurs : les déclencheurs ! 
- Parce que non, un workflow GitHub Actions ne tourne pas "magiquement". En effet, chaque workflow a besoin d’un ou plusieurs déclencheurs pour savoir quand s’exécuter.

## C’est quoi un déclencheur dans GitHub Actions ?

- Définition du concept de déclencheur en quelques mots (pas besoin de faire 3 phrases dessus). Peut-être faire une comparaison avec les `addEventListener` côté JavaScript
- Dans notre fichier de configuration CI, par exemple, `deploy.yml` chez moi, il est situé dans le champ `on`.
- On peut définir un ou plusieurs déclencheurs.
- Exemple de code générique contenant deux déclencheurs.

## Les déclencheurs les plus courants

- Vous l'aurez compris, il n'existe pas un mais plusieurs déclencheurs. Je vais prendre le temps de les passer en revu et de vous les présenter.

### Le déclencheur `push`

- Se déclenche à chaque `git push` sur une ou plusieurs branches.
- Exemple
- Cas d’usage : lancer les tests à chaque push sur la branche principale.
- Typiquement sur NX, j'utilise ça pour deploy mon site en production (uniquement quand je push sur la branch main)

### Le déclenceur `pull_request`

- Se déclenche à l'ouverture ET à la mise à jour du PR.
- Exemple
- Cas d’usage : lancer le linter uniquement lors des revues de code.
- Typiquement sur NX, j'utilise ça pour faire passer mes tests, mon linter et prettier uniquement quand j'ouvre une PR (ce qui me permet de me concentrer uniquement sur le build and deploy sur ma branche de prod)

### Le déclenceur `workflow_dispatch`

- Déclenchement manuel via GitHub UI.
- Exemple
- Cas d’usage : déploiement déclenché à la main ou scripts ponctuels.
- Sur NX, ça m'arrive relativement peu de le faire des déclenchements manuels. Les rares fois où ça m'arrive, c'est pour tes histoires de configuration de repo ou de DNS.

---

Pour info, il existe `workflow_call` qui permet de mutualiser un bloc de tâches. Mais on y reviendra une autre fois.

## Comment bien les configurer ?

- En réalité, c'est assez simple :). Vous pouvez soit faire un seul déclenceur, soit en combiné plusieurs.
- Exemple de plusieurs déclencheurs.
- Tableau du déclencheur en fonction du contexte.

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
