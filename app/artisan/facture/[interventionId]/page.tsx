/**
 * Facture imprimable — `/artisan/facture/{interventionId}` (Server Component).
 *
 * SÉCURITÉ (autorisation, pas seulement authentification) :
 *  - Le proxy (middleware) garantit déjà qu'un visiteur NON authentifié ne
 *    peut pas atteindre cette page (sous-route /artisan/* → session requise).
 *  - Ici on revérifie la session via getUser() (JWT revalidé) PUIS on s'assure
 *    que l'intervention appartient bien à l'artisan connecté :
 *      1. lookup du profil artisan par email de session (RLS artisan_read_own) ;
 *      2. lecture de l'intervention par id + filtre explicite artisan_id, en plus
 *         de la RLS `artisan_read_own_interventions`.
 *  - L'ancien fallback « lead.id direct » (mode démo) est SUPPRIMÉ : il
 *    permettait à n'importe quel artisan d'afficher la fiche (téléphone, code
 *    postal, problème) de n'importe quel lead en devinant un id.
 *
 * La donnée est calculée côté serveur : seule la facture possédée est envoyée
 * au navigateur (composant client FactureView, purement présentation/impression).
 */

import { getSupabaseServer } from "@/lib/supabase-server";
import { FactureView, type InvoiceData } from "./FactureView";

// Jamais prérendue : dépend de la session de l'artisan connecté.
export const dynamic = "force-dynamic";

// Estimation TTC par métier quand l'intervention n'a pas de prix saisi.
const TRADE_ESTIMATE: Record<string, number> = {
  Plomberie: 180,
  Serrurerie: 220,
  Électricité: 200,
};

export default async function FacturePage({
  params,
}: {
  params: Promise<{ interventionId: string }>;
}) {
  const { interventionId } = await params;

  const supabase = await getSupabaseServer();
  if (!supabase) {
    return <FactureView error="Service indisponible." />;
  }

  // 1) Session serveur — getUser() revalide le JWT auprès de Supabase
  //    (≠ confiance aveugle au contenu d'un cookie).
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) {
    return <FactureView error="Accès non autorisé." />;
  }

  // 2) Profil artisan rattaché au compte connecté.
  const { data: artisan } = await supabase
    .from("artisans")
    .select("id")
    .eq("email", user.email)
    .maybeSingle();
  if (!artisan) {
    return <FactureView error="Accès réservé aux artisans du réseau." />;
  }

  // 3) Intervention demandée — DOIT appartenir à cet artisan.
  //    RLS (artisan_read_own_interventions) + filtre explicite artisan_id =
  //    défense en profondeur.
  const { data: iv } = await supabase
    .from("interventions")
    .select(
      "id, trade, price, notes, address, postal_code, completed_at, created_at, lead_id",
    )
    .eq("id", interventionId)
    .eq("artisan_id", artisan.id)
    .maybeSingle();

  if (!iv) {
    // Inexistante OU pas la sienne → message neutre (pas d'énumération d'ids).
    return <FactureView error="Facture introuvable." />;
  }

  // 4) Enrichissement client via le lead lié à SON intervention uniquement.
  let problemLabel: string | null = null;
  let clientPhone: string | null = null;
  let postalCode: string | null = iv.postal_code ?? null;
  if (iv.lead_id) {
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

  const estimate = (iv.trade && TRADE_ESTIMATE[iv.trade]) || 180;
  const data: InvoiceData = {
    reference: `FAC-${String(iv.id).slice(0, 8).toUpperCase()}`,
    date: new Date(iv.completed_at || iv.created_at).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    trade: iv.trade || "Intervention",
    description: problemLabel || iv.trade || "Intervention",
    notes: iv.notes ?? null,
    amountTtc:
      typeof iv.price === "number" && iv.price > 0 ? iv.price : estimate,
    postal_code: postalCode,
    address: iv.address ?? null,
    client_phone: clientPhone,
  };

  return <FactureView data={data} />;
}
