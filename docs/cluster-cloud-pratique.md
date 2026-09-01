# Cluster « Cloud public » — le volet pratique

> Cadrage éditorial (pré-rédaction). Extension du
> [cluster Cloud public](./cluster-cloud-public.md) : deux fiches de mise en
> pratique adossées à la fiche-pont, un fournisseur chacune.

## Le constat

La fiche-pont `deployer-conteneur-docker-dans-le-cloud` (contenu n° 4 du
cluster) déroule six étapes et **ne nomme aucun fournisseur dans son corps**.
C'est délibéré, et c'est écrit dans la fiche : « les noms changent d'un service
à l'autre, les six étapes, non ». Elle ne contient pas non plus une seule ligne
de code.

Elle dit donc très bien _quoi_ faire. Elle ne montre jamais _comment_.

Or, sur les 23 fiches du site, **aucune ne traite d'un déploiement chez un
fournisseur cloud**. Le seul contenu « déploiement » de la série Docker est
`decouvrir-docker-swarm`, qui est de l'auto-hébergé. Fargate n'apparaît qu'une
fois dans tout le dépôt, en lien de bas de chapitre. « Serverless Containers »
zéro fois.

Le [calendrier](./calendrier-editorial.md) prévoit par ailleurs le cours
« Mettez vos applications en production » en décembre. Ces deux fiches lui
préparent le terrain exactement comme le cluster cloud a préparé celui-ci.

## Le principe : un triptyque à plan parallèle

Les deux fiches reprennent **les six étapes de la fiche-pont, dans le même
ordre, sous les mêmes titres**. C'est la contrainte structurante du chantier :

```
deployer-conteneur-docker-dans-le-cloud   (le quoi, agnostique, 0 ligne de code)
                 │
     ┌───────────┴───────────┐
     ▼                       ▼
   sur-scaleway            sur-aws
   (le comment, CLI)       (le comment, CLI)
```

Le lecteur peut lire les trois d'affilée, ou ouvrir deux onglets et comparer
étape par étape. Et c'est cette symétrie qui rend l'écart lisible : **l'étape 3
tient en deux commandes chez Scaleway, elle se déplie en cluster + définition de
tâche + service + deux rôles IAM chez AWS**. Ce n'est pas un jugement, c'est le
résultat qu'on obtient en posant la même question aux deux plateformes.

## Les deux contenus

Convention de frontmatter : identique à celle du cluster (voir
[`cluster-cloud-public.md`](./cluster-cloud-public.md)), avec **`serie: cloud`**
— indispensable pour le rayon « Cloud public » de `/fiches/`.

| #   | Slug                                     | Titre                                                        | level         | publishedDate |
| --- | ---------------------------------------- | ------------------------------------------------------------ | ------------- | ------------- |
| 7   | `deployer-conteneur-docker-sur-scaleway` | Comment déployer un conteneur Docker sur Scaleway ?          | Intermédiaire | 11/18/2026    |
| 8   | `deployer-conteneur-docker-sur-aws`      | Comment déployer un conteneur Docker sur AWS (ECS Fargate) ? | Avancé        | 12/02/2026    |

**Tags : `Cloud`, `Docker`, `Production` sur les deux.** Volontairement les
mêmes que la fiche-pont, et **pas de tag `Scaleway` ni `AWS`** :
[`dette-editoriale.md`](./dette-editoriale.md) §2 alerte sur la prolifération de
tags qui vide le poids `+1` de son sens, et des tags partagés maximisent le
score de `src/utils/relatedContent/` entre les trois fiches du triptyque
(`serie` = +3, chaque `tag` partagé = +1).

### Le plan commun, étape par étape

| Étape de la fiche-pont | Scaleway (Serverless Containers)                                                  | AWS (ECS sur Fargate)                                                                      |
| ---------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| 1 · Publier l'image    | Container Registry : créer le namespace, `docker login rg.fr-par.scw.cloud`, push | ECR : créer le dépôt, `get-login-password \| docker login`, push                           |
| 2 · Autoriser          | Registry et conteneur dans le même projet ⇒ **lecture implicite, rien à faire**   | **Deux rôles IAM** : execution role (pull ECR + journaux) et task role (droits de l'appli) |
| 3 · Créer le service   | Un namespace de conteneurs, puis le conteneur : image, port, CPU, mémoire         | Cluster, puis définition de tâche (JSON), puis service (sous-réseaux, groupe de sécurité)  |
| 4 · Variables          | `environment-variables` en clair vs `secret-environment-variables`                | `environment` en clair vs `secrets` + `valueFrom` (Secrets Manager / Parameter Store)      |
| 5 · Healthcheck        | Le health check HTTP de la configuration du conteneur                             | **Deux healthchecks** : celui de la définition de tâche, celui du groupe cible de l'ALB    |
| 6 · Mise à l'échelle   | `min-scale` / `max-scale`, **le zéro est possible** (démarrage à froid)           | `desiredCount` + Application Auto Scaling, **pas de zéro sur Fargate**                     |
| Astuce bonus           | Le même parcours dans la console (emplacement du screencast)                      | « Et App Runner ? » — l'équivalent direct de la fiche Scaleway, en une commande            |

Les deux points de contraste — l'autorisation à l'étape 2, la mise à l'échelle à
zéro à l'étape 6 — sont **la charge utile éditoriale du découpage en deux
fiches**. Une fiche comparative unique les aurait dilués dans un tableau.

### Pourquoi ECS et pas App Runner comme sujet principal

App Runner est le pair direct de Serverless Containers : une image, une URL, la
mise à l'échelle gérée. Il aurait donné une fiche parfaitement symétrique de
celle de Scaleway.

Mais l'intention de recherche derrière « déployer Docker sur AWS », et ce que
les équipes exploitent réellement, c'est ECS sur Fargate. Une fiche App Runner
seule raterait les deux. **ECS porte donc la fiche, et App Runner ferme en
astuce bonus** — ce qui a l'avantage secondaire de montrer qu'AWS a aussi le
chemin court, sans le faire passer pour le chemin normal.

## Maillage interne

À poser en dur dans le corps Markdown, en plus du scoring automatique :

- **Depuis la fiche-pont** → les deux fiches pratiques, annoncées en conclusion.
- **Depuis chaque fiche pratique** → la fiche-pont (le _quoi_, en intro),
  l'autre fiche pratique (en astuce bonus ou conclusion), plus les rappels
  habituels vers `/fiches/presentation-registry-docker`,
  `/fiches/deployer-image-docker-github-actions` et
  `/cours/ci-cd-github-actions/`.

⚠️ Tant que ces contenus sont dans `src/pages/drafts/`, **tous ces liens
s'écrivent `/drafts/<slug>`**. Un lien `/fiches/<slug>` vers un brouillon est un
404 en production : c'est le chantier n° 1 de
[`dette-editoriale.md`](./dette-editoriale.md), on ne le rouvre pas.

## Réserves à lever avant publication

Deux points identifiés au cadrage, à traiter à la relecture :

1. **Les commandes n'ont pas été exécutées.** Elles sont écrites d'après les
   documentations officielles de Scaleway et d'AWS et vérifiées pour leur
   cohérence interne, mais aucune n'a tourné contre une vraie API — la session
   de rédaction n'avait ni compte ni identifiants. C'est un écart assumé avec la
   promesse « exemples testables » du cadrage du cluster : **dérouler les deux
   parcours une fois, de bout en bout, avant de sortir les fiches de
   `drafts/`.** Les tarifs, eux, sont volontairement absents : ils bougent, et
   l'article `le-cloud-est-il-vraiment-moins-cher` est là pour ça.
2. **Conflit d'intérêts sur la fiche Scaleway.** Thomas travaille chez Scaleway
   (`src/pages/a-propos.astro`). Une ligne de transparence est proposée dans
   l'intro de la fiche ; à garder ou à retirer, mais à décider explicitement.

## Chantier connexe, volontairement hors périmètre

**Le screencast.** L'idée est de montrer le même parcours dans la console. Rien
ne permet de le faire proprement aujourd'hui :

- il n'existe aucun composant `Screencast.astro` — les cours écrivent
  l'`<iframe>` Vimeo à la main, une trentaine de fois, avec plusieurs attributs
  `title` copiés-collés jamais mis à jour ;
- `src/styles/article-content.css`, la feuille chargée par `CheatSheetsLayout`
  et `BlogPostLayout`, **n'a aucune règle `iframe`**. La seule vit dans
  `ChapterLayout.astro`. Une vidéo dans une fiche sortirait donc non stylée.

Les deux fiches marquent seulement l'emplacement en commentaire HTML. Le
composant partagé (et la question du chargement au clic, pour tenir le principe
privacy-first sur une page publique indexée) est un chantier séparé.

## Fichiers concernés

- **Créés** : `src/pages/drafts/deployer-conteneur-docker-sur-scaleway.md`,
  `src/pages/drafts/deployer-conteneur-docker-sur-aws.md`, ce document.
- **Édités** : `src/pages/drafts/deployer-conteneur-docker-dans-le-cloud.md`
  (annonce des deux suites),
  [`cluster-cloud-public.md`](./cluster-cloud-public.md) (le cluster passe à 8
  contenus), [`calendrier-editorial.md`](./calendrier-editorial.md),
  `src/data/series.ts` (le blurb `cloud` disait « avant d'y déployer »).
- **Images manquantes** : `raw/cheatsheets/<slug>.png` pour les deux fiches,
  puis `npm run optimize-images`. Comme les quatre autres brouillons du cluster.
- **Changelog** : à proposer au moment de la PR, pas d'office.

## Vérification

- `npm run prettier:format` puis `npm run prettier:check` (bloquant en CI, `.md`
  compris).
- `npm test` et `npm run build` — les lectures Turso retombent sur les fixtures,
  tout marche hors ligne.
- `npm run dev`, puis les trois pages du triptyque : le sommaire `StickyOutline`
  ne remonte que les `h2`, les six étapes doivent y apparaître dans le même
  ordre sur les trois.
- `grep -rn "/drafts/" src/pages/fiches src/pages/articles` — doit rester vide.
- Relecture au skill `typo-francaise` : vouvoiement, « on » pour la démarche,
  « je » pour l'avis, insécables, guillemets « … », tiret cadratin.
