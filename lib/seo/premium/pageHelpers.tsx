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

import { City, getCityBySlug } from "@/lib/data/cities-idf";
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
import PremiumPageRenderer from "@/components/seo/PremiumPageRenderer";
import FinalCTA from "@/components/sections/FinalCTA";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ServiceProcess from "@/components/sections/ServiceProcess";

// ============================================
// METADATA — version unifiée city-or-service
// ============================================

/** Génère les metadata d'une page /[trade]/[ville] (avec noindex si non-premium). */
export async function buildCityMetadata(tradeSlug: string, citySlug: string): Promise<Metadata> {
  const city = getCityBySlug(citySlug);
  const trade = getTradeBySlug(tradeSlug);
  if (!city || !trade) return { title: "Page non trouvée" };

  const premium = getPremiumContent(tradeSlug, citySlug);

  if (premium) {
    return {
      title: premium.metaTitle,
      description: premium.metaDescription,
      alternates: { canonical: `https://monjoel.fr/${tradeSlug}/${citySlug}` },
      openGraph: {
        title: premium.metaTitle,
        description: premium.metaDescription,
        url: `https://monjoel.fr/${tradeSlug}/${citySlug}`,
        siteName: "Joël",
        locale: "fr_FR",
        type: "article",
        publishedTime: premium.publishedAt,
        modifiedTime: premium.updatedAt,
      },
      twitter: { card: "summary_large_image", title: premium.metaTitle, description: premium.metaDescription },
      robots: { index: true, follow: true },
    };
  }

  // Fallback non-premium → noindex, follow
  const content = generateCityPageContent(trade, city);
  return {
    title: content.title,
    description: content.metaDescription,
    alternates: { canonical: `https://monjoel.fr/${tradeSlug}/${citySlug}` },
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

  if (premium) {
    return {
      title: premium.metaTitle,
      description: premium.metaDescription,
      alternates: { canonical: `https://monjoel.fr/${tradeSlug}/${citySlug}/${serviceSlug}` },
      openGraph: {
        title: premium.metaTitle,
        description: premium.metaDescription,
        url: `https://monjoel.fr/${tradeSlug}/${citySlug}/${serviceSlug}`,
        siteName: "Joël",
        locale: "fr_FR",
        type: "article",
        publishedTime: premium.publishedAt,
        modifiedTime: premium.updatedAt,
      },
      twitter: { card: "summary_large_image", title: premium.metaTitle, description: premium.metaDescription },
      robots: { index: true, follow: true },
    };
  }

  const content = generateServicePageContent(trade, service, city);
  return {
    title: content.title,
    description: content.metaDescription,
    alternates: { canonical: `https://monjoel.fr/${tradeSlug}/${citySlug}/${serviceSlug}` },
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
        <CityServices trade={trade} city={city} />
        <FallbackWhyJoel content={content} />
        <CityFAQ faqItems={content.faq} cityName={city.name} tradeName={trade.name} />
        <NearbyAreas trade={trade} city={city} />
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
        <FallbackWhyJoel content={content} />
        <FallbackOtherServices trade={trade} city={city} service={service} />
        <ServiceProcess />
        <CityFAQ
          faqItems={[...content.serviceFaq, ...content.faq]}
          cityName={city.name}
          tradeName={service.name}
        />
        <NearbyAreas trade={trade} city={city} />
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
            .map((s) => (
              <a
                key={s.slug}
                href={`/${trade.slug}/${city.slug}/${s.slug}`}
                className="block p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-joel-violet hover:shadow-md transition-all text-center"
              >
                <p className="font-semibold text-gray-900 text-sm">{s.shortName}</p>
                <p className="text-joel-violet text-sm mt-1">dès {s.priceFrom}€</p>
              </a>
            ))}
        </div>
      </div>
    </section>
  );
}
