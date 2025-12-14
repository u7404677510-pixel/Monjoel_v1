"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { XCircle } from "lucide-react";

const practices = [
  {
    title: "Le prix qui explose",
    description: "Un prix annoncé de 80€ qui devient 600€ une fois sur place.",
  },
  {
    title: "Les travaux inutiles",
    description: "Changement de pièces en bon état pour gonfler la facture.",
  },
  {
    title: "L'urgence fabriquée",
    description: '"Votre installation est dangereuse, il faut tout refaire maintenant."',
  },
  {
    title: "Le faux devis",
    description: "Pas de devis écrit, ou un devis illisible signé sous pression.",
  },
  {
    title: "L'absence de garantie",
    description: "Aucune facture, aucun recours possible après l'intervention.",
  },
  {
    title: "Le paiement forcé",
    description: "Menaces ou intimidation pour obtenir un paiement immédiat en espèces.",
  },
];

export default function StopArnaquesPractices() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Les <span className="text-red-500">pratiques douteuses</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Apprenez à reconnaître les techniques des faux artisans.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practices.map((practice, index) => (
            <motion.div
              key={practice.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="bg-red-50/80 backdrop-blur-sm rounded-2xl p-6 border border-red-100"
            >
              <XCircle className="text-red-500 mb-4" size={32} />
              <h3 className="text-lg font-bold text-gray-900 mb-2">{practice.title}</h3>
              <p className="text-gray-600">{practice.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

