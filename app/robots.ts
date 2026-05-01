import { MetadataRoute } from "next";

/**
 * robots.txt — autorise tout le contenu public, bloque les zones privées et techniques.
 *
 * Disallow :
 *   - /admin/*   → backoffice Joël
 *   - /api/*     → endpoints internes
 *   - /client/*  → espace client (auth)
 *   - /artisan/* → espace artisan (auth)
 *   - /_next/*   → assets Next (CSS/JS chunks, déjà servis via cache headers)
 *   - /test/*    → pages de test/preview internes
 *
 * On ne bloque PAS Googlebot ni Bingbot spécifiquement — la règle `*` couvre tout.
 * Le sitemap pointe vers le sitemap.xml généré dynamiquement par Next.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/client/",
          "/artisan/",
          "/_next/",
          "/test/",
        ],
      },
    ],
    sitemap: "https://monjoel.fr/sitemap.xml",
    host: "https://monjoel.fr",
  };
}





