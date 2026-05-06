import { MetadataRoute } from "next";

/**
 * robots.txt — autorise le contenu public indexable, bloque tout le reste.
 *
 * STRATÉGIE (refonte 2026-05-04 post-désindexation Google) :
 *   - Le sitemap n'expose QUE les pages premium (~140 URLs vs ~14 000 routes générables)
 *   - Toute page non-premium retourne `noindex, follow` côté HTML
 *   - On ajoute un Disallow agressif sur :
 *       * Tracking parameters (?utm_, ?fbclid, ?gclid, ?_gl) → crawl waste pur
 *       * Routes back-office, espace client, API internes
 *       * Anciennes routes reproduction-cles (déjà 301 → mais belt+suspenders)
 *   - Crawl-delay 5s pour Bingbot (Google ignore crawl-delay, on agit via GSC)
 *
 * IMPORTANT : on NE bloque PAS les routes ville/service génériques en
 * Disallow car Google a besoin de les explorer pour voir le `noindex`.
 * Sinon il garde l'ancienne version en cache.
 *
 * Sitemap : monjoel.fr/sitemap.xml (généré dynamiquement par Next).
 */
export default function robots(): MetadataRoute.Robots {
  const disallow = [
    // Zones privées et techniques
    "/admin/",
    "/api/",
    "/client/",
    "/artisan/",
    "/_next/",
    "/test/",
    "/monitoring", // tunnel Sentry
    // Tracking parameters — crawl waste (Google les ignore mais ils gonflent
    // le crawl budget). On les bloque proprement.
    "/*?utm_*",
    "/*?fbclid*",
    "/*?gclid*",
    "/*?_gl=*",
    "/*?ref=*",
    "/*?source=*",
    // Recherche interne (générée à la volée, contenu non-canonique)
    "/recherche?*",
    // Pages d'erreur ou techniques internes
    "/404",
    "/500",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      {
        // Bingbot crawle agressivement et apporte peu de trafic FR.
        // On le ralentit pour soulager le serveur.
        userAgent: "Bingbot",
        crawlDelay: 5,
      },
      {
        // Bots SEO tiers (Ahrefs, Semrush, Moz...) : on autorise mais avec
        // crawl-delay (sinon ils tapent fort). Useful pour notre propre audit.
        userAgent: "AhrefsBot",
        crawlDelay: 10,
      },
      {
        userAgent: "SemrushBot",
        crawlDelay: 10,
      },
    ],
    sitemap: "https://monjoel.fr/sitemap.xml",
    host: "https://monjoel.fr",
  };
}





