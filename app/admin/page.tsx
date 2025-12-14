"use client";

import { motion } from "framer-motion";
import { FileText, Image, Settings, Search, Phone, TrendingUp, Users, Eye } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Pages vues (30j)", value: "12,450", icon: Eye, trend: "+12%" },
  { label: "Visiteurs uniques", value: "3,280", icon: Users, trend: "+8%" },
  { label: "Taux de conversion", value: "4.2%", icon: TrendingUp, trend: "+2.1%" },
  { label: "Demandes de devis", value: "156", icon: FileText, trend: "+24%" },
];

const quickActions = [
  { href: "/admin/telephone", label: "Modifier le téléphone", icon: Phone, color: "bg-joel-violet" },
  { href: "/admin/contenu", label: "Modifier le contenu", icon: FileText, color: "bg-blue-500" },
  { href: "/admin/partenaires", label: "Ajouter un partenaire", icon: Image, color: "bg-green-500" },
  { href: "/admin/seo", label: "Optimiser le SEO", icon: Search, color: "bg-purple-500" },
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
        <p className="opacity-90">Gérez votre contenu, vos partenaires et optimisez votre visibilité.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <stat.icon size={24} className="text-joel-violet" />
              </div>
              <span className="text-green-500 text-sm font-medium">{stat.trend}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-gray-500 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Actions rapides</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Link
                href={action.href}
                className="block bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mb-4`}>
                  <action.icon size={24} className="text-white" />
                </div>
                <span className="font-medium text-gray-900 group-hover:text-joel-violet transition-colors">
                  {action.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

