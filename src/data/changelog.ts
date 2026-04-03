import type { LogTasks } from "../types/LogTasks";

const newAprilTasks: LogTasks = {
  month: "Avril",
  tasks: [
    {
      kind: "done",
      content: `J'ai sorti <a href="/jeux" target="_blank">la page jeu vidéo</a> ainsi que des pages dédiées à chacun des jeux. Ça va clairement encore évoluer mais c'est un bon début.`,
    },
    {
      kind: "done",
      content: `J'ai écrit <a href="/articles/nx-fait-des-jeux/" target="_blank">un nouvel article</a> en lien avec le 'changement' chez NX où je précise que je commence à faire des jeux.`,
    },
    {
      kind: "in-progress",
      content:
        "Je suis en train de préparer un nouveau format cette fois plus orienté vidéo. Je pense shooter la première le premier week-end d'avril. Je reviendrais dessus plus tard.",
    },
    {
      kind: "in-progress",
      content:
        "Je suis en train de faire une grosse prise en main de Claude Code et de Codex sur des projets persos. J'en profiterais certainement pour faire quelques fiches techniques dessus.",
    },
    {
      kind: "fix",
      content:
        "Pas mal de petits fixes et de mises à jour de sécurité. Le mois de Mars a été un peu infernal en terme de brèches informatiques.",
    },
  ],
};

const marchTasks: LogTasks = {
  month: "Mars",
  tasks: [
    {
      kind: "in-progress",
      content: "Je vais ajouter une page jeu vidéo au menu de navigation.",
    },
    {
      kind: "in-progress",
      content:
        "Je suis en train d'écrire quelques articles : ils sont princalement en lien avec Python",
    },
    {
      kind: "in-progress",
      content:
        "Je suis en train de réinstaller mdx sur le projet pour mieux gérer les vidéos avec Vimeo",
    },
    {
      kind: "in-progress",
      content:
        "Je prépare doucement mon nouveau format : un dev log sur la création de mes jeux vidéos.",
    },
    {
      kind: "fix",
      content: "Migration vers astro 6",
    },
    {
      kind: "fix",
      content: "Pas mal de mises à jour de sécurité",
    },
    {
      kind: "fix",
      content: "Mise à jour du changelog pour 2026",
    },
    {
      kind: "in-progress",
      content:
        "Mise à jour de mon back office Discord pour migrer vers un back office MCP",
    },
    {
      kind: "done",
      content: "Migration du système de news vers mon serveur MCP",
    },
  ],
};

const februaryTasks: LogTasks = {
  month: "Février",
  tasks: [
    {
      kind: "fix",
      content:
        "Mis à jour des dépendances du projet et optimisation des performances.",
    },
    {
      kind: "fix",
      content: "Second set de mises à jour de sécurité.",
    },
    {
      kind: "in-progress",
      content:
        "J'ai commencé à écrire de nouveaux articles en rapport avec Pygame.",
    },
    {
      kind: "done",
      content: `Sortie de la fiche <a href="/fiches/intro-a-pygame" target="_blank">Comment débuter avec Pygame ?</a>`,
    },
  ],
};

const decemberTasks: LogTasks = {
  month: "Décembre",
  tasks: [
    {
      kind: "fix",
      content:
        "Quelques mises à jour pour le sticky du feed sur la home page. J'ai décidé de ne mettre que les 3 dernières news. On verra à l'utilisation si c'est bien ou pas.",
    },
    {
      kind: "in-progress",
      content:
        "Je suis en train de travailler sur le calendrier éditorial de l'année 2026. Pour info, je prévois de faire 3 articles par mois où je mixe du contenu technique, des articles de fond et des recaps.",
    },
    {
      kind: "done",
      content: `Écriture et <a href="/articles/review-nx-2025" target="_blank">mise en ligne</a> de l'article de bilan de l'année 2025.`,
    },
    {
      kind: "done",
      content: `Sortie <a href="/feed" target="_blank">du Feed de news</a> : j'avais pas mal bossé dessus cet été et je vais prendre le temps de revenir dessus dans un article (parce que c'est assez intéressant ce que j'ai fait niveau techno. Le Feed va me permettre de mettre à jour le site plus souvent et de petit à petit transformer NX en un petit média indépendant.`,
    },
    {
      kind: "fix",
      content: "Fix du sticky du feed notamment sur les téléphones portables.",
    },
    {
      kind: "done",
      content: "Suppression de Datadog Rum pour traquer les bugs",
    },
    {
      kind: "fix",
      content:
        "Pas mal de petites améliorations côté UI avec des couleurs de hoover et un peu de refactoring",
    },
    {
      kind: "in-progress",
      content:
        "Je suis en train de préparer un article de bilan de l'année ainsi qu'une série de fiches techniques. En fonction du temps que j'ai, je verrais si j'attaque aussi la préparation de mon futur cours.",
    },
  ],
};

const novemberTasks: LogTasks = {
  month: "Novembre",
  tasks: [
    {
      kind: "fix",
      content: "MAJ des dépendances (security update)",
    },
    {
      kind: "fix",
      content: "MAJ du projet pour Node.JS 24",
    },
    {
      kind: "done",
      content: `Sortie <a href="/cours/ci-cd-github-actions/" target="_blank">du cours sur les pipelines CI/CD</a> + l'upload des screencasts`,
    },
    {
      kind: "in-progress",
      content:
        "Migration du bot Discord d'IA vers un serveur MCP pour une meilleur intégration avec les LLM.",
    },
  ],
};

const septemberTasks: LogTasks = {
  month: "Septembre",
  tasks: [
    {
      kind: "done",
      content: `Creation du recap de septembre 2025. Il est <a href="/articles/le-recap-septembre-2025" target="_blank">en ligne ici</a>. Bonne lecture :)`,
    },
    {
      kind: "in-progress",
      content:
        "Je suis en train de préparer la sortie du cours sur les CI/CD. Pour l'instant, je m'occupe d'insérer le contenu dans Astro et d'uploader les vidéos.",
    },
    {
      kind: "done",
      content:
        "J'ai mis en place la génération du recap et du quiz via mon système de bot Discord. Ça marche plutôt bien.",
    },
    {
      kind: "fix",
      content:
        "J'ai fixé la taille de certaines polices (je pense aux balises h3) sur les fiches techniques.",
    },
    {
      kind: "in-progress",
      content:
        "Pas mal de mises à jour pour le système de news automatisés. Je suis maintenant capable de récupérer plusieurs news issues de thématique différentes. Le tout est quasiment prêt à être deployé en prod.",
    },
    {
      kind: "fix",
      content:
        "Quelques mises à jour de dépendances. Désolé, j'ai un peu ralenti sur le sortie de nouveautés entre Août et Septembre. Je reviendrais très bientôt pour vous dire pourquoi.",
    },
    {
      kind: "done",
      content: `<a href="/fiches/bien-faire-multi-stage-build" target="_blank">Sorti de la fiche technique</a> sur le multi stage build d'images Docker.`,
    },
  ],
};

const augustTasks: LogTasks = {
  month: "Août",
  tasks: [
    {
      kind: "done",
      content: `Mise en ligne <a href="/articles/le-recap-aout-2025" target="_blank">du recap d'août 2025</a> - Et oui, on arrête pas !`,
    },
    {
      kind: "in-progress",
      content:
        "Ecriture d'articles sur la gestion des émotions. Je reviendrais bientôt dessus :)",
    },
    {
      kind: "done",
      content:
        "Mon bot Discord peut maintenant créer des news depuis un channel dédié, il me la met (lol) ensuite en PR et force un rebuild de mon site Astro. Ouais, il va y avoir un certain nombre de blog posts à écrire pour expliquer tout ça !",
    },
    {
      kind: "done",
      content:
        "Création d'un premier agent IA qui utilise les fonctionnalités de recherche de GPT (Bing Search) pour me trouver des articles thématiques. Il se lance à la demande sur ma Guild Discord dans un channel dédié et me retrouve des news.",
    },
    {
      kind: "done",
      content:
        "Le Recap tourne maintenant dans un bot Discord avec le flow que je voulais depuis le début. Je lance la commande depuis Discord, je sélectionne les articles qui m'intéresse et tout le job tourne pour moi (extractions des données, création d'une branche, commit et création d'une PR",
    },
    {
      kind: "in-progress",
      content:
        "Mise en place d'un système de RAG pour générer des news et des recaps qui ont mon ton à moi (et pas un ton générique de GPT)",
    },
    {
      kind: "in-progress",
      content: `Je suis en train de travailler sur l'API de NX. Pour l'instant, rien d'incroyable : je suis en train de travailler sur un compteur de vues. Je vais le brancher à ma DB Turso. Par contre, l'infra derrière est un peu cool : je passe <a href="https://vercel.com/docs/functions" target="_blank" rel="noopener noreferrer">par des fonctions serverless de chez Vercel</a>. Pour l'instant, le repo nx-api n'est pas open-source. Je communiquerais dessus une fois que j'ai un peu avancé.`,
    },
    {
      kind: "in-progress",
      content: `Je suis en train d'ajouter la prochaine grosse fonctionnalité à NX : un feed d'actualités en partie généré via de l'IA. La partie front <a href="https://github.com/nx-academy/nx-academy.github.io/pull/210" target="_blank">est quasiment terminé</a>. J'ai ajouté une base de données SQL pour <a href="https://turso.tech/" target="_blank" rel="noopener noreferrer">les news via Turso</a>. Pour l'instant, je suis plutôt satisfait du résultat.`,
    },
    {
      kind: "done",
      content: `J'ai fini de refactoriser <a target="_blank" href="https://github.com/nx-academy/nx-ai">mon repo avec mes scripts de RAG</a>. J'ai viré Langchain et Chroma DB pour ne passer que par les API de GPT. Prochaine étape : ajouter des tests et écrire la doc`,
    },
    {
      kind: "fix",
      content: "Quelques mises à jour de dépendences, dont Astro",
    },
  ],
};

const julyTasks: LogTasks = {
  month: "Juillet",
  tasks: [
    {
      kind: "in-progress",
      content:
        "Gros batch d'articles et de cheatsheets. Cela devrait me couvrir en terme de contenus jusqu'à décembre :).",
    },
    {
      kind: "in-progress",
      content:
        "Je suis en train de réaliser le planning édito de NX pour jusqu'à fin décembre / début 2026. Une fois finalisé, je commencerais, normalemen dès demain un gros batch d'écriture d'articles, de fiches techniques ainsi que d'un nouveau cours.",
    },
    {
      kind: "in-progress",
      content: `Je suis en train de faire une grosse refactorisation <a href="https://github.com/nx-academy/nx-ai" target="_blank">sur le repo nx-ai</a>. Pour info, c'est le repo qui contient tous mes scripts qui fonctionnent avec les API de GPT. Je pense que j'en ai pour deux jours plein de boulot. L'idée est de cleaner (comprendre : améliorer la qualité du code) le repo pour pourvoir le faire évoluer plus facilement. Je ferais certainement bientôt un article sur Langchain et le mécanisme de RAG.`,
    },
    {
      kind: "done",
      content: `Génération <a href="/quiz/optimisation-images-docker/" target="_blank">du quiz</a> sur la fiche technique sur les images Docker.`,
    },
    {
      kind: "fix",
      content:
        "Mise à jour du changelog (sur la partie fiche technique sur les images Docker et son quiz).",
    },
    {
      kind: "done",
      content: `Sortie de la fiche technique <a href="/fiches/optimisation-images-docker" target="_blank">sur l'optimisation des images Docker</a>.`,
    },
  ],
};

const juneTasks: LogTasks = {
  month: "Juin",
  tasks: [
    {
      kind: "in-progress",
      content:
        "Pas mal de petites optimisations côté SEO et performances. Je suis passé par une technique assez cool d'optimisations de code pour les SVG. Je vais probablement bientôt écrire une fiche technique dessus.",
    },
    {
      kind: "done",
      content: "Ajout des testimonials pour le cours sur Docker.",
    },
    {
      kind: "fix",
      content:
        "Fix d'un bug sur l'affichage des images : un max-width: 100%; déclaré globalement me donnait des affichages un peu bizarre.",
    },
    {
      kind: "done",
      content:
        "Choix d'un préstaraire d'hosting (= hébergement) pour les vidéos. J'ai décidé de passer par Vimeo. J'ai ajouté toutes les vidéos du cours sur Docker. Ca s'est fait très simplement.",
    },
    {
      kind: "in-progress",
      content: `Mise en ligne <a href="/cours/docker-et-docker-compose/chapitres/decouverte-docker" target="_blank">du cours sur Docker et Docker Compose</a>. Je suis actuellement en train d'ajouter des images pour chacun des chapitres. Les vidéos sont déjà en ligne.`,
    },
    {
      kind: "done",
      content: `Création <a href="/articles/le-recap-juin-2025" target="_blank">du troisième recap</a>. Et oui, on poursuit sur la lancée.`,
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

export const MONTHS_2026 = [newAprilTasks, marchTasks, februaryTasks];

export const MONTHS_2025 = [
  decemberTasks,
  novemberTasks,
  septemberTasks,
  augustTasks,
  julyTasks,
  juneTasks,
  mayTaks,
  aprilTasks,
];
