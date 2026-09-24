# Calendrier éditorial NX Academy

> Document vivant, ouvert en avril 2025. Il couvre aujourd'hui jusqu'à
> décembre 2026. Les sections datées plus anciennes sont conservées pour
> mémoire.

**Rythme mensuel** :

- Une fiche technique
- Un recap de veille tech
- Un article de blog (coulisses, pédagogie, IA, etc.)
- Un menu NX du mois ; chaque premier lundi du mois, LinkedIn perso
- Un gif du mois
- Un article bonus (si envie et temps)

## Cours prévus

| Mois      | Cours                                                 | status                                                                                                       |
| --------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Juin      | Conteneurisez vos applications avec Docker            | **DONE**                                                                                                     |
| Septembre | Maîtrisez les pipelines CI/CD avec les GitHub Actions | _en cours_                                                                                                   |
| Décembre  | Mettez vos applications en production                 | **nouveau format** — pilote des formations, dépend des projets, date à confirmer (voir `roadmap-produit.md`) |
| 2027      | Monitorez vos applications                            | cluster à cadrer d'abord — voir « Cluster Monitoring » plus bas                                              |

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
série `cloud` (rayon « Cloud public » sur `/fiches/`), 5 fiches et 2 articles
qui se citent en chaîne. Prépare le terrain du cours « Mettez vos applications
en production ».

> Replanifié le 5 septembre 2026. Le cluster s'étalait jusqu'en janvier 2027,
> soit **après** le cours de décembre qu'il est censé préparer, et à une cadence
> de 0,5 publication par semaine là où le rythme réel de juin à août tournait
> autour de 2,5. Tout est ramené sur septembre-octobre. Dates du tableau au
> format français ; dans les frontmatters, elles s'écrivent `MM/DD/YYYY`.

| Date       | Type    | Titre                                                       | Status   |
| ---------- | ------- | ----------------------------------------------------------- | -------- |
| 05/08/2026 | Fiche   | Qu'est-ce que le cloud public ? (pilier)                    | **DONE** |
| 12/08/2026 | Fiche   | Cloud public, privé, hybride : quelles différences ?        | **DONE** |
| 02/09/2026 | Fiche   | IaaS, PaaS, SaaS : quelles différences et comment choisir ? | **DONE** |
| 28/09/2026 | Fiche   | Comment déployer un conteneur Docker dans le cloud ?        | prêt     |
| 05/10/2026 | Fiche   | Comment déployer un conteneur Docker sur Scaleway ?         | prêt     |
| 12/10/2026 | Article | Le cloud public coûte-t-il vraiment moins cher ?            | prêt     |
| 14/10/2026 | Article | Cloud souverain : de quoi parle-t-on vraiment ?             | prêt     |

Les quatre brouillons restants sont écrits et vivent dans `src/pages/drafts/`
(`deployer-conteneur-docker-dans-le-cloud`,
`deployer-conteneur-docker-sur-scaleway`, `le-cloud-est-il-vraiment-moins-cher`,
`cloud-souverain`). Leurs visuels sont arrivés le 24/09/2026. La fiche de mise
en pratique est cadrée dans
[cluster-cloud-pratique.md](./cluster-cloud-pratique.md), et ses commandes n'ont
pas encore été exécutées contre une vraie API. Publier = déplacer le fichier
vers `src/pages/fiches/` ou `src/pages/articles/`, ajuster `publishedDate` et
basculer les liens `/drafts/` : la checklist par contenu est dans
[cluster-cloud-public.md](./cluster-cloud-public.md).

## Série Game dev — PICO-8

Série ouverte en juin 2026, hors calendrier mensuel (elle vient en plus des
publications prévues, pas à leur place). Rayon `gamedev` sur `/fiches/`.

| Contenu                                 | Type    | Status                            |
| --------------------------------------- | ------- | --------------------------------- |
| Découvrir PICO-8                        | Article | **DONE** (juin 2026)              |
| Comment prendre en main PICO-8 ?        | Fiche   | **DONE** (juin 2026)              |
| PICO-8 ou Pygame ?                      | Article | **DONE** (juillet 2026)           |
| Créer un premier jeu simple avec PICO-8 | Fiche   | **DONE** (août 2026)              |
| Les 10 jeux PICO-8 les plus connus      | Article | brouillon — visuel manquant       |
| Cours « créer un jeu avec PICO-8 »      | Cours   | promis au manifeste, non planifié |

Deux points à trancher :

- le brouillon `src/pages/drafts/top-10-jeux-pico-8.md` est rédigé, il n'attend
  que son visuel de une (`raw/articles/top-10-jeux-pico-8.png`), un
  `serie: gamedev` et une date ;
- `src/pages/manifeste.astro` annonce « un cours de création de jeux vidéo avec
  PICO-8 ». Cet engagement n'apparaît nulle part ailleurs : soit on le planifie,
  soit on le retire du manifeste.

## Mini-cluster « déboguer un conteneur » — octobre à novembre 2026

Ouvert le 24/09/2026. Trois contenus dans la série `docker` existante, pas une
nouvelle série. Le sujet n'a aujourd'hui **aucune couverture** alors que c'est
une des questions les plus posées, et Docker est déjà le rayon le mieux classé
du site : c'est le meilleur endroit où ajouter.

Le découpage tient parce que chaque contenu répond à une question réellement
différente, et pas à une tranche de la même :

| Contenu                                          | Type    | La question                                                                                                                                         |
| ------------------------------------------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pourquoi mon conteneur ne démarre pas ? (pilier) | Fiche   | le conteneur **ne tourne pas** : codes de sortie, `logs`, `inspect`, boucles de redémarrage, `ENTRYPOINT` contre `CMD`, permissions, port déjà pris |
| Comment déboguer un conteneur qui tourne ?       | Fiche   | il **tourne mais se comporte mal** : `exec`, `attach`, une image sans shell, inspection du réseau                                                   |
| 10 techniques de débogage Docker                 | Article | la porte d'entrée qui renvoie vers les deux fiches                                                                                                  |

L'article listicle vient **en dernier**, pas en premier : il n'a d'intérêt que
s'il a deux fiches vers lesquelles pointer. C'est le même montage que
`top-10-jeux-pico-8`, qui fonctionne parce que les fiches gamedev existaient
déjà.

**Angle mis en attente : « débogage Docker contre Podman ».** La fiche
`difference-docker-podman` sort le 30/09 et n'est pas encore en ligne. Écrire
une comparaison de débogage avant de voir ce qu'elle couvre, c'est se garantir
un doublon — et sur ce terrain précis les deux outils partagent l'essentiel de
l'outillage, la vraie différence étant le rootless. À reprendre une fois la
fiche Podman publiée, s'il reste quelque chose à dire.

## Cluster Monitoring — 2027, à cadrer

Piste ouverte le 24 septembre 2026. Aucun contenu à ce jour : `monitoring`,
`observabilité`, `tracing` et `Datadog` n'apparaissent dans le corpus publié
qu'en mentions de passage, jamais comme sujet. Nouvelle clé de série à créer
dans `src/data/series.ts`.

**Sa place dans la chaîne est ce qui le rend évident.** Le site déroule déjà
construire une image → automatiser → déployer → mettre en production. Observer
est le maillon suivant, et le dernier qui manque pour que l'arc soit complet. Ce
n'est donc pas une île : c'est une suite, et elle vient **après** la formation «
Mise en production », pas avant.

### La structure : reprendre le partage du cluster cloud

Le cluster cloud a déjà résolu le problème du fournisseur, et le résultat est
documenté dans [cluster-cloud-pratique.md](./cluster-cloud-pratique.md) : une
**fiche-pont qui ne nomme personne** (« les noms changent d'un service à
l'autre, les six étapes, non »), puis un **volet pratique** dans un document
séparé, avec un fournisseur nommé et la même clé de série.

On reprend ce partage tel quel :

- **Le cluster** porte les concepts, sans fournisseur : les trois piliers
  (métriques, logs, traces), ce qu'est le tracing distribué, SLI et SLO,
  l'alerting, le coût de la cardinalité. Le véhicule technique neutre est
  **OpenTelemetry**, qui est le standard et que Datadog ingère — ce qui permet
  d'être concret sans être du contenu de marque.
- **Le volet pratique**, document séparé, met tout ça en œuvre chez Datadog.

Ce partage n'est pas qu'une précaution éditoriale : les requêtes durables sont
les requêtes de concept (« différence logs métriques traces », « c'est quoi le
tracing »). Sur les requêtes de produit, la documentation de l'éditeur sera
toujours devant. Le pilier neutre est donc **aussi** le meilleur pari de
référencement ; un partenariat aide par les liens entrants, pas par le
classement sur les termes de marque.

### Deux points à trancher avant d'écrire

- **Le conflit d'employeur.** Le même réflexe qui a fait retirer la fiche AWS le
  24/09 s'applique ici, en sens inverse : Thomas a travaillé chez Datadog et
  travaille aujourd'hui chez Scaleway. À vérifier avant de s'engager, pas après.
- **Le partenariat serait une première.** NX n'a ni publicité, ni tracking, ni
  relation commerciale. Un cluster partenaire est une catégorie nouvelle : la
  règle de divulgation s'écrit **avant** le premier contenu. Sans ça, c'est la
  crédibilité éditoriale — le seul actif réel du site — qui paie.

### Le projet monitoring vient en quatrième

Un projet d'observabilité suppose une application **en production** à observer,
donc le projet 3. La règle « zéro prérequis externe » impose l'ordre : projet 1
conteneurise, 2 automatise, 3 déploie, **4 observe**. C'est aussi, dans l'ordre,
le fil rouge des deux formations.

## Cluster IA — novembre à décembre 2026

Cadrage complet : [cluster-ia.md](./cluster-ia.md). Nouvelle série `ia` (rayon
« IA » sur `/fiches`), 5 fiches et 2 articles. Angle : l'IA expliquée à
quelqu'un qui sait déjà déployer un conteneur et lire une facture cloud. Prépare
le terrain du cours « Développez des applications IA », qui figure dans les
idées de cours plus haut.

> Cadré le 14 septembre 2026. Trois arbitrages pris à ce moment-là : pas de
> nouveau format « dossier » (un cluster avec une porte d'entrée suffit),
> l'actualité IA de la rentrée va dans Le Récap de septembre et dans le Feed, et
> **rien ne se publie avant que le backlog de septembre-octobre ait ses
> visuels**. Écrire ne coûte rien à la file d'attente, publier si.

| Date        | Type    | Titre                                                   | Status           |
| ----------- | ------- | ------------------------------------------------------- | ---------------- |
| 02/11/2026  | Article | L'IA vue depuis la prod (porte d'entrée)                | brouillon        |
| 09/11/2026  | Fiche   | Qu'est-ce qu'un LLM et comment ça marche ? (pilier)     | brouillon        |
| 16/11/2026  | Fiche   | Tokens, contexte et coût : comment estimer la facture ? | brouillon        |
| 23/11/2026  | Fiche   | Qu'est-ce qu'un agent IA ?                              | brouillon        |
| 30/11/2026  | Fiche   | Qu'est-ce que le protocole MCP ?                        | à écrire         |
| 07/12/2026  | Fiche   | Comment créer un premier agent IA ?                     | à écrire         |
| _à définir_ | Article | Réflexion — angle à trancher                            | réservé à Thomas |

Le 07/12 est le point de friction : c'est la semaine du cours « Mettez vos
applications en production ». Si les deux se marchent dessus, la fiche-pont
glisse en janvier.

## Planning de publication — septembre et octobre 2026

Deux publications par semaine, lundi et mercredi : les deux jours les plus
fréquents des trois derniers mois, et la cadence qui vide le backlog avant
novembre.

> Replanifié le 24/09/2026. Les visuels du backlog sont arrivés ce jour-là, en
> même temps que deux fiches Docker qui remplacent la fiche AWS retirée. Les
> deux fiches cloud prévues les 16 et 23/09 avaient glissé faute de visuel : le
> planning repart du lundi 28/09 et alterne cloud et Docker.
>
> **Étendu à octobre le 24/09/2026.** Le planning s'arrêtait au 14/10 : douze
> contenus sur les quatorze semaines restant avant fin décembre, soit 0,9 par
> semaine pour un objectif de 1 à 3. Les semaines du 19 et du 26/10 étaient
> vides. Quatre créneaux ajoutés, en alternant atelier et fiche pour ne pas
> empiler quatre textes de la même série.

| Date       | Contenu                                         | Cluster | Status / pourquoi à cette place                            |
| ---------- | ----------------------------------------------- | ------- | ---------------------------------------------------------- |
| 07/09/2026 | `github-actions-vs-gitlab-ci`                   | CI/CD   | **DONE**                                                   |
| 09/09/2026 | `optimiser-workflows-github-actions`            | CI/CD   | **DONE**                                                   |
| 14/09/2026 | `premier-jeu-simple-pico-8`                     | gamedev | **DONE**                                                   |
| 15/09/2026 | `l-atelier-presentation`                        | atelier | **DONE**                                                   |
| 21/09/2026 | `top-10-jeux-pico-8`                            | gamedev | **DONE**                                                   |
| 28/09/2026 | `deployer-conteneur-docker-dans-le-cloud`       | cloud   | ferme le dernier lien `/drafts/` de `iaas-paas-saas`       |
| 30/09/2026 | `difference-docker-podman`                      | docker  | remplace la fiche AWS, retirée le 24/09                    |
| 05/10/2026 | `deployer-conteneur-docker-sur-scaleway`        | cloud   | dérouler les commandes contre l'API d'abord                |
| 07/10/2026 | `difference-docker-swarm-kubernetes`            | docker  | suite de la fiche Podman                                   |
| 12/10/2026 | `le-cloud-est-il-vraiment-moins-cher`           | cloud   |                                                            |
| 14/10/2026 | `cloud-souverain`                               | cloud   | ferme le cluster, sept semaines avant le cours             |
| 19/10/2026 | Atelier — comment fonctionne Le Récap ?         | atelier | à écrire ; déjà listé en article bonus, aucune recherche   |
| 21/10/2026 | Fiche — lancer ses tests dans un pipeline       | CI/CD   | à écrire ; le cas d'usage le plus courant, zéro couverture |
| 26/10/2026 | Atelier — le système de news automatisé         | atelier | à écrire ; déjà listé en article bonus                     |
| 28/10/2026 | Fiche — pourquoi mon conteneur ne démarre pas ? | docker  | à écrire ; pilier du mini-cluster débogage, voir plus bas  |

Les dates sont reportées dans le `publishedDate` de chaque brouillon. Le jour de
la publication, il reste à déplacer le fichier, basculer les liens `/drafts/`
qui pointent vers lui et passer la ligne en **DONE**.

Reste hors planning : le récap de septembre, à sortir fin septembre comme les
précédents. Le cluster IA démarre ensuite le 02/11, sans chevauchement.

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
