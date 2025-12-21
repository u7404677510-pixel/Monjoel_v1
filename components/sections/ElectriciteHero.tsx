"use client";

import { motion } from "framer-motion";
import { Zap, ArrowRight, Phone } from "lucide-react";
import { useSiteConfig, formatPhoneForTel } from "@/lib/hooks/useSiteConfig";
import { yellowPunctuation } from "@/components/ui/Title";

interface ElectriciteHeroProps {
  title: string;
  subtitle: string;
  description: string;
}

export default function ElectriciteHero({ title, subtitle, description }: ElectriciteHeroProps) {
  const { config } = useSiteConfig();

  const showPhone = config.show_cta_phone;
  const showDevis = config.show_cta_devis;

  return (
    <section className="pt-28 sm:pt-32 pb-12 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-joel rounded-full mb-6"
          >
            <Zap size={16} className="text-white" />
            <span className="text-white text-sm font-medium">{subtitle}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6"
          >
            {yellowPunctuation(title)}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-gray-600 mb-8"
          >
            {description}
          </motion.p>

          {/* CTAs - Conditionally rendered based on backoffice settings */}
          {(showPhone || showDevis) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            >
              {showPhone && (
                <a
                  href={`tel:${formatPhoneForTel(config.phone_number)}`}
                  data-placement="electricite-hero"
                  className="flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-joel text-white font-bold rounded-full shadow-xl shadow-joel-violet/30 hover:shadow-2xl transition-all w-full sm:w-auto justify-center"
                >
                  <Phone size={20} />
                  <span>{config.phone_number}</span>
                </a>
              )}
              {showDevis && (
                <a
                  href={config.cta_devis_url}
                  className="flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-joel-violet font-bold rounded-full border-2 border-joel-violet/20 hover:border-joel-violet/40 transition-all w-full sm:w-auto justify-center"
                >
                  <span>Obtenir mon devis</span>
                  <ArrowRight size={18} />
                </a>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
