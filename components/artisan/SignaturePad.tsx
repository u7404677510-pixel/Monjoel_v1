"use client";

/**
 * SignaturePad — canvas signature simple (pas de package externe).
 *
 * Fonctionnalités :
 *  - Drag/touch pour signer (pointer events → support souris + tactile + stylet)
 *  - Bouton "Effacer" : reset du canvas
 *  - Bouton "Enregistrer" : conversion en base64 dataURL + stockage localStorage
 *    sous la clé `joel_signature_{interventionId}` + toast success
 *  - Si signature déjà enregistrée pour cet ID → affichage de l'image stockée
 *    avec un bouton "Recommencer"
 *
 * Pas d'envoi serveur — c'est un placeholder fonctionnel, la persistence
 * réelle viendra plus tard (Storage bucket dédié).
 */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Eraser, PenLine, Save, Sparkles, RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface SignaturePadProps {
  interventionId: string;
  className?: string;
}

const STORAGE_KEY = (id: string) => `joel_signature_${id}`;

export function SignaturePad({ interventionId, className }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const [hasInk, setHasInk] = useState(false);
  const [savedDataUrl, setSavedDataUrl] = useState<string | null>(null);

  // Charger la signature stockée au mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const v = window.localStorage.getItem(STORAGE_KEY(interventionId));
      if (v) setSavedDataUrl(v);
    } catch {
      /* mode privé strict */
    }
  }, [interventionId]);

  // Init canvas backing store (HiDPI)
  useEffect(() => {
    if (savedDataUrl) return; // pas de canvas si on affiche l'image stockée
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#f5d547"; // joel-yellow pour contraste sur dark
    ctx.lineWidth = 2.5;
  }, [savedDataUrl]);

  const getPoint = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);
    drawingRef.current = true;
    lastPointRef.current = getPoint(e);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx || !lastPointRef.current) return;
    const p = getPoint(e);
    ctx.beginPath();
    ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    lastPointRef.current = p;
    if (!hasInk) setHasInk(true);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    drawingRef.current = false;
    lastPointRef.current = null;
    const canvas = canvasRef.current;
    if (canvas) {
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    }
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasInk(false);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasInk) {
      toast.error("Signature vide", {
        description: "Faites signer le client avant d'enregistrer.",
      });
      return;
    }
    const dataUrl = canvas.toDataURL("image/png");
    try {
      window.localStorage.setItem(STORAGE_KEY(interventionId), dataUrl);
    } catch {
      toast.warning("Stockage indisponible", {
        description: "La signature n'a pas pu être sauvegardée localement.",
      });
      return;
    }
    setSavedDataUrl(dataUrl);
    toast.success("Signature enregistrée", {
      description: "Conservée localement pour cette mission.",
    });
  };

  const handleRedo = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY(interventionId));
    } catch {
      /* ignore */
    }
    setSavedDataUrl(null);
    setHasInk(false);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <AnimatePresence mode="wait" initial={false}>
        {savedDataUrl ? (
          <motion.div
            key="saved"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative overflow-hidden rounded-xl border border-emerald-400/30 bg-joel-yellow/5"
          >
            <img
              src={savedDataUrl}
              alt="Signature enregistrée"
              className="h-32 w-full object-contain bg-zinc-950/40"
            />
            <div className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full border border-emerald-400/40 bg-joel-yellow/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-200">
              <Sparkles size={10} /> Enregistrée
            </div>
            <button
              type="button"
              onClick={handleRedo}
              className="flex w-full items-center justify-center gap-1.5 border-t border-white/5 bg-zinc-950/40 px-3 py-2 text-[11px] font-semibold text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              <RefreshCcw size={11} /> Recommencer
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="pad"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-zinc-950/60">
              <canvas
                ref={canvasRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onPointerLeave={handlePointerUp}
                className="block h-32 w-full touch-none cursor-crosshair"
                style={{ touchAction: "none" }}
              />
              {!hasInk && (
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1 text-zinc-500">
                  <PenLine size={18} />
                  <p className="text-[11px] font-medium">
                    Signez ici (souris ou tactile)
                  </p>
                </div>
              )}
              <div className="absolute bottom-1.5 left-3 h-px w-[calc(100%-1.5rem)] bg-white/10" />
            </div>
            <div className="mt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={handleClear}
                disabled={!hasInk}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/4 px-3 py-1.5 text-[11px] font-semibold text-zinc-300 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Eraser size={11} /> Effacer
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={!hasInk}
                className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-joel-mauve px-3 py-1.5 text-[11px] font-semibold text-white shadow-[0_4px_12px_-4px_rgba(158,118,236,0.5)] transition-colors hover:bg-joel-mauve/90 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
              >
                <Save size={11} /> Enregistrer
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
