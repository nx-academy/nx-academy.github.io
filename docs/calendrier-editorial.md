# Calendrier éditorial NX Academy – Avril à Décembre 2025

**Rythme mensuel** :

- Une fiche technique
- Un recap de veille tech
- Un article de blog (coulisses, pédagogie, IA, etc.)
- Un menu NX du mois ; chaque premier lundi du mois, LinkedIn perso
- Un gif du mois
- Un article bonus (si envie et temps)

## Cours prévus

| Mois      | Cours                                                 | status     |
| --------- | ----------------------------------------------------- | ---------- |
| Juin      | Conteneurisez vos applications avec Docker            | **DONE**   |
| Septembre | Maîtrisez les pipelines CI/CD avec les GitHub Actions | _en cours_ |
| Décembre  | Mettez vos applications en production                 | à faire    |
| TBD       | Monitorez vos applications avec Datadog               | à faire    |

**Idées de cours complémentaires** :

- Développez des applications IA (Python + GPT)

## Fiches techniques prévues

| Mois      | Sujet de la fiche technique                               | status                         |
| --------- | --------------------------------------------------------- | ------------------------------ |
| Mai       | Comment (bien) utiliser les volumes Docker ?              | **DONE**                       |
| Juin      | Qu'est-ce qu'un registry Docker ?                         | **DONE**                       |
| Juillet   | Comment optimiser son image Docker ?                      | **DONE**                       |
| Août      | Comment faire un multi stagging ?                         | **DONE**                       |
| Septembre | Quand et comment déclencher un workflow GitHub Actions ?  | **DONE**                       |
| Octobre   | Qu'est-ce qu'un artefact dans GitHub Actions ?            | **DONE**                       |
| Novembre  | Comment déployer une image Docker depuis GitHub Actions ? | **DONE**                       |
| Décembre  | Comment optimiser vos workflows GitHub Actions ?          | brouillon, prévu le 09/09/2026 |

**Idées de fiches techniques complémentaires** :

- GitHub Actions versus GitLab CI
- GitHub Actions versus Travis CI
- GitHub Actions versus Jenkins
- Docker verus Podman
- Migrer de Docker (Swarm) vers Kube

## Articles prévus

| Mois      | Objectif                                                       | Status  |
| --------- | -------------------------------------------------------------- | ------- |
| Août      | Astro, un sacré (bon) framework front                          | à faire |
| Août      | Annonce : cours Docker et Docker compose                       | à faire |
| Septembre | Comment bien utiliser les projets OpenAI ?                     | à faire |
| Septembre | Annonce : cours CI/CD                                          | à faire |
| Octobre   | L'IA va-t-elle tuer Internet ?                                 | à faire |
| Novembre  | Quelle est la différence entre la pédagogie et la didactique ? | à faire |
| Décembre  | Annonce : cours mise en production                             | à faire |
| Décembre  | Internet n'a jamais été aussi fermé                            | à faire |

**Les articles BONUS** :

- Les coulisses de NX : comment fonctionne Le Récap ?
- Les coulisses de NX : comment fonctionne la génération de quiz par IA ?
- Les coulisses de NX : comment fonctionne mon système de news automatisé ?
- Les coulisses de NX : pourquoi est-ce que je n'aime pas parler de moi ?

**Idées d'articles complémentaires** :

- JavaScript (React) / Python (FastAPI) - Le combo gagnant des startups IA ?
- Pourquoi le travail d'informaticien est en train de redevenir passionant ?
- Personne n'aime l'eau tiède

## Cluster Cloud public — août à octobre 2026

Cadrage complet : [cluster-cloud-public.md](./cluster-cloud-public.md). Nouvelle
série `cloud` (rayon « Cloud public » sur `/fiches/`), 6 fiches et 2 articles
qui se citent en chaîne. Prépare le terrain du cours « Mettez vos applications
en production ».

> Replanifié le 5 septembre 2026. Le cluster s'étalait jusqu'en janvier 2027,
> soit **après** le cours de décembre qu'il est censé préparer, et à une cadence
> de 0,5 publication par semaine là où le rythme réel de juin à août tournait
> autour de 2,5. Tout est ramené sur septembre-octobre. Dates du tableau au
> format français ; dans les frontmatters, elles s'écrivent `MM/DD/YYYY`.

| Date       | Type    | Titre                                                        | Status    |
| ---------- | ------- | ------------------------------------------------------------ | --------- |
| 05/08/2026 | Fiche   | Qu'est-ce que le cloud public ? (pilier)                     | **DONE**  |
| 12/08/2026 | Fiche   | Cloud public, privé, hybride : quelles différences ?         | **DONE**  |
| 02/09/2026 | Fiche   | IaaS, PaaS, SaaS : quelles différences et comment choisir ?  | **DONE**  |
| 16/09/2026 | Fiche   | Comment déployer un conteneur Docker dans le cloud ?         | brouillon |
| 23/09/2026 | Fiche   | Comment déployer un conteneur Docker sur Scaleway ?          | brouillon |
| 28/09/2026 | Fiche   | Comment déployer un conteneur Docker sur AWS (ECS Fargate) ? | brouillon |
| 30/09/2026 | Article | Le cloud public coûte-t-il vraiment moins cher ?             | brouillon |
| 05/10/2026 | Article | Cloud souverain : de quoi parle-t-on vraiment ?              | brouillon |

Les cinq brouillons restants sont écrits et vivent dans `src/pages/drafts/`
(`deployer-conteneur-docker-dans-le-cloud`,
`deployer-conteneur-docker-sur-scaleway`, `deployer-conteneur-docker-sur-aws`,
`le-cloud-est-il-vraiment-moins-cher`, `cloud-souverain`). Il leur manque leurs
visuels. Les deux fiches de mise en pratique sont cadrées dans
[cluster-cloud-pratique.md](./cluster-cloud-pratique.md), et leurs commandes
n'ont pas encore été exécutées contre une vraie API. Publier = déplacer le
fichier vers `src/pages/fiches/` ou `src/pages/articles/`, ajuster
`publishedDate` et basculer les liens `/drafts/` : la checklist par contenu est
dans [cluster-cloud-public.md](./cluster-cloud-public.md).

## Planning de publication — septembre et octobre 2026

Deux publications par semaine, lundi et mercredi : les deux jours les plus
fréquents des trois derniers mois, et la cadence qui vide le backlog avant
novembre. Les dix brouillons du dépôt y sont tous placés. Ils sont rédigés, mais
**aucun n'a son visuel** — c'est le seul vrai goulot de ce calendrier.

| Date       | Contenu                                   | Cluster | Pourquoi à cette place                      |
| ---------- | ----------------------------------------- | ------- | ------------------------------------------- |
| 07/09/2026 | `github-actions-vs-gitlab-ci`             | CI/CD   | ferme un 404 en production                  |
| 09/09/2026 | `optimiser-workflows-github-actions`      | CI/CD   | ferme le second 404                         |
| 14/09/2026 | `premier-jeu-simple-pico-8`               | gamedev | trois liens `/drafts/` en attente           |
| 15/09/2026 | `l-atelier-presentation`                  | atelier | ouvre la série « L'atelier »                |
| 16/09/2026 | `deployer-conteneur-docker-dans-le-cloud` | cloud   | déjà cité par `iaas-paas-saas`              |
| 21/09/2026 | `top-10-jeux-pico-8`                      | gamedev |                                             |
| 23/09/2026 | `deployer-conteneur-docker-sur-scaleway`  | cloud   | dérouler les commandes contre l'API d'abord |
| 28/09/2026 | `deployer-conteneur-docker-sur-aws`       | cloud   | idem                                        |
| 30/09/2026 | `le-cloud-est-il-vraiment-moins-cher`     | cloud   |                                             |
| 05/10/2026 | `cloud-souverain`                         | cloud   | ferme le cluster, deux mois avant le cours  |

`l-atelier-presentation` tombe un mardi et non un lundi : le lundi 14 est déjà
pris par `premier-jeu-simple-pico-8`. C'est la seule semaine à trois
publications du planning, ce qui reste dans le rythme habituel.

Reste hors planning : le récap de septembre, à sortir fin septembre comme les
précédents.

## Le Recap

| Mois      | Objectif                          | status     |
| --------- | --------------------------------- | ---------- |
| Avril     | Recap                             | **DONE**   |
| Mai       | Recap                             | **DONE**   |
| Juin      | Recap + relai cours Docker        | **DONE**   |
| Juillet   | Recap                             | _en cours_ |
| Août      | Recap + teaser cours CI/CD        | à faire    |
| Septembre | Recap + relai cours CI/CD         | à faire    |
| Octobre   | Recap                             | à faire    |
| Novembre  | Recap + teaser cours mise en prod | à faire    |
| Décembre  | Recap + relai cours mis en prod   | à faire    |

## Le menu - format LinkedIn

**A faire avant** : template à designer sur Canvas

### Septembre

| Type de contenu | Titre                                                   | Date de publication |
| --------------- | ------------------------------------------------------- | ------------------- |
| Fiche technique | Quand et comment déclencer un workflow GitHub Actions ? |                     |
| Article         | Comment bien utiliser les projets OpenAI ?              |                     |
| Relai de cours  | Maitrisez les pipelines CI/CD avec les GitHub Actions ? |                     |
| Gif du mois     | C'est la rentrée !                                      |                     |
| Le Recap        | Le Recap #6 - Septembre 2026                            |                     |

### Octobre

| Type de contenu | Titre                                                   | Date de publication |
| --------------- | ------------------------------------------------------- | ------------------- |
| Fiche technique | Quand et comment déclencer un workflow GitHub Actions ? |                     |
| Article         | Comment bien utiliser les projets OpenAI ?              |                     |
| Relai de cours  | Maitrisez les pipelines CI/CD avec les GitHub Actions ? |                     |
| Gif du mois     | C'est la rentrée !                                      |                     |
| Le Recap        | Le Recap #7 - Octobre 2026                              |                     |

### Novembre

| Type de contenu | Titre                                                   | Date de publication |
| --------------- | ------------------------------------------------------- | ------------------- |
| Fiche technique | Quand et comment déclencer un workflow GitHub Actions ? |                     |
| Article         | Comment bien utiliser les projets OpenAI ?              |                     |
| Relai de cours  | Maitrisez les pipelines CI/CD avec les GitHub Actions ? |                     |
| Gif du mois     | C'est la rentrée !                                      |                     |
| Le Recap        | Le Recap #8 - Novembre 2026                             |                     |

### Décembre

| Type de contenu | Titre                                                   | Date de publication |
| --------------- | ------------------------------------------------------- | ------------------- |
| Fiche technique | Quand et comment déclencer un workflow GitHub Actions ? |                     |
| Article         | Comment bien utiliser les projets OpenAI ?              |                     |
| Relai de cours  | Maitrisez les pipelines CI/CD avec les GitHub Actions ? |                     |
| Gif du mois     | C'est la rentrée !                                      |                     |
| Le Recap        | Le Recap #9 - Décembre 2026                             |                     |

## Le Gif du mois - format LinkedIn

| Mois      | Thème                       | Status     |
| --------- | --------------------------- | ---------- |
| Août      | C'est les vacances !        | **Généré** |
| Septembre | C'est la rentrée !          | à faire    |
| Octobre   | Halloween ?                 | à faire    |
| Novembre  | Il neige (ou il fait froid) | à faire    |
| Décembre  | C'est Nöel                  | à faire    |
