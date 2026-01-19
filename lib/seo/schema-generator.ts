/**
 * Générateur de Schema.org JSON-LD pour le SEO local
 */

import { City } from "@/lib/data/cities-idf";
import { Trade, Service } from "@/lib/data/services-definition";
import { FAQItem } from "./city-content";

const BASE_URL = "https://monjoel.fr";
const COMPANY_NAME = "Joël";
const COMPANY_PHONE = "+33189470556";
const COMPANY_EMAIL = "contact@monjoel.fr";

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
  aggregateRating?: AggregateRating;
  hasOfferCatalog?: OfferCatalog;
}

interface PostalAddress {
  "@type": string;
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

interface AggregateRating {
  "@type": string;
  ratingValue: string;
  reviewCount: string;
  bestRating: string;
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
 */
export function generateLocalBusinessSchema(
  trade: Trade,
  city: City
): LocalBusiness {
  const businessTypes: Record<string, string> = {
    plombier: "Plumber",
    serrurier: "Locksmith",
    electricien: "Electrician",
  };

  return {
    "@context": "https://schema.org",
    "@type": businessTypes[trade.slug] || "LocalBusiness",
    name: `${COMPANY_NAME} - ${trade.name} à ${city.name}`,
    description: `${trade.name} à ${city.name}. Intervention rapide 24h/24. Prix fixe garanti. Artisans certifiés.`,
    url: `${BASE_URL}/${trade.slug}/${city.slug}`,
    telephone: COMPANY_PHONE,
    email: COMPANY_EMAIL,
    priceRange: "€€",
    image: `${BASE_URL}/logo.png`,
    address: {
      "@type": "PostalAddress",
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
    }),
    areaServed: {
      "@type": "City",
      name: city.name,
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
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "2847",
      bestRating: "5",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Services ${trade.name}`,
      itemListElement: trade.services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: service.priceFrom,
          priceCurrency: "EUR",
          priceType: "MinimumPrice",
        },
      })),
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
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.name} à ${city.name}`,
    description: service.description,
    provider: {
      "@type": "LocalBusiness",
      name: COMPANY_NAME,
      url: BASE_URL,
    },
    areaServed: {
      "@type": "City",
      name: city.name,
    },
    offers: {
      "@type": "Offer",
      priceSpecification: {
        "@type": "PriceSpecification",
        price: service.priceFrom,
        priceCurrency: "EUR",
        priceType: "MinimumPrice",
      },
    },
  };
}

// ============================================
// COMPOSANT HELPER
// ============================================

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

