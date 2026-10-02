import Link from "next/link";

export default function NotFound() {
  return (
    <section className="on-dark relative grid min-h-[80svh] place-items-center overflow-hidden bg-cocoa px-5 pt-32 text-center text-cream">
      <div>
        <p className="font-display text-[8rem] leading-none text-gold-light/80 md:text-[12rem]">404</p>
        <h1 className="mt-4 font-display text-4xl md:text-5xl">Bu dilim tükenmiş gibi görünüyor.</h1>
        <p className="mx-auto mt-4 max-w-md text-cream/70">Aradığınız sayfa bulunamadı. Ama vitrinimizde sizi bekleyen çok şey var.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">Ana Sayfa</Link>
          <Link href="/urunlerimiz/" className="btn btn-ghost text-cream">Ürünlerimiz</Link>
        </div>
      </div>
    </section>
  );
}
