"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Palette, Layout, Loader2, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function PersonnalisationPage() {
  const [colors, setColors] = useState({ primary: "#7055A7", secondary: "#9E76EC" });
  const [options, setOptions] = useState({ show_testimonials: true, show_quiz: true, show_phone: true });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadConfig() {
      try {
        const { data, error } = await supabase
          .from("site_config")
          .select("*")
          .single();

        if (error) throw error;
        if (data) {
          setColors({
            primary: data.primary_color || "#7055A7",
            secondary: data.secondary_color || "#9E76EC"
          });
          setOptions({
            show_testimonials: data.show_testimonials ?? true,
            show_quiz: data.show_quiz ?? true,
            show_phone: data.show_phone ?? true
          });
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
        .from("site_config")
        .update({
          primary_color: colors.primary,
          secondary_color: colors.secondary,
          show_testimonials: options.show_testimonials,
          show_quiz: options.show_quiz,
          show_phone: options.show_phone,
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
          <h2 className="text-2xl font-bold text-gray-900">Personnalisation</h2>
          <p className="text-gray-600">Personnalisez l'apparence du site</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-joel text-white rounded-xl hover:shadow-lg"
        >
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          Enregistrer
        </button>
      </div>

      {saved && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-green-100 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2">
          <CheckCircle size={18} />
          Modifications enregistrées dans Supabase !
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-joel-violet/10 rounded-xl flex items-center justify-center">
              <Palette size={20} className="text-joel-violet" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Couleurs</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Couleur principale</label>
              <div className="flex items-center gap-3">
                <input 
                  type="color" 
                  value={colors.primary} 
                  onChange={(e) => setColors({ ...colors, primary: e.target.value })} 
                  className="w-12 h-12 rounded-lg cursor-pointer" 
                />
                <input 
                  type="text" 
                  value={colors.primary} 
                  onChange={(e) => setColors({ ...colors, primary: e.target.value })} 
                  className="flex-1 px-4 py-2 border rounded-xl uppercase" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Couleur secondaire</label>
              <div className="flex items-center gap-3">
                <input 
                  type="color" 
                  value={colors.secondary} 
                  onChange={(e) => setColors({ ...colors, secondary: e.target.value })} 
                  className="w-12 h-12 rounded-lg cursor-pointer" 
                />
                <input 
                  type="text" 
                  value={colors.secondary} 
                  onChange={(e) => setColors({ ...colors, secondary: e.target.value })} 
                  className="flex-1 px-4 py-2 border rounded-xl uppercase" 
                />
              </div>
            </div>
            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500 mb-3">Aperçu du dégradé :</p>
              <div 
                className="h-16 rounded-xl" 
                style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)` }} 
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-joel-violet/10 rounded-xl flex items-center justify-center">
              <Layout size={20} className="text-joel-violet" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Options d'affichage</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-700">Afficher le téléphone</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={options.show_phone}
                  onChange={(e) => setOptions({ ...options, show_phone: e.target.checked })}
                />
                <div className="w-11 h-6 bg-gray-300 peer-checked:bg-joel-violet rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-700">Afficher les témoignages</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={options.show_testimonials}
                  onChange={(e) => setOptions({ ...options, show_testimonials: e.target.checked })}
                />
                <div className="w-11 h-6 bg-gray-300 peer-checked:bg-joel-violet rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-700">Afficher le quiz</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={options.show_quiz}
                  onChange={(e) => setOptions({ ...options, show_quiz: e.target.checked })}
                />
                <div className="w-11 h-6 bg-gray-300 peer-checked:bg-joel-violet rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
          </div>
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
