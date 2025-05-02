type Task = {
    kind: "in-progress" | "done" | "fix"
    content: string
}

type LogTasks = {
    month: string
    tasks: Task[]
}

const mayTaks: LogTasks = {
    month: "Mai",
    tasks: [
        {
            kind: "fix",
            content: "Ajout du résumé du quiz"
        },
        {
            kind: "in-progress",
            content: `Mise à jour du <a href="https://github.com/nx-academy/nx-ai/pull/2">système de RAG</a> sur les quiz des fiches techniques`
        },
        {
            kind: "done",
            content: `Ajout de la fiche technique <a href="fiches/bien-utiliser-volumes-docker">sur les volumes Docker</a>`
        },
        {
            kind: "in-progress",
            content: `Ajout des premiers effets sonores (pour l'instant, <a href="/quiz">sur le quiz</a>)`
        }
    ]
}

const aprilTasks: LogTasks = {
    month: "Avril",
    tasks: [
        {
            kind: "fix",
            content: "Mise à jour du favicon (je le trouvais pas très propre)"
        },
        {
            kind: "in-progress",
            content: "Optimisation du SEO du site avec l'ajout du sitemap et du robots.txt"
        },
        {
            kind: "in-progress",
            content: "Travail sur le partage du site sur les réseaux sociaux."
        },
        {
            kind: "done",
            content: "Ajout de la snackbar: “Reprendre là où vous vous êtes arrêté”"
        },
        {
            kind: "done",
            content: `Création du <a href="/articles/le-recap-avril-2025">premier Recap (youhou !)</a> avec <a href="/articles/le-recap-presentation">un bel article de présentation</a>.`
        },
        {
            kind: "done",
            content: "Mise à jour du menu burger"
        },
        {
            kind: "done",
            content: "Création de la page de changelog. Si vous lisez ça, ça veut dire que vous êtes dessus 😅."
        },
        {
            kind: "done",
            content: `Ajout des documents de suivi <a href="https://github.com/nx-academy/nx-academy.github.io/tree/main/docs" target="_blank">sur le repository GitHub</a>. Ils servent à voir sur quoi je travaille en ce moment.`
        },
        {
            kind: "done",
            content: "Ajout du bouton Scroll To Top : il permet de revenir facilement en haut du document."
        },
        {
            kind: "done",
            content: `Création de la <a href="/manifeste">page de présentation de NX.</a>. C'est un peu mon contrat de confiance avec vous.`
        },
        {
            kind: "in-progress",
            content: "Le système de RAG pour les quiz des chapitres des cours commence à prendre forme. Si le terme ne vous parle pas, pas d'inquiètude, je reviendrais dessus avec un article."
        },
        {
            kind: "in-progress",
            content: "Le Recap se précise. Je travaille un peu sur le fond avant d'automatiser une partie de la création (tout en ajoutant ma touche perso, hein)."
        },
        {
            kind: "done",
            content: "Ajout des breadcrumbs, ou fil d'arriane, sur le projet. Ils vous permettent de revenir rapidement à des pages précédentes."
        },
        {
            kind: "fix",
            content: "Quelques problèmes de liens morts sur le cours Docker."
        },
        {
            kind: "fix",
            content: "Corrections de quelques typos sur des articles."
        },
        {
            kind: "in-progress",
            content: "Intégration du cours Docker et docker compose"
        }
    ]
}

export const ALL_MONTHS = [
    mayTaks,
    aprilTasks
]
