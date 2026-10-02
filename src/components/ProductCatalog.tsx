"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { formatPrice, menuPrice } from "@/data/menu";
import { CATEGORIES, SITE, type Product } from "@/data/site";
import { ArrowIcon, CloseIcon, MenuBookIcon, SearchIcon } from "./Icons";

const normalize = (s: string) =>
  s.toLocaleLowerCase("tr").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ı/g, "i");

export default function ProductCatalog() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(CATEGORIES[0].slug);
  const [selected, setSelected] = useState<(Product & { category: string }) | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const q = normalize(query.trim());
  const filtered = useMemo(
    () =>
      CATEGORIES.map((c) => ({
        ...c,
        items: q ? c.items.filter((p) => normalize(p.name).includes(q)) : c.items,
        matchingVarieties: q ? (c.varieties?.list ?? []).filter((v) => normalize(v).includes(q)) : [],
      })).filter((c) => !q || c.items.length || c.matchingVarieties.length || normalize(c.name).includes(q)),
    [q],
  );

  // Pencerede önceki / sonraki ürüne geçiş (görünen ürünler arasında)
  const flat = useMemo(() => filtered.flatMap((c) => c.items.map((p) => ({ ...p, category: c.name }))), [filtered]);
  const index = selected ? flat.findIndex((p) => p.name === selected.name && p.category === selected.category) : -1;
  const go = (d: number) => index >= 0 && flat.length > 1 && setSelected(flat[(index + d + flat.length) % flat.length]);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Kaydırırken aktif kategoriyi işaretle
  useEffect(() => {
    const sections = CATEGORIES.map((c) => document.getElementById(c.slug)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [filtered]);

  // Aktif sekmeyi yatay menüde görünür tut
  useEffect(() => {
    // Yalnızca çubuğu yatay kaydır; scrollIntoView sayfanın tamamını da kaydırabiliyor
    const nav = navRef.current;
    const chip = nav?.querySelector<HTMLElement>(`[data-slug="${active}"]`);
    if (nav && chip) nav.scrollTo({ left: chip.offsetLeft - nav.clientWidth / 2 + chip.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (selected && !d.open) d.showModal();
    if (!selected && d.open) d.close();
  }, [selected]);

  return (
    <>
      <div className="catalog-bar sticky top-[76px] z-30 border-b border-ink/10 bg-cream/90 backdrop-blur-xl">
        <div className="container-x flex flex-col gap-3 py-3 md:flex-row md:items-center">
          <div ref={navRef} className="no-scrollbar relative -mx-5 flex flex-1 gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
            {CATEGORIES.map((c) => (
              <a
                key={c.slug}
                data-slug={c.slug}
                href={`#${c.slug}`}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${
                  active === c.slug ? "bg-ink text-cream" : "bg-cream-2 text-ink hover:bg-sand"
                }`}
              >
                {c.name}
              </a>
            ))}
          </div>
          <label className="relative block md:w-72">
            <span className="sr-only">Ürün ara</span>
            <SearchIcon width={18} height={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Lezzet ara… (ör. fıstık)"
              className="w-full rounded-full border border-ink/15 bg-cream py-2.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-muted focus:border-brand"
            />
          </label>
        </div>
      </div>

      <div className="container-x py-16 md:py-20">
        {filtered.length === 0 && (
          <div className="rounded-3xl bg-cream-2 p-12 text-center">
            <p className="font-display text-2xl">“{query}” için sonuç bulunamadı.</p>
            <p className="mt-2 text-muted">Tüm çeşitlerimiz ve güncel fiyatlar için dijital menümüze göz atın.</p>
            <Link href="/menu/" className="btn btn-primary mt-6">
              <MenuBookIcon width={18} height={18} /> Dijital Menü
            </Link>
          </div>
        )}

        <div className="space-y-24">
          {filtered.map((c) => (
            <section key={c.slug} id={c.slug} className="scroll-mt-44">
              <div className="grid gap-6 border-b border-ink/10 pb-8 md:grid-cols-[1fr_1.2fr] md:items-end">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">{c.tagline}</p>
                  <h2 className="mt-2 font-display text-4xl font-medium md:text-6xl">{c.name}</h2>
                </div>
                <p className="max-w-xl leading-relaxed text-muted md:justify-self-end">{c.description}</p>
              </div>

              {c.items.length > 0 && (
                <ul className={`mt-10 grid gap-5 ${c.items.length < 3 ? "sm:grid-cols-2" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}`}>
                  {c.items.map((p) => (
                    <li key={p.name}>
                      <button
                        type="button"
                        onClick={() => setSelected({ ...p, category: c.name })}
                        className="group block w-full text-left"
                      >
                        <div className={`relative overflow-hidden rounded-3xl bg-cocoa ${c.items.length < 3 ? "aspect-[4/3]" : "aspect-square"}`}>
                          <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            sizes={c.items.length < 3 ? "(min-width:640px) 50vw, 100vw" : "(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"}
                            className="object-cover transition duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-cocoa/60 to-transparent opacity-0 transition group-hover:opacity-100" />
                          <span className="absolute bottom-3 right-3 grid size-9 translate-y-2 place-items-center rounded-full bg-cream text-ink opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                            <ArrowIcon width={16} height={16} className="-rotate-45" />
                          </span>
                        </div>
                        <h3 className="mt-3 font-display text-lg font-semibold leading-snug md:text-xl">{p.name}</h3>
                        {p.note && <p className="mt-1 text-sm leading-relaxed text-muted">{p.note}</p>}
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {c.varieties && (
                <div className="mt-10 rounded-3xl bg-cream-2 p-6 md:p-8">
                  <p className="font-display text-xl font-semibold">{c.varieties.title}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {c.varieties.list.map((v) => {
                      const hit = q && normalize(v).includes(q);
                      return (
                        <li key={v} className={`rounded-full px-3.5 py-1.5 text-sm font-medium ${hit ? "bg-brand text-cream" : "bg-cream text-ink"}`}>
                          {v}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </section>
          ))}
        </div>

        <div className="on-dark relative mt-24 overflow-hidden rounded-[2rem] bg-cocoa p-10 text-cream md:p-16">
          <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full glow-brand" />
          <div className="relative grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-center">
            <div>
              <p className="eyebrow">Güncel fiyatlar</p>
              <h2 className="mt-4 font-display text-4xl font-medium md:text-5xl">Tüm menü ve fiyatlar dijital menümüzde.</h2>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link href="/menu/" className="btn btn-gold">
                <MenuBookIcon width={18} height={18} /> Menüyü Aç
              </Link>
              <Link href="/ozel-siparis/" className="btn btn-ghost text-cream">
                Pasta Siparişi
              </Link>
            </div>
          </div>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setSelected(null)}
        onClick={(e) => e.target === e.currentTarget && setSelected(null)}
        className="m-auto w-[min(92vw,960px)] overflow-hidden rounded-[2rem] bg-cream p-0 text-ink shadow-2xl backdrop:bg-cocoa/80 backdrop:backdrop-blur-sm"
      >
        {selected && (
          <div className="grid md:grid-cols-[1.2fr_1fr]">
            <div
              className="relative aspect-square bg-cocoa"
              onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
              onTouchEnd={(e) => {
                if (touchX.current === null) return;
                const dx = e.changedTouches[0].clientX - touchX.current;
                if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
                touchX.current = null;
              }}
            >
              <Image key={selected.image + selected.name} src={selected.image} alt={selected.name} fill sizes="(min-width:768px) 560px, 92vw" className="animate-[fade-in_0.35s_ease] object-cover" />
              {flat.length > 1 && (
                <>
                  <button type="button" onClick={() => go(-1)} aria-label="Önceki ürün" className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-cream/90 text-ink shadow-lg transition hover:bg-cream">
                    <ArrowIcon width={18} height={18} className="rotate-180" />
                  </button>
                  <button type="button" onClick={() => go(1)} aria-label="Sonraki ürün" className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-cream/90 text-ink shadow-lg transition hover:bg-cream">
                    <ArrowIcon width={18} height={18} />
                  </button>
                  <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-cocoa/70 px-3 py-1 text-xs font-semibold tabular-nums text-cream">
                    {index + 1} / {flat.length}
                  </span>
                </>
              )}
            </div>
            <div className="flex flex-col p-8 md:p-10">
              <div className="flex items-start justify-between gap-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">{selected.category}</p>
                <button type="button" onClick={() => setSelected(null)} aria-label="Kapat" className="grid size-10 place-items-center rounded-full bg-cream-2 transition hover:bg-sand">
                  <CloseIcon />
                </button>
              </div>
              <h3 className="mt-3 font-display text-4xl font-medium leading-tight">{selected.name}</h3>
              {menuPrice(selected.menuKey) && (
                <p className="mt-2 flex flex-wrap items-baseline gap-x-2 font-display text-2xl tabular-nums text-brand">
                  {formatPrice(menuPrice(selected.menuKey)!.price)}
                  {menuPrice(selected.menuKey)!.label && <span className="font-sans text-sm text-muted">· {menuPrice(selected.menuKey)!.label}</span>}
                  {menuPrice(selected.menuKey)!.name !== selected.name && (
                    <span className="font-sans text-sm text-muted">· {menuPrice(selected.menuKey)!.name}</span>
                  )}
                </p>
              )}
              <p className="mt-4 flex-1 leading-relaxed text-muted">
                {selected.note ?? "Günlük taze üretilir, tüm şubelerimizin vitrininde sizi bekler. Stok durumu için şubemizi arayabilirsiniz."}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/menu/" className="btn btn-primary">
                  Tüm Menü
                </Link>
                <Link href="/subelerimiz/" className="btn btn-ghost">
                  En yakın şube
                </Link>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
