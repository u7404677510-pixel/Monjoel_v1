/**
 * Helpers serveur pour le rendu d'une page /[trade]/[ville] ou /[trade]/[ville]/[service]
 * dans le mode "premium-or-fallback".
 *
 * Comportement :
 *   - Si la combinaison est dans le registre premium → contenu rédactionnel + INDEXABLE
 *   - Sinon → contenu fallback (généré) + `noindex, follow` + bannière discrète
 *
 * Centralise toute la logique pour que les 6 fichiers app/[trade]/[ville]/(page|[service]/page).tsx
 * soient quasi vides.
 */

import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

import { City, getCityBySlug, getNearbyCities } from "@/lib/data/cities-idf";
import { Service, Trade, getTradeBySlug, getServiceBySlug } from "@/lib/data/services-definition";
import { generateCityPageContent, generateServicePageContent } from "@/lib/seo/city-content";
import { generatePremiumSchemas } from "@/lib/seo/premium/schema";
import { getPremiumContent } from "@/lib/seo/premium/registry";
import {
  CityHero,
  CityFAQ,
  CityServices,
  LocalSchema,
  NearbyAreas,
} from "@/components/seo";
import { getServiceCityAnchor } from "@/lib/seo/anchor-variants";
import PremiumPageRenderer from "@/components/seo/PremiumPageRenderer";
import FinalCTA from "@/components/sections/FinalCTA";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ServiceProcess from "@/components/sections/ServiceProcess";
import MidPageCTA from "@/components/MidPageCTA";

// Map slug métier → trade type pour pré-remplir le QuickQuoteForm dans MidPageCTA
function tradeSlugToType(slug: string): "serrurerie" | "plomberie" | "electricite" | undefined {
  if (slug === "serrurier") return "serrurerie";
  if (slug === "plombier") return "plomberie";
  if (slug === "electricien") return "electricite";
  return undefined;
}

// ============================================
// METADATA — version unifiée city-or-service
// ============================================

/** Génère les metadata d'une page /[trade]/[ville] (avec noindex si non-premium). */
export async function buildCityMetadata(tradeSlug: string, citySlug: string): Promise<Metadata> {
  const city = getCityBySlug(citySlug);
  const trade = getTradeBySlug(tradeSlug);
  if (!city || !trade) return { title: "Page non trouvée" };

  const premium = getPremiumContent(tradeSlug, citySlug);
  const url = `https://monjoel.fr/${tradeSlug}/${citySlug}`;

  if (premium) {
    return {
      title: premium.metaTitle,
      description: premium.metaDescription,
      alternates: {
        canonical: url,
        languages: {
          "fr-FR": url,
          "x-default": url,
        },
      },
      openGraph: {
        title: premium.metaTitle,
        description: premium.metaDescription,
        url,
        siteName: "Joël",
        locale: "fr_FR",
        type: "article",
        publishedTime: premium.publishedAt,
        modifiedTime: premium.updatedAt,
      },
      twitter: { card: "summary_large_image", title: premium.metaTitle, description: premium.metaDescription },
      robots: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
        googleBot: {
          index: true,
          follow: true,
          "max-snippet": -1,
          "max-image-preview": "large",
          "max-video-preview": -1,
        },
      },
    };
  }

  // Fallback non-premium → noindex, follow
  const content = generateCityPageContent(trade, city);
  return {
    title: content.title,
    description: content.metaDescription,
    alternates: {
      canonical: url,
      languages: {
        "fr-FR": url,
        "x-default": url,
      },
    },
    robots: { index: false, follow: true },
  };
}

/** Génère les metadata d'une page /[trade]/[ville]/[service] (avec noindex si non-premium). */
export async function buildServiceMetadata(
  tradeSlug: string,
  citySlug: string,
  serviceSlug: string,
): Promise<Metadata> {
  const city = getCityBySlug(citySlug);
  const trade = getTradeBySlug(tradeSlug);
  const service = getServiceBySlug(tradeSlug, serviceSlug);
  if (!city || !trade || !service) return { title: "Page non trouvée" };

  const premium = getPremiumContent(tradeSlug, citySlug, serviceSlug);
  const url = `https://monjoel.fr/${tradeSlug}/${citySlug}/${serviceSlug}`;

  if (premium) {
    return {
      title: premium.metaTitle,
      description: premium.metaDescription,
      alternates: {
        canonical: url,
        languages: {
          "fr-FR": url,
          "x-default": url,
        },
      },
      openGraph: {
        title: premium.metaTitle,
        description: premium.metaDescription,
        url,
        siteName: "Joël",
        locale: "fr_FR",
        type: "article",
        publishedTime: premium.publishedAt,
        modifiedTime: premium.updatedAt,
      },
      twitter: { card: "summary_large_image", title: premium.metaTitle, description: premium.metaDescription },
      robots: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
        googleBot: {
          index: true,
          follow: true,
          "max-snippet": -1,
          "max-image-preview": "large",
          "max-video-preview": -1,
        },
      },
    };
  }

  const content = generateServicePageContent(trade, service, city);
  return {
    title: content.title,
    description: content.metaDescription,
    alternates: {
      canonical: url,
      languages: {
        "fr-FR": url,
        "x-default": url,
      },
    },
    robots: { index: false, follow: true },
  };
}

// ============================================
// RENDER — page /[trade]/[ville]
// ============================================

export function CityPageBody({ tradeSlug, citySlug }: { tradeSlug: string; citySlug: string }) {
  const city = getCityBySlug(citySlug);
  const trade = getTradeBySlug(tradeSlug);
  if (!city || !trade) notFound();

  const premium = getPremiumContent(tradeSlug, citySlug);

  // ---- PREMIUM ----
  if (premium) {
    return (
      <>
        <Navigation />
        <main>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: generatePremiumSchemas(premium, trade, city) }}
          />
          <PremiumPageRenderer content={premium} trade={trade} city={city} />
        </main>
        <Footer />
      </>
    );
  }

  // ---- FALLBACK noindex (contenu existant) ----
  const content = generateCityPageContent(trade, city);
  return (
    <>
      <Navigation />
      <main>
        <LocalSchema trade={trade} city={city} faqItems={content.faq} />
        <CityHero trade={trade} city={city} content={content} />
        <FallbackIntro content={content} />
        <FallbackLocalContext content={content} city={city} trade={trade} />
        <CityServices trade={trade} city={city} />
        <FallbackPricingContext content={content} city={city} trade={trade} />
        {/* CTA mi-page : réinjection conversion à mi-scroll */}
        <MidPageCTA
          title={`Besoin d'un ${trade.name.toLowerCase()} à ${city.name} ?`}
          subtitle="Devis instantané · prix fixe annoncé avant intervention"
          placement={`city_${tradeSlug}_${citySlug}`}
          trade={tradeSlugToType(tradeSlug)}
        />
        <FallbackWhyJoel content={content} />
        <CityFAQ faqItems={content.faq} cityName={city.name} tradeName={trade.name} />
        <NearbyAreas trade={trade} city={city} nearbyCities={getNearbyCities(city, 8)} />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

// ============================================
// RENDER — page /[trade]/[ville]/[service]
// ============================================

export function ServicePageBody({
  tradeSlug,
  citySlug,
  serviceSlug,
}: {
  tradeSlug: string;
  citySlug: string;
  serviceSlug: string;
}) {
  const city = getCityBySlug(citySlug);
  const trade = getTradeBySlug(tradeSlug);
  const service = getServiceBySlug(tradeSlug, serviceSlug);
  if (!city || !trade || !service) notFound();

  const premium = getPremiumContent(tradeSlug, citySlug, serviceSlug);

  // ---- PREMIUM ----
  if (premium) {
    return (
      <>
        <Navigation />
        <main>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: generatePremiumSchemas(premium, trade, city, service) }}
          />
          <PremiumPageRenderer content={premium} trade={trade} city={city} service={service} />
        </main>
        <Footer />
      </>
    );
  }

  // ---- FALLBACK noindex (contenu existant) ----
  const content = generateServicePageContent(trade, service, city);
  return (
    <>
      <Navigation />
      <main>
        <LocalSchema trade={trade} city={city} faqItems={content.faq} service={service} />
        <CityHero trade={trade} city={city} content={content} service={service} />
        <FallbackServiceBlock trade={trade} city={city} service={service} content={content} />
        <FallbackLocalContext content={content} city={city} trade={trade} />
        <FallbackPricingContext content={content} city={city} trade={trade} />
        <FallbackWhyJoel content={content} />
        {/* CTA mi-page : réinjection conversion juste avant le bloc autres services */}
        <MidPageCTA
          title={`${service.name} à ${city.name} : appelez maintenant`}
          subtitle={`Prix fixe dès ${service.priceFrom}€ · intervention en ~30 min`}
          placement={`service_${tradeSlug}_${citySlug}_${serviceSlug}`}
          trade={tradeSlugToType(tradeSlug)}
        />
        <FallbackOtherServices trade={trade} city={city} service={service} />
        <ServiceProcess />
        <CityFAQ
          faqItems={[...content.serviceFaq, ...content.faq]}
          cityName={city.name}
          tradeName={service.name}
        />
        <NearbyAreas trade={trade} city={city} nearbyCities={getNearbyCities(city, 8)} />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

// ============================================
// SOUS-COMPOSANTS du fallback (extraits des pages originales)
// ============================================

function FallbackIntro({ content }: { content: ReturnType<typeof generateCityPageContent> }) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-lg text-gray-600 leading-relaxed">{content.introduction}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {content.highlights.map((h, i) => (
            <span key={i} className="inline-flex items-center gap-2 bg-joel-violet/5 text-joel-violet px-4 py-2 rounded-full text-sm">
              <span className="w-1.5 h-1.5 bg-joel-violet rounded-full" />
              {h}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function FallbackWhyJoel({ content }: { content: { whyJoel: { title: string; points: string[] } } }) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
          {content.whyJoel.title}
        </h2>
        <div className="space-y-4">
          {content.whyJoel.points.map((p, i) => (
            <div key={i} className="flex gap-4 items-start bg-white rounded-xl p-5 border border-gray-100">
              <span className="flex-shrink-0 w-8 h-8 bg-joel-violet/10 text-joel-violet rounded-full flex items-center justify-center font-bold text-sm">
                {i + 1}
              </span>
              <p className="text-gray-700 leading-relaxed">{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FallbackServiceBlock({
  trade,
  city,
  service,
  content,
}: {
  trade: Trade;
  city: City;
  service: Service;
  content: ReturnType<typeof generateServicePageContent>;
}) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-gradient-to-br from-joel-violet/5 to-joel-mauve/5 rounded-3xl p-8 md:p-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {service.name} à {city.name} ({city.postalCodes[0]})
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">{content.serviceCityParagraph}</p>
          <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
        </div>
      </div>
    </section>
  );
}

/**
 * Contexte local enrichi : bâti, normes, réseau.
 * Contenu unique par ville × métier — sert le SEO en cassant le duplicate.
 */
function FallbackLocalContext({
  content,
  city,
  trade,
}: {
  content: { localContext: string };
  city: City;
  trade: Trade;
}) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          {trade.name} à {city.name} : ce qu'il faut savoir
        </h2>
        <p className="text-gray-700 leading-relaxed text-lg">{content.localContext}</p>
      </div>
    </section>
  );
}

/**
 * Tarifs et délais détaillés par ville.
 * Bloc factuel, vendeur, et qui apporte du contenu unique.
 */
function FallbackPricingContext({
  content,
  city,
  trade,
}: {
  content: { pricingContext: string };
  city: City;
  trade: Trade;
}) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Tarifs {trade.name.toLowerCase()} à {city.name} ({city.postalCodes[0]})
          </h2>
          <p className="text-gray-700 leading-relaxed">{content.pricingContext}</p>
        </div>
      </div>
    </section>
  );
}

function FallbackOtherServices({
  trade,
  city,
  service,
}: {
  trade: Trade;
  city: City;
  service: Service;
}) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-display text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">
          Autres services {trade.name.toLowerCase()} à {city.name}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {trade.services
            .filter((s) => s.slug !== service.slug)
            .slice(0, 6)
            .map((s) => {
              // Anchor varié pour les liens "autre service" — sur 6 cartes,
              // pool de 5 patterns → cycle naturel.
              const anchorText = getServiceCityAnchor(s.shortName, city.name, s.slug, city.slug);
              return (
                <a
                  key={s.slug}
                  href={`/${trade.slug}/${city.slug}/${s.slug}`}
                  aria-label={anchorText}
                  className="block p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-joel-violet hover:shadow-md transition-all text-center"
                >
                  <p className="font-semibold text-gray-900 text-sm">{anchorText}</p>
                  <p className="text-joel-violet text-sm mt-1">dès {s.priceFrom}€</p>
                </a>
              );
            })}
        </div>
      </div>
    </section>
  );
}
