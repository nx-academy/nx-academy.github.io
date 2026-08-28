/* Dérivations d'une brève du Feed.
   Le format a changé en août 2026 : le bloc unique `content` est devenu un
   `context` — le résumé factuel de la source — accompagné d'une `lecture`, le
   commentaire de l'auteur. Les deux colonnes coexistent en base tant que des
   entrées de l'ancien format y vivent, donc c'est ici, et pas dans les
   composants, qu'on décide ce qui s'affiche.
   Le schéma appartient à nx-mcp : ce dépôt ne fait que lire. */

import type { News } from "../../types/News";

/** Le strict nécessaire pour dériver un rendu : de quoi tester sans monter
    une ligne de base complète. */
export type NewsBody = Pick<News, "content" | "context" | "lecture">;

/** Le corps d'une brève. Les entrées d'avant août 2026 n'ont que `content`,
    celles d'après ont `context` — on préfère toujours la plus récente des deux.
    Le repli couvre aussi une colonne présente mais vide. */
export const newsContext = ({ content, context }: NewsBody): string =>
  context?.trim() || content;

/** La lecture, ou `null` quand il n'y en a pas — c'est le cas de toutes les
    entrées de l'ancien format. Une chaîne vide vaut absence. */
export const newsLecture = ({ lecture }: NewsBody): string | null =>
  lecture?.trim() || null;

/* ────────────────────────────────────────────────────────────────────────────
   Le flux de /feed
   ──────────────────────────────────────────────────────────────────────────── */

/** Une ligne de `NewsFeed`, réduite à ce que le flux consomme. On ne dépend pas
    du type `News` de `src/types/` : il décrit les props des composants d'accueil,
    qui n'ont pas besoin de `url`. */
export type NewsRow = NewsBody & {
  published: Date;
  slug: string;
  title: string;
  url: string;
};

/** Une brève prête à afficher : plus rien à décider côté composant. */
export type FeedItem = {
  context: string;
  lecture: string | null;
  published: Date;
  slug: string;
  source: string;
  title: string;
  url: string;
};

/** Le flux est une suite de blocs, pas une liste plate : les lignes compactes
    consécutives forment un seul `<ul>`, et la bascule de format s'intercale. */
export type FeedBlock =
  | { kind: "entry"; item: FeedItem }
  | { kind: "mark"; since: Date }
  | { kind: "lines"; items: FeedItem[] };

export type FeedPage = {
  blocks: FeedBlock[];
  page: number;
  pages: number;
};

/** 12 par page, tous formats confondus. C'est un choix de design, pas un
    réglage : ce nombre met la bascule de format visible dès la première page
    sans noyer les entrées récentes. */
export const PER_PAGE = 12;

/* Le nom du média ne vit pas en base — la table `NewsFeed` n'a qu'une `url`, et
   son schéma appartient à nx-mcp. On le dérive donc du domaine, avec une table
   pour les sources déjà citées : « UX Collective » ne se devine pas depuis
   `uxdesign.cc`, et un domaine brut au pied d'une entrée se lirait comme une
   référence technique plutôt que comme un nom de média. */
const MEDIA: Record<string, string> = {
  "aa.com.tr": "Anadolu",
  "anthropic.com": "Anthropic",
  "bleepingcomputer.com": "BleepingComputer",
  "blogdumoderateur.com": "Blog du Modérateur",
  "computerweekly.com": "Computer Weekly",
  "courrierinternational.com": "Courrier international",
  "frontendmasters.com": "Frontend Masters",
  "ft.com": "Financial Times",
  "kubernetes.io": "Kubernetes",
  "lemondeinformatique.fr": "Le Monde Informatique",
  "nextjs.org": "Next.js",
  "noemamag.com": "Noema",
  "openai.com": "OpenAI",
  "openssl.org": "OpenSSL",
  "python.org": "Python",
  "react.dev": "React",
  "reuters.com": "Reuters",
  "rtl.fr": "RTL",
  "slashdot.org": "Slashdot",
  "stepsecurity.io": "StepSecurity",
  "syntax.fm": "Syntax",
  "theverge.com": "The Verge",
  "uxdesign.cc": "UX Collective",
};

/** Le nom du média à afficher au pied d'une entrée. Repli sur le domaine nu
    quand la source est nouvelle — une brève publiée ne doit jamais faire tomber
    le build parce que son domaine manque ici. */
export const newsSource = (url: string): string => {
  let host: string;

  try {
    host = new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }

  return MEDIA[host] ?? host;
};

/** Le discriminant de format, et le seul : une brève commentée est rendue au
    format complet, une brève sans lecture en ligne compacte. Pas de champ
    `legacy` ni `archived` — une vieille entrée à laquelle on ajoute une lecture
    remonte donc toute seule au format complet. */
export const isFullEntry = (news: NewsBody): boolean =>
  newsLecture(news) !== null;

/** La règle éditoriale : une lecture n'est jamais plus courte que le contexte
    qu'elle commente. Le design rend le déséquilibre visible — les deux blocs ont
    la même mesure, donc leurs hauteurs se comparent — mais c'est au build de le
    signaler. Une brève sans lecture n'est pas déséquilibrée, elle est d'un autre
    format : elle est conforme. */
export const isBalanced = (news: NewsBody): boolean => {
  const lecture = newsLecture(news);

  return lecture === null || lecture.length >= newsContext(news).length;
};

/** Les brèves prêtes à afficher, du plus récent au plus ancien. Le flux et les
    pages d'entrée passent tous les deux par ici, donc une brève est rendue à
    l'identique des deux côtés. */
export const feedItems = (rows: NewsRow[]): FeedItem[] =>
  [...rows]
    .sort((a, b) => b.published.getTime() - a.published.getTime())
    .map((row) => ({
      context: newsContext(row),
      lecture: newsLecture(row),
      published: row.published,
      slug: row.slug,
      source: newsSource(row.url),
      title: row.title,
      url: row.url,
    }));

/**
 * Le flux d'une page de /feed : un seul ordre chronologique, du plus récent au
 * plus ancien, tous formats confondus.
 *
 * La ligne de bascule est posée au premier passage complet → compact **de la
 * liste entière**, pas de la tranche : elle apparaît donc sur la page qui porte
 * la transition, même quand celle-ci tombe juste après une frontière de
 * pagination. Tant qu'aucune brève n'a de lecture, il n'y a pas de passage —
 * donc pas de ligne de bascule, et le flux est entièrement compact. C'est l'état
 * du site aujourd'hui.
 */
export const buildFeed = (
  rows: NewsRow[],
  page = 1,
  perPage = PER_PAGE,
): FeedPage => {
  const items = feedItems(rows);
  const pages = Math.max(1, Math.ceil(items.length / perPage));
  const current = Math.min(Math.max(1, page), pages);

  /* La frontière : le premier compact précédé d'au moins un complet. */
  const firstFull = items.findIndex((item) => item.lecture !== null);
  const frontier =
    firstFull === -1
      ? -1
      : items.findIndex(
          (item, index) => index > firstFull && item.lecture === null,
        );

  const start = (current - 1) * perPage;
  const blocks: FeedBlock[] = [];
  let lines: FeedItem[] = [];

  const flush = () => {
    if (lines.length) {
      blocks.push({ kind: "lines", items: lines });
      lines = [];
    }
  };

  items.slice(start, start + perPage).forEach((item, offset) => {
    const index = start + offset;

    if (item.lecture !== null) {
      flush();
      blocks.push({ kind: "entry", item });

      return;
    }

    /* La bascule porte la date de la brève qu'elle annonce : la phrase reste
       vraie à mesure que des lectures s'ajoutent, sans qu'on ait à la rouvrir. */
    if (index === frontier) {
      flush();
      blocks.push({ kind: "mark", since: item.published });
    }

    lines.push(item);
  });

  flush();

  return { blocks, page: current, pages };
};
