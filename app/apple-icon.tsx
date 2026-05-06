/**
 * app/apple-icon.tsx — Apple Touch Icon 180×180 (homescreen iOS, Safari).
 *
 * Convention Next.js App Router : génère automatiquement
 * <link rel="apple-touch-icon" href="/apple-icon" sizes="180x180" />.
 *
 * DA Purple : gradient violet 7055A7 → 9E76EC, "J" jaune (#F5D547).
 *
 * Fix Invalid URL : on retire `letterSpacing` (em) — satori tentait de
 * résoudre une font dynamique pour calculer le tracking, ce qui crashait
 * en build SSG sans fetch URL absolue. On ajoute aussi un borderRadius 32
 * pour un rendu propre côté Android (iOS fait son squircle natif quoi qu'il
 * arrive, donc le borderRadius ne pose pas de souci là-bas).
 */
import { ImageResponse } from "next/og";

// Edge runtime obligatoire — sinon `@vercel/og` plante en TypeError: Invalid URL
// sur Windows (fileURLToPath('.\\file:\\C:\\...\\noto-sans.ttf')) et casse le
// build prod / le SSG. L'edge runtime ne charge jamais de TTF par fichier URL,
// donc le bug ne se déclenche pas. Pattern aligné avec app/opengraph-image.tsx.
export const runtime = "edge";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #7055A7 0%, #9E76EC 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#F5D547",
          fontSize: 110,
          fontWeight: 800,
          fontFamily: "system-ui, sans-serif",
          borderRadius: 32,
        }}
      >
        J
      </div>
    ),
    { ...size },
  );
}
