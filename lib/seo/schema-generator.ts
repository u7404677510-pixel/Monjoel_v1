/**
 * Générateur de Schema.org JSON-LD pour le SEO local
 */

import type { City } from "@/lib/data/cities-idf-types";
import type { Trade, Service } from "@/lib/data/services-definition";
import type { FAQItem } from "./city-content";

const BASE_URL = "https://monjoel.fr";
const COMPANY_NAME = "Joël";
const COMPANY_PHONE = "+33141691008";
const COMPANY_EMAIL = "contact@monjoel.fr";
const COMPANY_ADDRESS = "45 Rue Boursault, 75017 Paris";

// IDs canoniques pour références @id (déduplication via @graph)
const ORG_ID = `${BASE_URL}/#organization`;
const WEBSITE_ID = `${BASE_URL}/#website`;

// Prix de base par métier pour Schema
const BASE_PRICES: Record<string, number> = {
  serrurier: 89,
  plombier: 79,
  electricien: 59,
};

// Mots-clés métier pour `knowsAbout` (boost autorité E-E-A-T)
const TRADE_KNOWS_ABOUT: Record<string, string[]> = {
  plombier: [
    "Plomberie",
    "Recherche de fuite",
    "Débouchage canalisation",
    "Dégât des eaux",
    "Chauffe-eau",
    "Sanitaire",
    "Robinetterie",
    "Évacuation eaux usées",
    "Dépannage urgence 24h/24",
  ],
  serrurier: [
    "Serrurerie",
    "Ouverture de porte claquée",
    "Ouverture sans perçage",
    "Changement de cylindre",
    "Pose de serrure A2P",
    "Blindage de porte",
    "Sécurité résidentielle",
    "Dépannage urgence 24h/24",
  ],
  electricien: [
    "Électricité",
    "Tableau électrique",
    "Mise aux normes NF C 15-100",
    "Diagnostic panne",
    "Disjoncteur",
    "Court-circuit",
    "Installation prise",
    "Habilitations électriques",
    "Dépannage urgence 24h/24",
  ],
};

// Photos par métier (logo + visuels artisan/intervention) pour `image` array
const TRADE_IMAGES: Record<string, string[]> = {
  plombier: [
    `${BASE_URL}/logo.webp`,
    `${BASE_URL}/og-default.jpg`,
    `${BASE_URL}/images/hero-plombier.jpg`,
  ],
  serrurier: [
    `${BASE_URL}/logo.webp`,
    `${BASE_URL}/og-default.jpg`,
    `${BASE_URL}/images/hero-serrurier.jpg`,
  ],
  electricien: [
    `${BASE_URL}/logo.webp`,
    `${BASE_URL}/og-default.jpg`,
    `${BASE_URL}/images/hero-electricien.jpg`,
  ],
};

// Description du résultat livré (champ Schema `serviceOutput`)
const SERVICE_OUTPUTS: Record<string, string> = {
  plombier:
    "Installation plomberie remise en état, fuite stoppée ou canalisation débouchée, attestation d'intervention fournie pour assurance.",
  serrurier:
    "Porte ouverte ou serrure remplacée sans dommage, accès sécurisé restauré, facture détaillée fournie.",
  electricien:
    "Installation électrique remise en service, conformité NF C 15-100 respectée, attestation d'intervention fournie.",
};

// ============================================
// TYPES SCHEMA.ORG
// ============================================

interface LocalBusiness {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  priceRange: string;
  image: string;
  address: PostalAddress;
  geo?: GeoCoordinates;
  areaServed: AreaServed;
  openingHoursSpecification: OpeningHours[];
  hasOfferCatalog?: OfferCatalog;
}

interface PostalAddress {
  "@type": string;
  streetAddress?: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

interface GeoCoordinates {
  "@type": string;
  latitude: number;
  longitude: number;
}

interface AreaServed {
  "@type": string;
  name: string;
  containedIn: {
    "@type": string;
    name: string;
  };
}

interface OpeningHours {
  "@type": string;
  dayOfWeek: string[];
  opens: string;
  closes: string;
}

interface OfferCatalog {
  "@type": string;
  name: string;
  itemListElement: Offer[];
}

interface Offer {
  "@type": string;
  itemOffered: {
    "@type": string;
    name: string;
    description: string;
  };
  priceSpecification: {
    "@type": string;
    price: number;
    priceCurrency: string;
    priceType: string;
  };
}

interface FAQPage {
  "@context": string;
  "@type": string;
  mainEntity: FAQEntity[];
}

interface FAQEntity {
  "@type": string;
  name: string;
  acceptedAnswer: {
    "@type": string;
    text: string;
  };
}

interface BreadcrumbList {
  "@context": string;
  "@type": string;
  itemListElement: BreadcrumbItem[];
}

interface BreadcrumbItem {
  "@type": string;
  position: number;
  name: string;
  item: string;
}

interface ServiceSchema {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  provider: {
    "@type": string;
    name: string;
    url: string;
  };
  areaServed: {
    "@type": string;
    name: string;
  };
  offers: {
    "@type": string;
    priceSpecification: {
      "@type": string;
      price: number;
      priceCurrency: string;
      priceType: string;
    };
  };
}

// ============================================
// GÉNÉRATEURS
// ============================================

/**
 * Génère le schema LocalBusiness pour une page métier/ville
 * Retourne un objet flexible pour supporter tous les champs Schema.org
 */
export function generateLocalBusinessSchema(
  trade: Trade,
  city: City
): object {
  // Types Schema.org validés par Google Rich Results
  const businessTypes: Record<string, string> = {
    plombier: "Plumber",
    serrurier: "HomeAndConstructionBusiness",
    electricien: "Electrician",
  };

  const basePrice = BASE_PRICES[trade.slug] || 79;
  const todayISO = new Date().toISOString().split("T")[0];
  const knowsAbout = TRADE_KNOWS_ABOUT[trade.slug] || [];
  const images = TRADE_IMAGES[trade.slug] || [`${BASE_URL}/logo.webp`];
  const serviceOutput = SERVICE_OUTPUTS[trade.slug] || "Intervention réalisée, attestation fournie.";

  return {
    "@context": "https://schema.org",
    "@type": businessTypes[trade.slug] || "LocalBusiness",
    "@id": `${BASE_URL}/${trade.slug}/${city.slug}#localbusiness`,
    name: `${COMPANY_NAME} - ${trade.name} à ${city.name}`,
    alternateName: `Joël ${trade.name} ${city.name}`,
    description: `${trade.name} urgence à ${city.name}. Intervention 30 min, prix fixe dès ${basePrice}€. Sans majoration 24h/24. Zéro arnaque, artisans certifiés.`,
    url: `${BASE_URL}/${trade.slug}/${city.slug}`,
    telephone: COMPANY_PHONE,
    email: COMPANY_EMAIL,
    priceRange: `€€ (dès ${basePrice}€)`,
    image: images,
    logo: `${BASE_URL}/logo.webp`,
    foundingDate: "2024",
    knowsAbout,
    keywords: [
      `${trade.name} ${city.name}`,
      `${trade.name} urgence ${city.name}`,
      `${trade.name} 24h/24 ${city.name}`,
      `${trade.name} prix fixe`,
      `${trade.name} ${city.postalCodes[0]}`,
      ...trade.keywords.slice(0, 5),
    ],
    parentOrganization: { "@id": ORG_ID },
    address: {
      "@type": "PostalAddress",
      streetAddress: "45 Rue Boursault",
      addressLocality: city.name,
      addressRegion: city.departmentName,
      postalCode: city.postalCodes[0],
      addressCountry: "FR",
    },
    ...(city.coordinates && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: city.coordinates.lat,
        longitude: city.coordinates.lng,
      },
      hasMap: `https://www.google.com/maps/search/?api=1&query=${city.coordinates.lat},${city.coordinates.lng}`,
    }),
    areaServed: [
      {
        "@type": "City",
        name: city.name,
        ...(city.coordinates && {
          geo: {
            "@type": "GeoCoordinates",
            latitude: city.coordinates.lat,
            longitude: city.coordinates.lng,
          },
        }),
      },
      {
        "@type": "AdministrativeArea",
        name: city.departmentName,
      },
      {
        "@type": "AdministrativeArea",
        name: "Île-de-France",
      },
    ],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: city.coordinates?.lat || 48.8566,
        longitude: city.coordinates?.lng || 2.3522,
      },
      geoRadius: "30000",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
        validFrom: "2024-01-01",
      },
    ],
    // Pas d'aggregateRating tant qu'on n'a pas d'avis Google réels collectés.
    slogan: "Prix fixe, zéro arnaque",
    paymentAccepted: "Cash, Credit Card, Debit Card, Apple Pay, Google Pay",
    currenciesAccepted: "EUR",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Services ${trade.name}`,
      itemListElement: trade.services.slice(0, 8).map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
          serviceType: service.name,
          serviceOutput,
          provider: { "@id": ORG_ID },
          areaServed: { "@type": "City", name: city.name },
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: service.priceFrom,
          priceCurrency: "EUR",
          priceType: "MinimumPrice",
          valueAddedTaxIncluded: true,
        },
        availability: "https://schema.org/InStock",
        validFrom: todayISO,
        url: `${BASE_URL}/${trade.slug}/${city.slug}/${service.slug}`,
      })),
    },
    makesOffer: trade.services.slice(0, 4).map((service) => ({
      "@type": "Offer",
      name: service.name,
      description: service.description,
      price: service.priceFrom,
      priceCurrency: "EUR",
    })),
    potentialAction: [
      {
        "@type": "OrderAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `tel:${COMPANY_PHONE}`,
          actionPlatform: [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform",
          ],
        },
        deliveryMethod: "http://purl.org/goodrelations/v1#DeliveryModeOwnFleet",
      },
      {
        "@type": "ReserveAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/devis`,
          actionPlatform: [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform",
          ],
        },
      },
    ],
  };
}

/**
 * Génère le schema LocalBusiness pour une page département
 */
export function generateDepartmentSchema(
  tradeSlug: string,
  departmentName: string,
  departmentCode: string,
  services: { name: string; description: string; priceFrom: number }[]
): object {
  // Types Schema.org validés par Google Rich Results
  const businessTypes: Record<string, string> = {
    plombier: "Plumber",
    serrurier: "HomeAndConstructionBusiness",
    electricien: "Electrician",
  };

  const tradeNames: Record<string, string> = {
    plombier: "Plomberie",
    serrurier: "Serrurerie",
    electricien: "Électricité",
  };

  const tradeName = tradeNames[tradeSlug] || "Dépannage";
  const knowsAbout = TRADE_KNOWS_ABOUT[tradeSlug] || [];
  const images = TRADE_IMAGES[tradeSlug] || [`${BASE_URL}/logo.webp`];
  const serviceOutput = SERVICE_OUTPUTS[tradeSlug] || "Intervention réalisée, attestation fournie.";
  const todayISO = new Date().toISOString().split("T")[0];

  return {
    "@context": "https://schema.org",
    "@type": businessTypes[tradeSlug] || "LocalBusiness",
    "@id": `${BASE_URL}/${tradeSlug}-${departmentCode}#localbusiness`,
    name: `${COMPANY_NAME} - ${tradeName} ${departmentName} (${departmentCode})`,
    alternateName: `Joël ${tradeName} ${departmentCode}`,
    description: `${tradeName} dans le ${departmentName} (${departmentCode}). Intervention rapide 24h/24. Prix fixe garanti. Artisans certifiés.`,
    url: `${BASE_URL}/${tradeSlug}-${departmentCode}`,
    telephone: COMPANY_PHONE,
    email: COMPANY_EMAIL,
    priceRange: "€€",
    image: images,
    logo: `${BASE_URL}/logo.webp`,
    foundingDate: "2024",
    knowsAbout,
    keywords: [
      `${tradeName} ${departmentName}`,
      `${tradeName} ${departmentCode}`,
      `${tradeName} urgence ${departmentName}`,
      `${tradeName} 24h/24`,
      `${tradeName} prix fixe`,
    ],
    parentOrganization: { "@id": ORG_ID },
    address: {
      "@type": "PostalAddress",
      addressLocality: departmentName,
      addressRegion: "Île-de-France",
      postalCode: departmentCode + "000",
      addressCountry: "FR",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: departmentName,
      containedIn: {
        "@type": "AdministrativeArea",
        name: "Île-de-France",
      },
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
        validFrom: "2024-01-01",
      },
    ],
    // Pas d'aggregateRating tant qu'on n'a pas d'avis Google réels collectés.
    slogan: "Prix fixe, zéro arnaque",
    paymentAccepted: "Cash, Credit Card, Debit Card, Apple Pay, Google Pay",
    currenciesAccepted: "EUR",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Services ${tradeName}`,
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
          serviceType: service.name,
          serviceOutput,
          provider: { "@id": ORG_ID },
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: service.priceFrom,
          priceCurrency: "EUR",
          priceType: "MinimumPrice",
          valueAddedTaxIncluded: true,
        },
        availability: "https://schema.org/InStock",
        validFrom: todayISO,
      })),
    },
    potentialAction: {
      "@type": "OrderAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `tel:${COMPANY_PHONE}`,
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
    },
  };
}

/**
 * Génère le schema FAQPage
 */
export function generateFAQSchema(faqItems: FAQItem[]): FAQPage {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * Génère le schema BreadcrumbList pour une page métier/ville
 */
export function generateBreadcrumbSchema(
  trade: Trade,
  city: City,
  service?: Service
): BreadcrumbList {
  const items: BreadcrumbItem[] = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Accueil",
      item: BASE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: trade.name,
      item: `${BASE_URL}/${trade.slug === "plombier" ? "plomberie" : trade.slug === "electricien" ? "electricite" : "serrurerie"}`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: city.name,
      item: `${BASE_URL}/${trade.slug}/${city.slug}`,
    },
  ];

  if (service) {
    items.push({
      "@type": "ListItem",
      position: 4,
      name: service.name,
      item: `${BASE_URL}/${trade.slug}/${city.slug}/${service.slug}`,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

/**
 * Génère le schema Service pour une page service/ville
 */
export function generateServiceSchema(
  trade: Trade,
  service: Service,
  city: City
): object {
  const todayISO = new Date().toISOString().split("T")[0];
  const serviceOutput = SERVICE_OUTPUTS[trade.slug] || "Intervention réalisée, attestation fournie.";

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE_URL}/${trade.slug}/${city.slug}/${service.slug}#service`,
    name: `${service.name} à ${city.name}`,
    alternateName: `${service.shortName} ${city.name}`,
    description: service.description,
    serviceType: service.name,
    category: "Home Services",
    additionalType: "https://schema.org/EmergencyService",
    serviceOutput,
    termsOfService: `${BASE_URL}/cgu`,
    provider: {
      "@type": "LocalBusiness",
      "@id": ORG_ID,
      name: COMPANY_NAME,
      url: BASE_URL,
      telephone: COMPANY_PHONE,
      logo: `${BASE_URL}/logo.webp`,
    },
    areaServed: [
      {
        "@type": "City",
        name: city.name,
        ...(city.coordinates && {
          geo: {
            "@type": "GeoCoordinates",
            latitude: city.coordinates.lat,
            longitude: city.coordinates.lng,
          },
        }),
      },
      {
        "@type": "AdministrativeArea",
        name: city.departmentName,
      },
    ],
    audience: {
      "@type": "Audience",
      audienceType: "Particuliers et professionnels",
      geographicArea: {
        "@type": "AdministrativeArea",
        name: "Île-de-France",
      },
    },
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
      validFrom: "2024-01-01",
    },
    offers: {
      "@type": "Offer",
      name: `${service.name} prix fixe à ${city.name}`,
      description: `${service.description} Intervention en 30 min. Prix fixe annoncé avant déplacement.`,
      price: service.priceFrom,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      validFrom: todayISO,
      url: `${BASE_URL}/${trade.slug}/${city.slug}/${service.slug}`,
      priceSpecification: {
        "@type": "PriceSpecification",
        price: service.priceFrom,
        priceCurrency: "EUR",
        priceType: "MinimumPrice",
        valueAddedTaxIncluded: true,
      },
      seller: { "@id": ORG_ID },
    },
    // Pas d'aggregateRating tant qu'on n'a pas d'avis Google réels collectés.
    potentialAction: {
      "@type": "OrderAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `tel:${COMPANY_PHONE}`,
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
    },
  };
}

// ============================================
// COMPOSANT HELPER
// ============================================

/**
 * Génère un schema Hub métier (page /plomberie, /serrurerie, /electricite)
 * Plus riche que sur les pages ville : couvre toute l'IDF, agrège tous les services.
 */
export function generateHubSchema(
  tradeSlug: "plombier" | "serrurier" | "electricien",
  hubSlug: "plomberie" | "serrurerie" | "electricite",
  trade: Trade,
  faqItems: FAQItem[]
): object[] {
  const businessTypes: Record<string, string> = {
    plombier: "Plumber",
    serrurier: "Locksmith",
    electricien: "Electrician",
  };

  const tradeNames: Record<string, string> = {
    plombier: "Plomberie",
    serrurier: "Serrurerie",
    electricien: "Électricité",
  };

  const tradeName = tradeNames[tradeSlug] || trade.name;
  const knowsAbout = TRADE_KNOWS_ABOUT[tradeSlug] || [];
  const images = TRADE_IMAGES[tradeSlug] || [`${BASE_URL}/logo.webp`];
  const serviceOutput = SERVICE_OUTPUTS[tradeSlug] || "Intervention réalisée, attestation fournie.";
  const basePrice = BASE_PRICES[tradeSlug] || 79;
  const todayISO = new Date().toISOString().split("T")[0];
  const hubUrl = `${BASE_URL}/${hubSlug}`;

  // 1. LocalBusiness Hub (couvre toute l'IDF)
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": businessTypes[tradeSlug] || "LocalBusiness",
    "@id": `${hubUrl}#localbusiness`,
    name: `${COMPANY_NAME} - ${tradeName} d'urgence Paris & Île-de-France`,
    alternateName: `Joël ${tradeName}`,
    description: `Service de ${tradeName.toLowerCase()} d'urgence à prix fixe. Intervention en 30 minutes sur Paris et toute l'Île-de-France. Zéro arnaque, zéro majoration.`,
    url: hubUrl,
    telephone: COMPANY_PHONE,
    email: COMPANY_EMAIL,
    priceRange: `€€ (dès ${basePrice}€)`,
    image: images,
    logo: `${BASE_URL}/logo.webp`,
    foundingDate: "2024",
    knowsAbout,
    keywords: trade.keywords,
    parentOrganization: { "@id": ORG_ID },
    address: {
      "@type": "PostalAddress",
      streetAddress: "45 Rue Boursault",
      addressLocality: "Paris",
      postalCode: "75017",
      addressRegion: "Île-de-France",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 48.8898,
      longitude: 2.3175,
    },
    hasMap: "https://www.google.com/maps/place/45+Rue+Boursault,+75017+Paris",
    areaServed: [
      { "@type": "AdministrativeArea", name: "Île-de-France" },
      { "@type": "AdministrativeArea", name: "Paris (75)" },
      { "@type": "AdministrativeArea", name: "Seine-et-Marne (77)" },
      { "@type": "AdministrativeArea", name: "Yvelines (78)" },
      { "@type": "AdministrativeArea", name: "Essonne (91)" },
      { "@type": "AdministrativeArea", name: "Hauts-de-Seine (92)" },
      { "@type": "AdministrativeArea", name: "Seine-Saint-Denis (93)" },
      { "@type": "AdministrativeArea", name: "Val-de-Marne (94)" },
      { "@type": "AdministrativeArea", name: "Val-d'Oise (95)" },
    ],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 48.8566,
        longitude: 2.3522,
      },
      geoRadius: "50000",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
        validFrom: "2024-01-01",
      },
    ],
    // Pas d'aggregateRating tant qu'on n'a pas d'avis Google réels collectés.
    slogan: "Prix fixe, zéro arnaque",
    paymentAccepted: "Cash, Credit Card, Debit Card, Apple Pay, Google Pay",
    currenciesAccepted: "EUR",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Services ${tradeName}`,
      itemListElement: trade.services.slice(0, 10).map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
          serviceType: service.name,
          serviceOutput,
          provider: { "@id": ORG_ID },
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: service.priceFrom,
          priceCurrency: "EUR",
          priceType: "MinimumPrice",
          valueAddedTaxIncluded: true,
        },
        availability: "https://schema.org/InStock",
        validFrom: todayISO,
      })),
    },
    // Pas de Review schema tant qu'on n'a pas d'avis Google réels collectés.
    potentialAction: [
      {
        "@type": "OrderAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `tel:${COMPANY_PHONE}`,
          actionPlatform: [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform",
          ],
        },
        deliveryMethod: "http://purl.org/goodrelations/v1#DeliveryModeOwnFleet",
      },
      {
        "@type": "ReserveAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/devis`,
          actionPlatform: [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform",
          ],
        },
      },
    ],
  };

  // 2. BreadcrumbList Hub
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: tradeName, item: hubUrl },
    ],
  };

  // 3. FAQ Hub (si fournie)
  const faq = generateFAQSchema(faqItems);

  return [localBusiness, breadcrumb, faq];
}

/**
 * Génère tous les schemas pour une page métier/ville
 */
export function generateAllSchemas(
  trade: Trade,
  city: City,
  faqItems: FAQItem[]
): string {
  const schemas = [
    generateLocalBusinessSchema(trade, city),
    generateBreadcrumbSchema(trade, city),
    generateFAQSchema(faqItems),
  ];

  return JSON.stringify(schemas);
}

/**
 * Génère tous les schemas pour une page service/ville
 */
export function generateServiceSchemas(
  trade: Trade,
  service: Service,
  city: City,
  faqItems: FAQItem[]
): string {
  const schemas = [
    generateLocalBusinessSchema(trade, city),
    generateServiceSchema(trade, service, city),
    generateBreadcrumbSchema(trade, city, service),
    generateFAQSchema(faqItems),
  ];

  return JSON.stringify(schemas);
}

