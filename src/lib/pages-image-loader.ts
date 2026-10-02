// GitHub Pages: next/image isteğini, derleme öncesi üretilen en yakın boyuttaki WebP'ye yönlendirir
// (bkz. scripts/pages-image-variants.mjs).
const WIDTHS = [160, 384, 640, 960, 1600];

export default function pagesImageLoader({ src, width }: { src: string; width: number }) {
  const w = WIDTHS.find((x) => x >= width) ?? WIDTHS[WIDTHS.length - 1];
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/_img/${w}${src}.webp`;
}
