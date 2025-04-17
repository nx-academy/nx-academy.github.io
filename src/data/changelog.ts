type Task = {
    kind: "in-progress" | "done" | "fix"
    content: string
}

type LogTasks = {
    month: string
    tasks: Task[]
}

const aprilTasks: LogTasks = {
    month: "Avril",
    tasks: [
        {
            kind: "done",
            content: "Mise à jour du menu burger"
        },
        {
            kind: "done",
            content: "Création de la page Changelog. <small>Je crois que c'est la page que vous êtes en train de lire... Elle est bien, hein ?</small>"
        }
    ]
}

const marchTasks: LogTasks = {
    month: "Mars",
    tasks: [
        {
            kind: "fix",
            content: "Ca ne marchait pas et maintenant ça marche !"
        }
    ]
}

export const ALL_MONTHS = [
    aprilTasks,
    marchTasks
]
