import Image from "next/image";
import Link from "next/link";
import Counter from "@/components/Counter";
import { ArrowIcon, HandIcon, HeritageIcon, LeafIcon, PinIcon, SparkIcon, StarIcon } from "@/components/Icons";
import OpenStatus from "@/components/OpenStatus";
import Reveal from "@/components/Reveal";
import { BRANCHES, CATEGORIES, REVIEWS, SITE, STATS, mapsLink } from "@/data/site";

export const metadata = { alternates: { canonical: "/" } };

const MARQUEE = ["%100 Doğal Malzeme", "Günlük Üretim", "El Yapımı", "Tasarım Pastalar", "Katkısız Dondurma", "2001'den Beri"];

const VALUES = [
  {
    icon: HeritageIcon,
    kicker: "Gelenek",
    title: "Kuşaktan kuşağa reçeteler",
    text: "2001'den bu yana aynı özenle uyguladığımız tariflerimizi her gün yeniden, ilk günkü heyecanla hazırlıyoruz.",
    image: "/images/products/kurupass.jpg",
  },
  {
    icon: HandIcon,
    kicker: "Ustalık",
    title: "Usta ellerin dokunuşu",
    text: "Her hamur ustalarımızın elinde şekil bulur, her süsleme tek tek, sabırla yapılır. Seri üretim değil, zanaat.",
    image: "/images/neden1.jpg",
  },
  {
    icon: LeafIcon,
    kicker: "Doğallık",
    title: "Saf ve taze malzeme",
    text: "Günlük taze süt, mevsiminde olgunlaşmış meyveler, gerçek Antep fıstığı. Katkı yok, kestirme yok.",
    image: "/images/neden3.jpg",
  },
];

export default function Home() {
  const favorites = CATEGORIES.find((c) => c.slug === "sutlu-tatlilar")!.items.slice(0, 8);
  const flavors = CATEGORIES[0].varieties!.list;

  return (
    <>
      {/* ───────────── HERO ───────────── */}
      <section className="on-dark grain relative isolate overflow-hidden bg-cocoa text-cream">
        <div className="pointer-events-none absolute -left-40 top-20 -z-10 size-[560px] rounded-full bg-brand/35 blur-[140px]" />
        <div className="pointer-events-none absolute -right-20 bottom-0 -z-10 size-[420px] rounded-full bg-gold/15 blur-[120px]" />

        <div className="container-x grid min-h-[100svh] items-center gap-12 pb-20 pt-36 lg:grid-cols-[1.05fr_1fr] lg:pt-32">
          <div>
            <p className="eyebrow">Ankara · {SITE.founded}&apos;den beri</p>
            <h1 className="mt-6 font-display text-[3.4rem] font-medium leading-[0.95] sm:text-7xl xl:text-[6.5rem]">
              Ustalıkla
              <br />
              yapılan <em className="font-light text-gold-light">tatlı</em>
              <br />
              sanatı.
            </h1>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-cream/75">
              Günlük taze yaş pastalar, sütlü ve şerbetli tatlılar ve %100 doğal dondurma. Geleneksel lezzetleri, modern dokunuşlarla
              beş şubemizde sizin için hazırlıyoruz.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/urunlerimiz/" className="btn btn-primary">
                Lezzetleri Keşfet <ArrowIcon width={18} height={18} />
              </Link>
              <Link href="/ozel-siparis/" className="btn btn-ghost text-cream">
                Pasta Siparişi Ver
              </Link>
            </div>
            <a href={SITE.reviewsUrl} target="_blank" rel="noopener" className="group mt-12 inline-flex items-center gap-4">
              <span className="flex -space-x-3">
                {["G", "S", "K"].map((l, i) => (
                  <span key={l} className="grid size-10 place-items-center rounded-full border-2 border-cocoa text-sm font-bold" style={{ background: ["#a6192e", "#c9a04e", "#3a2620"][i] }}>
                    {l}
                  </span>
                ))}
              </span>
              <span>
                <span className="flex gap-0.5 text-gold-light">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} width={14} height={14} />
                  ))}
                </span>
                <span className="text-sm text-cream/70 transition group-hover:text-cream">Google&apos;da misafirlerimizin yorumları →</span>
              </span>
            </a>
          </div>

          <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
            <Image
              src="/images/splash.png"
              alt=""
              width={900}
              height={900}
              className="pointer-events-none absolute -right-16 -top-16 w-64 animate-float opacity-90 md:w-80"
            />
            <div className="relative grid grid-cols-[1.15fr_1fr] gap-4">
              <div className="relative aspect-[3/4.4] overflow-hidden rounded-t-full rounded-b-3xl ring-1 ring-white/10">
                <Image src="/images/products/rumc.jpg" alt="Rumeli Çileklisi" fill priority sizes="(min-width:1024px) 28vw, 55vw" className="object-cover" />
                <span className="absolute bottom-4 left-4 rounded-full bg-cream/90 px-3 py-1.5 text-xs font-bold text-ink backdrop-blur">Rumeli Çileklisi</span>
              </div>
              <div className="flex flex-col gap-4 pt-16">
                <div className="relative aspect-square overflow-hidden rounded-3xl ring-1 ring-white/10">
                  <Image src="/images/products/baklava.jpg" alt="Fıstıklı baklava" fill priority sizes="(min-width:1024px) 22vw, 45vw" className="object-cover" />
                </div>
                <div className="relative aspect-[4/5] overflow-hidden rounded-b-full rounded-t-3xl ring-1 ring-white/10">
                  <Image src="/images/neden3.jpg" alt="Doğal meyveli dondurmalar" fill sizes="(min-width:1024px) 22vw, 45vw" className="object-cover" />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl bg-cream px-5 py-4 text-ink shadow-2xl md:-left-10">
              <span className="font-display text-4xl font-semibold text-brand">31</span>
              <span className="text-sm font-semibold leading-tight">
                çeşit doğal
                <br />
                dondurma
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── MARQUEE ───────────── */}
      <div className="overflow-hidden bg-brand py-5 text-cream" aria-hidden>
        <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((t, i) => (
            <span key={i} className="flex items-center gap-10 font-display text-2xl italic">
              {t}
              <SparkIcon width={14} height={14} className="text-gold-light" />
            </span>
          ))}
        </div>
      </div>

      {/* ───────────── KATEGORİLER ───────────── */}
      <section className="py-24 md:py-32">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Reveal>
              <p className="eyebrow">Vitrinimizden</p>
              <h2 className="mt-4 max-w-xl font-display text-4xl font-medium leading-tight md:text-6xl">
                Her damak için <em className="text-brand">bir lezzet</em>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <Link href="/urunlerimiz/" className="group inline-flex items-center gap-2 font-bold text-brand">
                Tüm ürünleri gör <ArrowIcon width={18} height={18} className="transition group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-14 grid auto-rows-[260px] gap-4 sm:grid-cols-2 lg:auto-rows-[300px] lg:grid-cols-4">
            {CATEGORIES.map((c, i) => {
              const span = ["lg:col-span-2 lg:row-span-2", "lg:row-span-2", "", "", "lg:col-span-2", "lg:col-span-2"][i];
              return (
                <Reveal key={c.slug} delay={i * 70} className={span}>
                  <Link href={`/urunlerimiz/#${c.slug}`} className="group relative block h-full overflow-hidden rounded-3xl bg-cocoa text-cream">
                    <Image
                      src={c.cover}
                      alt={c.name}
                      fill
                      sizes={i === 0 ? "(min-width:1024px) 50vw, 100vw" : "(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"}
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cocoa/90 via-cocoa/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-light">{c.tagline}</p>
                        <h3 className={`mt-1 font-display font-medium ${i === 0 ? "text-4xl md:text-5xl" : "text-3xl"}`}>{c.name}</h3>
                      </div>
                      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-cream text-ink transition group-hover:bg-gold">
                        <ArrowIcon width={18} height={18} className="-rotate-45" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────── İMZA LEZZET ───────────── */}
      <section className="overflow-hidden bg-cream-2 py-24 md:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="relative mx-auto aspect-square max-w-lg overflow-hidden rounded-full ring-[14px] ring-cream">
              <Image src="/images/products/rumc.jpg" alt="Tat Pastanesi Rumeli Çileklisi" fill sizes="(min-width:1024px) 40vw, 90vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-2 right-0 max-w-[16rem] rounded-2xl bg-cocoa p-5 text-cream shadow-xl md:right-6">
              <div className="flex gap-0.5 text-gold-light">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} width={13} height={13} />
                ))}
              </div>
              <p className="mt-2 text-sm leading-relaxed">“Uzun zamandır dışarıda yediğim en iyi tatlıydı.”</p>
              <p className="mt-2 text-xs text-cream/60">— {REVIEWS[0].author}, Google</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">İmza lezzetimiz</p>
            <h2 className="mt-4 font-display text-5xl font-medium leading-[1.02] md:text-7xl">
              Rumeli <em className="text-brand">Çileklisi</em>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
              Hafif kreması, taze çilekleri ve yumuşacık dokusuyla misafirlerimizin en çok sorduğu tatlı. Yanında; magnolyalar, profiterol,
              trileçe ve günlük taze sütlü tatlılarımız sizi bekliyor.
            </p>
            <div className="no-scrollbar -mx-5 mt-10 flex snap-x gap-3 overflow-x-auto px-5 pb-2">
              {favorites.map((p) => (
                <Link key={p.name} href="/urunlerimiz/#sutlu-tatlilar" className="group w-36 shrink-0 snap-start">
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-cocoa">
                    <Image src={p.image} alt={p.name} fill sizes="144px" className="object-cover transition duration-500 group-hover:scale-110" />
                  </div>
                  <p className="mt-2 text-sm font-semibold leading-tight">{p.name}</p>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────── DONDURMA ───────────── */}
      <section className="on-dark grain relative isolate overflow-hidden bg-cocoa py-24 text-cream md:py-32">
        <div className="pointer-events-none absolute right-0 top-0 -z-10 size-[500px] rounded-full bg-brand/25 blur-[130px]" />
        <div className="container-x grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <p className="eyebrow">Tat Dondurma</p>
            <h2 className="mt-4 font-display text-5xl font-medium leading-[1.02] md:text-7xl">
              31 çeşit,
              <br />
              <em className="text-gold-light">%100 doğal.</em>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-cream/70">
              Gerçek meyve, gerçek fıstık, gerçek kakao. Her gün taze üretilen dondurmalarımızı külah, kâğıt helva, cup ya da paket
              olarak dilediğiniz gibi seçin.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {flavors.map((f) => (
                <span key={f} className="rounded-full border border-white/15 px-3.5 py-1.5 text-sm text-cream/85 transition hover:border-gold-light hover:text-gold-light">
                  {f}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120} className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/5] overflow-hidden rounded-t-full rounded-b-3xl">
              <Image src="/images/neden3.jpg" alt="Böğürtlenli ve portakallı dondurmalar" fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
            </div>
            <div className="relative mt-16 aspect-[3/5] overflow-hidden rounded-b-full rounded-t-3xl">
              <Image src="/images/neden1.jpg" alt="Paket dondurma hazırlanırken" fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────── TASARIM PASTA ───────────── */}
      <section className="py-24 md:py-32">
        <div className="container-x">
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
            <Reveal className="grid grid-cols-3 gap-3 md:gap-4">
              {[
                ["/images/robloxp.jpg", "Roblox temalı doğum günü pastası"],
                ["/images/products/sekerpas.jpg", "Şeker hamurlu tasarım pasta"],
                ["/images/products/sippas.jpg", "Çiçekli katlı tasarım pasta"],
              ].map(([src, alt], i) => (
                <div key={src} className={`relative aspect-[3/5] overflow-hidden rounded-3xl bg-cocoa ${i === 1 ? "translate-y-10" : ""}`}>
                  <Image src={src} alt={alt} fill sizes="(min-width:1024px) 18vw, 33vw" className="object-cover" />
                </div>
              ))}
            </Reveal>
            <Reveal delay={120}>
              <p className="eyebrow">Özel günleriniz için</p>
              <h2 className="mt-4 font-display text-5xl font-medium leading-[1.02] md:text-6xl">
                Hayalinizdeki pastayı <em className="text-brand">birlikte</em> tasarlayalım.
              </h2>
              <ol className="mt-10 space-y-6">
                {[
                  ["Fikrinizi paylaşın", "Model fotoğrafı, tema, yazı ve kişi sayısını bize iletin."],
                  ["Birlikte netleştirelim", "Ustalarımız tasarımı, lezzeti ve teslim gününü sizinle belirlesin."],
                  ["Mutluluğu teslim alın", "Pastanız, seçtiğiniz şubede taptaze hazır olsun."],
                ].map(([t, d], i) => (
                  <li key={t} className="flex gap-5">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand font-display text-lg text-cream">{i + 1}</span>
                    <div>
                      <p className="font-display text-xl font-semibold">{t}</p>
                      <p className="mt-1 text-muted">{d}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <Link href="/ozel-siparis/" className="btn btn-primary mt-10">
                Sipariş Formunu Doldur <ArrowIcon width={18} height={18} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── DEĞERLER ───────────── */}
      <section className="bg-cream-2 py-24 md:py-32">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">Bizi biz yapanlar</p>
            <h2 className="mt-4 font-display text-4xl font-medium leading-tight md:text-6xl">
              Sanatın <em className="text-brand">zirvesi</em>, sofranızda.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.kicker} delay={i * 100} className="group overflow-hidden rounded-3xl bg-cream shadow-[0_20px_60px_-30px_rgba(28,18,14,0.35)]">
                <div className="relative h-56 overflow-hidden">
                  <Image src={v.image} alt="" fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 text-brand">
                    <v.icon width={22} height={22} />
                    <span className="text-xs font-bold uppercase tracking-[0.2em]">{v.kicker}</span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-semibold">{v.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-20 grid grid-cols-2 gap-y-10 border-t border-ink/10 pt-14 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-5xl font-medium text-brand md:text-6xl">
                  <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.15em] text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── YORUMLAR ───────────── */}
      <section className="py-24 md:py-32">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Reveal>
              <p className="eyebrow">Misafirlerimiz ne diyor?</p>
              <h2 className="mt-4 font-display text-4xl font-medium leading-tight md:text-6xl">
                Tatlı sözler <em className="text-brand">için</em> teşekkürler.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <a href={SITE.reviewsUrl} target="_blank" rel="noopener" className="btn btn-ghost text-ink">
                Tüm Google yorumları <ArrowIcon width={18} height={18} />
              </a>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <Reveal key={r.author} delay={i * 100} as="figure" className="flex h-full flex-col rounded-3xl border border-ink/10 bg-cream p-8">
                <div className="flex gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <StarIcon key={k} width={16} height={16} />
                  ))}
                </div>
                <blockquote className="mt-6 flex-1 font-display text-xl leading-relaxed">“{r.text}”</blockquote>
                <figcaption className="mt-8 flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-brand font-bold text-cream">{r.author[0]}</span>
                  <span>
                    <span className="block font-semibold">{r.author}</span>
                    <span className="text-sm text-muted">Google yorumu</span>
                  </span>
                </figcaption>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── ŞUBELER ───────────── */}
      <section className="on-dark grain relative overflow-hidden bg-cocoa-2 py-24 text-cream md:py-32">
        <div className="container-x relative">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Reveal>
              <p className="eyebrow">5 şube, aynı lezzet</p>
              <h2 className="mt-4 font-display text-4xl font-medium leading-tight md:text-6xl">
                Size en yakın <em className="text-gold-light">Tat</em>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <Link href="/subelerimiz/" className="group inline-flex items-center gap-2 font-bold text-gold-light">
                Tüm şube bilgileri <ArrowIcon width={18} height={18} className="transition group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {BRANCHES.map((b, i) => (
              <Reveal key={b.slug} delay={i * 70} className="flex flex-col rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 transition hover:bg-white/10">
                <div className="flex items-start justify-between gap-2">
                  <PinIcon className="text-gold-light" />
                  <OpenStatus open={b.open} close={b.close} dark />
                </div>
                <h3 className="mt-6 font-display text-2xl">{b.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-cream/60">{b.address}</p>
                <div className="mt-6 flex gap-2 text-sm font-bold">
                  <a href={`tel:${b.phone}`} className="flex-1 rounded-full bg-cream py-2.5 text-center text-ink transition hover:bg-gold-light">
                    Ara
                  </a>
                  <a href={mapsLink(b)} target="_blank" rel="noopener" className="flex-1 rounded-full py-2.5 text-center ring-1 ring-white/25 transition hover:ring-white">
                    Yol tarifi
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
