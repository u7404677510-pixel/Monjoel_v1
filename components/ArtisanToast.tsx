"use client";

import { useState, useEffect } from "react";
import { X, MapPin, Clock, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Villes populaires pour le toast
const popularCities = [
  "Paris",
  "Boulogne-Billancourt",
  "Saint-Denis",
  "Montreuil",
  "Argenteuil",
  "Nanterre",
  "Créteil",
  "Versailles",
  "Vitry-sur-Seine",
  "Colombes",
];

// Messages variés
const messages = [
  { artisans: 3, distance: "2 km" },
  { artisans: 2, distance: "3 km" },
  { artisans: 4, distance: "1.5 km" },
  { artisans: 2, distance: "4 km" },
  { artisans: 3, distance: "2.5 km" },
];

export default function ArtisanToast() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [data, setData] = useState({ city: "", artisans: 3, distance: "2 km" });

  useEffect(() => {
    // Check si déjà dismissé cette session
    if (sessionStorage.getItem("artisan-toast-dismissed")) {
      return;
    }

    // Random data
    const randomCity = popularCities[Math.floor(Math.random() * popularCities.length)];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setData({ city: randomCity, ...randomMessage });

    // Afficher après 5 secondes
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    // Auto-hide après 15 secondes
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 20000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem("artisan-toast-dismissed", "true");
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
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start gap-3">
                {/* Avatar placeholder */}
                <div className="w-12 h-12 bg-gradient-joel rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {data.artisans}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">
                    {data.artisans} artisans disponibles
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} className="text-joel-violet" />
                      {data.city}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} className="text-emerald-500" />
                      ~30 min
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <a
                href="tel:+33172682202"
                className="mt-4 block w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-center py-3 rounded-xl transition-colors"
              >
                Appeler maintenant - Gratuit
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
