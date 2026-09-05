# Dette éditoriale à traiter

> Constats relevés en cadrant le
> [cluster Cloud public](./cluster-cloud-public.md). Deux chantiers courts, à
> traiter **avant** d'ouvrir la thématique cloud : le cluster cloud va s'appuyer
> sur le maillage CI/CD et sur le moteur de recommandations, or les deux sont
> aujourd'hui abîmés.

## 1. Liens internes cassés vers des fiches restées en brouillon

**Priorité : haute.** Ce sont des 404 en production, sur des fiches publiées et
indexées.

Les brouillons sont routés en `/drafts/<slug>` (exclus du sitemap par
`astro.config.ts`), donc les URLs `/fiches/<slug>` citées n'existent pas.

| Fichier source                                             | Ligne    | Lien mort                                    | État            |
| ---------------------------------------------------------- | -------- | -------------------------------------------- | --------------- |
| `src/pages/fiches/declencher-workflow-github-actions.md`   | 356      | `/fiches/github-actions-vs-gitlab-ci`        | **ouvert**      |
| `src/pages/fiches/reutiliser-workflow-github-actions.md`   | 206      | `/fiches/optimiser-workflows-github-actions` | **ouvert**      |
| `src/pages/fiches/deployer-image-docker-github-actions.md` | 84 · 267 | `/fiches/gerer-secrets-github-actions`       | fermé (08/2026) |
| `src/pages/fiches/decouvrir-docker-swarm.md`               | 231      | `/fiches/bien-gerer-secrets-docker/`         | fermé (07/2026) |

Il reste donc **deux 404** de ce type. Le second est neuf : publier
`reutiliser-workflow-github-actions` en août a mis en ligne un lien vers
`optimiser-workflows-github-actions`, resté brouillon. C'est exactement le
mécanisme que ce chantier décrit, et il s'est reproduit — d'où l'intérêt de
sortir les deux brouillons en premier, ce que fait le planning de
[calendrier-editorial.md](./calendrier-editorial.md) (07/09 et 09/09/2026).

Deux fiches attendent encore dans `src/pages/drafts/` :
`github-actions-vs-gitlab-ci` et `optimiser-workflows-github-actions`. Elles
sont rédigées, front matter complet. Le [calendrier](./calendrier-editorial.md)
marquait « Comment optimiser vos workflows GitHub Actions ? » comme **DONE**
alors que la fiche n'est pas publiée — corrigé le 5 septembre 2026.

Trois liens `/drafts/` figurent par ailleurs dans des contenus publiés
(`prendre-en-main-pico-8`, `pico-8-ou-pygame`, `decouvrir-pico-8`, tous vers
`premier-jeu-simple-pico-8`). Ce ne sont pas des 404, mais ils envoient le
lecteur hors sitemap : à basculer le jour où le brouillon sort (14/09/2026).

**Ce qu'il manque pour les publier : les visuels, essentiellement.** Toutes
pointent vers un `imgSrc` dans `/images/cheatsheets/`, mais le `<slug>.webp`
correspondant n'existe pas — c'est vrai des **dix** brouillons du dépôt, pas
seulement de ceux-ci, et c'est le vrai goulot du calendrier : il faut produire
le visuel pixel art, le déposer en `raw/cheatsheets/<slug>.png` et lancer
`npm run optimize-images`.

Plus, pour chacune : vérifier `serie: cicd` (indispensable pour le rayon CI/CD),
rafraîchir `publishedDate`, `git mv` vers `src/pages/fiches/`.

**Deux issues possibles**, la première étant nettement préférable :

1. **Publier** les brouillons (le contenu est écrit, il ne manque que les
   visuels et un passage de relecture) — ça ferme les 404 et ça termine le
   cluster CI/CD cadré dans
   [`cluster-cicd-github-actions.md`](./cluster-cicd-github-actions.md).
2. À défaut, **retirer les deux liens** des fiches publiées, en attendant.

Ne rien faire est la seule option à écarter : les fiches concernées sont parmi
les plus visitées du site.

## 2. Tags absents sur la majorité des fiches

**Priorité : moyenne.** Pas de casse visible, mais le bloc « À lire ensuite »
tourne au ralenti.

`src/utils/relatedContent/` score les contenus liés avec `serie` = +3 et chaque
`tag` partagé = +1. Sans tags, seule la série joue : à l'intérieur d'un rayon,
le classement retombe sur l'ordre chronologique, et le rapprochement entre deux
séries (Docker ↔ CI/CD ↔ Cloud) ne peut pas se faire du tout.

État actuel des 24 fiches publiées, recompté le 5 septembre 2026 :

- **11 taguées** : les six fiches Docker (`bien-faire-multi-stage-build`,
  `bien-gerer-reseaux-docker`, `bien-gerer-secrets-docker`,
  `difference-docker-compose-swarm`, `optimisation-images-docker`,
  `presentation-registry-docker`), `decouvrir-docker-swarm`, les trois fiches
  cloud et `deployer-image-docker-github-actions` ;
- **13 sans le champ** : les quatre autres fiches CI/CD
  (`artefact-github-actions`, `declencher-workflow-github-actions`,
  `gerer-secrets-github-actions`, `reutiliser-workflow-github-actions`), les
  trois fiches JavaScript, la fiche CSS, les trois fiches game dev, la fiche
  outils et `bien-utiliser-volumes-docker`.

Le vocabulaire s'est un peu étoffé depuis le constat initial : `Production`
(×8), `Cloud` (×5), `Image` (×4), `Orchestration` (×2), `Sécurité`, `Réseau`,
`Registry`, `Compose`. Le tronc transverse (`Production`, `Cloud`) tient
maintenant debout entre les rayons ; **c'est le rayon CI/CD qui reste
entièrement hors du jeu**, alors que c'est lui qui doit relier Docker et Cloud.
Le taguer est devenu la priorité de ce chantier.

**Ce qu'il faut faire**, dans cet ordre :

1. Arrêter un vocabulaire de tags avant de le généraliser — sinon on aura autant
   de tags que de fiches et le poids de +1 ne voudra plus rien dire. Piste : des
   tags transverses (`Production`, `Sécurité`, `Performance`, `Débutant`) en
   plus des tags d'outil (`Docker`, `GitHub Actions`, `Cloud`).
2. Compléter les 13 fiches concernées, **en commençant par les quatre fiches
   CI/CD** : le cluster Docker et le cluster Cloud sont désormais tagués, c'est
   le maillon CI/CD entre les deux qui manque.

## Vu au passage

Moins urgent, noté pour ne pas le reperdre : `quizUrl` de la landing du cours
CI/CD (`src/pages/cours/ci-cd-github-actions/index.astro`, ligne 80) pointe vers
`/quiz/quiz-niveau-docker`, le quiz de niveau Docker. Il n'existe pas encore de
quiz de niveau CI/CD dans `src/data/quiz.ts` — d'où le repli, probablement
volontaire. À reprendre quand le cluster CI/CD sera complet.

## Vérification, une fois traité

- Plus aucun lien `/fiches/<slug>` ne pointe vers un fichier de
  `src/pages/drafts/`.
- Les sept fiches apparaissent dans le rayon **CI/CD** de `/fiches/`.
- Le bloc « À lire ensuite » d'une fiche Docker propose au moins une fiche
  CI/CD, et inversement.
- `npm run build` et `npm run prettier:check` passent.
