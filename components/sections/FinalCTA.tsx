"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CTAButtons from "@/components/CTAButtons";
import { yellowPunctuation } from "@/components/ui/Title";

export default function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            {yellowPunctuation("Besoin d'un ")}
            <span className="gradient-text">{yellowPunctuation("dépannage")}</span>
            <span className="text-joel-yellow"> ?</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto">
            {yellowPunctuation("Obtenez un devis instantané et transparent. Prix fixe garanti avant intervention.")}
          </p>

          <CTAButtons variant="hero" />
        </motion.div>
      </div>
    </section>
  );
}
