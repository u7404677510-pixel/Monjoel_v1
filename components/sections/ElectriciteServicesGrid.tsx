"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Zap, 
  ZapOff,
  LayoutGrid,
  Plug,
  AlertTriangle,
  Shield,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { yellowPunctuation } from "@/components/ui/Title";

const services = [
  {
    href: "/electricien/panne-electrique",
    icon: ZapOff,
    title: "Panne électrique",
    description: "Intervention urgente pour rétablir le courant rapidement.",
    price: "79€",
    highlight: true,
  },
  {
    href: "/electricien/disjoncteur-saute",
    icon: Zap,
    title: "Disjoncteur qui saute",
    description: "Diagnostic rapide et réparation de la cause.",
    price: "69€",
    highlight: false,
  },
  {
    href: "/electricien/tableau-electrique",
    icon: LayoutGrid,
    title: "Tableau électrique",
    description: "Dépannage ou remplacement de votre tableau.",
    price: "149€",
    highlight: false,
  },
  {
    href: "/electricien/prise-interrupteur-hs",
    icon: Plug,
    title: "Prise ou interrupteur HS",
    description: "Réparation rapide de vos équipements défaillants.",
    price: "59€",
    highlight: false,
  },
  {
    href: "/electricien/court-circuit",
    icon: AlertTriangle,
    title: "Court-circuit",
    description: "Intervention d'urgence pour danger immédiat.",
    price: "89€",
    highlight: false,
  },
  {
    href: "/electricien/mise-aux-normes",
    icon: Shield,
    title: "Mise aux normes",
    description: "Sécurisez votre installation électrique.",
    price: "Sur devis",
    highlight: false,
  },
];

export default function ElectriciteServicesGrid() {
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
            Nos interventions <span className="gradient-text">électricité</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            {yellowPunctuation("Chaque situation est différente. Découvrez nos solutions adaptées à votre problème.")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.href}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={service.href}
                className={`block h-full p-5 sm:p-6 rounded-2xl border transition-all hover:shadow-xl hover:-translate-y-1 ${
                  service.highlight
                    ? "bg-gradient-joel text-white border-transparent"
                    : "bg-white/80 backdrop-blur-sm border-white/50 hover:border-joel-violet/30"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  service.highlight ? "bg-white/20" : "bg-gradient-joel"
                }`}>
                  <service.icon size={24} className="text-white" />
                </div>
                
                <h3 className={`text-lg font-bold mb-2 ${
                  service.highlight ? "text-white" : "text-gray-900"
                }`}>
                  {service.title}
                </h3>
                
                <p className={`text-sm mb-4 ${
                  service.highlight ? "text-white/80" : "text-gray-600"
                }`}>
                  {service.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className={`font-bold ${
                    service.highlight ? "text-joel-yellow" : "text-joel-violet"
                  }`}>
                    {service.price}
                  </span>
                  <ArrowRight size={18} className={
                    service.highlight ? "text-white" : "text-joel-violet"
                  } />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

