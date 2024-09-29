export default function(path: string): string[] | undefined {
    if (path === "/") {
        return undefined
    }

    return ["accueil", "/", "fiches"]
}