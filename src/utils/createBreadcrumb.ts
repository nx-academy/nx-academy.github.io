export default function(path: string): string[] | undefined {
    if (path === "/") {
        return undefined
    }

    let pathToArray = path.split("/")
    let res = ["accueil", "/"]

    pathToArray.forEach((elt, index) => {
        if (elt.length === 0) return

        if ((pathToArray.length - 1) === index) {
            res.push(elt)    
        } else {
            res.push(elt)
            res.push("/")
        }
    })




    return res
}