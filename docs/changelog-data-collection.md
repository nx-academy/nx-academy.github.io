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

| Fichier                            | Rôle                                                                     |
| ---------------------------------- | ------------------------------------------------------------------------ |
| `src/content.config.ts`            | Définit la collection `changelog` + le schéma zod (validé au build)      |
| `src/content/changelog/*.yaml`     | Le contenu : un fichier par mois                                         |
| `src/utils/changelog/index.ts`     | **Toutes les dérivations** : timeline, trous, compteurs, résumés, bilans |
| `src/pages/changelog/index.astro`  | La page principale : preuve, mois courant, mois repliés, liens d'archive |
| `src/pages/changelog/[year].astro` | Une page d'archive par année sortie du bloc récent                       |
| `src/components/Changelog*.astro`  | Le rendu, découpé en composants fins                                     |
| `src/styles/changelog.css`         | La feuille partagée par les deux pages                                   |
| `src/types/LogTasks.ts`            | La forme `{ month, year, order, tasks[] }` lue par les dérivations       |

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
      keep: z.boolean().optional(), // « à retenir » — la mise en avant du mois
    }),
  ),
});
```

### Ce qui est dérivé, et donc jamais écrit à la main

`src/utils/changelog/index.ts` reconstruit une **timeline continue** entre la
première et la dernière entrée. Un mois sans fichier n'est pas une absence :
c'est un créneau vide, affiché et assumé (« Aucune entrée ce mois-là — le mois a
existé, le journal non. »), et les trous consécutifs sont regroupés en une seule
ligne.

De cette timeline découlent, sans qu'aucun chiffre ne soit saisi nulle part :
les quatre cartes du bandeau de preuve, l'histogramme du rythme, les compteurs
de chaque mois, le résumé des mois repliés, les bilans d'année, et l'écran de
score de l'easter egg. **C'est le point central de la refonte : la page ne peut
plus périmer.**

Le découpage entre les deux pages est lui aussi dérivé : le mois courant et les
**quatre mois documentés** qui le précèdent restent sur `/changelog`, le reste
part sur `/changelog/[annee]`. Une année n'a de page d'archive que si elle a au
moins un mois hors de ce bloc récent — l'année vivante n'en a donc pas.

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
- **`keep`** (optionnel) : marque l'entrée comme « à retenir ». Voir ci-dessous.

### `keep` — la mise en avant du mois

`keep: true` sort une entrée du lot : elle passe dans un encadré « à retenir »
en tête du mois, et elle sert de **résumé de la ligne repliée** sur `/changelog`
comme sur la page d'archive. C'est le seul levier éditorial de la page.

```yaml
- kind: done
  keep: true
  content: |-
    Sortie du <a href="/articles/le-recap-juillet-2026">récap #8</a>.
```

Règles d'usage :

- **1 à 2 par mois**, jamais plus de 3 — au-delà le rendu tronque, et plus rien
  ne ressort vraiment.
- **uniquement sur `kind: done`** : on met en avant ce qui est livré, pas un
  chantier ni un correctif.
- **facultatif** : un mois sans `keep` masque simplement l'encadré et prend sa
  première entrée `done` comme résumé. Rien ne casse.
- une entrée marquée n'est **pas répétée** dans « nouveautés ».

### Compléter un mois existant

Ouvrir le `.yaml` correspondant et ajouter des entrées dans `tasks`. Rien
d'autre à toucher.

---

## Vérification

1. `npm run check` (`astro check`) : le schéma zod valide chaque fichier. Doit
   passer sans erreur.
2. `npm run prettier:check` : le formatage (le repo a un check Prettier en CI).
3. `npm test` : les dérivations de `src/utils/changelog` sont couvertes.
4. `npm run dev` puis `/changelog` : vérifier que le mois apparaît au bon
   endroit (bon ordre, compteurs justes, liens OK), en thème clair, sombre
   **et** été. Vérifier aussi `/changelog/2025` si un mois a basculé en archive.

---

## Pourquoi ce choix (conception)

Le site est **statique** (GitHub Pages ; `build = astro check && astro build`).
Une BDD (Turso) est lue **au moment du build** : que le contenu vienne d'une
ligne DB ou d'un fichier, **une mise à jour impose de toute façon un rebuild +
redéploiement**. Le seul vrai avantage d'une BDD — éditer sans toucher au code —
**ne se matérialise donc pas ici**, alors que ses coûts demeurent.

| Critère                     | Astro DB (Turso)                             | Content Collections (YAML)            |
| --------------------------- | -------------------------------------------- | ------------------------------------- |
| Ajouter un mois             | INSERT SQL / script remote, puis déployer    | Créer un `.yaml`, commit, push        |
| Versionning                 | Contenu hors git (pas de diff/review/revert) | Tout dans git (PR, blame, revert)     |
| Typage                      | `kind` en `text` brut                        | `z.enum` validé au build              |
| Publication (site statique) | rebuild + redeploy requis                    | rebuild + redeploy requis (identique) |
| Infra / secrets             | URL remote + app token + voie d'insertion    | rien de nouveau                       |

> On garde la base pour `NewsFeed` / `NowNoteFeed`, dont le churn programmatique
> justifie une BDD — ce qui n'est pas le cas d'un changelog narratif, écrit à la
> main, à faible fréquence.
>
> _Mise à jour (juillet 2026)_ : `@astrojs/db` ayant été supprimé par Astro 7,
> ces deux tables sont désormais lues avec Drizzle et `@libsql/client` en direct
> (`src/lib/db/`). La base Turso et le chemin d'écriture sont inchangés ; seule
> la couche d'accès a bougé. Le raisonnement ci-dessus reste valable tel quel.
>
> Une _content collection_ Markdown (corps rédigé) serait un mauvais choix : le
> corps est un bloc unique qui ne se découpe pas en trois groupes par `kind` et
> forcerait un rendu Markdown→HTML au lieu du `set:html` par item. Le YAML garde
> `content` comme chaîne HTML → **zéro changement dans le composant**.

---

## Refonte de la page (juillet 2026)

La page a été refondue à partir du handoff « NX Academy Design System ». Elle
sépare désormais la **couche de preuve** (chiffres + rythme de publication) de
la **couche d'archive** (une page par année), sans rien retirer du journal.

Le seul changement de données a été l'ajout de `keep`. Tout le reste —
compteurs, trous, résumés, bilans — est calculé au build depuis ces mêmes YAML.
