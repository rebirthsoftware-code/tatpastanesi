"use client";

import { useEffect, useRef, useState } from "react";
import { BRANCHES, whatsappLink } from "@/data/site";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

/** Hangi şubenin aranacağını seçtiren açılır menü. */
export default function CallMenu({
  className = "",
  label = "Ara",
  placement = "bottom",
  align = "right",
  wrapperClassName = "",
  kind = "tel",
  ariaLabel,
}: {
  kind?: "tel" | "whatsapp";
  ariaLabel?: string;
  className?: string;
  label?: string;
  placement?: "bottom" | "top";
  align?: "left" | "right";
  wrapperClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={`relative ${wrapperClassName}`}>
      <button type="button" aria-expanded={open} aria-haspopup="menu" aria-label={ariaLabel} onClick={() => setOpen((o) => !o)} className={className}>
        {kind === "whatsapp" ? <WhatsAppIcon width={label ? 18 : 26} height={label ? 18 : 26} /> : <PhoneIcon width={18} height={18} />}
        {label && <span>{label}</span>}
      </button>
      {open && (
        <div
          role="menu"
          className={`absolute ${align === "left" ? "left-0" : "right-0"} z-50 w-72 overflow-hidden rounded-2xl border border-ink/10 bg-cream text-ink shadow-2xl shadow-cocoa/30 ${
            placement === "top" ? "bottom-full mb-3" : "top-full mt-3"
          }`}
        >
          <p className="border-b border-ink/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-muted">{kind === "whatsapp" ? "WhatsApp – şube seçin" : "Şube seçin"}</p>
          {BRANCHES.map((b) => (
            <a
              key={b.slug}
              role="menuitem"
              href={kind === "whatsapp" ? whatsappLink(b) : `tel:${b.phone}`}
              {...(kind === "whatsapp" ? { target: "_blank", rel: "noopener" } : {})}
              className="flex items-center justify-between gap-3 px-4 py-3 text-sm transition hover:bg-cream-2"
              onClick={() => setOpen(false)}
            >
              <span className="font-semibold">{b.name}</span>
              <span className="tabular-nums text-muted">{b.phoneDisplay}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
