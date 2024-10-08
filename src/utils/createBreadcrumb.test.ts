import { describe, it,  expect } from "vitest"
import createBreadcrumb from "./createBreadcrumb"


const cheatsheetPath = "/fiches/comprendre-la-fonction-css-clamp"
const blogPath = "/articles/welcome-v2"
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

        expect(true).toBe(true)
    })

    it("should return ['accueil', '/', 'fiches', '/', 'comprendre-la-fonction-css-clamp'] for '/fiches/comprendre-la-fonction-css-clamp' path", () => {
        expect(createBreadcrumb(cheatsheetPath)).toEqual(["accueil", "/", "fiches", "/", "comprendre-la-fonction-css-clamp"])

        createBreadcrumb(cheatsheetPath)

        expect(true).toBe(true)
    })

    it("should return ['accueil', '/', 'articles', '/', 'weclome-v2'] for '/articles/welcome-v2' path", () => {
        expect(createBreadcrumb(blogPath)).toEqual(["accueil", "/", "articles", "/", "welcome-v2"])
    })
})
