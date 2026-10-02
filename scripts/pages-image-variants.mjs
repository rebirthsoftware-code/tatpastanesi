// GitHub Pages için her görselin farklı genişliklerde WebP kopyalarını üretir
// (Vercel bunu kendisi yapar; Pages'te görsel optimizasyon sunucusu yoktur).
// Çıktı: public/_img/<genişlik>/<yol>.webp — src/lib/pages-image-loader.ts ile eşleşir.
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

export const WIDTHS = [160, 384, 640, 960, 1600];

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (/\.(jpe?g|png)$/i.test(e.name)) out.push(p);
  }
  return out;
}

const files = await walk("public/images");
await Promise.all(
  files.map(async (file) => {
    const rel = path.relative("public", file); // images/...
    for (const w of WIDTHS) {
      const dest = path.join("public/_img", String(w), `${rel}.webp`);
      await mkdir(path.dirname(dest), { recursive: true });
      await sharp(file).resize({ width: w, withoutEnlargement: true }).webp({ quality: 74 }).toFile(dest);
    }
  }),
);
console.log(`${files.length} görsel × ${WIDTHS.length} boyut üretildi`);
