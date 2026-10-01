import Image from "next/image";
import Link from "next/link";
import { BRANCHES, NAV, SITE, instagramLink } from "@/data/site";
import { InstagramIcon, MenuBookIcon, PhoneIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="on-dark grain relative overflow-hidden bg-cocoa pb-28 pt-20 text-cream/80 md:pb-10">
      <div className="container-x relative">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Image src="/images/tat-logo.png" alt={SITE.name} width={900} height={649} className="h-auto w-36" />
            <p className="mt-6 max-w-sm font-display text-2xl leading-snug text-cream">
              {SITE.founded}&apos;den beri Ankara&apos;nın tatlı anlarına eşlik ediyoruz.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={SITE.menuUrl} target="_blank" rel="noopener" className="btn btn-gold">
                <MenuBookIcon width={18} height={18} /> Dijital Menü
              </a>
              <Link href="/ozel-siparis/" className="btn btn-ghost text-cream">
                Pasta Siparişi
              </Link>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-[1fr_2fr]">
            <div>
              <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-gold-light">Sayfalar</h2>
              <ul className="mt-5 space-y-3">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="transition hover:text-cream">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-gold-light">Şubelerimiz</h2>
              <ul className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {BRANCHES.map((b) => (
                  <li key={b.slug}>
                    <p className="font-semibold text-cream">{b.name}</p>
                    <a href={`tel:${b.phone}`} className="mt-1 flex items-center gap-2 text-sm tabular-nums transition hover:text-cream">
                      <PhoneIcon width={14} height={14} /> {b.phoneDisplay}
                    </a>
                    <a href={instagramLink(b)} target="_blank" rel="noopener" className="mt-1 flex items-center gap-2 text-sm transition hover:text-cream">
                      <InstagramIcon width={14} height={14} /> @{b.instagram}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-cream/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. Tüm hakları saklıdır.</p>
          <p>
            Tasarım &amp; Geliştirme:{" "}
            <a href="https://www.instagram.com/rebirthsoftware/" target="_blank" rel="noopener" className="text-cream/80 underline-offset-4 hover:underline">
              Rebirth Software
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
