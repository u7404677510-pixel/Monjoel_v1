/**
 * shared — configs et helpers partagés entre la page leads et ses sous-composants
 * (DataTable cols, Kanban, Drawer, NewLeadDialog).
 */

import { Droplets, Key, Wrench, Zap, type LucideIcon } from "lucide-react";
import type { BadgeProps } from "@/components/ui/badge";
import type { LeadStatus } from "@/lib/hooks/leads-queries";

// ─── Trade config ───────────────────────────────────────────────────────────

interface TradeMeta {
  label: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  badgeClass: string; // pour les badges colorés métier
}

export const TRADE_CONFIG: Record<string, TradeMeta> = {
  Plomberie: {
    label: "Plomberie",
    icon: Droplets,
    iconBg: "bg-joel-violet/10",
    iconColor: "text-joel-violet",
    badgeClass:
      "bg-joel-violet/10 text-joel-violet border-joel-violet/20",
  },
  Serrurerie: {
    label: "Serrurerie",
    icon: Key,
    iconBg: "bg-joel-mauve/10",
    iconColor: "text-joel-mauve",
    badgeClass:
      "bg-joel-mauve/10 text-joel-mauve border-joel-mauve/20",
  },
  Électricité: {
    label: "Électricité",
    icon: Zap,
    iconBg: "bg-joel-yellow/30",
    iconColor: "text-joel-violet",
    badgeClass:
      "bg-joel-yellow/30 text-joel-violet border-joel-yellow/50",
  },
  default: {
    label: "Autre",
    icon: Wrench,
    iconBg: "bg-zinc-100",
    iconColor: "text-zinc-500",
    badgeClass: "bg-zinc-100 text-zinc-700 border-zinc-200",
  },
};

export const TRADES_LIST = ["Plomberie", "Serrurerie", "Électricité"] as const;

// ─── Status config ──────────────────────────────────────────────────────────

interface StatusMeta {
  label: string;
  badge: BadgeProps["variant"];
  kanbanHeader: string; // bg + text classes pour l'entête colonne kanban
}

export const STATUS_CONFIG: Record<LeadStatus, StatusMeta> = {
  new: {
    label: "À contacter",
    badge: "primary",
    kanbanHeader: "bg-joel-violet/10 text-joel-violet border-joel-violet/20",
  },
  contacted: {
    label: "Contacté",
    badge: "accent",
    kanbanHeader: "bg-joel-yellow/30 text-joel-violet border-joel-yellow/50",
  },
  converted: {
    label: "Converti",
    badge: "success",
    kanbanHeader: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  lost: {
    label: "Perdu",
    badge: "danger",
    kanbanHeader: "bg-red-50 text-red-700 border-red-200",
  },
};

export const STATUSES_LIST: LeadStatus[] = [
  "new",
  "contacted",
  "converted",
  "lost",
];

// ─── Period filter ──────────────────────────────────────────────────────────

export const PERIOD_LABELS: Record<string, string> = {
  all: "Toute la période",
  today: "Aujourd'hui",
  "7d": "7 derniers jours",
  "30d": "30 derniers jours",
  "90d": "90 derniers jours",
};

// ─── Helpers ────────────────────────────────────────────────────────────────

export function maskPhone(phone: string | null | undefined) {
  if (!phone) return "—";
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 8) return phone;
  const prefix = digits.slice(0, 4);
  const suffix = digits.slice(-2);
  return `${prefix.slice(0, 2)} ${prefix.slice(2, 4)} ** ** ${suffix}`;
}

export function timeAgo(dateStr: string | null | undefined) {
  if (!dateStr) return "—";
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (m < 1) return "à l'instant";
  if (m < 60) return `il y a ${m} min`;
  if (h < 24) return `il y a ${h}h`;
  if (d === 1) return "hier";
  return `il y a ${d}j`;
}

export function formatDateTime(dateStr: string | null | undefined) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function initials(label: string | null | undefined, fallback = "?") {
  if (!label) return fallback;
  const parts = label.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return fallback;
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

// ─── CSV export ─────────────────────────────────────────────────────────────

export interface ExportableLead {
  id: string;
  problem_label: string | null;
  trade: string | null;
  postal_code: string | null;
  phone: string | null;
  source: string | null;
  status: string;
  notes: string | null;
  created_at: string;
}

export function leadsToCSV(rows: ExportableLead[]): string {
  const header = [
    "ID",
    "Problème",
    "Métier",
    "CP",
    "Téléphone",
    "Source",
    "Statut",
    "Date",
    "Notes",
  ];
  const escape = (v: string | null | undefined) => {
    const s = v ?? "";
    return `"${s.replace(/"/g, '""')}"`;
  };
  const lines = [
    header.join(","),
    ...rows.map((r) =>
      [
        escape(r.id),
        escape(r.problem_label),
        escape(r.trade),
        escape(r.postal_code),
        escape(r.phone),
        escape(r.source),
        escape(r.status),
        escape(new Date(r.created_at).toLocaleString("fr-FR")),
        escape(r.notes),
      ].join(",")
    ),
  ];
  return lines.join("\n");
}

export function downloadCSV(filename: string, csv: string) {
  // BOM pour Excel-friendly UTF-8
  const blob = new Blob(["﻿" + csv], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
