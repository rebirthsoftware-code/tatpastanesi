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
  instagram: string;
  image?: string;
  mapsQuery: string;
  open: string;
  close: string;
};

export const BRANCHES: Branch[] = [
  {
    slug: "batikent",
    name: "Batıkent",
    district: "Yenimahalle",
    address: "Kentkoop Mahallesi, 1865. Cadde No:13/B, 06220 Batıkent / Ankara",
    phoneDisplay: "0554 172 78 08",
    phone: "+905541727808",
    instagram: "tatpastanesi.batikent",
    image: "/images/batikent.jpg",
    mapsQuery: "Tat Dondurma Pastanesi Kentkoop Mahallesi 1865. Cadde 13/B Batıkent Ankara",
    open: "09:00",
    close: "00:00",
  },
  {
    slug: "cakirlar",
    name: "Çakırlar",
    district: "Yenimahalle",
    address: "Turgut Özal Mah. 2179. Sk. No:6 D:F, 06370 Batıkent - Yenimahalle / Ankara",
    phoneDisplay: "0536 631 50 11",
    phone: "+905366315011",
    instagram: "tatdondurma_cakirlar",
    image: "/images/cakirlar.jpg",
    mapsQuery: "Tat Dondurma Pastanesi 2179. Sk. No:6 Batıkent Yenimahalle Ankara",
    open: "09:00",
    close: "00:00",
  },
  {
    slug: "baglica",
    name: "Bağlıca",
    district: "Etimesgut",
    address: "Mermeroğlu Caddesi No:61/5, 06790 Bağlıca / Etimesgut / Ankara",
    phoneDisplay: "0501 123 55 06",
    phone: "+905011235506",
    instagram: "tatpastanesi.baglica",
    image: "/images/baglica.jpg",
    mapsQuery: "Tat Dondurma Pastanesi Mermeroğlu Caddesi 61 Bağlıca Etimesgut Ankara",
    open: "09:00",
    close: "00:00",
  },
  {
    slug: "eryaman-concept",
    name: "Eryaman Concept",
    district: "Etimesgut",
    address: "Yavuz Selim Mah. 11. Cadde 618. Sokak Concept Çarşı 7A/1, Eryaman / Etimesgut / Ankara",
    phoneDisplay: "0543 684 56 72",
    phone: "+905436845672",
    instagram: "tatdondurmaeryaman",
    mapsQuery: "Concept Çarşı 7A/1 Yavuz Selim Mahallesi Eryaman Etimesgut Ankara",
    open: "09:00",
    close: "00:00",
  },
  {
    slug: "eryaman-rada-park",
    name: "Eryaman Rada Park",
    district: "Etimesgut",
    address: "Eryaman Mah. 271. Cadde, Rada Park AVM No:3, Etimesgut / Ankara",
    phoneDisplay: "0501 370 19 06",
    phone: "+905013701906",
    instagram: "tat_dondurma_eryaman_5",
    mapsQuery: "Rada Park AVM Eryaman Etimesgut Ankara",
    open: "09:00",
    close: "00:00",
  },
];

export const mapsLink = (b: Branch) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.mapsQuery)}`;
export const mapsEmbed = (b: Branch) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(b.mapsQuery)}&z=16&output=embed`;
export const instagramLink = (b: Branch) => `https://www.instagram.com/${b.instagram}/`;
export const whatsappLink = (b: Branch, text?: string) =>
  `https://wa.me/${b.phone.replace("+", "")}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export type Product = { name: string; image: string; note?: string; menuId?: number };
export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  cover: string;
  items: Product[];
  varieties?: { title: string; list: string[] };
};

export const CATEGORIES: Category[] = [
  {
    slug: "dondurma",
    name: "Dondurma",
    tagline: "31 çeşit, %100 doğal",
    description:
      "Taze meyve ve gerçek malzemelerle her gün üretilen imza dondurmalarımız; külah, kâğıt helva, cup ve paket seçenekleriyle.",
    cover: "/images/neden3.jpg",
    items: [
      {
        name: "Tat Dondurma",
        image: "/images/products/dondur.jpg", menuId: 1,
        note: "Külah, kâğıt helva, cup ve paket seçenekleriyle; dilediğiniz çeşitleri birlikte seçin.",
      },
      {
        name: "Paket Dondurma",
        image: "/images/neden1.jpg", menuId: 2,
        note: "Evinize, sofranıza, kutlamalarınıza; istediğiniz çeşitlerle doldurulan paketler.",
      },
    ],
    varieties: {
      title: "Dondurma Çeşitlerimiz",
      list: [
        "Sade", "Çikolata", "İtalyan Karameli", "Tahin", "Böğürtlen", "Portakal", "Kokteyl", "Bal Badem",
        "Ceviz", "İncir", "Muz", "Kestane", "Damla Sakız", "Damla Çikolata", "Antep Fıstığı", "Karamel",
        "Nero", "Bitter", "Hindistan Cevizi", "Lotus", "Çilek", "Limon", "Vişne", "Şeftali", "Mandalina",
        "Karadut", "Yeşil Elma", "Frenk Üzümü", "Yaban Mersini", "Atom", "Mango",
      ],
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
        image: "/images/products/lotusch.jpg", menuId: 3,
        note: "Her gün taze hazırlanan, vitrinimizde sizi bekleyen pastalar.",
      },
      {
        name: "Tasarım Pasta",
        image: "/images/products/sippas.jpg", menuId: 4,
        note: "Beğendiğiniz modeli, dilediğiniz fotoğraf ve yazıyla size özel bir tasarıma dönüştürüyoruz.",
      },
      {
        name: "Şeker Hamurlu Tasarım Pasta",
        image: "/images/products/sekerpas.jpg", menuId: 4,
        note: "Şeker hamuru figürler ve özel detaylarla doğum günü, nişan ve kutlamalara özel pastalar.",
      },
      {
        name: "Doğum Günü Pastası",
        image: "/images/robloxp.jpg", menuId: 4,
        note: "Çocuğunuzun sevdiği karakterle, adına özel hazırlanan pastalar.",
      },
      {
        name: "Çilekli Mois Adet Pasta",
        image: "/images/menu/41.jpg",
        menuId: 41,
        note: "Çilekli, nemli keki ve hafif kremasıyla tek kişilik pasta.",
      },
      {
        name: "Tek Kişilik Pastalar",
        image: "/images/menu/42.jpg",
        menuId: 42,
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
      { name: "Rumeli Çileklisi", image: "/images/menu/16.jpg", menuId: 16, note: "Misafirlerimizin favorisi." },
      { name: "Profiterol", menuId: 5, image: "/images/products/profiterol.jpg" },
      { name: "Supangle", menuId: 6, image: "/images/products/supangle.jpg" },
      { name: "Sütlaç", menuId: 7, image: "/images/products/sutlac.jpg" },
      { name: "Keşkül", menuId: 8, image: "/images/products/keskul.jpg" },
      { name: "İncirli Muhallebi", menuId: 9, image: "/images/products/incir.jpg" },
      { name: "Spoonful", menuId: 10, image: "/images/products/spon.jpg" },
      { name: "Çilekli Magnolya", menuId: 11, image: "/images/products/cilmag.jpg" },
      { name: "Çikolatalı Magnolya", menuId: 12, image: "/images/products/cikmag.jpg" },
      { name: "Fıstıklı Magnolya", image: "/images/products/fismag.jpg" },
      { name: "Orman Meyveli Magnolya", menuId: 14, image: "/images/products/ormag.jpg" },
      { name: "Renkli Petibör", menuId: 15, image: "/images/products/petr.jpg" },
      { name: "Meyveli Cup", image: "/images/products/meycup.jpg" },
      { name: "Tiramisu", menuId: 18, image: "/images/products/tir.jpg" },
      { name: "Alman Pastası", menuId: 19, image: "/images/products/almanp.jpg" },
      { name: "Beyaz Kremalı Muzlu Ankara Sarması", menuId: 20, image: "/images/products/beyan.jpg" },
      { name: "Beyaz Kremalı Çilekli Ankara Sarması", menuId: 21, image: "/images/products/ankarasarc.jpg" },
      { name: "Çikolatalı Muzlu Ankara Sarması", menuId: 22, image: "/images/products/cikankara.jpg" },
      { name: "Kazandibi", menuId: 28, image: "/images/products/kazan.jpg" },
      { name: "Trileçe", menuId: 29, image: "/images/products/tril.jpg" },
      { name: "Brownie", menuId: 30, image: "/images/products/brow.jpg" },
      { name: "Kıbrıs Tatlısı", menuId: 31, image: "/images/products/kibris.jpg" },
      { name: "Ekler", menuId: 32, image: "/images/products/ekler.jpg" },
      { name: "Acıbadem", image: "/images/products/acib.jpg" },
      { name: "Limonlu Cheesecake", menuId: 43, image: "/images/products/lim.jpg" },
      { name: "Frambuazlı Cheesecake", image: "/images/products/fram.jpg" },
      { name: "Lotus Cheesecake", image: "/images/products/lotuschh.jpg" },
      { name: "Adet Pasta", image: "/images/products/moz.jpg" },
      { name: "Mozaik Pasta", image: "/images/products/mozaikkk.jpg" },
      { name: "Çikolatalı Muzlu Malaga", image: "/images/menu/39.jpg", menuId: 39 },
      { name: "Beyaz Muzlu Malaga", image: "/images/menu/40.jpg", menuId: 40 },
      { name: "Fıstıklı Soğuk Baklava", menuId: 34, image: "/images/products/fissog.jpg" },
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
        image: "/images/menu/23.jpg", menuId: 23,
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
        image: "/images/menu/25.jpg", menuId: 25,
        note: "Dilediğiniz meyve, sos ve süsleme seçenekleriyle taze hazırlanır.",
      },
    ],
  },
];

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

/** "Külahını oluştur" bölümünde dondurma toplarının renkleri. */
export const FLAVOR_COLORS: Record<string, string> = {
  Sade: "#f6eedc", Çikolata: "#5a3222", "İtalyan Karameli": "#c98a3d", Tahin: "#d8b98c", Böğürtlen: "#7b2f5b",
  Portakal: "#f39a3b", Kokteyl: "#f2a7b8", "Bal Badem": "#e9c98a", Ceviz: "#a57a52", İncir: "#8e5a6e", Muz: "#f5e39a",
  Kestane: "#8a5a3b", "Damla Sakız": "#fbf7ef", "Damla Çikolata": "#efe4d2", "Antep Fıstığı": "#9cb86a", Karamel: "#b8743a",
  Nero: "#2b1a14", Bitter: "#3d2219", "Hindistan Cevizi": "#fffaf2", Lotus: "#c58b52", Çilek: "#f07a8c", Limon: "#f7ea8a",
  Vişne: "#9e1f3a", Şeftali: "#f8b98a", Mandalina: "#f7a24a", Karadut: "#4b1e3f", "Yeşil Elma": "#b9d97a",
  "Frenk Üzümü": "#6a2148", "Yaban Mersini": "#5a4a9a", Atom: "#7ec8e8", Mango: "#f8c24a",
};
