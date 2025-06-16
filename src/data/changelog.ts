type Task = {
  kind: "in-progress" | "done" | "fix";
  content: string;
};

type LogTasks = {
  month: string;
  tasks: Task[];
};

const juneTasks: LogTasks = {
  month: "Juin",
  tasks: [
    {
      kind: "done",
      content: "Ajout d'une popover changeant pour changer de thème. NX propose maintenant trois réglages : light, dark et système (autrement dit, il utilise automatiquement celui de votre système d'exploitation."
    },
    {
      kind: "done",
      content:
        "Ajout d'un bouton pour changer de thème (et le garder en mémoire).",
    },
    {
      kind: "fix",
      content:
        "Style de la sticky outline sur les articles, fiches techniques et chapitres de cours. Pour info, c'est la fenête à droite qui donne des informations sur le contenu du cours.",
    },
    {
      kind: "done",
      content: "Ajout d'une magnifique animation sur l'icone des flux RSS !",
    },
    {
      kind: "fix",
      content:
        "Quelques fixes dûs à la mise en prod du thème light (quelques icônes et titres qui rendaient mal). Normalement, je devrais pouvoir ajouter de nouveaux thèmes facilement (quoi ? :D)",
    },
    {
      kind: "in-progress",
      content:
        "Ajout de nouveaux thèmes supplémentaires aux thèmes dark et light (une petite surprise pour cet été).",
    },
    {
      kind: "done",
      content:
        "Création du thème light - j'en profiterais certainement pour créer une fiche technique dessus.",
    },
    {
      kind: "done",
      content: `Création d'une page incroyable dédiée <a href="/mentions-legales" target="_blank">aux mentions légales</a> !`,
    },
    {
      kind: "done",
      content:
        "Création d'un très beau footer avec les liens vers les pages et les réseaux sociaux (et flux rss).",
    },
    {
      kind: "done",
      content: `Ajout de la fiche technique <a href="/fiches/presentation-registry-docker" target="_blank">sur les registry Docker</a> et <a href="/quiz/presentation-registry-docker" target="_blank">de son quiz</a> généré via un RAG.`,
    },
    {
      kind: "done",
      content: `Première version de la page 404 (Vous pouvez la tester <a href="/qsdqsd" target="_blank">ici</a>). Elle n'est pas incroyable pour le moment mais je reviendrais dessus un peu plus tard pour m'ajouter un peu de fun :).`,
    },
    {
      kind: "fix",
      content:
        "Correction d'un bug lié au partage d'articles sur les réseaux sociaux.",
    },
    {
      kind: "in-progress",
      content: `Redesign de la home d'un cours. Pour l'instant, je travaille sur la page de présentation <a href="/cours/docker-et-docker-compose" target="_blank">du cours sur Docker et docker compose</a>. Une fois finalisé, je vais créer des composants dédiés puis je m'attaquerais à celle du cours sur les CI/CD.`,
    },
    {
      kind: "fix",
      content:
        "Ajout du changelog de Juin (j'avais bien fait les modifications mais j'avais oublié de le push, oups !)",
    },
    {
      kind: "done",
      content: `Réalisation du <a href="/quiz/quiz-niveau-docker" target="_blank">premier quiz de niveau</a> (à la sortie de mon cours sur Docker et docker compose). J'ai ajouté une fonction pour <i>suffle le tableau</i>, autrement dit changer l'ordre des questions.`,
    },
  ],
};

const mayTaks: LogTasks = {
  month: "Mai",
  tasks: [
    {
      kind: "done",
      content: `Création du <a href="/articles/le-recap-mai-2025">deuxième Recap (youhou bis !)</a> !`,
    },
    {
      kind: "done",
      content:
        "Configuration de Prettier, un formatter de code, et ajout de scripts en CI (Comme c'est excitant !)",
    },
    {
      kind: "in-progress",
      content:
        "Début du travail sur l'optimisation des assets du site et notamment des images. J'ai commencé à écrire un script JS qui optimise la taille et les formats de mes images. Je verrais pour le faire soit tourner en CI, soit en local au pre-push.",
    },
    {
      kind: "done",
      content: `Ajout d'une animation de slider sur la barre de "Vous étiez en train de lire : (parce que les animations, c'est quand même cool !)`,
    },
    {
      kind: "in-progress",
      content: "Ajout du temps de lecture sur les articles et les cours.",
    },
    {
      kind: "done",
      content: `Alors, ce n'est pas vraiment une feature mais j'ai mis à jour <a href="https://github.com/nx-academy/nx-academy.github.io/blob/main/docs/plan-fonctionnalites.md" target="_blank">les fonctionnalités</a> sur lesquelles je vais travailler jusqu'en décembre ainsi que <a href="https://github.com/nx-academy/nx-academy.github.io/blob/main/docs/calendrier-editorial.md" target="_blank">le calendrier édito</a>. Pour info, je vais bientôt sortir une page roadmap publique pour vous tenir au courant de mes futurs plans.`,
    },
    {
      kind: "in-progress",
      content:
        "Finalisation du système de RAG pour Le Recap. L'agent est maintenant capable de scrapper un article, de le résumer et de créer un fichier markdown accepté par Astro. Il y a encore un peu de clean à faire mais c'est bientôt terminé !",
    },
    {
      kind: "done",
      content:
        "Ajout du menu sticky sur les fiches techniques et les chapitres. En gros, il permet de voir les titres de chaque section et de se rendre directement dessus en cliquant. Pas mal, hein ?",
    },
    {
      kind: "done",
      content: `Ajout basique de la gestion des flux RSS. Si ça vous intéresse, vous pouvez regarder <a href="/rss.xml" target="_blank">la page RSS</a>.`,
    },
    {
      kind: "fix",
      content:
        "Un peu de clean de code (suppression de console.log, formattage de codes, etc.).",
    },
    {
      kind: "done",
      content: "Ajout du temps de lecture sur les fiches techniques.",
    },
    {
      kind: "fix",
      content:
        "Suppression de contenus morts (des articles et des fiches techniques abandonnés).",
    },
    {
      kind: "fix",
      content:
        "Mise à jour des meta pour les réseaux sociaux (LinkedIn) qui ajoute l'image de l'article.",
    },
    {
      kind: "done",
      content:
        "Mis à jour des polices du site : Inter remplace maintenant Space Grotesk pour les paragraphes.",
    },
    {
      kind: "fix",
      content: "Ajout du résumé du quiz.",
    },
    {
      kind: "in-progress",
      content: `Mise à jour du <a href="https://github.com/nx-academy/nx-ai/pull/2">système de RAG</a> sur les quiz des fiches techniques.`,
    },
    {
      kind: "done",
      content: `Ajout de la fiche technique <a href="fiches/bien-utiliser-volumes-docker">sur les volumes Docker</a>.`,
    },
    {
      kind: "in-progress",
      content: `Ajout des premiers effets sonores (pour l'instant, <a href="/quiz">sur le quiz</a>).`,
    },
  ],
};

const aprilTasks: LogTasks = {
  month: "Avril",
  tasks: [
    {
      kind: "fix",
      content: "Mise à jour du favicon (je le trouvais pas très propre)",
    },
    {
      kind: "in-progress",
      content:
        "Optimisation du SEO du site avec l'ajout du sitemap et du robots.txt",
    },
    {
      kind: "in-progress",
      content: "Travail sur le partage du site sur les réseaux sociaux.",
    },
    {
      kind: "done",
      content: "Ajout de la snackbar: “Reprendre là où vous vous êtes arrêté”",
    },
    {
      kind: "done",
      content: `Création du <a href="/articles/le-recap-avril-2025">premier Recap (youhou !)</a> avec <a href="/articles/le-recap-presentation">un bel article de présentation</a>.`,
    },
    {
      kind: "done",
      content: "Mise à jour du menu burger",
    },
    {
      kind: "done",
      content:
        "Création de la page de changelog. Si vous lisez ça, ça veut dire que vous êtes dessus 😅.",
    },
    {
      kind: "done",
      content: `Ajout des documents de suivi <a href="https://github.com/nx-academy/nx-academy.github.io/tree/main/docs" target="_blank">sur le repository GitHub</a>. Ils servent à voir sur quoi je travaille en ce moment.`,
    },
    {
      kind: "done",
      content:
        "Ajout du bouton Scroll To Top : il permet de revenir facilement en haut du document.",
    },
    {
      kind: "done",
      content: `Création de la <a href="/manifeste">page de présentation de NX.</a>. C'est un peu mon contrat de confiance avec vous.`,
    },
    {
      kind: "in-progress",
      content:
        "Le système de RAG pour les quiz des chapitres des cours commence à prendre forme. Si le terme ne vous parle pas, pas d'inquiètude, je reviendrais dessus avec un article.",
    },
    {
      kind: "in-progress",
      content:
        "Le Recap se précise. Je travaille un peu sur le fond avant d'automatiser une partie de la création (tout en ajoutant ma touche perso, hein).",
    },
    {
      kind: "done",
      content:
        "Ajout des breadcrumbs, ou fil d'arriane, sur le projet. Ils vous permettent de revenir rapidement à des pages précédentes.",
    },
    {
      kind: "fix",
      content: "Quelques problèmes de liens morts sur le cours Docker.",
    },
    {
      kind: "fix",
      content: "Corrections de quelques typos sur des articles.",
    },
    {
      kind: "in-progress",
      content: "Intégration du cours Docker et docker compose",
    },
  ],
};

export const ALL_MONTHS = [juneTasks, mayTaks, aprilTasks];
