"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Euro, Clock, Star, Phone, CheckCircle } from "lucide-react";
import { yellowPunctuation } from "@/components/ui/Title";

const advantages = [
  {
    icon: Shield,
    title: "Artisans vérifiés",
    description: "Tous nos professionnels sont certifiés et leur identité vérifiée.",
  },
  {
    icon: Euro,
    title: "Prix fixes garantis",
    description: "Le prix annoncé est le prix payé. Zéro surprise.",
    accent: true,
  },
  {
    icon: Clock,
    title: "Arrivée rapide",
    description: "Un artisan chez vous en moins de 30 minutes en moyenne.",
  },
  {
    icon: Star,
    title: "Travail garanti",
    description: "Garantie sur l'intervention et SAV inclus.",
  },
  {
    icon: Phone,
    title: "Support 24h/24",
    description: "Une équipe à votre écoute pour vos urgences.",
  },
  {
    icon: CheckCircle,
    title: "Devis instantané",
    description: "Recevez votre prix fixe en quelques secondes.",
  },
];

export default function Advantages() {
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
            Pourquoi choisir <span className="gradient-text">Joël</span>
            <span className="text-joel-yellow"> ?</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Une solution complète pour tous vos dépannages d'urgence.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-lg border hover:shadow-xl hover:-translate-y-1 transition-all ${
                advantage.accent ? 'border-joel-yellow/30' : 'border-white/50'
              }`}
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform ${
                advantage.accent ? 'bg-joel-yellow' : 'bg-gradient-joel'
              }`}>
                <advantage.icon size={24} className="text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                {yellowPunctuation(advantage.title)}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                {advantage.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
