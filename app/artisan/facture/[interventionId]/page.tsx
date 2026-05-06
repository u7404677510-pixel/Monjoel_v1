"use client";

/**
 * Facture imprimable — `/artisan/facture/{interventionId}`.
 *
 * Affiche un mini PDF stylé de la facture, prêt à imprimer (Cmd/Ctrl+P).
 * Le navigateur convertit en PDF via "Enregistrer en PDF".
 *
 * Approche :
 *  - Page rendue en overlay `fixed inset-0` (z-index élevé) pour cacher
 *    visuellement la ArtisanShell dark héritée du layout parent.
 *  - En `@media print`, on neutralise le wrapping shell parent (via `<style jsx global>`).
 *
 * Data :
 *  - Charge l'intervention depuis Supabase (table `interventions` + jointure leads).
 *  - Fallback sur leads si l'ID matche un lead.id (mode démo).
 */

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Printer } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface InvoiceData {
  reference: string;
  date: string;
  trade: string;
  description: string;
  notes: string | null;
  amountTtc: number;
  postal_code: string | null;
  address: string | null;
  client_phone: string | null;
}

export default function FacturePage() {
  const params = useParams<{ interventionId: string }>();
  const router = useRouter();
  const id = params?.interventionId;

  const [data, setData] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    const load = async () => {
      if (!supabase) {
        setError("Service indisponible.");
        setLoading(false);
        return;
      }
      try {
        // 1. Tenter la table `interventions`
        const { data: iv } = await supabase
          .from("interventions")
          .select("*")
          .eq("id", id)
          .maybeSingle();

        let problemLabel: string | null = null;
        let postalCode: string | null = iv?.postal_code ?? null;
        let address: string | null = iv?.address ?? null;
        let clientPhone: string | null = null;

        if (iv?.lead_id) {
          const { data: lead } = await supabase
            .from("leads")
            .select("problem_label, postal_code, phone")
            .eq("id", iv.lead_id)
            .maybeSingle();
          if (lead) {
            problemLabel = lead.problem_label ?? null;
            postalCode = postalCode ?? lead.postal_code ?? null;
            clientPhone = lead.phone ?? null;
          }
        }

        // 2. Fallback : si pas trouvé, c'est peut-être un lead.id direct (mode démo)
        if (!iv) {
          const { data: lead } = await supabase
            .from("leads")
            .select("*")
            .eq("id", id)
            .maybeSingle();
          if (cancelled) return;
          if (!lead) {
            setError("Intervention introuvable.");
            setLoading(false);
            return;
          }

          // Estimation par trade
          const estimate =
            lead.trade === "Plomberie"
              ? 180
              : lead.trade === "Serrurerie"
                ? 220
                : lead.trade === "Électricité"
                  ? 200
                  : 180;

          setData({
            reference: `FAC-${lead.id.slice(0, 8).toUpperCase()}`,
            date: new Date(lead.updated_at || lead.created_at).toLocaleDateString(
              "fr-FR",
              { day: "numeric", month: "long", year: "numeric" }
            ),
            trade: lead.trade || "Intervention",
            description: lead.problem_label || "Intervention",
            notes: lead.notes ?? null,
            amountTtc: estimate,
            postal_code: lead.postal_code ?? null,
            address: null,
            client_phone: lead.phone ?? null,
          });
          setLoading(false);
          return;
        }

        if (cancelled) return;
        const fallbackEstimate =
          iv.trade === "Plomberie"
            ? 180
            : iv.trade === "Serrurerie"
              ? 220
              : iv.trade === "Électricité"
                ? 200
                : 180;

        setData({
          reference: `FAC-${iv.id.slice(0, 8).toUpperCase()}`,
          date: new Date(iv.completed_at || iv.created_at).toLocaleDateString(
            "fr-FR",
            { day: "numeric", month: "long", year: "numeric" }
          ),
          trade: iv.trade || "Intervention",
          description: problemLabel || iv.trade || "Intervention",
          notes: iv.notes ?? null,
          amountTtc:
            typeof iv.price === "number" && iv.price > 0
              ? iv.price
              : fallbackEstimate,
          postal_code: postalCode,
          address: address,
          client_phone: clientPhone,
        });
        setLoading(false);
      } catch (e) {
        if (cancelled) return;
        setError("Erreur de chargement.");
        setLoading(false);
        console.warn("[facture] load error", e);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <div className="fixed inset-0 z-9999 overflow-y-auto bg-white text-zinc-900 print:relative print:inset-auto print:overflow-visible">
      {/* Print-friendly global resets */}
      <style jsx global>{`
        @media print {
          header, nav, .no-print {
            display: none !important;
          }
          body {
            background: white !important;
            color: black !important;
          }
          @page {
            margin: 16mm;
          }
        }
      `}</style>

      {/* Top bar (no-print) */}
      <div className="no-print sticky top-0 z-10 flex items-center justify-between border-b border-zinc-200 bg-white/95 px-6 py-3 backdrop-blur-md">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50"
        >
          <ArrowLeft size={13} /> Retour
        </button>
        <p className="text-xs font-medium text-zinc-500">
          Facture imprimable — utilisez « Imprimer » pour enregistrer en PDF.
        </p>
        <button
          onClick={() => window.print()}
          disabled={!data}
          className="inline-flex items-center gap-1.5 rounded-lg bg-joel-violet px-3 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-joel-violet/90 disabled:opacity-50"
        >
          <Printer size={13} /> Imprimer / PDF
        </button>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-10 sm:py-14">
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={26} className="animate-spin text-joel-violet" />
          </div>
        )}

        {!loading && error && (
          <div className="mx-auto max-w-md rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && data && (
          <InvoiceDocument data={data} />
        )}
      </div>
    </div>
  );
}

function InvoiceDocument({ data }: { data: InvoiceData }) {
  const tva = +(data.amountTtc * 0.2).toFixed(2);
  const ht = +(data.amountTtc - tva).toFixed(2);

  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-xs print:rounded-none print:border-0 print:p-0 print:shadow-none">
      {/* Header */}
      <header className="flex items-start justify-between border-b border-zinc-200 pb-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-joel-violet">
            Facture
          </p>
          <h1 className="font-display text-3xl font-bold text-zinc-900">
            {data.reference}
          </h1>
          <p className="mt-1 text-sm text-zinc-500">{data.date}</p>
        </div>
        <div className="text-right">
          <p className="font-display text-lg font-bold text-zinc-900">
            Joël Artisans
          </p>
          <p className="text-xs text-zinc-500">Réseau d&apos;artisans IDF</p>
          <p className="mt-2 text-xs text-zinc-600">contact@joelartisans.fr</p>
          <p className="text-xs text-zinc-600">01 41 69 10 08</p>
        </div>
      </header>

      {/* Client / Adresse */}
      <section className="grid grid-cols-1 gap-6 py-6 sm:grid-cols-2">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
            Adresse intervention
          </p>
          <p className="mt-1 text-sm text-zinc-800">
            {data.address || "Adresse non communiquée"}
          </p>
          <p className="text-sm text-zinc-500">
            {data.postal_code || "Code postal —"}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
            Contact
          </p>
          <p className="mt-1 text-sm text-zinc-800">
            {data.client_phone || "—"}
          </p>
        </div>
      </section>

      {/* Détail */}
      <section className="border-t border-zinc-200 pt-6">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
          Détail prestation
        </p>
        <table className="mt-3 w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 text-left text-xs text-zinc-500">
              <th className="py-2 font-semibold">Description</th>
              <th className="py-2 text-right font-semibold">Montant HT</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-100">
              <td className="py-3 align-top text-zinc-800">
                <p className="font-medium">{data.description}</p>
                <p className="mt-0.5 text-xs text-zinc-500">{data.trade}</p>
                {data.notes && (
                  <p className="mt-1 whitespace-pre-line text-xs text-zinc-500">
                    {data.notes}
                  </p>
                )}
              </td>
              <td className="py-3 align-top text-right tabular-nums text-zinc-800">
                {ht.toFixed(2)} €
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Totaux */}
      <section className="mt-6 ml-auto w-full max-w-xs space-y-1 text-sm">
        <div className="flex justify-between text-zinc-600">
          <span>Sous-total HT</span>
          <span className="tabular-nums">{ht.toFixed(2)} €</span>
        </div>
        <div className="flex justify-between text-zinc-600">
          <span>TVA 20%</span>
          <span className="tabular-nums">{tva.toFixed(2)} €</span>
        </div>
        <div className="flex justify-between border-t border-zinc-300 pt-2 font-display text-lg font-bold text-joel-violet">
          <span>Total TTC</span>
          <span className="tabular-nums">{data.amountTtc.toFixed(2)} €</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-10 border-t border-dashed border-zinc-200 pt-4 text-center text-[10px] text-zinc-400">
        <p>Document de référence — Joël Artisans</p>
        <p>
          Le réseau d&apos;artisans de confiance d&apos;Île-de-France ·
          contact@joelartisans.fr · 01 41 69 10 08
        </p>
      </footer>
    </article>
  );
}
