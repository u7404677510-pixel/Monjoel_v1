"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle, ArrowRight } from "lucide-react";

const solutions = [
  {
    title: "Prix fixe avant intervention",
    description: "Vous connaissez le montant exact avant que l'artisan n'arrive.",
  },
  {
    title: "Artisans 100% vérifiés",
    description: "Identité, qualifications et assurances contrôlées.",
  },
  {
    title: "Devis écrit et détaillé",
    description: "Tout est transparent, vous savez exactement ce que vous payez.",
  },
  {
    title: "Garantie sur l'intervention",
    description: "Un problème ? Nous intervenons de nouveau gratuitement.",
  },
  {
    title: "Paiement sécurisé",
    description: "Payez après l'intervention, par le moyen de votre choix.",
  },
  {
    title: "Support client réactif",
    description: "Une équipe disponible 24h/24 pour vous accompagner.",
  },
];

export default function StopArnaquesSolution() {
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
            La <span className="gradient-text">solution Joël</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Comment nous garantissons votre sécurité à chaque intervention.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="bg-green-50/80 backdrop-blur-sm rounded-2xl p-6 border border-green-100"
            >
              <CheckCircle className="text-green-500 mb-4" size={32} />
              <h3 className="text-lg font-bold text-gray-900 mb-2">{solution.title}</h3>
              <p className="text-gray-600">{solution.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <a
            href="https://app.monjoel.com"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-joel text-white font-bold text-lg rounded-full shadow-xl shadow-joel-violet/30 hover:shadow-2xl transition-all"
          >
            Me protéger maintenant
            <ArrowRight size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

