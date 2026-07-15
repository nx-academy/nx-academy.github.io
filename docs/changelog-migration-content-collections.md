# Migration du changelog vers les Content Collections (YAML)

> **Statut : décidé, non implémenté.** Ce document décrit la solution cible pour
> ne plus maintenir le changelog sous forme de tableaux codés en dur. Il est
> autonome : il peut servir de point de départ dans un futur chat pour lancer
> l'implémentation.

---

## Contexte et problème

La page `/changelog` (`src/pages/changelog.astro`) affiche un journal de mise à
jour dont le contenu est **codé en dur en TypeScript** dans
`src/data/changelog.ts` : deux tableaux `MONTHS_2026` et `MONTHS_2025` d'objets
`LogTasks`. Ce format n'est plus pertinent à maintenir à la main, et le
changelog n'a plus été mis à jour depuis **avril 2026** alors que le projet a
beaucoup évolué (refonte de nombreuses pages).

Forme actuelle des données (`src/types/LogTasks.ts`) :

```ts
type Task = {
  kind: "in-progress" | "done" | "fix";
  content: string; // HTML injecté via set:html
};

export type LogTasks = {
  month: string; // ex. "Avril" (label FR, pas d'année)
  tasks: Task[];
};
```

Rendu (`src/components/Changelog.astro`) : pour chaque mois, le composant
affiche `{month} {year}` puis **trois sous-sections fixes** filtrées par `kind`
(🟢 `done` → nouveautés, 🟡 `in-progress` → en cours, 🔴 `fix` → corrections),
chaque item étant injecté via `set:html`.

---

## Solution retenue : Astro Content Collections (data collection YAML)

Un **fichier YAML par mois** dans `src/content/changelog/`, chargé via une data
collection Astro. Objectif clé : **ne pas toucher au composant
`Changelog.astro`** — on reconstruit la forme `LogTasks[]` avant de la passer en
props.

### Pourquoi cette option plutôt que la BDD Turso (Astro DB)

Le site est **statique** (GitHub Pages ;
`build = astro check && astro build --remote`). La BDD Astro DB est lue **au
moment du build**. Donc, que le contenu vienne d'une ligne DB ou d'un fichier,
**une mise à jour impose de toute façon un rebuild + redéploiement**.

Conséquence : le seul vrai avantage d'une BDD — éditer le contenu sans toucher
au code — **ne se matérialise pas ici**, alors que ses coûts demeurent.

| Critère                     | Astro DB (Turso)                             | Content Collections (YAML)            |
| --------------------------- | -------------------------------------------- | ------------------------------------- |
| Ajouter un mois             | INSERT SQL / script remote, puis déployer    | Créer un `.yaml`, commit, push        |
| Versionning                 | Contenu hors git (pas de diff/review/revert) | Tout dans git (PR, blame, revert)     |
| Typage                      | `kind` en `text` brut                        | `z.enum` validé au build              |
| Publication (site statique) | rebuild + redeploy requis                    | rebuild + redeploy requis (identique) |
| Infra / secrets             | URL remote + app token + voie d'insertion    | rien de nouveau                       |
| `Changelog.astro`           | inchangé (reshape → `LogTasks[]`)            | inchangé (reshape → `LogTasks[]`)     |

> On garde Astro DB pour `NewsFeed` / `NowNoteFeed`, dont le churn
> programmatique justifie une BDD — ce qui n'est pas le cas d'un changelog
> narratif, écrit à la main, à faible fréquence.
>
> Une _content collection_ Markdown (corps rédigé) serait un mauvais choix : le
> corps est un bloc unique qui ne se découpe pas en trois groupes par `kind` et
> forcerait un rendu Markdown→HTML au lieu du `set:html` par item actuel. Le
> YAML garde `content` comme chaîne HTML → **zéro changement dans le
> composant**.

---

## Étapes d'implémentation (le jour où on le fait)

### 1. Définir la collection

Dans `src/content.config.ts` (le créer s'il n'existe pas) :

```ts
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const changelog = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/changelog" }),
  schema: z.object({
    month: z.string(), // "Avril"
    year: z.number(), // 2026
    order: z.number(), // 1..12, pour le tri (les noms FR ne trient pas chronologiquement)
    tasks: z.array(
      z.object({
        kind: z.enum(["done", "in-progress", "fix"]),
        content: z.string(), // HTML conservé tel quel
      }),
    ),
  }),
});

export const collections = { changelog };
```

### 2. Convertir les données en YAML

Un fichier par mois, ex. `src/content/changelog/2026-04.yaml` :

```yaml
month: Avril
year: 2026
order: 4
tasks:
  - kind: fix
    content: "Encore des fixes de vulnérabilité..."
  - kind: done
    content:
      'J''ai sorti <a href="/jeux" target="_blank">la page jeu vidéo</a> ...'
```

- Reprendre chacun des ~11 objets `LogTasks` de `src/data/changelog.ts`.
- Préserver le HTML de `content` **verbatim** — attention au quoting YAML des
  apostrophes (doubler `''` en quotes simples, ou utiliser des quotes doubles /
  blocs `|`).
- `order` = numéro du mois. Les mois manquants = pas de fichier (les « trous »
  actuels d'octobre/janvier restent gérés naturellement).

### 3. Réécrire le frontmatter de la page

Dans `src/pages/changelog.astro`, remplacer l'import des tableaux par :

```ts
import { getCollection } from "astro:content";
import type { LogTasks } from "../types/LogTasks";

const entries = await getCollection("changelog");

// tri décroissant : année puis order (mois)
entries.sort(
  (a, b) => b.data.year - a.data.year || b.data.order - a.data.order,
);

// regroupement { [year]: LogTasks[] }
const byYear = new Map<number, LogTasks[]>();
for (const { data } of entries) {
  const list = byYear.get(data.year) ?? [];
  list.push({ month: data.month, tasks: data.tasks });
  byYear.set(data.year, list);
}
const years = [...byYear.keys()].sort((a, b) => b - a); // plus récent en premier
```

Puis, dans le template, une boucle qui rend un `<MontlyChangelog>` par année
(séparés par un `<hr />`), en conservant l'espace de tête du prop `year` comme
aujourd'hui :

```astro
{
  years.map((year, i) => (
    <>
      {i > 0 && <hr />}
      <MontlyChangelog monthlyChangelog={byYear.get(year)} year={" " + year} />
    </>
  ))
}
```

### 4. Nettoyage

- Supprimer `src/data/changelog.ts` une fois qu'il n'est plus importé.
- **Conserver** `src/types/LogTasks.ts` : le composant s'appuie toujours sur
  cette forme.
- Le bandeau « plus à jour » ajouté sur `changelog.astro` pourra être retiré (ou
  adapté) selon l'état de la reprise du contenu.

### 5. Vérification

1. `npm run dev` puis ouvrir `/changelog` : comparer le rendu avec l'ancien
   (mêmes mois, mêmes 3 sous-sections, mêmes liens), en clair **et** en sombre.
2. `npm run check` (`astro check`) doit passer sans erreur — le schéma zod
   valide chaque fichier au build.
3. Ajouter un mois de test = créer un `.yaml`, vérifier qu'il apparaît au bon
   endroit, puis le retirer.

---

## Fichiers concernés

| Fichier                          | Action                                           |
| -------------------------------- | ------------------------------------------------ |
| `src/content.config.ts`          | à créer (définition de la collection)            |
| `src/content/changelog/*.yaml`   | à créer (un par mois)                            |
| `src/pages/changelog.astro`      | réécrire le frontmatter + la boucle de rendu     |
| `src/data/changelog.ts`          | à supprimer une fois inutilisé                   |
| `src/components/Changelog.astro` | **inchangé**                                     |
| `src/types/LogTasks.ts`          | **inchangé** (toujours utilisé par le composant) |
