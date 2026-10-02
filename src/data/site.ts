import content from "./generated/content.json";
import { findMenuItem } from "./menu";

export const SITE = {
  name: "Tat Dondurma & Pastanesi",
  shortName: "Tat Pastanesi",
  url: "https://www.tatpastanesi.com",
  founded: 2001,
  menuUrl: "/menu/",
  reviewsUrl:
    "https://www.google.com/maps/place/Tat+Dondurma+%26+Pastanesi/@39.9548,32.7588,15z/data=!4m8!3m7!1s0x14d349b5feadda8d:0x21f9c5dff71b0a24!8m2!3d39.9548!4d32.7588!9m1!1b1",
  description:
    "2001'den beri Ankara'da; Batıkent, Çakırlar, Bağlıca ve Eryaman şubelerimizde günlük taze yaş pasta, sütlü ve şerbetli tatlılar ile %100 doğal dondurma.",
} as const;

// desktop: false → yalnızca mobil menüde ve alt bilgide görünür
export const NAV: { href: string; label: string; hint: string; desktop?: boolean }[] = [
  { href: "/", label: "Ana Sayfa", hint: "Hoş geldiniz", desktop: false },
  { href: "/urunlerimiz/", label: "Ürünlerimiz", hint: "Pasta, tatlı, dondurma" },
  { href: "/menu/", label: "Menü & Fiyatlar", hint: "Güncel fiyat listesi", desktop: false },
  { href: "/ozel-siparis/", label: "Özel Sipariş", hint: "Tasarım ve doğum günü pastası" },
  { href: "/subelerimiz/", label: "Şubelerimiz", hint: "5 şube, yol tarifi" },
  { href: "/hakkimizda/", label: "Hakkımızda", hint: "2001'den bugüne" },
  { href: "/iletisim/", label: "İletişim", hint: "Telefon, WhatsApp, Instagram" },
];

export type Branch = {
  slug: string;
  name: string;
  district: string;
  address: string;
  phoneDisplay: string;
  phone: string; // E.164
  image?: string;
  mapsQuery: string;
  open: string;
  close: string;
};

/** Şubeler yönetim panelinden (content/branches.json) düzenlenir. */
export const BRANCHES: Branch[] = content.branches.map((b) => ({
  slug: b.slug,
  name: b.name,
  district: b.district,
  address: b.address,
  phoneDisplay: b.phone_display,
  phone: b.phone,
  image: b.image || undefined,
  mapsQuery: b.maps_query,
  open: b.open,
  close: b.close,
}));

/** Site ayarları (Instagram, giriş videosu vb.) yönetim panelinden düzenlenir. */
export const SETTINGS = content.settings;
export const INSTAGRAM_URL = `https://www.instagram.com/${SETTINGS.instagram}/`;

export const mapsLink = (b: Branch) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.mapsQuery)}`;
export const mapsEmbed = (b: Branch) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(b.mapsQuery)}&z=16&output=embed`;
export const whatsappLink = (b: Branch, text?: string) =>
  `https://wa.me/${b.phone.replace("+", "")}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export type Product = { name: string; image: string; note?: string; menuKey?: string };
export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  cover: string;
  items: Product[];
  varieties?: { title: string; list: string[] };
};

const CATEGORY_LIST: Category[] = [
  {
    slug: "dondurma",
    name: "Dondurma",
    tagline: "Onlarca çeşit, %100 doğal",
    description:
      "Taze meyve ve gerçek malzemelerle her gün üretilen imza dondurmalarımız; külah, kâğıt helva, cup ve paket seçenekleriyle.",
    cover: "/images/neden3.jpg",
    items: [
      {
        name: "Tat Dondurma",
        image: "/images/products/dondur.jpg", menuKey: "dondurma-kepce",
        note: "Külah, kâğıt helva, cup ve paket seçenekleriyle; dilediğiniz çeşitleri birlikte seçin.",
      },
      {
        name: "Paket Dondurma",
        image: "/images/neden1.jpg", menuKey: "dondurma-kg",
        note: "Evinize, sofranıza, kutlamalarınıza; istediğiniz çeşitlerle doldurulan paketler.",
      },
    ],
    varieties: {
      title: "Dondurma Çeşitlerimiz",
      get list() {
        return FLAVORS.map((f) => f.name);
      },
    },
  },
  {
    slug: "yas-pasta",
    name: "Yaş Pasta",
    tagline: "Günlük ve tasarım",
    description:
      "Vitrinimizde her gün taze hazırlanan pastalar ve hayalinizdeki modele göre yapılan kişiye özel tasarım pastalar.",
    cover: "/images/robloxp.jpg",
    items: [
      {
        name: "Günlük Pasta",
        image: "/images/products/lotusch.jpg", menuKey: "tezgah-pasta",
        note: "Her gün taze hazırlanan, vitrinimizde sizi bekleyen pastalar.",
      },
      {
        name: "Tasarım Pasta",
        image: "/images/products/sippas.jpg", menuKey: "siparis-pasta",
        note: "Beğendiğiniz modeli, dilediğiniz fotoğraf ve yazıyla size özel bir tasarıma dönüştürüyoruz.",
      },
      {
        name: "Şeker Hamurlu Tasarım Pasta",
        image: "/images/products/sekerpas.jpg",
        note: "Şeker hamuru figürler ve özel detaylarla doğum günü, nişan ve kutlamalara özel pastalar.",
      },
      {
        name: "Doğum Günü Pastası",
        image: "/images/robloxp.jpg",
        note: "Çocuğunuzun sevdiği karakterle, adına özel hazırlanan pastalar.",
      },
      {
        name: "Çilekli Mois Adet Pasta",
        image: "/images/menu/41.jpg",
        menuKey: "cilekli-mois-adet-pasta",
        note: "Çilekli, nemli keki ve hafif kremasıyla tek kişilik pasta.",
      },
      {
        name: "Tek Kişilik Pastalar",
        image: "/images/menu/42.jpg",
        menuKey: "tek-kisilik-pasta-cesitleri",
        note: "Vitrinimizden seçeceğiniz tek kişilik pasta dilimleri.",
      },
    ],
    varieties: {
      title: "Pasta Çeşitlerimiz",
      list: [
        "Çilekli", "Frambuazlı", "Vişneli", "Damla Çikolatalı", "Parça Çikolatalı", "Muzlu", "Kestaneli",
        "Draje Fıstıklı", "Lotuslu", "Meyveli", "Krokanlı",
      ],
    },
  },
  {
    slug: "sutlu-tatlilar",
    name: "Sütlü Tatlılar",
    tagline: "Klasikler ve cheesecake'ler",
    description:
      "Profiterolden Rumeli çileklisine, magnolyalardan cheesecake'lere; günlük taze sütle hazırlanan tatlılar.",
    cover: "/images/menu/16.jpg",
    items: [
      { name: "Rumeli Çileklisi", image: "/images/menu/16.jpg", menuKey: "rumeli-cileklisi", note: "Misafirlerimizin favorisi." },
      { name: "Profiterol", menuKey: "profiterol", image: "/images/products/profiterol.jpg" },
      { name: "Supangle", menuKey: "supangle", image: "/images/products/supangle.jpg" },
      { name: "Sütlaç", menuKey: "sutlac", image: "/images/products/sutlac.jpg" },
      { name: "Keşkül", menuKey: "keskul", image: "/images/products/keskul.jpg" },
      { name: "İncirli Muhallebi", menuKey: "incirli-muhallebi", image: "/images/products/incir.jpg" },
      { name: "Spoonful", menuKey: "spoonful", image: "/images/products/spon.jpg" },
      { name: "Çilekli Magnolya", menuKey: "cilekli-magnolya", image: "/images/products/cilmag.jpg" },
      { name: "Çikolatalı Magnolya", menuKey: "cikolatali-magnolya", image: "/images/products/cikmag.jpg" },
      { name: "Fıstıklı Magnolya", image: "/images/products/fismag.jpg" },
      { name: "Orman Meyveli Magnolya", menuKey: "orman-meyveli-magnolya", image: "/images/products/ormag.jpg" },
      { name: "Renkli Petibör", menuKey: "renkli-petibor", image: "/images/products/petr.jpg" },
      { name: "Meyveli Cup", image: "/images/products/meycup.jpg" },
      { name: "Tiramisu", menuKey: "tiramisu", image: "/images/products/tir.jpg" },
      { name: "Alman Pastası", menuKey: "alman-pastasi", image: "/images/products/almanp.jpg" },
      { name: "Beyaz Kremalı Muzlu Ankara Sarması", menuKey: "beyaz-kremali-muzlu-ankara-sarmasi", image: "/images/products/beyan.jpg" },
      { name: "Beyaz Kremalı Çilekli Ankara Sarması", menuKey: "beyaz-kremali-cilekli-ankara-sarmasi", image: "/images/products/ankarasarc.jpg" },
      { name: "Çikolatalı Muzlu Ankara Sarması", menuKey: "cikolatali-muzlu-ankara-sarmasi", image: "/images/products/cikankara.jpg" },
      { name: "Kazandibi", menuKey: "kazandibi", image: "/images/products/kazan.jpg" },
      { name: "Trileçe", menuKey: "trilece-porsiyon", image: "/images/products/tril.jpg" },
      { name: "Brownie", menuKey: "brownie-porsiyon", image: "/images/products/brow.jpg" },
      { name: "Kıbrıs Tatlısı", menuKey: "kibris-porsiyon", image: "/images/products/kibris.jpg" },
      { name: "Ekler", menuKey: "ekler-porsiyon", image: "/images/products/ekler.jpg" },
      { name: "Acıbadem", image: "/images/products/acib.jpg" },
      { name: "Limonlu Cheesecake", menuKey: "limonlu-cheesecake", image: "/images/products/lim.jpg" },
      { name: "Frambuazlı Cheesecake", image: "/images/products/fram.jpg" },
      { name: "Lotus Cheesecake", image: "/images/products/lotuschh.jpg" },
      { name: "Adet Pasta", image: "/images/products/moz.jpg" },
      { name: "Mozaik Pasta", image: "/images/products/mozaikkk.jpg" },
      { name: "Çikolatalı Muzlu Malaga", image: "/images/menu/39.jpg", menuKey: "cikolatali-muzlu-malaga" },
      { name: "Beyaz Muzlu Malaga", image: "/images/menu/40.jpg", menuKey: "beyaz-muzlu-malaga" },
      { name: "Fıstıklı Soğuk Baklava", menuKey: "fistikli-soguk-baklava-porsiyon", image: "/images/products/fissog.jpg" },
    ],
  },
  {
    slug: "serbetli-tatlilar",
    name: "Şerbetli Tatlılar",
    tagline: "El açması, bol fıstıklı",
    description: "İncecik el açması yufka, bol Antep fıstığı ve kıvamında şerbetle geleneksel lezzetler.",
    cover: "/images/products/baklava.jpg",
    items: [
      { name: "Fıstıklı Baklava", image: "/images/products/baklava.jpg" },
      { name: "Cevizli Baklava", image: "/images/products/baklava.jpg" },
      { name: "Fıstık Sarma", image: "/images/products/baklava.jpg" },
      { name: "Fıstıklı Şöbiyet", image: "/images/products/baklava.jpg" },
      { name: "Fıstıklı Havuç Dilimi", image: "/images/products/baklava.jpg" },
      { name: "Fıstıklı Midye", image: "/images/products/baklava.jpg" },
    ],
  },
  {
    slug: "kuru-pasta",
    name: "Kuru Pasta",
    tagline: "Çay saatinin yıldızı",
    description: "Tuzlu ve tatlı, birbirinden farklı çeşitlerle günlük taze kuru pastalar; gramajla veya kutuda.",
    cover: "/images/menu/23.jpg",
    items: [
      {
        name: "Kuru Pasta Çeşitleri",
        image: "/images/menu/23.jpg", menuKey: "kuru-pasta-porsiyon",
        note: "Vitrinimizden dilediğiniz çeşitleri seçin; misafirlik ve hediye için kutuda hazırlıyoruz.",
      },
    ],
  },
  {
    slug: "waffle",
    name: "Waffle",
    tagline: "Sıcak, taze, sizin seçiminiz",
    description: "Anında pişen waffle; dilediğiniz meyve, sos ve süslemelerle.",
    cover: "/images/menu/25.jpg",
    items: [
      {
        name: "Waffle",
        image: "/images/menu/25.jpg", menuKey: "waffle",
        note: "Dilediğiniz meyve, sos ve süsleme seçenekleriyle taze hazırlanır.",
      },
    ],
  },
];

/** Menüde karşılığı olan ürünler, panelde güncellenen menü fotoğrafını kullanır. */
export const CATEGORIES: Category[] = CATEGORY_LIST.map((c) => ({
  ...c,
  items: c.items.map((p) => ({ ...p, image: findMenuItem(p.menuKey)?.image ?? p.image })),
}));

export const REVIEWS = [
  {
    author: "Gülçin Biber",
    text: "Rumeli çileklisi diye bir tatlıları var. Uzun zamandır dışarıda yediğim en iyi tatlıydı, çok lezzetliydi. Diğer tatlıları da denemeye en kısa sürede yine gideceğim.",
  },
  {
    author: "Sevilay Arı",
    text: "Her zaman sipariş veriyorum, hiç pişman olmadım; her şey her zaman çok taze ve lezzetli. Ankara'da en sevdiğim pastane net. Her yaz dondurmalarının bağımlısı oluyorum.",
  },
  {
    author: "Kaan",
    text: "Ankara'nın en iyi dondurmacılarından biri. Temiz ve kaliteli bir işletme, çalışanlar ilgili ve güler yüzlü, servis hızlı. Bal badem, karamel, sade, portakallı çikolata gayet güzel.",
  },
];

export const STATS = [
  { value: 2001, suffix: "", label: "Kuruluş yılı" },
  { value: 100, prefix: "%", suffix: "", label: "Doğal malzeme" },
  { value: 500, suffix: "+", label: "Günlük taze ürün" },
  { value: 50, suffix: "B+", label: "Mutlu misafir" },
];

/** Dondurma çeşitleri ve top renkleri yönetim panelinden (content/flavors.json) düzenlenir. */
export const FLAVORS: { name: string; color: string }[] = content.flavors;
export const FLAVOR_COLORS: Record<string, string> = Object.fromEntries(FLAVORS.map((f) => [f.name, f.color]));
