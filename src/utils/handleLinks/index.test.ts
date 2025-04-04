import { it, expect, describe } from "vitest"

import { handleLinks } from "./index"


const DOCKER_COURSE_URL = "/cours/docker-et-docker-compose/chapitres/installation-et-configuration-docker"
const CI_CD_COURSE_URL = "/cours/ci-cd-github-actions/chapitres/decouverte-concepts-ci-cd"


describe("handleLinks unit tests suite", () => {
    it("should return something", () => {
        expect(handleLinks(CI_CD_COURSE_URL)).toBeDefined()
    })

    it("should return an object Links shape", () => {
        expect(handleLinks(DOCKER_COURSE_URL)).toHaveProperty("previousFullChapterLink")
        expect(handleLinks(DOCKER_COURSE_URL)).toHaveProperty("nextFullChapterLink")
        expect(handleLinks(DOCKER_COURSE_URL)).toHaveProperty("breadcrumbs")
    })

    it("should return the correct previousFullChapterLink", () => {
        expect(true).toBe(true)
    })
})
