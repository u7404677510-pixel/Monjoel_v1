"use client";

/**
 * LeadDrawer — drawer latéral édition d'un lead, slide-in depuis la droite.
 *
 * Implémenté au-dessus de Radix Dialog (réutilise overlay backdrop + portal),
 * avec contenu repositionné en `right-0 inset-y-0 w-[480px]`. Animations
 * `slide-in-from-right` via tailwindcss-animate.
 *
 * Optimistic update : champ Notes patch via useUpdateLead. Toast feedback.
 */

import { useEffect, useState } from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import {
  ArrowRight,
  Calendar,
  Check,
  Clock,
  Copy,
  Edit3,
  Hash,
  History,
  Mail,
  MapPin,
  Phone,
  PlusCircle,
  Trash2,
  User,
  UserCheck,
  Send,
  Wrench,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import {
  useDeleteLead,
  useUpdateLead,
  type AdminLead,
  type LeadStatus,
} from "@/lib/hooks/leads-queries";
import {
  useLeadAuditLogs,
  type AuditLogEntry,
} from "@/lib/hooks/admin-queries";
import { useArtisans } from "@/lib/hooks/use-artisans";
import type { Artisan } from "@/lib/schemas/artisan";
import { useCreateIntervention } from "@/lib/hooks/interventions-queries";
import { STATUS_CONFIG, TRADE_CONFIG, formatDateTime, timeAgo } from "./shared";

interface Props {
  lead: AdminLead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LeadDrawer({ lead, open, onOpenChange }: Props) {
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<LeadStatus>("new");
  const [selectedArtisanId, setSelectedArtisanId] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const updateLead = useUpdateLead();
  const deleteLead = useDeleteLead();
  const createIntervention = useCreateIntervention();
  const { data: artisans } = useArtisans();

  // Sync local form state when lead changes
  useEffect(() => {
    if (lead) {
      setNotes(lead.notes ?? "");
      setStatus((lead.status as LeadStatus) ?? "new");
      setSelectedArtisanId("");
      setScheduledAt("");
    }
  }, [lead]);

  if (!lead) return null;

  const trade = TRADE_CONFIG[lead.trade ?? ""] ?? TRADE_CONFIG.default;
  const TradeIcon = trade.icon;

  const handleSave = async () => {
    try {
      await updateLead.mutateAsync({
        id: lead.id,
        patch: { notes, status },
      });
      toast.success("Lead mis à jour");
    } catch (e) {
      toast.error("Échec : " + (e as Error).message);
    }
  };

  const handleStatusChange = async (next: LeadStatus) => {
    setStatus(next);
    try {
      await updateLead.mutateAsync({ id: lead.id, patch: { status: next } });
      toast.success(`Statut → ${STATUS_CONFIG[next].label}`);
    } catch (e) {
      toast.error("Échec : " + (e as Error).message);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Supprimer ce lead définitivement ?")) return;
    try {
      await deleteLead.mutateAsync(lead.id);
      toast.success("Lead supprimé");
      onOpenChange(false);
    } catch (e) {
      toast.error("Échec : " + (e as Error).message);
    }
  };

  const handleCopyPhone = () => {
    if (!lead.phone) return;
    navigator.clipboard.writeText(lead.phone);
    toast.success("Téléphone copié");
  };

  const handleConvert = () => handleStatusChange("converted");

  // ── Dispatch : artisans éligibles (actifs, métier + département du lead) ──
  const dept = (lead.postal_code ?? "").slice(0, 2);
  const activeArtisans = (artisans ?? []).filter((a) => a.status !== "inactive");
  const matching = activeArtisans.filter(
    (a) =>
      (!lead.trade || a.trades.includes(lead.trade)) &&
      (!dept || a.zones.includes(dept))
  );
  // Si aucun ne matche exactement, on propose tous les actifs (dispatch non bloqué).
  const eligibleArtisans: Artisan[] =
    matching.length > 0 ? matching : activeArtisans;
  const usingFallback = matching.length === 0 && activeArtisans.length > 0;

  const handleDispatch = async () => {
    if (!selectedArtisanId) {
      toast.error("Choisis un artisan à assigner");
      return;
    }
    const artisan = eligibleArtisans.find((a) => a.id === selectedArtisanId);
    const artisanLabel = artisan
      ? `${artisan.first_name} ${artisan.last_name}`
      : undefined;
    try {
      await createIntervention.mutateAsync({
        lead_id: lead.id,
        artisan_id: selectedArtisanId,
        artisan_label: artisanLabel,
        scheduled_at: scheduledAt ? new Date(scheduledAt).toISOString() : null,
        status: scheduledAt ? "scheduled" : "pending",
      });
      // Reflète le dispatch côté UI : le lead devient "converti".
      setStatus("converted");
      toast.success(
        artisanLabel
          ? `Intervention dispatchée à ${artisanLabel}`
          : "Intervention dispatchée"
      );
      setSelectedArtisanId("");
      setScheduledAt("");
    } catch (e) {
      toast.error("Échec du dispatch : " + (e as Error).message);
    }
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-black/40 backdrop-blur-xs",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            "fixed right-0 inset-y-0 z-50 w-full sm:w-[480px] bg-white border-l border-zinc-200 shadow-2xl shadow-joel-violet/20",
            "flex flex-col",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right",
            "duration-300"
          )}
          aria-describedby={undefined}
        >
          <DialogPrimitive.Title className="sr-only">
            Détails du lead
          </DialogPrimitive.Title>

          {/* Header */}
          <div className="flex items-start justify-between gap-3 px-6 py-5 border-b border-zinc-100">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={STATUS_CONFIG[status]?.badge ?? "default"}>
                  {STATUS_CONFIG[status]?.label ?? status}
                </Badge>
                <span className="text-xs text-zinc-400">
                  {timeAgo(lead.created_at)}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div
                  className={cn(
                    "h-9 w-9 rounded-lg flex items-center justify-center",
                    trade.iconBg
                  )}
                >
                  <TradeIcon size={17} className={trade.iconColor} />
                </div>
                <div className="min-w-0">
                  <h2 className="text-base font-semibold text-zinc-900 truncate">
                    {lead.problem_label || "Lead"}
                  </h2>
                  <p className="text-xs text-zinc-500 truncate">
                    {lead.trade ?? "—"} · {lead.source ?? "site"}
                  </p>
                </div>
              </div>
            </div>
            <DialogPrimitive.Close
              className="text-zinc-400 hover:text-joel-violet hover:bg-joel-violet/10 rounded-md p-1.5 transition-colors"
              aria-label="Fermer"
            >
              <X className="h-4 w-4" />
            </DialogPrimitive.Close>
          </div>

          {/* Body scrollable */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
            {/* Quick actions */}
            <div className="flex flex-wrap gap-2">
              <Button
                asChild
                variant="primary"
                size="sm"
                leftIcon={<Phone size={13} />}
              >
                <a href={`tel:${lead.phone}`}>{lead.phone}</a>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleCopyPhone}
                leftIcon={<Copy size={13} />}
              >
                Copier
              </Button>
              <Button
                asChild
                variant="ghost"
                size="sm"
                leftIcon={<Mail size={13} />}
              >
                <a
                  href={`mailto:?subject=Devis%20Joël%20-%20${encodeURIComponent(
                    lead.problem_label ?? ""
                  )}`}
                >
                  Email
                </a>
              </Button>
            </div>

            {/* Détails */}
            <section className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Informations
              </h3>
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <Field icon={Wrench} label="Métier" value={lead.trade ?? "—"} />
                <Field
                  icon={MapPin}
                  label="Code postal"
                  value={lead.postal_code ?? "—"}
                />
                <Field
                  icon={Hash}
                  label="Source"
                  value={lead.source ?? "site"}
                />
                <Field
                  icon={Calendar}
                  label="Créé"
                  value={formatDateTime(lead.created_at)}
                />
              </dl>
              {lead.problem && lead.problem !== lead.problem_label && (
                <div className="rounded-lg bg-zinc-50 border border-zinc-200 p-3 text-xs text-zinc-600">
                  <span className="font-semibold text-zinc-700">
                    Problème détaillé :
                  </span>{" "}
                  {lead.problem}
                </div>
              )}
            </section>

            {/* Statut */}
            <section className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Statut
              </h3>
              <Select
                value={status}
                onValueChange={(v) => handleStatusChange(v as LeadStatus)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(["new", "contacted", "converted", "lost"] as const).map(
                    (s) => (
                      <SelectItem key={s} value={s}>
                        {STATUS_CONFIG[s].label}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </section>

            {/* Assigner un artisan (dispatch R6) */}
            <section className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Assigner un artisan
              </h3>
              {eligibleArtisans.length === 0 ? (
                <p className="text-xs text-zinc-500">
                  Aucun artisan actif
                  {lead.trade ? ` en ${lead.trade}` : ""}
                  {dept ? ` · dépt ${dept}` : ""}. Ajoute-en dans{" "}
                  <span className="font-medium">Admin → Artisans</span>.
                </p>
              ) : (
                <div className="space-y-2">
                  <Select
                    value={selectedArtisanId}
                    onValueChange={setSelectedArtisanId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un artisan…" />
                    </SelectTrigger>
                    <SelectContent>
                      {eligibleArtisans.map((a) => (
                        <SelectItem key={a.id} value={a.id}>
                          {a.first_name} {a.last_name} · ⭐ {a.rating} ·{" "}
                          {a.zones.join("/") || "—"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {usingFallback && (
                    <p className="text-[11px] text-amber-600">
                      Aucun artisan ne couvre exactement{" "}
                      {lead.trade ?? "ce métier"}/dépt {dept || "?"} — liste de
                      tous les actifs.
                    </p>
                  )}
                  <div className="space-y-1">
                    <label
                      htmlFor="dispatch-scheduled"
                      className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-zinc-400"
                    >
                      <Calendar size={11} />
                      Planifier (optionnel)
                    </label>
                    <input
                      id="dispatch-scheduled"
                      type="datetime-local"
                      value={scheduledAt}
                      onChange={(e) => setScheduledAt(e.target.value)}
                      className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-800 focus:border-joel-violet focus:ring-2 focus:ring-joel-violet/20 outline-hidden"
                    />
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full"
                    onClick={handleDispatch}
                    loading={createIntervention.isPending}
                    disabled={!selectedArtisanId}
                    leftIcon={<Send size={13} />}
                  >
                    Dispatcher l&apos;intervention
                  </Button>
                </div>
              )}
            </section>

            {/* Notes */}
            <section className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Notes internes
              </h3>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={5}
                placeholder="Ajouter une note privée (visible uniquement par l'admin)…"
              />
              <div className="flex justify-end">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleSave}
                  loading={updateLead.isPending}
                  leftIcon={<Check size={13} />}
                >
                  Enregistrer la note
                </Button>
              </div>
            </section>

            {/* Historique — audit_logs */}
            <LeadHistorySection leadId={lead.id} />
          </div>

          {/* Footer sticky */}
          <div className="border-t border-zinc-100 px-6 py-4 space-y-2 bg-white">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handleConvert}
              disabled={status === "converted"}
              leftIcon={<Check size={16} />}
            >
              Marquer comme converti
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              loading={deleteLead.isPending}
              leftIcon={<Trash2 size={13} />}
              className="w-full text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              Supprimer ce lead
            </Button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

function Field({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="space-y-1">
      <dt className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-zinc-400">
        <Icon size={11} />
        {label}
      </dt>
      <dd className="text-sm text-zinc-800 font-medium">{value}</dd>
    </div>
  );
}

// ─── Historique (audit_logs) ────────────────────────────────────────────────

function LeadHistorySection({ leadId }: { leadId: string }) {
  const { data, isLoading, isError } = useLeadAuditLogs(leadId);

  return (
    <section className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 flex items-center gap-1.5">
        <History size={11} />
        Historique
      </h3>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className="h-7 w-7 rounded-full shrink-0" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3 w-2/3" />
                <Skeleton className="h-2 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-xs text-zinc-500">
          Impossible de charger l'historique pour le moment.
        </div>
      ) : !data || data.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-200 bg-zinc-50/50 p-4 text-xs text-zinc-500 flex items-center gap-2">
          <Clock size={13} className="text-zinc-400 shrink-0" />
          Pas d'événements pour le moment — chaque action sera tracée ici.
        </div>
      ) : (
        <ol className="relative pl-6 space-y-3">
          {/* Ligne verticale timeline */}
          <span
            aria-hidden
            className="absolute left-[11px] top-1 bottom-1 w-px bg-linear-to-b from-joel-violet/40 via-joel-violet/20 to-transparent"
          />
          {data.map((event) => (
            <AuditEventRow key={event.id} event={event} />
          ))}
        </ol>
      )}
    </section>
  );
}

// Map action → metadata d'affichage (icône, couleur, label)
const AUDIT_ACTION_META: Record<
  string,
  {
    icon: React.ElementType;
    label: string;
    iconColor: string;
    iconBg: string;
  }
> = {
  status_changed: {
    icon: ArrowRight,
    label: "Statut modifié",
    iconColor: "text-joel-violet",
    iconBg: "bg-joel-violet/15",
  },
  edited: {
    icon: Edit3,
    label: "Lead édité",
    iconColor: "text-joel-violet",
    iconBg: "bg-amber-50",
  },
  deleted: {
    icon: Trash2,
    label: "Lead supprimé",
    iconColor: "text-red-600",
    iconBg: "bg-red-50",
  },
  contacted: {
    icon: Phone,
    label: "Client contacté",
    iconColor: "text-joel-violet",
    iconBg: "bg-joel-violet/5",
  },
  created: {
    icon: PlusCircle,
    label: "Lead créé",
    iconColor: "text-joel-violet",
    iconBg: "bg-joel-violet/15",
  },
  assigned: {
    icon: UserCheck,
    label: "Artisan assigné",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
  },
};

function getActionMeta(action: string) {
  return (
    AUDIT_ACTION_META[action] ?? {
      icon: History,
      label: action,
      iconColor: "text-zinc-600",
      iconBg: "bg-zinc-100",
    }
  );
}

function AuditEventRow({ event }: { event: AuditLogEntry }) {
  const meta = getActionMeta(event.action);
  const Icon = meta.icon;

  return (
    <li className="relative">
      {/* Dot timeline */}
      <span
        className={cn(
          "absolute -left-6 top-0.5 h-6 w-6 rounded-full flex items-center justify-center ring-2 ring-white",
          meta.iconBg
        )}
        aria-hidden
      >
        <Icon size={11} className={meta.iconColor} />
      </span>

      <div className="rounded-lg bg-zinc-50 border border-zinc-200/70 px-3 py-2.5 text-xs">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-zinc-800 font-semibold">{meta.label}</p>
            <AuditEventDescription event={event} />
          </div>
          <span
            className="text-[10px] text-zinc-400 shrink-0 whitespace-nowrap"
            title={formatDateTime(event.created_at)}
          >
            {timeAgo(event.created_at)}
          </span>
        </div>
        {event.actor && (
          <div className="mt-1.5 flex items-center gap-1 text-[10px] text-zinc-500">
            <User size={9} />
            <span className="truncate">{event.actor}</span>
          </div>
        )}
      </div>
    </li>
  );
}

function statusLabel(status: unknown): string {
  if (typeof status !== "string") return "—";
  const cfg = STATUS_CONFIG[status as LeadStatus];
  return cfg?.label ?? status;
}

function AuditEventDescription({ event }: { event: AuditLogEntry }) {
  const meta = (event.metadata ?? {}) as Record<string, unknown>;

  if (event.action === "status_changed") {
    const from = statusLabel(meta.from);
    const to = statusLabel(meta.to);
    return (
      <p className="text-zinc-600 mt-0.5 flex flex-wrap items-center gap-1">
        <Badge variant="outline" className="text-[10px] py-0 h-4">
          {from}
        </Badge>
        <ArrowRight size={9} className="text-zinc-400" />
        <Badge variant="outline" className="text-[10px] py-0 h-4">
          {to}
        </Badge>
      </p>
    );
  }

  if (event.action === "edited") {
    const fields = (meta.fields_changed ?? {}) as Record<string, unknown>;
    const keys = Object.keys(fields);
    if (keys.length === 0) {
      return <p className="text-zinc-600 mt-0.5">Mise à jour</p>;
    }
    return (
      <p className="text-zinc-600 mt-0.5 truncate">
        Champs modifiés :{" "}
        <span className="font-medium text-zinc-700">{keys.join(", ")}</span>
      </p>
    );
  }

  if (event.action === "created") {
    const trade = meta.trade as string | null | undefined;
    const source = meta.source as string | null | undefined;
    return (
      <p className="text-zinc-600 mt-0.5">
        {source ? `via ${source}` : "Création manuelle"}
        {trade ? ` · ${trade}` : ""}
      </p>
    );
  }

  if (event.action === "assigned") {
    const artisan = meta.artisan as string | null | undefined;
    return (
      <p className="text-zinc-600 mt-0.5">
        {artisan ? `Assigné à ${artisan}` : "Artisan assigné"}
      </p>
    );
  }

  if (event.action === "deleted") {
    return (
      <p className="text-zinc-600 mt-0.5">
        {meta.bulk ? "Suppression en lot" : "Suppression"}
      </p>
    );
  }

  // Fallback : sérialise compactement la metadata si présente
  if (Object.keys(meta).length > 0) {
    return (
      <p className="text-zinc-600 mt-0.5 truncate font-mono text-[10px]">
        {JSON.stringify(meta)}
      </p>
    );
  }

  return null;
}
