"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Euro, Clock, Star, BadgeCheck, HeartHandshake } from "lucide-react";
import { yellowPunctuation } from "@/components/ui/Title";

const guarantees = [
  {
    icon: Shield,
    title: "Artisans certifiés",
    description: "Tous nos professionnels sont vérifiés, assurés et qualifiés.",
  },
  {
    icon: Euro,
    title: "Prix fixe garanti",
    description: "Le prix du devis est le prix final. Aucune majoration possible.",
    accent: true,
  },
  {
    icon: Clock,
    title: "Arrivée rapide",
    description: "Intervention en moins de 30 minutes en moyenne.",
  },
  {
    icon: Star,
    title: "Travail garanti",
    description: "Garantie sur toutes nos interventions et pièces.",
  },
  {
    icon: BadgeCheck,
    title: "Paiement sécurisé",
    description: "Payez avant l'intervention, l'artisan intervient ensuite.",
  },
  {
    icon: HeartHandshake,
    title: "Satisfaction client",
    description: "97% de clients satisfaits, plus de 15 000 interventions.",
  },
];

export default function ServiceGuarantees() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Nos <span className="gradient-text">garanties</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Des engagements concrets pour votre tranquillité.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {guarantees.map((guarantee, index) => (
            <motion.div
              key={guarantee.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white/80 backdrop-blur-sm rounded-2xl p-5 sm:p-6 shadow-lg border hover:shadow-xl transition-all ${
                guarantee.accent ? 'border-joel-yellow/30' : 'border-white/50'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                guarantee.accent ? 'bg-joel-yellow' : 'bg-gradient-joel'
              }`}>
                <guarantee.icon size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {yellowPunctuation(guarantee.title)}
              </h3>
              <p className="text-sm text-gray-600">
                {guarantee.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
