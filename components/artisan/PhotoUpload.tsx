"use client";

/**
 * PhotoUpload — uploader photos avant/après pour une mission artisan.
 *
 * Stratégie :
 *  - Input file accept image/* multiple
 *  - Au select : upload vers bucket Supabase Storage `media` dans
 *    `interventions/{interventionId}/{kind}/{uuid}.ext`
 *  - Fallback (bucket absent / pas auth) : preview local ObjectURL + warning toast
 *  - Aperçus en grille avec bouton suppression
 *
 * Note : pas de persistence DB (pas de table photos en schéma actuel).
 * Le bucket `media` doit exister Supabase Storage côté projet — sinon
 * on bascule en mode preview-only sans rien casser.
 */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, ImagePlus, Loader2, Trash2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

export type PhotoKind = "before" | "after";

interface PhotoUploadProps {
  interventionId: string;
  kind: PhotoKind;
  label?: string;
  className?: string;
}

interface UploadedPhoto {
  id: string;
  url: string;
  /** true si stockée uniquement en local (ObjectURL) */
  local: boolean;
}

const BUCKET = "media";

export function PhotoUpload({
  interventionId,
  kind,
  label,
  className,
}: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [uploading, setUploading] = useState(false);

  const heading = label ?? (kind === "before" ? "Avant" : "Après");

  // Cleanup ObjectURLs au unmount
  useEffect(() => {
    return () => {
      photos.forEach((p) => {
        if (p.local && p.url.startsWith("blob:")) URL.revokeObjectURL(p.url);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);

    const newOnes: UploadedPhoto[] = [];
    let usedFallback = false;

    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop() || "jpg";
      const id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const path = `interventions/${interventionId}/${kind}/${id}.${ext}`;

      let uploadedUrl: string | null = null;

      if (supabase) {
        try {
          const { error: upErr } = await supabase.storage
            .from(BUCKET)
            .upload(path, file, {
              contentType: file.type,
              upsert: false,
            });
          if (!upErr) {
            const { data: pub } = supabase.storage
              .from(BUCKET)
              .getPublicUrl(path);
            if (pub?.publicUrl) {
              uploadedUrl = pub.publicUrl;
            }
          } else {
            usedFallback = true;
          }
        } catch {
          usedFallback = true;
        }
      } else {
        usedFallback = true;
      }

      newOnes.push({
        id,
        url: uploadedUrl ?? URL.createObjectURL(file),
        local: !uploadedUrl,
      });
    }

    setPhotos((prev) => [...prev, ...newOnes]);
    setUploading(false);

    if (newOnes.length > 0) {
      if (usedFallback) {
        toast.warning("Aperçu local seulement", {
          description:
            "Le stockage cloud n'est pas accessible — vos photos sont visibles ici uniquement.",
        });
      } else {
        toast.success(
          `${newOnes.length} photo${newOnes.length > 1 ? "s" : ""} ajoutée${newOnes.length > 1 ? "s" : ""}`,
          {
            description: `Section « ${heading.toLowerCase()} » mise à jour.`,
          }
        );
      }
    }

    if (inputRef.current) inputRef.current.value = "";
  };

  const handleRemove = (id: string) => {
    setPhotos((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target?.local && target.url.startsWith("blob:")) {
        URL.revokeObjectURL(target.url);
      }
      return prev.filter((p) => p.id !== id);
    });
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
          <Camera size={11} /> {heading}
        </p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/4 px-2 py-1 text-[10px] font-semibold text-zinc-300 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50"
        >
          {uploading ? (
            <Loader2 size={10} className="animate-spin" />
          ) : (
            <Upload size={10} />
          )}
          Ajouter
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        onChange={(e) => handleSelect(e.target.files)}
      />

      {photos.length === 0 ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex aspect-video w-full flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-zinc-950/50 text-center transition-colors hover:border-joel-mauve/40 hover:bg-zinc-950/70 disabled:opacity-50"
        >
          <ImagePlus size={20} className="text-zinc-600" />
          <p className="mt-1.5 text-[11px] font-medium text-zinc-400">
            Cliquez pour ajouter
          </p>
          <p className="text-[10px] text-zinc-600">JPG, PNG · plusieurs au choix</p>
        </button>
      ) : (
        <div className="grid grid-cols-3 gap-1.5">
          <AnimatePresence initial={false}>
            {photos.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.18 }}
                className="group relative aspect-square overflow-hidden rounded-lg border border-white/10 bg-zinc-950"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.url}
                  alt={heading}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
                {p.local && (
                  <span className="absolute left-1 top-1 rounded-full bg-amber-400/80 px-1.5 py-0.5 text-[8px] font-bold text-zinc-900">
                    Local
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => handleRemove(p.id)}
                  className="absolute right-1 top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500/85 text-white opacity-0 transition-opacity hover:bg-red-500 group-hover:opacity-100"
                  aria-label="Supprimer"
                >
                  <X size={11} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex aspect-square flex-col items-center justify-center rounded-lg border border-dashed border-white/10 bg-zinc-950/40 text-zinc-500 transition-colors hover:border-joel-mauve/40 hover:text-joel-mauve disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <ImagePlus size={14} />
            )}
            <span className="mt-1 text-[9px] font-semibold">Plus</span>
          </button>
        </div>
      )}

      {photos.some((p) => p.local) && (
        <p className="flex items-center gap-1 text-[10px] text-amber-300/80">
          <Trash2 size={9} /> Photos locales — non envoyées au cloud
        </p>
      )}
    </div>
  );
}
