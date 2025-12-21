"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { yellowPunctuation } from "@/components/ui/Title";

interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceFAQProps {
  faqs: FAQItem[];
  serviceName: string;
}

export default function ServiceFAQ({ faqs, serviceName }: ServiceFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-joel-violet/10 rounded-full mb-4">
            <HelpCircle size={16} className="text-joel-violet" />
            <span className="text-sm font-medium text-joel-violet">FAQ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            {yellowPunctuation("Questions fréquentes")}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            {yellowPunctuation(`Tout ce que vous devez savoir sur nos services de ${serviceName.toLowerCase()}`)}
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/50 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left"
              >
                <span className="font-semibold text-gray-900 text-sm sm:text-base pr-4">
                  {yellowPunctuation(faq.question)}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-joel-violet flex-shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-gray-600 text-sm sm:text-base">
                      {yellowPunctuation(faq.answer)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
