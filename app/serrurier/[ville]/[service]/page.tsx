import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCityBySlug, citiesIDF } from "@/lib/data/cities-idf";
import { getTradeBySlug, getServiceBySlug, serrurerieServices } from "@/lib/data/services-definition";
import { generateServicePageContent } from "@/lib/seo/city-content";
import { CityHero, CityFAQ, LocalSchema, NearbyAreas } from "@/components/seo";
import FinalCTA from "@/components/sections/FinalCTA";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ServiceProcess from "@/components/sections/ServiceProcess";

const TRADE_SLUG = "serrurier";

interface Props {
  params: { ville: string; service: string };
}

// ISR: Permettre la génération à la demande pour les villes non prioritaires
export const dynamicParams = true;

// ISR: Revalider les pages toutes les 24 heures
export const revalidate = 86400;

export async function generateStaticParams() {
  const params: { ville: string; service: string }[] = [];
  
  for (const city of citiesIDF) {
    for (const service of serrurerieServices) {
      params.push({
        ville: city.slug,
        service: service.slug,
      });
    }
  }
  
  return params;
}

// Générer les métadonnées SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCityBySlug(params.ville);
  const trade = getTradeBySlug(TRADE_SLUG);
  const service = getServiceBySlug(TRADE_SLUG, params.service);
  
  if (!city || !trade || !service) {
    return { title: "Page non trouvée" };
  }

  const content = generateServicePageContent(trade, service, city);

  return {
    title: content.title,
    description: content.metaDescription,
    alternates: {
      canonical: content.canonical,
    },
    openGraph: {
      title: content.title,
      description: content.metaDescription,
      url: content.canonical,
      siteName: "Joël",
      locale: "fr_FR",
      type: "website",
    },
  };
}

export default function SerurierServiceVillePage({ params }: Props) {
  const city = getCityBySlug(params.ville);
  const trade = getTradeBySlug(TRADE_SLUG);
  const service = getServiceBySlug(TRADE_SLUG, params.service);

  if (!city || !trade || !service) {
    notFound();
  }

  const content = generateServicePageContent(trade, service, city);

  return (
    <>
      <Navigation />
      <main>
        {/* JSON-LD Schema */}
        <LocalSchema 
          trade={trade} 
          city={city} 
          faqItems={content.faq}
          service={service}
        />

        {/* Hero */}
        <CityHero 
          trade={trade} 
          city={city} 
          content={content}
          service={service}
        />

        {/* Service description enrichie */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-gradient-to-br from-joel-violet/5 to-joel-mauve/5 rounded-3xl p-8 md:p-12">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                {service.name} à {city.name} ({city.postalCodes[0]})
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {content.serviceCityParagraph}
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {service.keywords.slice(0, 5).map((keyword, index) => (
                  <span 
                    key={index}
                    className="bg-white/80 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pourquoi Joël */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              {content.whyJoel.title}
            </h2>
            <div className="space-y-4">
              {content.whyJoel.points.map((point, index) => (
                <div key={index} className="flex gap-4 items-start bg-white rounded-xl p-5 border border-gray-100">
                  <span className="flex-shrink-0 w-8 h-8 bg-joel-violet/10 text-joel-violet rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </span>
                  <p className="text-gray-700 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Autres services dans cette ville */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-display text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">
              Autres services serrurerie à {city.name}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {trade.services.filter(s => s.slug !== service.slug && s.slug !== "tarifs").slice(0, 6).map((s) => (
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

        {/* Process */}
        <ServiceProcess />

        {/* FAQ combinée (ville + service) */}
        <CityFAQ 
          faqItems={[...content.serviceFaq, ...content.faq]} 
          cityName={city.name} 
          tradeName={service.name}
        />

        {/* Nearby areas */}
        <NearbyAreas trade={trade} city={city} />

        {/* Final CTA */}
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}





