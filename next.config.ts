import type { NextConfig } from "next";

// GitHub Pages önizlemesi için statik çıktı (GITHUB_PAGES=true ile derlenir).
// Vercel'de bu değişken yoktur; site normal şekilde çalışır.
// CUSTOM_DOMAIN tanımlıysa (örn. www.tatpastanesi.com) site alan adının kökünden yayınlanır.
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages && !process.env.CUSTOM_DOMAIN ? "/tatpastanesi" : "";

// QR menünün alt alan adı (Vercel'de alan adı bağlandığında geçerli olur)
const MENU_HOST = "menu.tatpastanesi.com";

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
          return {
            beforeFiles: [
              // menu.tatpastanesi.com → doğrudan QR menü (adres çubuğunda alt alan adı kalır)
              { source: "/", has: [{ type: "host", value: MENU_HOST }], destination: "/menu/" },
            ],
            afterFiles: [
              { source: "/admin", destination: "/admin/index.html" },
              { source: "/admin/", destination: "/admin/index.html" },
            ],
            fallback: [],
          };
        },
        async redirects() {
          return [
            // Eski QR menünün adresleri (basılı QR kodlar çalışmaya devam etsin)
            ...["/index.php", "/menu.php", "/category.php", "/product.php"].map((source) => ({
              source,
              has: [{ type: "host" as const, value: MENU_HOST }],
              destination: "/",
              permanent: true,
            })),
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
