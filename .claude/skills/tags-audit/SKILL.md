---
name: tags-audit
description:
  À utiliser pour auditer et compléter le champ `tags` des fiches techniques de
  `src/pages/fiches/`. Propose des tags tirés du vocabulaire existant pour les
  fiches qui n'en ont pas, dans le seul but de faire fonctionner le bloc « À
  lire ensuite » entre rayons. Toujours proposer avant d'écrire : Thomas valide.
  Ne pas déclencher pour les articles, dont les tags relèvent d'un vocabulaire
  éditorial distinct.
---

# Audit des tags des fiches techniques

Ce skill sert un seul objectif : faire fonctionner `src/utils/relatedContent/`,
qui alimente le bloc « À lire ensuite ». Il ne sert pas à ranger, ni à décrire,
ni à préparer un futur filtre par tag.

Le cadrage complet vit dans `docs/agents-autonomes.md` — s'y référer pour le
contexte, revenir ici pour la méthode.

## Le principe : un tag ne vaut que s'il est partagé

`relevanceScore()` attribue **+3 à une série commune** et **+1 par tag
partagé**. Deux conséquences, et tout le reste du skill en découle :

- **Un tag posé sur une seule fiche ne rapproche rien.** Il n'augmente aucun
  score, jamais. Il ne coûte pas seulement zéro : il dilue le vocabulaire et
  rend le suivant plus difficile à choisir.
- **Un tag qui recopie la série est du poids mort.** Poser `JavaScript` sur une
  fiche `serie: js` n'apporte rien : la série fait déjà +3, et elle le fait
  mieux.

Donc l'objectif n'est **pas** « 27 fiches sur 27 taguées ». C'est le nombre de
**paires de fiches de séries différentes qui partagent au moins un tag** — la
seule chose que le scoring sait exploiter et qui ne fonctionne pas aujourd'hui.

Corollaire à assumer : **une fiche sans tag est un résultat acceptable.** Si
aucun tag du vocabulaire ne s'applique honnêtement, on n'en pose pas, et on le
dit.

## Étape 1 — Relever l'état des lieux

Ne jamais travailler de mémoire ni sur les chiffres d'un document : les
recalculer.

```bash
# Le vocabulaire réel des fiches, par fréquence
awk '/^tags:/{f=1;next} f&&/^  - /{print substr($0,5)} f&&!/^  - /{f=0}' \
  src/pages/fiches/*.md | sort | uniq -c | sort -rn

# Les fiches sans tags, avec leur série
for f in src/pages/fiches/*.md; do
  grep -q "^tags:" "$f" || { printf '%s → ' "$(basename "$f" .md)"; \
    grep -h '^serie:' "$f"; }
done
```

## Étape 2 — Le vocabulaire est fermé par défaut

Les tags portés par les fiches aujourd'hui, et ce qu'ils valent :

| Tag             | Séries où il vit          | Intérêt                            |
| --------------- | ------------------------- | ---------------------------------- |
| `Production`    | `docker`, `cloud`, `cicd` | **le pivot** — croise trois rayons |
| `Cloud`         | `cloud`, `docker`, `cicd` | croise trois rayons                |
| `Image`         | `docker`, `cicd`          | croise deux rayons                 |
| `Orchestration` | `docker`                  | interne au rayon                   |
| `Sécurité`      | `docker`                  | à faire croiser vers `cicd`        |
| `Réseau`        | `docker`                  | interne au rayon                   |
| `Registry`      | `docker`                  | interne au rayon                   |
| `Compose`       | `docker`                  | interne au rayon                   |
| `Game dev`      | `gamedev`                 | recopie la série — ne pas étendre  |
| `PICO-8`        | `gamedev`                 | interne au rayon                   |
| `Lua`           | `gamedev`                 | interne au rayon                   |
| `Python`        | `gamedev`                 | interne au rayon                   |
| `Pygame`        | `gamedev`                 | interne au rayon                   |

Privilégier systématiquement les trois premiers : ce sont eux qui produisent des
paires inter-séries.

**Le vocabulaire des articles est un autre vocabulaire.** `Veille`, `Le Récap`,
`Bilan`, `Carnet de bord`, `NX Academy`, `L'atelier` sont des étiquettes de
format éditorial. Ne jamais les poser sur une fiche, et ne jamais toucher aux
tags des articles depuis ce skill.

## Étape 3 — Proposer, sans rien écrire

Présenter un tableau, une ligne par fiche :

| Fiche | Série | Tags proposés | Paires inter-séries créées |
| ----- | ----- | ------------- | -------------------------- |

Les règles de la proposition :

- **Trois tags maximum par fiche**, et souvent un ou deux suffisent.
- Chaque tag proposé doit être justifiable par le contenu réel de la fiche —
  **la lire**, ne pas se fier au titre.
- Signaler explicitement les fiches pour lesquelles on ne propose rien, avec la
  raison.

**Étendre le vocabulaire est possible, mais c'est une décision séparée.** Un
nouveau tag n'est proposable que s'il remplit les trois conditions : il
s'applique à **au moins deux fiches**, il **ne recopie aucune série**, et il est
présenté à part, comme une extension de vocabulaire à valider pour elle-même.
Dans le doute, ne pas proposer.

## Étape 4 — Validation

Thomas valide, ajuste ou retire, tag par tag s'il le souhaite. **Rien n'est
écrit dans un frontmatter avant sa réponse.** C'est lui qui décide du contenu ;
ce skill propose et formate.

## Étape 5 — Écrire

Liste YAML, indentation de deux espaces, placée **juste après `serie`** (c'est
le cas de 11 des 14 fiches déjà taguées) :

```yaml
serie: cicd
tags:
  - Production
  - Sécurité
level: Intermédiaire
```

Garder la **capitale initiale** des tags existants. `normalizeTag()` compare en
minuscules, donc la casse ne casse pas l'appariement — mais elle sera visible le
jour où les tags seront affichés.

**Ne toucher que le champ `tags`.** Pas de reformatage du reste du frontmatter,
pas de correction de coquille au passage, pas de retouche du corps.

Puis, avant de committer :

```bash
npm run prettier:format
npm run check
npm test
```

## Étape 6 — Mesurer et rendre compte

Recompter les paires inter-séries après modification, et donner le chiffre avant
/ après dans la description de la PR. Sans ce chiffre, on ne sait pas si le
travail a servi à quelque chose.

## Garde-fous

- **Ne jamais renommer un fichier de fiche** : le nom du fichier est l'URL
  publique, et le sitemap, le RSS et le référencement en dépendent.
- **Ne jamais modifier `publishedDate`, `serie`, `level`, `title` ou le corps**
  de la fiche.
- **Ne pas inventer un tag pour remplir une ligne vide.** Un tag unique a une
  valeur nulle dans le scoring — l'absence de tag est préférable.
- **Ne pas toucher aux tags des articles**, ni aux brouillons de
  `src/pages/drafts/` (ils seront tagués au moment de leur publication).
- **Sortie en PR**, jamais de commit direct sur `main`.
- Si le vocabulaire semble vraiment trop pauvre pour couvrir une série entière,
  le dire et s'arrêter là — c'est une question éditoriale, pas un problème à
  résoudre en inventant treize tags.
