type News = {
  content: string;
  date: string;
  title: string;
};

export const NEWS: News[] = [
  {
    title: "Sortie de React 19",
    content:
      "La nouvelle version de React apporte un meilleur support des Server Components, une gestion améliorée du streaming et des optimisations de performance.",
    date: "08/15/2025",
  },
  {
    title: "Nouvelle release de Node.js 22",
    content:
      "Node.js 22 introduit le support complet de l’API Temporal, des améliorations au moteur V8 et des outils de diagnostic plus puissants.",
    date: "08/14/2025",
  },
  {
    title: "Astro ajoute le support des îlots interactifs dynamiques",
    content:
      "Astro 4.5 propose un nouveau mode d’hydratation qui optimise le rendu des composants interactifs pour de meilleures performances.",
    date: "08/13/2025",
  },
  {
    title: "OpenAI annonce GPT-5 Turbo",
    content:
      "La nouvelle version du modèle promet des temps de réponse divisés par deux et une compréhension plus fine du contexte conversationnel.",
    date: "08/12/2025",
  },
  {
    title: "Nouveau thème VS Code officiel pour TypeScript",
    content:
      "Microsoft publie un thème officiel optimisé pour améliorer la lisibilité du code TypeScript et JavaScript dans VS Code.",
    date: "08/11/2025",
  },
  {
    title: "GitHub Copilot Chat arrive en version stable",
    content:
      "Copilot Chat est désormais disponible pour tous les développeurs, offrant un support intégré dans VS Code et JetBrains.",
    date: "08/10/2025",
  },
  {
    title: "Next.js 15 en bêta",
    content:
      "La bêta de Next.js 15 introduit un système de routing repensé, des optimisations ISR et un nouveau moteur d’images.",
    date: "08/09/2025",
  },
  {
    title: "Bun 1.3 gagne en stabilité",
    content:
      "Bun 1.3 corrige plusieurs bugs critiques, améliore la compatibilité avec npm et réduit les temps d’installation des dépendances.",
    date: "08/08/2025",
  },
  {
    title: "Tailwind CSS 4.0 annoncé",
    content:
      "La nouvelle version apporte un système de design tokens natif et une meilleure compatibilité avec les frameworks front modernes.",
    date: "08/07/2025",
  },
  {
    title: "Deno introduit le support natif d’Express",
    content:
      "Deno 2.4 permet désormais d’exécuter du code Express.js sans modification, facilitant la migration depuis Node.js.",
    date: "08/06/2025",
  },
];
