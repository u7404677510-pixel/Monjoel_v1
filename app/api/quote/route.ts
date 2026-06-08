import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import * as Sentry from "@sentry/nextjs";
import { getSupabaseClient } from "@/lib/supabase";
import { checkRateLimit } from "@/lib/rate-limit";

// Configuration
const NOTIFICATION_EMAIL = "contact@monjoel.fr";
const PHONE_NUMBER = "01 41 69 10 08";
const WHATSAPP_NUMBER = "33756996726"; // Format international sans +

// Resend client (nécessite RESEND_API_KEY dans .env)
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface QuoteRequest {
  problem: string;
  urgency?: "urgent" | "today" | "planned";
  postalCode: string;
  phone: string;
  /** Optionnel — présent quand un client connecté soumet (lie le lead à son compte). */
  email?: string;
  /** Optionnel — id Supabase Auth du client connecté, si soumission depuis l'espace client. */
  userId?: string;
  /** Honeypot anti-bot (R8) — doit être vide ; rempli ⇒ bot, soumission ignorée. */
  company?: string;
  /** Attribution marketing (gclid/utm/landing) capturée côté client (lib/attribution.ts). */
  attribution?: Record<string, string>;
  recaptchaToken?: string;
}

// reCAPTCHA verification
async function verifyRecaptcha(token: string): Promise<{ success: boolean; score?: number }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    console.warn("⚠️ reCAPTCHA secret key not configured, skipping verification");
    return { success: true, score: 1 };
  }
  
  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secretKey}&response=${token}`,
    });
    
    const data = await response.json();
    console.log("reCAPTCHA verification:", { success: data.success, score: data.score });
    
    return { success: data.success, score: data.score };
  } catch (error) {
    // FAIL-OPEN : une panne réseau / timeout côté Google ne doit JAMAIS
    // bloquer un vrai lead. On autorise (le honeypot + le rate-limit + le
    // score reCAPTCHA quand il répond restent les garde-fous anti-bot).
    console.error("reCAPTCHA verification error (fail-open, autorisé):", error);
    return { success: true };
  }
}

// Clés d'attribution autorisées (whitelist) — alignées avec lib/attribution.ts
// et les colonnes de la table leads (cf. supabase-migration.sql).
const ATTR_KEYS = [
  "gclid", "gbraid", "wbraid",
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
  "landing_page", "referrer",
] as const;

function sanitizeAttribution(raw: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  if (raw && typeof raw === "object") {
    for (const key of ATTR_KEYS) {
      const value = (raw as Record<string, unknown>)[key];
      if (typeof value === "string" && value.trim()) {
        out[key] = value.trim().slice(0, 512);
      }
    }
  }
  return out;
}

const urgencyLabels: Record<string, string> = {
  urgent: "🚨 URGENT — Maintenant",
  today: "⏰ Aujourd'hui (dans les 4h)",
  planned: "📅 Programmé — Sur rendez-vous",
};

interface LeadData {
  problem: string;
  problemLabel: string;
  urgency: string;
  urgencyLabel: string;
  trade: string;
  postalCode: string;
  phone: string;
  phoneRaw: string;
  /** Email du client (null si soumission anonyme). Sert à lier le lead au compte. */
  email: string | null;
  /** id Supabase Auth du client (null si soumission anonyme). */
  userId: string | null;
  /** Attribution marketing (gclid/utm/landing/referrer) — colonnes de la table leads. */
  attribution: Record<string, string>;
  timestamp: string;
  source: string;
}

// Mapping des problèmes vers des labels lisibles
const problemLabels: Record<string, string> = {
  "fuite-eau": "Fuite d'eau",
  "wc-bouche": "WC bouché",
  "chauffe-eau": "Chauffe-eau en panne",
  "canalisation": "Canalisation bouchée",
  "porte-claquee": "Porte claquée",
  "serrure-bloquee": "Serrure bloquée",
  "cle-cassee": "Clé cassée dans serrure",
  "effraction": "Après effraction",
  "panne-courant": "Panne de courant",
  "court-circuit": "Court-circuit",
  "disjoncteur": "Disjoncteur qui saute",
  "prise-hs": "Prise/interrupteur HS",
  "autre": "Autre problème",
};

// Mapping des problèmes vers les métiers
const problemToTrade: Record<string, string> = {
  "fuite-eau": "Plomberie",
  "wc-bouche": "Plomberie",
  "chauffe-eau": "Plomberie",
  "canalisation": "Plomberie",
  "porte-claquee": "Serrurerie",
  "serrure-bloquee": "Serrurerie",
  "cle-cassee": "Serrurerie",
  "effraction": "Serrurerie",
  "panne-courant": "Électricité",
  "court-circuit": "Électricité",
  "disjoncteur": "Électricité",
  "prise-hs": "Électricité",
  "autre": "À déterminer",
};

// ============================================
// FONCTION 1: Notification WhatsApp Business
// ============================================
async function sendWhatsAppNotification(leadData: LeadData): Promise<boolean> {
  const message = `🚨 *NOUVELLE DEMANDE*

${leadData.urgencyLabel}

📋 *Problème:* ${leadData.problemLabel}
🔧 *Métier:* ${leadData.trade}
📍 *Code postal:* ${leadData.postalCode}
📞 *Téléphone:* ${leadData.phone}
⏰ *Heure:* ${new Date(leadData.timestamp).toLocaleString("fr-FR")}

👉 Rappeler le client rapidement !`;

  // Option 1: CallMeBot (gratuit, simple)
  // Nécessite d'activer le bot: https://www.callmebot.com/blog/free-api-whatsapp-messages/
  const callMeBotApiKey = process.env.CALLMEBOT_API_KEY;
  
  if (callMeBotApiKey) {
    const url = `https://api.callmebot.com/whatsapp.php?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}&apikey=${callMeBotApiKey}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`CallMeBot error: ${response.status}`);
    }
    console.log("✅ WhatsApp notification sent via CallMeBot");
    return true;
  }

  // Option 2: API WhatsApp Business officielle (si configurée)
  const whatsappToken = process.env.WHATSAPP_BUSINESS_TOKEN;
  const whatsappPhoneId = process.env.WHATSAPP_PHONE_ID;
  
  if (whatsappToken && whatsappPhoneId) {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${whatsappPhoneId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${whatsappToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: WHATSAPP_NUMBER,
          type: "text",
          text: { body: message },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`WhatsApp API error: ${error}`);
    }
    console.log("✅ WhatsApp notification sent via Business API");
    return true;
  }

  // Aucune API configurée - log warning
  console.warn("⚠️ WhatsApp notification skipped: No API key configured");
  return false;
}

// ============================================
// FONCTION 2: Sauvegarde dans Supabase
// ============================================
async function saveToSupabase(leadData: LeadData): Promise<boolean> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    console.warn("⚠️ Supabase not configured, skipping database save");
    return false;
  }

  const { error } = await supabase.from("leads").insert([{
    problem: leadData.problem,
    problem_label: leadData.problemLabel,
    trade: leadData.trade,
    postal_code: leadData.postalCode,
    phone: leadData.phoneRaw,
    email: leadData.email,          // lie le lead au compte client (RLS: email = auth.email())
    user_id: leadData.userId,       // idem via user_id (RLS: user_id = auth.uid())
    urgency: leadData.urgency,
    urgency_label: leadData.urgencyLabel,
    ...leadData.attribution,        // gclid / utm_* / landing_page / referrer (colonnes leads)
    source: leadData.source,
    status: "new",
  }]);

  if (error) {
    throw new Error(`Supabase error: ${error.message}`);
  }
  
  console.log("✅ Lead saved to Supabase");
  return true;
}

// ============================================
// FONCTION 3: Notification Email via Resend
// ============================================
async function sendEmailNotification(leadData: LeadData): Promise<boolean> {
  if (!resend) {
    console.warn("⚠️ Resend not configured, skipping email notification");
    return false;
  }

  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #7055A7, #9E76EC); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #7055A7; }
    .value { font-size: 16px; }
    .cta { display: inline-block; background: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin-top: 15px; }
    .urgent { background: #FF6B6B; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; display: inline-block; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">🚨 Nouvelle demande de devis</h1>
      <p style="margin: 5px 0 0 0; opacity: 0.9;">Via monjoel.fr</p>
    </div>
    <div class="content">
      <p class="urgent">${leadData.urgencyLabel}</p>
      
      <div class="field">
        <div class="label">📋 Problème</div>
        <div class="value">${leadData.problemLabel}</div>
      </div>
      
      <div class="field">
        <div class="label">🔧 Métier</div>
        <div class="value">${leadData.trade}</div>
      </div>
      
      <div class="field">
        <div class="label">📍 Code postal</div>
        <div class="value">${leadData.postalCode}</div>
      </div>
      
      <div class="field">
        <div class="label">📞 Téléphone du client</div>
        <div class="value" style="font-size: 20px; font-weight: bold;">${leadData.phone}</div>
      </div>
      
      <div class="field">
        <div class="label">⏰ Date/Heure</div>
        <div class="value">${new Date(leadData.timestamp).toLocaleString("fr-FR")}</div>
      </div>
      
      <a href="tel:${leadData.phoneRaw}" class="cta">📞 Appeler le client</a>
    </div>
  </div>
</body>
</html>
  `;

  // Utilise le domaine vérifié si disponible, sinon fallback sur resend.dev
  const fromEmail = process.env.RESEND_FROM_EMAIL || "Joël <onboarding@resend.dev>";
  
  const { error } = await resend.emails.send({
    from: fromEmail,
    to: NOTIFICATION_EMAIL,
    subject: `🚨 Nouvelle demande ${leadData.trade} - ${leadData.postalCode}`,
    html: emailHtml,
    replyTo: NOTIFICATION_EMAIL,
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }
  
  console.log("✅ Email notification sent via Resend");
  return true;
}

// ============================================
// ROUTE HANDLER
// ============================================
export async function POST(request: NextRequest) {
  try {
    const body: QuoteRequest = await request.json();

    // Honeypot anti-bot (R8) : si le champ piège "company" est rempli, c'est un
    // bot. On renvoie un faux succès (200) pour ne pas lui révéler le filtre,
    // mais on ne sauvegarde / ne notifie RIEN.
    if (typeof body.company === "string" && body.company.trim() !== "") {
      console.warn("🚫 Honeypot déclenché sur /api/quote — soumission ignorée (bot)");
      return NextResponse.json({
        success: true,
        message: "Demande reçue ! Nous vous rappelons dans les 2 minutes.",
      });
    }

    // Validation
    if (!body.problem || !body.postalCode || !body.phone) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    // Rate-limit anti-spam (R8) — APRÈS le honeypot, AVANT le traitement.
    // Deux clés : par IP (flood général) et par téléphone (flood ciblé). Le
    // helper est FAIL-OPEN : si la migration n'est pas appliquée ou si l'RPC
    // échoue, il renvoie true → on ne bloque JAMAIS un vrai lead.
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const phoneKey = body.phone.replace(/\s/g, "");
    const rlSupabase = getSupabaseClient();
    const [ipOk, phoneOk] = await Promise.all([
      checkRateLimit(rlSupabase, `quote:ip:${ip}`, 5, 600),
      checkRateLimit(rlSupabase, `quote:phone:${phoneKey}`, 3, 600),
    ]);
    if (!ipOk || !phoneOk) {
      console.warn(`🚦 Rate-limit /api/quote dépassé (ip=${ip})`);
      return NextResponse.json(
        { error: "Trop de demandes. Réessayez dans quelques minutes ou appelez-nous." },
        { status: 429 }
      );
    }

    // reCAPTCHA verification (if token provided)
    if (body.recaptchaToken) {
      const recaptchaResult = await verifyRecaptcha(body.recaptchaToken);
      
      if (!recaptchaResult.success) {
        console.warn("❌ reCAPTCHA verification failed");
        return NextResponse.json(
          { error: "Vérification de sécurité échouée. Veuillez réessayer." },
          { status: 400 }
        );
      }
      
      // Block if score is too low (likely bot) - threshold 0.3
      if (recaptchaResult.score !== undefined && recaptchaResult.score < 0.3) {
        console.warn(`❌ reCAPTCHA score too low: ${recaptchaResult.score}`);
        return NextResponse.json(
          { error: "Activité suspecte détectée. Veuillez nous appeler directement." },
          { status: 400 }
        );
      }
    }

    // Validation code postal IDF
    const postalCodeRegex = /^(75|77|78|91|92|93|94|95)\d{3}$/;
    if (!postalCodeRegex.test(body.postalCode)) {
      return NextResponse.json(
        { error: "Code postal Île-de-France requis" },
        { status: 400 }
      );
    }

    // Validation téléphone
    const phoneRegex = /^0[1-9]\d{8}$/;
    const cleanPhone = body.phone.replace(/\s/g, "");
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { error: "Numéro de téléphone invalide" },
        { status: 400 }
      );
    }

    // Formatage du téléphone pour affichage
    const formattedPhone = cleanPhone.replace(/(\d{2})(?=\d)/g, "$1 ");

    // Liaison optionnelle à un compte client (soumission depuis l'espace client).
    // On valide légèrement : l'email/user_id ne servent qu'à RETROUVER ses propres
    // leads — la RLS lit toujours auth.uid()/auth.email() de la SESSION, jamais ces
    // valeurs, donc un spoof ne permet aucune exfiltration.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email =
      typeof body.email === "string" && emailRegex.test(body.email.trim())
        ? body.email.trim().toLowerCase()
        : null;
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const userId =
      typeof body.userId === "string" && uuidRegex.test(body.userId)
        ? body.userId
        : null;

    // Attribution marketing (R9) — sanitize : clés connues, string, tronquées.
    const attribution = sanitizeAttribution(body.attribution);

    // Préparer les données du lead
    const urgency = body.urgency || "urgent";
    const leadData: LeadData = {
      problem: body.problem,
      problemLabel: problemLabels[body.problem] || body.problem,
      urgency,
      urgencyLabel: urgencyLabels[urgency] || urgency,
      trade: problemToTrade[body.problem] || "À déterminer",
      postalCode: body.postalCode,
      phone: formattedPhone,
      phoneRaw: cleanPhone,
      email,
      userId,
      attribution,
      timestamp: new Date().toISOString(),
      source: "website_quote_form",
    };

    console.log("📞 Nouvelle demande de devis:", leadData);

    // Envoyer les notifications en parallèle (ne bloque pas si l'une échoue)
    const results = await Promise.allSettled([
      sendWhatsAppNotification(leadData),
      saveToSupabase(leadData),
      sendEmailNotification(leadData),
    ]);

    // Remonter chaque canal en échec vers Sentry (sinon allSettled les avale
    // silencieusement — c'est exactement la fuite de lead qu'on corrige : R5).
    const channels = ["WhatsApp", "Supabase", "Email"];
    results.forEach((result, index) => {
      if (result.status === "rejected") {
        console.error(`❌ ${channels[index]} failed:`, result.reason);
        Sentry.captureException(result.reason, {
          tags: { route: "quote", channel: channels[index] },
        });
      }
    });

    // Le lead n'est réellement « capturé » que si AU MOINS un canal durable a
    // abouti : WhatsApp (rappel immédiat), Supabase (CRM admin) ou email équipe.
    // Si les trois ont échoué / sont absents → on NE renvoie PAS un faux succès :
    // statut 502 + repli téléphone, pour ne jamais perdre un lead en silence.
    const captured = results.some(
      (r) => r.status === "fulfilled" && r.value === true,
    );

    if (!captured) {
      Sentry.captureMessage(
        "Quote lead NON capturé — tous les canaux ont échoué",
        { level: "error", tags: { route: "quote" } },
      );
      return NextResponse.json(
        {
          error: `Votre demande n'a pas pu être enregistrée. Appelez-nous vite au ${PHONE_NUMBER}.`,
          phone: PHONE_NUMBER,
        },
        { status: 502 },
      );
    }

    // Réponse succès (au moins un canal durable a réussi)
    return NextResponse.json({
      success: true,
      message: "Demande reçue ! Nous vous rappelons dans les 2 minutes.",
      data: {
        trade: leadData.trade,
        problemLabel: leadData.problemLabel,
        callbackPhone: PHONE_NUMBER,
      },
    });

  } catch (error) {
    console.error("Quote API error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue. Veuillez réessayer ou nous appeler directement." },
      { status: 500 }
    );
  }
}

// Désactiver les autres méthodes HTTP
export async function GET() {
  return NextResponse.json(
    { error: "Méthode non autorisée" },
    { status: 405 }
  );
}
