"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, MessageCircle, Clock, Gift } from "lucide-react";

// Configuration
const PHONE_NUMBER = "01 41 69 10 08";
const PHONE_TEL = "+33141691008";
const WHATSAPP_NUMBER = "33756996726";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Bonjour, j'ai besoin d'un dépannage urgent. Pouvez-vous m'aider ?"
);

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Ne pas afficher sur mobile
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    // Vérifier si déjà affiché cette session
    if (sessionStorage.getItem("exit-intent-shown")) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Détecter si la souris sort par le haut (intention de fermer)
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem("exit-intent-shown", "true");
        
        // Track popup view
        if (window.dataLayer) {
          window.dataLayer.push({
            event: "view_exit_popup",
          });
        }
      }
    };

    // Attendre 5 secondes avant d'activer la détection
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
    // Track close
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "close_exit_popup",
      });
    }
  };

  const handleCallClick = () => {
    // Track call click
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "click_to_call",
        phone_number: PHONE_NUMBER,
        placement: "exit_popup",
      });
    }
    handleClose();
  };

  const handleWhatsAppClick = () => {
    // Track WhatsApp click
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "click_whatsapp",
        placement: "exit_popup",
      });
    }
    handleClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Header gradient */}
              <div className="bg-gradient-joel px-6 py-5 relative">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                  aria-label="Fermer"
                >
                  <X size={24} />
                </button>
                <div className="flex items-center gap-3 text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Gift size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Attendez !</h3>
                    <p className="text-white/90 text-sm">
                      On peut vous aider maintenant
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-6 text-center">
                  Obtenez un <span className="font-semibold text-joel-violet">devis gratuit</span> en 30 secondes.
                  <br />
                  Prix fixe, sans surprise.
                </p>

                {/* Stats */}
                <div className="flex items-center justify-center gap-6 mb-6 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={16} className="text-emerald-500" />
                    <span>~30 min</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-lg">⭐</span>
                    <span>4.9/5</span>
                  </div>
                  <div className="text-gray-400">|</div>
                  <div className="font-semibold text-joel-violet">
                    24h/24
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  {/* Phone */}
                  <a
                    href={`tel:${PHONE_TEL}`}
                    onClick={handleCallClick}
                    className="flex items-center justify-center gap-3 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl transition-colors"
                  >
                    <Phone size={20} />
                    <span>Appeler - GRATUIT</span>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleWhatsAppClick}
                    className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold py-4 rounded-xl transition-colors"
                  >
                    <MessageCircle size={20} fill="white" strokeWidth={0} />
                    <span>WhatsApp</span>
                  </a>
                </div>

                {/* Trust text */}
                <p className="text-center text-xs text-gray-400 mt-4">
                  Sans engagement • Artisans vérifiés • Prix fixe garanti
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
