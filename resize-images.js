import sharp from "sharp";
import fs from "fs";
import path from "path";

const __dirname = path.dirname(decodeURIComponent(new URL(import.meta.url).pathname).replace(/^\/*([A-Za-z]:)/, '$1'));
const imagesDir = path.join(__dirname, "public", "images");
const outputDir = path.join(imagesDir, "resized");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const resizeWidth = 250;

fs.readdirSync(imagesDir).forEach((file) => {
  if (file.endsWith(".webp")) {
    const inputPath = path.join(imagesDir, file);
    const outputPath = path.join(outputDir, file);
    sharp(inputPath)
      .resize({ width: resizeWidth })
      .toFile(outputPath, (err) => {
        if (err) {
          console.error(`Error resizing ${file}:`, err);
        } else {
          console.log(`Resized ${file} to width ${resizeWidth}`);
        }
      });
  }
});
