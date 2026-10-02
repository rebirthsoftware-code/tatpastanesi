import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import ProductCatalog from "@/components/ProductCatalog";
import { CATEGORIES, SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Ürünlerimiz – Pasta, Tatlı ve Dondurma",
  description:
    "Tat Pastanesi ürünleri: 31 çeşit doğal dondurma, günlük ve tasarım yaş pastalar, Rumeli çileklisi, magnolya, profiterol, baklava, kuru pasta ve waffle.",
  alternates: { canonical: "/urunlerimiz/" },
};

const menuJsonLd = {
  "@context": "https://schema.org",
  "@type": "Menu",
  name: `${SITE.name} Menüsü`,
  url: `${SITE.url}/urunlerimiz/`,
  hasMenuSection: CATEGORIES.map((c) => ({
    "@type": "MenuSection",
    name: c.name,
    description: c.description,
    hasMenuItem: c.items.map((p) => ({ "@type": "MenuItem", name: p.name, image: `${SITE.url}${p.image}` })),
  })),
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Şefin imzası"
        title={
          <>
            Koleksiyon <em className="text-gold-light">menüsü</em>
          </>
        }
        lead="Doğal malzemelerle, ustalarımızın ellerinden çıkan lezzetler. Her gün taze, her gün aynı özenle."
        image="/images/products/kurupass.jpg"
      />
      <ProductCatalog />
      <JsonLd data={menuJsonLd} />
    </>
  );
}
