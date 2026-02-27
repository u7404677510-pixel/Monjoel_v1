/**
 * Configuration A/B Test - 3 métiers x 3 variantes
 */

export type TradeType = "serrurerie" | "plomberie" | "electricite";
export type VariantType = "A" | "B" | "C";

export interface ServiceItem {
  name: string;
  price: string;
  description: string;
}

export interface TradeConfig {
  slug: TradeType;
  name: string;
  namePlural: string;
  heroTitle: string;
  heroImage: string;
  heroVideo?: string;
  priceFrom: number;
  mainService: string;
  mainServicePrice: string;
  services: ServiceItem[];
  keywords: string[];
}

export const tradeConfigs: Record<TradeType, TradeConfig> = {
  serrurerie: {
    slug: "serrurerie",
    name: "Serrurier",
    namePlural: "serruriers",
    heroTitle: "Serrurier d'urgence Paris",
    heroImage: "/hero-serrurerie.webp",
    heroVideo: "/videos/hero-artisan.webm",
    priceFrom: 29,
    mainService: "Ouverture porte claquée",
    mainServicePrice: "à partir de 29€",
    services: [
      { name: "Ouverture porte claquée", price: "89€", description: "Sans perçage" },
      { name: "Ouverture avec perçage", price: "150€", description: "Cylindre à remplacer" },
      { name: "Changement cylindre", price: "120€", description: "Fourniture incluse" },
      { name: "Clé cassée dans serrure", price: "95€", description: "Extraction + copie" },
    ],
    keywords: ["serrurier", "porte claquée", "serrure", "clé perdue"],
  },
  plomberie: {
    slug: "plomberie",
    name: "Plombier",
    namePlural: "plombiers",
    heroTitle: "Plombier d'urgence Paris",
    heroImage: "/hero-plomberie.jpg",
    priceFrom: 29,
    mainService: "Fuite d'eau",
    mainServicePrice: "à partir de 29€",
    services: [
      { name: "Fuite d'eau", price: "89€", description: "Réparation durable" },
      { name: "WC bouchés", price: "79€", description: "Débouchage rapide" },
      { name: "Dégât des eaux", price: "129€", description: "Attestation assurance" },
      { name: "Chauffe-eau en panne", price: "99€", description: "Diagnostic + réparation" },
    ],
    keywords: ["plombier", "fuite", "WC bouché", "dégât des eaux"],
  },
  electricite: {
    slug: "electricite",
    name: "Électricien",
    namePlural: "électriciens",
    heroTitle: "Électricien d'urgence Paris",
    heroImage: "/hero-electricite.jpg",
    priceFrom: 29,
    mainService: "Panne électrique",
    mainServicePrice: "à partir de 29€",
    services: [
      { name: "Panne électrique", price: "79€", description: "Rétablissement rapide" },
      { name: "Disjoncteur qui saute", price: "69€", description: "Diagnostic + réparation" },
      { name: "Tableau électrique", price: "149€", description: "Dépannage ou remplacement" },
      { name: "Prise / Interrupteur HS", price: "59€", description: "Remplacement" },
    ],
    keywords: ["électricien", "panne électrique", "disjoncteur", "court-circuit"],
  },
};

/**
 * Configuration des tests A/B par métier
 */
export interface ABTestConfig {
  id: string;
  variants: Array<{
    id: VariantType;
    weight: number; // Pourcentage (0-100)
  }>;
  active: boolean;
}

export const abTestConfigs: Record<TradeType, ABTestConfig> = {
  serrurerie: {
    id: "serrurerie-landing-2026",
    variants: [
      { id: "A", weight: 33 },
      { id: "B", weight: 33 },
      { id: "C", weight: 34 },
    ],
    active: true,
  },
  plomberie: {
    id: "plomberie-landing-2026",
    variants: [
      { id: "A", weight: 33 },
      { id: "B", weight: 33 },
      { id: "C", weight: 34 },
    ],
    active: true,
  },
  electricite: {
    id: "electricite-landing-2026",
    variants: [
      { id: "A", weight: 33 },
      { id: "B", weight: 33 },
      { id: "C", weight: 34 },
    ],
    active: true,
  },
};
