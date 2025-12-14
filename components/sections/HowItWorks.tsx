"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MousePointer, FileText, UserCheck, Wrench } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Décrivez votre problème",
    description: "En quelques clics, indiquez-nous votre urgence et votre localisation.",
    icon: MousePointer,
  },
  {
    number: "02",
    title: "Recevez un devis instantané",
    description: "Prix fixe affiché immédiatement. Pas de surprise, pas de négociation.",
    icon: FileText,
  },
  {
    number: "03",
    title: "Un artisan vérifié vous contacte",
    description: "Professionnel qualifié, proche de chez vous, disponible maintenant.",
    icon: UserCheck,
  },
  {
    number: "04",
    title: "Intervention rapide",
    description: "Votre problème est résolu. Vous payez le prix annoncé, rien de plus.",
    icon: Wrench,
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Comment ça <span className="gradient-text">marche ?</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Un processus simple et transparent, de votre demande à l'intervention.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-joel opacity-20 hidden md:block" />

          {/* Steps */}
          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
                    <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                      <span className="text-5xl font-bold gradient-text">{step.number}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>

                {/* Icon circle */}
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                    className="w-20 h-20 bg-gradient-joel rounded-full flex items-center justify-center shadow-xl shadow-joel-violet/30"
                  >
                    <step.icon size={32} className="text-white" />
                  </motion.div>
                </div>

                {/* Spacer */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

