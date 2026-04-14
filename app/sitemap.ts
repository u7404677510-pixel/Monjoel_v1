import { MetadataRoute } from "next";
import { citiesIDF, getCitiesByDepartment, departments } from "@/lib/data/cities-idf";
import { trades } from "@/lib/data/services-definition";
import { departmentsIDF, trades as deptTrades } from "@/lib/data/departments-idf";
import { blogArticles } from "@/lib/data/blog-articles";

const BASE_URL = "https://monjoel.fr";

/**
 * Sitemap index : génère plusieurs sous-sitemaps pour un meilleur crawl.
 * ID 0 = pages statiques + blog + départements
 * ID 1-3 = pages métier/ville (1 par métier)
 * ID 4-27 = pages service/ville (1 par métier × département, 3×8=24)
 */
export async function generateSitemaps() {
  const sitemaps = [{ id: 0 }];

  // 1 sitemap par métier pour les pages /metier/ville
  trades.forEach((_, i) => {
    sitemaps.push({ id: 1 + i }); // IDs 1, 2, 3
  });

  // 1 sitemap par métier × département pour les pages /metier/ville/service
  let idx = 4;
  for (let t = 0; t < trades.length; t++) {
    for (let d = 0; d < departments.length; d++) {
      sitemaps.push({ id: idx++ });
    }
  }

  return sitemaps;
}

export default function sitemap({ id }: { id: number }): MetadataRoute.Sitemap {
  const now = new Date();

  // ID 0 : pages statiques, services, blog, départements
  if (id === 0) {
    return generateStaticSitemap(now);
  }

  // IDs 1-3 : pages métier/ville
  if (id >= 1 && id <= 3) {
    const tradeIndex = id - 1;
    return generateTradeVilleSitemap(tradeIndex, now);
  }

  // IDs 4+ : pages service/ville par métier × département
  const serviceOffset = id - 4;
  const tradeIndex = Math.floor(serviceOffset / departments.length);
  const deptIndex = serviceOffset % departments.length;
  return generateServiceVilleSitemap(tradeIndex, deptIndex, now);
}

function generateStaticSitemap(now: Date): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  const staticPages = [
    { url: "", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/plomberie", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/serrurerie", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/serrurerie/tarifs", priority: 0.85, changeFrequency: "weekly" as const },
    { url: "/plomberie/tarifs", priority: 0.85, changeFrequency: "weekly" as const },
    { url: "/electricite", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/electricite/tarifs", priority: 0.85, changeFrequency: "weekly" as const },
    { url: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/stop-arnaques", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/a-propos", priority: 0.5, changeFrequency: "monthly" as const },
    { url: "/contact", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/recrutement", priority: 0.5, changeFrequency: "monthly" as const },
    { url: "/mentions-legales", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/cgu", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/confidentialite", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  for (const page of staticPages) {
    entries.push({
      url: `${BASE_URL}${page.url}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    });
  }

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
    "/serrurier/reproduction-cles", "/serrurier/cylindre-haute-securite",
    "/serrurier/porte-blindee", "/serrurier/coffre-fort", "/serrurier/rideau-metallique",
    "/electricien/panne-electrique", "/electricien/disjoncteur-saute",
    "/electricien/tableau-electrique", "/electricien/prise-interrupteur-hs",
    "/electricien/court-circuit", "/electricien/mise-aux-normes",
  ];

  for (const page of existingServicePages) {
    entries.push({
      url: `${BASE_URL}${page}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    });
  }

  for (const article of blogArticles) {
    entries.push({
      url: `${BASE_URL}/blog/${article.slug}`,
      lastModified: new Date(article.updatedAt || article.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    });
  }

  for (const trade of deptTrades) {
    for (const dept of departmentsIDF) {
      entries.push({
        url: `${BASE_URL}/${trade.slug}-${dept.code}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.85,
      });
    }
  }

  return entries;
}

function generateTradeVilleSitemap(tradeIndex: number, now: Date): MetadataRoute.Sitemap {
  const trade = trades[tradeIndex];
  if (!trade) return [];

  return citiesIDF.map((city) => ({
    url: `${BASE_URL}/${trade.slug}/${city.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));
}

function generateServiceVilleSitemap(tradeIndex: number, deptIndex: number, now: Date): MetadataRoute.Sitemap {
  const trade = trades[tradeIndex];
  const dept = departments[deptIndex];
  if (!trade || !dept) return [];

  const cities = getCitiesByDepartment(dept.code);
  const entries: MetadataRoute.Sitemap = [];

  for (const city of cities) {
    for (const service of trade.services) {
      entries.push({
        url: `${BASE_URL}/${trade.slug}/${city.slug}/${service.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      });
    }
  }

  return entries;
}





