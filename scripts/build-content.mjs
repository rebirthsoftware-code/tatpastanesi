// content/ klasöründeki (yönetim panelinden düzenlenen) dosyaları okuyup
// src/data/generated/content.json olarak birleştirir. Derleme ve geliştirme öncesi otomatik çalışır.
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

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

// "Trileçe (Porsiyon)" + "Trileçe (Kg)" → tek ürün, iki seçenek
const SUFFIX = /^(.*?)\s*\(([^)]+)\)\s*$/;
const grouped = [];
for (const it of items) {
  const tr = it.name.tr.match(SUFFIX);
  const en = it.name.en.match(SUFFIX);
  const base = { tr: tr ? tr[1] : it.name.tr, en: en ? en[1] : it.name.en };
  const enLabel = en ? en[2] : tr ? tr[2] : "";
  const variant = { key: it.key, label: { tr: tr ? tr[2] : "", en: /^kg$/i.test(enLabel) ? "Per kg" : enLabel }, price: it.price };
  const existing = tr && grouped.find((g) => g.category === it.category && g.name.tr === base.tr);
  if (existing) {
    existing.variants.push(variant);
    existing.featured ||= it.featured;
    existing.keys.push(it.key);
  } else {
    grouped.push({ ...it, name: tr ? base : it.name, variants: [variant], keys: [it.key] });
  }
}
for (const g of grouped) {
  g.price = Math.min(...g.variants.map((v) => v.price));
  if (g.variants.length === 1 && !g.variants[0].label.tr) g.variants = [];
}

// Fotoğraf yüklenirken gösterilecek küçük bulanık önizleme
const blurCache = new Map();
async function blur(src) {
  if (blurCache.has(src)) return blurCache.get(src);
  let data = "";
  try {
    const buf = await sharp(path.join("public", src)).resize(16).webp({ quality: 40 }).toBuffer();
    data = `data:image/webp;base64,${buf.toString("base64")}`;
  } catch {
    errors.push(`${src}: fotoğraf bulunamadı`);
  }
  blurCache.set(src, data);
  return data;
}
for (const g of grouped) g.blur = await blur(g.image);

const { flavors } = await read("content/flavors.json");
const { branches } = await read("content/branches.json");
const settings = await read("content/settings.json");
for (const b of branches) if (!/^\+90\d{10}$/.test(b.phone)) errors.push(`şube ${b.name}: telefon +905xxxxxxxxx biçiminde olmalı`);

if (errors.length) {
  console.error("İçerik hataları:\n- " + errors.join("\n- "));
  process.exit(1);
}

await mkdir("src/data/generated", { recursive: true });
await writeFile("src/data/generated/content.json", JSON.stringify({ items: grouped, flavors, branches, settings }, null, 1));
console.log(`İçerik hazır: ${grouped.length} ürün (${items.length} fiyat), ${flavors.length} dondurma çeşidi, ${branches.length} şube`);
