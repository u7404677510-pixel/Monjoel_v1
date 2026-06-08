/**
 * POST /api/admin/dispatch — Dispatch R6 (assignation lead → artisan).
 *
 * Crée une `intervention` (service_role → fiable, bypass RLS), passe le lead en
 * "converted" + l'artisan en "on_intervention", trace l'audit, et NOTIFIE
 * l'artisan (email Resend + WhatsApp Business si configuré). Notifications
 * non bloquantes : un échec d'envoi ne fait pas échouer le dispatch.
 *
 * Sécurité : la route est déjà gardée par le proxy (/api/admin → session admin
 * + allowlist). On revalide ici en défense en profondeur (getUser + allowlist).
 *
 * Body : { lead_id, artisan_id, scheduled_at?, status?, notes? }
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import * as Sentry from "@sentry/nextjs";
import { getSupabaseServer } from "@/lib/supabase-server";
import { isAllowedAdminEmail } from "@/lib/admin-auth";
import { sendEmail, sendWhatsApp, escapeHtml, toInternationalPhone } from "@/lib/notifications";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function serviceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function POST(request: NextRequest) {
  // ── Auth (défense en profondeur — le proxy garde déjà /api/admin) ──
  const authed = await getSupabaseServer();
  if (!authed) {
    return NextResponse.json({ error: "Supabase non configuré" }, { status: 503 });
  }
  const {
    data: { user },
  } = await authed.auth.getUser();
  if (!isAllowedAdminEmail(user?.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = serviceClient();
  if (!db) {
    return NextResponse.json(
      { error: "SUPABASE_SERVICE_ROLE_KEY manquant côté serveur" },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as {
    lead_id?: string;
    artisan_id?: string;
    scheduled_at?: string | null;
    status?: string;
    notes?: string | null;
  };
  const { lead_id, artisan_id } = body;
  if (!lead_id || !artisan_id) {
    return NextResponse.json(
      { error: "lead_id et artisan_id sont requis" },
      { status: 400 },
    );
  }

  // ── Récupère lead + artisan (valeurs autoritatives côté serveur + notif) ──
  const [{ data: lead }, { data: artisan }] = await Promise.all([
    db.from("leads").select("*").eq("id", lead_id).maybeSingle(),
    db.from("artisans").select("*").eq("id", artisan_id).maybeSingle(),
  ]);
  if (!lead) return NextResponse.json({ error: "Lead introuvable" }, { status: 404 });
  if (!artisan) return NextResponse.json({ error: "Artisan introuvable" }, { status: 404 });

  const scheduledAt = body.scheduled_at ?? null;
  const status = body.status ?? (scheduledAt ? "scheduled" : "pending");

  // ── 1) Création de l'intervention (source de vérité) ──
  const { data: intervention, error: ivErr } = await db
    .from("interventions")
    .insert({
      lead_id,
      artisan_id,
      trade: lead.trade ?? null,
      scheduled_at: scheduledAt,
      status,
      urgency: lead.urgency ?? "urgent",
      postal_code: lead.postal_code ?? null,
      notes: body.notes ?? null,
    })
    .select("*")
    .single();
  if (ivErr) {
    Sentry.captureException(ivErr, { tags: { route: "dispatch", step: "insert" } });
    return NextResponse.json({ error: ivErr.message }, { status: 500 });
  }

  const artisanName = `${artisan.first_name} ${artisan.last_name}`.trim();

  // ── 2) Effets de bord best-effort (lead converti, artisan occupé, audit) ──
  const nowIso = new Date().toISOString();
  await Promise.allSettled([
    db.from("leads").update({ status: "converted", updated_at: nowIso }).eq("id", lead_id),
    db.from("artisans").update({ status: "on_intervention", updated_at: nowIso }).eq("id", artisan_id),
    db.from("audit_logs").insert([
      {
        entity_type: "intervention",
        entity_id: intervention.id,
        action: "created",
        actor: user?.email ?? "admin",
        metadata: { lead_id, artisan_id, trade: lead.trade ?? null },
      },
      {
        entity_type: "lead",
        entity_id: lead_id,
        action: "assigned",
        actor: user?.email ?? "admin",
        metadata: { artisan: artisanName, intervention_id: intervention.id, scheduled_at: scheduledAt },
      },
    ]),
  ]);

  // ── 3) Notifier l'artisan (non bloquant) ──
  const whenLabel = scheduledAt
    ? new Date(scheduledAt).toLocaleString("fr-FR")
    : "Dès que possible";
  const problem = lead.problem_label ?? lead.problem ?? "Intervention";
  const message =
    `🔧 Nouvelle mission MonJoel\n\n` +
    `${problem}${lead.trade ? " · " + lead.trade : ""}\n` +
    `📍 ${lead.postal_code ?? "—"}\n` +
    `📞 Client : ${lead.phone ?? "—"}\n` +
    `🗓️ ${whenLabel}\n\n` +
    `Connecte-toi à ton espace artisan pour accepter la mission.`;

  const waPhone = toInternationalPhone(artisan.phone);
  const notif = await Promise.allSettled([
    waPhone ? sendWhatsApp({ to: waPhone, message }) : Promise.resolve(false),
    artisan.email
      ? sendEmail({
          to: artisan.email,
          subject: `Nouvelle mission ${lead.trade ?? ""} — ${lead.postal_code ?? ""}`.trim(),
          html:
            `<p>Bonjour ${escapeHtml(artisan.first_name)},</p>` +
            `<p>Une nouvelle mission vous est assignée :</p>` +
            `<p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
        })
      : Promise.resolve(false),
  ]);
  notif.forEach((r, i) => {
    if (r.status === "rejected") {
      Sentry.captureException(r.reason, {
        tags: { route: "dispatch", channel: i === 0 ? "whatsapp" : "email" },
      });
    }
  });

  return NextResponse.json({
    ok: true,
    intervention,
    notified: {
      whatsapp: notif[0].status === "fulfilled" && notif[0].value === true,
      email: notif[1].status === "fulfilled" && notif[1].value === true,
    },
  });
}
