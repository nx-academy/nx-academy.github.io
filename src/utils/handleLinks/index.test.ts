import { it, expect, describe } from "vitest"

import { handleLinks } from "./index"


const DOCKER_COURSE_URL = "/cours/docker-et-docker-compose/chapitres/installation-et-configuration-docker"
const CI_CD_COURSE_URL = "/cours/ci-cd-github-actions/chapitres/decouverte-concepts-ci-cd"


describe("handleLinks unit tests suite", () => {
    it("should return something", () => {
        expect(handleLinks(CI_CD_COURSE_URL)).toBeDefined()
    })

    it("should return the right shape for the object", () => {
        const links = handleLinks(CI_CD_COURSE_URL)

        expect(links).toHaveProperty("baseUrl")
        expect(links).toHaveProperty("breadcrumbs")
    })

    it("should return the right value for the CI/CD Course", () => {
        const links = handleLinks(CI_CD_COURSE_URL)

        expect(links.baseUrl).toBe("/cours/ci-cd-github-actions")
    })

    it("should return the right value for the Docker Course", () => {
        const links = handleLinks(DOCKER_COURSE_URL)

        expect(links.baseUrl).toBe("/cours/docker-et-docker-compose")
    })

    it("should thrown an error if the search url is not found", () => {
        expect(() => handleLinks("foo")).toThrow("Unknown course")
    })
})
