"use client";

import { useState, type FormEvent } from "react";
import { BRANCHES, CATEGORIES, whatsappLink } from "@/data/site";
import { WhatsAppIcon } from "./Icons";

const TYPES = ["Tasarım Pasta (fotoğraflı / yazılı)", "Şeker Hamurlu Tasarım Pasta", "Günlük Pasta", "Tatlı / Baklava Tepsisi", "Paket Dondurma", "Diğer"];
const OCCASIONS = ["Doğum günü", "Nişan / Söz", "Düğün", "Yıl dönümü", "Kutlama / Organizasyon", "Diğer"];
const FLAVORS = CATEGORIES.find((c) => c.slug === "yas-pasta")!.varieties!.list;

const field =
  "w-full rounded-2xl border border-ink/15 bg-cream px-4 py-3.5 text-[15px] outline-none transition placeholder:text-muted/70 focus:border-brand focus:ring-4 focus:ring-brand/10";
const labelCls = "mb-2 block text-sm font-bold";

export default function OrderForm() {
  const [branch, setBranch] = useState(BRANCHES[0].slug);
  const [sent, setSent] = useState(false);
  const minDate = new Date(Date.now() + 24 * 3600 * 1000).toISOString().slice(0, 10);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const b = BRANCHES.find((x) => x.slug === branch)!;
    const date = d.get("date") ? new Date(String(d.get("date"))).toLocaleDateString("tr-TR", { day: "numeric", month: "long", weekday: "long" }) : "-";
    const lines = [
      "Merhaba, web sitenizden özel sipariş vermek istiyorum 🎂",
      "",
      `*Ad Soyad:* ${d.get("name")}`,
      `*Telefon:* ${d.get("phone")}`,
      `*Şube:* ${b.name}`,
      `*Teslim tarihi:* ${date}${d.get("time") ? ` – ${d.get("time")}` : ""}`,
      `*Ürün:* ${d.get("type")}`,
      `*Özel gün:* ${d.get("occasion")}`,
      `*Kişi sayısı:* ${d.get("people")}`,
      d.get("flavor") ? `*Lezzet:* ${d.get("flavor")}` : "",
      d.get("text") ? `*Pasta üzeri yazı:* ${d.get("text")}` : "",
      d.get("notes") ? `*Notlar:* ${d.get("notes")}` : "",
      "",
      "Örnek model fotoğrafını bu mesajın ardından gönderiyorum.",
    ].filter((l, i, a) => l !== "" || (a[i - 1] ?? "") !== "");
    window.open(whatsappLink(b, lines.join("\n")), "_blank", "noopener");
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="name" className={labelCls}>Ad Soyad *</label>
        <input id="name" name="name" required autoComplete="name" className={field} placeholder="Adınız ve soyadınız" />
      </div>
      <div>
        <label htmlFor="phone" className={labelCls}>Telefon *</label>
        <input id="phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" pattern="[0-9 +()-]{10,}" className={field} placeholder="05xx xxx xx xx" />
      </div>

      <fieldset className="sm:col-span-2">
        <legend className={labelCls}>Teslim alacağınız şube *</legend>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
          {BRANCHES.map((b) => (
            <label
              key={b.slug}
              className={`cursor-pointer rounded-2xl border px-3 py-3 text-center text-sm font-semibold transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand/20 ${
                branch === b.slug ? "border-brand bg-brand text-cream" : "border-ink/15 bg-cream hover:border-ink/40"
              }`}
            >
              <input type="radio" name="branch" value={b.slug} checked={branch === b.slug} onChange={() => setBranch(b.slug)} className="sr-only" />
              {b.name}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="date" className={labelCls}>Teslim tarihi *</label>
        <input id="date" name="date" type="date" required min={minDate} className={field} />
      </div>
      <div>
        <label htmlFor="time" className={labelCls}>Teslim saati</label>
        <input id="time" name="time" type="time" min="09:00" max="23:30" className={field} />
      </div>
      <div>
        <label htmlFor="type" className={labelCls}>Ürün *</label>
        <select id="type" name="type" required className={field} defaultValue={TYPES[0]}>
          {TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="occasion" className={labelCls}>Özel gün</label>
        <select id="occasion" name="occasion" className={field} defaultValue={OCCASIONS[0]}>
          {OCCASIONS.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="people" className={labelCls}>Kişi sayısı *</label>
        <input id="people" name="people" type="number" min={4} max={500} required defaultValue={10} className={field} />
      </div>
      <div>
        <label htmlFor="flavor" className={labelCls}>Lezzet tercihi</label>
        <input id="flavor" name="flavor" list="flavors" className={field} placeholder="Örn. Çilekli, Lotuslu" />
        <datalist id="flavors">{FLAVORS.map((f) => <option key={f} value={f} />)}</datalist>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="text" className={labelCls}>Pasta üzerine yazı</label>
        <input id="text" name="text" maxLength={60} className={field} placeholder="Örn. İyi ki doğdun Kayra!" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="notes" className={labelCls}>Tasarım ve notlarınız</label>
        <textarea id="notes" name="notes" rows={4} className={field} placeholder="Tema, renkler, figürler, alerji bilgisi…" />
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2 md:flex-row md:items-center md:justify-between">
        <p className="max-w-md text-sm leading-relaxed text-muted">
          Gönder&apos;e bastığınızda bilgileriniz seçtiğiniz şubenin WhatsApp hattına hazır mesaj olarak aktarılır. Örnek fotoğrafı
          oradan iletebilirsiniz.
        </p>
        <button type="submit" className="btn btn-primary shrink-0">
          <WhatsAppIcon width={18} height={18} /> WhatsApp ile Gönder
        </button>
      </div>
      {sent && (
        <p role="status" className="rounded-2xl bg-emerald-600/10 p-4 text-sm font-semibold text-emerald-800 sm:col-span-2">
          Teşekkürler! WhatsApp açılmadıysa şubemizi doğrudan arayabilirsiniz: {BRANCHES.find((b) => b.slug === branch)!.phoneDisplay}
        </p>
      )}
    </form>
  );
}
