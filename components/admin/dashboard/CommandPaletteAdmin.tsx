"use client";

/**
 * CommandPaletteAdmin — Cmd+K palette du backoffice.
 *
 * Sections :
 *  - Pages    : navigation rapide vers les écrans /admin/*
 *  - Actions  : refresh, exporter CSV, ouvrir Supabase/Vercel
 *  - Recherche: placeholder (à brancher en Phase B sur la table leads)
 *
 * Binding : `useCommandShortcut(toggleOpen)` (Cmd+K mac / Ctrl+K win).
 */

import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  Download,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  LayoutDashboard,
  RefreshCw,
  Search,
  Settings,
  Users,
  UserPlus,
  Wrench,
  Zap,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command-palette";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface CommandPaletteAdminProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onRefresh?: () => void;
}

const PAGES: { label: string; href: string; icon: React.ElementType; hint?: string }[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, hint: "Vue d'ensemble" },
  { label: "Leads & devis", href: "/admin/leads", icon: Users, hint: "Demandes clients" },
  { label: "Recrutement", href: "/admin/recrutement", icon: UserPlus, hint: "Candidatures" },
  { label: "Artisans", href: "/admin/artisans", icon: Wrench, hint: "Réseau" },
  { label: "Médias", href: "/admin/medias", icon: ImageIcon, hint: "Banque d'images" },
  { label: "SEO", href: "/admin/seo", icon: Search, hint: "Métadonnées pages" },
  { label: "Contenu", href: "/admin/contenu", icon: FileText, hint: "Textes site public" },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3, hint: "GA4 / Ads" },
  { label: "Personnalisation", href: "/admin/personnalisation", icon: Settings },
];

export function CommandPaletteAdmin({ open, onOpenChange, onRefresh }: CommandPaletteAdminProps) {
  const router = useRouter();
  const qc = useQueryClient();

  const go = (href: string) => {
    onOpenChange(false);
    router.push(href);
  };

  const triggerRefresh = () => {
    onOpenChange(false);
    onRefresh?.();
    qc.invalidateQueries({ queryKey: ["admin", "dashboard"] });
    toast.success("Dashboard actualisé");
  };

  const exportCsv = () => {
    onOpenChange(false);
    router.push("/admin/leads?export=csv");
    toast.info("Préparation de l'export CSV…");
  };

  const openExternal = (url: string, label: string) => {
    onOpenChange(false);
    window.open(url, "_blank", "noopener,noreferrer");
    toast.info(`Ouverture de ${label}…`);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Rechercher une page, lancer une action…" />
      <CommandList>
        <CommandEmpty>Aucun résultat.</CommandEmpty>

        <CommandGroup heading="Pages">
          {PAGES.map((p) => {
            const Icon = p.icon;
            return (
              <CommandItem
                key={p.href}
                value={`${p.label} ${p.hint ?? ""}`}
                onSelect={() => go(p.href)}
              >
                <Icon size={16} className="text-joel-violet" />
                <span>{p.label}</span>
                {p.hint && (
                  <span className="ml-2 text-xs text-zinc-400">{p.hint}</span>
                )}
                <CommandShortcut>
                  <ArrowRight size={12} />
                </CommandShortcut>
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem value="refresh actualiser dashboard" onSelect={triggerRefresh}>
            <RefreshCw size={16} className="text-joel-violet" />
            <span>Actualiser le dashboard</span>
            <CommandShortcut>R</CommandShortcut>
          </CommandItem>
          <CommandItem value="export exporter csv leads" onSelect={exportCsv}>
            <Download size={16} className="text-joel-violet" />
            <span>Exporter les leads (CSV)</span>
            <CommandShortcut>E</CommandShortcut>
          </CommandItem>
          <CommandItem
            value="supabase dashboard base de donnees"
            onSelect={() => openExternal("https://supabase.com/dashboard", "Supabase")}
          >
            <ExternalLink size={16} className="text-joel-violet" />
            <span>Ouvrir Supabase</span>
          </CommandItem>
          <CommandItem
            value="vercel deploiement"
            onSelect={() => openExternal("https://vercel.com/dashboard", "Vercel")}
          >
            <ExternalLink size={16} className="text-joel-violet" />
            <span>Ouvrir Vercel</span>
          </CommandItem>
          <CommandItem
            value="clarity heatmaps"
            onSelect={() => openExternal("https://clarity.microsoft.com", "Clarity")}
          >
            <Zap size={16} className="text-joel-violet" />
            <span>Microsoft Clarity</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Recherche">
          <CommandItem
            value="rechercher lead client"
            onSelect={() => go("/admin/leads")}
            disabled={false}
          >
            <Search size={16} className="text-zinc-400" />
            <span className="text-zinc-500">
              Rechercher un lead par téléphone ou code postal…
            </span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
