import type { Game } from "../types/Game";

export const GAMES: Game[] = [
  {
    title: "Wolfenstein 3D Clone",
    description:
      "Un clone du mythique Wolfenstein 3D codé en Python avec Pygame. Raycasting, moteur de rendu maison et niveaux personnalisés.",
    imgSrc: "/images/games/wolfenstein-3d-clone.webp",
    imgAlt: "Un screenshot de mon clone de  Wolfenstein 3D",
    status: "in-progress",
    platforms: ["github"],
    githubUrl: "https://google.fr",
    slug: "wolfenstein-3d",
  },
  {
    title: "Buildings",
    description:
      "Un city builder en cours de développement. Gestion de ressources, construction de bâtiments et développement urbain.",
    imgSrc: "/images/games/buildings.webp",
    imgAlt: "Un screenshot de mon city builder",
    status: "in-progress",
    platforms: ["steam"],
    githubUrl: "https://google.fr",
    slug: "buildings",
  },
];
