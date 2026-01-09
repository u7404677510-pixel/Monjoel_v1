"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle, XCircle, Gift } from "lucide-react";
import { yellowPunctuation } from "@/components/ui/Title";

interface ServiceCardsProps {
  doList: string[];
  dontList: string[];
  benefitsList: string[];
}

export default function ElectriciteServiceCards({ doList, dontList, benefitsList }: ServiceCardsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Ce qu'on fait */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0 }}
            className="bg-green-50/80 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-green-100"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                <CheckCircle size={20} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                {yellowPunctuation("Ce qu'on fait")}
              </h3>
            </div>
            <ul className="space-y-2">
              {doList.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Ce qu'on évite */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="bg-red-50/80 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-red-100"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center">
                <XCircle size={20} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                {yellowPunctuation("Ce qu'on évite")}
              </h3>
            </div>
            <ul className="space-y-2">
              {dontList.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <XCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Ce que tu gagnes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="bg-joel-yellow/10 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-joel-yellow/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-joel-yellow rounded-xl flex items-center justify-center">
                <Gift size={20} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                {yellowPunctuation("Ce que tu gagnes")}
              </h3>
            </div>
            <ul className="space-y-2">
              {benefitsList.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <Gift size={16} className="text-joel-yellow mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}



