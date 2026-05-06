import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseClient } from "@/lib/supabase";

// Configuration
const NOTIFICATION_EMAIL = "contact@monjoel.fr";

// Resend client
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface RecruitmentRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  trades: string[];
  zone: string;
  message?: string;
}

const tradeLabels: Record<string, string> = {
  serrurerie: "Serrurerie",
  plomberie: "Plomberie",
  electricite: "Électricité",
};

// ============================================
// Notification Email via Resend
// ============================================
async function sendEmailNotification(data: RecruitmentRequest): Promise<void> {
  if (!resend) {
    console.warn("⚠️ Resend not configured, skipping email notification");
    return;
  }

  const tradeLabel = data.trades.map((t) => tradeLabels[t] || t).join(", ");

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
    .badge { background: #7055A7; color: white; padding: 6px 16px; border-radius: 20px; font-weight: bold; display: inline-block; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">👷 Nouvelle candidature artisan</h1>
      <p style="margin: 5px 0 0 0; opacity: 0.9;">Via monjoel.fr/recrutement</p>
    </div>
    <div class="content">
      <p class="badge">${tradeLabel}</p>
      
      <div class="field">
        <div class="label">👤 Nom complet</div>
        <div class="value">${data.firstName} ${data.lastName}</div>
      </div>
      
      <div class="field">
        <div class="label">📧 Email</div>
        <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
      </div>
      
      <div class="field">
        <div class="label">📞 Téléphone</div>
        <div class="value" style="font-size: 18px; font-weight: bold;">${data.phone}</div>
      </div>
      
      <div class="field">
        <div class="label">🔧 Corps de métier</div>
        <div class="value">${tradeLabel}</div>
      </div>
      
      <div class="field">
        <div class="label">📍 Zone d'intervention</div>
        <div class="value">${data.zone}</div>
      </div>
      
      ${data.message ? `
      <div class="field">
        <div class="label">💬 Message</div>
        <div class="value">${data.message}</div>
      </div>
      ` : ""}
      
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

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: NOTIFICATION_EMAIL,
    subject: `👷 Nouvelle candidature ${data.trades.map((t) => tradeLabels[t] || t).join(", ")} - ${data.firstName} ${data.lastName}`,
    html: emailHtml,
    replyTo: data.email,
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }

  console.log("✅ Recruitment email notification sent via Resend");
}

// ============================================
// Sauvegarde dans Supabase
// ============================================
async function saveToSupabase(data: RecruitmentRequest): Promise<void> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    console.warn("⚠️ Supabase not configured, skipping database save");
    return;
  }

  const cleanPhone = data.phone.replace(/\s/g, "");

  const { error } = await supabase.from("recruitment_applications").insert([
    {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: cleanPhone,
      trades: data.trades,
      zone: data.zone,
      message: data.message || null,
      status: "new",
    },
  ]);

  if (error) {
    throw new Error(`Supabase error: ${error.message}`);
  }

  console.log("✅ Recruitment application saved to Supabase");
}

// ============================================
// ROUTE HANDLER
// ============================================
export async function POST(request: NextRequest) {
  try {
    const body: RecruitmentRequest = await request.json();

    // Validation des champs requis
    if (!body.firstName || !body.lastName || !body.email || !body.phone || !body.trades || !body.trades.length || !body.zone) {
      return NextResponse.json(
        { error: "Tous les champs obligatoires doivent être remplis." },
        { status: 400 }
      );
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Adresse email invalide." },
        { status: 400 }
      );
    }

    // Validation téléphone français
    const phoneRegex = /^0[1-9]\d{8}$/;
    const cleanPhone = body.phone.replace(/\s/g, "");
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { error: "Numéro de téléphone invalide." },
        { status: 400 }
      );
    }

    // Validation corps de métier
    const validTrades = ["serrurerie", "plomberie", "electricite"];
    if (!body.trades.every((t: string) => validTrades.includes(t))) {
      return NextResponse.json(
        { error: "Corps de métier invalide." },
        { status: 400 }
      );
    }

    console.log("👷 Nouvelle candidature artisan:", {
      name: `${body.firstName} ${body.lastName}`,
      trades: body.trades,
      zone: body.zone,
    });

    // Sauvegarder et envoyer l'email en parallèle
    const results = await Promise.allSettled([
      saveToSupabase(body),
      sendEmailNotification(body),
    ]);

    // Log des résultats
    const channels = ["Supabase", "Email"];
    results.forEach((result, index) => {
      if (result.status === "rejected") {
        console.error(`❌ ${channels[index]} failed:`, result.reason);
      }
    });

    return NextResponse.json({
      success: true,
      message: "Votre candidature a bien été envoyée ! Nous vous recontacterons rapidement.",
    });
  } catch (error) {
    console.error("Recruitment API error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue. Veuillez réessayer." },
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
