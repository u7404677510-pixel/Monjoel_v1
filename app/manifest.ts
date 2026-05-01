/**
 * app/manifest.ts — Web App Manifest PWA.
 *
 * Convention Next.js App Router : ce fichier expose
 * /manifest.webmanifest automatiquement. Permet au site d'être
 * "installable" comme une PWA (Add to Home Screen mobile, install
 * desktop Chrome/Edge).
 *
 * theme_color = #7055A7 (joel-violet) — colore l'address bar mobile.
 *
 * Icons : on référence /icon (Next.js le sert via app/icon.tsx) et
 * /apple-icon pour les déclinaisons. Pour 192/512 (recommandé PWA),
 * on utilise /logo.webp comme fallback "any maskable" — il existe
 * déjà dans public/ et est carré-friendly. Si Mehdi génère plus tard
 * des PNG dédiés via Seedance, il suffira de remplacer les `src`.
 */
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Joël - Dépannage urgence Paris & Île-de-France",
    short_name: "Joël",
    description:
      "Plombier, serrurier, électricien d'urgence à Paris et IDF. Prix fixe, intervention 30 min, zéro arnaque.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#7055A7",
    lang: "fr-FR",
    dir: "ltr",
    orientation: "portrait",
    categories: ["business", "utilities", "lifestyle"],
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
      {
        // Fallback PWA 192/512 — utilise le logo webp existant.
        // À remplacer par un PNG carré dédié quand dispo.
        src: "/logo.webp",
        sizes: "192x192",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/logo.webp",
        sizes: "512x512",
        type: "image/webp",
        purpose: "any",
      },
    ],
  };
}
