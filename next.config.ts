import type { NextConfig } from "next";

// GitHub Pages önizlemesi için statik çıktı (GITHUB_PAGES=true ile derlenir).
// Vercel'de bu değişken yoktur; site normal şekilde çalışır.
// CUSTOM_DOMAIN tanımlıysa (örn. www.tatpastanesi.com) site alan adının kökünden yayınlanır.
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages && !process.env.CUSTOM_DOMAIN ? "/tatpastanesi" : "";

const nextConfig: NextConfig = {
  // Eski sitedeki URL'ler (/urunlerimiz/ vb.) aynen korunur; arama motoru sıralaması kaybolmaz.
  trailingSlash: true,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  ...(isPages
    ? {
        output: "export",
        basePath,
        images: {
          loader: "custom",
          loaderFile: "./src/lib/pages-image-loader.ts",
          deviceSizes: [640, 960, 1600],
          imageSizes: [160, 384],
        },
      }
    : {
        images: {
          formats: ["image/avif", "image/webp"],
          qualities: [70, 80],
        },
        // Yönetim paneli (public/admin/index.html)
        async rewrites() {
          return [
            { source: "/admin", destination: "/admin/index.html" },
            { source: "/admin/", destination: "/admin/index.html" },
          ];
        },
        async headers() {
          return [
            {
              source: "/images/:path*",
              headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
            },
          ];
        },
      }),
};

export default nextConfig;
