"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BRANCHES, NAV, SITE, instagramLink } from "@/data/site";
import CallMenu from "./CallMenu";
import { CloseIcon, InstagramIcon, MenuBookIcon, PhoneIcon } from "./Icons";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

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
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
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
              {NAV.map((item) => (
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
            <a href={SITE.menuUrl} target="_blank" rel="noopener" className="btn btn-primary hidden !px-5 !py-3 sm:inline-flex">
              <MenuBookIcon width={18} height={18} />
              Menü
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              className={`relative grid size-12 place-items-center rounded-full transition lg:hidden ${
                open ? "bg-cream text-ink" : solid ? "bg-ink text-cream" : "bg-white/10 text-cream ring-1 ring-white/20 backdrop-blur"
              }`}
            >
              {open ? (
                <CloseIcon />
              ) : (
                <span className="flex w-5 flex-col gap-[5px]">
                  <span className="h-[2px] w-full rounded bg-current" />
                  <span className="h-[2px] w-3/4 rounded bg-current" />
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 flex flex-col bg-cocoa text-cream transition-all duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="grain pointer-events-none absolute inset-0" />
        <nav aria-label="Mobil menü" className="container-x relative flex flex-1 flex-col justify-center pt-28">
          <ul className="space-y-1">
            {NAV.map((item, i) => (
              <li
                key={item.href}
                className={`transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
                style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
              >
                <Link
                  href={item.href}
                  tabIndex={open ? 0 : -1}
                  className={`block py-2 font-display text-4xl font-medium ${isActive(item.href) ? "text-gold-light italic" : "text-cream"}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="container-x relative space-y-4 pb-10">
          <a href={SITE.menuUrl} target="_blank" rel="noopener" tabIndex={open ? 0 : -1} className="btn btn-gold w-full">
            <MenuBookIcon width={18} height={18} /> Dijital Menü
          </a>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {BRANCHES.map((b) => (
              <a key={b.slug} href={`tel:${b.phone}`} tabIndex={open ? 0 : -1} className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-3">
                <PhoneIcon width={15} height={15} className="text-gold-light" />
                <span className="truncate">{b.name}</span>
              </a>
            ))}
            <a href={instagramLink(BRANCHES[0])} target="_blank" rel="noopener" tabIndex={open ? 0 : -1} className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-3">
              <InstagramIcon width={15} height={15} className="text-gold-light" /> Instagram
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
