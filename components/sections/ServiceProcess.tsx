"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, FileText, Wrench, CreditCard } from "lucide-react";
import { yellowPunctuation } from "@/components/ui/Title";

const steps = [
  {
    icon: Phone,
    title: "1. Appelez",
    description: "Diagnostic gratuit par téléphone. On évalue votre besoin en quelques minutes.",
  },
  {
    icon: FileText,
    title: "2. Devis",
    description: "Prix fixe confirmé avant le départ de l'artisan. Aucune surprise possible.",
  },
  {
    icon: Wrench,
    title: "3. Intervention",
    description: "Artisan certifié chez vous en 20 min. Travail propre, résultat garanti.",
  },
  {
    icon: CreditCard,
    title: "4. Règlement",
    description: "Paiement uniquement après intervention. CB, chèque ou espèces acceptés.",
  },
];

export default function ServiceProcess() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Comment ça <span className="gradient-text">marche</span>
            <span className="text-joel-yellow"> ?</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            {yellowPunctuation("Simple, rapide, transparent")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-2xl flex items-center justify-center ${
                index === 3 ? "bg-joel-yellow" : "bg-gradient-joel"
              }`}>
                <step.icon size={28} className="text-white" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-2">
                {yellowPunctuation(step.title)}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
