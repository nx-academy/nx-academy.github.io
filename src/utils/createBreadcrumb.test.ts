import { describe, it,  expect } from "vitest"
import createBreadcrumb from "./createBreadcrumb"


const cheatsheetPath = "/fiches/comprendre-la-fonction-css-clamp"
const blogPath = "/fiches/comprendre-la-fonction-css-clamp"
const cheatsheetHome = "/fiches"
const homePath = "/"

describe("breadcrumb Unit Test Suite", () => {
    it("should return undefined if '/' is passed", () => {
        expect(createBreadcrumb(homePath)).toBeUndefined()
    })

    it("should return something if something but '/' is passed", () => {
        expect(createBreadcrumb(cheatsheetHome)).toBeDefined()
    })

    it("should return ['accueil', '/', 'fiches'] for /fiches path", () => {
        expect(createBreadcrumb(cheatsheetHome)).toEqual(["accueil", "/", "fiches"])
    })
})
