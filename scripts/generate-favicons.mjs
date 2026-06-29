import sharp from "sharp";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { unlinkSync, existsSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const source = join(root, "public", "Aletheia.png");
const appDir = join(root, "src", "app");
const publicDir = join(root, "public");
const bg = { r: 9, g: 9, b: 11, alpha: 1 };

async function writeSquareIcon(outputPath, size) {
  await sharp(source)
    .resize(size, size, { fit: "contain", background: bg })
    .png()
    .toFile(outputPath);
}

async function main() {
  await writeSquareIcon(join(appDir, "icon.png"), 512);
  await writeSquareIcon(join(appDir, "apple-icon.png"), 180);
  await writeSquareIcon(join(publicDir, "icon.png"), 512);
  await writeSquareIcon(join(publicDir, "apple-icon.png"), 180);

  const faviconPath = join(appDir, "favicon.ico");
  if (existsSync(faviconPath)) {
    unlinkSync(faviconPath);
  }

  console.log("Generated app and public favicon assets from public/Aletheia.png");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
