"use client";

/**
 * RecentLeadsList — liste des 5 derniers leads, hover translate-x.
 *
 * Sécurité PII : téléphones masqués partiellement (06 12 ** ** 34).
 * Avatar = initiales gradient violet→mauve déduites du problem_label / postal_code.
 */

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Droplets,
  Inbox,
  Key,
  Phone,
  Pencil,
  Wrench,
  Zap,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useRecentLeads, type LeadRow } from "@/lib/hooks/admin-queries";
import { cn } from "@/lib/utils";

const tradeIcon: Record<string, React.ElementType> = {
  Plomberie: Droplets,
  Serrurerie: Key,
  Électricité: Zap,
};

const tradeColor: Record<string, { bg: string; text: string }> = {
  Plomberie: { bg: "bg-sky-100", text: "text-sky-700" },
  Serrurerie: { bg: "bg-joel-yellow/20", text: "text-joel-violet" },
  Électricité: { bg: "bg-violet-100", text: "text-violet-700" },
};

const statusVariant: Record<string, "default" | "primary" | "warning" | "success" | "danger"> = {
  new: "primary",
  contacted: "warning",
  converted: "success",
  lost: "danger",
};

const statusLabel: Record<string, string> = {
  new: "Nouveau",
  contacted: "Contacté",
  converted: "Converti",
  lost: "Perdu",
};

function maskPhone(phone: string | null | undefined) {
  if (!phone) return "—";
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 8) return phone;
  // 06 12 34 56 78 → 06 12 ** ** 78
  const prefix = digits.slice(0, 4);
  const suffix = digits.slice(-2);
  return `${prefix.slice(0, 2)} ${prefix.slice(2, 4)} ** ** ${suffix}`;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return "à l'instant";
  if (mins < 60) return `il y a ${mins} min`;
  if (hours < 24) return `il y a ${hours}h`;
  if (days === 1) return "hier";
  return `il y a ${days}j`;
}

function isUrgent(lead: LeadRow) {
  if (lead.status !== "new") return false;
  const age = Date.now() - new Date(lead.created_at).getTime();
  return age > 2 * 60 * 60 * 1000;
}

function LeadItem({ lead, index }: { lead: LeadRow; index: number }) {
  const Icon = tradeIcon[lead.trade ?? ""] ?? Wrench;
  const colors = tradeColor[lead.trade ?? ""] ?? { bg: "bg-zinc-100", text: "text-zinc-600" };
  const status = lead.status ?? "new";
  const variant = statusVariant[status] ?? "default";
  const urgent = isUrgent(lead);

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.1 + index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl",
        "hover:bg-zinc-50 hover:translate-x-0.5 transition-all"
      )}
    >
      {urgent && (
        <span
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-red-500 rounded-r-full"
          aria-label="Lead urgent"
        />
      )}
      <div
        className={cn(
          "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
          colors.bg,
          colors.text
        )}
      >
        <Icon size={16} strokeWidth={2.2} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-zinc-900 truncate">
            {lead.problem_label || "Demande de devis"}
          </p>
          {urgent && (
            <Badge variant="danger" className="text-[9px] px-1.5 py-0 h-4">
              Urgent
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-500 mt-0.5">
          <span>{lead.postal_code || "—"}</span>
          <span aria-hidden>·</span>
          <span className="font-mono text-[11px]">{maskPhone(lead.phone)}</span>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock size={10} />
            {timeAgo(lead.created_at)}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant={variant} className="hidden sm:inline-flex">
          {statusLabel[status] ?? status}
        </Badge>
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href={`tel:${lead.phone ?? ""}`}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md hover:bg-joel-violet/10 text-joel-violet"
              aria-label={`Appeler ${lead.problem_label}`}
            >
              <Phone size={14} />
            </a>
          </TooltipTrigger>
          <TooltipContent>Appeler</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/admin/leads"
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md hover:bg-joel-violet/10 text-joel-violet"
              aria-label="Modifier le lead"
            >
              <Pencil size={14} />
            </Link>
          </TooltipTrigger>
          <TooltipContent>Ouvrir</TooltipContent>
        </Tooltip>
      </div>
    </motion.div>
  );
}

export function RecentLeadsList() {
  const { data, isLoading } = useRecentLeads(5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
      className="lg:col-span-2"
    >
      <Card>
        <CardHeader className="pb-3 flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-base">Derniers leads</CardTitle>
            <p className="text-xs text-zinc-500 mt-0.5">
              {data?.length ?? 0} dernier{(data?.length ?? 0) > 1 ? "s" : ""} reçu
              {(data?.length ?? 0) > 1 ? "s" : ""}
            </p>
          </div>
          <Button asChild variant="ghost" size="sm" rightIcon={<ArrowUpRight size={14} />}>
            <Link href="/admin/leads">Tout voir</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5">
                  <Skeleton className="w-9 h-9 rounded-xl" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-3.5 w-2/3" />
                    <Skeleton className="h-3 w-1/3" />
                  </div>
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
              ))}
            </div>
          ) : !data || data.length === 0 ? (
            <EmptyState
              icon={Inbox}
              title="Aucun lead pour le moment"
              description="Les nouvelles demandes de devis apparaîtront ici en temps réel."
              action={
                <Button asChild variant="secondary" size="sm">
                  <Link href="/admin/leads">Ouvrir la page leads</Link>
                </Button>
              }
              className="py-10"
            />
          ) : (
            <div className="space-y-1">
              {data.map((lead, i) => (
                <LeadItem key={lead.id} lead={lead} index={i} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
