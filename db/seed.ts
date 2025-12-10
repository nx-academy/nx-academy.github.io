import { db, NewsFeed } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(NewsFeed).values([
    {
      id: 1,
      content:
        "Next.js 16 améliore le streaming SSR et simplifie l’App Router. Cet article explore les nouveautés et leurs impacts pour les développeurs Front-End.",
      published: new Date("2025-07-29"),
      slug: "next.js-16-améliore-le-streaming",
      title: "Next.js 16 améliore le streaming SSR et simplifie l’App Router",
      url: "https://nextjs.org/blog/next.js-16-améliore-le-streaming",
    },
    {
      id: 2,
      content:
        "Kubernetes 1.32 met en avant la sécurité avec un nouveau mode de sandboxing. Cet article explore les nouveautés et leurs impacts pour les développeurs Kubernetes.",
      published: new Date("2025-07-30"),
      slug: "kubernetes-1.32-met-en-avant",
      title:
        "Kubernetes 1.32 met en avant la sécurité avec un nouveau mode de sandboxing",
      url: "https://kubernetes.io/blog/kubernetes-1.32-met-en-avant",
    },
    {
      id: 3,
      content:
        "Python 3.14 introduit un mode strict pour le typage optionnel. Cet article explore les nouveautés et leurs impacts pour les développeurs Python.",
      published: new Date("2025-07-31"),
      slug: "python-3.14-introduit-un-mode",
      title: "Python 3.14 introduit un mode strict pour le typage optionnel",
      url: "https://www.python.org/blogs/python-3.14-introduit-un-mode",
    },
    {
      id: 4,
      content:
        "Une faille critique corrigée dans OpenSSL 3.2.1. Cet article explore les nouveautés et leurs impacts pour les développeurs Security.",
      published: new Date("2025-08-01"),
      slug: "une-faille-critique-corrigée-dans",
      title: "Une faille critique corrigée dans OpenSSL 3.2.1",
      url: "https://openssl.org/news/une-faille-critique-corrigée-dans",
    },
  ]);
}
