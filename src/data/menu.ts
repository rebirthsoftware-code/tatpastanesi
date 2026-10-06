// Menü verisi yönetim panelinden (content/menu/*.json) gelir; burada yalnızca kategoriler ve yardımcılar var.
import content from "./generated/content.json";

export type Lang = "tr" | "en";
export type MenuVariant = { key: string; label: Record<Lang, string>; price: number };
export type MenuItem = {
  key: string;
  keys: string[]; // birleştirilen seçeneklerin dosya adları
  variants: MenuVariant[]; // Porsiyon / Kg gibi seçenekler (yoksa boş)
  tone: string; // fotoğraf yüklenirken gösterilen baskın renk
  category: string;
  price: number; // TL (seçenekli ürünlerde en düşük fiyat)
  name: Record<Lang, string>;
  desc: Record<Lang, string>;
  ingredients: Record<Lang, string>;
  calories: number | null; // kcal / porsiyon
  allergens: string[];
  image: string;
  featured: boolean;
};
export type MenuCategory = { slug: string; name: Record<Lang, string>; cover: string; items: MenuItem[] };

const CATEGORY_DEFS: Omit<MenuCategory, "items">[] = [
  { slug: "dondurma", name: { tr: "Dondurma", en: "Ice Cream" }, cover: "/images/covers/dondurma-vitrini.jpg" },
  { slug: "yas-pasta", name: { tr: "Yaş Pasta", en: "Cakes" }, cover: "/images/covers/pasta-vitrini.jpg" },
  { slug: "sutlu-tatlilar", name: { tr: "Sütlü Tatlılar", en: "Milk Desserts" }, cover: "/images/menu/16.jpg" },
  { slug: "serbetli-tatlilar", name: { tr: "Şerbetli Tatlılar", en: "Syrup Desserts" }, cover: "/images/products/baklava.jpg" },
  { slug: "kuru-pasta", name: { tr: "Kuru Pasta", en: "Cookies" }, cover: "/images/menu/23.jpg" },
  { slug: "waffle", name: { tr: "Waffle", en: "Waffle" }, cover: "/images/covers/waffle-tabak.jpg" },
  { slug: "icecekler", name: { tr: "İçecekler", en: "Beverages" }, cover: "/images/menu/26.jpg" },
];

const ITEMS = content.items as MenuItem[];

/** Ürünü olmayan kategoriler menüde gösterilmez. */
export const MENU: MenuCategory[] = CATEGORY_DEFS.map((c) => ({ ...c, items: ITEMS.filter((i) => i.category === c.slug) })).filter(
  (c) => c.items.length,
);

/** Türkiye'de beyanı zorunlu 14 alerjen (panelde aynı liste kullanılır). */
export const ALLERGENS: Record<string, Record<Lang, string>> = {
  gluten: { tr: "Gluten", en: "Gluten" },
  sut: { tr: "Süt", en: "Milk" },
  yumurta: { tr: "Yumurta", en: "Egg" },
  "sert-kabuklu": { tr: "Sert kabuklu yemiş", en: "Tree nuts" },
  "yer-fistigi": { tr: "Yer fıstığı", en: "Peanut" },
  soya: { tr: "Soya", en: "Soy" },
  susam: { tr: "Susam", en: "Sesame" },
  sulfit: { tr: "Sülfit", en: "Sulphites" },
  balik: { tr: "Balık", en: "Fish" },
  kabuklular: { tr: "Kabuklular", en: "Crustaceans" },
  yumusakcalar: { tr: "Yumuşakçalar", en: "Molluscs" },
  kereviz: { tr: "Kereviz", en: "Celery" },
  hardal: { tr: "Hardal", en: "Mustard" },
  "aci-bakla": { tr: "Acı bakla", en: "Lupin" },
};

export const formatPrice = (p: number, lang: Lang = "tr") =>
  lang === "tr" ? `${p.toLocaleString("tr-TR")} ₺` : `₺${p.toLocaleString("en-US")}`;

export const findMenuItem = (key?: string) => (key ? ITEMS.find((i) => i.keys.includes(key)) : undefined);

/** Ürünlerimiz sayfası için: dosya adına karşılık gelen fiyat ve (varsa) seçenek adı. */
export function menuPrice(key?: string) {
  const item = findMenuItem(key);
  if (!item) return undefined;
  const v = item.variants.find((x) => x.key === key);
  return { price: v?.price ?? item.price, label: v?.label.tr ?? "", name: item.name.tr };
}
