"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Euro, Clock, Award, Phone, CheckCircle } from "lucide-react";

const guarantees = [
  {
    icon: Euro,
    title: "Prix fixe annoncé",
    description: "Vous connaissez le prix exact avant l'intervention. Pas de surprise.",
    accent: true,
  },
  {
    icon: Shield,
    title: "Artisan vérifié",
    description: "Identité, qualifications et assurances vérifiées par nos équipes.",
  },
  {
    icon: Clock,
    title: "Intervention rapide",
    description: "Un professionnel disponible en moyenne en 30 minutes près de chez vous.",
  },
  {
    icon: Award,
    title: "Travail garanti",
    description: "Garantie sur l'intervention et service après-vente inclus.",
  },
  {
    icon: Phone,
    title: "Support 24h/24",
    description: "Une équipe à votre écoute jour et nuit pour vos urgences.",
  },
  {
    icon: CheckCircle,
    title: "Paiement sécurisé",
    description: "Paiement avant intervention. Vous payez, on intervient.",
  },
];

export default function ServiceGuarantees() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Les garanties <span className="gradient-text">Joël</span>
          </h2>
          <p className="text-lg text-gray-600">
            Tout ce qui fait la différence avec les autres.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guarantees.map((guarantee, index) => (
            <motion.div
              key={guarantee.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border ${
                guarantee.accent ? 'border-joel-yellow/30' : 'border-white/50'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                guarantee.accent ? 'bg-joel-yellow' : 'bg-gradient-joel'
              }`}>
                <guarantee.icon size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{guarantee.title}</h3>
              <p className="text-gray-600">{guarantee.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
