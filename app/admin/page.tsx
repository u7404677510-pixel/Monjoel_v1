"use client";

import { motion } from "framer-motion";
import { FileText, Image, Settings, Search, Phone, Users } from "lucide-react";
import Link from "next/link";

const quickActions = [
  { href: "/admin/leads", label: "Demandes de devis", icon: Users, color: "bg-emerald-500", description: "Leads du formulaire", priority: true },
  { href: "/admin/telephone", label: "Modifier le téléphone", icon: Phone, color: "bg-joel-violet", description: "Numéro affiché sur le site" },
  { href: "/admin/contenu", label: "Gérer le contenu", icon: FileText, color: "bg-blue-500", description: "Textes et descriptions" },
  { href: "/admin/partenaires", label: "Partenaires", icon: Image, color: "bg-green-500", description: "Logos et marques" },
  { href: "/admin/seo", label: "SEO", icon: Search, color: "bg-purple-500", description: "Référencement" },
  { href: "/admin/personnalisation", label: "Personnalisation", icon: Settings, color: "bg-orange-500", description: "Couleurs et options" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-joel rounded-2xl p-6 text-white"
      >
        <h2 className="text-2xl font-bold mb-2">Bienvenue sur le backoffice Joël</h2>
        <p className="opacity-90">Gérez votre site en toute simplicité.</p>
      </motion.div>

      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Gestion du site</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={action.href}
                className="block bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mb-4`}>
                  <action.icon size={24} className="text-white" />
                </div>
                <span className="font-semibold text-gray-900 group-hover:text-joel-violet transition-colors block">
                  {action.label}
                </span>
                <span className="text-sm text-gray-500">{action.description}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Liens utiles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a 
            href="https://supabase.com/dashboard" 
            target="_blank"
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <div>
              <span className="font-medium text-gray-900">Supabase</span>
              <p className="text-sm text-gray-500">Base de données</p>
            </div>
          </a>
          <a 
            href="https://vercel.com/dashboard" 
            target="_blank"
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">▲</span>
            </div>
            <div>
              <span className="font-medium text-gray-900">Vercel</span>
              <p className="text-sm text-gray-500">Hébergement</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
