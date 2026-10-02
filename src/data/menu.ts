// Dijital menü ve fiyatlar. Fiyat değiştirmek için yalnızca "price" alanını güncelleyin
// ve PRICES_UPDATED tarihini değiştirin.

export type Lang = "tr" | "en";
export type MenuItem = {
  id: number;
  name: Record<Lang, string>;
  desc: Record<Lang, string>;
  price: number; // TL
  image: string;
  featured?: boolean;
};
export type MenuCategory = { slug: string; name: Record<Lang, string>; items: MenuItem[] };

export const PRICES_UPDATED = "2026-10-02";

export const formatPrice = (p: number, lang: Lang = "tr") =>
  lang === "tr" ? `${p.toLocaleString("tr-TR")} ₺` : `₺${p.toLocaleString("en-US")}`;

export const findMenuItem = (id?: number) => (id ? MENU.flatMap((c) => c.items).find((i) => i.id === id) : undefined);

export const MENU: MenuCategory[] = [
  {
    slug: "dondurma",
    name: { tr: "Dondurma", en: "Ice Cream" },
    items: [
      { id: 1, price: 60, name: { tr: "Dondurma (Kepçe)", en: "Ice Cream (Scoop)" }, desc: { tr: "Lezzetli ev yapımı dondurma", en: "Delicious homemade ice cream" }, image: "/images/menu/1.jpg", featured: true },
      { id: 2, price: 1000, name: { tr: "Dondurma (Kg)", en: "Ice Cream (Kg)" }, desc: { tr: "Kilo ile taze dondurma seçeneği", en: "Fresh ice cream by kg" }, image: "/images/menu/2.jpg" },
    ],
  },
  {
    slug: "yas-pasta",
    name: { tr: "Yaş Pasta", en: "Cakes" },
    items: [
      { id: 3, price: 900, name: { tr: "Tezgah Pasta", en: "Counter Cake" }, desc: { tr: "Günlük taze meyveli ve çikolatalı pastalar", en: "Fresh daily fruit and chocolate cakes" }, image: "/images/menu/3.jpg" },
      { id: 4, price: 1200, name: { tr: "Sipariş Pasta", en: "Order Cake" }, desc: { tr: "Özel günleriniz için tasarlanmış pastalar", en: "Custom cakes designed for your special days" }, image: "/images/products/sippas.jpg" },
      { id: 41, price: 300, name: { tr: "Çilekli Mois Adet Pasta", en: "Strawberry Moist Cake (Single Serving)" }, desc: { tr: "Çilekli, nemli keki ve hafif kremasıyla tek kişilik pasta", en: "Single-serving moist cake with strawberries and light cream" }, image: "/images/menu/41.jpg" },
      { id: 42, price: 300, name: { tr: "Tek Kişilik Pasta Çeşitleri", en: "Individual Cake Selection" }, desc: { tr: "Vitrinden seçeceğiniz tek kişilik pasta dilimleri", en: "Individual cake slices from our display" }, image: "/images/menu/42.jpg" },
    ],
  },
  {
    slug: "sutlu-tatlilar",
    name: { tr: "Sütlü Tatlılar", en: "Milk-Based Desserts" },
    items: [
      { id: 5, price: 200, name: { tr: "Profiterol", en: "Profiterole" }, desc: { tr: "Zengin çikolata soslu nefis profiterol", en: "Delicious profiterole with rich chocolate sauce" }, image: "/images/menu/5.jpg", featured: true },
      { id: 6, price: 200, name: { tr: "Supangle", en: "Supangle" }, desc: { tr: "Geleneksel çikolatalı supangle", en: "Traditional chocolate supangle" }, image: "/images/menu/6.jpg" },
      { id: 7, price: 200, name: { tr: "Sütlaç", en: "Rice Pudding" }, desc: { tr: "Fırınlanmış tam kıvamında sütlaç", en: "Perfectly baked rice pudding" }, image: "/images/menu/7.jpg" },
      { id: 8, price: 200, name: { tr: "Keşkül", en: "Keskul" }, desc: { tr: "Bademli geleneksel sütlü tatlı", en: "Traditional milk dessert with almonds" }, image: "/images/menu/8.jpg" },
      { id: 9, price: 200, name: { tr: "İncirli Muhallebi", en: "Fig Pudding" }, desc: { tr: "İncir taneli hafif muhallebi", en: "Light custard with fig pieces" }, image: "/images/menu/9.jpg" },
      { id: 10, price: 200, name: { tr: "Spoonful", en: "Spoonful" }, desc: { tr: "Kremalı kaşık tatlısı", en: "Creamy spoonful dessert" }, image: "/images/menu/10.jpg" },
      { id: 11, price: 200, name: { tr: "Çilekli Magnolya", en: "Strawberry Magnolia" }, desc: { tr: "Taze çilekli ve bisküvili magnolya", en: "Magnolia with fresh strawberries and biscuits" }, image: "/images/menu/11.jpg" },
      { id: 12, price: 200, name: { tr: "Çikolatalı Magnolya", en: "Chocolate Magnolia" }, desc: { tr: "Yoğun çikolatalı magnolya", en: "Rich chocolate magnolia" }, image: "/images/menu/12.jpg" },
      { id: 14, price: 200, name: { tr: "Orman Meyveli Magnolya", en: "Forest Fruit Magnolia" }, desc: { tr: "Yaban mersini ve orman meyveli magnolya", en: "Magnolia with blueberries and forest fruits" }, image: "/images/menu/14.jpg" },
      { id: 15, price: 180, name: { tr: "Renkli Petibör", en: "Petit Four" }, desc: { tr: "Minik lezzet patlamaları", en: "Little flavor bursts" }, image: "/images/menu/15.jpg" },
      { id: 16, price: 250, name: { tr: "Rumeli Çileklisi", en: "Rumeli Strawberry" }, desc: { tr: "Klasik Rumeli usulü çilekli tatlı", en: "Classic Rumeli style strawberry dessert" }, image: "/images/menu/16.jpg", featured: true },
      { id: 18, price: 200, name: { tr: "Tiramisu", en: "Tiramisu" }, desc: { tr: "Kahve aromalı İtalyan klasiği", en: "Italian classic with coffee aroma" }, image: "/images/menu/18.jpg" },
      { id: 19, price: 150, name: { tr: "Alman Pastası", en: "German Cake" }, desc: { tr: "Kremalı pofuduk Alman pastası", en: "Fluffy German cake with cream" }, image: "/images/menu/19.jpg" },
      { id: 20, price: 200, name: { tr: "Beyaz Kremalı Muzlu Ankara Sarması", en: "White Cream Banana Roll" }, desc: { tr: "Geleneksel yumuşak rulo tatlı", en: "Traditional soft roll dessert" }, image: "/images/products/beyan.jpg" },
      { id: 21, price: 200, name: { tr: "Beyaz Kremalı Çilekli Ankara Sarması", en: "White Cream Strawberry Roll" }, desc: { tr: "Taze çilekli yumuşak rulo", en: "Soft roll with fresh strawberries" }, image: "/images/products/ankarasarc.jpg" },
      { id: 22, price: 200, name: { tr: "Çikolatalı Muzlu Ankara Sarması", en: "Chocolate Banana Roll" }, desc: { tr: "Çikolata kremalı muzlu rulo", en: "Banana roll with chocolate cream" }, image: "/images/menu/22.jpg" },
      { id: 28, price: 200, name: { tr: "Kazandibi", en: "Kazandibi" }, desc: { tr: "Karamelize tabanıyla geleneksel fırın sütlü tatlı", en: "Traditional milk pudding with a caramelised base" }, image: "/images/menu/28.jpg" },
      { id: 29, price: 200, name: { tr: "Trileçe (Porsiyon)", en: "Trilece (Portion)" }, desc: { tr: "Üç sütle ıslatılmış hafif kek, karamel kaplama", en: "Light sponge soaked in three milks with caramel topping" }, image: "/images/menu/29.jpg" },
      { id: 30, price: 200, name: { tr: "Brownie (Porsiyon)", en: "Brownie (Portion)" }, desc: { tr: "Yoğun çikolatalı, içi yumuşak brownie", en: "Rich, fudgy chocolate brownie" }, image: "/images/menu/30.jpg" },
      { id: 31, price: 200, name: { tr: "Kıbrıs (Porsiyon)", en: "Cyprus Dessert (Portion)" }, desc: { tr: "İrmikli, fıstıklı ve kremalı Kıbrıs tatlısı", en: "Semolina dessert with pistachio and cream" }, image: "/images/menu/31.jpg" },
      { id: 32, price: 200, name: { tr: "Ekler (Porsiyon)", en: "Éclair (Portion)" }, desc: { tr: "Çikolata kaplı, kremalı ekler", en: "Cream-filled éclairs with chocolate glaze" }, image: "/images/menu/32.jpg" },
      { id: 33, price: 900, name: { tr: "Ekler (Kg)", en: "Éclairs (Per kg)" }, desc: { tr: "Çikolata kaplı, kremalı ekler — kiloyla", en: "Cream-filled éclairs with chocolate glaze — by kg" }, image: "/images/menu/33.jpg" },
      { id: 34, price: 250, name: { tr: "Fıstıklı Soğuk Baklava (Porsiyon)", en: "Cold Pistachio Baklava (Portion)" }, desc: { tr: "Sütlü şerbetli, bol Antep fıstıklı soğuk baklava", en: "Cold milk-syrup baklava with plenty of pistachio" }, image: "/images/menu/34.jpg", featured: true },
      { id: 35, price: 1100, name: { tr: "Fıstıklı Soğuk Baklava (Kg)", en: "Cold Pistachio Baklava (Per kg)" }, desc: { tr: "Bol Antep fıstıklı soğuk baklava — kiloyla", en: "Cold pistachio baklava — by kg" }, image: "/images/menu/35.jpg" },
      { id: 36, price: 800, name: { tr: "Kıbrıs (Kg)", en: "Cyprus Dessert (Per kg)" }, desc: { tr: "İrmikli, fıstıklı Kıbrıs tatlısı — kiloyla", en: "Semolina pistachio dessert — by kg" }, image: "/images/menu/36.jpg" },
      { id: 37, price: 800, name: { tr: "Brownie (Kg)", en: "Brownie (Per kg)" }, desc: { tr: "Yoğun çikolatalı brownie — kiloyla", en: "Rich chocolate brownie — by kg" }, image: "/images/menu/37.jpg" },
      { id: 38, price: 800, name: { tr: "Trileçe (Kg)", en: "Trilece (Per kg)" }, desc: { tr: "Karamel kaplı trileçe — kiloyla", en: "Caramel-topped trileçe — by kg" }, image: "/images/menu/38.jpg" },
      { id: 39, price: 250, name: { tr: "Çikolatalı Muzlu Malaga", en: "Chocolate Banana Malaga Cake" }, desc: { tr: "Çikolata ve muzla hazırlanan Malaga pasta", en: "Malaga cake with chocolate and banana" }, image: "/images/menu/39.jpg" },
      { id: 40, price: 250, name: { tr: "Beyaz Muzlu Malaga", en: "White Chocolate Banana Malaga Cake" }, desc: { tr: "Beyaz krema ve muzla hazırlanan Malaga pasta", en: "Malaga cake with white cream and banana" }, image: "/images/menu/40.jpg" },
      { id: 43, price: 200, name: { tr: "Limonlu Cheesecake", en: "Lemon Cheesecake" }, desc: { tr: "Limon kreması ile ferah cheesecake", en: "Refreshing cheesecake with lemon cream" }, image: "/images/menu/43.jpg" },
    ],
  },
  {
    slug: "kuru-pasta",
    name: { tr: "Kuru Pasta", en: "Cookies" },
    items: [
      { id: 23, price: 200, name: { tr: "Kuru Pasta (Porsiyon)", en: "Cookies (Portion)" }, desc: { tr: "Karışık taze kuru pastalar", en: "Assorted fresh cookies" }, image: "/images/menu/23.jpg" },
      { id: 24, price: 800, name: { tr: "Kuru Pasta (Kg)", en: "Cookies (Kg)" }, desc: { tr: "Kilo ile lezzetli kuru pastalar", en: "Fresh cookies by kg" }, image: "/images/menu/24.jpg" },
    ],
  },
  {
    slug: "waffle",
    name: { tr: "Waffle", en: "Waffle" },
    items: [
      { id: 25, price: 300, name: { tr: "Waffle", en: "Waffle" }, desc: { tr: "Bol meyveli ve çikolatalı waffle", en: "Waffle with plenty of fruit and chocolate" }, image: "/images/menu/25.jpg", featured: true },
    ],
  },
  {
    slug: "icecekler",
    name: { tr: "İçecekler", en: "Beverages" },
    items: [
      { id: 26, price: 90, name: { tr: "Türk Kahvesi", en: "Turkish Coffee" }, desc: { tr: "Geleneksel közde Türk kahvesi", en: "Traditional roasted Turkish coffee" }, image: "/images/menu/26.jpg" },
      { id: 27, price: 50, name: { tr: "Demleme Çay", en: "Brewed Tea" }, desc: { tr: "Taze demlenmiş Rize çayı", en: "Freshly brewed Rize tea" }, image: "/images/menu/27.jpg" },
    ],
  },
];
