"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, Plus, Trash2, Eye, EyeOff, Loader2, CheckCircle } from "lucide-react";
import { supabase, Partner } from "@/lib/supabase";

export default function PartenairesPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadPartners();
  }, []);

  async function loadPartners() {
    if (!supabase) {
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .from("partners")
        .select("*")
        .order("order_index");

      if (error) throw error;
      setPartners(data || []);
    } catch (err) {
      console.error("Error loading partners:", err);
    } finally {
      setLoading(false);
    }
  }

  const toggleActive = async (id: string, currentState: boolean) => {
    if (!supabase) return;
    try {
      await supabase
        .from("partners")
        .update({ active: !currentState })
        .eq("id", id);

      setPartners(partners.map(p => p.id === id ? { ...p, active: !currentState } : p));
    } catch (err) {
      console.error("Error toggling:", err);
    }
  };

  const deletePartner = async (id: string) => {
    if (!supabase) return;
    try {
      await supabase.from("partners").delete().eq("id", id);
      setPartners(partners.filter(p => p.id !== id));
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  const addPartner = async () => {
    if (!newName || !supabase) return;
    setSaving(true);

    try {
      const { data, error } = await supabase
        .from("partners")
        .insert({
          name: newName,
          website_url: newUrl || null,
          active: true,
          order_index: partners.length
        })
        .select()
        .single();

      if (error) throw error;
      
      setPartners([...partners, data]);
      setNewName("");
      setNewUrl("");
      setShowModal(false);
    } catch (err) {
      console.error("Error adding:", err);
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
          <h2 className="text-2xl font-bold text-gray-900">Partenaires & Marques</h2>
          <p className="text-gray-600">Gérez les logos affichés sur le site</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-gradient-joel text-white rounded-xl">
          <Plus size={18} />
          Ajouter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner) => (
          <motion.div
            key={partner.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white rounded-2xl p-6 shadow-sm border-2 ${partner.active ? "border-transparent" : "border-dashed border-gray-300 opacity-60"}`}
          >
            <div className="flex items-start justify-between mb-4">
              <span className={`px-2 py-1 text-xs rounded-full ${partner.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                {partner.active ? "Actif" : "Inactif"}
              </span>
              <div className="flex gap-1">
                <button onClick={() => toggleActive(partner.id, partner.active)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg">
                  {partner.active ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button onClick={() => deletePartner(partner.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="w-full h-24 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
              {partner.logo_url ? (
                <img src={partner.logo_url} alt={partner.name} className="max-h-16 max-w-full" />
              ) : (
                <Upload size={24} className="text-gray-400" />
              )}
            </div>
            <h3 className="font-semibold text-gray-900">{partner.name}</h3>
            {partner.website_url && (
              <a href={partner.website_url} target="_blank" className="text-sm text-joel-violet hover:underline">
                {partner.website_url}
              </a>
            )}
          </motion.div>
        ))}
        
        <button
          onClick={() => setShowModal(true)}
          className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[200px] hover:border-joel-violet group"
        >
          <Plus size={32} className="text-gray-400 group-hover:text-joel-violet mb-2" />
          <span className="text-gray-500 group-hover:text-joel-violet">Ajouter</span>
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Ajouter un partenaire</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Nom du partenaire"
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-joel-violet outline-none"
              />
              <input
                type="url"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="URL du site (optionnel)"
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-joel-violet outline-none"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 border text-gray-700 rounded-xl">Annuler</button>
              <button onClick={addPartner} disabled={saving} className="flex-1 py-2 bg-gradient-joel text-white rounded-xl flex items-center justify-center gap-2">
                {saving ? <Loader2 size={18} className="animate-spin" /> : "Ajouter"}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-start gap-3">
        <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
        <div className="text-sm text-green-700">
          <p className="font-medium">Connecté à Supabase ✓</p>
        </div>
      </div>
    </div>
  );
}
