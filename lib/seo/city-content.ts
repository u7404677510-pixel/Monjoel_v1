/**
 * Générateur de contenu SEO unique par ville
 * Crée du contenu dynamique et varié pour éviter le duplicate content
 */

import { City, getNearbyCities } from "@/lib/data/cities-idf";
import { Trade, Service } from "@/lib/data/services-definition";

// ============================================
// VARIATIONS DE TEXTES
// ============================================

const heroTitleVariations = {
  plombier: [
    "Plombier à {city} – Intervention rapide 24h/24",
    "Votre plombier de confiance à {city}",
    "{city} : Plombier disponible en urgence",
    "Plomberie à {city} – Prix fixe, sans surprise",
    "Dépannage plomberie {city} – Artisan certifié",
  ],
  serrurier: [
    "Serrurier à {city} – Ouverture de porte 24h/24",
    "Votre serrurier de confiance à {city}",
    "{city} : Serrurier disponible en urgence",
    "Serrurerie à {city} – Prix fixe garanti",
    "Dépannage serrurerie {city} – Artisan certifié",
  ],
  electricien: [
    "Électricien à {city} – Dépannage 24h/24",
    "Votre électricien de confiance à {city}",
    "{city} : Électricien disponible en urgence",
    "Électricité à {city} – Prix fixe, devis instantané",
    "Dépannage électrique {city} – Artisan certifié",
  ],
};

const heroSubtitleVariations = [
  "Intervention en ~30 minutes. Prix fixe annoncé avant intervention. Artisan vérifié.",
  "Un artisan chez vous en moins de 30 min en moyenne. Devis instantané, prix fixe.",
  "Prix clair avant intervention. Artisan qualifié disponible 24h/24 et 7j/7.",
  "Fini les mauvaises surprises. Prix fixe, intervention rapide, artisan de confiance.",
  "Devis en quelques secondes. Prix garanti. Intervention moyenne : 30 minutes.",
];

const urgencyPhrases = [
  "Besoin urgent ?",
  "Une urgence ?",
  "Problème à résoudre ?",
  "Situation bloquante ?",
  "Intervention nécessaire ?",
];

const ctaPhrases = [
  "Obtenir mon prix",
  "Devis instantané",
  "Voir mon prix",
  "Calculer mon devis",
  "Prix en 30 secondes",
];

const trustBadges = [
  { icon: "Clock", text: "Intervention ~30 min" },
  { icon: "Shield", text: "Artisans vérifiés" },
  { icon: "Euro", text: "Prix fixe garanti" },
  { icon: "CheckCircle", text: "Satisfaction garantie" },
  { icon: "Phone", text: "Disponible 24h/24" },
  { icon: "Star", text: "4.8/5 (2000+ avis)" },
];

// ============================================
// GÉNÉRATEURS DE CONTENU
// ============================================

/**
 * Génère un hash simple basé sur le nom de la ville
 * pour créer des variations déterministes
 */
function cityHash(cityName: string): number {
  let hash = 0;
  for (let i = 0; i < cityName.length; i++) {
    const char = cityName.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

/**
 * Sélectionne un élément d'un tableau basé sur le hash de la ville
 */
function selectByCity<T>(array: T[], city: City): T {
  const index = cityHash(city.name) % array.length;
  return array[index];
}

/**
 * Génère le titre hero pour une page métier/ville
 */
export function generateHeroTitle(trade: Trade, city: City): string {
  const variations = heroTitleVariations[trade.slug as keyof typeof heroTitleVariations] || heroTitleVariations.plombier;
  const template = selectByCity(variations, city);
  return template.replace("{city}", city.name);
}

/**
 * Génère le sous-titre hero
 */
export function generateHeroSubtitle(city: City): string {
  return selectByCity(heroSubtitleVariations, city);
}

/**
 * Génère le titre pour une page service/ville
 */
export function generateServiceTitle(service: Service, city: City): string {
  return `${service.name} à ${city.name} – Intervention rapide`;
}

/**
 * Génère la meta description pour une page métier/ville
 */
export function generateMetaDescription(trade: Trade, city: City): string {
  const baseDesc = trade.metaDescription.replace("{city}", city.name);
  return baseDesc;
}

/**
 * Génère la meta description pour une page service/ville
 */
export function generateServiceMetaDescription(service: Service, city: City): string {
  return service.metaDescription.replace("{city}", city.name);
}

/**
 * Génère l'introduction unique pour une ville
 */
export function generateCityIntroduction(trade: Trade, city: City): string {
  const intros = [
    `Vous recherchez un ${trade.name.toLowerCase()} fiable à ${city.name} (${city.postalCodes[0]}) ? Joël vous connecte avec des artisans certifiés, disponibles 24h/24. Prix fixe, intervention rapide, zéro mauvaise surprise.`,
    `À ${city.name}, les habitants du ${city.departmentName} font confiance à Joël pour leurs urgences en ${trade.name.toLowerCase()}. Un artisan chez vous en ~30 minutes, au prix annoncé.`,
    `Besoin d'un ${trade.name.toLowerCase()} à ${city.name} ? Joël sélectionne les meilleurs artisans du ${city.departmentName}. Prix clair avant intervention, aucun frais caché.`,
    `${city.name} : votre ${trade.name.toLowerCase()} arrive en moins de 30 minutes en moyenne. Joël, c'est le dépannage nouvelle génération – transparent, rapide, au juste prix.`,
  ];
  
  return selectByCity(intros, city);
}

/**
 * Génère les points forts pour une ville
 */
export function generateCityHighlights(trade: Trade, city: City): string[] {
  const baseHighlights = [
    `Artisans vérifiés à ${city.name} et ses environs`,
    `Intervention en ~30 minutes dans tout le ${city.departmentName}`,
    `Prix fixe annoncé avant le départ de l'artisan`,
    `Disponible 24h/24, 7j/7 – même les jours fériés`,
    `Paiement avant intervention – aucune mauvaise surprise`,
  ];
  
  // Ajouter des highlights spécifiques au métier
  const tradeHighlights: Record<string, string[]> = {
    plombier: [
      "Détection de fuite avec matériel professionnel",
      "Tous types d'interventions : fuite, WC, chauffe-eau...",
    ],
    serrurier: [
      "Ouverture sans dégât quand c'est possible",
      "Tous types de portes : standard, blindée, sécurisée...",
    ],
    electricien: [
      "Mise en sécurité immédiate si nécessaire",
      "Diagnostic complet de votre installation",
    ],
  };
  
  return [
    ...baseHighlights.slice(0, 3),
    ...(tradeHighlights[trade.slug] || []),
  ];
}

/**
 * Génère le texte de la zone d'intervention
 */
export function generateZoneText(city: City): string {
  const nearbyCities = getNearbyCities(city, 6);
  const nearbyNames = nearbyCities.map(c => c.name).join(", ");
  
  return `Nos artisans interviennent à ${city.name} et dans les villes voisines : ${nearbyNames}. Toute l'Île-de-France est couverte.`;
}

/**
 * Génère un CTA phrase
 */
export function generateCtaPhrase(city: City): string {
  return selectByCity(ctaPhrases, city);
}

/**
 * Génère une phrase d'urgence
 */
export function generateUrgencyPhrase(city: City): string {
  return selectByCity(urgencyPhrases, city);
}

/**
 * Sélectionne 3 trust badges
 */
export function selectTrustBadges(city: City): typeof trustBadges {
  const hash = cityHash(city.name);
  const selected: typeof trustBadges = [];
  const indices = new Set<number>();
  
  // Toujours inclure prix fixe et intervention rapide
  selected.push(trustBadges[0]); // Intervention
  selected.push(trustBadges[2]); // Prix fixe
  
  // Ajouter un troisième badge variable
  const thirdOptions = [1, 3, 4, 5];
  const thirdIndex = thirdOptions[hash % thirdOptions.length];
  selected.push(trustBadges[thirdIndex]);
  
  return selected;
}

// ============================================
// CONTENU FAQ DYNAMIQUE
// ============================================

export interface FAQItem {
  question: string;
  answer: string;
}

export function generateCityFAQ(trade: Trade, city: City): FAQItem[] {
  const baseFAQ: FAQItem[] = [
    {
      question: `Quel est le délai d'intervention à ${city.name} ?`,
      answer: `Nos artisans interviennent en moyenne en 30 minutes à ${city.name} et dans tout le ${city.departmentName}. En cas d'urgence, nous privilégions les disponibilités les plus proches.`,
    },
    {
      question: `Les prix sont-ils vraiment fixes ?`,
      answer: `Oui, le prix annoncé est le prix que vous payez. Aucun frais de déplacement caché, aucune majoration sur place. Vous payez avant l'intervention, au prix exact du devis.`,
    },
    {
      question: `Comment sont sélectionnés vos artisans ?`,
      answer: `Tous nos artisans sont certifiés et vérifiés. Nous contrôlons leurs qualifications, leurs assurances et recueillons les avis clients après chaque intervention.`,
    },
    {
      question: `Intervenez-vous les weekends et jours fériés ?`,
      answer: `Oui, nos artisans sont disponibles 24h/24 et 7j/7, y compris les weekends et jours fériés. Le prix reste fixe, sans majoration.`,
    },
  ];
  
  // FAQ spécifiques au métier
  const tradeFAQ: Record<string, FAQItem[]> = {
    plombier: [
      {
        question: `Puis-je avoir un plombier en urgence à ${city.name} ?`,
        answer: `Absolument. Nos plombiers à ${city.name} sont disponibles 24h/24 pour toute urgence : fuite, dégât des eaux, WC bouché... Intervention rapide garantie.`,
      },
    ],
    serrurier: [
      {
        question: `Ouvrez-vous les portes blindées à ${city.name} ?`,
        answer: `Oui, nos serruriers à ${city.name} sont équipés pour ouvrir tous types de portes, y compris les portes blindées. Le prix varie selon la méthode nécessaire.`,
      },
    ],
    electricien: [
      {
        question: `Faites-vous la mise aux normes à ${city.name} ?`,
        answer: `Oui, nos électriciens à ${city.name} réalisent des mises aux normes complètes. Demandez un diagnostic gratuit pour connaître les travaux nécessaires.`,
      },
    ],
  };
  
  return [...baseFAQ, ...(tradeFAQ[trade.slug] || [])];
}

// ============================================
// GÉNÉRATION SEO COMPLÈTE
// ============================================

export interface CityPageContent {
  title: string;
  subtitle: string;
  metaDescription: string;
  introduction: string;
  highlights: string[];
  zoneText: string;
  ctaPhrase: string;
  urgencyPhrase: string;
  trustBadges: typeof trustBadges;
  faq: FAQItem[];
  canonical: string;
}

export function generateCityPageContent(
  trade: Trade,
  city: City,
  baseUrl: string = "https://monjoel.com"
): CityPageContent {
  return {
    title: generateHeroTitle(trade, city),
    subtitle: generateHeroSubtitle(city),
    metaDescription: generateMetaDescription(trade, city),
    introduction: generateCityIntroduction(trade, city),
    highlights: generateCityHighlights(trade, city),
    zoneText: generateZoneText(city),
    ctaPhrase: generateCtaPhrase(city),
    urgencyPhrase: generateUrgencyPhrase(city),
    trustBadges: selectTrustBadges(city),
    faq: generateCityFAQ(trade, city),
    canonical: `${baseUrl}/${trade.slug}/${city.slug}`,
  };
}

export interface ServicePageContent extends CityPageContent {
  serviceTitle: string;
  serviceDescription: string;
  priceFrom: number;
}

export function generateServicePageContent(
  trade: Trade,
  service: Service,
  city: City,
  baseUrl: string = "https://monjoel.com"
): ServicePageContent {
  const baseContent = generateCityPageContent(trade, city, baseUrl);
  
  return {
    ...baseContent,
    title: generateServiceTitle(service, city),
    metaDescription: generateServiceMetaDescription(service, city),
    serviceTitle: service.name,
    serviceDescription: service.description,
    priceFrom: service.priceFrom,
    canonical: `${baseUrl}/${trade.slug}/${city.slug}/${service.slug}`,
  };
}





