// content/ klasöründeki (yönetim panelinden düzenlenen) dosyaları okuyup
// src/data/generated/content.json olarak birleştirir. Derleme ve geliştirme öncesi otomatik çalışır.
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const read = async (f) => JSON.parse(await readFile(f, "utf8"));
const errors = [];

const MENU_CATEGORIES = ["dondurma", "yas-pasta", "sutlu-tatlilar", "serbetli-tatlilar", "kuru-pasta", "waffle", "icecekler"];

const items = [];
for (const file of (await readdir("content/menu")).filter((f) => f.endsWith(".json")).sort()) {
  const key = file.replace(/\.json$/, "");
  const d = await read(path.join("content/menu", file));
  if (!d.name_tr) errors.push(`${file}: ürün adı (TR) boş`);
  if (typeof d.price !== "number" || Number.isNaN(d.price)) errors.push(`${file}: fiyat sayı olmalı`);
  if (!MENU_CATEGORIES.includes(d.category)) errors.push(`${file}: bilinmeyen kategori "${d.category}"`);
  if (d.active === false) continue;
  items.push({
    key,
    category: d.category,
    order: Number(d.order ?? 999),
    price: d.price,
    name: { tr: d.name_tr, en: d.name_en || d.name_tr },
    desc: { tr: d.desc_tr ?? "", en: d.desc_en || d.desc_tr || "" },
    ingredients: { tr: d.ingredients_tr ?? "", en: d.ingredients_en || d.ingredients_tr || "" },
    calories: typeof d.calories === "number" ? d.calories : null,
    allergens: Array.isArray(d.allergens) ? d.allergens : [],
    image: d.image || "/images/tat-logo.png",
    featured: !!d.featured,
  });
}
items.sort((a, b) => MENU_CATEGORIES.indexOf(a.category) - MENU_CATEGORIES.indexOf(b.category) || a.order - b.order || a.name.tr.localeCompare(b.name.tr, "tr"));

const { flavors } = await read("content/flavors.json");
const { branches } = await read("content/branches.json");
const settings = await read("content/settings.json");
for (const b of branches) if (!/^\+90\d{10}$/.test(b.phone)) errors.push(`şube ${b.name}: telefon +905xxxxxxxxx biçiminde olmalı`);

if (errors.length) {
  console.error("İçerik hataları:\n- " + errors.join("\n- "));
  process.exit(1);
}

await mkdir("src/data/generated", { recursive: true });
await writeFile("src/data/generated/content.json", JSON.stringify({ items, flavors, branches, settings }, null, 1));
console.log(`İçerik hazır: ${items.length} ürün, ${flavors.length} dondurma çeşidi, ${branches.length} şube`);
