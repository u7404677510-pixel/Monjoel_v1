"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CTAButtons from "@/components/CTAButtons";

export default function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Prêt à en finir avec les <span className="gradient-text">arnaques ?</span>
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Obtenez un devis instantané et transparent pour votre dépannage d'urgence.
          </p>

          <CTAButtons variant="hero" />
        </motion.div>
      </div>
    </section>
  );
}
