import { db, NewsFeed } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(NewsFeed).values([
    {
      id: 1,
      content:
        "Next.js 16 améliore le streaming SSR et simplifie l’App Router. Cet article explore les nouveautés et leurs impacts pour les développeurs Front-End.",
      published: new Date("2025-03-04"),
      slug: "next.js-16-améliore-le-streaming",
      title: "Next.js 16 améliore le streaming SSR et simplifie l’App Router",
      url: "https://nextjs.org/blog/next.js-16-améliore-le-streaming",
    },
    {
      id: 2,
      content:
        "Kubernetes 1.32 met en avant la sécurité avec un nouveau mode de sandboxing. Cet article explore les nouveautés et leurs impacts pour les développeurs Kubernetes.",
      published: new Date("2025-06-15"),
      slug: "kubernetes-1.32-met-en-avant",
      title:
        "Kubernetes 1.32 met en avant la sécurité avec un nouveau mode de sandboxing",
      url: "https://kubernetes.io/blog/kubernetes-1.32-met-en-avant",
    },
    {
      id: 3,
      content:
        "Python 3.14 introduit un mode strict pour le typage optionnel. Cet article explore les nouveautés et leurs impacts pour les développeurs Python.",
      published: new Date("2025-04-24"),
      slug: "python-3.14-introduit-un-mode",
      title: "Python 3.14 introduit un mode strict pour le typage optionnel",
      url: "https://www.python.org/blogs/python-3.14-introduit-un-mode",
    },
    {
      id: 4,
      content:
        "Une faille critique corrigée dans OpenSSL 3.2.1. Cet article explore les nouveautés et leurs impacts pour les développeurs Security.",
      published: new Date("2025-02-01"),
      slug: "une-faille-critique-corrigée-dans",
      title: "Une faille critique corrigée dans OpenSSL 3.2.1",
      url: "https://openssl.org/news/une-faille-critique-corrigée-dans",
    },
    {
      id: 5,
      content:
        "Docker 27 apporte des optimisations majeures pour les builds multi-plateformes. Cet article explore les nouveautés et leurs impacts pour les développeurs Docker.",
      published: new Date("2025-04-21"),
      slug: "docker-27-apporte-des-optimisations",
      title:
        "Docker 27 apporte des optimisations majeures pour les builds multi-plateformes",
      url: "https://www.docker.com/blog/docker-27-apporte-des-optimisations",
    },
    {
      id: 6,
      content:
        "Kubernetes 1.32 met en avant la sécurité avec un nouveau mode de sandboxing. Cet article explore les nouveautés et leurs impacts pour les développeurs Kubernetes.",
      published: new Date("2025-07-14"),
      slug: "kubernetes-1.32-met-en-avant",
      title:
        "Kubernetes 1.32 met en avant la sécurité avec un nouveau mode de sandboxing",
      url: "https://kubernetes.io/blog/kubernetes-1.32-met-en-avant",
    },
    {
      id: 7,
      content:
        "OpenAI annonce GPT-5 Turbo avec temps de réponse divisé par deux. Cet article explore les nouveautés et leurs impacts pour les développeurs IA.",
      published: new Date("2025-05-04"),
      slug: "openai-annonce-gpt-5-turbo-avec",
      title: "OpenAI annonce GPT-5 Turbo avec temps de réponse divisé par deux",
      url: "https://openai.com/blog/openai-annonce-gpt-5-turbo-avec",
    },
    {
      id: 8,
      content:
        "Python 3.14 introduit un mode strict pour le typage optionnel. Cet article explore les nouveautés et leurs impacts pour les développeurs Python.",
      published: new Date("2025-07-08"),
      slug: "python-3.14-introduit-un-mode",
      title: "Python 3.14 introduit un mode strict pour le typage optionnel",
      url: "https://www.python.org/blogs/python-3.14-introduit-un-mode",
    },
    {
      id: 9,
      content:
        "Docker 27 apporte des optimisations majeures pour les builds multi-plateformes. Cet article explore les nouveautés et leurs impacts pour les développeurs Docker.",
      published: new Date("2025-04-24"),
      slug: "docker-27-apporte-des-optimisations",
      title:
        "Docker 27 apporte des optimisations majeures pour les builds multi-plateformes",
      url: "https://www.docker.com/blog/docker-27-apporte-des-optimisations",
    },
    {
      id: 10,
      content:
        "Node.js 22 introduit le support natif de l’ESM loader et des améliorations perf. Cet article explore les nouveautés et leurs impacts pour les développeurs Node.js.",
      published: new Date("2025-07-25"),
      slug: "node.js-22-introduit-le-support",
      title:
        "Node.js 22 introduit le support natif de l’ESM loader et des améliorations perf",
      url: "https://nodejs.org/en/blog/node.js-22-introduit-le-support",
    },
    {
      id: 11,
      content:
        "Node.js 22 introduit le support natif de l’ESM loader et des améliorations perf. Cet article explore les nouveautés et leurs impacts pour les développeurs Node.js.",
      published: new Date("2025-05-26"),
      slug: "node.js-22-introduit-le-support",
      title:
        "Node.js 22 introduit le support natif de l’ESM loader et des améliorations perf",
      url: "https://nodejs.org/en/blog/node.js-22-introduit-le-support",
    },
    {
      id: 12,
      content:
        "Docker 27 apporte des optimisations majeures pour les builds multi-plateformes. Cet article explore les nouveautés et leurs impacts pour les développeurs Docker.",
      published: new Date("2025-07-28"),
      slug: "docker-27-apporte-des-optimisations",
      title:
        "Docker 27 apporte des optimisations majeures pour les builds multi-plateformes",
      url: "https://www.docker.com/blog/docker-27-apporte-des-optimisations",
    },
    {
      id: 13,
      content:
        "GitHub Actions propose un nouveau cache distribué pour accélérer les workflows CI. Cet article explore les nouveautés et leurs impacts pour les développeurs DevOps.",
      published: new Date("2025-07-07"),
      slug: "github-actions-propose-un-nouveau",
      title:
        "GitHub Actions propose un nouveau cache distribué pour accélérer les workflows CI",
      url: "https://github.blog/changelog/github-actions-propose-un-nouveau",
    },
    {
      id: 14,
      content:
        "Kubernetes 1.32 met en avant la sécurité avec un nouveau mode de sandboxing. Cet article explore les nouveautés et leurs impacts pour les développeurs Kubernetes.",
      published: new Date("2025-01-08"),
      slug: "kubernetes-1.32-met-en-avant",
      title:
        "Kubernetes 1.32 met en avant la sécurité avec un nouveau mode de sandboxing",
      url: "https://kubernetes.io/blog/kubernetes-1.32-met-en-avant",
    },
    {
      id: 15,
      content:
        "Une faille critique corrigée dans OpenSSL 3.2.1. Cet article explore les nouveautés et leurs impacts pour les développeurs Security.",
      published: new Date("2025-07-15"),
      slug: "une-faille-critique-corrigée-dans",
      title: "Une faille critique corrigée dans OpenSSL 3.2.1",
      url: "https://openssl.org/news/une-faille-critique-corrigée-dans",
    },
    {
      id: 16,
      content:
        "Kubernetes 1.32 met en avant la sécurité avec un nouveau mode de sandboxing. Cet article explore les nouveautés et leurs impacts pour les développeurs Kubernetes.",
      published: new Date("2025-08-14"),
      slug: "kubernetes-1.32-met-en-avant",
      title:
        "Kubernetes 1.32 met en avant la sécurité avec un nouveau mode de sandboxing",
      url: "https://kubernetes.io/blog/kubernetes-1.32-met-en-avant",
    },
    {
      id: 17,
      content:
        "Node.js 22 introduit le support natif de l’ESM loader et des améliorations perf. Cet article explore les nouveautés et leurs impacts pour les développeurs Node.js.",
      published: new Date("2025-02-16"),
      slug: "node.js-22-introduit-le-support",
      title:
        "Node.js 22 introduit le support natif de l’ESM loader et des améliorations perf",
      url: "https://nodejs.org/en/blog/node.js-22-introduit-le-support",
    },
    {
      id: 18,
      content:
        "Une faille critique corrigée dans OpenSSL 3.2.1. Cet article explore les nouveautés et leurs impacts pour les développeurs Security.",
      published: new Date("2025-08-04"),
      slug: "une-faille-critique-corrigée-dans",
      title: "Une faille critique corrigée dans OpenSSL 3.2.1",
      url: "https://openssl.org/news/une-faille-critique-corrigée-dans",
    },
    {
      id: 19,
      content:
        "Node.js 22 introduit le support natif de l’ESM loader et des améliorations perf. Cet article explore les nouveautés et leurs impacts pour les développeurs Node.js.",
      published: new Date("2025-07-08"),
      slug: "node.js-22-introduit-le-support",
      title:
        "Node.js 22 introduit le support natif de l’ESM loader et des améliorations perf",
      url: "https://nodejs.org/en/blog/node.js-22-introduit-le-support",
    },
    {
      id: 20,
      content:
        "AWS dévoile Graviton5 avec des performances record pour les workloads IA. Cet article explore les nouveautés et leurs impacts pour les développeurs Cloud.",
      published: new Date("2025-07-13"),
      slug: "aws-dévoile-graviton5-avec-des",
      title:
        "AWS dévoile Graviton5 avec des performances record pour les workloads IA",
      url: "https://aws.amazon.com/blogs/aws-dévoile-graviton5-avec-des",
    },
  ]);
}
