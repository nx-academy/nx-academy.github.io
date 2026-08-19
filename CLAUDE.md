# NX Academy

Site statique [Astro](https://astro.build/) publié sur https://nx.academy
(GitHub Pages, domaine perso via `CNAME`). On y publie des cours, des fiches
techniques, des articles, un récap mensuel et des quiz.

Trois principes qui guident à peu près toutes les décisions :

- **Tout le contenu publié est en français.** Le `README.md` est la seule
  exception anglaise du dépôt.
- **Le moins de JavaScript possible côté client**, et **pas de framework CSS** :
  du CSS vanilla dans `src/styles/` et `public/styles/`.
- **Privacy-first** : aucun tracking, aucun cookie. L'accessibilité passe avant
  l'effet visuel.

## Commandes

Gestionnaire de paquets : **npm uniquement** (`package-lock.json`, Node 24). Ni
bun ni yarn — bun a été essayé, ça n'a pas marché.

| Commande                  | Effet                                      |
| ------------------------- | ------------------------------------------ |
| `npm run dev`             | Serveur local sur `localhost:4321`         |
| `npm run build`           | `astro check && astro build`               |
| `npm run check`           | `astro check` seul, sans toucher à la base |
| `npm test`                | Vitest                                     |
| `npm run prettier:check`  | Ce que la CI vérifie                       |
| `npm run prettier:format` | À lancer avant de commiter                 |
| `npm run optimize-images` | `raw/` → `public/images/` en `.webp`       |

Quelques précisions utiles :

- La base est lue au build via `TURSO_DATABASE_URL` et `TURSO_AUTH_TOKEN` (voir
  `.example.env`). **Sans ces variables, les lectures retombent sur les fixtures
  de `src/lib/db/fixtures.ts`** : `npm run dev` et `npm run check` restent
  utilisables hors ligne. Si un build distant échoue faute de secrets, le
  signaler plutôt que de contourner.
- Pas d'ESLint dans ce projet. **Prettier est la seule autorité de formatage**,
  et il est bloquant en CI — y compris sur les fichiers `.md`. Config dans
  `.prettierrc` : `printWidth: 80`, `proseWrap: "always"`.

## Où vivent les choses

**Le piège principal : les contenus Markdown sont dans `src/pages/`, pas dans
`src/content/`.** Le routage est basé sur les fichiers, donc :

```
src/pages/articles/<slug>.md              → /articles/<slug>
src/pages/fiches/<slug>.md                → /fiches/<slug>
src/pages/cours/<cours>/chapitres/*.md    → /cours/<cours>/chapitres/<slug>
src/pages/drafts/<slug>.md                → /drafts/<slug>  (exclu du sitemap)
```

**Le nom du fichier est l'URL publique. On ne renomme jamais un contenu déjà
publié** — sitemap, RSS et référencement en dépendent.

Une seule vraie content collection : le changelog, déclaré dans
`src/content.config.ts` et alimenté par `src/content/changelog/AAAA-MM.yaml`.

Le reste :

| Dossier           | Contenu                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------- |
| `src/components/` | Composants `.astro` (+ 3 îlots React)                                                       |
| `src/layouts/`    | `BaseLayout`, `BlogPostLayout`, `CheatSheetsLayout`, `ChapterLayout`, `CourseLandingLayout` |
| `src/data/`       | Données statiques en TS : `series.ts`, `quiz.ts`, `news.ts`…                                |
| `src/types/`      | Types des frontmatters et des données                                                       |
| `src/utils/`      | Logique métier, un dossier par util, test colocalisé                                        |
| `src/lib/db/`     | Accès Turso : miroir du schéma, requêtes et fixtures de repli                               |
| `raw/`            | Images sources, avant optimisation                                                          |
| `docs/`           | Notes éditoriales et techniques, en français                                                |

## Conventions de code

- **React seulement pour les îlots interactifs** (`Quiz.jsx`, `QuizArcade.jsx`,
  `ResumeSnackbar.jsx`). Tout le reste est en `.astro`. TypeScript strict.
- **La logique va dans `src/utils/<nom>/index.ts`**, avec son test colocalisé
  `index.test.ts` (vitest, `describe`/`it`/`expect` importés explicitement). Les
  composants affichent, ils ne calculent pas — `src/utils/changelog/index.ts`
  est le modèle à suivre.
- **Images** : déposer la source dans `raw/<catégorie>/`, lancer
  `npm run optimize-images`, puis référencer `/images/<catégorie>/<nom>.webp`.
- **Ne jamais lier un brouillon via son URL finale.** Un brouillon vit à
  `/drafts/<slug>` ; un lien vers `/fiches/<slug>` donnerait un 404 en
  production.

### Base de données

**Le schéma appartient à `nx-mcp`**, seul dépôt qui écrit dans Turso. Ses
migrations versionnées vivent dans `nx_ai/turso_service/migrations/` et
s'appliquent avec `python app.py turso migrate`.

Ici, on ne fait que lire. `src/lib/db/schema.ts` est **un miroir écrit à la
main**, à mettre à jour après chaque migration appliquée là-bas — jamais
l'inverse. Ne pousser aucun DDL depuis ce dépôt, et ne pas ajouter
`drizzle-kit`. Deux outils qui poussent du schéma sur la même base finissent par
diverger.

Les deux seules lectures du site passent par `src/lib/db/queries.ts`, qui
retombe sur les fixtures quand la base n'est pas configurée.

Une brève du Feed a deux blocs de texte depuis août 2026 : `context`, le résumé
factuel de la source, et `lecture`, le commentaire. `lecture` à `null` signifie
« entrée de l'ancien format » — c'est une information, pas un trou à combler. La
colonne historique `content` existe encore le temps que les deux dépôts aient
basculé. Passer par `src/utils/news/` plutôt que de lire ces champs en direct.

### Frontmatter

Les frontmatters ne sont pas validés par un schéma Zod (sauf le changelog) : ils
sont typés à la main dans `src/types/`. La date s'écrit au format
**`MM/DD/YYYY`**.

Une fiche technique :

```yaml
layout: ../../layouts/CheatSheetsLayout.astro
title: "Comment gérer les secrets dans GitHub Actions ?"
description: "…"
imgAlt: "…"
imgSrc: /images/cheatsheets/<slug>.webp
author: Thomas Dimnet
kind: Fiche technique
serie: cicd
level: Intermédiaire
publishedDate: 08/03/2026
```

Un article : `layout: ../../layouts/BlogPostLayout.astro`, `kind: Articles`,
`format` (`recap`, `reflexion` ou `bilan`), `tags`, `draft`.

Un chapitre de cours : `layout: ../../../../layouts/ChapterLayout.astro`,
`chapterNumber`, `sectionNumber`, `sectionTitle`, `id`, et les liens
`nextChapterLink` / `previousChapterLink` (le slug seul, pas l'URL complète).

Le champ `serie` doit être **une clé existante de `src/data/series.ts`** :
`docker`, `gamedev`, `cicd`, `cloud`, `js`, `css`, `outils`. L'ordre des clés
dans ce fichier détermine l'ordre d'affichage des rayons sur `/fiches`.

## Rédaction

Les règles d'écriture vivent dans les skills du dépôt, pas ici :

- **`.claude/skills/typo-francaise`** — typographie française et registre
  carnet. S'applique par défaut à tout texte destiné au site.
- **`.claude/skills/typo-anglaise`** — uniquement pour les supports anglophones.
  Ne pas l'appliquer au contenu du site.
- **`.claude/skills/changelog`** — proposer une entrée de changelog au moment de
  préparer une PR. Toujours **proposer avant d'écrire** : Thomas valide.

## Git et pull requests

- **Tout passe par une PR vers `main`**, squash-mergée. Jamais de commit direct
  sur `main`.
- Messages de commit : une phrase en français, à l'impératif ou à l'infinitif.
  Par exemple `Publie la fiche « Comment gérer les secrets… »` ou
  `Migrer le changelog vers une data collection YAML`. Le `(#NNN)` visible dans
  l'historique est ajouté par le squash-merge — ne pas l'écrire à la main.
- Checklist de PR (`.github/pull_request_template.md`) : changelog mis à jour,
  et issues liées avec `Closes #NNN`.
- La CI de PR enchaîne `npm ci` → `prettier:check` → `npm test` →
  `npm run build`. Donc **lancer `npm run prettier:format` et `npm test` avant
  de pousser** : le plus souvent, une CI rouge, c'est juste du formatage.
- Un merge sur `main` déclenche le déploiement GitHub Pages
  (`.github/workflows/deploy.yml`).

## À propos de ce fichier

Ce `CLAUDE.md` est lu automatiquement au début de chaque session Claude Code :
il sert de mémoire du projet. Pour y ajouter une règle en cours de route, il
suffit d'envoyer un message commençant par `#`.

Le garder court et factuel. S'il devient long, c'est le signe que le contenu a
plutôt sa place dans un skill (`.claude/skills/`), chargé seulement quand il est
utile.
