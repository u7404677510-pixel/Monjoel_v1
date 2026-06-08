"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/**
 * Capture l'attribution marketing (gclid/utm) au 1er rendu client.
 *
 * Monté une seule fois dans le layout racine. Volontairement SANS
 * useSearchParams (qui forcerait un bail-out du rendu statique des ~356 pages
 * SEO) : le gclid/utm est présent dans l'URL de la landing dès le 1er montage,
 * ce qui suffit. Ne rend rien.
 */
export default function AttributionTracker() {
  useEffect(() => {
    captureAttribution();
  }, []);

  return null;
}
