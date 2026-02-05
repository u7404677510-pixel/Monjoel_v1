import { MetadataRoute } from "next";
import { citiesIDF } from "@/lib/data/cities-idf";
import { trades } from "@/lib/data/services-definition";
import { departmentsIDF, trades as deptTrades } from "@/lib/data/departments-idf";
import { blogArticles } from "@/lib/data/blog-articles";

const BASE_URL = "https://monjoel.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Pages statiques principales
  const staticPages = [
    { url: "", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/plomberie", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/serrurerie", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/serrurerie/tarifs", priority: 0.85, changeFrequency: "weekly" as const },
    { url: "/plomberie/tarifs", priority: 0.85, changeFrequency: "weekly" as const },
    { url: "/electricite", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
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
    // Plombier - Services originaux
    "/plombier/fuite-eau",
    "/plombier/wc-bouches",
    "/plombier/degat-des-eaux",
    "/plombier/chauffe-eau-panne",
    "/plombier/remplacement-robinet",
    // Plombier - Nouveaux services Ahrefs
    "/plombier/debouchage-canalisation",
    "/plombier/urgence-24h",
    "/plombier/recherche-fuite",
    "/plombier/ballon-eau-chaude",
    "/plombier/chaudiere-panne",
    "/plombier/debouchage-wc",
    // Plombier - Services supplémentaires scaling
    "/plombier/evier-bouche",
    "/plombier/chasse-eau",
    "/plombier/fuite-tuyau",
    "/plombier/installation-wc",
    "/plombier/groupe-securite",
    "/plombier/lavabo-bouche",
    // Serrurier - Services originaux
    "/serrurier/ouverture-sans-percage",
    "/serrurier/ouverture-avec-percage",
    "/serrurier/perte-cles",
    "/serrurier/cle-cassee-serrure",
    "/serrurier/blindage-porte",
    "/serrurier/serrure-bloquee",
    "/serrurier/porte-fermee-a-cle",
    "/serrurier/changement-cylindre",
    "/serrurier/changement-serrure",
    "/serrurier/apres-effraction",
    // Serrurier - Nouveaux services Ahrefs
    "/serrurier/serrure-3-points",
    "/serrurier/serrure-multipoints",
    "/serrurier/reproduction-cles",
    "/serrurier/cylindre-haute-securite",
    "/serrurier/porte-blindee",
    "/serrurier/coffre-fort",
    "/serrurier/rideau-metallique",
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

  // Articles de blog
  for (const article of blogArticles) {
    entries.push({
      url: `${BASE_URL}/blog/${article.slug}`,
      lastModified: new Date(article.updatedAt || article.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    });
  }

  // Pages départements (24 pages: 3 métiers × 8 départements)
  for (const trade of deptTrades) {
    for (const dept of departmentsIDF) {
      entries.push({
        url: `${BASE_URL}/${trade.slug}-${dept.code}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.85, // Priorité haute car pages de niveau département
      });
    }
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

// Note: Avec ~970 villes et ~42 services (18 serrurerie + 18 plomberie + 6 électricité), cela génère environ:
// - 13 pages statiques (dont tarifs)
// - 40 pages de services existantes  
// - 18+ articles de blog (10 serrurerie + 8 plomberie)
// - 24 pages départements
// - 970 * 3 = 2910 pages métier/ville
// - 970 * 42 = 40740 pages service/ville
// Total: ~43 700+ URLs dans le sitemap
//
// Pour plus de 50k URLs, il faudrait créer un sitemap index.





