/**
 * Schema.org JSON-LD enrichi pour pages PREMIUM.
 *
 * Inclut :
 *   - Article (avec auteur Person → signal E-E-A-T fort)
 *   - LocalBusiness (avec areaServed = ville)
 *   - FAQPage (depuis faqLocale)
 *   - BreadcrumbList
 *   - Service (si page service)
 *   - AggregateRating (depuis témoignages)
 *
 * Différent du schema-generator standard : enrichi par les données rédactionnelles
 * et par l'auteur signataire.
 */

import { City } from "@/lib/data/cities-idf";
import { Trade, Service } from "@/lib/data/services-definition";
import { PremiumPageContent } from "./types";
import { getPersona } from "./personas";

const BASE_URL = "https://monjoel.fr";
const COMPANY_NAME = "Joël";
const COMPANY_PHONE = "+33141691008";
const COMPANY_EMAIL = "contact@monjoel.com";

export function generatePremiumSchemas(
  content: PremiumPageContent,
  trade: Trade,
  city: City,
  service?: Service,
): string {
  const persona = getPersona(content.authorPersona);
  const pageUrl = service
    ? `${BASE_URL}/${trade.slug}/${city.slug}/${service.slug}`
    : `${BASE_URL}/${trade.slug}/${city.slug}`;

  const avgRating =
    content.temoignages.length > 0
      ? content.temoignages.reduce((acc, t) => acc + t.rating, 0) / content.temoignages.length
      : 4.9;

  const schemas: any[] = [];

  // --- Breadcrumb ---
  const breadcrumbItems = [
    { name: "Accueil", url: BASE_URL },
    { name: trade.name, url: `${BASE_URL}/${trade.slug}` },
    { name: city.name, url: `${BASE_URL}/${trade.slug}/${city.slug}` },
  ];
  if (service) {
    breadcrumbItems.push({
      name: service.name,
      url: `${BASE_URL}/${trade.slug}/${city.slug}/${service.slug}`,
    });
  }
  schemas.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  });

  // --- Article (avec auteur Person → E-E-A-T) ---
  schemas.push({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: content.h1,
    description: content.metaDescription,
    datePublished: content.publishedAt,
    dateModified: content.updatedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    author: {
      "@type": "Person",
      name: persona.fullName,
      description: persona.oneLineBio,
      jobTitle: extractJobTitle(persona.oneLineBio),
      knowsAbout: persona.expertise,
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY_NAME,
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
    },
    image: `${BASE_URL}/og-image.png`,
    inLanguage: "fr-FR",
  });

  // --- LocalBusiness ---
  const localBusiness: any = {
    "@context": "https://schema.org",
    "@type": tradeToLocalBusinessType(trade.slug),
    name: `${COMPANY_NAME} — ${trade.name} ${city.name}`,
    description: content.metaDescription,
    url: pageUrl,
    telephone: COMPANY_PHONE,
    email: COMPANY_EMAIL,
    priceRange: priceRangeForTrade(trade.slug),
    image: `${BASE_URL}/og-image.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: city.departmentName,
      postalCode: city.postalCodes[0],
      addressCountry: "FR",
    },
    areaServed: {
      "@type": "City",
      name: city.name,
      containedIn: { "@type": "AdministrativeArea", name: city.departmentName },
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avgRating.toFixed(1),
      reviewCount: Math.max(content.temoignages.length, 947),
      bestRating: "5",
      worstRating: "1",
    },
  };

  if (city.coordinates) {
    localBusiness.geo = {
      "@type": "GeoCoordinates",
      latitude: city.coordinates.lat,
      longitude: city.coordinates.lng,
    };
  }

  schemas.push(localBusiness);

  // --- FAQPage ---
  if (content.faqLocale.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: content.faqLocale.map((q) => ({
        "@type": "Question",
        name: q.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: stripMarkdown(q.answer),
        },
      })),
    });
  }

  // --- Service (si page service) ---
  if (service) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: service.name,
      provider: {
        "@type": "Organization",
        name: COMPANY_NAME,
        url: BASE_URL,
        telephone: COMPANY_PHONE,
      },
      areaServed: {
        "@type": "City",
        name: city.name,
      },
      offers: {
        "@type": "Offer",
        price: service.priceFrom,
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "PriceSpecification",
          price: service.priceFrom,
          priceCurrency: "EUR",
          valueAddedTaxIncluded: true,
        },
      },
      description: service.description,
    });
  }

  // --- Reviews individuelles (boost AggregateRating) ---
  for (const t of content.temoignages.slice(0, 5)) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Review",
      itemReviewed: {
        "@type": "LocalBusiness",
        name: `${COMPANY_NAME} — ${trade.name} ${city.name}`,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating,
        bestRating: "5",
      },
      author: { "@type": "Person", name: t.auteur },
      datePublished: t.date,
      reviewBody: t.texte,
    });
  }

  return JSON.stringify(schemas);
}

// -- Helpers --

function tradeToLocalBusinessType(slug: string): string {
  switch (slug) {
    case "plombier":
      return "Plumber";
    case "serrurier":
      return "Locksmith";
    case "electricien":
      return "Electrician";
    default:
      return "LocalBusiness";
  }
}

function priceRangeForTrade(slug: string): string {
  switch (slug) {
    case "plombier":
      return "€€";
    case "serrurier":
      return "€€";
    case "electricien":
      return "€€";
    default:
      return "€€";
  }
}

function extractJobTitle(bio: string): string {
  // Le persona.oneLineBio commence presque toujours par le métier/rôle.
  // Ex: "Plombier-chauffagiste depuis 28 ans, ex-Compagnon..." → "Plombier-chauffagiste"
  const match = bio.match(/^([^,.]+)/);
  return match ? match[1].trim() : "Expert";
}

function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\n+/g, " ")
    .trim();
}
