"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Edit2, Loader2, CheckCircle, Info } from "lucide-react";
import { supabase, ContentItem } from "@/lib/supabase";

export default function ContenuPage() {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadContent() {
      try {
        const { data, error } = await supabase
          .from("content")
          .select("*")
          .order("page");

        if (error) throw error;
        setContent(data || []);
      } catch (err) {
        console.error("Error loading content:", err);
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, []);

  const handleEdit = (item: ContentItem) => {
    setEditingId(item.id);
    setEditValue(item.content);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue("");
  };

  const handleSave = async (id: string) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("content")
        .update({ 
          content: editValue,
          updated_at: new Date().toISOString()
        })
        .eq("id", id);

      if (error) throw error;

      setContent(content.map(item => 
        item.id === id ? { ...item, content: editValue } : item
      ));
      setEditingId(null);
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
        <h2 className="text-2xl font-bold text-gray-900">Gestion du contenu</h2>
        <p className="text-gray-600">Modifiez les textes affichés sur le site</p>
      </div>

      {saved && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-green-100 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2">
          <CheckCircle size={18} />
          Modifications enregistrées !
        </motion.div>
      )}

      {/* Info box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <Info className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
        <div className="text-sm text-blue-700">
          <p>
            Pour ajouter de nouveaux contenus éditables, contactez le développeur 
            ou ajoutez-les directement dans Supabase (table "content").
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Élément</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Page</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Contenu</th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {content.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                  Aucun contenu trouvé. Vérifiez que les tables Supabase sont bien créées.
                </td>
              </tr>
            ) : (
              content.map((item) => (
                <tr key={item.id} className="border-b last:border-0">
                  <td className="px-6 py-4 font-medium text-gray-900">{item.title}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-joel-violet/10 text-joel-violet text-sm rounded-full">{item.page}</span>
                  </td>
                  <td className="px-6 py-4">
                    {editingId === item.id ? (
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-joel-violet outline-none"
                        autoFocus
                      />
                    ) : (
                      <span className="text-gray-600 truncate block max-w-md">{item.content}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {editingId === item.id ? (
                        <>
                          <button 
                            onClick={() => handleSave(item.id)} 
                            disabled={saving}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                          >
                            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                          </button>
                          <button 
                            onClick={handleCancel}
                            className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg"
                          >
                            ✕
                          </button>
                        </>
                      ) : (
                        <button onClick={() => handleEdit(item)} className="p-2 text-joel-violet hover:bg-joel-violet/10 rounded-lg">
                          <Edit2 size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
        <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
        <div className="text-sm text-green-700">
          <p className="font-medium">Connecté à Supabase ✓</p>
        </div>
      </div>
    </div>
  );
}
