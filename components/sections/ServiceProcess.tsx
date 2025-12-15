"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Smartphone, MessageSquare, CreditCard, Wrench } from "lucide-react";

const steps = [
  {
    icon: Smartphone,
    title: "1. Décrivez",
    description: "Prenez une photo et répondez à quelques questions simples.",
  },
  {
    icon: MessageSquare,
    title: "2. Recevez",
    description: "Obtenez un devis instantané avec un prix fixe garanti.",
  },
  {
    icon: CreditCard,
    title: "3. Payez",
    description: "Réglez en ligne de manière sécurisée avant l'intervention.",
  },
  {
    icon: Wrench,
    title: "4. Dépannage",
    description: "Un artisan arrive chez vous en ~30min en moyenne.",
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
            Comment ça <span className="gradient-text">marche</span> ?
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Un processus simple en 4 étapes
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
                index === 2 ? 'bg-joel-yellow' : 'bg-gradient-joel'
              }`}>
                <step.icon size={28} className="text-white" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-2">{step.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

