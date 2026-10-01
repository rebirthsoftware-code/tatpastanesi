import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import MobileBar from "@/components/MobileBar";
import { BRANCHES, SITE, instagramLink } from "@/data/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});
const manrope = Manrope({ subsets: ["latin", "latin-ext"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Tat Pastanesi | 2001'den Beri Ankara'nın Pasta, Tatlı ve Dondurma Durağı",
    template: "%s | Tat Pastanesi",
  },
  description: SITE.description,
  keywords: [
    "Tat Pastanesi", "Tat Dondurma", "Ankara pastane", "Batıkent pastane", "Batıkent dondurma", "Bağlıca pastane",
    "Eryaman pastane", "Çakırlar tatlıcı", "yaş pasta siparişi Ankara", "tasarım pasta Ankara", "doğum günü pastası",
    "Rumeli çileklisi", "doğal dondurma",
  ],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE.url,
    siteName: SITE.shortName,
    title: "Tat Pastanesi | Geleneksel ve Premium Lezzetler",
    description: "Günlük taze pastalar, sütlü ve şerbetli tatlılar, %100 doğal dondurma. 2001'den beri Ankara'da.",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "Tat Pastanesi lezzetleri" }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.png", apple: "/apple-icon.png" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#1c120e",
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/images/tat-logo.png`,
  foundingDate: String(SITE.founded),
  sameAs: BRANCHES.map(instagramLink),
  subOrganization: BRANCHES.map((b) => ({
    "@type": "Bakery",
    name: `${SITE.name} – ${b.name}`,
    telephone: b.phone,
    address: { "@type": "PostalAddress", streetAddress: b.address, addressLocality: "Ankara", addressCountry: "TR" },
    openingHours: `Mo-Su ${b.open}-${b.close === "00:00" ? "24:00" : b.close}`,
    servesCuisine: ["Pasta", "Tatlı", "Dondurma"],
    priceRange: "₺₺",
    ...(b.image ? { image: `${SITE.url}${b.image}` } : {}),
    sameAs: instagramLink(b),
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>
        <a href="#icerik" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-cream focus:px-4 focus:py-2 focus:text-ink">
          İçeriğe geç
        </a>
        <Header />
        <main id="icerik">{children}</main>
        <Footer />
        <MobileBar />
        <JsonLd data={orgJsonLd} />
      </body>
    </html>
  );
}
