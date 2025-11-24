import type { Testimonial } from "../types/Testimonial";

const DOCKER_TESTIMONIALS: readonly Testimonial[] = [
  {
    content:
      "Novice avec Docker, j’ai pu rapidement comprendre les concepts essentiels grâce à NX. La pédagogie de Thomas, ses explications claires et les exercices pratiques m’ont permis de progresser pas à pas. Aujourd’hui, je me sens vraiment à l’aise avec Docker.",
    job: "Développeur JavaScript / Python",
    name: "Loïc",
    picture: "/images/cours-docker-et-docker-compose/loic.webp",
  },
  {
    content:
      "J’avais déjà quelques bases sur Docker, mais le cours NX m’a permis de mettre de l’ordre dans mes connaissances. Grâce à l’approche claire et progressive de Thomas, j’ai enfin compris comment les différentes briques de Docker s’articulent entre elles et surtout pourquoi on les utilise ! Une vraie mise en lumière.",
    job: "Développeur Full Stack",
    name: "Yacine",
    picture: "/images/cours-docker-et-docker-compose/yacine.webp",
  },
  {
    content:
      "Ce cours m’a vraiment aidé à accélérer ma montée en compétences sur Docker. Les explications de Thomas, les schémas et les exercices m’ont permis de mieux comprendre les concepts et de les ancrer durablement. Aujourd’hui, je me sens beaucoup plus autonome.",
    job: "Développeuse Back End",
    name: "Leslie",
    picture: "/images/cours-docker-et-docker-compose/leslie.webp",
  },
];

const GITHUB_ACTIONS_TESTIMONIALS: readonly Testimonial[] = [
  {
    content:
      "J’avais entendu parler du CI/CD sans vraiment savoir comment le mettre en pratique. Grâce au cours NX sur GitHub Actions, j’ai enfin compris comment automatiser mes tests et mes déploiements. Les explications claires et les exemples concrets m’ont permis de passer de la théorie à la pratique en un rien de temps.",
    job: "Développeur Front End",
    name: "Lionel",
    picture: "/images/cours-ci-cd-github-actions/lionel.webp",
  },
  {
    content:
      "Avant ce cours, le CI/CD me paraissait assez abstrait. Grâce à NX, j’ai enfin compris à quoi servent les workflows GitHub Actions et comment les utiliser pour automatiser un projet. Tout est expliqué simplement, étape par étape — c’est concret et motivant.",
    job: "Étudiant",
    name: "Remy",
    picture: "/images/cours-ci-cd-github-actions/remy.webp",
  },
  {
    content:
      "Ce cours m’a permis de franchir un vrai cap dans ma compréhension du CI/CD. J’ai appris à créer des workflows GitHub Actions solides et à structurer mes pipelines comme un pro. Les explications de Thomas m’ont aidé à adopter de bonnes pratiques que j’utilise déjà dans mes projets.",
    job: "DevOps en devenir",
    name: "Antoine",
    picture: "/images/cours-ci-cd-github-actions/oumar.webp",
  },
];

export { DOCKER_TESTIMONIALS, GITHUB_ACTIONS_TESTIMONIALS };
