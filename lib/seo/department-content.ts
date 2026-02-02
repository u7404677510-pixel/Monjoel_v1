/**
 * Générateur de contenu SEO pour les pages départements
 * Crée du contenu dynamique pour les 24 landing pages (3 métiers × 8 départements)
 */

import {
  Department,
  departmentsIDF,
  getDepartmentByCode,
  getOtherDepartments,
  trades,
  getTradeBySlug,
  TradeSlug,
} from "@/lib/data/departments-idf";
import { citiesIDF, City } from "@/lib/data/cities-idf";
import { Trade, getServicesByTrade } from "@/lib/data/services-definition";

// ============================================
// CONSTANTES
// ============================================

const BASE_URL = "https://monjoel.fr";
const PHONE_NUMBER = "01 41 69 10 08";

// ============================================
// VARIATIONS DE TEXTES PAR MÉTIER
// ============================================

const heroTitleVariations: Record<TradeSlug, string[]> = {
  plombier: [
    "Plombier dans {deptName} ({deptCode})",
    "Plombier {deptName} – Intervention rapide",
    "Votre plombier en {deptName} ({deptCode})",
  ],
  serrurier: [
    "Serrurier dans {deptName} ({deptCode})",
    "Serrurier {deptName} – Urgence 24h/24",
    "Votre serrurier en {deptName} ({deptCode})",
  ],
  electricien: [
    "Électricien dans {deptName} ({deptCode})",
    "Électricien {deptName} – Dépannage rapide",
    "Votre électricien en {deptName} ({deptCode})",
  ],
};

const heroSubtitleVariations: Record<TradeSlug, string[]> = {
  plombier: [
    "Intervention rapide dans tout le {deptCode}. Prix fixe, artisan vérifié.",
    "Un plombier chez vous en ~30 min dans tout le {deptName}.",
    "Fuite, WC bouché, chauffe-eau... Intervention immédiate dans le {deptCode}.",
  ],
  serrurier: [
    "Ouverture de porte 24h/24 dans tout le {deptCode}. Prix annoncé avant.",
    "Un serrurier chez vous en ~30 min dans tout le {deptName}.",
    "Porte claquée, serrure bloquée... Intervention immédiate dans le {deptCode}.",
  ],
  electricien: [
    "Dépannage électrique 24h/24 dans tout le {deptCode}. Devis instantané.",
    "Un électricien chez vous en ~30 min dans tout le {deptName}.",
    "Panne, court-circuit, disjoncteur... Intervention immédiate dans le {deptCode}.",
  ],
};

const introVariations: Record<TradeSlug, string[]> = {
  plombier: [
    "Vous recherchez un plombier fiable dans le {deptName} ({deptCode}) ? Joël intervient dans les {cityCount} communes du département. Prix fixe annoncé avant intervention, artisans certifiés disponibles 24h/24.",
    "À {deptName}, les habitants font confiance à Joël pour leurs urgences plomberie. Que vous soyez à {mainCities}, nos artisans arrivent en ~30 minutes.",
    "Fuite d'eau, WC bouché, chauffe-eau en panne dans le {deptCode} ? Joël vous envoie un plombier qualifié partout dans le {deptName}. Prix transparent, intervention rapide.",
  ],
  serrurier: [
    "Vous recherchez un serrurier fiable dans le {deptName} ({deptCode}) ? Joël intervient dans les {cityCount} communes du département. Prix fixe annoncé avant intervention, artisans certifiés disponibles 24h/24.",
    "À {deptName}, les habitants font confiance à Joël pour leurs urgences serrurerie. Que vous soyez à {mainCities}, nos artisans arrivent en ~30 minutes.",
    "Porte claquée, serrure bloquée, clés perdues dans le {deptCode} ? Joël vous envoie un serrurier qualifié partout dans le {deptName}. Prix transparent, intervention rapide.",
  ],
  electricien: [
    "Vous recherchez un électricien fiable dans le {deptName} ({deptCode}) ? Joël intervient dans les {cityCount} communes du département. Prix fixe annoncé avant intervention, artisans certifiés disponibles 24h/24.",
    "À {deptName}, les habitants font confiance à Joël pour leurs urgences électricité. Que vous soyez à {mainCities}, nos artisans arrivent en ~30 minutes.",
    "Panne électrique, court-circuit, disjoncteur qui saute dans le {deptCode} ? Joël vous envoie un électricien qualifié partout dans le {deptName}. Prix transparent, intervention rapide.",
  ],
};

// ============================================
// FAQ PAR MÉTIER ET DÉPARTEMENT
// ============================================

export interface FAQItem {
  question: string;
  answer: string;
}

function generateDepartmentFAQ(
  tradeSlug: TradeSlug,
  dept: Department
): FAQItem[] {
  const baseFAQ: FAQItem[] = [
    {
      question: `Quel est le délai d'intervention dans le ${dept.code} ?`,
      answer: `Nos artisans interviennent en moyenne en 30 minutes dans tout le ${dept.name}. En cas d'urgence, nous privilégions les disponibilités les plus proches de votre adresse.`,
    },
    {
      question: `Intervenez-vous dans toutes les villes du ${dept.code} ?`,
      answer: `Oui, nous couvrons l'ensemble du ${dept.name}, soit ${dept.cityCount} communes. Que vous soyez à ${dept.mainCities.slice(0, 3).join(", ")} ou ailleurs, un artisan peut intervenir rapidement.`,
    },
    {
      question: `Les prix sont-ils les mêmes partout dans le ${dept.code} ?`,
      answer: `Oui, nos prix sont fixes et identiques dans tout le département. Pas de majoration selon la ville, pas de frais de déplacement cachés.`,
    },
    {
      question: `Comment payer l'intervention ?`,
      answer: `Vous payez au prix annoncé avant l'intervention. Paiement par carte bancaire, virement ou sur notre application. Facture fournie systématiquement.`,
    },
  ];

  // FAQ spécifiques au métier
  const tradeFAQ: Record<TradeSlug, FAQItem[]> = {
    plombier: [
      {
        question: `Combien coûte un plombier dans le ${dept.code} ?`,
        answer: `Le prix dépend de l'intervention : à partir de 79€ pour un débouchage, 89€ pour une fuite... Le prix exact est annoncé avant le départ de l'artisan.`,
      },
      {
        question: `Intervenez-vous pour les dégâts des eaux dans le ${dept.name} ?`,
        answer: `Oui, en urgence 24h/24. Nous intervenons pour stopper la fuite, sécuriser et vous fournissons une facture pour votre assurance.`,
      },
    ],
    serrurier: [
      {
        question: `Combien coûte un serrurier dans le ${dept.code} ?`,
        answer: `Le prix varie selon la situation : à partir de 89€ pour une porte claquée (sans perçage), 139€ pour une porte blindée... Prix exact annoncé avant intervention.`,
      },
      {
        question: `Ouvrez-vous les portes blindées dans le ${dept.name} ?`,
        answer: `Oui, nos serruriers sont équipés pour tous types de portes : standard, blindées, multipoints. Le prix est adapté à la complexité.`,
      },
    ],
    electricien: [
      {
        question: `Combien coûte un électricien dans le ${dept.code} ?`,
        answer: `Le prix dépend de l'intervention : à partir de 59€ pour une prise HS, 89€ pour une panne... Le prix exact est annoncé avant le départ de l'artisan.`,
      },
      {
        question: `Faites-vous la mise aux normes dans le ${dept.name} ?`,
        answer: `Oui, nos électriciens réalisent des diagnostics et mises aux normes complètes. Demandez un devis gratuit pour connaître les travaux nécessaires.`,
      },
    ],
  };

  return [...baseFAQ, ...(tradeFAQ[tradeSlug] || [])];
}

// ============================================
// UTILITAIRES
// ============================================

/**
 * Hash simple pour variations déterministes
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

/**
 * Sélectionne un élément basé sur le hash
 */
function selectByHash<T>(array: T[], key: string): T {
  const index = hashString(key) % array.length;
  return array[index];
}

/**
 * Remplace les placeholders dans un template
 */
function fillTemplate(
  template: string,
  dept: Department,
  mainCitiesCount: number = 3
): string {
  return template
    .replace(/{deptName}/g, dept.name)
    .replace(/{deptCode}/g, dept.code)
    .replace(/{cityCount}/g, dept.cityCount.toString())
    .replace(/{mainCities}/g, dept.mainCities.slice(0, mainCitiesCount).join(", "));
}

// ============================================
// GÉNÉRATEURS DE CONTENU
// ============================================

/**
 * Génère le titre H1
 */
export function generateDepartmentTitle(
  tradeSlug: TradeSlug,
  dept: Department
): string {
  const variations = heroTitleVariations[tradeSlug];
  const template = selectByHash(variations, `${tradeSlug}-${dept.code}`);
  return fillTemplate(template, dept);
}

/**
 * Génère le sous-titre
 */
export function generateDepartmentSubtitle(
  tradeSlug: TradeSlug,
  dept: Department
): string {
  const variations = heroSubtitleVariations[tradeSlug];
  const template = selectByHash(variations, `sub-${tradeSlug}-${dept.code}`);
  return fillTemplate(template, dept);
}

/**
 * Génère l'introduction
 */
export function generateDepartmentIntro(
  tradeSlug: TradeSlug,
  dept: Department
): string {
  const variations = introVariations[tradeSlug];
  const template = selectByHash(variations, `intro-${tradeSlug}-${dept.code}`);
  return fillTemplate(template, dept, 5);
}

/**
 * Génère la meta description
 */
export function generateDepartmentMetaDescription(
  tradeSlug: TradeSlug,
  dept: Department
): string {
  const tradeNames: Record<TradeSlug, string> = {
    plombier: "Plombier",
    serrurier: "Serrurier",
    electricien: "Électricien",
  };

  const tradeName = tradeNames[tradeSlug];
  const mainCities = dept.mainCities.slice(0, 3).join(", ");

  return `${tradeName} ${dept.name} (${dept.code}). Intervention en 30 min à ${mainCities}... Prix fixe dès 89€. Appelez le ${PHONE_NUMBER}.`;
}

/**
 * Génère le title SEO
 */
export function generateDepartmentSeoTitle(
  tradeSlug: TradeSlug,
  dept: Department
): string {
  const tradeNames: Record<TradeSlug, string> = {
    plombier: "Plombier",
    serrurier: "Serrurier",
    electricien: "Électricien",
  };

  return `${tradeNames[tradeSlug]} ${dept.name} (${dept.code}) | Urgence 24h/24 | Joël`;
}

/**
 * Récupère les villes du département depuis citiesIDF
 */
export function getCitiesByDepartment(deptCode: string): City[] {
  return citiesIDF.filter((city) => city.department === deptCode);
}

/**
 * Récupère les slugs des villes pour les liens
 */
export function getCitySlugs(deptCode: string): string[] {
  return getCitiesByDepartment(deptCode).map((city) => city.slug);
}

// ============================================
// CONTENU DE PAGE COMPLET
// ============================================

export interface DepartmentPageContent {
  // SEO
  seoTitle: string;
  metaDescription: string;
  canonical: string;

  // Hero
  title: string;
  subtitle: string;

  // Content
  introduction: string;
  faq: FAQItem[];

  // Data
  department: Department;
  trade: ReturnType<typeof getTradeBySlug>;
  cities: City[];
  services: ReturnType<typeof getServicesByTrade>;
  otherDepartments: Department[];
}

export function generateDepartmentPageContent(
  tradeSlug: TradeSlug,
  deptCode: string
): DepartmentPageContent | null {
  const dept = getDepartmentByCode(deptCode);
  const trade = getTradeBySlug(tradeSlug);

  if (!dept || !trade) {
    return null;
  }

  const cities = getCitiesByDepartment(deptCode);
  const services = getServicesByTrade(tradeSlug);
  const otherDepts = getOtherDepartments(deptCode);

  return {
    // SEO
    seoTitle: generateDepartmentSeoTitle(tradeSlug, dept),
    metaDescription: generateDepartmentMetaDescription(tradeSlug, dept),
    canonical: `${BASE_URL}/${tradeSlug}-${deptCode}`,

    // Hero
    title: generateDepartmentTitle(tradeSlug, dept),
    subtitle: generateDepartmentSubtitle(tradeSlug, dept),

    // Content
    introduction: generateDepartmentIntro(tradeSlug, dept),
    faq: generateDepartmentFAQ(tradeSlug, dept),

    // Data
    department: dept,
    trade,
    cities,
    services,
    otherDepartments: otherDepts,
  };
}

// ============================================
// GÉNÉRATION STATIQUE
// ============================================

export interface DepartmentSlugParams {
  slug: string;
}

/**
 * Génère tous les params pour generateStaticParams
 * Format: plombier-75, serrurier-92, electricien-93, etc.
 */
export function generateAllDepartmentSlugs(): DepartmentSlugParams[] {
  const params: DepartmentSlugParams[] = [];

  for (const trade of trades) {
    for (const dept of departmentsIDF) {
      params.push({ slug: `${trade.slug}-${dept.code}` });
    }
  }

  return params; // 24 combinaisons
}

/**
 * Parse un slug département en trade + code
 */
export function parseDepartmentSlug(
  slug: string
): { tradeSlug: TradeSlug; deptCode: string } | null {
  // Format: plombier-75, serrurier-92, etc.
  const match = slug.match(/^(plombier|serrurier|electricien)-(\d{2})$/);

  if (!match) {
    return null;
  }

  const tradeSlug = match[1] as TradeSlug;
  const deptCode = match[2];

  // Vérifier que le département existe
  const dept = getDepartmentByCode(deptCode);
  if (!dept) {
    return null;
  }

  return { tradeSlug, deptCode };
}

/**
 * Vérifie si un slug est valide pour une page département
 */
export function isValidDepartmentSlug(slug: string): boolean {
  return parseDepartmentSlug(slug) !== null;
}
