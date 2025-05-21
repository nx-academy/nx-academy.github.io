import fs from "fs"

const INPUT_DIR = "./images/cheatsheets"
const OUTPUT_DIR = "./public/images/cheatsheets"


function runScript() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, {
            recursive: true
        })
    }

    const files = fs.readdirSync(INPUT_DIR)
        .filter(f => /\.(jpe?g|png)$/i.test(f))

    for (const file of files) {
        console.log("====")
        console.log(file)
        console.log("====")
    }
}

runScript()
