"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Euro, Clock, Award, Phone, CheckCircle } from "lucide-react";
import { yellowPunctuation } from "@/components/ui/Title";

const guarantees = [
  {
    icon: Euro,
    title: "Prix fixe annoncé",
    description: "Prix exact avant intervention. Pas de surprise.",
    accent: true,
  },
  {
    icon: Shield,
    title: "Artisan vérifié",
    description: "Identité et qualifications vérifiées.",
  },
  {
    icon: Clock,
    title: "Arrivée rapide",
    description: "Chez vous en ~30min en moyenne.",
  },
  {
    icon: Award,
    title: "Travail garanti",
    description: "Garantie et SAV inclus.",
  },
  {
    icon: Phone,
    title: "Support 24h/24",
    description: "À votre écoute jour et nuit.",
  },
  {
    icon: CheckCircle,
    title: "Paiement sécurisé",
    description: "Payez avant, on intervient après.",
  },
];

export default function ServiceGuarantees() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {yellowPunctuation("Les garanties ")}
            <span className="gradient-text">{yellowPunctuation("Joël")}</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            {yellowPunctuation("Tout ce qui fait la différence avec les autres.")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-8">
          {guarantees.map((guarantee, index) => (
            <motion.div
              key={guarantee.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border ${
                guarantee.accent ? 'border-joel-yellow/30' : 'border-white/50'
              }`}
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 ${
                guarantee.accent ? 'bg-joel-yellow' : 'bg-gradient-joel'
              }`}>
                <guarantee.icon size={20} className="text-white" />
              </div>
              <h3 className="text-sm sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">
                {yellowPunctuation(guarantee.title)}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-tight">
                {yellowPunctuation(guarantee.description)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
