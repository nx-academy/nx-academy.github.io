import { it, expect, describe } from "vitest"

import { handleLinks } from "./index"

describe("handleLinks unit tests suite", () => {
    it("should return something", () => {
        expect(handleLinks("/cours/docker-et-docker-compose/chapitres")).toBeDefined()
    })
})
