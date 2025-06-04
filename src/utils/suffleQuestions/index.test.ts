import { it, expect, describe } from "vitest"

import { suffleQuestions } from "./index"

describe("suffleQuestions Unit Test Suites", () => {
    it("should return something", () => {
        expect(suffleQuestions([])).toBeDefined()
    })
})
