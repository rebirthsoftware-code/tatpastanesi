import CallMenu from "./CallMenu";

/** Masaüstünde sağ altta sabit WhatsApp düğmesi (mobilde alt çubuk var). */
export default function WhatsAppFab() {
  return (
    <div className="fixed bottom-6 right-6 z-40 hidden md:block">
      <CallMenu
        kind="whatsapp"
        label=""
        placement="top"
        ariaLabel="WhatsApp ile yazın"
        className="grid size-15 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.7)] transition hover:scale-105"
      />
    </div>
  );
}
