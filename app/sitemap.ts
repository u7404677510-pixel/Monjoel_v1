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
 * Quand une nouvelle page est promue Premium (registry mis à jour),
 * elle apparaît automatiquement ici au prochain build.
 *
 * Heuristiques `lastModified` :
 *   - Homepage / hubs métier : date du build (changent souvent côté contenu)
 *   - Pages dépt / hub : décalées de quelques jours pour ne pas avoir une
 *     date identique partout (Google n'aime pas les dates clonées en bloc)
 *   - Pages premium / blog : date réelle de updatedAt
 *
 * Volume actuel : ~7869 URLs → en dessous de la limite Google de 50 000.
 * Si on dépasse 45 000 URLs, prévoir un sitemap index (lib/seo/sitemap-index).
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
    { url: "/plomberie", priority: 0.9, changeFrequency: "weekly", lastModified: buildDate },
    { url: "/serrurerie", priority: 0.9, changeFrequency: "weekly", lastModified: buildDate },
    { url: "/electricite", priority: 0.9, changeFrequency: "weekly", lastModified: buildDate },
    { url: "/serrurerie/tarifs", priority: 0.85, changeFrequency: "weekly", lastModified: recentDate },
    { url: "/plomberie/tarifs", priority: 0.85, changeFrequency: "weekly", lastModified: recentDate },
    { url: "/electricite/tarifs", priority: 0.85, changeFrequency: "weekly", lastModified: recentDate },
    { url: "/blog", priority: 0.8, changeFrequency: "weekly", lastModified: recentDate },
    { url: "/stop-arnaques", priority: 0.8, changeFrequency: "monthly", lastModified: olderDate },
    { url: "/a-propos", priority: 0.5, changeFrequency: "monthly", lastModified: olderDate },
    { url: "/contact", priority: 0.6, changeFrequency: "monthly", lastModified: olderDate },
    { url: "/recrutement", priority: 0.5, changeFrequency: "monthly", lastModified: olderDate },
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
        changeFrequency: "weekly",
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
  // ============================================
  for (const page of listPremiumPages()) {
    const urlPath = page.serviceSlug
      ? `/${page.trade}/${page.citySlug}/${page.serviceSlug}`
      : `/${page.trade}/${page.citySlug}`;
    entries.push({
      url: `${BASE_URL}${urlPath}`,
      lastModified: new Date(page.updatedAt),
      changeFrequency: page.serviceSlug ? "monthly" : "weekly",
      priority: page.serviceSlug ? 0.75 : 0.85,
    });
  }

  return entries;
}
