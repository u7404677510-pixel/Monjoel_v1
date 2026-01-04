import { MetadataRoute } from "next";
import { citiesIDF } from "@/lib/data/cities-idf";
import { trades } from "@/lib/data/services-definition";

const BASE_URL = "https://monjoel.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Pages statiques principales
  const staticPages = [
    { url: "", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/plomberie", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/serrurerie", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/electricite", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/stop-arnaques", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/a-propos", priority: 0.5, changeFrequency: "monthly" as const },
    { url: "/contact", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/mentions-legales", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/cgu", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/confidentialite", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  // Ajouter les pages statiques
  for (const page of staticPages) {
    entries.push({
      url: `${BASE_URL}${page.url}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    });
  }

  // Sous-pages de services existantes
  const existingServicePages = [
    // Plombier
    "/plombier/fuite-eau",
    "/plombier/wc-bouches",
    "/plombier/degat-des-eaux",
    "/plombier/chauffe-eau-panne",
    "/plombier/remplacement-robinet",
    // Serrurier
    "/serrurier/ouverture-sans-percage",
    "/serrurier/ouverture-avec-percage",
    "/serrurier/perte-cles",
    "/serrurier/cle-cassee-serrure",
    "/serrurier/blindage-porte",
    // Electricien
    "/electricien/panne-electrique",
    "/electricien/disjoncteur-saute",
    "/electricien/tableau-electrique",
    "/electricien/prise-interrupteur-hs",
    "/electricien/court-circuit",
    "/electricien/mise-aux-normes",
  ];

  for (const page of existingServicePages) {
    entries.push({
      url: `${BASE_URL}${page}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    });
  }

  // Pages dynamiques par ville et métier
  for (const trade of trades) {
    // Pages métier/ville (ex: /plombier/paris-15)
    for (const city of citiesIDF) {
      entries.push({
        url: `${BASE_URL}/${trade.slug}/${city.slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      });

      // Pages service/ville (ex: /plombier/paris-15/fuite-eau)
      for (const service of trade.services) {
        entries.push({
          url: `${BASE_URL}/${trade.slug}/${city.slug}/${service.slug}`,
          lastModified: now,
          changeFrequency: "monthly" as const,
          priority: 0.6,
        });
      }
    }
  }

  return entries;
}

// Note: Avec ~300 villes et ~16 services, cela génère environ:
// - 10 pages statiques
// - 16 pages de services existantes
// - 300 * 3 = 900 pages métier/ville
// - 300 * 16 = 4800 pages service/ville
// Total: ~5726 URLs dans le sitemap
//
// Pour plus de 50k URLs, il faudrait créer un sitemap index.




