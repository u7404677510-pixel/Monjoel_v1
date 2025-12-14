"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, BarChart3, TrendingUp, ExternalLink, CheckCircle, AlertCircle, Loader2, Code } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AnalyticsPage() {
  const [gaId, setGaId] = useState("");
  const [gtagId, setGtagId] = useState("");
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
          setGtagId(data.gtag_id || "");
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

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("analytics_config")
        .update({
          google_analytics_id: gaId,
          gtag_id: gtagId,
          google_ads_conversion_id: gadsConversionId,
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics & Google Ads</h2>
          <p className="text-gray-600">Connectez vos outils de suivi et conversion</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-joel text-white rounded-xl hover:shadow-lg"
        >
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          Tout enregistrer
        </button>
      </div>

      {saved && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-green-100 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2">
          <CheckCircle size={18} />
          Configuration enregistrée ! Les changements seront actifs après redéploiement.
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Google Tag (gtag.js) */}
        <div className="bg-white rounded-2xl p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                <Code size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Google Tag (gtag.js)</h3>
                <p className="text-sm text-gray-500">ID de suivi principal Google Ads / Analytics</p>
              </div>
            </div>
            <span className={`flex items-center gap-1 px-3 py-1 text-sm rounded-full ${gtagId ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
              {gtagId ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
              {gtagId ? "Configuré" : "Non configuré"}
            </span>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ID Google Tag (AW-XXXXXXXXXX)</label>
              <input
                type="text"
                value={gtagId}
                onChange={(e) => setGtagId(e.target.value)}
                placeholder="AW-17805011663"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-joel-violet outline-none font-mono"
              />
              <p className="text-xs text-gray-500 mt-2">
                Cet ID se trouve dans votre snippet Google Tag. Ex: AW-17805011663
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Aperçu du code généré :</p>
              <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
{`<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${gtagId || 'AW-XXXXXXXXXX'}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${gtagId || 'AW-XXXXXXXXXX'}');
</script>`}
              </pre>
            </div>
          </div>
        </div>

        {/* Google Analytics */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <BarChart3 size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Google Analytics 4</h3>
                <p className="text-sm text-gray-500">Suivi détaillé des visiteurs</p>
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
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-joel-violet outline-none font-mono"
          />
          <p className="text-xs text-gray-500 mt-2">Optionnel si vous utilisez uniquement le Google Tag</p>
          <a href="https://analytics.google.com/" target="_blank" className="flex items-center gap-2 mt-4 text-sm text-joel-violet hover:underline">
            Ouvrir Google Analytics <ExternalLink size={14} />
          </a>
        </div>

        {/* Google Ads Conversion */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-joel-yellow/30 rounded-xl flex items-center justify-center">
                <TrendingUp size={24} className="text-joel-violet" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Conversion Google Ads</h3>
                <p className="text-sm text-gray-500">Suivi des conversions</p>
              </div>
            </div>
            <span className={`flex items-center gap-1 px-3 py-1 text-sm rounded-full ${gadsConversionId ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
              {gadsConversionId ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
              {gadsConversionId ? "Configuré" : "Non configuré"}
            </span>
          </div>
          <input
            type="text"
            value={gadsConversionId}
            onChange={(e) => setGadsConversionId(e.target.value)}
            placeholder="AW-XXXXXXXXXX/XXXXXX"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-joel-violet outline-none font-mono"
          />
          <p className="text-xs text-gray-500 mt-2">ID de conversion pour le suivi des appels/devis</p>
          <a href="https://ads.google.com/" target="_blank" className="flex items-center gap-2 mt-4 text-sm text-joel-violet hover:underline">
            Ouvrir Google Ads <ExternalLink size={14} />
          </a>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-start gap-3">
        <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
        <div className="text-sm text-green-700">
          <p className="font-medium">Connecté à Supabase ✓</p>
          <p className="text-green-600 mt-1">Les scripts seront injectés automatiquement sur le site après configuration.</p>
        </div>
      </div>
    </div>
  );
}
