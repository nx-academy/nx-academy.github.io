import fs from "fs";
import path from "path";
import sharp from "sharp";

const INPUT_DIR = "./raw";
const OUTPUT_DIR = "./public/images";

async function optimizeImage(file) {
  const inputPath = path.join(INPUT_DIR, file);
  const fileName = path.parse(file).name;
  const outputPath = path.join(OUTPUT_DIR, `${fileName}.webp`);

  await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
  console.log(`✔️ ${outputPath}`);
}

async function runScript() {
  const subDirs = fs
    .readdirSync(INPUT_DIR)
    .filter(name => fs.statSync(path.join(INPUT_DIR, name)).isDirectory())

  subDirs.forEach(subDir => {
    const inputPath = `${INPUT_DIR}/${subDir}`
    const outputPath = `${OUTPUT_DIR}/${subDir}`

    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, {
        recursive: true
      })
    }

    const files = fs
      .readdirSync(inputPath)
      .filter(file => /\.(jpe?g|png|webp)$/i.test(file))


    
  })
}

runScript();
