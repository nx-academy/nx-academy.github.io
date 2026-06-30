export type Serie = {
  label: string;
  blurb: string;
};

// Séries (rayons thématiques) de la page /fiches/.
// L'ordre des clés ici détermine l'ordre d'affichage des rayons sur la page.
// La clé est référencée par le champ `serie` dans le frontmatter de chaque fiche.
export const SERIES: Record<string, Serie> = {
  docker: {
    label: "Docker",
    blurb:
      "Du conteneur isolé à l'infrastructure répartie : images, volumes, registry, optimisation.",
  },
  gamedev: {
    label: "Game dev",
    blurb:
      "Coder de petits jeux rétro : PICO-8, Pygame, game loop et premières cartouches.",
  },
  cicd: {
    label: "CI/CD",
    blurb: "Automatiser tests et mises en production avec les GitHub Actions.",
  },
  js: {
    label: "JavaScript",
    blurb:
      "Les notions clés du langage : retours de fonction, asynchrone, le mot-clé this.",
  },
  css: {
    label: "CSS",
    blurb: "Des designs fluides et responsives, une propriété à la fois.",
  },
  outils: {
    label: "Outils & infra",
    blurb:
      "Storybook, TypeScript, reverse proxys et l'écosystème autour du dev web.",
  },
};
