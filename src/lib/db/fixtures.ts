import type { NewsFeed, NowNoteFeed } from "./schema";

/**
 * Données de repli servies quand la base distante n'est pas configurée (voir
 * `isRemoteConfigured`). Reprises de l'ancien `db/seed.ts`, qui alimentait la
 * base SQLite locale d'Astro DB en développement.
 *
 * Rangées par `id` croissant, comme des lignes en base : ce sont les fonctions
 * de `queries.ts` qui appliquent le tri décroissant, afin que le repli et la
 * vraie requête se comportent exactement pareil.
 */

type News = typeof NewsFeed.$inferSelect;
type NowNote = typeof NowNoteFeed.$inferSelect;

/* Les slugs reprennent exactement ce que produit `slugify_title()` côté nx-mcp
   — sans accent ni point — pour que le repli local ressemble à la base réelle.
   `lecture: null` marque les entrées d'avant août 2026. */
export const newsFixtures: News[] = [
  {
    id: 1,
    content:
      "Next.js 16 améliore le streaming SSR et simplifie l’App Router. Cet article explore les nouveautés et leurs impacts pour les développeurs Front-End.",
    context:
      "Next.js 16 améliore le streaming SSR et simplifie l’App Router. Cet article explore les nouveautés et leurs impacts pour les développeurs Front-End.",
    lecture: null,
    published: new Date("2025-07-29"),
    slug: "nextjs-16-ameliore-le-streaming-ssr-et-simplifie-l-app-router",
    title: "Next.js 16 améliore le streaming SSR et simplifie l’App Router",
    url: "https://nextjs.org/blog/next.js-16-améliore-le-streaming",
  },
  {
    id: 2,
    content:
      "Kubernetes 1.32 met en avant la sécurité avec un nouveau mode de sandboxing. Cet article explore les nouveautés et leurs impacts pour les développeurs Kubernetes.",
    context:
      "Kubernetes 1.32 met en avant la sécurité avec un nouveau mode de sandboxing. Cet article explore les nouveautés et leurs impacts pour les développeurs Kubernetes.",
    lecture: null,
    published: new Date("2025-07-30"),
    slug: "kubernetes-132-met-en-avant-la-securite-avec-un-nouveau-mode-de-sandboxing",
    title:
      "Kubernetes 1.32 met en avant la sécurité avec un nouveau mode de sandboxing",
    url: "https://kubernetes.io/blog/kubernetes-1.32-met-en-avant",
  },
  {
    id: 3,
    content:
      "Python 3.14 introduit un mode strict pour le typage optionnel. Cet article explore les nouveautés et leurs impacts pour les développeurs Python.",
    context:
      "Python 3.14 introduit un mode strict pour le typage optionnel, jusqu’ici laissé à la discrétion des outils tiers.",
    lecture:
      "Le typage graduel de Python a toujours souffert de son caractère facultatif. Un mode strict dans la bibliothèque standard change la donne pour les gros projets.",
    published: new Date("2025-07-31"),
    slug: "python-314-introduit-un-mode-strict-pour-le-typage-optionnel",
    title: "Python 3.14 introduit un mode strict pour le typage optionnel",
    url: "https://www.python.org/blogs/python-3.14-introduit-un-mode",
  },
  {
    id: 4,
    content:
      "Une faille critique corrigée dans OpenSSL 3.2.1. Cet article explore les nouveautés et leurs impacts pour les développeurs Security.",
    context:
      "Une faille critique corrigée dans OpenSSL 3.2.1, avec une mise à jour recommandée sans attendre.",
    lecture:
      "Rien d’exotique ici, mais un bon rappel : la chaîne de dépendances TLS reste l’endroit où l’on retarde le plus les mises à jour.",
    published: new Date("2025-08-01"),
    slug: "une-faille-critique-corrigee-dans-openssl-321",
    title: "Une faille critique corrigée dans OpenSSL 3.2.1",
    url: "https://openssl.org/news/une-faille-critique-corrigée-dans",
  },
];

export const nowNoteFixtures: NowNote[] = [
  {
    id: 1,
    content:
      " Je continue à tester les limites de l'intégration entre Claude Design et Claude Code et je m'amuse avec PICO-8 côté jeux vidéos. ",
    published: new Date("2026-06-19"),
  },
];
