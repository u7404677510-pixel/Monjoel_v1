/**
 * Configuration des landing par métier (serrurerie / plomberie / électricité).
 */

export type TradeType = "serrurerie" | "plomberie" | "electricite";

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

// ⚠️ LÉGAL (DGCCRF / arrêté dépannage 24-01-2017) : tout prix affiché ici DOIT
// être ≥ au plancher réel du catalogue (lib/data/services-definition.ts,
// champ priceFrom du service correspondant). Un prix affiché SOUS le plancher
// = bait-and-switch. Aligné au catalogue le 09/06/2026.
export const tradeConfigs: Record<TradeType, TradeConfig> = {
  serrurerie: {
    slug: "serrurerie",
    name: "Serrurier",
    namePlural: "serruriers",
    heroTitle: "Serrurier d'urgence Paris",
    heroImage: "/images/hero-serrurier.png",
    heroVideo: "/videos/hero-artisan.webm",
    priceFrom: 79, // plancher réel : cle-cassee-serrure 79€
    mainService: "Ouverture porte claquée",
    mainServicePrice: "à partir de 89€", // ouverture-sans-percage 89€ — pairing honnête
    services: [
      { name: "Ouverture porte claquée", price: "89€", description: "Sans perçage" },
      { name: "Ouverture avec perçage", price: "139€", description: "Cylindre à remplacer" },
      { name: "Changement cylindre", price: "119€", description: "Fourniture incluse" },
      { name: "Clé cassée dans serrure", price: "79€", description: "Extraction + copie" },
    ],
    keywords: ["serrurier", "porte claquée", "serrure", "clé perdue"],
  },
  plomberie: {
    slug: "plomberie",
    name: "Plombier",
    namePlural: "plombiers",
    heroTitle: "Plombier d'urgence Paris",
    heroImage: "/images/hero-plombier.png",
    priceFrom: 69, // plancher réel : remplacement-robinet / chasse-eau / lavabo 69€
    mainService: "Dépannage plomberie",
    mainServicePrice: "dès 69€", // label générique = le plancher métier est honnête
    services: [
      { name: "Fuite d'eau", price: "89€", description: "Réparation durable" },
      { name: "WC bouchés", price: "79€", description: "Débouchage rapide" },
      { name: "Dégât des eaux", price: "99€", description: "Attestation assurance" },
      { name: "Chauffe-eau en panne", price: "109€", description: "Diagnostic + réparation" },
    ],
    keywords: ["plombier", "fuite", "WC bouché", "dégât des eaux"],
  },
  electricite: {
    slug: "electricite",
    name: "Électricien",
    namePlural: "électriciens",
    heroTitle: "Électricien d'urgence Paris",
    heroImage: "/images/hero-electricien.png",
    priceFrom: 59, // plancher réel : prise-interrupteur-hs 59€
    mainService: "Dépannage électricité",
    mainServicePrice: "dès 59€", // label générique — « Panne électrique à 59€ » serait mensonger (panne = 89€)
    services: [
      { name: "Panne électrique", price: "89€", description: "Rétablissement rapide" },
      { name: "Disjoncteur qui saute", price: "79€", description: "Diagnostic + réparation" },
      { name: "Tableau électrique", price: "129€", description: "Dépannage ou remplacement" },
      { name: "Prise / Interrupteur HS", price: "59€", description: "Remplacement" },
    ],
    keywords: ["électricien", "panne électrique", "disjoncteur", "court-circuit"],
  },
};
