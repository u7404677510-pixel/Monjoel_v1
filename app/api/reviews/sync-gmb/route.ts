/**
 * POST /api/reviews/sync-gmb
 * Sync les avis depuis Google My Business API vers la table reviews Supabase.
 *
 * Auth :
 *   - Soit header `Authorization: Bearer ${process.env.CRON_SECRET}` (cron)
 *   - Soit user admin authentifié (à brancher quand auth admin sera prête)
 *
 * Variables env requises :
 *   - GMB_ACCOUNT_ID       (ex: "accounts/123456789")
 *   - GMB_LOCATION_ID      (ex: "locations/987654321")
 *   - GMB_SERVICE_ACCOUNT_KEY (JSON stringifié de la clé service account GCP)
 *   - SUPABASE_SERVICE_ROLE_KEY (pour bypass RLS sur insert reviews)
 *   - CRON_SECRET           (pour gate cron public)
 *
 * Comportement :
 *   - Si une variable env manque → 200 OK + { skipped: true, reason: "..." }
 *     (pas d'erreur, le cron continue, on n'a juste pas activé GMB encore)
 *   - Sinon : fetch les reviews GMB (jusqu'à 100 dernières), upsert dans
 *     Supabase via source+source_id unique constraint, le trigger SQL
 *     refresh aggregate_rating_cache automatiquement
 *
 * Setup GMB :
 *   Voir docs/gmb-setup.md pour le step-by-step (création service account,
 *   activation API, ajout permissions sur Google Business Profile).
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // Jamais cacher cette route

interface SyncResult {
  ok: boolean;
  skipped?: boolean;
  reason?: string;
  fetched?: number;
  inserted?: number;
  updated?: number;
  errors?: string[];
}

export async function POST(request: NextRequest): Promise<NextResponse<SyncResult>> {
  // ─── Auth ───────────────────────────────────────────────────────────────
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  const isAuthorized = cronSecret
    ? authHeader === `Bearer ${cronSecret}`
    : false;

  if (!isAuthorized) {
    return NextResponse.json({ ok: false, reason: "Unauthorized" }, { status: 401 });
  }

  // ─── Vérification env ──────────────────────────────────────────────────
  const accountId = process.env.GMB_ACCOUNT_ID;
  const locationId = process.env.GMB_LOCATION_ID;
  const serviceAccountKey = process.env.GMB_SERVICE_ACCOUNT_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!accountId || !locationId || !serviceAccountKey) {
    return NextResponse.json({
      ok: true,
      skipped: true,
      reason: "GMB env vars missing — see docs/gmb-setup.md",
    });
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({
      ok: true,
      skipped: true,
      reason: "Supabase service-role key missing — cannot upsert reviews safely",
    });
  }

  // ─── Fetch GMB reviews ─────────────────────────────────────────────────
  let reviews: GmbReview[];
  try {
    reviews = await fetchGmbReviews({
      accountId,
      locationId,
      serviceAccountKey,
    });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        reason: process.env.NODE_ENV === "development" ? String(err) : "GMB API error",
      },
      { status: 502 },
    );
  }

  // ─── Upsert dans Supabase (service role, bypass RLS) ───────────────────
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false },
  });

  const errors: string[] = [];
  let inserted = 0;
  let updated = 0;

  for (const review of reviews) {
    const row = {
      source: "gmb" as const,
      source_id: review.reviewId,
      author_name: review.reviewer?.displayName ?? "Client Joël",
      author_initial: (review.reviewer?.displayName ?? "C")[0].toUpperCase(),
      author_avatar_url: review.reviewer?.profilePhotoUrl ?? null,
      rating: starRatingToNumber(review.starRating),
      comment: review.comment ?? null,
      service_type: inferServiceType(review.comment ?? ""),
      replied: !!review.reviewReply,
      reply_text: review.reviewReply?.comment ?? null,
      replied_at: review.reviewReply?.updateTime ?? null,
      replied_by: review.reviewReply ? "Joël" : null,
      published_at: review.createTime,
      verified: true, // GMB = vérifié par construction
      status: "approved" as const,
    };

    const { error, data } = await supabase
      .from("reviews")
      .upsert(row, { onConflict: "source,source_id" })
      .select("id, fetched_at")
      .single();

    if (error) {
      errors.push(`${review.reviewId}: ${error.message}`);
    } else if (data) {
      // Approximation : si fetched_at < 30s, c'est un insert ; sinon update
      const fetchedAt = new Date(data.fetched_at).getTime();
      if (Date.now() - fetchedAt < 30_000) inserted++;
      else updated++;
    }
  }

  return NextResponse.json({
    ok: true,
    fetched: reviews.length,
    inserted,
    updated,
    errors: errors.length ? errors : undefined,
  });
}

// ─────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────

interface GmbReview {
  reviewId: string;
  reviewer?: {
    displayName?: string;
    profilePhotoUrl?: string;
  };
  starRating: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
  comment?: string;
  createTime: string;
  updateTime?: string;
  reviewReply?: {
    comment: string;
    updateTime: string;
  };
}

interface FetchOpts {
  accountId: string;
  locationId: string;
  serviceAccountKey: string;
}

async function fetchGmbReviews(opts: FetchOpts): Promise<GmbReview[]> {
  // Note : GMB API utilise OAuth2. On utilise le service account via JWT signing.
  // Dépendance : `google-auth-library` (à installer si pas déjà : `npm i google-auth-library`)
  // Si la dépendance manque au moment du build, on retourne [] sans crasher.

  let auth: import("google-auth-library").JWT;
  try {
    const { JWT } = await import("google-auth-library");
    const credentials = JSON.parse(opts.serviceAccountKey) as {
      client_email: string;
      private_key: string;
    };
    auth = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ["https://www.googleapis.com/auth/business.manage"],
    });
  } catch {
    throw new Error("google-auth-library not installed or service account key invalid");
  }

  const accessToken = await auth.getAccessToken();
  if (!accessToken.token) throw new Error("Failed to obtain GMB access token");

  // GMB API v4 endpoint pour reviews
  const url = `https://mybusiness.googleapis.com/v4/${opts.accountId}/${opts.locationId}/reviews?pageSize=100`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken.token}` },
  });

  if (!res.ok) {
    throw new Error(`GMB API ${res.status}: ${await res.text()}`);
  }

  const json = (await res.json()) as { reviews?: GmbReview[] };
  return json.reviews ?? [];
}

function starRatingToNumber(rating: GmbReview["starRating"]): number {
  return { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 }[rating] ?? 0;
}

/**
 * Heuristique simple pour deviner le métier mentionné dans le commentaire.
 * Pas robuste — l'admin peut toujours éditer manuellement.
 */
function inferServiceType(comment: string): string | null {
  const lower = comment.toLowerCase();
  if (/plomb|fuite|wc|évier|chauffe-eau|canalisation|robinet/.test(lower)) return "plombier";
  if (/serrur|porte|clé|cylindre|verrou|blindage/.test(lower)) return "serrurier";
  if (/électric|disjoncteur|tableau|prise|interrupteur|courant/.test(lower)) return "electricien";
  return null;
}
