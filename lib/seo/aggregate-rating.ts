/**
 * Helper aggregateRating Schema.org — version honnête
 *
 * Règle d'or : on n'émet un aggregateRating dans le JSON-LD QUE si on
 * a au moins MIN_VERIFIED_REVIEWS avis VÉRIFIÉS dans Supabase.
 *
 * Sinon : on retourne `null` et les schemas omettent simplement le
 * champ aggregateRating. Pas de note inventée → pas de risque de
 * pénalité Google "structured data spam" ni de manual action.
 *
 * Une fois Mehdi a 10+ avis Google My Business vérifiés et ils sont
 * synchronisés via /api/reviews/sync-gmb dans la table reviews, ce
 * helper les exposera automatiquement dans tous les schemas.
 *
 * Architecture :
 *   1. Mehdi configure Google My Business profile + récolte des avis
 *   2. Cron /api/cron/reviews-sync-gmb tourne 1×/jour, récupère les avis
 *   3. Trigger SQL met à jour aggregate_rating_cache automatiquement
 *   4. Cette fonction lit la cache (1 query simple)
 *   5. Schemas (LocalBusiness, Service, etc.) appellent getAggregateRating()
 *      et l'incluent SI non-null
 *
 * Date : 2026-05-04 (post-cleanup ratings fictifs 4.9/947)
 */

import { getSupabaseClient } from "@/lib/supabase";

// Seuil minimum pour afficher un aggregateRating Schema.org
// 10 avis = base statistique défendable (vs 1-2 avis = bruit)
// Google recommande ≥5 mais on prend une marge.
const MIN_VERIFIED_REVIEWS = 10;

// Cache mémoire process-level (évite N queries Supabase pendant le SSG build).
// Invalidé automatiquement à chaque cold start (1× par déploiement).
let _ratingCache: AggregateRatingData | null | undefined = undefined;

export interface AggregateRatingData {
  ratingValue: string;        // "4.85" (string, comme Schema.org attend)
  reviewCount: string;         // "127"
  bestRating: "5";
  worstRating: "1";
  // Breakdown par métier (optionnel, utilisé par certains schemas)
  byTrade?: {
    plombier?: { rating: string; count: string };
    serrurier?: { rating: string; count: string };
    electricien?: { rating: string; count: string };
  };
}

/**
 * Retourne l'objet aggregateRating prêt à injecter dans un Schema.org JSON-LD,
 * ou `null` si on n'a pas atteint MIN_VERIFIED_REVIEWS.
 *
 * Usage dans un schema :
 *   const rating = await getAggregateRating();
 *   const schema = {
 *     "@type": "LocalBusiness",
 *     ...
 *     ...(rating && {
 *       aggregateRating: {
 *         "@type": "AggregateRating",
 *         ratingValue: rating.ratingValue,
 *         reviewCount: rating.reviewCount,
 *         bestRating: rating.bestRating,
 *         worstRating: rating.worstRating,
 *       },
 *     }),
 *   };
 */
export async function getAggregateRating(): Promise<AggregateRatingData | null> {
  if (_ratingCache !== undefined) return _ratingCache;

  const supabase = getSupabaseClient();
  if (!supabase) {
    _ratingCache = null;
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("aggregate_rating_cache")
      .select("verified_count, average_rating, plombier_count, plombier_average, serrurier_count, serrurier_average, electricien_count, electricien_average")
      .eq("id", 1)
      .single();

    if (error || !data || data.verified_count < MIN_VERIFIED_REVIEWS) {
      _ratingCache = null;
      return null;
    }

    const result: AggregateRatingData = {
      ratingValue: String(data.average_rating),
      reviewCount: String(data.verified_count),
      bestRating: "5",
      worstRating: "1",
    };

    // Breakdown par métier (seulement si ≥3 avis pour ce métier)
    const byTrade: AggregateRatingData["byTrade"] = {};
    if (data.plombier_count >= 3) {
      byTrade.plombier = {
        rating: String(data.plombier_average),
        count: String(data.plombier_count),
      };
    }
    if (data.serrurier_count >= 3) {
      byTrade.serrurier = {
        rating: String(data.serrurier_average),
        count: String(data.serrurier_count),
      };
    }
    if (data.electricien_count >= 3) {
      byTrade.electricien = {
        rating: String(data.electricien_average),
        count: String(data.electricien_count),
      };
    }
    if (Object.keys(byTrade).length > 0) {
      result.byTrade = byTrade;
    }

    _ratingCache = result;
    return result;
  } catch (err) {
    // Erreur réseau / DB : graceful degradation, on n'émet rien
    if (process.env.NODE_ENV !== "production") {
      console.warn("[aggregate-rating] Failed to fetch:", err);
    }
    _ratingCache = null;
    return null;
  }
}

/**
 * Variante synchrone pour les schemas qui ne peuvent pas être async.
 * Retourne null si la cache n'a pas encore été chauffée par un appel async
 * ou si on n'a pas atteint le seuil.
 *
 * Pour la plupart des cas, préférer getAggregateRating() async qui chauffe
 * la cache au premier appel.
 */
export function getAggregateRatingSync(): AggregateRatingData | null {
  return _ratingCache ?? null;
}

/**
 * Helper pour injecter aggregateRating dans un objet schema sans verbose.
 *
 * Usage :
 *   const schema = withAggregateRating({
 *     "@type": "LocalBusiness",
 *     name: "Joël",
 *     ...
 *   });
 *
 * Si pas de rating disponible, l'objet est retourné tel quel.
 */
export async function withAggregateRating<T extends Record<string, unknown>>(
  schema: T,
): Promise<T & { aggregateRating?: object }> {
  const rating = await getAggregateRating();
  if (!rating) return schema;
  return {
    ...schema,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating.ratingValue,
      reviewCount: rating.reviewCount,
      bestRating: rating.bestRating,
      worstRating: rating.worstRating,
    },
  };
}

/**
 * Vide la cache. Utile pour les tests ou pour forcer un refresh.
 */
export function invalidateAggregateRatingCache(): void {
  _ratingCache = undefined;
}
