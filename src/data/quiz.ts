type QuizMeta = {
  description: string;
  imgAlt: string;
  imgSrc: string;
  level: "Facile" | "Moyen" | "Difficile";
  slug: string;
  title: string;
  href: string;
};

export const QUIZZES: readonly QuizMeta[] = [
  {
    slug: "quiz-niveau-docker",
    title: "Quiz de niveau Docker",
    description:
      "Testez vos connaissances sur Docker et Docker Compose à travers 30 questions qui couvrent les fondamentaux de la conteneurisation. Images, conteneurs, volumes, Dockerfile, orchestration avec Compose, dépendances entre services… ce quiz passe en revue les bases indispensables pour bien démarrer avec Docker.",
    level: "Difficile",
    imgAlt: "Illustration quiz",
    imgSrc: "/misc/quiz-hero.webp",
    href: "quiz/quiz-niveau-docker",
  },
  {
    slug: "presentation-registry-docker",
    title: "Les registry Docker",
    description:
      "Vous utilisez docker push sans trop savoir où vont vos images ? Ce quiz est fait pour vous. Mettez à l’épreuve vos connaissances sur le rôle d’un registry Docker, les commandes clés (build, tag, pull, etc.), le fonctionnement de Docker Hub, et les bonnes pratiques de nommage. Un passage obligé pour maîtriser le cycle de vie d’une image Docker… et éviter les mauvaises surprises au moment du déploiement.",
    level: "Moyen",
    imgSrc: "/misc/quiz-hero.webp",
    imgAlt: "Illustration Docker facile",
    href: "quiz/presentation-registry-docker",
  },
  {
    slug: "bien-utiliser-volumes-docker",
    title: "Les volumes Docker",
    description:
      "Testez vos connaissances sur la persistance des données, le partage de fichiers entre l’hôte et le conteneur, les différences entre bind mounts et volumes nommés, et les bonnes pratiques d’utilisation. Idéal pour valider ce que vous avez retenu de la fiche technique… et éviter les pièges courants en développement comme en production.",
    level: "Facile",
    imgSrc: "/misc/quiz-hero.webp",
    imgAlt: "Illustration Docker facile",
    href: "quiz/bien-utiliser-volumes-docker",
  },
  {
    slug: "docker-facile",
    title: "Les concepts essentiels de Docker",
    description:
      "Un quiz pour démarrer avec Docker en douceur. Testez vos connaissances sur les concepts essentiels : images, conteneurs, Dockerfile, Docker Hub et les commandes de base. L’occasion de revoir à quoi sert Docker et comment il facilite le lancement d’applications. Idéal pour valider vos premières notions avant d’aller plus loin.",
    level: "Facile",
    imgSrc: "/misc/quiz-hero.webp",
    imgAlt: "Illustration Docker facile",
    href: "quiz/docker-facile",
  },
  {
    slug: "docker-facile-2",
    title: "Docker pour débuter : vocabulaire et commandes simples",
    description:
      "Un quiz pour vous familiariser avec les termes clés et les premières commandes de Docker. Vous y croiserez des notions comme image, conteneur, registre ou encore docker run. Ce quiz est idéal pour valider vos premiers apprentissages avant de vous lancer dans des manipulations plus poussées. Simple, rapide et utile pour bien poser les bases.",
    level: "Facile",
    imgSrc: "/misc/quiz-hero.webp",
    imgAlt: "Illustration Docker facile",
    href: "quiz/docker-facile-2",
  },
  {
    slug: "docker-moyen",
    title: "Docker : allez plus loin avec les bases",
    description:
      "Un quiz pour renforcer vos connaissances Docker et passer à l’étape suivante. Vous y croiserez des commandes plus précises, des options comme -d, des instructions clés du Dockerfile (RUN, CMD, ENTRYPOINT, etc.), ou encore des outils comme docker-compose et les volumes. C’est l’occasion de tester votre compréhension du fonctionnement interne de Docker et de vous préparer à des usages plus complexes. Si vous avez les bases, ce quiz est fait pour vous.",
    level: "Moyen",
    imgSrc: "/misc/quiz-hero.webp",
    imgAlt: "Illustration Docker moyen",
    href: "quiz/docker-moyen",
  },
  {
    slug: "docker-moyen-2",
    title: "Docker : maîtriser les bases en pratique",
    description:
      "Un quiz pour approfondir votre maîtrise des commandes et fichiers Docker. Vous testerez vos connaissances sur des instructions du Dockerfile comme EXPOSE ou CMD, et des outils comme docker volume, docker-compose ou encore les options utiles de docker run. L’objectif est de consolider les bases et d’apprendre à mieux lire et comprendre les fichiers de configuration Docker. Si vous avez déjà utilisé Docker en ligne de commande, ce quiz vous aidera à gagner en assurance.",
    level: "Moyen",
    imgSrc: "/misc/quiz-hero.webp",
    imgAlt: "Illustration Docker moyen",
    href: "quiz/docker-moyen-2",
  },
  {
    slug: "docker-difficile",
    title: "Docker avancé : architecture, réseau et bonnes pratiques",
    description:
      "Un quiz pour tester votre maîtrise avancée de Docker. Vous explorerez des notions complexes comme les réseaux personnalisés, les layers d’image, le build multi-stage ou encore la gestion fine des volumes et des ressources. Ce quiz met aussi l’accent sur les bonnes pratiques et la compréhension du fonctionnement interne de Docker. À réserver à ceux qui veulent aller au-delà des bases et optimiser leurs conteneurs comme des pros.",
    level: "Difficile",
    imgSrc: "/misc/quiz-hero.webp",
    imgAlt: "Illustration Docker difficile",
    href: "quiz/docker-difficile",
  },
  {
    slug: "docker-difficile-2",
    title: "Docker avancé : optimisation, sécurité et orchestration",
    description:
      "Ce quiz s’adresse à celles et ceux qui souhaitent approfondir leurs compétences Docker au-delà de l’usage courant. Il aborde des sujets comme la sécurité des conteneurs, l’optimisation d’images, la gestion de ressources, les registres privés ou encore l’orchestration. C’est une bonne occasion de vérifier votre compréhension des usages professionnels de Docker. À faire si vous avez déjà utilisé Docker dans des projets réels ou techniques.",
    level: "Difficile",
    imgSrc: "/misc/quiz-hero.webp",
    imgAlt: "Illustration Docker difficile",
    href: "quiz/docker-difficile-2",
  },
];
