---
layout: ../../layouts/CheatSheetsLayout.astro

title: "GitHub Actions vs GitLab CI : quelles différences ?"
description:
  "GitHub Actions ou GitLab CI ? On compare les deux outils de CI/CD : syntaxe
  des workflows, runners, tarification et écosystème. Et surtout, on voit lequel
  choisir selon votre contexte, exemples à l'appui."

imgAlt:
  Deux chaînes de montage automatisées côte à côte, l'une aux couleurs de
  GitHub, l'autre de GitLab, pixel art
imgSrc: /images/cheatsheets/github-actions-vs-gitlab-ci.webp

author: Thomas
kind: Fiche technique
serie: cicd
level: Débutant
publishedDate: 07/07/2026
---

On continue notre série sur les CI/CD. Après avoir vu comment
[déclencher un workflow](/fiches/declencher-workflow-github-actions) et à quoi
servent [les artefacts](/fiches/artefact-github-actions), on prend un peu de
hauteur aujourd'hui avec une question qui revient _tout le temps_ :

**GitHub Actions ou GitLab CI, c'est quoi la différence ? Et lequel choisir ?**

Les deux sont des outils de CI/CD, les deux tournent sur des fichiers YAML, les
deux automatisent vos tests et vos déploiements… alors forcément, on se demande
s'ils se valent, s'ils se ressemblent, et sur lequel miser.

Dans cette fiche, on va comparer les deux point par point, puis je vous donnerai
ma grille de décision. Et vous allez voir : une fois qu'on a compris leur
philosophie respective, le choix devient souvent évident.

---

## Le point commun : même besoin, deux philosophies

Avant de lister les différences, posons les bases. GitHub Actions et GitLab CI
répondent **au même besoin** : automatiser ce qui se passe entre le moment où
vous poussez du code et le moment où il arrive en production (tests, build,
déploiement).

<br>

Mais ils ne l'abordent pas de la même manière :

- **GitHub Actions** est né comme un système **événementiel et modulaire**,
  greffé sur GitHub. On réagit à des événements (`push`, `pull_request`…) et on
  assemble des briques réutilisables piochées dans une immense marketplace.
- **GitLab CI** est un **composant intégré** d'une plateforme DevOps unique.
  GitLab, c'est le dépôt Git, la CI/CD, le registry, le suivi de tickets… le
  tout dans une seule application. La CI/CD y est pensée comme un **pipeline**
  découpé en étapes (_stages_).

<br>

Cette différence de départ explique presque toutes les autres. Déroulons-les.

## La syntaxe : `on:` contre `stages:`

C'est la première chose qu'on remarque. Le fichier de config ne vit pas au même
endroit et ne se structure pas pareil.

<br>

Chez **GitHub Actions**, vos workflows vivent dans le dossier
`.github/workflows/` (vous pouvez en avoir plusieurs). Chaque workflow part d'un
événement déclencheur, puis décrit des _jobs_ composés de _steps_ :

```yml
# .github/workflows/ci.yml
name: CI
on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test
```

<br>

Chez **GitLab CI**, tout tient dans un seul fichier `.gitlab-ci.yml` à la racine
du dépôt. On y déclare des _stages_ (les grandes étapes du pipeline), puis des
_jobs_ que l'on range dans ces stages :

```yml
# .gitlab-ci.yml
stages:
  - test

test:
  stage: test
  image: node:20
  script:
    - npm ci
    - npm test
  rules:
    - if: $CI_COMMIT_BRANCH == "main"
```

<br>

Vous voyez la nuance de philosophie :

- GitHub Actions raisonne **« quel événement déclenche quoi »** et adore les
  actions prêtes à l'emploi (`uses: actions/checkout@v4`) ;
- GitLab CI raisonne **« quelles étapes s'enchaînent »** et exécute surtout des
  `script:` bruts dans une image Docker que vous choisissez.

## Les runners : hébergés ou auto-gérés

Un runner, c'est la machine qui exécute votre pipeline. Là encore, deux
approches.

<br>

**GitHub Actions** fournit des runners hébergés prêts à l'emploi
(`ubuntu-latest`, `windows-latest`, `macos-latest`). Vous ne gérez rien, vous
choisissez juste l'OS via `runs-on`. Vous pouvez aussi brancher vos propres
_self-hosted runners_ si besoin.

**GitLab CI** fonctionne avec des _GitLab Runners_. Sur GitLab.com, des runners
partagés sont disponibles, mais la culture GitLab pousse davantage à **héberger
ses propres runners** — ce qui est un vrai atout quand on veut tout maîtriser en
interne (entreprise, données sensibles, matériel spécifique).

<br>

À retenir : sortir des runners hébergés est plus « naturel » côté GitLab, alors
que côté GitHub on reste souvent sur les runners fournis par défaut.

## L'écosystème : marketplace contre plateforme intégrée

C'est peut-être la différence la plus structurante au quotidien.

<br>

**GitHub Actions** s'appuie sur une
[marketplace gigantesque](https://github.com/marketplace?type=actions) : des
milliers d'actions réutilisables pour à peu près tout (déployer sur AWS, publier
sur npm, envoyer un message Slack…). Vous assemblez, vous ne réinventez pas.

**GitLab CI** mise sur l'intégration : comme tout est dans la même plateforme
(registry d'images, environnements, _review apps_, sécurité…), beaucoup de
choses fonctionnent « d'office » sans dépendre d'une brique externe. On
mutualise plutôt via le mot-clé `include:` et des templates de pipeline.

## Tableau récapitulatif

Pour y voir clair en un coup d'œil :

|                           | GitHub Actions                      | GitLab CI                          |
| ------------------------- | ----------------------------------- | ---------------------------------- |
| **Fichier de config**     | `.github/workflows/*.yml`           | `.gitlab-ci.yml` (racine)          |
| **Modèle**                | Événementiel (`on:`) + jobs/steps   | Pipeline en _stages_ + jobs        |
| **Briques réutilisables** | Marketplace d'actions (`uses:`)     | Templates + `include:`             |
| **Runners**               | Hébergés par défaut, self-hosted OK | Souvent auto-gérés                 |
| **Intégration**           | Greffé sur GitHub                   | Plateforme DevOps tout-en-un       |
| **Point fort**            | Écosystème d'actions énorme         | Tout intégré, self-hosting confort |

---

## Alors, lequel choisir ?

Bonne nouvelle : dans l'immense majorité des cas, **le choix est déjà fait pour
vous par l'endroit où vit votre code**. On ne migre pas son dépôt de GitHub vers
GitLab juste pour changer d'outil de CI.

<br>

Voici ma grille de décision :

- **Votre code est sur GitHub** → GitHub Actions, sans hésiter. C'est intégré,
  gratuit sur les dépôts publics, et l'écosystème d'actions vous fera gagner un
  temps fou.
- **Votre code est sur GitLab**, ou vous cherchez une **plateforme DevOps
  unique** (souvent auto-hébergée en entreprise) → GitLab CI, tout aussi
  naturellement.
- **Vous avez un besoin fort de self-hosting** et de tout maîtriser en interne
  (données sensibles, conformité, matériel spécifique) → GitLab a une longueur
  d'avance sur ce terrain, même si GitHub sait aussi le faire.
- **Vous voulez le maximum d'actions prêtes à l'emploi** et une communauté
  immense → l'avantage penche pour GitHub Actions.

<br>

Mon conseil ? **Ne cherchez pas le « meilleur » dans l'absolu, cherchez le mieux
adapté à votre contexte.** Les deux sont d'excellents outils. Le vrai critère,
c'est où vit votre code et à quel point vous voulez héberger vous-même votre
infrastructure.

## Astuce bonus - Les concepts se transfèrent

Voici une chose rassurante : **ce que vous apprenez sur l'un vous sert sur
l'autre**. Jobs, runners, artefacts, cache, variables d'environnement,
déclenchement sur événement… les concepts fondamentaux sont les mêmes des deux
côtés. Seule la syntaxe change.

<br>

Concrètement, si vous savez lire un workflow GitHub Actions, vous comprendrez un
`.gitlab-ci.yml` en quelques minutes. Passer de l'un à l'autre revient surtout à
traduire du YAML :

- `runs-on` devient `image` + un runner ;
- une suite de `steps` devient une liste de `script:` ;
- `on:` devient `rules:` (ou l'ancien `only:` / `except:`).

<br>

Bref, ne voyez pas ces deux outils comme deux mondes étanches. Maîtriser la
logique CI/CD, c'est ce qui compte — l'outil n'est qu'un support.

<hr>

Et voilà, vous ne devriez plus jamais hésiter entre les deux ! Pour résumer en
une phrase : **GitHub Actions brille par son écosystème d'actions greffé sur
GitHub, GitLab CI par son intégration dans une plateforme DevOps tout-en-un — et
le bon choix, c'est celui qui colle à l'endroit où vit votre code.**

D'ici là, je vous invite :

- à (re)commencer
  [le cours sur les pipelines CI/CD avec les GitHub Actions](/cours/ci-cd-github-actions/)
  si ce n'est pas déjà fait ;
- à revenir sur la fiche
  [Quand et comment déclencher un workflow GitHub Actions ?](/fiches/declencher-workflow-github-actions)
  pour les bases.

## Ressources

- [La documentation officielle de GitHub Actions](https://docs.github.com/en/actions)
- [La documentation officielle de GitLab CI/CD](https://docs.gitlab.com/ee/ci/)
- [Migrating from GitLab CI/CD to GitHub Actions](https://docs.github.com/en/actions/migrating-to-github-actions/migrating-from-gitlab-cicd-to-github-actions)
- [GitLab CI/CD examples](https://docs.gitlab.com/ee/ci/examples/) </content>
