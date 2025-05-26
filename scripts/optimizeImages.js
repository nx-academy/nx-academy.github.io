import fs from "fs";
import path from "path";
import sharp from "sharp";

const INPUT_DIR = "./raw/cheatsheets";
const OUTPUT_DIR = "./public/images/cheatsheets";

async function optimizeImage(file) {
  const inputPath = path.join(INPUT_DIR, file);
  const fileName = path.parse(file).name;
  const outputPath = path.join(OUTPUT_DIR, `${fileName}.webp`);

  await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
  console.log(`✔️ ${outputPath}`);
}

async function runScript() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, {
      recursive: true,
    });
  }

  const files = fs
    .readdirSync(INPUT_DIR)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f));

  for (const file of files) {
    await optimizeImage(file);
  }
}

runScript();
