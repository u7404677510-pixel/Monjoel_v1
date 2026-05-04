/**
 * GET /api/reviews
 * Retourne les avis publiés (status='approved' AND verified=true).
 *
 * Query params :
 *   - limit (default: 20, max: 100) — pagination
 *   - offset (default: 0)
 *   - service (optional: 'plombier' | 'serrurier' | 'electricien')
 *   - city (optional: city slug, ex: 'paris-11')
 *   - min_rating (optional: 1-5)
 *
 * Réponse :
 *   {
 *     reviews: [{ id, author_name, rating, comment, ... }],
 *     total: number,
 *     aggregate: { count, average, breakdown_by_trade },
 *   }
 *
 * Note : retourne 200 + array vide tant que pas d'avis vérifiés.
 * Pas d'erreur si Supabase indispo (graceful degradation).
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

export const revalidate = 3600; // Cache 1h côté CDN
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const supabase = getSupabaseClient();

  // Graceful : si pas de Supabase, on retourne empty
  if (!supabase) {
    return NextResponse.json({
      reviews: [],
      total: 0,
      aggregate: { count: 0, average: 0, byTrade: {} },
      _info: "Supabase not configured — no reviews available yet.",
    });
  }

  const { searchParams } = new URL(request.url);
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "20", 10), 100);
  const offset = parseInt(searchParams.get("offset") ?? "0", 10);
  const service = searchParams.get("service");
  const city = searchParams.get("city");
  const minRating = searchParams.get("min_rating");

  let query = supabase
    .from("reviews")
    .select("id, author_name, author_initial, city_slug, quartier, rating, comment, service_type, replied, reply_text, replied_at, published_at", { count: "exact" })
    .eq("status", "approved")
    .eq("verified", true)
    .order("published_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (service) query = query.eq("service_type", service);
  if (city) query = query.eq("city_slug", city);
  if (minRating) query = query.gte("rating", parseInt(minRating, 10));

  try {
    const [reviewsResult, aggregateResult] = await Promise.all([
      query,
      supabase
        .from("aggregate_rating_cache")
        .select("verified_count, average_rating, plombier_count, plombier_average, serrurier_count, serrurier_average, electricien_count, electricien_average")
        .eq("id", 1)
        .single(),
    ]);

    if (reviewsResult.error) {
      // Table n'existe peut-être pas encore (migration pas appliquée)
      return NextResponse.json({
        reviews: [],
        total: 0,
        aggregate: { count: 0, average: 0, byTrade: {} },
        _info: "Reviews table not migrated yet. Run lib/supabase-migration-reviews.sql.",
      });
    }

    const aggregate = aggregateResult.data ?? {
      verified_count: 0,
      average_rating: 0,
      plombier_count: 0,
      plombier_average: 0,
      serrurier_count: 0,
      serrurier_average: 0,
      electricien_count: 0,
      electricien_average: 0,
    };

    return NextResponse.json({
      reviews: reviewsResult.data ?? [],
      total: reviewsResult.count ?? 0,
      aggregate: {
        count: aggregate.verified_count,
        average: aggregate.average_rating,
        byTrade: {
          plombier: { count: aggregate.plombier_count, average: aggregate.plombier_average },
          serrurier: { count: aggregate.serrurier_count, average: aggregate.serrurier_average },
          electricien: { count: aggregate.electricien_count, average: aggregate.electricien_average },
        },
      },
    });
  } catch (err) {
    return NextResponse.json(
      {
        reviews: [],
        total: 0,
        aggregate: { count: 0, average: 0, byTrade: {} },
        error: process.env.NODE_ENV === "development" ? String(err) : "Internal error",
      },
      { status: 500 },
    );
  }
}
