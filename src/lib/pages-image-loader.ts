// GitHub Pages'te görsel optimizasyonu olmadığından görseller olduğu gibi, alt dizin önekiyle sunulur.
export default function pagesImageLoader({ src, width }: { src: string; width: number }) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}?w=${width}`;
}
