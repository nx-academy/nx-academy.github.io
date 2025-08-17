type News = {
  id: string
  content: string;
  date: string;
  title: string;
  url: string
};

export const NEWS: News[] = [
  {
    id: "sortie-de-react-19",
    title: "Sortie de React 19",
    content:
      "La nouvelle version de React apporte un meilleur support des Server Components, une gestion améliorée du streaming et des optimisations de performance.",
    date: "08/15/2025",
    url: "https://nx.academy"
  },
  {
    id: "nouvelle-release-de-node-js-22",
    title: "Nouvelle release de Node.js 22",
    content:
      "Node.js 22 introduit le support complet de l’API Temporal, des améliorations au moteur V8 et des outils de diagnostic plus puissants.",
    date: "08/14/2025",
    url: "https://nx.academy"
  },
  {
    id: "astro-ajoute-le-support-des-îlots-interactifs-dynamiques",
    title: "Astro ajoute le support des îlots interactifs dynamiques",
    content:
      "Astro 4.5 propose un nouveau mode d’hydratation qui optimise le rendu des composants interactifs pour de meilleures performances.",
    date: "08/13/2025",
    url: "https://nx.academy"
  },
  {
    id: "openai-annonce-gpt-5-turbo",
    title: "OpenAI annonce GPT-5 Turbo",
    content:
      "La nouvelle version du modèle promet des temps de réponse divisés par deux et une compréhension plus fine du contexte conversationnel.",
    date: "08/12/2025",
    url: "https://nx.academy"
  },
  {
    id: "nouveau-thème-vs-code-officiel-pour-typescript",
    title: "Nouveau thème VS Code officiel pour TypeScript",
    content:
      "Microsoft publie un thème officiel optimisé pour améliorer la lisibilité du code TypeScript et JavaScript dans VS Code.",
    date: "08/11/2025",
    url: "https://nx.academy"
  },
  {
    id: "github-copilot-chat-arrive-en-version-stable",
    title: "GitHub Copilot Chat arrive en version stable",
    content:
      "Copilot Chat est désormais disponible pour tous les développeurs, offrant un support intégré dans VS Code et JetBrains.",
    date: "08/10/2025",
    url: "https://nx.academy"
  },
  {
    id: "next-js-15-en-bêta",
    title: "Next.js 15 en bêta",
    content:
      "La bêta de Next.js 15 introduit un système de routing repensé, des optimisations ISR et un nouveau moteur d’images.",
    date: "08/09/2025",
    url: "https://nx.academy"
  },
];
