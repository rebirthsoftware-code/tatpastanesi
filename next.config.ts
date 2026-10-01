import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Eski sitedeki URL'ler (/urunlerimiz/ vb.) aynen korunur; arama motoru sıralaması kaybolmaz.
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 80],
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
};

export default nextConfig;
