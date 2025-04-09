type QuizMeta = {
  description: string;
  imgAlt: string;
  imgSrc: string;
  level: "Facile" | "Moyen" | "Difficile";
  slug: string;
  title: string;
  href: string
};

export const QUIZZES: readonly QuizMeta[] = [
  {
    slug: "docker-facile",
    title: "Docker - Niveau facile",
    description: "Un quiz pour démarrer avec Docker en douceur",
    level: "Facile",
    imgSrc: "/misc/quiz-hero.webp",
    imgAlt: "Illustration Docker facile",
    href: "quiz/docker-facile"
  },
  {
    slug: "docker-moyen",
    title: "Docker - Niveau moyen",
    description: "Un quiz pour tester tes connaissances intermédiaires",
    level: "Moyen",
    imgSrc: "/misc/quiz-hero.webp",
    imgAlt: "Illustration Docker moyen",
    href: "quiz/docker-moyen"
  },
  {
    slug: "docker-difficile",
    title: "Docker - Niveau difficile",
    description: "Un challenge costaud pour les pros de Docker",
    level: "Difficile",
    imgSrc: "/misc/quiz-hero.webp",
    imgAlt: "Illustration Docker difficile",
    href: "quiz/docker-difficile"
  },
];
