"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote, MapPin } from "lucide-react";

interface Testimonial {
  name: string;
  location: string;
  service: string;
  rating: number;
  text: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Marie L.",
    location: "Paris 15e",
    service: "Serrurerie",
    rating: 5,
    text: "Porte claquée à 23h un dimanche. L'artisan est arrivé en 25 minutes et a ouvert sans abîmer la serrure. Prix annoncé = prix payé. Je recommande !",
    date: "Il y a 3 jours",
  },
  {
    name: "Thomas D.",
    location: "Boulogne-Billancourt",
    service: "Plomberie",
    rating: 5,
    text: "Fuite importante sous l'évier. Intervention rapide et efficace. Le plombier a pris le temps d'expliquer le problème. Très professionnel.",
    date: "Il y a 1 semaine",
  },
  {
    name: "Sophie M.",
    location: "Vincennes",
    service: "Électricité",
    rating: 5,
    text: "Panne de courant dans tout l'appartement. Diagnostic rapide, réparation propre. Enfin un service sans mauvaise surprise sur le prix !",
    date: "Il y a 2 semaines",
  },
  {
    name: "Jean-Pierre R.",
    location: "Neuilly-sur-Seine",
    service: "Serrurerie",
    rating: 5,
    text: "Changement de serrure après un cambriolage. Intervention en urgence, travail impeccable. L'équipe a été très réactive et rassurante.",
    date: "Il y a 3 semaines",
  },
];

interface TestimonialsProps {
  title?: string;
  subtitle?: string;
}

export default function Testimonials({ 
  title = "Ce que disent nos clients",
  subtitle = "Plus de 15 000 interventions réalisées avec 97% de satisfaction"
}: TestimonialsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 sm:py-24 bg-gradient-to-br from-joel-violet/5 via-white to-joel-mauve/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-joel-yellow/20 text-gray-900 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star size={16} className="text-joel-yellow fill-joel-yellow" />
            <span>4.9/5 sur Google (847 avis)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
            >
              {/* Quote icon */}
              <Quote size={32} className="text-joel-violet/20 mb-4" />

              {/* Text */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Avatar placeholder */}
                  <div className="w-12 h-12 bg-gradient-joel rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin size={12} />
                      <span>{testimonial.location}</span>
                      <span className="mx-1">•</span>
                      <span>{testimonial.service}</span>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex flex-col items-end">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={14} className="text-joel-yellow fill-joel-yellow" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400 mt-1">{testimonial.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-10"
        >
          <p className="text-sm text-gray-500">
            Avis vérifiés collectés après chaque intervention
          </p>
        </motion.div>
      </div>
    </section>
  );
}
