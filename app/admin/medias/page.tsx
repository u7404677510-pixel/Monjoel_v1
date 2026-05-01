"use client";

/**
 * /admin/medias — page de gestion des médias visuels du site MonJoël.
 *
 * Trois zones :
 *  1. Upload (drag-drop + bouton) → bucket Supabase Storage `media`
 *  2. Galerie filtrable des assets uploadés (search + filtre type)
 *  3. Panneau des slots prédéfinis avec preview + assignation
 *
 * Stockage :
 *  - Fichiers : Supabase Storage bucket `media`, public-read, auth-write
 *  - Mapping  : table `site_assets (slot_id, asset_url, alt_text, …)`
 *
 * Voir `docs/admin-medias-setup.md` pour le SQL d'installation.
 */

import { useState, useMemo, useCallback, useRef } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  Upload,
  Image as ImageIcon,
  Film,
  Search,
  Copy,
  Trash2,
  Link2,
  CheckCircle2,
  CircleSlash,
  Loader2,
  FolderOpen,
  ExternalLink,
  X,
} from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Input,
  Badge,
  EmptyState,
  Skeleton,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  toast,
} from "@/components/ui";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import {
  SITE_ASSET_SLOTS,
  SITE_ASSET_CATEGORIES,
  getSlotsByCategory,
  getSlotById,
  type SiteAssetSlot,
  type SiteAssetType,
} from "@/lib/data/site-asset-slots";
import { siteAssetsQueryKey } from "@/lib/hooks/useSiteAssets";

// ────────────────────────────────────────────────────────────────────────────
// Types & constantes
// ────────────────────────────────────────────────────────────────────────────

const BUCKET = "media";
const MAX_FILE_BYTES = 50 * 1024 * 1024; // 50 MB
const ACCEPT = ".jpg,.jpeg,.png,.webp,.avif,.mp4,.webm";
const ACCEPTED_MIME = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "video/mp4",
  "video/webm",
];

interface StorageObject {
  name: string;
  id: string | null;
  updated_at: string | null;
  created_at: string | null;
  last_accessed_at: string | null;
  metadata: {
    size?: number;
    mimetype?: string;
    eTag?: string;
    cacheControl?: string;
  } | null;
}

interface MediaAsset {
  name: string;
  publicUrl: string;
  size: number;
  mimetype: string;
  type: SiteAssetType;
  uploadedAt: string;
}

interface SiteAssetRow {
  slot_id: string;
  asset_url: string;
  alt_text: string | null;
  uploaded_at: string;
  uploaded_by: string | null;
}

type TypeFilter = "all" | "image" | "video";

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────

function bytesToHuman(bytes: number): string {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function inferType(mimetype: string | undefined, name: string): SiteAssetType {
  if (mimetype?.startsWith("video/")) return "video";
  if (mimetype?.startsWith("image/")) return "image";
  // Fallback par extension
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  if (["mp4", "webm", "mov"].includes(ext)) return "video";
  return "image";
}

function safeFileName(name: string): string {
  // Normalise pour Supabase Storage : espaces → _, accents → ASCII, garde ext
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/_+/g, "_");
}

function formatDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return "—";
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Page
// ────────────────────────────────────────────────────────────────────────────

export default function MediasPage() {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [uploadingCount, setUploadingCount] = useState(0);
  const [uploadProgress, setUploadProgress] = useState<{
    current: number;
    total: number;
  } | null>(null);
  const [assignDialog, setAssignDialog] = useState<MediaAsset | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [altText, setAltText] = useState("");

  // ── Garde Supabase ────────────────────────────────────────────────────────
  const supabaseReady = !!supabase;

  // ── Queries ───────────────────────────────────────────────────────────────
  const assetsQuery = useQuery<MediaAsset[]>({
    queryKey: ["medias-bucket", BUCKET],
    queryFn: async () => {
      if (!supabase) return [];
      const { data, error } = await supabase.storage.from(BUCKET).list("", {
        limit: 1000,
        sortBy: { column: "updated_at", order: "desc" },
      });
      if (error) {
        // Bucket inexistant → liste vide silencieuse, message guide
        if (
          error.message.toLowerCase().includes("not found") ||
          error.message.toLowerCase().includes("bucket")
        ) {
          return [];
        }
        throw error;
      }
      const objects = (data ?? []) as StorageObject[];
      return objects
        .filter((o) => o.name && !o.name.startsWith("."))
        .map<MediaAsset>((o) => {
          const { data: pub } = supabase!.storage
            .from(BUCKET)
            .getPublicUrl(o.name);
          const mimetype = o.metadata?.mimetype ?? "";
          return {
            name: o.name,
            publicUrl: pub.publicUrl,
            size: o.metadata?.size ?? 0,
            mimetype,
            type: inferType(mimetype, o.name),
            uploadedAt:
              o.updated_at ?? o.created_at ?? new Date().toISOString(),
          };
        });
    },
    staleTime: 30_000,
    enabled: supabaseReady,
  });

  const slotMappingQuery = useQuery<Record<string, SiteAssetRow>>({
    queryKey: siteAssetsQueryKey,
    queryFn: async () => {
      if (!supabase) return {};
      const { data, error } = await supabase
        .from("site_assets")
        .select("slot_id, asset_url, alt_text, uploaded_at, uploaded_by");
      if (error) {
        if ((error as { code?: string }).code === "42P01") return {};
        throw error;
      }
      const rows = (data ?? []) as SiteAssetRow[];
      return rows.reduce<Record<string, SiteAssetRow>>((acc, row) => {
        acc[row.slot_id] = row;
        return acc;
      }, {});
    },
    staleTime: 30_000,
    enabled: supabaseReady,
  });

  // ── Upload ────────────────────────────────────────────────────────────────
  const uploadFiles = useCallback(
    async (files: FileList | File[]) => {
      if (!supabase) {
        toast.error("Supabase non configuré", {
          description: "Vérifie NEXT_PUBLIC_SUPABASE_URL et …_ANON_KEY.",
        });
        return;
      }
      const list = Array.from(files);
      if (!list.length) return;

      // Validation
      for (const f of list) {
        if (f.size > MAX_FILE_BYTES) {
          toast.error(`${f.name} dépasse 50 MB`);
          return;
        }
        if (
          !ACCEPTED_MIME.includes(f.type) &&
          !ACCEPT.split(",").some((ext) =>
            f.name.toLowerCase().endsWith(ext.trim())
          )
        ) {
          toast.error(`${f.name} : type non supporté`, {
            description: "Acceptés : jpg, png, webp, avif, mp4, webm.",
          });
          return;
        }
      }

      setUploadingCount(list.length);
      setUploadProgress({ current: 0, total: list.length });
      let success = 0;
      let failed = 0;

      for (let i = 0; i < list.length; i++) {
        const file = list[i];
        const ts = Date.now();
        const path = `${ts}-${safeFileName(file.name)}`;
        const { error } = await supabase.storage
          .from(BUCKET)
          .upload(path, file, {
            cacheControl: "3600",
            upsert: false,
            contentType: file.type || undefined,
          });
        if (error) {
          failed++;
          // Hint clair sur les erreurs récurrentes
          const msg = error.message.toLowerCase();
          if (msg.includes("bucket") || msg.includes("not found")) {
            toast.error(`Bucket "${BUCKET}" introuvable`, {
              description:
                "Crée-le dans Supabase Storage (cf. docs/admin-medias-setup.md).",
            });
            break;
          }
          if (msg.includes("permission") || msg.includes("policy")) {
            toast.error("Permission refusée", {
              description:
                "Vérifie les RLS du bucket (auth-write requis).",
            });
            break;
          }
          toast.error(`Échec upload ${file.name}`, {
            description: error.message,
          });
        } else {
          success++;
        }
        setUploadProgress({ current: i + 1, total: list.length });
      }

      setUploadingCount(0);
      setUploadProgress(null);
      if (success) {
        toast.success(
          success === 1
            ? "1 fichier uploadé"
            : `${success} fichiers uploadés`,
          failed
            ? { description: `${failed} échec(s) — voir les logs.` }
            : undefined
        );
      }
      queryClient.invalidateQueries({ queryKey: ["medias-bucket", BUCKET] });
    },
    [queryClient]
  );

  // ── Drag & drop ───────────────────────────────────────────────────────────
  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        uploadFiles(e.dataTransfer.files);
      }
    },
    [uploadFiles]
  );

  // ── Mutations Slots ───────────────────────────────────────────────────────
  const assignMutation = useMutation({
    mutationFn: async ({
      slotId,
      assetUrl,
      alt,
    }: {
      slotId: string;
      assetUrl: string;
      alt: string;
    }) => {
      if (!supabase) throw new Error("Supabase non configuré");
      const { error } = await supabase.from("site_assets").upsert(
        {
          slot_id: slotId,
          asset_url: assetUrl,
          alt_text: alt || null,
          uploaded_at: new Date().toISOString(),
        },
        { onConflict: "slot_id" }
      );
      if (error) throw error;
    },
    onSuccess: (_, vars) => {
      const slot = getSlotById(vars.slotId);
      toast.success("Slot assigné", {
        description: slot?.label ?? vars.slotId,
      });
      queryClient.invalidateQueries({ queryKey: siteAssetsQueryKey });
      setAssignDialog(null);
      setSelectedSlot("");
      setAltText("");
    },
    onError: (err: Error) => {
      const msg = err.message.toLowerCase();
      if (msg.includes("relation") || msg.includes("table")) {
        toast.error("Table site_assets manquante", {
          description: "Voir docs/admin-medias-setup.md.",
        });
      } else {
        toast.error("Erreur d'assignation", { description: err.message });
      }
    },
  });

  const unassignMutation = useMutation({
    mutationFn: async (slotId: string) => {
      if (!supabase) throw new Error("Supabase non configuré");
      const { error } = await supabase
        .from("site_assets")
        .delete()
        .eq("slot_id", slotId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Slot remis au fallback");
      queryClient.invalidateQueries({ queryKey: siteAssetsQueryKey });
    },
    onError: (err: Error) =>
      toast.error("Erreur", { description: err.message }),
  });

  const deleteAssetMutation = useMutation({
    mutationFn: async (asset: MediaAsset) => {
      if (!supabase) throw new Error("Supabase non configuré");
      const { error } = await supabase.storage
        .from(BUCKET)
        .remove([asset.name]);
      if (error) throw error;
      // Si cet asset est utilisé par un slot, on nettoie le mapping aussi
      const usedSlots = Object.values(slotMappingQuery.data ?? {}).filter(
        (r) => r.asset_url === asset.publicUrl
      );
      if (usedSlots.length) {
        await supabase
          .from("site_assets")
          .delete()
          .in(
            "slot_id",
            usedSlots.map((s) => s.slot_id)
          );
      }
    },
    onSuccess: () => {
      toast.success("Fichier supprimé");
      queryClient.invalidateQueries({ queryKey: ["medias-bucket", BUCKET] });
      queryClient.invalidateQueries({ queryKey: siteAssetsQueryKey });
    },
    onError: (err: Error) =>
      toast.error("Erreur de suppression", { description: err.message }),
  });

  // ── Filtrage ──────────────────────────────────────────────────────────────
  const filteredAssets = useMemo(() => {
    const all = assetsQuery.data ?? [];
    return all.filter((a) => {
      if (typeFilter !== "all" && a.type !== typeFilter) return false;
      if (search.trim()) {
        return a.name.toLowerCase().includes(search.toLowerCase());
      }
      return true;
    });
  }, [assetsQuery.data, search, typeFilter]);

  // ── Map URL → slots qui l'utilisent (badge "assigné à") ───────────────────
  const slotsByAssetUrl = useMemo(() => {
    const map: Record<string, string[]> = {};
    Object.values(slotMappingQuery.data ?? {}).forEach((row) => {
      (map[row.asset_url] ??= []).push(row.slot_id);
    });
    return map;
  }, [slotMappingQuery.data]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleCopyUrl = (url: string) => {
    navigator.clipboard
      .writeText(url)
      .then(() => toast.success("URL copiée"))
      .catch(() => toast.error("Impossible de copier"));
  };

  const handleOpenAssign = (asset: MediaAsset) => {
    setAssignDialog(asset);
    setSelectedSlot("");
    setAltText("");
  };

  const handleConfirmAssign = () => {
    if (!assignDialog || !selectedSlot) return;
    assignMutation.mutate({
      slotId: selectedSlot,
      assetUrl: assignDialog.publicUrl,
      alt: altText,
    });
  };

  // ────────────────────────────────────────────────────────────────────────
  // Rendering
  // ────────────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Médias</h1>
          <p className="text-sm text-zinc-500 mt-0.5">
            Upload et assignation des images / vidéos du site.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="primary">
            {assetsQuery.data?.length ?? 0} fichiers
          </Badge>
          <Badge variant="accent">
            {Object.keys(slotMappingQuery.data ?? {}).length} /{" "}
            {SITE_ASSET_SLOTS.length} slots
          </Badge>
        </div>
      </div>

      {/* ── Avertissement Supabase ────────────────────────────────────── */}
      {!supabaseReady && (
        <Card className="border-amber-200 bg-amber-50/50">
          <CardContent className="p-4 flex items-start gap-3">
            <CircleSlash className="text-amber-600 mt-0.5" size={18} />
            <div className="text-sm text-amber-900">
              <strong>Supabase non configuré.</strong> Définis{" "}
              <code className="text-xs bg-amber-100 px-1 py-0.5 rounded-sm">
                NEXT_PUBLIC_SUPABASE_URL
              </code>{" "}
              et{" "}
              <code className="text-xs bg-amber-100 px-1 py-0.5 rounded-sm">
                NEXT_PUBLIC_SUPABASE_ANON_KEY
              </code>{" "}
              dans <code>.env.local</code> puis redémarre le serveur.
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── Upload zone ───────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload size={18} />
            Upload
          </CardTitle>
          <CardDescription>
            Glisse-dépose des fichiers ou clique pour parcourir. Max 50 MB —
            jpg, png, webp, avif, mp4, webm.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            className={cn(
              "relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer",
              "hover:border-joel-violet hover:bg-joel-violet/5",
              "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-joel-violet focus-visible:ring-offset-2",
              isDragging
                ? "border-joel-violet bg-joel-violet/10"
                : "border-zinc-300 bg-zinc-50/50",
              uploadingCount > 0 && "pointer-events-none opacity-60"
            )}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={ACCEPT}
              className="hidden"
              onChange={(e) => {
                if (e.target.files) {
                  uploadFiles(e.target.files);
                  e.target.value = "";
                }
              }}
            />
            {uploadingCount > 0 ? (
              <div className="flex flex-col items-center gap-3">
                <Loader2
                  className="animate-spin text-joel-violet"
                  size={32}
                />
                <p className="text-sm text-zinc-700">
                  Upload en cours… {uploadProgress?.current}/
                  {uploadProgress?.total}
                </p>
                <div className="w-full max-w-xs h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-joel-violet to-joel-mauve transition-all duration-300"
                    style={{
                      width: uploadProgress
                        ? `${(uploadProgress.current / uploadProgress.total) * 100}%`
                        : "0%",
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full bg-joel-violet/10 flex items-center justify-center">
                  <Upload className="text-joel-violet" size={24} />
                </div>
                <p className="text-sm font-medium text-zinc-900">
                  Glisse-dépose tes fichiers ici
                </p>
                <p className="text-xs text-zinc-500">
                  ou clique pour sélectionner depuis ton ordinateur
                </p>
                <Button
                  size="sm"
                  variant="secondary"
                  className="mt-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  leftIcon={<FolderOpen size={14} />}
                >
                  Sélectionner des fichiers
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ── Slots panel ───────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 size={18} />
            Emplacements du site
          </CardTitle>
          <CardDescription>
            {SITE_ASSET_SLOTS.length} emplacements définis. Clique sur
            &quot;Assigner&quot; sur un fichier de la galerie pour le placer
            dans un slot.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {SITE_ASSET_CATEGORIES.map((category) => {
            const slots = getSlotsByCategory(category);
            return (
              <div key={category}>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 mb-3">
                  {category}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {slots.map((slot) => {
                    const mapping = slotMappingQuery.data?.[slot.id];
                    return (
                      <SlotCard
                        key={slot.id}
                        slot={slot}
                        currentUrl={mapping?.asset_url}
                        currentAlt={mapping?.alt_text ?? null}
                        loading={slotMappingQuery.isLoading}
                        onUnassign={() => unassignMutation.mutate(slot.id)}
                        unassigning={
                          unassignMutation.isPending &&
                          unassignMutation.variables === slot.id
                        }
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* ── Galerie ───────────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon size={18} />
                Galerie
              </CardTitle>
              <CardDescription>
                Tous les fichiers stockés dans le bucket{" "}
                <code className="text-xs">media</code>.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Rechercher…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                leftIcon={<Search size={14} />}
                className="w-full sm:w-56"
              />
              <Select
                value={typeFilter}
                onValueChange={(v) => setTypeFilter(v as TypeFilter)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="video">Vidéos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {assetsQuery.isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-48 w-full rounded-xl" />
              ))}
            </div>
          ) : filteredAssets.length === 0 ? (
            <EmptyState
              icon={ImageIcon}
              title={
                search || typeFilter !== "all"
                  ? "Aucun résultat"
                  : "Aucun fichier"
              }
              description={
                search || typeFilter !== "all"
                  ? "Essaie d'élargir ta recherche ou ton filtre."
                  : "Upload tes premiers fichiers via la zone ci-dessus."
              }
            />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredAssets.map((asset) => (
                <AssetCard
                  key={asset.name}
                  asset={asset}
                  assignedSlots={slotsByAssetUrl[asset.publicUrl] ?? []}
                  onAssign={() => handleOpenAssign(asset)}
                  onCopyUrl={() => handleCopyUrl(asset.publicUrl)}
                  onDelete={() => {
                    if (
                      window.confirm(
                        `Supprimer "${asset.name}" ?\n\nLes slots qui l'utilisent seront aussi remis au fallback.`
                      )
                    ) {
                      deleteAssetMutation.mutate(asset);
                    }
                  }}
                  deleting={
                    deleteAssetMutation.isPending &&
                    deleteAssetMutation.variables?.name === asset.name
                  }
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Dialog assignation ───────────────────────────────────────── */}
      <Dialog
        open={!!assignDialog}
        onOpenChange={(open) => {
          if (!open) {
            setAssignDialog(null);
            setSelectedSlot("");
            setAltText("");
          }
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Assigner à un slot</DialogTitle>
            <DialogDescription>
              Choisis l&apos;emplacement où ce fichier doit apparaître sur le
              site.
            </DialogDescription>
          </DialogHeader>
          {assignDialog && (
            <div className="space-y-4">
              {/* Preview */}
              <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-lg">
                <div className="w-16 h-16 rounded-md overflow-hidden bg-zinc-200 shrink-0 flex items-center justify-center">
                  {assignDialog.type === "video" ? (
                    <Film size={24} className="text-zinc-400" />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={assignDialog.publicUrl}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-zinc-900 truncate">
                    {assignDialog.name}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {bytesToHuman(assignDialog.size)} · {assignDialog.type}
                  </p>
                </div>
              </div>

              {/* Slot select */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-700">
                  Emplacement
                </label>
                <Select
                  value={selectedSlot}
                  onValueChange={setSelectedSlot}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un slot…" />
                  </SelectTrigger>
                  <SelectContent>
                    {SITE_ASSET_CATEGORIES.map((cat) => {
                      const slots = getSlotsByCategory(cat).filter(
                        (s) => s.type === assignDialog.type
                      );
                      if (!slots.length) return null;
                      return (
                        <SelectGroup key={cat}>
                          <SelectLabel>{cat}</SelectLabel>
                          {slots.map((slot) => (
                            <SelectItem key={slot.id} value={slot.id}>
                              {slot.label}{" "}
                              <span className="text-zinc-400 text-xs ml-1">
                                ({slot.aspect})
                              </span>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      );
                    })}
                  </SelectContent>
                </Select>
                {selectedSlot && (
                  <p className="text-xs text-zinc-500 mt-1">
                    {getSlotById(selectedSlot)?.description}
                  </p>
                )}
              </div>

              {/* Alt text */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-700">
                  Texte alternatif (alt)
                </label>
                <Input
                  placeholder="Ex: Plombier intervenant à Paris…"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                />
                <p className="text-xs text-zinc-500">
                  Pour l&apos;accessibilité et le SEO. Ignoré pour les vidéos.
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setAssignDialog(null)}
              disabled={assignMutation.isPending}
            >
              Annuler
            </Button>
            <Button
              onClick={handleConfirmAssign}
              loading={assignMutation.isPending}
              disabled={!selectedSlot}
              leftIcon={<CheckCircle2 size={14} />}
            >
              Assigner
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// SlotCard — preview d'un slot du site avec son asset courant
// ────────────────────────────────────────────────────────────────────────────

interface SlotCardProps {
  slot: SiteAssetSlot;
  currentUrl?: string;
  currentAlt: string | null;
  loading: boolean;
  onUnassign: () => void;
  unassigning: boolean;
}

function SlotCard({
  slot,
  currentUrl,
  loading,
  onUnassign,
  unassigning,
}: SlotCardProps) {
  const hasCustom = !!currentUrl;
  const previewUrl = currentUrl ?? slot.path;

  return (
    <div className="group relative border border-zinc-200 rounded-xl overflow-hidden bg-white hover:border-joel-violet/40 hover:shadow-md transition-all">
      <div
        className={cn(
          "relative bg-zinc-100 flex items-center justify-center",
          slot.aspect === "16:9" && "aspect-video",
          slot.aspect === "4:3" && "aspect-4/3",
          slot.aspect === "1:1" && "aspect-square",
          slot.aspect === "3:2" && "aspect-3/2",
          slot.aspect === "21:9" && "aspect-21/9"
        )}
      >
        {loading ? (
          <Skeleton className="absolute inset-0 rounded-none" />
        ) : slot.type === "video" ? (
          <div className="flex flex-col items-center text-zinc-400">
            <Film size={32} />
            <span className="text-[10px] mt-1">video</span>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl}
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.opacity = "0.3";
            }}
          />
        )}
        {hasCustom && (
          <Badge
            variant="success"
            className="absolute top-2 right-2 shadow-xs"
          >
            <CheckCircle2 size={10} /> custom
          </Badge>
        )}
        {!hasCustom && !loading && (
          <Badge
            variant="outline"
            className="absolute top-2 right-2 shadow-xs bg-white/90"
          >
            fallback
          </Badge>
        )}
      </div>
      <div className="p-3">
        <p className="text-sm font-medium text-zinc-900 truncate">
          {slot.label}
        </p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-[11px] text-zinc-500 font-mono truncate">
            {slot.id}
          </p>
          <Badge variant="default" className="text-[10px]">
            {slot.aspect}
          </Badge>
        </div>
        {hasCustom && (
          <Button
            size="sm"
            variant="ghost"
            className="w-full mt-2 text-red-600 hover:bg-red-50"
            onClick={onUnassign}
            loading={unassigning}
            leftIcon={<X size={12} />}
          >
            Retirer
          </Button>
        )}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// AssetCard — vignette d'un fichier de la galerie
// ────────────────────────────────────────────────────────────────────────────

interface AssetCardProps {
  asset: MediaAsset;
  assignedSlots: string[];
  onAssign: () => void;
  onCopyUrl: () => void;
  onDelete: () => void;
  deleting: boolean;
}

function AssetCard({
  asset,
  assignedSlots,
  onAssign,
  onCopyUrl,
  onDelete,
  deleting,
}: AssetCardProps) {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="group relative border border-zinc-200 rounded-xl overflow-hidden bg-white hover:border-joel-violet/40 hover:shadow-md transition-all">
      <div className="relative aspect-square bg-zinc-100 flex items-center justify-center overflow-hidden">
        {asset.type === "video" ? (
          <video
            src={asset.publicUrl}
            className="w-full h-full object-cover"
            muted
            playsInline
            preload="metadata"
          />
        ) : imgError ? (
          <ImageIcon size={32} className="text-zinc-400" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={asset.publicUrl}
            alt={asset.name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
          <Button
            size="sm"
            variant="primary"
            onClick={onAssign}
            leftIcon={<Link2 size={12} />}
            className="w-full max-w-[160px]"
          >
            Assigner
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={onCopyUrl}
            leftIcon={<Copy size={12} />}
            className="w-full max-w-[160px]"
          >
            Copier URL
          </Button>
          <div className="flex gap-1 w-full max-w-[160px]">
            <Button
              size="sm"
              variant="ghost"
              asChild
              className="flex-1 bg-white/90 hover:bg-white"
            >
              <a
                href={asset.publicUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={12} />
              </a>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={onDelete}
              loading={deleting}
              className="flex-1 bg-white/90 hover:bg-red-50 text-red-600"
            >
              <Trash2 size={12} />
            </Button>
          </div>
        </div>
        {/* Badges */}
        <Badge
          variant={asset.type === "video" ? "accent" : "primary"}
          className="absolute top-2 left-2 shadow-xs"
        >
          {asset.type === "video" ? (
            <Film size={10} />
          ) : (
            <ImageIcon size={10} />
          )}
          {asset.type}
        </Badge>
        {assignedSlots.length > 0 && (
          <Badge
            variant="success"
            className="absolute top-2 right-2 shadow-xs"
          >
            <CheckCircle2 size={10} />
            {assignedSlots.length}
          </Badge>
        )}
      </div>
      <div className="p-3 space-y-1">
        <p
          className="text-xs font-medium text-zinc-900 truncate"
          title={asset.name}
        >
          {asset.name}
        </p>
        <div className="flex items-center justify-between text-[11px] text-zinc-500">
          <span>{bytesToHuman(asset.size)}</span>
          <span>{formatDate(asset.uploadedAt)}</span>
        </div>
        {assignedSlots.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {assignedSlots.slice(0, 2).map((sid) => (
              <Badge
                key={sid}
                variant="primary"
                className="text-[9px] truncate max-w-full"
              >
                {getSlotById(sid)?.label ?? sid}
              </Badge>
            ))}
            {assignedSlots.length > 2 && (
              <Badge variant="default" className="text-[9px]">
                +{assignedSlots.length - 2}
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
