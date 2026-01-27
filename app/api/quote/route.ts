import { NextRequest, NextResponse } from "next/server";

// Configuration email (à personnaliser selon votre service d'email)
const NOTIFICATION_EMAIL = "contact@monjoel.fr";
const PHONE_NUMBER = "01 72 68 22 02";

interface QuoteRequest {
  problem: string;
  postalCode: string;
  phone: string;
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

export async function POST(request: NextRequest) {
  try {
    const body: QuoteRequest = await request.json();

    // Validation
    if (!body.problem || !body.postalCode || !body.phone) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
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

    // Préparer les données du lead
    const leadData = {
      problem: body.problem,
      problemLabel: problemLabels[body.problem] || body.problem,
      trade: problemToTrade[body.problem] || "À déterminer",
      postalCode: body.postalCode,
      phone: formattedPhone,
      phoneRaw: cleanPhone,
      timestamp: new Date().toISOString(),
      source: "website_quote_form",
    };

    // Log pour debug (à remplacer par votre système de notification)
    console.log("📞 Nouvelle demande de devis:", leadData);

    // TODO: Intégrer votre système de notification ici
    // Options possibles :
    // 1. Envoi d'email via Resend, SendGrid, etc.
    // 2. Webhook vers votre CRM
    // 3. SMS via Twilio
    // 4. Notification Slack/Discord
    // 5. Insertion en base Supabase

    // Exemple avec Supabase (décommentez si vous utilisez Supabase)
    /*
    const { supabase } = await import("@/lib/supabase");
    if (supabase) {
      await supabase.from("leads").insert([{
        problem: leadData.problem,
        problem_label: leadData.problemLabel,
        trade: leadData.trade,
        postal_code: leadData.postalCode,
        phone: leadData.phoneRaw,
        source: leadData.source,
        created_at: leadData.timestamp,
      }]);
    }
    */

    // Réponse succès
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
