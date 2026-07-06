# Cluster de fiches CI/CD & GitHub Actions

> Cadrage éditorial (pré-rédaction). Objectif : étoffer la thématique CI/CD pour
> renforcer le SEO, en reproduisant la recette qui fonctionne déjà pour Docker.

## Le constat

- **Docker = un vrai cluster** : 6 fiches publiées (`serie: docker`) qui se
  citent en chaîne, plus un cours. Maillage interne solide → bon référencement.
- **CI/CD = très mince** : 1 cours (`ci-cd-github-actions`) + **1 seule fiche
  publiée** (`declencher-workflow-github-actions`, `serie: cicd`) + 1 draft
  jamais publié (`artefact-github-actions`). **Aucune fiche CI/CD ne pointe vers
  une autre fiche CI/CD** → maillage inexistant, alors que c'est précisément ce
  qui fait marcher le SEO Docker.

Le [calendrier éditorial](./calendrier-editorial.md) a déjà anticipé plusieurs
de ces sujets (« Déployer une image Docker depuis GitHub Actions », « Optimiser
vos workflows GitHub Actions », et dans les idées : « GitHub Actions vs GitLab
CI »).

## Le cluster (6 contenus)

Convention : une fiche = un `.md` plat dans `src/pages/fiches/<slug>.md`, front
matter `layout`, `title`, `description`, `imgAlt`, `imgSrc`, `author`,
`kind: Fiche technique`, **`serie: cicd`**, `level`, `publishedDate`
(JJ/MM/AAAA). Le champ `serie: cicd` est **indispensable** pour apparaître dans
le rayon CI/CD de `/fiches/` (`src/data/series.ts`) et alimenter le bloc « À
lire ensuite » (`src/utils/relatedContent/`, poids `serie` = +3, `tag` partagé =
+1).

| #   | Slug                                         | Titre                                                     | serie | level         | Rôle                        |
| --- | -------------------------------------------- | --------------------------------------------------------- | ----- | ------------- | --------------------------- |
| 1   | `github-actions-vs-gitlab-ci`                | GitHub Actions vs GitLab CI : quelles différences ?       | cicd  | Débutant      | Porte d'entrée / comparatif |
| 2   | `deployer-image-docker-github-actions`       | Comment déployer une image Docker depuis GitHub Actions ? | cicd  | Intermédiaire | **Pont Docker ↔ CI/CD**    |
| 3   | `gerer-secrets-github-actions`               | Comment gérer les secrets dans GitHub Actions ?           | cicd  | Intermédiaire | Sécurité                    |
| 4   | `optimiser-workflows-github-actions`         | Comment optimiser vos workflows GitHub Actions ?          | cicd  | Intermédiaire | Perf / cache / matrix       |
| 5   | `reutiliser-workflow-github-actions`         | Comment réutiliser un workflow GitHub Actions ?           | cicd  | Avancé        | Queue de cluster (avancé)   |
| —   | `artefact-github-actions` _(draft existant)_ | Qu'est-ce qu'un artefact GitHub Actions ?                 | cicd  | Débutant      | **À publier** (déjà rédigé) |

### Détail des angles

1. **`github-actions-vs-gitlab-ci`** — Angle retenu : _comparatif + quand
   choisir_. Tableau des différences (syntaxe `.github/workflows` vs
   `.gitlab-ci.yml`, runners hébergés/self-hosted, stages/jobs, tarification,
   écosystème/marketplace, intégration Git), puis une section « lequel choisir
   selon ton contexte » (déjà sur GitHub / mono-plateforme GitLab / besoin
   self-hosted). Miroir structurel de `difference-docker-compose-swarm.md`.

2. **`deployer-image-docker-github-actions`** — La fiche-pont : cycle build
   image → `docker login` → push vers un registry (GHCR / Docker Hub) →
   déploiement, via `docker/build-push-action`. C'est le contenu qui relie les
   deux clusters. Se lie aux fiches Docker `presentation-registry-docker`,
   `optimisation-images-docker`, `bien-faire-multi-stage-build` et au cours
   CI/CD. (Déjà « en cours » au calendrier.)

3. **`gerer-secrets-github-actions`** — Secrets de repo/organisation, `secrets`
   context, Environments et protections, OIDC pour éviter les secrets
   long-lived, pièges (pas de secret dans les logs / `pull_request` depuis un
   fork). Miroir CI/CD du draft Docker `bien-gerer-secrets-docker`.

4. **`optimiser-workflows-github-actions`** — `actions/cache`, cache intégré des
   `setup-*`, `strategy.matrix`, `concurrency` + annulation, jobs conditionnels
   (`if`, `paths`), `timeout-minutes`. (Déjà prévu décembre au calendrier.) Écho
   naturel de la fiche Docker `optimisation-images-docker`.

5. **`reutiliser-workflow-github-actions`** — Reusable workflows
   (`workflow_call`), composite actions, `inputs`/`secrets`/`outputs`, DRY entre
   repos. Sujet avancé, queue de cluster.

## Maillage interne à mettre en place (le cœur de la valeur SEO)

Reproduire ce que fait Docker : chaque fiche cite explicitement 1–2 autres
fiches du cluster + le cours, en dur dans le corps Markdown (comme
`bien-gerer-reseaux-docker` → `difference-docker-compose-swarm`). Chaîne
narrative suggérée :

```
declencher-workflow (existante)
        │
        ├─► artefact-github-actions ──► deployer-image-docker-github-actions
        │                                        │
github-actions-vs-gitlab-ci (entrée)             ├─► gerer-secrets-github-actions
        │                                        │
        └─────────────► optimiser-workflows ─────┘
                                │
                                └─► reutiliser-workflow (avancé)
```

- Rétro-lier depuis la fiche existante `declencher-workflow-github-actions.md`
  vers les nouvelles (aujourd'hui isolée).
- `deployer-image-docker-github-actions` pointe vers les fiches Docker
  (registry, multi-stage) → jonction des deux clusters.

## Incohérences repérées (à corriger en passant)

Petits bugs de données qui pénalisent le cluster existant :

- `src/pages/fiches/bien-gerer-reseaux-docker.md` : champ `serie` **absent** →
  n'apparaît pas dans le rayon Docker.
- `src/data/quiz.ts` : le quiz `declencher-workflow-github-actions` est taggé
  `topic: "Docker"` au lieu de `"CI/CD"`.
- `src/pages/cours/ci-cd-github-actions/index.astro` : `quizUrl` pointe vers
  `/quiz/quiz-niveau-docker` (quiz Docker) — à vérifier/corriger.
- Filtre fragile des landing pages (`title.includes("GitHub")`) : vérifier que
  les titres retenus contiennent bien « GitHub Actions » pour remonter sur la
  landing du cours.

## Draft `artefact-github-actions` — verdict de relecture

**Publiable en l'état, retouches légères :**

- Ajouter `serie: cicd` au front matter (absent) + rafraîchir `publishedDate`.
- Déplacer le fichier de `src/pages/drafts/` vers `src/pages/fiches/`.
- Ajouter le maillage interne (fiche déclencheurs + fiche déploiement image
  Docker).
- Coquilles : « recommander » → recommandé, « cotas » → quotas, « raccourir » →
  raccourcir, « déploye » → déploie, « Allé » → Allez.
- Le corps invite à « tester vos connaissances avec le quiz » : soit créer le
  quiz `public/quiz/artefact-github-actions.json`, soit adapter le CTA.

## Fichiers concernés (au moment de la rédaction)

- **Créés** : 5 fiches `src/pages/fiches/<slug>.md`.
- **Déplacé/édité** : `src/pages/drafts/artefact-github-actions.md` →
  `src/pages/fiches/artefact-github-actions.md`.
- **Édité** : `src/pages/fiches/declencher-workflow-github-actions.md`
  (rétro-liens).
- **Images** : une par fiche, source `raw/cheatsheets/<nom>.png` → générée en
  `public/images/cheatsheets/<nom>.webp` via `npm run optimize-images`,
  référencée `imgSrc: /images/cheatsheets/<nom>.webp`.
- **Corrections données** : `src/data/quiz.ts`,
  `src/pages/fiches/bien-gerer-reseaux-docker.md`,
  `src/pages/cours/ci-cd-github-actions/index.astro`.
- **Calendrier** : mettre à jour `docs/calendrier-editorial.md`.

## Vérification (au moment de la rédaction)

- `npm run build` (= `astro check && astro build --remote`) passe sans erreur.
- Chaque nouvelle fiche apparaît dans le rayon **CI/CD** de `/fiches/`.
- Le bloc « À lire ensuite » de chaque fiche affiche bien d'autres fiches CI/CD.
- Liens internes en dur valides (pas de 404 vers slugs inexistants).
- Ton NX (tutoiement / « on »), exemples de code testables.

## Séquençage suggéré

1. Publier le draft `artefact-github-actions` (quick win, déjà écrit).
2. `github-actions-vs-gitlab-ci` (porte d'entrée SEO).
3. `deployer-image-docker-github-actions` (pont, fort maillage).
4. `gerer-secrets-github-actions` + `optimiser-workflows-github-actions`.
5. `reutiliser-workflow-github-actions` (avancé, dernier).
6. Poser le maillage croisé + corriger les incohérences de données. </content>
