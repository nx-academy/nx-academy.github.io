# Changelog — data collection YAML (fonctionnement & maintenance)

> **Statut : implémenté (juillet 2026).** Le changelog n'est plus codé en dur en
> TypeScript : il est alimenté par une data collection Astro (un fichier YAML
> par mois). Ce document décrit **comment ça marche** et **comment ajouter ou
> mettre à jour un mois**. La justification de conception (pourquoi ce choix)
> est conservée en fin de document.

---

## Comment ça marche

Le contenu vit dans `src/content/changelog/`, un **fichier YAML par mois**
(`AAAA-MM.yaml`), chargé au build via une data collection Astro. La page
reconstruit la forme `LogTasks[]` attendue par le composant de rendu, qui n'a
**pas** été modifié.

Chaîne complète :

| Fichier                          | Rôle                                                                |
| -------------------------------- | ------------------------------------------------------------------- |
| `src/content.config.ts`          | Définit la collection `changelog` + le schéma zod (validé au build) |
| `src/content/changelog/*.yaml`   | Le contenu : un fichier par mois                                    |
| `src/pages/changelog.astro`      | `getCollection` → tri → regroupement par année → boucle de rendu    |
| `src/components/Changelog.astro` | Rendu des 3 sous-sections par `kind` via `set:html` — **inchangé**  |
| `src/types/LogTasks.ts`          | La forme `{ month, tasks[] }` sur laquelle s'appuie le composant    |

Schéma de la collection (`src/content.config.ts`) :

```ts
schema: z.object({
  month: z.string(), // "Avril" (label FR)
  year: z.number(), // 2026
  order: z.number(), // 1..12, pour le tri (les noms FR ne trient pas chronologiquement)
  tasks: z.array(
    z.object({
      kind: z.enum(["done", "in-progress", "fix"]),
      content: z.string(), // HTML conservé tel quel, injecté via set:html
    }),
  ),
});
```

Tri et regroupement (`src/pages/changelog.astro`) : les entrées sont triées en
**décroissant** (`year` puis `order`), regroupées par année, et chaque année est
rendue par un `<MontlyChangelog>` séparé par un `<hr />`. Les mois sans fichier
(ex. trous naturels de janvier/octobre) n'apparaissent tout simplement pas.

---

## Comment ajouter ou mettre à jour un mois

### Ajouter un nouveau mois

Créer `src/content/changelog/AAAA-MM.yaml` (ex. `2026-07.yaml`) :

```yaml
month: Juillet
year: 2026
order: 7
tasks:
  - kind: fix
    content: |-
      Un texte simple.
  - kind: done
    content: |-
      J'ai sorti <a href="/jeux" target="_blank">la page jeu vidéo</a>.
```

Règles :

- **`month`** : le label FR affiché (`Avril`, `Août`, `Décembre`…), avec accent.
- **`order`** : le numéro du mois (1–12). Sert uniquement au tri chronologique
  (les noms FR ne trient pas tout seuls).
- **`kind`** : exactement `done` (🟢 nouveautés), `in-progress` (🟡 en cours) ou
  `fix` (🔴 corrections). Toute autre valeur fait échouer `npm run check`.
- **`content`** : chaîne **HTML** injectée telle quelle (liens `<a>`, `<i>`,
  emoji…). Utiliser un **bloc littéral YAML `|-`** puis le texte indenté de 6
  espaces : ça évite tout problème de quoting (apostrophes `'`, guillemets `"`
  des attributs `href`, guillemets typographiques `« » “ ”`) — aucun échappement
  n'est nécessaire.
- **Ordre des items** : l'ordre des `tasks` dans le fichier = l'ordre
  d'affichage à l'intérieur de chaque sous-section (le composant filtre par
  `kind` mais préserve l'ordre relatif). Le plus récent en haut par convention.

### Compléter un mois existant

Ouvrir le `.yaml` correspondant et ajouter des entrées dans `tasks`. Rien
d'autre à toucher.

---

## Vérification

1. `npm run check` (`astro check`) : le schéma zod valide chaque fichier. Doit
   passer sans erreur.
2. `npm run prettier:check` : le formatage (le repo a un check Prettier en CI).
3. `npm run dev` puis `/changelog` : vérifier que le mois apparaît au bon
   endroit (bon ordre, 3 sous-sections, liens OK), en thème clair **et** sombre.

---

## Pourquoi ce choix (conception)

Le site est **statique** (GitHub Pages ;
`build = astro check && astro build --remote`). Une BDD (Astro DB / Turso) est
lue **au moment du build** : que le contenu vienne d'une ligne DB ou d'un
fichier, **une mise à jour impose de toute façon un rebuild + redéploiement**.
Le seul vrai avantage d'une BDD — éditer sans toucher au code — **ne se
matérialise donc pas ici**, alors que ses coûts demeurent.

| Critère                     | Astro DB (Turso)                             | Content Collections (YAML)            |
| --------------------------- | -------------------------------------------- | ------------------------------------- |
| Ajouter un mois             | INSERT SQL / script remote, puis déployer    | Créer un `.yaml`, commit, push        |
| Versionning                 | Contenu hors git (pas de diff/review/revert) | Tout dans git (PR, blame, revert)     |
| Typage                      | `kind` en `text` brut                        | `z.enum` validé au build              |
| Publication (site statique) | rebuild + redeploy requis                    | rebuild + redeploy requis (identique) |
| Infra / secrets             | URL remote + app token + voie d'insertion    | rien de nouveau                       |

> On garde Astro DB pour `NewsFeed` / `NowNoteFeed`, dont le churn
> programmatique justifie une BDD — ce qui n'est pas le cas d'un changelog
> narratif, écrit à la main, à faible fréquence.
>
> Une _content collection_ Markdown (corps rédigé) serait un mauvais choix : le
> corps est un bloc unique qui ne se découpe pas en trois groupes par `kind` et
> forcerait un rendu Markdown→HTML au lieu du `set:html` par item. Le YAML garde
> `content` comme chaîne HTML → **zéro changement dans le composant**.
