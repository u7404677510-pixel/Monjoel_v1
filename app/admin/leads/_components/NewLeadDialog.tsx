"use client";

/**
 * NewLeadDialog — modal "+ Nouveau lead". Création manuelle (admin onboard).
 * Champs : problème, métier, CP, téléphone, source, notes.
 * Après save : invalidate + toast + close.
 */

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/toast";
import { useCreateLead } from "@/lib/hooks/leads-queries";
import { TRADES_LIST } from "./shared";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewLeadDialog({ open, onOpenChange }: Props) {
  const [form, setForm] = useState({
    problem_label: "",
    trade: "Plomberie",
    postal_code: "",
    phone: "",
    source: "manuel",
    notes: "",
  });
  const createLead = useCreateLead();

  const reset = () =>
    setForm({
      problem_label: "",
      trade: "Plomberie",
      postal_code: "",
      phone: "",
      source: "manuel",
      notes: "",
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.problem_label || !form.phone) {
      toast.error("Problème et téléphone requis");
      return;
    }
    try {
      await createLead.mutateAsync({
        problem: form.problem_label,
        problem_label: form.problem_label,
        trade: form.trade,
        postal_code: form.postal_code,
        phone: form.phone,
        source: form.source || "manuel",
        status: "new",
        notes: form.notes || null,
      });
      toast.success("Lead créé");
      reset();
      onOpenChange(false);
    } catch (e) {
      toast.error("Échec : " + (e as Error).message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Nouveau lead</DialogTitle>
          <DialogDescription>
            Saisir un lead reçu hors-site (téléphone, e-mail, recommandation…).
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-700">
              Problème *
            </label>
            <Input
              value={form.problem_label}
              onChange={(e) =>
                setForm({ ...form, problem_label: e.target.value })
              }
              placeholder="Ex: Fuite d'eau cuisine"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700">
                Métier *
              </label>
              <Select
                value={form.trade}
                onValueChange={(v) => setForm({ ...form, trade: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TRADES_LIST.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700">
                Code postal
              </label>
              <Input
                value={form.postal_code}
                onChange={(e) =>
                  setForm({ ...form, postal_code: e.target.value })
                }
                placeholder="75001"
                maxLength={5}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-700">
              Téléphone *
            </label>
            <Input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="06 12 34 56 78"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-700">
              Source
            </label>
            <Input
              value={form.source}
              onChange={(e) => setForm({ ...form, source: e.target.value })}
              placeholder="manuel, téléphone, recommandation…"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-700">
              Notes (optionnel)
            </label>
            <Textarea
              rows={3}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Contexte, urgence, disponibilités…"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button type="submit" loading={createLead.isPending}>
              Créer le lead
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
