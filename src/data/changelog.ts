type Task = {
    kind: "done" | "in-progress" | "fix"
    content: string
}

type DayLog = {
    date: string
    tasks: Task[]
}

type MonthLog = {
    monthName: string,
    dailyLogs: DayLog[]
}

const april: MonthLog = {
    monthName: "Avril 2025",
    dailyLogs: [
        {
            date: "17/04/2025",
            tasks: [
                {
                    kind: "done",
                    content: `Création de la page de changelog. Si vous lisez ça, ça veut dire que vous êtes dessus 😅.`
                },
                {
                    kind: "done",
                    content: `Ajout des documents de suivi <a href="https://github.com/nx-academy/nx-academy.github.io/tree/main/docs" target="_blank">sur le repository GitHub</a>. Ils servent à voir sur quoi je travaille en ce moment.`
                },
                {
                    kind: "done",
                    content: `Ajout du bouton Scroll To Top : il permet de revenir facilement en haut du document.`
                },
                {
                    kind: "done",
                    content: `Création de la <a href="/manifeste">page de présentation de NX</a>.`
                },
            ]
        },
        {
            date: "12/04/2025",
            tasks: [
                {
                    kind: "in-progress",
                    content: `Rédaction de la page de présentation`
                },
                {
                    kind: "in-progress",
                    content: `Intégration du projet RAG pour générer des quiz`
                },
                {
                    kind: "fix",
                    content: `Fix d'un problème de lien sur les cartes de quiz.`
                },
            ]
        },
    ]
}


export const ALL_MONTHS = [
    april
]
