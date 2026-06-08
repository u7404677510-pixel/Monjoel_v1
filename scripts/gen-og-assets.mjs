/**
 * gen-og-assets — génère les images OG/logo manquantes référencées par le SEO
 * (og-default.jpg, og-image.png, logo.png) qui renvoyaient des 404 (R12).
 *
 * Images brandées MonJoel (violet #7055A7) rendues depuis du SVG via sharp.
 * Lancer : node scripts/gen-og-assets.mjs
 */
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");

const ogSvg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#7055A7"/>
      <stop offset="1" stop-color="#9E76EC"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="84" y="290" font-family="Arial, Helvetica, sans-serif" font-size="120" font-weight="800" fill="#ffffff">Joël</text>
  <text x="88" y="360" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="700" fill="#ffffff">Dépannage sans arnaque</text>
  <text x="88" y="418" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#ffffff" opacity="0.9">Plomberie · Serrurerie · Électricité — Paris &amp; Île-de-France</text>
  <text x="88" y="540" font-family="Arial, Helvetica, sans-serif" font-size="46" font-weight="700" fill="#ffffff">Appelez le 01 41 69 10 08</text>
</svg>`;

const logoSvg = `<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="104" fill="#7055A7"/>
  <text x="256" y="330" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="150" font-weight="800" fill="#ffffff">Joël</text>
</svg>`;

const ogBuf = Buffer.from(ogSvg);
await sharp(ogBuf).jpeg({ quality: 86 }).toFile(join(pub, "og-default.jpg"));
await sharp(ogBuf).png({ compressionLevel: 9 }).toFile(join(pub, "og-image.png"));
await sharp(Buffer.from(logoSvg)).png({ compressionLevel: 9 }).toFile(join(pub, "logo.png"));

for (const f of ["og-default.jpg", "og-image.png", "logo.png"]) {
  const m = await sharp(join(pub, f)).metadata();
  console.log(`✅ ${f} — ${m.width}x${m.height} ${m.format}`);
}
