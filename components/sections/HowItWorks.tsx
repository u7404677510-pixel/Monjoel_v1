"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Camera, MessageCircleQuestion, FileText, CreditCard } from "lucide-react";
import { yellowPunctuation } from "@/components/ui/Title";

const steps = [
  {
    number: "01",
    title: "Prenez une photo.",
    description: "Montrez le problème. Une porte, une fuite, une panne… en 5 secondes.",
    icon: Camera,
    accent: false,
  },
  {
    number: "02",
    title: "Répondez à quelques questions.",
    description: "Joël comprend la situation en quelques questions simples.",
    icon: MessageCircleQuestion,
    accent: false,
  },
  {
    number: "03",
    title: "Recevez un devis immédiat.",
    description: "Un prix clair, fixe, avant intervention. Ce prix ne bouge plus.",
    icon: FileText,
    accent: true,
  },
  {
    number: "04",
    title: "Payez, puis on intervient.",
    description: "Vous payez au prix annoncé. Un artisan arrive chez vous en ~30min.",
    icon: CreditCard,
    accent: false,
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Comment ça <span className="gradient-text">marche</span>
            <span className="text-joel-yellow"> ?</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Un processus simple et transparent, de votre demande à l'intervention.
          </p>
        </motion.div>

        {/* Mobile: Vertical stack */}
        <div className="md:hidden space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border ${step.accent ? 'border-joel-yellow/30' : 'border-white/50'}`}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  step.accent ? 'bg-joel-yellow' : 'bg-gradient-joel'
                }`}>
                  <step.icon size={24} className="text-white" />
                </div>
                <span className={`text-3xl font-bold ${step.accent ? 'text-joel-yellow' : 'gradient-text'}`}>{step.number}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{yellowPunctuation(step.title)}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Desktop: Timeline */}
        <div className="hidden md:block relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-joel-violet via-joel-mauve to-joel-yellow opacity-20" />

          {/* Steps */}
          <div className="space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex items-center gap-8 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                  <div className={`bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border ${step.accent ? 'border-joel-yellow/30' : 'border-white/50'}`}>
                    <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? "justify-end" : ""}`}>
                      <span className={`text-5xl font-bold ${step.accent ? 'text-joel-yellow' : 'gradient-text'}`}>{step.number}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{yellowPunctuation(step.title)}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>

                {/* Icon circle */}
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                    className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl ${
                      step.accent 
                        ? 'bg-joel-yellow shadow-joel-yellow/30' 
                        : 'bg-gradient-joel shadow-joel-violet/30'
                    }`}
                  >
                    <step.icon size={32} className="text-white" />
                  </motion.div>
                </div>

                {/* Spacer */}
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
