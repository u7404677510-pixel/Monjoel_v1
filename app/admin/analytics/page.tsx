"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, BarChart3, TrendingUp, ExternalLink, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AnalyticsPage() {
  const [gaId, setGaId] = useState("");
  const [gadsId, setGadsId] = useState("");
  const [gadsConversionId, setGadsConversionId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadConfig() {
      try {
        const { data, error } = await supabase
          .from("analytics_config")
          .select("*")
          .single();

        if (error) throw error;
        if (data) {
          setGaId(data.google_analytics_id || "");
          setGadsId(data.google_ads_id || "");
          setGadsConversionId(data.google_ads_conversion_id || "");
        }
      } catch (err) {
        console.error("Error loading config:", err);
      } finally {
        setLoading(false);
      }
    }
    loadConfig();
  }, []);

  const handleSave = async (type: "ga" | "gads") => {
    setSaving(true);
    try {
      const updateData = type === "ga" 
        ? { google_analytics_id: gaId }
        : { google_ads_id: gadsId, google_ads_conversion_id: gadsConversionId };

      const { error } = await supabase
        .from("analytics_config")
        .update({
          ...updateData,
          updated_at: new Date().toISOString()
        })
        .eq("id", 1);

      if (error) throw error;
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Error saving:", err);
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
        <h2 className="text-2xl font-bold text-gray-900">Analytics & Google Ads</h2>
        <p className="text-gray-600">Connectez vos outils de suivi</p>
      </div>

      {saved && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-green-100 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2">
          <CheckCircle size={18} />
          Configuration enregistrée dans Supabase !
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <BarChart3 size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Google Analytics</h3>
                <p className="text-sm text-gray-500">Suivi des visiteurs</p>
              </div>
            </div>
            <span className={`flex items-center gap-1 px-3 py-1 text-sm rounded-full ${gaId ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
              {gaId ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
              {gaId ? "Configuré" : "Non configuré"}
            </span>
          </div>
          <input
            type="text"
            value={gaId}
            onChange={(e) => setGaId(e.target.value)}
            placeholder="G-XXXXXXXXXX"
            className="w-full px-4 py-3 border rounded-xl mb-4 focus:ring-2 focus:ring-joel-violet outline-none"
          />
          <button 
            onClick={() => handleSave("ga")} 
            disabled={saving}
            className="w-full py-3 bg-gradient-joel text-white rounded-xl flex items-center justify-center gap-2"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            Enregistrer
          </button>
          <a href="https://analytics.google.com/" target="_blank" className="flex items-center justify-center gap-2 mt-4 text-sm text-joel-violet">
            Ouvrir Google Analytics <ExternalLink size={14} />
          </a>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <TrendingUp size={24} className="text-yellow-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Google Ads</h3>
                <p className="text-sm text-gray-500">Suivi des conversions</p>
              </div>
            </div>
            <span className={`flex items-center gap-1 px-3 py-1 text-sm rounded-full ${gadsId ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
              {gadsId ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
              {gadsId ? "Configuré" : "Non configuré"}
            </span>
          </div>
          <input
            type="text"
            value={gadsId}
            onChange={(e) => setGadsId(e.target.value)}
            placeholder="AW-XXXXXXXXXX"
            className="w-full px-4 py-3 border rounded-xl mb-4 focus:ring-2 focus:ring-joel-violet outline-none"
          />
          <input
            type="text"
            value={gadsConversionId}
            onChange={(e) => setGadsConversionId(e.target.value)}
            placeholder="ID de conversion (optionnel)"
            className="w-full px-4 py-3 border rounded-xl mb-4 focus:ring-2 focus:ring-joel-violet outline-none"
          />
          <button 
            onClick={() => handleSave("gads")} 
            disabled={saving}
            className="w-full py-3 bg-gradient-joel text-white rounded-xl flex items-center justify-center gap-2"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            Enregistrer
          </button>
          <a href="https://ads.google.com/" target="_blank" className="flex items-center justify-center gap-2 mt-4 text-sm text-joel-violet">
            Ouvrir Google Ads <ExternalLink size={14} />
          </a>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-start gap-3">
        <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
        <div className="text-sm text-green-700">
          <p className="font-medium">Connecté à Supabase ✓</p>
        </div>
      </div>
    </div>
  );
}
