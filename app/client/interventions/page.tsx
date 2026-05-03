"use client";

/**
 * /client/interventions — Mes demandes (auth required).
 *
 * Composé de :
 *  - Header "Bonjour {prénom}" + sub + CTA "Nouvelle demande"
 *  - Tabs (Toutes / En cours / Terminées / Annulées) avec badges count
 *  - Search par problem_label / postal_code / date
 *  - Liste de cards interventions (clickable → drawer détaillé)
 *  - Drawer détail avec timeline grande, photos, devis/facture, chat, rating
 *
 * Auth :
 *  - Redirige vers /client si pas de session.
 *  - Charge tous les leads (la table n'a pas de colonne `email` — voir rapport).
 *
 * Rating :
 *  - Stocké en local state pour l'instant (mock).
 *  - Toast de succès au submit.
 *  - À brancher sur table `ratings` côté DB.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertCircle,
  ChevronRight,
  Droplets,
  Inbox,
  Key,
  MapPin,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Wrench,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/toast";
import { InterventionDrawer } from "../_components/InterventionDrawer";
import { RatingStars } from "../_components/RatingStars";
import { Timeline } from "../_components/Timeline";
import {
  emailToFirstName,
  formatDateShort,
  getStatusMeta,
  type Lead,
  type LeadStatus,
} from "../_components/util";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

const TRADE_ICONS: Record<string, React.ElementType> = {
  Plomberie: Droplets,
  Plombier: Droplets,
  Serrurerie: Key,
  Serrurier: Key,
  Électricité: Zap,
  Electricite: Zap,
  Electricien: Zap,
};

type FilterTab = "all" | "open" | "done" | "cancelled";

const TABS: { value: FilterTab; label: string }[] = [
  { value: "all", label: "Toutes" },
  { value: "open", label: "En cours" },
  { value: "done", label: "Terminées" },
  { value: "cancelled", label: "Annulées" },
];

export default function ClientInterventionsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [error, setError] = useState<string>("");
  const [userEmail, setUserEmail] = useState("");

  const [tab, setTab] = useState<FilterTab>("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [ratings, setRatings] = useState<Record<string, number>>({});

  // Hydratation des ratings depuis localStorage au mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored: Record<string, number> = {};
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        if (key && key.startsWith("joel_ratings_")) {
          const leadId = key.slice("joel_ratings_".length);
          const raw = window.localStorage.getItem(key);
          const n = raw ? parseInt(raw, 10) : NaN;
          if (!isNaN(n) && n > 0 && n <= 5) {
            stored[leadId] = n;
          }
        }
      }
      if (Object.keys(stored).length) {
        setRatings((prev) => ({ ...stored, ...prev }));
      }
    } catch {
      /* localStorage indispo en SSR / mode privé strict */
    }
  }, []);

  const fetchLeads = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) {
      setError("Service indisponible. Réessayez plus tard.");
      setLoading(false);
      setAuthChecked(true);
      return;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.replace("/client");
      return;
    }

    setUserEmail(session.user.email ?? "");
    setAuthChecked(true);

    const { data, error: fetchError } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError("Impossible de charger vos interventions.");
    } else {
      setLeads((data as Lead[]) ?? []);
      setError("");
    }
    setLoading(false);
  }, [router]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Compteurs par bucket pour les badges des tabs
  const counts = useMemo(() => {
    const c = { all: leads.length, open: 0, done: 0, cancelled: 0 };
    for (const l of leads) {
      const bucket = getStatusMeta(l.status).bucket;
      c[bucket]++;
    }
    return c;
  }, [leads]);

  // Filtrage tab + search
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return leads.filter((l) => {
      const bucket = getStatusMeta(l.status).bucket;
      if (tab !== "all" && bucket !== tab) return false;
      if (!q) return true;
      const haystack = [
        l.problem_label,
        l.trade,
        l.postal_code,
        formatDateShort(l.created_at),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [leads, tab, search]);

  const handleRate = async (leadId: string, stars: number) => {
    setRatings((prev) => ({ ...prev, [leadId]: stars }));
    // Persistance localStorage (toujours, fallback de base)
    try {
      window.localStorage.setItem(`joel_ratings_${leadId}`, String(stars));
    } catch {
      /* fail silent */
    }
    // Tentative INSERT sur table `ratings` (best-effort, ne casse pas le UX si absente)
    const supabase = getSupabase();
    if (supabase) {
      try {
        const { error: insertError } = await supabase.from("ratings").insert({
          lead_id: leadId,
          stars,
          created_at: new Date().toISOString(),
        });
        if (insertError) {
          // Table absente / RLS / colonne manquante → on garde le localStorage
          console.warn("[ratings] insert fallback localStorage:", insertError.message);
        }
      } catch (err) {
        console.warn("[ratings] insert exception:", err);
      }
    }
    toast.success("Merci pour votre note !", {
      description: `Note de ${stars}/5 enregistrée.`,
    });
  };

  const firstName = emailToFirstName(userEmail);

  // ---- Render ---------------------------------------------------------------

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      {/* Page header */}
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <p className="text-xs uppercase tracking-widest text-joel-violet/70 font-semibold">
            Espace client
          </p>
          <h1 className="font-display text-3xl sm:text-4xl text-zinc-900 mt-1.5 leading-tight">
            Bonjour{firstName && ` ${firstName}`}
            <span className="text-joel-yellow">.</span>
          </h1>
          <p className="text-sm text-zinc-500 mt-1.5">
            Vos interventions et demandes de devis, mises à jour en temps réel.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="ghost"
            size="md"
            leftIcon={<RefreshCw size={15} />}
            onClick={() => {
              setLoading(true);
              fetchLeads();
            }}
            aria-label="Recharger"
          >
            <span className="hidden sm:inline">Actualiser</span>
          </Button>
          <Button asChild size="md" leftIcon={<Plus size={16} />}>
            <Link href="/?devis=1#devis">Nouvelle demande</Link>
          </Button>
        </div>
      </header>

      {/* Filters bar */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl p-3 sm:p-4 mb-6 shadow-xs shadow-joel-violet/5">
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
          <Tabs
            value={tab}
            onValueChange={(v) => setTab(v as FilterTab)}
            className="min-w-0"
          >
            <TabsList className="flex flex-wrap gap-0 border-0 w-auto">
              {TABS.map((t) => (
                <TabsTrigger key={t.value} value={t.value} className="px-3">
                  {t.label}
                  <span
                    className={`ml-1.5 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold ${
                      tab === t.value
                        ? "bg-joel-violet text-white"
                        : "bg-zinc-100 text-zinc-500"
                    }`}
                  >
                    {counts[t.value]}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="relative w-full lg:w-72">
            <Input
              type="search"
              placeholder="Rechercher (problème, code postal…)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search size={15} />}
            />
          </div>
        </div>
      </div>

      {/* Error state */}
      {error && authChecked && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-6 flex items-start gap-2">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="font-semibold">Erreur</p>
            <p className="text-xs mt-0.5">{error}</p>
          </div>
          <button
            onClick={() => {
              setLoading(true);
              fetchLeads();
            }}
            className="text-xs font-semibold hover:underline"
          >
            Réessayer
          </button>
        </div>
      )}

      {/* Body */}
      {loading || !authChecked ? (
        <SkeletonList />
      ) : filtered.length === 0 ? (
        leads.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title="Vous n'avez aucune intervention"
            description="Vos demandes apparaîtront ici dès que vous nous solliciterez. Joël est disponible 24h/24."
            action={
              <Button asChild leftIcon={<Plus size={15} />}>
                <Link href="/?devis=1#devis">Faire une demande</Link>
              </Button>
            }
          />
        ) : (
          <EmptyState
            icon={Search}
            title="Aucun résultat"
            description="Essayez d'effacer la recherche ou de changer de filtre."
            action={
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSearch("");
                  setTab("all");
                }}
              >
                Réinitialiser les filtres
              </Button>
            }
          />
        )
      ) : (
        <AnimatePresence initial={false} mode="popLayout">
          <motion.ul
            key={tab + search}
            layout
            className="grid grid-cols-1 lg:grid-cols-2 gap-4"
          >
            {filtered.map((lead, i) => (
              <InterventionCard
                key={lead.id}
                lead={lead}
                index={i}
                rating={ratings[lead.id] ?? 0}
                onOpen={() => setSelected(lead)}
                onRate={(stars) => handleRate(lead.id, stars)}
              />
            ))}
          </motion.ul>
        </AnimatePresence>
      )}

      <InterventionDrawer
        lead={selected}
        rating={selected ? (ratings[selected.id] ?? 0) : 0}
        onRate={(stars) => selected && handleRate(selected.id, stars)}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Sub-components                                                             */
/* -------------------------------------------------------------------------- */

interface InterventionCardProps {
  lead: Lead;
  index: number;
  rating: number;
  onOpen: () => void;
  onRate: (stars: number) => void;
}

function InterventionCard({
  lead,
  index,
  rating,
  onOpen,
  onRate,
}: InterventionCardProps) {
  const meta = getStatusMeta(lead.status);
  const TradeIcon = TRADE_ICONS[lead.trade] ?? Wrench;
  const isCompleted = meta.bucket === "done";

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        duration: 0.4,
        delay: Math.min(index, 6) * 0.04,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -2 }}
      className="group"
    >
      <article
        className="bg-white border border-zinc-200/80 rounded-2xl p-5 sm:p-6 hover:border-joel-violet/30 hover:shadow-lg hover:shadow-joel-violet/5 transition-all cursor-pointer h-full flex flex-col"
        onClick={onOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen();
          }
        }}
      >
        {/* Header: badge + date */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <Badge variant={meta.badgeVariant}>
            <meta.icon size={11} />
            {meta.short}
          </Badge>
          <span className="text-xs text-zinc-400 font-medium">
            {formatDateShort(lead.created_at)}
          </span>
        </div>

        {/* Title + trade icon */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-joel-violet/10 to-joel-mauve/10 border border-joel-violet/15 flex items-center justify-center shrink-0">
            <TradeIcon size={18} className="text-joel-violet" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-lg text-zinc-900 leading-tight line-clamp-2">
              {lead.problem_label}
            </h2>
            <div className="mt-1.5 flex items-center gap-2 flex-wrap">
              {lead.trade && (
                <Badge variant="primary" className="text-[10px]">
                  {lead.trade}
                </Badge>
              )}
              {lead.postal_code && (
                <span className="text-xs text-zinc-500 inline-flex items-center gap-1">
                  <MapPin size={11} />
                  {lead.postal_code}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="my-4 px-1">
          <Timeline status={(lead.status as LeadStatus) || "new"} />
        </div>

        {/* Bottom row: rating si terminée, sinon CTA contact */}
        <div className="mt-auto pt-4 border-t border-zinc-100 flex items-center justify-between gap-2">
          {isCompleted ? (
            <div
              className="flex items-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-xs text-zinc-500 font-medium">
                {rating > 0 ? "Votre note :" : "Évaluez :"}
              </span>
              <RatingStars value={rating} onSubmit={onRate} size={18} />
            </div>
          ) : meta.bucket === "cancelled" ? (
            <span className="text-xs text-zinc-400 italic">
              Intervention annulée
            </span>
          ) : (
            <a
              href="tel:+33141691008"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-joel-violet hover:text-joel-violet"
            >
              <Phone size={12} /> Appeler
            </a>
          )}
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-joel-violet group-hover:translate-x-0.5 transition-transform">
            Voir les détails
            <ChevronRight size={14} />
          </span>
        </div>
      </article>
    </motion.li>
  );
}

function SkeletonList() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="bg-white border border-zinc-200/80 rounded-2xl p-6 animate-pulse"
        >
          <div className="flex justify-between mb-4">
            <div className="h-5 w-24 bg-zinc-100 rounded-full" />
            <div className="h-3 w-16 bg-zinc-100 rounded-sm" />
          </div>
          <div className="flex gap-3 mb-4">
            <div className="w-10 h-10 bg-zinc-100 rounded-xl shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 bg-zinc-100 rounded-sm" />
              <div className="h-3 w-1/2 bg-zinc-100 rounded-sm" />
            </div>
          </div>
          <div className="h-10 bg-zinc-100 rounded-lg" />
          <div className="mt-4 h-4 bg-zinc-100 rounded-sm w-1/3" />
        </div>
      ))}
    </div>
  );
}
