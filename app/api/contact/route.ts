import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import * as Sentry from "@sentry/nextjs";
import { checkRateLimit } from "@/lib/rate-limit";

// Cette route manipule la clé service_role (secret serveur) : jamais sur l'edge,
// jamais mise en cache.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ============================================
// Configuration
// ============================================
const NOTIFICATION_EMAIL = "contact@monjoel.fr";
const FALLBACK_PHONE = "0141691008";
const FALLBACK_PHONE_DISPLAY = "01 41 69 10 08";

// Resend client (null si non configuré → on skip l'email sans planter)
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const REQUEST_TYPE_LABELS = {
  question: "Question avant intervention",
  reclamation: "Réclamation post-intervention",
  recrutement: "Recrutement artisan",
  presse: "Presse / partenariat",
  autre: "Autre",
} as const;

type RequestType = keyof typeof REQUEST_TYPE_LABELS;

interface ContactRequest {
  name: string;
  email: string;
  requestType: RequestType;
  subject: string;
  message: string;
}

// ============================================
// Client Supabase service_role (bypass RLS, serveur uniquement)
// ============================================
// On NE réutilise PAS lib/supabase.getSupabaseClient() ici : ce dernier est
// construit avec la clé ANON publique. L'insert d'un lead doit passer par la
// clé service_role pour pouvoir écrire même avec RLS activé sur la table.
function getServiceSupabaseClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    console.warn(
      "⚠️ Supabase service-role non configuré (SUPABASE_SERVICE_ROLE_KEY manquant), skip de la sauvegarde DB"
    );
    return null;
  }

  return createClient(url, serviceKey, { auth: { persistSession: false } });
}

// ============================================
// Échappement HTML (les valeurs viennent d'un formulaire public)
// ============================================
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ============================================
// Notification Email via Resend
// → priorité haute + objet distinct pour les réclamations
// Retourne true si un email a réellement été envoyé, false si Resend non configuré.
// ============================================
async function sendEmailNotification(data: ContactRequest): Promise<boolean> {
  if (!resend) {
    console.warn("⚠️ Resend non configuré, skip de la notification email");
    return false;
  }

  const isUrgent = data.requestType === "reclamation";
  const typeLabel = REQUEST_TYPE_LABELS[data.requestType];

  const headerGradient = isUrgent
    ? "linear-gradient(135deg, #DC2626, #EF4444)"
    : "linear-gradient(135deg, #7055A7, #9E76EC)";
  const accent = isUrgent ? "#DC2626" : "#7055A7";
  const headerTitle = isUrgent
    ? "🔴 Réclamation post-intervention"
    : "📩 Nouveau message de contact";

  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safeSubject = escapeHtml(data.subject);
  const safeMessage = escapeHtml(data.message).replace(/\n/g, "<br>");

  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: ${headerGradient}; color: white; padding: 20px; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: ${accent}; }
    .value { font-size: 16px; }
    .badge { background: ${accent}; color: white; padding: 6px 16px; border-radius: 20px; font-weight: bold; display: inline-block; font-size: 14px; }
    .urgent-note { background: #FEF2F2; border-left: 4px solid #DC2626; padding: 12px 16px; border-radius: 6px; margin-bottom: 16px; color: #991B1B; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">${headerTitle}</h1>
      <p style="margin: 5px 0 0 0; opacity: 0.9;">Via monjoel.fr/contact</p>
    </div>
    <div class="content">
      ${isUrgent ? `<div class="urgent-note">⚠️ Réclamation — à traiter en priorité (SAV Lun-Sam 8h-20h).</div>` : ""}
      <p class="badge">${typeLabel}</p>

      <div class="field">
        <div class="label">👤 Nom</div>
        <div class="value">${safeName}</div>
      </div>

      <div class="field">
        <div class="label">📧 Email</div>
        <div class="value"><a href="mailto:${safeEmail}">${safeEmail}</a></div>
      </div>

      <div class="field">
        <div class="label">📝 Sujet</div>
        <div class="value">${safeSubject}</div>
      </div>

      <div class="field">
        <div class="label">💬 Message</div>
        <div class="value">${safeMessage}</div>
      </div>

      <div class="field">
        <div class="label">⏰ Date/Heure</div>
        <div class="value">${new Date().toLocaleString("fr-FR")}</div>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  const fromEmail = process.env.RESEND_FROM_EMAIL || "Joël <onboarding@resend.dev>";

  const subjectPrefix = isUrgent ? "🔴 RÉCLAMATION" : `📩 ${typeLabel}`;

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: NOTIFICATION_EMAIL,
    subject: `${subjectPrefix} — ${data.subject} — ${data.name}`,
    html: emailHtml,
    replyTo: data.email,
    // Priorité haute (clients mail) pour les réclamations.
    ...(isUrgent
      ? {
          headers: {
            "X-Priority": "1",
            "X-MSMail-Priority": "High",
            Importance: "high",
          },
        }
      : {}),
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }

  console.log(`✅ Contact email notification sent via Resend (${data.requestType})`);
  return true;
}

// ============================================
// Sauvegarde dans Supabase (table contact_messages)
// Retourne true si une ligne a été insérée, false si Supabase non configuré.
// ============================================
async function saveToSupabase(
  supabase: SupabaseClient | null,
  data: ContactRequest
): Promise<boolean> {
  if (!supabase) {
    console.warn("⚠️ Supabase non configuré, skip de la sauvegarde contact_messages");
    return false;
  }

  const { error } = await supabase.from("contact_messages").insert([
    {
      name: data.name,
      email: data.email,
      request_type: data.requestType,
      subject: data.subject,
      message: data.message,
      status: "new",
    },
  ]);

  if (error) {
    throw new Error(`Supabase error: ${error.message}`);
  }

  console.log("✅ Contact message saved to Supabase");
  return true;
}

// ============================================
// Miroir best-effort : une candidature "recrutement" reçue via le formulaire
// de contact est aussi poussée dans recruitment_applications pour atterrir
// dans le pipeline admin recrutement (/admin/recrutement).
// Le formulaire contact ne collecte pas téléphone/métiers/zone : on insère ce
// qu'on a, le reste en valeurs vides. Best-effort → toute erreur est avalée par
// le Promise.allSettled appelant (ne bloque jamais le canal contact principal).
// ============================================
async function mirrorToRecruitment(
  supabase: SupabaseClient | null,
  data: ContactRequest
): Promise<boolean> {
  if (!supabase) return false;

  const parts = data.name.trim().split(/\s+/);
  const firstName = parts[0] || data.name.trim();
  const lastName = parts.slice(1).join(" ") || "—";

  const { error } = await supabase.from("recruitment_applications").insert([
    {
      first_name: firstName,
      last_name: lastName,
      email: data.email,
      phone: "",
      trades: [],
      zone: "",
      message: `[Reçu via le formulaire de contact — objet : ${data.subject}]\n\n${data.message}`,
      status: "new",
    },
  ]);

  if (error) {
    throw new Error(`Supabase recruitment mirror error: ${error.message}`);
  }

  console.log("✅ Recrutement (via contact) mirrored to recruitment_applications");
  return true;
}

// ============================================
// ROUTE HANDLER
// ============================================
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<ContactRequest>;

    // Coercition du type de demande : une valeur absente/inconnue retombe sur
    // "autre" plutôt que de perdre le lead sur un détail de dropdown.
    const requestType: RequestType =
      body.requestType && body.requestType in REQUEST_TYPE_LABELS
        ? body.requestType
        : "autre";

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const subject = typeof body.subject === "string" ? body.subject.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    // Validation des champs requis
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Tous les champs obligatoires doivent être remplis." },
        { status: 400 }
      );
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Adresse email invalide." },
        { status: 400 }
      );
    }

    const supabase = getServiceSupabaseClient();

    // Rate-limit anti-spam (R8) — AVANT le traitement. Deux clés : par IP
    // (flood général) et par email (flood ciblé). FAIL-OPEN : si la migration
    // n'est pas appliquée ou si l'RPC échoue, le helper renvoie true → on ne
    // bloque JAMAIS un vrai message.
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const [rlIpOk, rlEmailOk] = await Promise.all([
      checkRateLimit(supabase, `contact:ip:${ip}`, 5, 600),
      checkRateLimit(supabase, `contact:email:${email.toLowerCase()}`, 3, 600),
    ]);
    if (!rlIpOk || !rlEmailOk) {
      console.warn(`🚦 Rate-limit /api/contact dépassé (ip=${ip})`);
      return NextResponse.json(
        { error: "Trop de demandes. Réessayez dans quelques minutes ou appelez-nous." },
        { status: 429 }
      );
    }

    const data: ContactRequest = { name, email, requestType, subject, message };

    console.log("📩 Nouveau message de contact:", {
      name: data.name,
      requestType: data.requestType,
      subject: data.subject,
    });

    // Sauvegarde + email en parallèle. Le miroir recrutement n'est ajouté que
    // pour les candidatures, et reste optionnel.
    const tasks: Array<Promise<boolean>> = [
      saveToSupabase(supabase, data),
      sendEmailNotification(data),
    ];
    if (data.requestType === "recrutement") {
      tasks.push(mirrorToRecruitment(supabase, data));
    }

    const results = await Promise.allSettled(tasks);

    // Log + remonte chaque canal en échec vers Sentry (sinon allSettled les
    // avale silencieusement — exactement le bug qu'on corrige).
    const channels = ["Supabase", "Email", "Recruitment"];
    results.forEach((result, index) => {
      if (result.status === "rejected") {
        console.error(`❌ ${channels[index]} failed:`, result.reason);
        Sentry.captureException(result.reason, {
          tags: { route: "contact", channel: channels[index] },
        });
      }
    });

    // Le lead est "capturé" si AU MOINS un canal durable a réussi (DB insert
    // OU email équipe). Si les deux ont échoué/sont non configurés, on renvoie
    // un statut non-2xx pour que le front affiche le repli téléphone — plus
    // jamais de succès affiché alors que le message n'est parti nulle part.
    const dbOk = results[0].status === "fulfilled" && results[0].value === true;
    const emailOk = results[1].status === "fulfilled" && results[1].value === true;

    if (!dbOk && !emailOk) {
      return NextResponse.json(
        {
          error: `Votre message n'a pas pu être envoyé. Appelez-nous au ${FALLBACK_PHONE_DISPLAY}.`,
          phone: FALLBACK_PHONE,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Votre message a bien été envoyé ! Nous vous répondons sous 24h ouvrées.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    Sentry.captureException(error, { tags: { route: "contact" } });
    return NextResponse.json(
      {
        error: `Une erreur est survenue. Appelez-nous au ${FALLBACK_PHONE_DISPLAY}.`,
        phone: FALLBACK_PHONE,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Méthode non autorisée" },
    { status: 405 }
  );
}
