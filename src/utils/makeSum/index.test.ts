import { expect, describe, it } from "vitest"

import { makeSum } from "./index"

describe("makeSum Unit test suites", () => {
    it("should return something", () => {
        expect(makeSum(2, 2)).toBeDefined()
    })

    it("should return a number", () => {
        expect(typeof makeSum(2, 2)).toBe("number")
    })

    it("should return 4", () => {
        expect(makeSum(2, 2)).toBe(4)
    })
})
