import { MetadataRoute } from "next";
import { departmentsIDF, trades as deptTrades } from "@/lib/data/departments-idf";
import { blogArticles } from "@/lib/data/blog-articles";
import { listPremiumPages } from "@/lib/seo/premium/registry";

const BASE_URL = "https://monjoel.fr";

/**
 * Sitemap Ultra Premium.
 *
 * RÈGLE D'OR : on ne liste QUE les URLs réellement indexables :
 *   - Pages statiques (homepage, hubs métier, blog hubs, légal)
 *   - Pages services génériques /[trade]/[service] (pas localisées)
 *   - Pages département /[trade]-[deptCode]
 *   - Pages blog
 *   - Pages PREMIUM /[trade]/[ville] et /[trade]/[ville]/[service]
 *     (= celles enregistrées dans `lib/seo/premium/registry.ts`)
 *
 * Toutes les autres combinaisons ville × métier (× service) sont
 * `noindex, follow` côté HTML et ABSENTES du sitemap.
 *
 * EXCLUSIONS sitemap (volontaires) :
 *   - /admin, /artisan, /client (UIs internes — non publiques)
 *   - /api/* (routes API, pas indexables)
 *   - /test, /truescope (pages d'expérimentation)
 *   - /[slug] (route catch-all dynamique sans contenu propre)
 *   - /recherche (page utilitaire, pas un cluster SEO)
 *
 * CALIBRATION DES PRIORITÉS (échelle Google 0.0–1.0) :
 *   - Home : 1.0 (point d'entrée principal)
 *   - Hubs métier (/plomberie, /serrurerie, /electricite) : 0.9
 *   - Pages dépt + tarifs hub : 0.85
 *   - Pages premium ville : 0.85 (cluster SEO local prioritaire)
 *   - Pages services génériques : 0.8
 *   - Pages premium service : 0.8 (longue traîne, légèrement < ville)
 *   - Blog hub : 0.8
 *   - Articles de blog : 0.7
 *   - Stop arnaques + contact : 0.7
 *   - Pages institutionnelles (/a-propos, /recrutement) : 0.5
 *   - Pages légales : 0.3
 *
 * Heuristiques `lastModified` :
 *   - Pages premium / blog : date réelle de updatedAt (signal de fraîcheur fiable)
 *   - Homepage / hubs métier : date du build (changent souvent côté contenu)
 *   - Pages dépt : décalées de quelques jours pour éviter les dates clonées
 *   - Pages légales : -30j (rarement modifiées)
 *
 * Volume actuel : ~150 URLs publiques (premium + blog + statiques + services + dépts).
 * Limite Google : 50 000 URLs / 50 Mo par sitemap.
 *
 * STRATÉGIE FUTURE — sitemap-index si > 5000 URLs :
 *   Si on prévoit 500+ pages premium en plus, splitter en :
 *     /sitemap.xml         → index master listant les sous-sitemaps
 *     /sitemap-static.xml  → pages institutionnelles (max ~50 URLs)
 *     /sitemap-premium.xml → pages premium ville + service (peut atteindre milliers)
 *     /sitemap-blog.xml    → articles de blog
 *   Implémentation Next.js : `app/sitemap.ts` retourne l'index, et chaque
 *   sous-sitemap vit dans `app/sitemap-[name]/route.ts` qui retourne du XML
 *   manuellement (Next.js ne supporte pas nativement plusieurs MetadataRoute.Sitemap).
 *   Seuil de bascule recommandé : > 5 000 URLs (Google reste tolérant jusqu'à 50k mais
 *   un sitemap segmenté facilite le diagnostic GSC et l'invalidation sélective).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  // Décalages pour éviter d'avoir tous les lastModified identiques (mauvais signal SEO).
  const buildDate = new Date(now);
  const recentDate = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 3); // -3j
  const olderDate = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 14); // -14j
  const legalDate = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 30); // -30j

  const entries: MetadataRoute.Sitemap = [];

  // ============================================
  // 1. Pages statiques principales
  // ============================================
  const staticPages: Array<{
    url: string;
    priority: number;
    changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
    lastModified: Date;
  }> = [
    { url: "", priority: 1.0, changeFrequency: "daily", lastModified: buildDate },
    // Hubs métier
    { url: "/plomberie", priority: 0.9, changeFrequency: "weekly", lastModified: buildDate },
    { url: "/serrurerie", priority: 0.9, changeFrequency: "weekly", lastModified: buildDate },
    { url: "/electricite", priority: 0.9, changeFrequency: "weekly", lastModified: buildDate },
    // Pages tarifs (hubs métier secondaires)
    { url: "/serrurerie/tarifs", priority: 0.85, changeFrequency: "monthly", lastModified: recentDate },
    { url: "/plomberie/tarifs", priority: 0.85, changeFrequency: "monthly", lastModified: recentDate },
    { url: "/electricite/tarifs", priority: 0.85, changeFrequency: "monthly", lastModified: recentDate },
    // Hub blog (changement weekly réaliste — articles ajoutés régulièrement)
    { url: "/blog", priority: 0.8, changeFrequency: "weekly", lastModified: recentDate },
    // Pages contenu fort SEO
    { url: "/stop-arnaques", priority: 0.7, changeFrequency: "monthly", lastModified: olderDate },
    { url: "/contact", priority: 0.7, changeFrequency: "monthly", lastModified: olderDate },
    // Pages institutionnelles
    { url: "/a-propos", priority: 0.5, changeFrequency: "monthly", lastModified: olderDate },
    { url: "/recrutement", priority: 0.5, changeFrequency: "monthly", lastModified: olderDate },
    // Pages légales (rarement updated)
    { url: "/mentions-legales", priority: 0.3, changeFrequency: "yearly", lastModified: legalDate },
    { url: "/cgu", priority: 0.3, changeFrequency: "yearly", lastModified: legalDate },
    { url: "/confidentialite", priority: 0.3, changeFrequency: "yearly", lastModified: legalDate },
  ];
  for (const p of staticPages) {
    entries.push({
      url: `${BASE_URL}${p.url}`,
      lastModified: p.lastModified,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    });
  }

  // ============================================
  // 2. Pages services génériques /[trade]/[service]
  // (Liste en dur car elles existent comme routes statiques.)
  // ============================================
  const existingServicePages = [
    "/plombier/fuite-eau", "/plombier/wc-bouches", "/plombier/degat-des-eaux",
    "/plombier/chauffe-eau-panne", "/plombier/remplacement-robinet",
    "/plombier/debouchage-canalisation", "/plombier/urgence-24h",
    "/plombier/recherche-fuite", "/plombier/ballon-eau-chaude",
    "/plombier/chaudiere-panne", "/plombier/debouchage-wc",
    "/plombier/evier-bouche", "/plombier/chasse-eau", "/plombier/fuite-tuyau",
    "/plombier/installation-wc", "/plombier/groupe-securite", "/plombier/lavabo-bouche",
    "/serrurier/ouverture-sans-percage", "/serrurier/ouverture-avec-percage",
    "/serrurier/perte-cles", "/serrurier/cle-cassee-serrure",
    "/serrurier/blindage-porte", "/serrurier/serrure-bloquee",
    "/serrurier/porte-fermee-a-cle", "/serrurier/changement-cylindre",
    "/serrurier/changement-serrure", "/serrurier/apres-effraction",
    "/serrurier/serrure-3-points", "/serrurier/serrure-multipoints",
    "/serrurier/cylindre-haute-securite",
    "/serrurier/porte-blindee", "/serrurier/coffre-fort", "/serrurier/rideau-metallique",
    "/electricien/panne-electrique", "/electricien/disjoncteur-saute",
    "/electricien/tableau-electrique", "/electricien/prise-interrupteur-hs",
    "/electricien/court-circuit", "/electricien/mise-aux-normes",
  ];
  for (const url of existingServicePages) {
    entries.push({
      url: `${BASE_URL}${url}`,
      lastModified: recentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  // ============================================
  // 3. Pages département (3 trades × 8 dépts = 24 URLs)
  // ============================================
  for (const trade of deptTrades) {
    for (const dept of departmentsIDF) {
      entries.push({
        url: `${BASE_URL}/${trade.slug}-${dept.code}`,
        lastModified: recentDate,
        changeFrequency: "monthly",
        priority: 0.85,
      });
    }
  }

  // ============================================
  // 4. Articles de blog
  // ============================================
  for (const article of blogArticles) {
    entries.push({
      url: `${BASE_URL}/blog/${article.slug}`,
      lastModified: new Date(article.updatedAt || article.publishedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // ============================================
  // 5. Pages PREMIUM (ville × métier × service)
  // Calibration : ville premium 0.85, service premium 0.8.
  // lastModified = updatedAt réel de chaque page (signal de fraîcheur).
  // changeFrequency = monthly (les contenus sont stables, les mises à jour sont
  // ponctuelles — déclarer "weekly" serait mensonger et pénalisé par Google).
  // ============================================
  for (const page of listPremiumPages()) {
    const urlPath = page.serviceSlug
      ? `/${page.trade}/${page.citySlug}/${page.serviceSlug}`
      : `/${page.trade}/${page.citySlug}`;
    entries.push({
      url: `${BASE_URL}${urlPath}`,
      lastModified: new Date(page.updatedAt),
      changeFrequency: "monthly",
      priority: page.serviceSlug ? 0.8 : 0.85,
    });
  }

  return entries;
}
