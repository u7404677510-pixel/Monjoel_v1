import { Metadata } from "next";
import { notFound } from "next/navigation";
import { citiesIDF, getCityBySlug } from "@/lib/data/cities-idf";
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

// Générer les pages statiques pour toutes les villes
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

