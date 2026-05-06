"use client";

/**
 * AlertsPanel — colonne droite du dashboard.
 *
 * Affiche :
 *  - Liste verticale d'alertes (criticité ordonnée, couleurs WCAG AA)
 *  - Bloc "Actions rapides" (importer/exporter leads, ouvrir Supabase)
 *
 * Couleurs sémantiques (palette joel + utility) :
 *  - critical : red-50 + red-200
 *  - warning  : amber-50 + amber-200
 *  - info     : joel-yellow-light + joel-yellow
 */

import Link from "next/link";
import { motion } from "motion/react";
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  ChevronRight,
  Download,
  ExternalLink,
  Info,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useDashboardAlerts, type DashboardAlert } from "@/lib/hooks/admin-queries";
import { cn } from "@/lib/utils";

const alertIcon: Record<DashboardAlert["type"], React.ElementType> = {
  critical: AlertTriangle,
  warning: AlertTriangle,
  info: Info,
};

const alertStyle: Record<DashboardAlert["type"], string> = {
  critical:
    "bg-red-50 border-red-200 hover:bg-red-100 [&_svg]:text-red-600",
  warning:
    "bg-amber-50 border-amber-200 hover:bg-joel-yellow/20 [&_svg]:text-joel-violet",
  info:
    "bg-joel-yellow-light border-joel-yellow/50 hover:bg-joel-yellow/30 [&_svg]:text-joel-violet",
};

function AlertItem({ alert, index }: { alert: DashboardAlert; index: number }) {
  const Icon = alertIcon[alert.type];
  const inner = (
    <motion.div
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.15 + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group flex items-start gap-3 p-3 rounded-xl border transition-all",
        alertStyle[alert.type],
        alert.href && "cursor-pointer"
      )}
    >
      <div
        className={cn(
          "w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 border",
          alert.type === "critical" && "border-red-200 animate-pulse",
          alert.type === "warning" && "border-amber-200",
          alert.type === "info" && "border-joel-yellow/40"
        )}
      >
        <Icon size={15} strokeWidth={2.2} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-zinc-900 leading-tight">
          {alert.title}
        </p>
        <p className="text-xs text-zinc-600 mt-0.5">{alert.description}</p>
      </div>
      {alert.href && (
        <ChevronRight
          size={16}
          className="text-zinc-400 group-hover:text-zinc-700 group-hover:translate-x-0.5 transition-all shrink-0 mt-1"
        />
      )}
    </motion.div>
  );

  return alert.href ? <Link href={alert.href}>{inner}</Link> : inner;
}

export function AlertsPanel() {
  const { data, isLoading } = useDashboardAlerts();
  const alerts = data ?? [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
      className="space-y-4"
    >
      {/* Alerts card */}
      <Card>
        <CardHeader className="pb-3 flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-joel-violet/10 text-joel-violet flex items-center justify-center">
              <Bell size={15} strokeWidth={2.2} />
            </div>
            <CardTitle className="text-base">Alertes</CardTitle>
          </div>
          {alerts.length > 0 && (
            <span className="text-xs font-semibold text-joel-violet bg-joel-violet/10 px-2 py-0.5 rounded-full">
              {alerts.length}
            </span>
          )}
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-3 p-3">
                  <Skeleton className="w-8 h-8 rounded-lg" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-3.5 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : alerts.length === 0 ? (
            <div className="flex flex-col items-center text-center py-6 px-2">
              <div className="w-12 h-12 rounded-full bg-joel-violet/5 flex items-center justify-center mb-3">
                <CheckCircle2 size={24} className="text-joel-violet" />
              </div>
              <p className="text-sm font-semibold text-zinc-900">
                Tout est sous contrôle
              </p>
              <p className="text-xs text-zinc-500 mt-1">
                Aucune alerte active. Bon travail !
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {alerts.map((a, i) => (
                <AlertItem key={a.id} alert={a} index={i} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick actions card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-joel-yellow/30 text-joel-violet flex items-center justify-center">
              <Sparkles size={15} strokeWidth={2.2} />
            </div>
            <CardTitle className="text-base">Actions rapides</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-2">
          <Button
            asChild
            variant="secondary"
            size="sm"
            leftIcon={<Download size={14} />}
            className="justify-start"
          >
            <Link href="/admin/leads?export=csv">Exporter les leads</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="sm"
            leftIcon={<ExternalLink size={14} />}
            className="justify-start"
          >
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
            >
              Supabase Dashboard
            </a>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="sm"
            leftIcon={<ExternalLink size={14} />}
            className="justify-start"
          >
            <a
              href="https://vercel.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vercel Deployments
            </a>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
