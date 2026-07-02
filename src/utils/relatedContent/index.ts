// Moteur de recommandation du bloc « À lire ensuite ».
//
// Remplace l'ancien tri purement chronologique par un scoring par pertinence
// thématique, capable de croiser articles et fiches. La clé de rapprochement
// est le champ `serie` (présent sur les fiches, ajouté aux articles) ; les
// `tags` servent de signal fin pour départager.

export type RelatedFrontmatter = {
  draft?: boolean;
  title: string;
  imgSrc: string;
  imgAlt: string;
  author: string;
  publishedDate: string;
  level?: string;
  kind?: string;
  serie?: string;
  tags?: string[];
};

export type RelatedItem = {
  frontmatter: RelatedFrontmatter;
  url?: string;
};

// Poids : une série commune pèse plus qu'un simple tag partagé.
const SERIE_WEIGHT = 3;
const TAG_WEIGHT = 1;

const normalizeUrl = (path: string) => path.replace(/\/+$/, "");

const normalizeTag = (tag: string) => tag.trim().toLowerCase();

const publishedTime = (item: RelatedItem) =>
  new Date(item.frontmatter.publishedDate).getTime();

/**
 * Score de pertinence d'un candidat vis-à-vis de l'item courant.
 * `serie` identique → +SERIE_WEIGHT ; chaque `tag` partagé → +TAG_WEIGHT.
 */
export function relevanceScore(
  current: RelatedItem,
  candidate: RelatedItem,
): number {
  let score = 0;

  const currentSerie = current.frontmatter.serie;
  if (currentSerie && candidate.frontmatter.serie === currentSerie) {
    score += SERIE_WEIGHT;
  }

  const currentTags = new Set(
    (current.frontmatter.tags ?? []).map(normalizeTag),
  );
  if (currentTags.size > 0) {
    for (const tag of candidate.frontmatter.tags ?? []) {
      if (currentTags.has(normalizeTag(tag))) {
        score += TAG_WEIGHT;
      }
    }
  }

  return score;
}

/**
 * Sélectionne les contenus « À lire ensuite » les plus pertinents.
 *
 * - Exclut les brouillons, les items sans URL et la page courante.
 * - Trie par score de pertinence décroissant, puis par date décroissante.
 * - Complète par les contenus les plus récents (préférence au `kind` de la
 *   page courante) si moins de `limit` candidats sont pertinents, afin de ne
 *   jamais afficher un bloc vide.
 */
export function scoreRelated(
  current: RelatedItem,
  pool: RelatedItem[],
  limit = 3,
): RelatedItem[] {
  const currentUrl = current.url ? normalizeUrl(current.url) : undefined;

  const candidates = pool.filter(
    (item) =>
      !item.frontmatter.draft &&
      item.url &&
      normalizeUrl(item.url) !== currentUrl,
  );

  const scored = candidates
    .map((item) => ({ item, score: relevanceScore(current, item) }))
    .filter((entry) => entry.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score || publishedTime(b.item) - publishedTime(a.item),
    )
    .map((entry) => entry.item);

  if (scored.length >= limit) {
    return scored.slice(0, limit);
  }

  // Repli : compléter avec les plus récents non encore retenus, en donnant la
  // priorité au même type de contenu que la page courante.
  const chosen = new Set(scored.map((item) => normalizeUrl(item.url as string)));
  const currentKind = current.frontmatter.kind;

  const fallback = candidates
    .filter((item) => !chosen.has(normalizeUrl(item.url as string)))
    .sort((a, b) => {
      const sameKindA = a.frontmatter.kind === currentKind ? 1 : 0;
      const sameKindB = b.frontmatter.kind === currentKind ? 1 : 0;
      return sameKindB - sameKindA || publishedTime(b) - publishedTime(a);
    });

  return [...scored, ...fallback].slice(0, limit);
}
