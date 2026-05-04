"use client";

/**
 * RealReviews — composant qui affiche les vrais avis Google My Business.
 *
 * Comportement :
 *   - Fetch /api/reviews au mount (ou sur demande via prop)
 *   - Si 0 avis : ne rend RIEN (pas de placeholder, pas de "soyez le premier
 *     à laisser un avis" — moins on attire l'attention sur le manque d'avis,
 *     mieux c'est)
 *   - Si 1-9 avis : affiche les avis individuels SANS aggregate (pas de note
 *     globale tant qu'on a pas le seuil de 10)
 *   - Si ≥10 avis : affiche aggregate (4.x ★ N avis) + carrousel des 5
 *     dernières
 *
 * À brancher quand prêt : dans Hero, /a-propos, /contact ou nouvelle section
 * dédiée. Pour l'instant pas importé nulle part = invisible mais prêt.
 *
 * Date : 2026-05-04 (post-cleanup ratings fictifs)
 */

import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";

interface ReviewItem {
  id: string;
  author_name: string;
  author_initial: string | null;
  city_slug: string | null;
  quartier: string | null;
  rating: number;
  comment: string | null;
  service_type: string | null;
  replied: boolean;
  reply_text: string | null;
  published_at: string;
}

interface AggregateData {
  count: number;
  average: number;
  byTrade: {
    plombier?: { count: number; average: number };
    serrurier?: { count: number; average: number };
    electricien?: { count: number; average: number };
  };
}

interface ApiResponse {
  reviews: ReviewItem[];
  total: number;
  aggregate: AggregateData;
}

interface Props {
  /** Filtre par métier (optionnel) */
  service?: "plombier" | "serrurier" | "electricien";
  /** Filtre par ville (optionnel) */
  city?: string;
  /** Nombre max d'avis à montrer (default 5) */
  limit?: number;
  /** Layout : 'carousel' (default) ou 'grid' */
  layout?: "carousel" | "grid";
  /** Cacher l'aggregate (juste les avis individuels) */
  hideAggregate?: boolean;
}

const MIN_FOR_AGGREGATE = 10;

export default function RealReviews({
  service,
  city,
  limit = 5,
  layout = "carousel",
  hideAggregate = false,
}: Props) {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams({ limit: String(limit) });
    if (service) params.set("service", service);
    if (city) params.set("city", city);

    fetch(`/api/reviews?${params}`)
      .then((r) => r.json())
      .then((d: ApiResponse) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [service, city, limit]);

  // Loading silencieux (pas de skeleton — composant invisible si pas de data)
  if (loading || !data) return null;

  // 0 avis : ne rend rien (volontaire — moins visible vaut mieux que vide)
  if (data.reviews.length === 0) return null;

  const showAggregate = !hideAggregate && data.aggregate.count >= MIN_FOR_AGGREGATE;

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {showAggregate && (
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-joel-yellow/15 rounded-full">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={20}
                    className={
                      i <= Math.round(data.aggregate.average)
                        ? "fill-joel-yellow text-joel-yellow"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="font-bold text-joel-violet text-lg">
                {data.aggregate.average.toFixed(1)}
              </span>
              <span className="text-gray-600 text-sm">
                · {data.aggregate.count} avis Google
              </span>
            </div>
          </div>
        )}

        <div
          className={
            layout === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-6"
          }
        >
          {data.reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: ReviewItem }) {
  const date = new Date(review.published_at).toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });

  return (
    <article className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm">
      <Quote className="text-joel-yellow/40 mb-3" size={28} />

      <div className="flex items-center gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={14}
            className={
              i <= review.rating
                ? "fill-joel-yellow text-joel-yellow"
                : "text-gray-300"
            }
          />
        ))}
      </div>

      {review.comment && (
        <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">
          &laquo;&nbsp;{review.comment}&nbsp;&raquo;
        </p>
      )}

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-joel text-white font-bold text-sm flex items-center justify-center">
          {review.author_initial ?? review.author_name[0]}
        </div>
        <div className="text-xs">
          <div className="font-semibold text-gray-900">
            {review.author_name}
          </div>
          <div className="text-gray-500">
            {review.quartier ?? review.city_slug ?? "Île-de-France"} · {date}
          </div>
        </div>
      </div>

      {review.replied && review.reply_text && (
        <div className="mt-4 pl-4 border-l-2 border-joel-violet/20 text-xs text-gray-600">
          <div className="font-semibold text-joel-violet mb-1">
            Réponse de Joël
          </div>
          <p>{review.reply_text}</p>
        </div>
      )}
    </article>
  );
}
