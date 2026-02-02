"use client";

import { useState, useEffect } from "react";
import { X, Clock, CheckCircle, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Configuration
const PHONE_NUMBER = "01 41 69 10 08";
const PHONE_TEL = "tel:+33141691008";

// Messages variés
const artisanCounts = [2, 3, 4, 3, 2, 5, 3, 4];

export default function ArtisanToast() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [artisansCount, setArtisansCount] = useState(3);

  useEffect(() => {
    // Check si déjà dismissé cette session
    if (typeof window !== "undefined" && sessionStorage.getItem("artisan-toast-dismissed")) {
      return;
    }

    // Random artisan count
    const randomCount = artisanCounts[Math.floor(Math.random() * artisanCounts.length)];
    setArtisansCount(randomCount);

    // Afficher après 5 secondes
    const showTimer = setTimeout(() => {
      setIsVisible(true);
      // Track toast view
      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "view_toast",
          toast_type: "artisan_available",
        });
      }
    }, 5000);

    // Auto-hide après 20 secondes
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 25000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("artisan-toast-dismissed", "true");
      // Track dismiss
      if (window.dataLayer) {
        window.dataLayer.push({
          event: "dismiss_toast",
          toast_type: "artisan_available",
        });
      }
    }
  };

  const handleCallClick = () => {
    // Track call click
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "click_to_call",
        phone_number: PHONE_NUMBER,
        placement: "artisan_toast",
      });
    }
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-24 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-40"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Header vert */}
            <div className="bg-emerald-500 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white text-sm font-medium">
                <CheckCircle size={16} />
                <span>Artisan disponible</span>
              </div>
              <button
                onClick={handleDismiss}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Fermer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start gap-3">
                {/* Avatar avec nombre */}
                <div className="w-12 h-12 bg-gradient-joel rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {artisansCount}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">
                    {artisansCount} artisans disponibles
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock size={14} className="text-emerald-500" />
                      Intervention ~30 min
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA - Bouton avec href ET onClick */}
              <a
                href={PHONE_TEL}
                onClick={handleCallClick}
                className="mt-4 flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-center py-3 rounded-xl transition-colors active:scale-[0.98]"
              >
                <Phone size={18} />
                <span>Appeler - Gratuit</span>
              </a>
            </div>

            {/* Pulse indicator */}
            <div className="absolute top-3 right-12 w-2 h-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
