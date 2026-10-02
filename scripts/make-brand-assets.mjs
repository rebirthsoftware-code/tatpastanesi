// Favicon ve sosyal medya paylaşım görselini (og.jpg) üretir.
import sharp from "sharp";

const logo = "public/images/tat-logo.png";

for (const [file, size] of [["src/app/icon.png", 192], ["src/app/apple-icon.png", 180]]) {
  const inner = Math.round(size * 0.92);
  const l = await sharp(logo).resize({ width: inner, height: inner, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: file.includes("apple") ? "#fbf6ee" : { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: l, gravity: "center" }])
    .png()
    .toFile(file);
}

const W = 1200, H = 630;
const tile = (src, w, h) => sharp(src).resize(w, h, { fit: "cover" }).toBuffer();
const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0.35" stop-color="#1c120e"/><stop offset="0.75" stop-color="#1c120e" stop-opacity="0"/></linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <text x="70" y="420" font-family="Georgia, serif" font-size="64" fill="#fbf6ee">Ustalıkla yapılan</text>
  <text x="70" y="495" font-family="Georgia, serif" font-style="italic" font-size="64" fill="#e6c987">tatlı sanatı.</text>
  <text x="72" y="560" font-family="Arial, sans-serif" font-size="24" letter-spacing="4" fill="#fbf6ee" fill-opacity="0.7">2001'DEN BERİ ANKARA · 5 ŞUBE</text>
</svg>`);
await sharp({ create: { width: W, height: H, channels: 3, background: "#1c120e" } })
  .composite([
    { input: await tile("public/images/products/rumc.jpg", 420, 630), left: 780, top: 0 },
    { input: await tile("public/images/products/baklava.jpg", 420, 315), left: 480, top: 0 },
    { input: await tile("public/images/neden3.jpg", 420, 315), left: 480, top: 315 },
    { input: svg, left: 0, top: 0 },
    { input: await sharp(logo).resize({ width: 260 }).toBuffer(), left: 64, top: 60 },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile("public/images/og.jpg");
console.log("ok");
