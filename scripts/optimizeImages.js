import fs from "fs";
import path from "path";
import sharp from "sharp";

const BASE_INPUT_DIR = "./raw";
const BASE_OUTPUT_DIR = "./public/images";

async function optimizeImage(inputDir, outputDir, file) {
  const inputPath = path.join(inputDir, file);
  const fileName = path.parse(file).name;
  const outputPath = path.join(outputDir, `${fileName}.webp`);

  await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);

  console.log(`✔️ ${outputPath}`);
}

async function runScript() {
  const subDirs = fs
    .readdirSync(BASE_INPUT_DIR)
    .filter((name) =>
      fs.statSync(path.join(BASE_INPUT_DIR, name)).isDirectory(),
    );

  subDirs.forEach((subDir) => {
    const inputDir = `${BASE_INPUT_DIR}/${subDir}`;
    const outputDir = `${BASE_OUTPUT_DIR}/${subDir}`;

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, {
        recursive: true,
      });
    }

    const files = fs
      .readdirSync(inputDir)
      .filter((file) => /\.(jpe?g|png|webp)$/i.test(file));

    for (const file of files) {
      optimizeImage(inputDir, outputDir, file);
    }
  });
}

runScript();
