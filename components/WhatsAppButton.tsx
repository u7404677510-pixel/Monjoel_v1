"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";

// Numéro WhatsApp Business (format international sans +)
const WHATSAPP_NUMBER = "33172682202";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Bonjour, j'ai besoin d'un dépannage urgent. Pouvez-vous m'aider ?"
);

export default function WhatsAppButton() {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Afficher le tooltip après 10 secondes si pas d'interaction
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setIsTooltipVisible(true);
        // Cacher après 5 secondes
        setTimeout(() => setIsTooltipVisible(false), 5000);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [hasInteracted]);

  const handleClick = () => {
    setHasInteracted(true);
    setIsTooltipVisible(false);
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

  return (
    <div className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-40">
      {/* Tooltip */}
      <AnimatePresence>
        {isTooltipVisible && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            className="absolute bottom-full right-0 mb-3 bg-white rounded-xl shadow-xl border border-gray-100 p-3 w-56"
          >
            <button
              onClick={() => setIsTooltipVisible(false)}
              className="absolute -top-2 -right-2 bg-gray-100 rounded-full p-1 hover:bg-gray-200 transition-colors"
            >
              <X size={14} className="text-gray-500" />
            </button>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Pas envie d'appeler ?</span>
              <br />
              Envoyez-nous un message WhatsApp !
            </p>
            {/* Flèche */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-gray-100 transform rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full shadow-lg hover:shadow-xl transition-all"
        aria-label="Contacter sur WhatsApp"
      >
        <MessageCircle size={28} fill="white" strokeWidth={0} />
        
        {/* Pulse indicator */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#25D366] border-2 border-white" />
        </span>
      </motion.a>

      {/* Label on desktop */}
      <p className="hidden md:block text-xs text-gray-500 text-center mt-2">
        WhatsApp
      </p>
    </div>
  );
}
