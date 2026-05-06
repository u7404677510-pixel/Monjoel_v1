/**
 * app/icon.tsx — favicon dynamique 32×32 généré via ImageResponse (edge runtime).
 *
 * Convention Next.js App Router : ce fichier remplace automatiquement
 * /favicon.ico pour la balise <link rel="icon">. Le fichier app/favicon.ico
 * existant reste un fallback legacy pour les browsers très anciens.
 *
 * DA Purple : "J" jaune (#F5D547) sur fond violet (#7055A7).
 * Mini-wordmark — signature visuelle Joël reconnaissable au tab Chrome.
 *
 * Fix Invalid URL : on retire `letterSpacing` (em) — satori tentait de
 * résoudre une font dynamique pour calculer le tracking, ce qui crashait
 * en build SSG sans fetch URL absolue.
 */
import { ImageResponse } from "next/og";

// Edge runtime obligatoire — sinon `@vercel/og` plante en TypeError: Invalid URL
// sur Windows (fileURLToPath('.\\file:\\C:\\...\\noto-sans.ttf')) et casse le
// build prod / le SSG. L'edge runtime ne charge jamais de TTF par fichier URL,
// donc le bug ne se déclenche pas. Pattern aligné avec app/opengraph-image.tsx.
export const runtime = "edge";

// Métadonnées Next.js (utilisées pour générer l'attribut size/type)
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#7055A7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#F5D547",
          fontSize: 22,
          fontWeight: 700,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        J
      </div>
    ),
    { ...size },
  );
}
