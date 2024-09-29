import { describe, it, expect } from "vitest"
import makeSum from "./sum";

describe("makeSum Unit Test Suites", () => {
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
