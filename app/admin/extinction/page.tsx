"use client";

import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Phone,
  MousePointer,
  Target,
  Star,
  Eye,
  DollarSign,
  Users,
  Calendar,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "up" | "down" | "neutral";
  icon: React.ReactNode;
  target?: string;
}

function KPICard({ title, value, change, changeType, icon, target }: KPICardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 bg-joel-violet/10 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        {change && (
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              changeType === "up"
                ? "text-emerald-600"
                : changeType === "down"
                ? "text-red-600"
                : "text-gray-500"
            }`}
          >
            {changeType === "up" ? (
              <TrendingUp size={14} />
            ) : changeType === "down" ? (
              <TrendingDown size={14} />
            ) : null}
            {change}
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-500">{title}</p>
      {target && (
        <p className="text-xs text-joel-violet mt-2">Objectif: {target}</p>
      )}
    </div>
  );
}

interface TaskProps {
  title: string;
  status: "done" | "in_progress" | "pending";
  priority: "high" | "medium" | "low";
}

function Task({ title, status, priority }: TaskProps) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
      <div
        className={`w-5 h-5 rounded-full flex items-center justify-center ${
          status === "done"
            ? "bg-emerald-100 text-emerald-600"
            : status === "in_progress"
            ? "bg-amber-100 text-amber-600"
            : "bg-gray-100 text-gray-400"
        }`}
      >
        {status === "done" ? (
          <CheckCircle size={14} />
        ) : status === "in_progress" ? (
          <Clock size={14} />
        ) : (
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
        )}
      </div>
      <span
        className={`flex-1 ${status === "done" ? "text-gray-400 line-through" : "text-gray-900"}`}
      >
        {title}
      </span>
      <span
        className={`text-xs px-2 py-1 rounded-full ${
          priority === "high"
            ? "bg-red-100 text-red-700"
            : priority === "medium"
            ? "bg-amber-100 text-amber-700"
            : "bg-gray-100 text-gray-600"
        }`}
      >
        {priority === "high" ? "Haute" : priority === "medium" ? "Moyenne" : "Basse"}
      </span>
    </div>
  );
}

export default function ExtinctionDashboard() {
  const [selectedWeek, setSelectedWeek] = useState("current");

  // Données simulées - à remplacer par données réelles
  const kpis = {
    impressions: { value: "12,450", change: "+15%", type: "up" as const },
    clicks: { value: "847", change: "+22%", type: "up" as const },
    ctr: { value: "6.8%", change: "+0.5%", type: "up" as const, target: ">8%" },
    cpc: { value: "18.50€", change: "-2€", type: "up" as const, target: "<20€" },
    conversions: { value: "127", change: "+18%", type: "up" as const },
    cpa: { value: "52€", change: "-5€", type: "up" as const, target: "<50€" },
    reviews: { value: "947", change: "+12", type: "up" as const, target: "1500" },
    position: { value: "2.3", change: "-0.2", type: "up" as const, target: "<2" },
  };

  const tasks = [
    { title: "Déployer variante C en production", status: "done" as const, priority: "high" as const },
    { title: "Ajouter logos assurances", status: "done" as const, priority: "high" as const },
    { title: "Vérifier tracking conversions", status: "done" as const, priority: "high" as const },
    { title: "Créer page /serrurerie/tarifs", status: "done" as const, priority: "high" as const },
    { title: "S'inscrire Local Services Ads", status: "in_progress" as const, priority: "high" as const },
    { title: "Optimiser titles Google Ads", status: "in_progress" as const, priority: "high" as const },
    { title: "Lancer campagne collecte avis", status: "pending" as const, priority: "high" as const },
    { title: "Créer page /serrurier-paris-18", status: "pending" as const, priority: "medium" as const },
    { title: "Article blog anti-arnaque", status: "pending" as const, priority: "medium" as const },
    { title: "Configurer ClickCease", status: "pending" as const, priority: "low" as const },
  ];

  const nemesis = [
    { name: "Depanneo", threat: "CRITIQUE", reviews: "2369+", position: "Variable" },
    { name: "Serrurier 24", threat: "CRITIQUE", reviews: "N/A", position: "#1-2" },
    { name: "MesDépanneurs", threat: "CRITIQUE", reviews: "N/A", position: "#1-3 SEO" },
    { name: "Etienne Services", threat: "HAUTE", reviews: "3092", position: "Local" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-3">
                <Target size={28} className="text-red-500" />
                OPÉRATION EXTINCTION
              </h1>
              <p className="text-gray-400 mt-1">Dashboard de suivi - Semaine 1</p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm"
              >
                <option value="current">Cette semaine</option>
                <option value="last">Semaine dernière</option>
                <option value="month">Ce mois</option>
              </select>
              <div className="flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-lg">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium">A/B Test Actif</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* KPIs Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <KPICard
            title="Impressions"
            value={kpis.impressions.value}
            change={kpis.impressions.change}
            changeType={kpis.impressions.type}
            icon={<Eye size={20} className="text-joel-violet" />}
          />
          <KPICard
            title="Clics"
            value={kpis.clicks.value}
            change={kpis.clicks.change}
            changeType={kpis.clicks.type}
            icon={<MousePointer size={20} className="text-joel-violet" />}
          />
          <KPICard
            title="CTR"
            value={kpis.ctr.value}
            change={kpis.ctr.change}
            changeType={kpis.ctr.type}
            target={kpis.ctr.target}
            icon={<TrendingUp size={20} className="text-joel-violet" />}
          />
          <KPICard
            title="CPC Moyen"
            value={kpis.cpc.value}
            change={kpis.cpc.change}
            changeType={kpis.cpc.type}
            target={kpis.cpc.target}
            icon={<DollarSign size={20} className="text-joel-violet" />}
          />
          <KPICard
            title="Conversions"
            value={kpis.conversions.value}
            change={kpis.conversions.change}
            changeType={kpis.conversions.type}
            icon={<Phone size={20} className="text-joel-violet" />}
          />
          <KPICard
            title="CPA"
            value={kpis.cpa.value}
            change={kpis.cpa.change}
            changeType={kpis.cpa.type}
            target={kpis.cpa.target}
            icon={<Target size={20} className="text-joel-violet" />}
          />
          <KPICard
            title="Avis Google"
            value={kpis.reviews.value}
            change={kpis.reviews.change}
            changeType={kpis.reviews.type}
            target={kpis.reviews.target}
            icon={<Star size={20} className="text-joel-violet" />}
          />
          <KPICard
            title="Position Moyenne"
            value={kpis.position.value}
            change={kpis.position.change}
            changeType={kpis.position.type}
            target={kpis.position.target}
            icon={<TrendingUp size={20} className="text-joel-violet" />}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Tasks */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Actions Semaine 1</h2>
              <span className="text-sm text-gray-500">
                {tasks.filter((t) => t.status === "done").length}/{tasks.length} complétées
              </span>
            </div>
            <div className="space-y-1">
              {tasks.map((task, i) => (
                <Task key={i} {...task} />
              ))}
            </div>
          </div>

          {/* Nemesis Watch */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <AlertTriangle size={20} className="text-red-500" />
              Surveillance Némesis
            </h2>
            <div className="space-y-4">
              {nemesis.map((n, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">{n.name}</p>
                    <p className="text-xs text-gray-500">{n.reviews} avis</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        n.threat === "CRITIQUE"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {n.threat}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{n.position}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <h3 className="font-medium text-gray-900 mb-3">Arme Secrète</h3>
              <div className="bg-emerald-50 rounded-lg p-4">
                <p className="text-sm text-emerald-800">
                  <strong>Angle &quot;Zéro Arnaque&quot;</strong> - Aucun concurrent ne l&apos;utilise.
                  Variante C déployée en A/B test.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Objectifs 90 jours */}
        <div className="mt-8 bg-gradient-joel rounded-xl p-6 text-white">
          <h2 className="text-lg font-bold mb-6">Objectifs 90 Jours</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[
              { label: "Avis Google", current: "947", target: "1500+" },
              { label: "Position Ads", current: "2.3", target: "Top 2" },
              { label: "CTR", current: "6.8%", target: ">8%" },
              { label: "Taux Conv.", current: "~10%", target: ">15%" },
              { label: "CPA", current: "52€", target: "<50€" },
              { label: "Local Services", current: "Non inscrit", target: "Top 3" },
            ].map((obj, i) => (
              <div key={i} className="text-center">
                <p className="text-white/60 text-sm mb-1">{obj.label}</p>
                <p className="text-xl font-bold">{obj.current}</p>
                <p className="text-sm text-joel-yellow">→ {obj.target}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
