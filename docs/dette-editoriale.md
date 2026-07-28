# Dette éditoriale à traiter

> Constats relevés en cadrant le
> [cluster Cloud public](./cluster-cloud-public.md). Deux chantiers courts, à
> traiter **avant** d'ouvrir la thématique cloud : le cluster cloud va s'appuyer
> sur le maillage CI/CD et sur le moteur de recommandations, or les deux sont
> aujourd'hui abîmés.

## 1. Liens internes cassés vers des fiches restées en brouillon

**Priorité : haute.** Ce sont des 404 en production, sur des fiches publiées et
indexées.

Quatre liens en dur pointent vers trois slugs qui vivent encore dans
`src/pages/drafts/`. Les brouillons sont routés en `/drafts/<slug>` (exclus du
sitemap par `astro.config.ts`), donc les URLs `/fiches/<slug>` citées n'existent
pas.

| Fichier source                                             | Ligne    | Lien mort                              |
| ---------------------------------------------------------- | -------- | -------------------------------------- |
| `src/pages/fiches/declencher-workflow-github-actions.md`   | 356      | `/fiches/github-actions-vs-gitlab-ci`  |
| `src/pages/fiches/deployer-image-docker-github-actions.md` | 84 · 267 | `/fiches/gerer-secrets-github-actions` |
| `src/pages/fiches/decouvrir-docker-swarm.md`               | 231      | `/fiches/bien-gerer-secrets-docker/`   |

Cinq fiches attendent dans `src/pages/drafts/` (les trois ci-dessus, plus
`optimiser-workflows-github-actions` et `reutiliser-workflow-github-actions`,
qui ne sont cités nulle part). Elles sont rédigées, front matter complet. Le
[calendrier](./calendrier-editorial.md) marque d'ailleurs « Comment optimiser
vos workflows GitHub Actions ? » comme **DONE** alors que la fiche n'est pas
publiée.

**Ce qu'il manque pour les publier : les visuels, essentiellement.** Toutes
pointent vers un `imgSrc` dans `/images/cheatsheets/`, mais seul
`bien-gerer-secrets-docker` a le sien (`secrets-docker.webp`). Les quatre autres
référencent un `<slug>.webp` qui n'existe pas : il faut produire le visuel pixel
art, le déposer en `raw/cheatsheets/<slug>.png` et lancer
`npm run optimize-images`.

Plus, pour chacune : vérifier `serie: cicd` (indispensable pour le rayon CI/CD),
rafraîchir `publishedDate`, `git mv` vers `src/pages/fiches/`.

**Deux issues possibles**, la première étant nettement préférable :

1. **Publier** les brouillons (le contenu est écrit, il ne manque que les
   visuels et un passage de relecture) — ça ferme les 404 et ça termine le
   cluster CI/CD cadré dans
   [`cluster-cicd-github-actions.md`](./cluster-cicd-github-actions.md).
2. À défaut, **retirer les quatre liens** des fiches publiées, en attendant.

Ne rien faire est la seule option à écarter : les trois fiches concernées sont
parmi les plus visitées du site.

## 2. Tags absents sur la majorité des fiches

**Priorité : moyenne.** Pas de casse visible, mais le bloc « À lire ensuite »
tourne au ralenti.

`src/utils/relatedContent/` score les contenus liés avec `serie` = +3 et chaque
`tag` partagé = +1. Sans tags, seule la série joue : à l'intérieur d'un rayon,
le classement retombe sur l'ordre chronologique, et le rapprochement entre deux
séries (Docker ↔ CI/CD ↔ Cloud) ne peut pas se faire du tout.

État actuel des 18 fiches publiées :

- **6 taguées** : `bien-faire-multi-stage-build`, `bien-gerer-reseaux-docker`,
  `decouvrir-docker-swarm`, `difference-docker-compose-swarm`,
  `optimisation-images-docker`, `presentation-registry-docker` ;
- **1 avec un `tags:` vide** : `deployer-image-docker-github-actions` ;
- **11 sans le champ** : les deux autres fiches CI/CD, les trois fiches
  JavaScript, la fiche CSS, les deux fiches game dev, les deux fiches outils, et
  `bien-utiliser-volumes-docker`.

Le vocabulaire employé aujourd'hui est mince et implicite : `Production` (×3),
`Image` (×3), `Orchestration` (×2), `Réseau`, `Registry`, `Compose`. Il tient
debout à l'intérieur du rayon Docker, pas au-delà.

**Ce qu'il faut faire**, dans cet ordre :

1. Arrêter un vocabulaire de tags avant de le généraliser — sinon on aura autant
   de tags que de fiches et le poids de +1 ne voudra plus rien dire. Piste : des
   tags transverses (`Production`, `Sécurité`, `Performance`, `Débutant`) en
   plus des tags d'outil (`Docker`, `GitHub Actions`, `Cloud`).
2. Compléter les 12 fiches concernées, en commençant par les clusters Docker et
   CI/CD, ceux sur lesquels le cluster cloud viendra s'accrocher.

## Vu au passage

Moins urgent, noté pour ne pas le reperdre : `quizUrl` de la landing du cours
CI/CD (`src/pages/cours/ci-cd-github-actions/index.astro`, ligne 80) pointe vers
`/quiz/quiz-niveau-docker`, le quiz de niveau Docker. Il n'existe pas encore de
quiz de niveau CI/CD dans `src/data/quiz.ts` — d'où le repli, probablement
volontaire. À reprendre quand le cluster CI/CD sera complet.

## Vérification, une fois traité

- Plus aucun lien `/fiches/<slug>` ne pointe vers un fichier de
  `src/pages/drafts/`.
- Les cinq fiches apparaissent dans le rayon **CI/CD** de `/fiches/`.
- Le bloc « À lire ensuite » d'une fiche Docker propose au moins une fiche
  CI/CD, et inversement.
- `npm run build` et `npm run prettier:check` passent.
