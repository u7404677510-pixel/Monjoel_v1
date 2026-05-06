"use client";

/**
 * LeadsKanban — vue 4 colonnes (new / contacted / converted / lost).
 *
 * Drag-and-drop HTML5 natif (pas de lib externe). On lit `dataTransfer` qui
 * porte l'id du lead, et au drop on déclenche la mutation status update.
 *
 * Click card → ouvre drawer via `onSelect`.
 */

import { useState } from "react";
import { motion } from "motion/react";
import { Clock, MapPin, Phone } from "lucide-react";

import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/toast";
import { Badge } from "@/components/ui/badge";
import {
  useUpdateLeadStatus,
  type AdminLead,
  type LeadStatus,
} from "@/lib/hooks/leads-queries";
import {
  STATUSES_LIST,
  STATUS_CONFIG,
  TRADE_CONFIG,
  initials,
  maskPhone,
  timeAgo,
} from "./shared";

interface Props {
  leads: AdminLead[];
  onSelect: (lead: AdminLead) => void;
}

export function LeadsKanban({ leads, onSelect }: Props) {
  const [dragOver, setDragOver] = useState<LeadStatus | null>(null);
  const updateStatus = useUpdateLeadStatus();

  const handleDrop = async (status: LeadStatus, e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(null);
    const id = e.dataTransfer.getData("text/lead-id");
    if (!id) return;
    const lead = leads.find((l) => l.id === id);
    if (!lead || lead.status === status) return;
    try {
      await updateStatus.mutateAsync({ id, status });
      toast.success(`→ ${STATUS_CONFIG[status].label}`);
    } catch (err) {
      toast.error("Échec : " + (err as Error).message);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {STATUSES_LIST.map((status) => {
        const sc = STATUS_CONFIG[status];
        const col = leads.filter((l) => l.status === status);
        const isOver = dragOver === status;

        return (
          <div
            key={status}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(status);
            }}
            onDragLeave={() => setDragOver(null)}
            onDrop={(e) => handleDrop(status, e)}
            className={cn(
              "rounded-xl border bg-white min-h-[400px] flex flex-col transition-colors",
              isOver
                ? "border-joel-violet/60 bg-joel-violet/5"
                : "border-zinc-200"
            )}
          >
            {/* Column header */}
            <div
              className={cn(
                "flex items-center justify-between px-3 py-2.5 rounded-t-xl border-b",
                sc.kanbanHeader
              )}
            >
              <span className="text-xs font-bold uppercase tracking-wide">
                {sc.label}
              </span>
              <span className="text-xs font-semibold bg-white/70 rounded-full px-2 py-0.5">
                {col.length}
              </span>
            </div>

            {/* Cards */}
            <div className="flex-1 p-2 space-y-2 overflow-y-auto max-h-[68vh]">
              {col.length === 0 && (
                <div className="text-center text-xs text-zinc-400 py-10 px-4">
                  Glissez un lead ici
                </div>
              )}
              {col.map((lead, i) => (
                <KanbanCard
                  key={lead.id}
                  lead={lead}
                  index={i}
                  onClick={() => onSelect(lead)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function KanbanCard({
  lead,
  index,
  onClick,
}: {
  lead: AdminLead;
  index: number;
  onClick: () => void;
}) {
  const trade = TRADE_CONFIG[lead.trade ?? ""] ?? TRADE_CONFIG.default;
  const TradeIcon = trade.icon;

  return (
    <motion.div
      initial={false}
      animate={{ opacity: [0.5, 1], y: [8, 0] }}
      transition={{ duration: 0.25, delay: index * 0.02 }}
      draggable
      onDragStart={(e) => {
        const ev = e as unknown as React.DragEvent;
        ev.dataTransfer.setData("text/lead-id", lead.id);
        ev.dataTransfer.effectAllowed = "move";
      }}
      onClick={onClick}
      className="group cursor-pointer rounded-lg border border-zinc-200 bg-white p-3 hover:border-joel-violet/40 hover:shadow-md hover:shadow-joel-violet/5 transition-all active:cursor-grabbing"
    >
      <div className="flex items-start gap-2.5">
        <div
          className={cn(
            "h-8 w-8 rounded-md flex items-center justify-center shrink-0 text-[11px] font-bold",
            "bg-gradient-joel text-white"
          )}
        >
          {initials(lead.problem_label, "?")}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-zinc-900 truncate">
            {lead.problem_label || "—"}
          </p>
          <p className="text-[11px] text-zinc-500 flex items-center gap-1 mt-0.5">
            <Phone size={10} /> {maskPhone(lead.phone)}
          </p>
        </div>
      </div>
      <div className="mt-2.5 flex items-center justify-between gap-2">
        <Badge
          variant="outline"
          className={cn("text-[10px] gap-1", trade.badgeClass)}
        >
          <TradeIcon size={10} />
          {lead.trade ?? "—"}
        </Badge>
        <span className="inline-flex items-center gap-1 text-[10px] text-zinc-400">
          <MapPin size={9} />
          {lead.postal_code ?? "—"}
        </span>
      </div>
      <div className="mt-2 pt-2 border-t border-zinc-100 flex items-center gap-1 text-[10px] text-zinc-400">
        <Clock size={9} />
        {timeAgo(lead.created_at)}
      </div>
    </motion.div>
  );
}
