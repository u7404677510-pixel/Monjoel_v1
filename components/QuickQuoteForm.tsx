"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Phone, MapPin, Wrench, Loader2, X } from "lucide-react";
import { useSiteConfig, formatPhoneForTel } from "@/lib/hooks/useSiteConfig";

interface QuickQuoteFormProps {
  variant?: "inline" | "modal";
  onClose?: () => void;
  defaultService?: string;
}

const problems = [
  { value: "", label: "Sélectionnez votre problème" },
  { value: "fuite-eau", label: "🔧 Fuite d'eau", category: "plomberie" },
  { value: "wc-bouche", label: "🔧 WC bouché", category: "plomberie" },
  { value: "chauffe-eau", label: "🔧 Chauffe-eau en panne", category: "plomberie" },
  { value: "canalisation", label: "🔧 Canalisation bouchée", category: "plomberie" },
  { value: "porte-claquee", label: "🔑 Porte claquée", category: "serrurerie" },
  { value: "serrure-bloquee", label: "🔑 Serrure bloquée", category: "serrurerie" },
  { value: "cle-cassee", label: "🔑 Clé cassée dans serrure", category: "serrurerie" },
  { value: "effraction", label: "🔑 Après effraction", category: "serrurerie" },
  { value: "panne-courant", label: "⚡ Panne de courant", category: "electricite" },
  { value: "court-circuit", label: "⚡ Court-circuit", category: "electricite" },
  { value: "disjoncteur", label: "⚡ Disjoncteur qui saute", category: "electricite" },
  { value: "prise-hs", label: "⚡ Prise/interrupteur HS", category: "electricite" },
  { value: "autre", label: "Autre problème", category: "autre" },
];

export default function QuickQuoteForm({ variant = "inline", onClose, defaultService = "" }: QuickQuoteFormProps) {
  const { config } = useSiteConfig();
  const [formData, setFormData] = useState({
    problem: defaultService,
    postalCode: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isMounted, setIsMounted] = useState(false);

  // Track when component is mounted (for portal)
  useEffect(() => {
    setIsMounted(true);
    // Lock body scroll when modal is open
    if (variant === "modal") {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [variant]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.problem) {
      newErrors.problem = "Veuillez sélectionner votre problème";
    }

    if (!formData.postalCode) {
      newErrors.postalCode = "Code postal requis";
    } else if (!/^(75|77|78|91|92|93|94|95)\d{3}$/.test(formData.postalCode)) {
      newErrors.postalCode = "Code postal Île-de-France requis";
    }

    if (!formData.phone) {
      newErrors.phone = "Téléphone requis";
    } else if (!/^0[1-9]\d{8}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Numéro de téléphone invalide";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Track form submission
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "quote_form_submit",
        form_problem: formData.problem,
        form_postal_code: formData.postalCode,
      });
    }

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        // Track conversion
        if (typeof window !== "undefined" && window.dataLayer) {
          window.dataLayer.push({
            event: "quote_form_success",
            form_problem: formData.problem,
          });
        }
      } else {
        throw new Error("Erreur lors de l'envoi");
      }
    } catch (error) {
      // En cas d'erreur, proposer d'appeler directement
      console.error("Quote form error:", error);
      setErrors({ submit: "Une erreur est survenue. Appelez-nous directement." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCallClick = () => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "click_to_call",
        phone_number: config.phone_number,
        placement: "quote_form_fallback",
      });
    }
  };

  // Success state content
  const successContent = (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl p-6 sm:p-8"
    >
      <div className="text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-emerald-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Demande envoyée !</h3>
        <p className="text-gray-600 mb-6">
          Nous vous rappelons dans les 2 minutes pour vous communiquer votre devis gratuit.
        </p>
        <a
          href={`tel:${formatPhoneForTel(config.phone_number)}`}
          onClick={handleCallClick}
          className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          <Phone size={18} />
          <span>Ou appelez maintenant</span>
        </a>
      </div>
      {variant === "modal" && onClose && (
        <button
          onClick={onClose}
          className="mt-4 w-full text-gray-500 hover:text-gray-700 text-sm"
        >
          Fermer
        </button>
      )}
    </motion.div>
  );

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Devis gratuit en 30 secondes
        </h3>
        <p className="text-gray-600 text-sm">
          Décrivez votre problème, nous vous rappelons immédiatement.
        </p>
      </div>

      {/* Problem select */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <Wrench size={14} className="inline mr-1" />
          Votre problème
        </label>
        <select
          value={formData.problem}
          onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.problem ? "border-red-300 bg-red-50" : "border-gray-200"
          } focus:border-joel-violet focus:ring-2 focus:ring-joel-violet/20 outline-none transition-colors`}
        >
          {problems.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
        {errors.problem && (
          <p className="text-red-500 text-xs mt-1">{errors.problem}</p>
        )}
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-2 gap-3">
        {/* Postal code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <MapPin size={14} className="inline mr-1" />
            Code postal
          </label>
          <input
            type="text"
            placeholder="75015"
            maxLength={5}
            value={formData.postalCode}
            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value.replace(/\D/g, "") })}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.postalCode ? "border-red-300 bg-red-50" : "border-gray-200"
            } focus:border-joel-violet focus:ring-2 focus:ring-joel-violet/20 outline-none transition-colors`}
          />
          {errors.postalCode && (
            <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Phone size={14} className="inline mr-1" />
            Téléphone
          </label>
          <input
            type="tel"
            placeholder="06 12 34 56 78"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.phone ? "border-red-300 bg-red-50" : "border-gray-200"
            } focus:border-joel-violet focus:ring-2 focus:ring-joel-violet/20 outline-none transition-colors`}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Submit error */}
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <p className="text-red-600 text-sm mb-2">{errors.submit}</p>
          <a
            href={`tel:${formatPhoneForTel(config.phone_number)}`}
            onClick={handleCallClick}
            className="inline-flex items-center gap-2 text-red-600 font-semibold hover:underline"
          >
            <Phone size={16} />
            <span>{config.phone_number}</span>
          </a>
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-joel hover:opacity-90 text-white font-bold py-4 rounded-xl shadow-lg shadow-joel-violet/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            <span>Envoi en cours...</span>
          </>
        ) : (
          <>
            <Send size={20} />
            <span>RECEVOIR MON DEVIS GRATUIT</span>
          </>
        )}
      </button>

      {/* Trust badges */}
      <div className="flex items-center justify-center gap-4 text-xs text-gray-500 pt-2">
        <span className="flex items-center gap-1">
          <CheckCircle size={12} className="text-emerald-500" />
          Sans engagement
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle size={12} className="text-emerald-500" />
          Réponse en 2 min
        </span>
      </div>
    </form>
  );

  // Modal variant - Rendered via Portal
  if (variant === "modal") {
    const modalContent = (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-start lg:items-center justify-center p-4 pt-20 lg:pt-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative my-4"
            onClick={(e) => e.stopPropagation()}
          >
            {onClose && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
                aria-label="Fermer"
              >
                <X size={24} />
              </button>
            )}
            {isSuccess ? successContent : formContent}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );

    // Render via portal to document.body
    if (isMounted) {
      return createPortal(modalContent, document.body);
    }
    return null;
  }

  // Inline variant
  if (isSuccess) {
    return successContent;
  }

  return (
    <div id="quote-form" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100">
      {formContent}
    </div>
  );
}
