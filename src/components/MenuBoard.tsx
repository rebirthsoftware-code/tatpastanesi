"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { ALLERGENS, MENU, formatPrice, type Lang, type MenuItem } from "@/data/menu";
import { BRANCHES, FLAVORS, SETTINGS, whatsappLink } from "@/data/site";
import HeroMedia from "./HeroMedia";
import { ArrowIcon, CloseIcon, SearchIcon, StarIcon, WhatsAppIcon } from "./Icons";

const T = {
  tr: {
    greet: ["İyi geceler", "Günaydın", "İyi günler", "İyi akşamlar"],
    welcome: "Lezzetlerimizi keşfedin",
    open: "Menüyü Görüntüle",
    categories: "Kategoriler",
    back: "Menü",
    search: "Menüde ara…",
    best: "Çok satanlar",
    items: "ürün",
    flavors: "Dondurma çeşitlerimiz",
    empty: "Aramanızla eşleşen ürün yok.",
    note: "Fiyatlar şubeler arasında farklılık gösterebilir.",
    ingredients: "İçindekiler",
    calories: "Kalori",
    perPortion: "kcal / porsiyon",
    allergens: "Alerjenler",
    noInfo: "İçerik ve alerjen bilgisi için lütfen personelimize danışın.",
    ask: "WhatsApp'tan sor",
    close: "Kapat",
    prev: "Önceki ürün",
    next: "Sonraki ürün",
  },
  en: {
    greet: ["Good night", "Good morning", "Good afternoon", "Good evening"],
    welcome: "Discover our flavours",
    open: "View the Menu",
    categories: "Categories",
    back: "Menu",
    search: "Search the menu…",
    best: "Best sellers",
    items: "items",
    flavors: "Our ice cream flavours",
    empty: "No items match your search.",
    note: "Prices may vary between branches.",
    ingredients: "Ingredients",
    calories: "Calories",
    perPortion: "kcal / portion",
    allergens: "Allergens",
    noInfo: "Please ask our staff for ingredient and allergen information.",
    ask: "Ask on WhatsApp",
    close: "Close",
    prev: "Previous item",
    next: "Next item",
  },
} as const;

const normalize = (s: string) =>
  s.toLocaleLowerCase("tr").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ı/g, "i");

/** İstanbul saatine göre: 0 gece, 1 sabah, 2 öğlen, 3 akşam */
function dayPart() {
  const h = Number(new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Istanbul", hour: "2-digit", hourCycle: "h23" }).format(new Date()));
  return h < 5 ? 0 : h < 12 ? 1 : h < 18 ? 2 : 3;
}

export default function MenuBoard() {
  const [lang, setLang] = useState<Lang>("tr");
  const [part, setPart] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(MENU[0].slug);
  const [inMenu, setInMenu] = useState(false);
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const t = T[lang];

  useEffect(() => {
    setPart(dayPart());
    try {
      const saved = localStorage.getItem("tat-lang");
      if (saved === "en" || saved === "tr") setLang(saved);
    } catch {}
  }, []);
  const changeLang = (l: Lang) => {
    setLang(l);
    try {
      localStorage.setItem("tat-lang", l);
    } catch {}
  };

  const q = normalize(query.trim());
  const filtered = useMemo(
    () =>
      MENU.map((c) => ({
        ...c,
        items: q ? c.items.filter((i) => normalize(i.name.tr).includes(q) || normalize(i.name.en).includes(q)) : c.items,
      })).filter((c) => c.items.length),
    [q],
  );
  const featured = useMemo(() => MENU.flatMap((c) => c.items.filter((i) => i.featured)), []);
  const flat = useMemo(() => filtered.flatMap((c) => c.items), [filtered]);
  const index = selected ? flat.findIndex((i) => i.key === selected.key) : -1;
  const go = (d: number) => index >= 0 && setSelected(flat[(index + d + flat.length) % flat.length]);

  // Kaydırırken aktif kategori ve "Menü" geri düğmesinin görünürlüğü
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const v = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (v[0]) setActive(v[0].target.id.replace("m-", ""));
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    filtered.forEach((c) => {
      const el = document.getElementById(`m-${c.slug}`);
      if (el) io.observe(el);
    });
    const grid = document.getElementById("kategoriler");
    const gio = new IntersectionObserver(([e]) => setInMenu(!e.isIntersecting && e.boundingClientRect.top < 0));
    if (grid) gio.observe(grid);
    return () => {
      io.disconnect();
      gio.disconnect();
    };
  }, [filtered]);

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

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const hasDetails = (i: MenuItem) => i.ingredients[lang] || i.calories !== null || i.allergens.length > 0;

  return (
    <>
      {/* ───── Giriş ekranı ───── */}
      <section className="on-dark relative isolate flex min-h-[78svh] flex-col justify-end overflow-hidden bg-cocoa text-cream">
        <HeroMedia
          image={SETTINGS.menu_background || "/images/menu/16.jpg"}
          videoDesktop={SETTINGS.hero_video_desktop}
          videoMobile={SETTINGS.hero_video_mobile}
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-cocoa via-cocoa/60 to-cocoa/20" />
        <div className="container-x pb-10 pt-32">
          <div className="flex items-center justify-between gap-4">
            <p className="eyebrow min-h-4">{part !== null ? t.greet[part] : " "}</p>
            <div role="group" aria-label="Dil / Language" className="flex rounded-full bg-white/10 p-1 text-xs font-bold ring-1 ring-white/15 backdrop-blur">
              {(["tr", "en"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  aria-pressed={lang === l}
                  onClick={() => changeLang(l)}
                  className={`rounded-full px-3.5 py-1.5 uppercase transition ${lang === l ? "bg-cream text-ink" : "text-cream/80"}`}
                >
                  {l === "tr" ? "Türkçe" : "English"}
                </button>
              ))}
            </div>
          </div>
          <h1 className="mt-5 font-display text-5xl font-medium leading-[1.02] md:text-7xl">{t.welcome}</h1>
          <a href="#kategoriler" className="btn btn-gold mt-8 w-full !py-5 text-lg sm:w-auto">
            {t.open} <ArrowIcon width={20} height={20} className="rotate-90" />
          </a>
        </div>
      </section>

      {/* ───── Kategori kutuları ───── */}
      <section id="kategoriler" aria-label={t.categories} className="container-x scroll-mt-20 pt-10">
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {MENU.map((c) => (
            <li key={c.slug}>
              <a href={`#m-${c.slug}`} className="group relative block aspect-[4/5] overflow-hidden rounded-3xl bg-cream-2">
                <Image src={c.cover} alt="" fill sizes="(min-width:1024px) 16vw, (min-width:768px) 33vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-cocoa/85 via-cocoa/10 to-transparent" />
                <span className="absolute inset-x-4 bottom-4 text-cream">
                  <span className="block font-display text-2xl leading-tight">{c.name[lang]}</span>
                  <span className="text-xs font-semibold text-cream/70">
                    {c.items.length} {t.items}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* ───── Yapışkan çubuk: geri + kategoriler ───── */}
      <div className="catalog-bar sticky top-[76px] z-30 mt-10 border-y border-ink/10 bg-cream/95 backdrop-blur-xl">
        <div className="container-x flex items-center gap-2 py-3">
          <a
            href="#kategoriler"
            className={`flex shrink-0 items-center gap-1.5 rounded-full bg-ink py-2 pl-3 pr-4 text-sm font-bold text-cream transition-all duration-300 ${
              inMenu ? "max-w-40 opacity-100" : "pointer-events-none max-w-0 overflow-hidden !px-0 opacity-0"
            }`}
            aria-hidden={!inMenu}
            tabIndex={inMenu ? 0 : -1}
          >
            <ArrowIcon width={16} height={16} className="rotate-180" /> {t.back}
          </a>
          <div ref={navRef} className="no-scrollbar relative flex flex-1 gap-2 overflow-x-auto">
            {filtered.map((c) => (
              <a
                key={c.slug}
                data-slug={c.slug}
                href={`#m-${c.slug}`}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${
                  active === c.slug && inMenu ? "bg-brand text-cream" : "bg-cream-2 text-ink hover:bg-sand"
                }`}
              >
                {c.name[lang]}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container-x py-10 md:py-14">
        <label className="relative mx-auto block max-w-xl">
          <span className="sr-only">{t.search}</span>
          <SearchIcon className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.search}
            className="w-full rounded-full border border-ink/15 bg-cream py-4 pl-13 pr-5 text-base outline-none transition placeholder:text-muted focus:border-brand focus:ring-4 focus:ring-brand/10"
          />
        </label>

        {!q && featured.length > 0 && (
          <section aria-labelledby="best" className="mt-12">
            <h2 id="best" className="flex items-center gap-2 font-display text-3xl font-medium">
              <StarIcon className="text-gold" /> {t.best}
            </h2>
            <ul className="no-scrollbar -mx-5 mt-6 flex snap-x gap-4 overflow-x-auto px-5 pb-2">
              {featured.map((i) => (
                <li key={i.key} className="w-60 shrink-0 snap-start md:w-64">
                  <button type="button" onClick={() => setSelected(i)} className="group block w-full text-left">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-cream-2">
                      <Image src={i.image} alt={i.name[lang]} fill sizes="256px" className="object-cover transition duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-cocoa/85 via-transparent to-transparent" />
                      <span className="absolute right-3 top-3 rounded-full bg-cream px-3 py-1 text-sm font-bold tabular-nums text-brand shadow">
                        {formatPrice(i.price, lang)}
                      </span>
                      <p className="absolute inset-x-4 bottom-4 font-display text-xl leading-tight text-cream">{i.name[lang]}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {filtered.length === 0 && <p className="mt-16 text-center font-display text-2xl text-muted">{t.empty}</p>}

        <div className="mt-14 space-y-16">
          {filtered.map((c) => (
            <section key={c.slug} id={`m-${c.slug}`} className="scroll-mt-40">
              <div className="flex items-baseline justify-between gap-4 border-b-2 border-ink pb-3">
                <h2 className="font-display text-4xl font-medium md:text-5xl">{c.name[lang]}</h2>
                <span className="text-sm font-semibold text-muted">
                  {c.items.length} {t.items}
                </span>
              </div>
              <ul className="grid gap-x-12 md:grid-cols-2">
                {c.items.map((i) => (
                  <li key={i.key} className="border-b border-ink/10">
                    <button type="button" onClick={() => setSelected(i)} className="group flex w-full items-center gap-4 py-4 text-left">
                      <span className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-cream-2">
                        <Image src={i.image} alt="" fill sizes="80px" className="object-cover transition duration-500 group-hover:scale-110" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-baseline gap-2">
                          <span className="font-display text-lg font-semibold leading-snug md:text-xl">{i.name[lang]}</span>
                          <span aria-hidden className="mb-1 hidden flex-1 border-b border-dotted border-ink/30 sm:block" />
                          <span className="ml-auto shrink-0 font-display text-lg font-semibold tabular-nums text-brand md:text-xl">
                            {formatPrice(i.price, lang)}
                          </span>
                        </span>
                        <span className="mt-1 line-clamp-2 block text-sm leading-relaxed text-muted">{i.desc[lang]}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              {c.slug === "dondurma" && !q && FLAVORS.length > 0 && (
                <div className="mt-8 rounded-3xl bg-cream-2 p-6">
                  <h3 className="font-display text-2xl font-semibold">{t.flavors}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {FLAVORS.map((f) => (
                      <li key={f.name} className="flex items-center gap-2 rounded-full bg-cream px-3.5 py-1.5 text-sm font-medium">
                        <span className="size-3 rounded-full ring-1 ring-ink/15" style={{ background: f.color }} />
                        {f.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))}
        </div>

        <p className="mx-auto mt-16 max-w-2xl rounded-3xl bg-cream-2 p-6 text-center text-sm leading-relaxed text-muted">
          {t.note} {t.noInfo}
        </p>
      </div>

      {/* ───── Ürün detayı ───── */}
      <dialog
        ref={dialogRef}
        onClose={() => setSelected(null)}
        onClick={(e) => e.target === e.currentTarget && setSelected(null)}
        className="m-auto max-h-[92svh] w-[min(92vw,900px)] overflow-y-auto rounded-[2rem] bg-cream p-0 text-ink shadow-2xl backdrop:bg-cocoa/80 backdrop:backdrop-blur-sm"
      >
        {selected && (
          <div className="grid md:grid-cols-[1.05fr_1fr]">
            <div
              className="relative aspect-[4/5] max-h-[48svh] w-full bg-cream-2 md:max-h-none"
              onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
              onTouchEnd={(e) => {
                if (touchX.current === null) return;
                const dx = e.changedTouches[0].clientX - touchX.current;
                if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
                touchX.current = null;
              }}
            >
              <Image key={selected.key} src={selected.image} alt={selected.name[lang]} fill sizes="(min-width:768px) 480px, 92vw" className="animate-[fade-in_0.35s_ease] object-cover" />
              <button type="button" onClick={() => go(-1)} aria-label={t.prev} className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-cream/90 shadow-lg">
                <ArrowIcon width={18} height={18} className="rotate-180" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label={t.next} className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-cream/90 shadow-lg">
                <ArrowIcon width={18} height={18} />
              </button>
              <button type="button" onClick={() => setSelected(null)} aria-label={t.close} className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-cream/90 shadow-lg md:hidden">
                <CloseIcon />
              </button>
            </div>
            <div className="flex flex-col p-7 md:p-9">
              <div className="hidden justify-end md:flex">
                <button type="button" onClick={() => setSelected(null)} aria-label={t.close} className="grid size-10 place-items-center rounded-full bg-cream-2 transition hover:bg-sand">
                  <CloseIcon />
                </button>
              </div>
              <h3 className="font-display text-3xl font-medium leading-tight md:text-4xl">{selected.name[lang]}</h3>
              <p className="mt-2 font-display text-3xl tabular-nums text-brand">{formatPrice(selected.price, lang)}</p>
              {selected.desc[lang] && <p className="mt-3 leading-relaxed text-muted">{selected.desc[lang]}</p>}

              <div className="mt-6 space-y-4 rounded-2xl bg-cream-2 p-5 text-sm">
                {hasDetails(selected) ? (
                  <>
                    {selected.ingredients[lang] && (
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted">{t.ingredients}</p>
                        <p className="mt-1 leading-relaxed">{selected.ingredients[lang]}</p>
                      </div>
                    )}
                    {selected.calories !== null && (
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted">{t.calories}</p>
                        <p className="mt-1 font-semibold tabular-nums">
                          {selected.calories} {t.perPortion}
                        </p>
                      </div>
                    )}
                    {selected.allergens.length > 0 && (
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted">{t.allergens}</p>
                        <ul className="mt-2 flex flex-wrap gap-1.5">
                          {selected.allergens.map((a) => (
                            <li key={a} className="rounded-full bg-brand/10 px-3 py-1 font-semibold text-brand-dark">
                              {ALLERGENS[a]?.[lang] ?? a}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="leading-relaxed text-muted">{t.noInfo}</p>
                )}
              </div>

              <a
                href={whatsappLink(BRANCHES[0], `Merhaba, ${selected.name.tr} hakkında bilgi almak istiyorum.`)}
                target="_blank"
                rel="noopener"
                className="btn mt-6 self-start bg-[#1f9d55] text-white hover:brightness-110"
              >
                <WhatsAppIcon width={18} height={18} /> {t.ask}
              </a>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
