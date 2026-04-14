import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCityBySlug, citiesIDF } from "@/lib/data/cities-idf";
import { getTradeBySlug } from "@/lib/data/services-definition";
import { generateCityPageContent } from "@/lib/seo/city-content";
import { CityHero, CityFAQ, CityServices, LocalSchema, NearbyAreas } from "@/components/seo";
import FinalCTA from "@/components/sections/FinalCTA";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const TRADE_SLUG = "electricien";

interface Props {
  params: { ville: string };
}

// ISR: Permettre la génération à la demande pour les villes non prioritaires
export const dynamicParams = true;

// ISR: Revalider les pages toutes les 24 heures
export const revalidate = 86400;

export async function generateStaticParams() {
  return citiesIDF.map((city) => ({
    ville: city.slug,
  }));
}

// Générer les métadonnées SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCityBySlug(params.ville);
  const trade = getTradeBySlug(TRADE_SLUG);
  
  if (!city || !trade) {
    return { title: "Page non trouvée" };
  }

  const content = generateCityPageContent(trade, city);

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
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.metaDescription,
    },
  };
}

export default function ElectricienVillePage({ params }: Props) {
  const city = getCityBySlug(params.ville);
  const trade = getTradeBySlug(TRADE_SLUG);

  if (!city || !trade) {
    notFound();
  }

  const content = generateCityPageContent(trade, city);

  return (
    <>
      <Navigation />
      <main>
        {/* JSON-LD Schema */}
        <LocalSchema 
          trade={trade} 
          city={city} 
          faqItems={content.faq} 
        />

        {/* Hero */}
        <CityHero 
          trade={trade} 
          city={city} 
          content={content} 
        />

        {/* Introduction */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-lg text-gray-600 leading-relaxed">
              {content.introduction}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {content.highlights.map((highlight, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center gap-2 bg-joel-violet/5 text-joel-violet px-4 py-2 rounded-full text-sm"
                >
                  <span className="w-1.5 h-1.5 bg-joel-violet rounded-full" />
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <CityServices trade={trade} city={city} />

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

        {/* FAQ */}
        <CityFAQ 
          faqItems={content.faq} 
          cityName={city.name} 
          tradeName={trade.name}
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





