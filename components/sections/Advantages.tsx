"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Euro, Clock, Star, Phone, CheckCircle } from "lucide-react";

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
    title: "Intervention rapide",
    description: "Un artisan disponible en moyenne en 30 minutes près de chez vous.",
  },
  {
    icon: Star,
    title: "Satisfaction garantie",
    description: "Travail garanti, service après-intervention inclus.",
  },
  {
    icon: Phone,
    title: "Support 24h/24",
    description: "Une équipe à votre écoute pour toutes vos urgences.",
  },
  {
    icon: CheckCircle,
    title: "Devis instantané",
    description: "Recevez votre prix fixe en quelques secondes, avant toute intervention.",
  },
];

export default function Advantages() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Pourquoi choisir <span className="gradient-text">Joël</span>
            <span className="text-joel-yellow"> ?</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Une solution complète pour tous vos dépannages d'urgence.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border hover:shadow-xl hover:-translate-y-1 transition-all ${
                advantage.accent ? 'border-joel-yellow/30' : 'border-white/50'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${
                advantage.accent ? 'bg-joel-yellow' : 'bg-gradient-joel'
              }`}>
                <advantage.icon size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{advantage.title}</h3>
              <p className="text-gray-600">{advantage.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
