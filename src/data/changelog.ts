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
            content: "Mise à jour du menu burger."
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
