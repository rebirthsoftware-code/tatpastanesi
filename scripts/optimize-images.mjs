// Ham görselleri (.raw-images) web için optimize edip public/images altına yazar.
// Kullanım: npm run optimize-images
import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = ".raw-images";
const OUT = "public/images";
const MAX = 1600;

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (/\.(jpe?g|png|webp)$/i.test(e.name)) out.push(p);
  }
  return out;
}

for (const file of await walk(SRC)) {
  const rel = path.relative(SRC, file);
  const keepAlpha = /tat-logo|splash/.test(rel);
  const dest = path.join(OUT, rel.replace(/\.(jpe?g|png)$/i, keepAlpha ? ".png" : ".jpg"));
  await mkdir(path.dirname(dest), { recursive: true });
  let img = sharp(file).rotate().resize({ width: MAX, height: MAX, fit: "inside", withoutEnlargement: true });
  img = keepAlpha
    ? img.resize({ width: 900, withoutEnlargement: true }).png({ compressionLevel: 9, palette: true, quality: 90 })
    : img.flatten({ background: "#ffffff" }).jpeg({ quality: 80, mozjpeg: true, progressive: true });
  await img.toFile(dest);
  const [a, b] = [await stat(file), await stat(dest)];
  console.log(`${rel}: ${(a.size / 1024).toFixed(0)}KB -> ${(b.size / 1024).toFixed(0)}KB`);
}
