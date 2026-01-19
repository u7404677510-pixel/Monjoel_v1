"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Phone, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function TelephonePage() {
  const [phoneNumber, setPhoneNumber] = useState("01 72 68 22 02");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // Load phone number from Supabase
  useEffect(() => {
    async function loadConfig() {
      if (!supabase) {
        setLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from("site_config")
          .select("phone_number")
          .single();

        if (error) throw error;
        if (data?.phone_number) {
          setPhoneNumber(data.phone_number);
        }
      } catch (err) {
        console.error("Error loading config:", err);
      } finally {
        setLoading(false);
      }
    }
    loadConfig();
  }, []);

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
    if (digits.length <= 6) return `${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4)}`;
    if (digits.length <= 8) return `${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4, 6)} ${digits.slice(6)}`;
    return `${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4, 6)} ${digits.slice(6, 8)} ${digits.slice(8, 10)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
    setError("");
  };

  const handleSave = async () => {
    const digits = phoneNumber.replace(/\D/g, "");
    
    if (digits.length !== 10) {
      setError("Le numéro doit contenir 10 chiffres");
      return;
    }

    setSaving(true);
    setError("");

    if (!supabase) {
      setError("Base de données non configurée");
      setSaving(false);
      return;
    }

    try {
      const { error } = await supabase
        .from("site_config")
        .update({ 
          phone_number: phoneNumber,
          updated_at: new Date().toISOString()
        })
        .eq("id", 1);

      if (error) throw error;

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Error saving:", err);
      setError("Erreur lors de l'enregistrement");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-joel-violet animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Numéro de téléphone</h2>
        <p className="text-gray-600">Modifiez le numéro affiché sur tout le site</p>
      </div>

      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-100 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2"
        >
          <CheckCircle size={18} />
          Numéro enregistré dans Supabase ! Les modifications sont instantanées.
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 shadow-sm"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-gradient-joel rounded-2xl flex items-center justify-center">
            <Phone size={28} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Numéro principal</h3>
            <p className="text-gray-500 text-sm">Affiché dans le header, hero, footer et CTAs</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Numéro de téléphone
            </label>
            <div className="relative">
              <input
                type="tel"
                value={phoneNumber}
                onChange={handleChange}
                placeholder="01 72 68 22 02"
                className={`w-full px-4 py-4 text-2xl font-bold border rounded-xl focus:ring-2 focus:ring-joel-violet focus:border-transparent outline-none ${
                  error ? "border-red-300" : "border-gray-300"
                }`}
              />
              <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
            </div>
            {error && (
              <p className="mt-2 text-red-500 text-sm flex items-center gap-1">
                <AlertCircle size={14} />
                {error}
              </p>
            )}
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-500 mb-3">Aperçu sur le site :</p>
            <div className="flex flex-wrap gap-4">
              <a
                href={`tel:${phoneNumber.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-joel text-white font-bold rounded-full"
              >
                <Phone size={20} />
                {phoneNumber}
              </a>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-joel text-white font-semibold rounded-xl hover:shadow-lg transition-shadow disabled:opacity-70"
          >
            {saving ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Enregistrement...
              </>
            ) : (
              <>
                <Save size={20} />
                Enregistrer le numéro
              </>
            )}
          </button>
        </div>
      </motion.div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Où ce numéro apparaît</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { location: "Section Hero", page: "Accueil" },
            { location: "Footer", page: "Toutes les pages" },
            { location: "Boutons CTA", page: "Toutes les pages" },
            { location: "Pages services", page: "Plomberie, Électricité, Serrurerie" },
          ].map((item) => (
            <div key={item.location} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <CheckCircle size={18} className="text-green-500" />
              <div>
                <span className="font-medium text-gray-900">{item.location}</span>
                <span className="text-gray-500 text-sm ml-2">({item.page})</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-start gap-3">
        <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
        <div className="text-sm text-green-700">
          <p className="font-medium mb-1">Connecté à Supabase ✓</p>
          <p>Les modifications sont enregistrées en temps réel dans la base de données.</p>
        </div>
      </div>
    </div>
  );
}
