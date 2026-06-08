/**
 * notifications — helpers d'envoi (email Resend + WhatsApp) réutilisables côté
 * SERVEUR uniquement (utilise des secrets : RESEND_API_KEY, WHATSAPP_*).
 *
 * NE PAS importer depuis un composant client (bundlerait Resend + secrets).
 * Destiné aux route handlers (ex. app/api/admin/dispatch/route.ts).
 *
 * Chaque fonction renvoie `true` si envoyé, `false` si le canal n'est pas
 * configuré (no-op gracieux), et THROW en cas d'erreur réelle d'envoi — pour
 * que l'appelant puisse remonter l'échec à Sentry sans bloquer le flux.
 */

import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

/** Échappe les valeurs issues de saisies pour une insertion HTML sûre. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<boolean> {
  if (!resend) {
    console.warn("⚠️ Resend non configuré — email ignoré");
    return false;
  }
  const from = process.env.RESEND_FROM_EMAIL || "Joël <onboarding@resend.dev>";
  const { error } = await resend.emails.send({
    from,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    ...(opts.replyTo ? { replyTo: opts.replyTo } : {}),
  });
  if (error) throw new Error(`Resend error: ${error.message}`);
  return true;
}

/**
 * WhatsApp via l'API Business officielle (envoi vers un numéro ARBITRAIRE, ex.
 * l'artisan). On n'utilise volontairement PAS CallMeBot ici : CallMeBot ne peut
 * écrire qu'à un numéro pré-enregistré (l'équipe), pas à un artisan quelconque.
 * Sans WHATSAPP_BUSINESS_TOKEN/PHONE_ID → no-op (l'appelant retombera sur l'email).
 *
 * `to` = numéro au format international sans '+', ex. "33612345678".
 */
export async function sendWhatsApp(opts: {
  to: string;
  message: string;
}): Promise<boolean> {
  const token = process.env.WHATSAPP_BUSINESS_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;
  if (!token || !phoneId) {
    console.warn("⚠️ WhatsApp Business API non configurée — WhatsApp ignoré");
    return false;
  }
  const res = await fetch(
    `https://graph.facebook.com/v18.0/${phoneId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: opts.to,
        type: "text",
        text: { body: opts.message },
      }),
    },
  );
  if (!res.ok) {
    throw new Error(`WhatsApp API error: ${res.status} ${await res.text()}`);
  }
  return true;
}

/** Normalise un numéro FR en format international sans '+' pour WhatsApp. */
export function toInternationalPhone(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const digits = raw.replace(/\D/g, "");
  if (!digits) return null;
  if (digits.startsWith("33")) return digits;
  if (digits.startsWith("0")) return "33" + digits.slice(1);
  return digits;
}
