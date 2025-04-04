import type { Breadcrumb } from "../../types/Breadcrumb"

type Links = {
    baseUrl: string
    breadcrumbs: Breadcrumb[]
}

export function handleLinks(url: string): Links {
    let baseUrl = ""
    let pageName = ""

    const parseToArray = url.split("/")

    if (parseToArray.includes("docker-et-docker-compose")) {
        baseUrl = "/cours/docker-et-docker-compose"
        pageName = "Conteneurisez vos applications avec Docker"
    } else if (parseToArray.includes("ci-cd-github-actions")) {
        baseUrl = "/cours/ci-cd-github-actions"
        pageName = "Maîtrisez les pipelines CI/CD avec les GitHub Actions"
    } else {
        throw new Error("Unknown course")
    }


    return {
        baseUrl,
        breadcrumbs: [
            {
                pageUrl: "/",
                pageName: "NX Academy"
            },
            {
                pageUrl: "/cours",
                pageName: "Cours"
            },
            {
                pageUrl: baseUrl,
                pageName: pageName
            }
        ]
    }
}
