"use client";

import { Star, ExternalLink, CheckCircle, Users } from "lucide-react";

interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
}

const reviews: Review[] = [
  {
    author: "Marie L.",
    rating: 5,
    text: "Intervention rapide et efficace. Le serrurier est arrivé en 25 minutes. Prix conforme au devis annoncé.",
    date: "Il y a 2 jours",
  },
  {
    author: "Thomas D.",
    rating: 5,
    text: "Excellent service ! Porte claquée à 23h, artisan sur place en 30 min. Très professionnel.",
    date: "Il y a 1 semaine",
  },
  {
    author: "Sophie M.",
    rating: 5,
    text: "Plombier compétent, fuite réparée rapidement. Tarif honnête et transparent.",
    date: "Il y a 2 semaines",
  },
];

// URL Google Maps réelle - à remplacer par l'URL exacte de la fiche Google Business
const GOOGLE_REVIEWS_URL = "https://www.google.com/maps/place/Jo%C3%ABl+-+D%C3%A9pannage+Urgence";

export default function GoogleReviews() {
  return (
    <section className="py-12 3xl:py-18 5xl:py-24 bg-white">
      <div className="max-w-6xl 3xl:max-w-8xl 4xl:max-w-9xl 5xl:max-w-10xl mx-auto px-4 sm:px-6 3xl:px-8">
        {/* Header with Google rating - Style Avis Vérifiés */}
        <div className="bg-gray-50 rounded-2xl 3xl:rounded-3xl p-6 3xl:p-8 5xl:p-10 mb-8 3xl:mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 3xl:gap-8">
            {/* Left: Google badge */}
            <div className="flex items-center gap-4 3xl:gap-6">
              {/* Google logo */}
              <div className="w-12 h-12 3xl:w-16 3xl:h-16 5xl:w-20 5xl:h-20 bg-white rounded-xl 3xl:rounded-2xl shadow-md flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-7 h-7 3xl:w-10 3xl:h-10 5xl:w-12 5xl:h-12">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-lg 3xl:text-xl 5xl:text-2xl">Google Reviews</p>
                <div className="flex items-center gap-2 3xl:gap-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-yellow-400 3xl:w-5 3xl:h-5 5xl:w-6 5xl:h-6" />
                    ))}
                  </div>
                  <span className="font-bold text-gray-900 3xl:text-lg 5xl:text-xl">4.9</span>
                  <span className="text-gray-500 3xl:text-lg 5xl:text-xl">(947 avis)</span>
                </div>
              </div>
            </div>

            {/* Center: Badge vérifiés */}
            <div className="flex items-center gap-3 bg-emerald-100 text-emerald-700 px-4 3xl:px-5 py-2 3xl:py-2.5 rounded-full">
              <CheckCircle size={20} className="3xl:w-6 3xl:h-6" />
              <span className="font-bold text-sm 3xl:text-base 5xl:text-lg">Avis vérifiés</span>
            </div>

            {/* Right: Stats + CTA */}
            <div className="flex items-center gap-4 3xl:gap-6">
              <div className="text-center hidden md:block">
                <div className="flex items-center gap-2 3xl:gap-3 text-gray-600 3xl:text-lg 5xl:text-xl">
                  <Users size={18} className="3xl:w-6 3xl:h-6" />
                  <span className="text-sm 3xl:text-base 5xl:text-lg">+15 000 interventions</span>
                </div>
              </div>
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 3xl:gap-3 px-5 3xl:px-6 py-2.5 3xl:py-3 bg-joel-violet text-white font-bold text-sm 3xl:text-base 5xl:text-lg rounded-full hover:bg-joel-mauve transition-colors"
              >
                Voir tous les avis
                <ExternalLink size={14} className="3xl:w-5 3xl:h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid md:grid-cols-3 gap-6 3xl:gap-8 5xl:gap-10">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl 3xl:rounded-2xl p-6 3xl:p-8 5xl:p-10 border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 3xl:gap-4 mb-3 3xl:mb-4">
                <div className="w-10 h-10 3xl:w-14 3xl:h-14 5xl:w-16 5xl:h-16 bg-gradient-joel rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold 3xl:text-lg 5xl:text-xl">
                    {review.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 3xl:text-lg 5xl:text-xl">{review.author}</p>
                  <p className="text-xs 3xl:text-sm 5xl:text-base text-gray-500">{review.date}</p>
                </div>
                {/* Badge Google */}
                <div className="ml-auto">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 3xl:w-6 3xl:h-6 5xl:w-7 5xl:h-7">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
              </div>
              <div className="flex mb-3 3xl:mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} className="text-yellow-400 fill-yellow-400 3xl:w-5 3xl:h-5 5xl:w-6 5xl:h-6" />
                ))}
              </div>
              <p className="text-gray-600 text-sm 3xl:text-base 5xl:text-lg leading-relaxed">
                &quot;{review.text}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
