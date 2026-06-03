# Prochaines fonctionnalités — NX Academy

> Audit & feuille de route des fonctionnalités à venir. À implémenter dans une
> prochaine session. Stack : Astro 6 + TypeScript + React, CSS vanilla, GitHub
> Pages → nx.academy, « privacy-first » (aucun tracking/cookie).

## Contexte

L'audit a identifié des lacunes utiles : pas de recherche, pas de tags/filtrage,
peu de confort de lecture, et un chargement de contenu fragile via
`import.meta.glob()` (markdown rangé directement dans `src/pages/`). Le site est
aussi 100 % français.

5 chantiers retenus, dans cet ordre logique : **Content Collections** (socle),
**Tags + filtrage**, **Recherche (Pagefind)**, **Confort de lecture**, **Version
anglaise (i18n)**.

> ⚠️ Contrainte n°1 transverse : **les URLs ne doivent pas changer**
> (`welcome-v2.md` → `/articles/welcome-v2`), sinon SEO/sitemap/RSS/liens
> entrants cassent.

---

## Phase 1 — Migration vers les Content Collections (prérequis de tout le reste)

Astro 6 fournit la Content Layer API nativement (`glob()` loader,
`getCollection`, `zod` via `astro:content`) — **aucune dépendance npm à
ajouter**.

**Frontmatter existant à respecter** (ne PAS changer le format) :

- Articles :
  `title, description, imgAlt, imgSrc, kind (="Articles"), author, draft, publishedDate`
  — `publishedDate` est au format **`MM/DD/YYYY`** (string), parsé partout via
  `new Date()`. Garder `z.string()`, **ne pas** passer en `z.date()`.
- Fiches : idem + `level` (ex. `"Intermédiaire"`), `kind = "Fiche technique"`.
  `draft` doit être **optionnel avec `.default(false)`** (les fiches n'ont pas
  toutes ce champ).

**À créer**

- `src/content.config.ts` : 2 collections via
  `glob({ pattern: "**/*.md", base: "./src/content/articles" })` et
  `.../fiches`. Schémas Zod reprenant les champs ci-dessus + ajouter dès
  maintenant `tags: z.array(z.string()).default([])` et
  `lang: z.enum(["fr","en"]).default("fr")` (évite de re-toucher le schéma en
  Phase 2 et 5).
- `src/pages/articles/[slug].astro` et `src/pages/fiches/[slug].astro` :
  `getStaticPaths()` → `getCollection(...)`, filtrer les drafts en prod
  (`import.meta.env.PROD`), `params.slug = entry.id` (l'`id` = nom de fichier
  sans extension ⇒ URL identique). Rendu via
  `const { Content, headings } = await render(entry)`, enveloppé dans les
  layouts existants `BlogPostLayout.astro` / `CheatSheetsLayout.astro` (props
  `{ frontmatter: entry.data, headings }`) — **layouts réutilisés tels quels**.

**À déplacer / modifier**

- `git mv src/pages/articles/*.md → src/content/articles/` (idem fiches), puis
  **retirer la ligne `layout:`** du frontmatter (le layout est appliqué par la
  route). Le `<article>` et le `# H1` + image inline dans le corps restent
  (l'outline et `estimateReadingTime` en dépendent).
- Garder `src/pages/articles/index.astro` et `fiches/index.astro` (pages de
  listing) : remplacer le glob par `getCollection`, `entry.frontmatter.*` →
  `entry.data.*`, `entry.url` → `/articles/${entry.id}`.
- `src/pages/index.astro` (homepage) : remplacer les 2 globs par
  `getCollection`, garder la sélection du hero (match par `data.title`), le tri
  et le `.slice(0,8)`.
- `src/pages/rss.xml.js` (**risque le plus élevé**) : `pagesGlobToRssItems` ne
  marche plus. Reconstruire les items via `getCollection` :
  `link: /articles/${id}/` (et `/fiches/`),
  `pubDate: new Date(data.publishedDate)`, filtrer drafts, trier desc. Comparer
  `dist/rss.xml` avant/après (les GUID = link, ne doivent pas changer).
- `src/types/Article.ts` / `Cheatsheet.ts` : ré-exporter
  `CollectionEntry<"articles">` / `<"fiches">` pour rester aligné avec le
  schéma.

**SEO/sitemap** : `Seo.astro` inchangé (mêmes props via les layouts). Le sitemap
auto-découvre les nouvelles routes ⇒ OK tant que les URLs sont identiques.

**Vérification** : `npm run dev` (home, /articles, /fiches, plusieurs slugs,
outline

- reading time + images OK) ; `npm run build` (lance `astro check`) puis diff de
  la liste de fichiers HTML de `dist/` vs avant ; comparer `dist/rss.xml` ;
  `npm test`.

---

## Phase 2 — Tags + filtrage (dépend de P1)

Le champ `tags` est déjà dans le schéma (P1) ⇒ pas de migration.

**À créer**

- `src/pages/tags/[tag].astro` : agrège les tags uniques sur articles+fiches,
  une page par tag listant les entrées via `Card.astro` (réutilisé). Slugifier
  le tag.
- `src/pages/tags/index.astro` (optionnel) : nuage de tags.
- `src/utils/getTags/index.ts` (+ `index.test.ts`, convention existante de
  `handleLinks`).
- `src/components/TagFilter.astro` : réutilisé sur les 2 pages de listing.

**Filtrage UI** (recommandé : statique + JS vanilla, pas de React) : rendre
toutes les cartes côté serveur avec `data-tags`/`data-level`, un petit
`<script>` inline toggle `hidden` (par tag + par `level` pour les fiches).
Fonctionne sans JS (tout visible par défaut).

**Intégration** : afficher une ligne de tags dans `[slug].astro` au-dessus de
`<Content/>` (évite de toucher les layouts partagés). Backfill des `tags:` dans
le frontmatter existant — incrémental, `default([])` ne casse rien.

**Vérification** : `/tags/<tag>` existent ; filtre OK avec/sans JS.

---

## Phase 3 — Recherche Pagefind (dépend de P1, indépendant de P2)

**Dépendance** : ajouter `astro-pagefind` (devDependency) — indexation 100 %
statique en post-build, dev shim inclus, aucun backend/cookie (privacy-first).

**Config** : ajouter `pagefind()` aux `integrations` de `astro.config.ts`.
Ajouter `data-pagefind-body` sur le `<article>` / zone de contenu dans
`BlogPostLayout`, `CheatSheetsLayout` et `ChapterLayout` (cours indexés).
`data-pagefind-ignore` sur nav/footer dans `BaseLayout` au besoin.

**UI** : `src/pages/recherche.astro` (avec `noindex` via le prop existant de
`Seo.astro`) utilisant l'UI Pagefind (`/pagefind/pagefind-ui.js`), + entrée dans
le header. Note : l'index n'existe qu'après `astro build`.

**Vérification** : `npm run build` puis `npm run preview` ; rechercher « Docker
» (articles/fiches/cours apparaissent) ; vérifier `dist/pagefind/`.

---

## Phase 4 — Confort de lecture (dépend de P1) — 3 ajouts vanilla, sans dépendance

1. **Contenu lié** : `src/components/RelatedPosts.astro` +
   `src/utils/getRelated/index.ts` (+ test). Dans `[slug].astro`, calculer les
   entrées proches par `tags` partagés (fallback : plus récentes de la même
   collection / même `level`), exclure l'article courant et les drafts,
   réutiliser `Card.astro`.
2. **Bouton copier le code** : script vanilla `src/scripts/copyCode.ts` (cible
   `pre > code`, `navigator.clipboard`), importé dans les 2 layouts à côté de
   `handleReadingTime()`. Style dans le bloc `is:global` existant. Pas de
   rehype.
3. **Barre de progression de lecture** : `src/components/ReadingProgress.astro`
   (barre fixe + listener `scrollTop/scrollHeight`), ajoutée aux 2 layouts,
   couleurs via les variables CSS existantes.

**Vérification** : checks visuels sur un article et une fiche.

---

## Phase 5 — Version anglaise i18n (chantier le plus lourd, à phaser en dernier)

**5a — Routing + chaînes UI** (livrable autonome)

- `astro.config.ts` :
  `i18n: { defaultLocale: "fr", locales: ["fr","en"], routing: { prefixDefaultLocale: false } }`
  ⇒ les URLs FR restent sans préfixe (pas de redirection/SEO cassé), l'anglais
  sous `/en/`.
- `src/i18n/ui.ts` + helper `useTranslations(locale)` : traduire nav, footer,
  labels des cartes (« Par », « Niveau », « Temps de lecture »), titres de
  sections codés en dur dans `index.astro`/index pages/layouts, et les défauts
  de `Seo.astro`.
- `src/components/LanguageSwitcher.astro` dans le header.
- `Seo.astro` (seule vraie modif SEO du plan) : émettre les `hreflang`, et
  rendre `og:locale`/`inLanguage` dynamiques selon la locale. `@astrojs/sitemap`
  émet les `hreflang` automatiquement une fois `i18n` configuré.

**5b — Contenu traduit** (à différer)

- Réutiliser le champ `lang` du schéma + un `translationKey` pour lier FR↔EN.
  Fichiers EN sous `src/content/articles/en/<slug>.md` (le glob `**/*.md`
  récurse, `id = en/<slug>`), mappés vers `/en/articles/<slug>`. Fallback FR si
  traduction absente.
- **Recommandation** : livrer 5a (coquille EN + switcher + quelques articles
  phares traduits), différer la traduction de masse.

---

## Ordre & dépendances

| Phase                 | Dépend de | Différable                        |
| --------------------- | --------- | --------------------------------- |
| 1 Content Collections | —         | Non (prérequis 2,3,4,5b)          |
| 2 Tags + filtrage     | 1         | Partiellement                     |
| 3 Pagefind            | 1         | Oui                               |
| 4 Confort lecture     | 1         | Oui (sous-features indépendantes) |
| 5a i18n shell         | 1         | Oui                               |
| 5b contenu traduit    | 1, 5a     | Oui (recommandé)                  |

`tags` et `lang` sont ajoutés au schéma dès la Phase 1 pour ne pas re-toucher
`content.config.ts` ensuite.

## Risques principaux

- **Stabilité des URLs** : `[slug].astro` doit reproduire slugs + trailing-slash
  à l'identique. Diff de la liste HTML `dist/` avant merge.
- **RSS** : reconstruire `link`/`pubDate` identiques sinon re-notification de
  tous les abonnés. Comparer `dist/rss.xml`.
- **Format de date** : garder `publishedDate` en string `MM/DD/YYYY`.
- **`draft` optionnel sur les fiches** : `.default(false)` obligatoire.
- **`astro check` au build** : réconcilier le type `Article` inline de
  `index.astro` et `src/types/*.ts` avec le schéma.

## Vérification end-to-end

1. `npm run dev` — parcours de toutes les routes affectées.
2. `npm run build` — passe `astro check` ; diff `dist/` + `dist/rss.xml` vs
   build pré-migration (git worktree).
3. `npm run preview` — recherche Pagefind + `dist/pagefind/`.
4. `npm test` — `handleLinks` + nouveaux tests `getTags`/`getRelated`.
5. Valider le JSON-LD de `Seo.astro` et le sitemap (pages + hreflang).
