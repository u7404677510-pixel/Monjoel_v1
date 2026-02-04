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
    "Plombier {city} | Prix Fixe 79€ | 20 min",
    "Plombier Urgence {city} – 24h/24 Sans Majoration",
    "{city} : Plombier dès 79€ | Intervention Express",
    "Dépannage Plomberie {city} | Prix Fixe Garanti",
    "Plombier {city} – Fuite, WC, Chauffe-eau | 79€",
  ],
  serrurier: [
    "Serrurier {city} | Prix Fixe 89€ | 20 min",
    "Serrurier Urgence {city} – 24h/24 Sans Majoration",
    "{city} : Serrurier dès 89€ | Ouverture Porte",
    "Dépannage Serrurerie {city} | Prix Fixe Garanti",
    "Serrurier {city} – Porte Claquée, Serrure | 89€",
  ],
  electricien: [
    "Électricien {city} | Prix Fixe 59€ | 20 min",
    "Électricien Urgence {city} – 24h/24 Sans Majoration",
    "{city} : Électricien dès 59€ | Dépannage Express",
    "Dépannage Électrique {city} | Prix Fixe Garanti",
    "Électricien {city} – Panne, Disjoncteur | 59€",
  ],
};

const heroSubtitleVariations = [
  "⭐ 4.9/5 (947 avis) • Intervention 20 min • Prix fixe, zéro arnaque",
  "Artisan chez vous en 20 min • Prix annoncé = prix payé • Sans majoration 24h/24",
  "Prix clair AVANT intervention • 24h/24 7j/7 • Paiement après satisfaction",
  "Fini les arnaques : prix fixe garanti • Intervention express • Artisan certifié",
  "⭐ 947 clients satisfaits • Devis instantané • Intervention moyenne : 20 min",
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
 * Optimisée avec emojis et keywords Ahrefs
 */
export function generateMetaDescription(trade: Trade, city: City): string {
  const metaTemplates: Record<string, string[]> = {
    serrurier: [
      `Serrurier ${city.name} ⭐ 4.9/5. Ouverture porte 89€, intervention 20 min. Prix fixe garanti, sans majoration 24h/24. 01 41 69 10 08`,
      `Serrurier urgence ${city.name} 🔐 Prix fixe dès 89€. Porte claquée, serrure bloquée. 20 min, zéro arnaque. Appelez maintenant !`,
      `${city.name} : Serrurier prix fixe 89€ ⭐ 947 avis. Ouverture porte, changement serrure. 24h/24 sans majoration.`,
    ],
    plombier: [
      `Plombier ${city.name} ⭐ 4.9/5. Fuite, WC, chauffe-eau dès 79€. Intervention 20 min. Prix fixe, zéro arnaque. 01 41 69 10 08`,
      `Plombier urgence ${city.name} 💧 Prix fixe dès 79€. Dégât des eaux, débouchage. 20 min, sans majoration. Appelez !`,
      `${city.name} : Plombier prix fixe 79€ ⭐ 947 avis. Fuite d'eau, WC bouchés. 24h/24 sans majoration.`,
    ],
    electricien: [
      `Électricien ${city.name} ⭐ 4.9/5. Panne, disjoncteur dès 59€. Intervention 20 min. Prix fixe garanti. 01 41 69 10 08`,
      `Électricien urgence ${city.name} ⚡ Prix fixe dès 59€. Panne électrique, court-circuit. 20 min, zéro arnaque. Appelez !`,
      `${city.name} : Électricien prix fixe 59€ ⭐ 947 avis. Panne, tableau électrique. 24h/24 sans majoration.`,
    ],
  };
  
  const templates = metaTemplates[trade.slug] || [trade.metaDescription.replace("{city}", city.name)];
  return selectByCity(templates, city);
}

/**
 * Génère la meta description pour une page service/ville
 */
export function generateServiceMetaDescription(service: Service, city: City): string {
  return service.metaDescription.replace("{city}", city.name);
}

/**
 * Génère l'introduction unique pour une ville
 * Enrichie avec keywords Ahrefs et argumentaire anti-arnaque
 */
export function generateCityIntroduction(trade: Trade, city: City): string {
  const tradeIntros: Record<string, string[]> = {
    serrurier: [
      `Vous cherchez un serrurier pas cher à ${city.name} (${city.postalCodes[0]}) ? Attention aux arnaques ! Chez Joël, le prix annoncé est le prix payé : ouverture de porte dès 89€, sans majoration nuit ni week-end. Nos artisans certifiés interviennent en 20 minutes en moyenne.`,
      `Porte claquée, serrure bloquée ou clé perdue à ${city.name} ? Joël, c'est le serrurier de confiance du ${city.departmentName}. Prix fixe garanti, zéro arnaque, intervention rapide 24h/24.`,
      `${city.name} : serrurier urgence à prix réel. Pendant que d'autres annoncent 39€ pour facturer 400€ sur place, Joël affiche ses vrais tarifs. Ouverture porte 89€, changement cylindre 120€. Point.`,
      `Besoin d'un serrurier à ${city.name} ? Joël sélectionne les meilleurs artisans du ${city.departmentName}. Prix fixe avant intervention, paiement sécurisé, aucune mauvaise surprise. La serrurerie sans le stress.`,
    ],
    plombier: [
      `Fuite d'eau, WC bouchés ou chauffe-eau en panne à ${city.name} (${city.postalCodes[0]}) ? Joël envoie un plombier certifié en 20 minutes. Prix fixe dès 79€, sans majoration 24h/24. Zéro arnaque, zéro stress.`,
      `Urgence plomberie à ${city.name} ? Les habitants du ${city.departmentName} font confiance à Joël pour un dépannage rapide et transparent. Le prix annoncé est le prix payé, garanti.`,
      `${city.name} : plombier urgence à prix fixe. Fuite, dégât des eaux, débouchage... Intervention en 20 min, prix clair avant de commencer. Joël, la plomberie sans arnaque.`,
      `Besoin d'un plombier à ${city.name} ? Joël connecte les meilleurs artisans du ${city.departmentName} avec les habitants. Prix fixe, devis instantané, intervention express.`,
    ],
    electricien: [
      `Panne électrique, disjoncteur qui saute à ${city.name} (${city.postalCodes[0]}) ? Joël envoie un électricien certifié en 20 minutes. Prix fixe dès 59€, diagnostic inclus. Zéro arnaque, zéro majoration.`,
      `Urgence électrique à ${city.name} ? Les habitants du ${city.departmentName} font confiance à Joël pour un dépannage sécurisé et transparent. Prix fixe, intervention rapide 24h/24.`,
      `${city.name} : électricien urgence à prix réel. Panne, court-circuit, tableau électrique... On vous dit le prix AVANT d'intervenir. Pas de surprise, jamais.`,
      `Besoin d'un électricien à ${city.name} ? Joël sélectionne les artisans certifiés du ${city.departmentName}. Prix fixe, diagnostic gratuit, intervention express.`,
    ],
  };
  
  const intros = tradeIntros[trade.slug] || [
    `Besoin d'un ${trade.name.toLowerCase()} à ${city.name} ? Joël, c'est le dépannage sans arnaque. Prix fixe, intervention rapide, artisans vérifiés.`
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
      answer: `Nos artisans interviennent en moyenne en 20 minutes à ${city.name} et dans tout le ${city.departmentName}. En cas d'urgence, nous envoyons l'artisan le plus proche disponible.`,
    },
    {
      question: `Les prix sont-ils vraiment fixes à ${city.name} ?`,
      answer: `Oui, le prix annoncé est le prix payé. Aucun frais de déplacement caché, aucune majoration nuit/week-end. C'est notre engagement anti-arnaque, vérifié par 947 avis clients.`,
    },
    {
      question: `Comment éviter les arnaques serrurier/plombier ?`,
      answer: `Méfiez-vous des prix trop bas (39€, 49€). Chez Joël, on affiche nos vrais prix : transparence totale. Le prix au téléphone = le prix payé. Toujours.`,
    },
    {
      question: `Intervenez-vous la nuit et le week-end à ${city.name} ?`,
      answer: `Oui, 24h/24, 7j/7, jours fériés inclus. Et le prix reste IDENTIQUE. Aucune majoration, c'est notre promesse depuis le premier jour.`,
    },
  ];
  
  // FAQ spécifiques au métier avec keywords Ahrefs
  const tradeFAQ: Record<string, FAQItem[]> = {
    plombier: [
      {
        question: `Combien coûte un plombier à ${city.name} ?`,
        answer: `Chez Joël : fuite d'eau dès 89€, WC bouchés 79€, chauffe-eau en panne 99€. Prix TTC tout compris, sans surprise. Méfiez-vous des prix à 29€ qui explosent sur place.`,
      },
      {
        question: `Plombier urgence ${city.name} : quel délai ?`,
        answer: `En moyenne 20 minutes. Nos plombiers à ${city.name} et dans le ${city.departmentName} sont disponibles 24h/24 pour fuite, dégât des eaux, WC bouché.`,
      },
    ],
    serrurier: [
      {
        question: `Combien coûte un serrurier à ${city.name} ?`,
        answer: `Chez Joël : ouverture porte claquée 89€, avec perçage 150€, changement cylindre 120€. Prix TTC, sans majoration. Les "serruriers à 39€" sont souvent des arnaques.`,
      },
      {
        question: `Serrurier porte claquée ${city.name} : quel prix ?`,
        answer: `Ouverture de porte claquée sans perçage : 89€ TTC. Si perçage nécessaire (porte blindée, serrure sécurisée) : 150€ TTC. Prix annoncé avant intervention.`,
      },
      {
        question: `Changement serrure à ${city.name} : combien ça coûte ?`,
        answer: `Changement cylindre : 120€. Changement serrure complète : 180€. Serrure 3 points : dès 189€. Tous prix TTC, fourniture incluse. Devis exact au téléphone.`,
      },
    ],
    electricien: [
      {
        question: `Combien coûte un électricien à ${city.name} ?`,
        answer: `Chez Joël : panne électrique dès 89€, disjoncteur qui saute 79€, tableau électrique 129€. Prix TTC, diagnostic inclus. Zéro surprise.`,
      },
      {
        question: `Électricien urgence ${city.name} : quel délai ?`,
        answer: `En moyenne 20 minutes. Nos électriciens à ${city.name} sont disponibles 24h/24 pour panne, court-circuit, disjoncteur. Mise en sécurité immédiate si nécessaire.`,
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
  baseUrl: string = "https://monjoel.fr"
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
  baseUrl: string = "https://monjoel.fr"
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





