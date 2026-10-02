export const SITE = {
  name: "Tat Dondurma & Pastanesi",
  shortName: "Tat Pastanesi",
  url: "https://www.tatpastanesi.com",
  founded: 2001,
  menuUrl: "https://menu.tatpastanesi.com/",
  reviewsUrl:
    "https://www.google.com/maps/place/Tat+Dondurma+%26+Pastanesi/@39.9548,32.7588,15z/data=!4m8!3m7!1s0x14d349b5feadda8d:0x21f9c5dff71b0a24!8m2!3d39.9548!4d32.7588!9m1!1b1",
  description:
    "2001'den beri Ankara'da; Batıkent, Çakırlar, Bağlıca ve Eryaman şubelerimizde günlük taze yaş pasta, sütlü ve şerbetli tatlılar ile %100 doğal dondurma.",
} as const;

export const NAV = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/urunlerimiz/", label: "Ürünlerimiz" },
  { href: "/ozel-siparis/", label: "Özel Sipariş" },
  { href: "/subelerimiz/", label: "Şubelerimiz" },
  { href: "/hakkimizda/", label: "Hakkımızda" },
  { href: "/iletisim/", label: "İletişim" },
] as const;

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

export type Product = { name: string; image: string; note?: string };
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
        image: "/images/products/dondur.jpg",
        note: "Külah, kâğıt helva, cup ve paket seçenekleriyle; dilediğiniz çeşitleri birlikte seçin.",
      },
      {
        name: "Paket Dondurma",
        image: "/images/neden1.jpg",
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
        image: "/images/products/lotusch.jpg",
        note: "Her gün taze hazırlanan, vitrinimizde sizi bekleyen pastalar.",
      },
      {
        name: "Tasarım Pasta",
        image: "/images/products/sippas.jpg",
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
    cover: "/images/products/rumc.jpg",
    items: [
      { name: "Rumeli Çileklisi", image: "/images/products/rumc.jpg", note: "Misafirlerimizin favorisi." },
      { name: "Profiterol", image: "/images/products/profiterol.jpg" },
      { name: "Supangle", image: "/images/products/supangle.jpg" },
      { name: "Sütlaç", image: "/images/products/sutlac.jpg" },
      { name: "Keşkül", image: "/images/products/keskul.jpg" },
      { name: "İncirli Muhallebi", image: "/images/products/incir.jpg" },
      { name: "Spoonful", image: "/images/products/spon.jpg" },
      { name: "Çilekli Magnolya", image: "/images/products/cilmag.jpg" },
      { name: "Çikolatalı Magnolya", image: "/images/products/cikmag.jpg" },
      { name: "Fıstıklı Magnolya", image: "/images/products/fismag.jpg" },
      { name: "Orman Meyveli Magnolya", image: "/images/products/ormag.jpg" },
      { name: "Renkli Petibör", image: "/images/products/petr.jpg" },
      { name: "Meyveli Cup", image: "/images/products/meycup.jpg" },
      { name: "Tiramisu", image: "/images/products/tir.jpg" },
      { name: "Alman Pastası", image: "/images/products/almanp.jpg" },
      { name: "Beyaz Kremalı Muzlu Ankara Sarması", image: "/images/products/beyan.jpg" },
      { name: "Beyaz Kremalı Çilekli Ankara Sarması", image: "/images/products/ankarasarc.jpg" },
      { name: "Çikolatalı Muzlu Ankara Sarması", image: "/images/products/cikankara.jpg" },
      { name: "Kazandibi", image: "/images/products/kazan.jpg" },
      { name: "Trileçe", image: "/images/products/tril.jpg" },
      { name: "Brownie", image: "/images/products/brow.jpg" },
      { name: "Kıbrıs Tatlısı", image: "/images/products/kibris.jpg" },
      { name: "Ekler", image: "/images/products/ekler.jpg" },
      { name: "Acıbadem", image: "/images/products/acib.jpg" },
      { name: "Limonlu Cheesecake", image: "/images/products/lim.jpg" },
      { name: "Frambuazlı Cheesecake", image: "/images/products/fram.jpg" },
      { name: "Lotus Cheesecake", image: "/images/products/lotuschh.jpg" },
      { name: "Adet Pasta", image: "/images/products/moz.jpg" },
      { name: "Mozaik Pasta", image: "/images/products/mozaikkk.jpg" },
      { name: "Fıstıklı Soğuk Baklava", image: "/images/products/fissog.jpg" },
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
    cover: "/images/products/kurupass.jpg",
    items: [
      {
        name: "Kuru Pasta Çeşitleri",
        image: "/images/products/kurupass.jpg",
        note: "Vitrinimizden dilediğiniz çeşitleri seçin; misafirlik ve hediye için kutuda hazırlıyoruz.",
      },
    ],
  },
  {
    slug: "waffle",
    name: "Waffle",
    tagline: "Sıcak, taze, sizin seçiminiz",
    description: "Anında pişen waffle; dilediğiniz meyve, sos ve süslemelerle.",
    cover: "/images/products/waffle.jpg",
    items: [
      {
        name: "Waffle",
        image: "/images/products/waffle.jpg",
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
