"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Shield, Euro, Clock, FileCheck, Users, Star, ArrowRight } from "lucide-react";
import { useSiteConfig } from "@/lib/hooks/useSiteConfig";
import { yellowPunctuation } from "@/components/ui/Title";

const solutions = [
  {
    icon: FileCheck,
    title: "Prix fixe annoncé au téléphone",
    description:
      "9 cas sur 10 reçoivent un devis ferme avant que l'artisan parte. Le tarif communiqué au standard est celui qui figure sur la facture finale, sans variable.",
  },
  {
    icon: Euro,
    title: "Annulation sans frais",
    description:
      "Tant que l'artisan n'est pas arrivé, vous pouvez annuler par téléphone sans pénalité. Si vous refusez le devis sur place, le déplacement n'est pas facturé.",
    accent: true,
  },
  {
    icon: Users,
    title: "Identité artisan vérifiée",
    description:
      "RC pro, qualifications (Qualibat, Qualifelec, A2P) et casier judiciaire contrôlés avant intégration au réseau. Nom et matricule communiqués au téléphone avant départ.",
  },
  {
    icon: Clock,
    title: "Délai d'arrivée tenu",
    description:
      "30 minutes en moyenne sur Paris intra-muros, 60 minutes sur la couronne IDF. Le suivi du temps réel est tracé : si le délai annoncé est dépassé, le standard vous rappelle.",
  },
  {
    icon: FileCheck,
    title: "Facture conforme assurance",
    description:
      "Ligne déplacement, ligne main d'œuvre, ligne pièces, taux TVA, SIRET, signature. Document accepté par AXA, MAIF, Allianz, Groupama, MMA, Macif, Matmut.",
  },
  {
    icon: Shield,
    title: "SAV 30 jours sur l'intervention",
    description:
      "Si le défaut revient sur la même origine sous 30 jours, le retour de l'artisan est sans frais. Au-delà, garantie pièces 2 ans constructeur, garantie main d'œuvre 1 an.",
  },
];

export default function StopArnaquesSolution() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { config } = useSiteConfig();

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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-joel-violet/10 border border-joel-violet/20 rounded-full mb-4 sm:mb-6">
            <Shield size={16} className="text-joel-violet" />
            <span className="text-joel-violet font-medium text-sm sm:text-base">La solution Joël</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            {yellowPunctuation("Comment Joël vous protège")}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Six garanties contractuelles. Pas de promesse vague : chaque ligne
            est défendable, écrite sur la facture, opposable juridiquement.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-16">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white/80 backdrop-blur-xs rounded-2xl p-5 sm:p-6 shadow-lg border hover:shadow-xl transition-all ${
                solution.accent ? 'border-joel-yellow/30' : 'border-white/50'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                solution.accent ? 'bg-joel-yellow' : 'bg-gradient-joel'
              }`}>
                <solution.icon size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {yellowPunctuation(solution.title)}
              </h3>
              <p className="text-sm text-gray-600">
                {solution.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <a
            href={config.cta_devis_url}
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-joel text-white font-bold rounded-full shadow-xl shadow-joel-violet/30 hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            <span>Obtenir mon devis</span>
            <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
