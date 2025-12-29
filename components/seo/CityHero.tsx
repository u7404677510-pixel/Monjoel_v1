"use client";

import { motion } from "framer-motion";
import { Phone, ArrowRight, Clock, Shield, Euro, MapPin } from "lucide-react";
import Link from "next/link";
import { City } from "@/lib/data/cities-idf";
import { Trade, Service } from "@/lib/data/services-definition";
import { CityPageContent, ServicePageContent } from "@/lib/seo/city-content";
import { useSiteConfig } from "@/lib/hooks/useSiteConfig";

interface CityHeroProps {
  trade: Trade;
  city: City;
  content: CityPageContent | ServicePageContent;
  service?: Service;
}

export default function CityHero({ trade, city, content, service }: CityHeroProps) {
  const { config } = useSiteConfig();
  
  const isServicePage = "serviceTitle" in content;
  const priceFrom = isServicePage 
    ? (content as ServicePageContent).priceFrom 
    : trade.services[0]?.priceFrom || 89;

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-joel-violet/5 via-white to-joel-mauve/5" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-joel-violet/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-joel-mauve/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-joel-violet transition-colors">
                Accueil
              </Link>
              <span>/</span>
              <Link 
                href={`/${trade.slug === "plombier" ? "plomberie" : trade.slug === "electricien" ? "electricite" : "serrurerie"}`}
                className="hover:text-joel-violet transition-colors"
              >
                {trade.name}
              </Link>
              <span>/</span>
              {service ? (
                <>
                  <Link 
                    href={`/${trade.slug}/${city.slug}`}
                    className="hover:text-joel-violet transition-colors"
                  >
                    {city.name}
                  </Link>
                  <span>/</span>
                  <span className="text-gray-700">{service.name}</span>
                </>
              ) : (
                <span className="text-gray-700">{city.name}</span>
              )}
            </div>

            {/* Location badge */}
            <div className="inline-flex items-center gap-2 bg-joel-violet/10 text-joel-violet px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MapPin size={16} />
              <span>{city.name} ({city.postalCodes[0]})</span>
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {content.title}
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {content.subtitle}
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 text-gray-700">
                <Clock size={20} className="text-joel-violet" />
                <span>~30 min en moyenne</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Euro size={20} className="text-joel-yellow" />
                <span>Prix fixe garanti</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Shield size={20} className="text-green-500" />
                <span>Artisan vérifié</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              {config.show_cta_phone && (
                <a
                  href={`tel:${config.phone_number?.replace(/\s/g, "") || "0184800966"}`}
                  data-placement="city-hero"
                  className="inline-flex items-center justify-center gap-3 bg-gradient-joel text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <Phone size={22} />
                  <span>{config.phone_number || "01 84 80 09 66"}</span>
                </a>
              )}
              {config.show_cta_devis && (
                <Link
                  href={config.cta_devis_url || "/contact"}
                  className="inline-flex items-center justify-center gap-3 bg-white text-joel-violet px-8 py-4 rounded-xl font-semibold text-lg border-2 border-joel-violet hover:bg-joel-violet hover:text-white transition-all"
                >
                  <span>{content.ctaPhrase}</span>
                  <ArrowRight size={20} />
                </Link>
              )}
            </div>
          </motion.div>

          {/* Right - Price card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              {/* Price header */}
              <div className="text-center mb-8">
                <p className="text-gray-500 text-sm mb-2">
                  {isServicePage ? service?.name : trade.name} à {city.name}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-gray-900">{priceFrom}</span>
                  <span className="text-2xl text-gray-500">€</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">Prix de départ</p>
              </div>

              {/* Services list */}
              <div className="space-y-4 mb-8">
                {(isServicePage ? [service!] : trade.services.slice(0, 4)).map((s, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <span className="text-gray-700">{s.name}</span>
                    <span className="font-semibold text-joel-violet">{s.priceFrom}€</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              {config.show_cta_phone && (
                <a
                  href={`tel:${config.phone_number?.replace(/\s/g, "") || "0184800966"}`}
                  data-placement="city-hero-card"
                  className="block w-full text-center bg-gradient-joel text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity"
                >
                  Appeler maintenant
                </a>
              )}

              {/* Guarantee */}
              <p className="text-center text-sm text-gray-500 mt-4">
                Paiement avant intervention • Prix fixe garanti
              </p>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-joel-yellow text-gray-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
              24h/24 • 7j/7
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}



