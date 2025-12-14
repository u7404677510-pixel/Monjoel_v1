"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Globe, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { supabase, SEOPage } from "@/lib/supabase";

export default function SEOPage() {
  const [pages, setPages] = useState<SEOPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<SEOPage>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadPages() {
      try {
        const { data, error } = await supabase
          .from("seo_pages")
          .select("*")
          .order("page_name");

        if (error) throw error;
        setPages(data || []);
      } catch (err) {
        console.error("Error loading SEO pages:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPages();
  }, []);

  const handleEdit = (page: SEOPage) => {
    setEditingId(page.id);
    setEditData(page);
  };

  const handleSave = async () => {
    if (!editingId || !editData) return;
    setSaving(true);

    try {
      const { error } = await supabase
        .from("seo_pages")
        .update({
          title: editData.title,
          description: editData.description,
          keywords: editData.keywords,
          updated_at: new Date().toISOString()
        })
        .eq("id", editingId);

      if (error) throw error;

      setPages(pages.map(p => p.id === editingId ? { ...p, ...editData } as SEOPage : p));
      setEditingId(null);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Error saving:", err);
    } finally {
      setSaving(false);
    }
  };

  const getScore = () => {
    let score = 0;
    pages.forEach(p => {
      if (p.title && p.title.length >= 30) score += 10;
      if (p.description && p.description.length >= 100) score += 10;
      if (p.keywords) score += 5;
    });
    return Math.min(100, score);
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
        <h2 className="text-2xl font-bold text-gray-900">SEO</h2>
        <p className="text-gray-600">Optimisez le référencement de vos pages</p>
      </div>

      {saved && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-green-100 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2">
          <CheckCircle size={18} />
          Modifications enregistrées dans Supabase !
        </motion.div>
      )}

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Score SEO global</h3>
            <p className="text-gray-600">Basé sur l'analyse de toutes vos pages</p>
          </div>
          <div className="text-4xl font-bold text-joel-violet">{getScore()}%</div>
        </div>
        <div className="mt-4 h-3 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-joel rounded-full" style={{ width: `${getScore()}%` }} />
        </div>
      </div>

      <div className="space-y-4">
        {pages.map((page) => (
          <div key={page.id} className="bg-white rounded-2xl p-6 shadow-sm">
            {editingId === page.id ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">{page.page_name}</h3>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingId(null)} className="px-4 py-2 border text-gray-700 rounded-xl">
                      Annuler
                    </button>
                    <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-gradient-joel text-white rounded-xl flex items-center gap-2">
                      {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                      Enregistrer
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Titre (50-60 caractères)</label>
                  <input
                    type="text"
                    value={editData.title || ""}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-joel-violet outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">{editData.title?.length || 0} caractères</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description (150-160 caractères)</label>
                  <textarea
                    value={editData.description || ""}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-joel-violet outline-none resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">{editData.description?.length || 0} caractères</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mots-clés</label>
                  <input
                    type="text"
                    value={editData.keywords || ""}
                    onChange={(e) => setEditData({ ...editData, keywords: e.target.value })}
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-joel-violet outline-none"
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Globe size={20} className="text-gray-600" />
                    <div>
                      <h3 className="font-bold text-gray-900">{page.page_name}</h3>
                      <p className="text-sm text-gray-500">/{page.page_slug}</p>
                    </div>
                  </div>
                  <button onClick={() => handleEdit(page)} className="px-4 py-2 text-joel-violet hover:bg-joel-violet/10 rounded-xl">
                    Modifier
                  </button>
                </div>
                <div className="text-sm space-y-1">
                  <p><span className="text-gray-500">Titre :</span> {page.title}</p>
                  <p><span className="text-gray-500">Description :</span> {page.description}</p>
                  <p><span className="text-gray-500">Mots-clés :</span> {page.keywords || "Non définis"}</p>
                </div>
              </div>
            )}
          </div>
        ))}
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
