"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Euro, Clock, FileCheck, Users, Star, ArrowRight } from "lucide-react";
import { useSiteConfig } from "@/lib/hooks/useSiteConfig";
import { yellowPunctuation } from "@/components/ui/Title";

const solutions = [
  {
    icon: FileCheck,
    title: "Devis instantané",
    description: "Recevez un prix fixe avant toute intervention. Ce prix ne changera jamais.",
  },
  {
    icon: Euro,
    title: "Paiement avant intervention",
    description: "Payez avant l'intervention, l'artisan intervient ensuite. Un seul paiement, zéro surprise.",
    accent: true,
  },
  {
    icon: Users,
    title: "Artisans vérifiés",
    description: "Chaque professionnel est vérifié : identité, diplômes, assurances, avis clients.",
  },
  {
    icon: Clock,
    title: "Intervention rapide",
    description: "Un artisan disponible en moins de 30 minutes en moyenne près de chez vous.",
  },
  {
    icon: Star,
    title: "Satisfaction garantie",
    description: "Si vous n'êtes pas satisfait, nous trouvons une solution. Toujours.",
  },
  {
    icon: Shield,
    title: "Protection totale",
    description: "Joël vous accompagne avant, pendant et après l'intervention.",
  },
];

export default function StopArnaquesSolution() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { config } = useSiteConfig();

  return (
    <section ref={ref} className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-joel-violet/10 border border-joel-violet/20 rounded-full mb-4 sm:mb-6">
            <Shield size={16} className="text-joel-violet" />
            <span className="text-joel-violet font-medium text-sm sm:text-base">La solution Joël</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            {yellowPunctuation("Comment Joël vous protège")}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Des garanties concrètes pour un dépannage en toute confiance.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-16">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white/80 backdrop-blur-sm rounded-2xl p-5 sm:p-6 shadow-lg border hover:shadow-xl transition-all ${
                solution.accent ? 'border-joel-yellow/30' : 'border-white/50'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                solution.accent ? 'bg-joel-yellow' : 'bg-gradient-joel'
              }`}>
                <solution.icon size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {yellowPunctuation(solution.title)}
              </h3>
              <p className="text-sm text-gray-600">
                {solution.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <a
            href={config.cta_devis_url}
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-joel text-white font-bold rounded-full shadow-xl shadow-joel-violet/30 hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            <span>Obtenir mon devis</span>
            <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
