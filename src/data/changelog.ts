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
            date: "12/04/2025",
            tasks: [
                {
                    kind: "done",
                    content: `Ajout des documents de suivi <a href="#">sur le repository GitHub</a>. Ils servent à voir sur quoi je travaille en ce moment.`
                },
            ]
        },
        {
            date: "12/04/2025",
            tasks: [
                {
                    kind: "done",
                    content: `Nouvelle fiche technique : “Comprendre les réseaux Docker”`
                },
                {
                    kind: "in-progress",
                    content: `Correction de liens cassés sur la fiche CI/CD`
                },
                {
                    kind: "fix",
                    content: `Intégration du projet RAG pour générer des quiz (phase bêta)`
                },
            ]
        },
        {
            date: "05/04/2025",
            tasks: [
                {
                    kind: "done",
                    content: `Nouvelle fiche technique : “Comprendre les réseaux Docker”`
                },
                {
                    kind: "in-progress",
                    content: `Correction de liens cassés sur la fiche CI/CD`
                },
                {
                    kind: "fix",
                    content: `Intégration du projet RAG pour générer des quiz (phase bêta)`
                },
            ]
        }
    ]
}


export const ALL_MONTHS = [
    april
]
