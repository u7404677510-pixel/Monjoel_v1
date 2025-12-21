"use client";

import { motion } from "framer-motion";
import { LucideIcon, Phone, ArrowRight } from "lucide-react";
import { useSiteConfig, formatPhoneForTel } from "@/lib/hooks/useSiteConfig";
import { yellowPunctuation } from "@/components/ui/Title";

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
}

export default function ServiceHero({ title, subtitle, description, icon: Icon }: ServiceHeroProps) {
  const { config } = useSiteConfig();

  return (
    <section className="pt-28 sm:pt-32 pb-12 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-joel rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl shadow-joel-violet/30"
          >
            <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-joel-violet/10 border border-joel-violet/20 rounded-full mb-4 sm:mb-6"
          >
            <span className="text-joel-violet font-medium text-sm sm:text-base">{subtitle}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6"
          >
            {yellowPunctuation(title)}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-base sm:text-lg text-gray-600 mb-8"
          >
            {description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            {config.show_cta_phone && (
              <a
                href={`tel:${formatPhoneForTel(config.phone_number)}`}
                data-placement="service-hero"
                className="flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-joel text-white font-bold rounded-full shadow-xl shadow-joel-violet/30 hover:shadow-2xl transition-all w-full sm:w-auto justify-center"
              >
                <Phone size={20} />
                <span>{config.phone_number}</span>
              </a>
            )}
            {config.show_cta_devis && (
              <a
                href={config.cta_devis_url}
                className="flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-joel-violet font-bold rounded-full border-2 border-joel-violet/20 hover:border-joel-violet/40 transition-all w-full sm:w-auto justify-center"
              >
                <span>Obtenir mon devis</span>
                <ArrowRight size={18} />
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
