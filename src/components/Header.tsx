"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BRANCHES, NAV, SITE, instagramLink } from "@/data/site";
import CallMenu from "./CallMenu";
import { ArrowIcon, InstagramIcon, MenuBookIcon } from "./Icons";
import OpenStatus from "./OpenStatus";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // Aşağı kaydırırken menüyü gizle, yukarı kaydırınca geri getir
      if (Math.abs(y - last) > 6) setHidden(y > last && y > 240);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.toggleAttribute("data-header-hidden", hidden && !open);
  }, [hidden, open]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const solid = scrolled && !open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${hidden && !open ? "-translate-y-full" : ""} ${
          solid ? "bg-cream/85 py-2 shadow-[0_8px_30px_-12px_rgba(28,18,14,0.25)] backdrop-blur-xl" : "py-4"
        }`}
      >
        <div className="container-x flex items-center justify-between gap-6">
          <Link href="/" aria-label={`${SITE.shortName} ana sayfa`} className="relative shrink-0">
            <Image
              src="/images/tat-logo.png"
              alt={SITE.name}
              width={900}
              height={649}
              priority
              className={`h-auto transition-all duration-500 ${solid ? "w-[84px]" : "w-[104px] md:w-[120px]"}`}
            />
          </Link>

          <nav aria-label="Ana menü" className="hidden lg:block">
            <ul className={`flex items-center gap-1 rounded-full p-1 transition-colors ${solid ? "" : "bg-white/5 backdrop-blur-md ring-1 ring-white/10"}`}>
              {NAV.filter((n) => n.desktop !== false).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      isActive(item.href)
                        ? solid ? "bg-ink text-cream" : "bg-cream text-ink"
                        : solid ? "text-ink hover:bg-ink/5" : "text-cream/90 hover:text-cream hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <CallMenu
              className={`btn hidden !px-4 !py-3 sm:inline-flex ${solid ? "btn-ghost text-ink" : "btn-ghost text-cream"}`}
            />
            <Link href="/menu/" className="btn btn-primary hidden !px-5 !py-3 sm:inline-flex">
              <MenuBookIcon width={18} height={18} />
              Menü
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              className={`relative grid size-12 place-items-center rounded-full transition-colors duration-300 lg:hidden ${
                open ? "bg-cream text-ink" : solid ? "bg-ink text-cream" : "bg-white/10 text-cream ring-1 ring-white/20 backdrop-blur"
              }`}
            >
              {/* Üç çizgi, açılınca X'e dönüşür */}
              <span aria-hidden className="relative block h-3.5 w-5">
                <span className={`absolute left-0 top-0 h-[2px] w-full rounded bg-current transition-all duration-300 ${open ? "top-1/2 -translate-y-1/2 rotate-45" : ""}`} />
                <span className={`absolute left-0 top-1/2 h-[2px] -translate-y-1/2 rounded bg-current transition-all duration-300 ${open ? "w-0 opacity-0" : "w-3/4"}`} />
                <span className={`absolute bottom-0 left-0 h-[2px] w-full rounded bg-current transition-all duration-300 ${open ? "bottom-1/2 translate-y-1/2 -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        inert={!open}
        className="mobile-menu fixed inset-0 z-[45] overflow-y-auto overscroll-contain bg-cocoa text-cream lg:hidden"
        data-open={open}
      >
        <div aria-hidden className="glow-brand pointer-events-none absolute -left-40 top-1/3 size-[520px] rounded-full" />
        <div className="container-x relative flex min-h-full flex-col pb-8 pt-24">
          <nav aria-label="Mobil menü">
            <ul>
              {NAV.map((item, i) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href} className="menu-item border-b border-white/10" style={{ "--d": `${120 + i * 45}ms` } as React.CSSProperties}>
                    <Link href={item.href} aria-current={active ? "page" : undefined} className="group flex items-center justify-between gap-4 py-2.5">
                      <span>
                        <span className={`flex items-center gap-3 font-display text-[1.7rem] leading-tight ${active ? "italic text-gold-light" : "text-cream"}`}>
                          {active && <span className="size-2 rounded-full bg-gold-light" />}
                          {item.label}
                        </span>
                        <span className="block text-[13px] text-cream/50">{item.hint}</span>
                      </span>
                      <span className="grid size-9 shrink-0 place-items-center rounded-full ring-1 ring-white/15 transition group-hover:bg-cream group-hover:text-ink">
                        <ArrowIcon width={16} height={16} className="-rotate-45" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="menu-item mt-6 grid grid-cols-2 gap-2 text-sm font-bold" style={{ "--d": "460ms" } as React.CSSProperties}>
            <CallMenu
              placement="top"
              align="left"
              label="Ara"
              wrapperClassName="flex"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-cream py-3.5 text-ink"
            />
            <CallMenu
              kind="whatsapp"
              placement="top"
              align="right"
              label="WhatsApp"
              wrapperClassName="flex"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1f9d55] py-3.5 text-white"
            />
            <Link href="/ozel-siparis/" className="flex items-center justify-center gap-2 rounded-2xl bg-white/5 py-3.5 ring-1 ring-white/10">
              Pasta Siparişi
            </Link>
            <a href={instagramLink(BRANCHES[0])} target="_blank" rel="noopener" className="flex items-center justify-center gap-2 rounded-2xl bg-white/5 py-3.5 ring-1 ring-white/10">
              <InstagramIcon width={16} height={16} /> Instagram
            </a>
          </div>

          <div className="menu-item mt-auto flex items-center gap-4 pt-10" style={{ "--d": "520ms" } as React.CSSProperties}>
            {open && (
              <span className="relative size-16 shrink-0 overflow-hidden rounded-2xl">
                <Image src="/images/menu/16.jpg" alt="" fill sizes="64px" className="object-cover" />
              </span>
            )}
            <span className="text-sm leading-relaxed text-cream/70">
              <span className="flex items-center gap-2">
                <OpenStatus open={BRANCHES[0].open} close={BRANCHES[0].close} dark />
              </span>
              <span className="mt-1 block">Her gün {BRANCHES[0].open} – {BRANCHES[0].close} · {BRANCHES.length} şube</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
