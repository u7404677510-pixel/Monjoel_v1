import { Metadata } from "next";
import { notFound } from "next/navigation";
import { citiesIDF, getCityBySlug } from "@/lib/data/cities-idf";
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

// Générer les pages statiques pour toutes les combinaisons ville/service
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

        {/* Service description */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-gradient-to-br from-joel-violet/5 to-joel-mauve/5 rounded-3xl p-8 md:p-12">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                {service.name} à {city.name}
              </h2>
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

        {/* Process */}
        <ServiceProcess />

        {/* FAQ */}
        <CityFAQ 
          faqItems={content.faq} 
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




