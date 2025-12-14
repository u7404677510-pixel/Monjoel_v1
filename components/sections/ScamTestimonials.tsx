"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Marie L.",
    location: "Paris 15e",
    service: "Serrurerie",
    rating: 1,
    text: "Porte claquée, j'ai appelé le premier numéro sur Google. 890€ pour 10 minutes de travail ! Le serrurier m'a menacée quand j'ai voulu refuser de payer.",
    date: "Décembre 2023",
  },
  {
    name: "Thomas D.",
    location: "Lyon",
    service: "Plomberie",
    rating: 1,
    text: "Fuite d'eau un dimanche. L'artisan m'a dit qu'il fallait changer toute la tuyauterie. 1200€ de facture. Un vrai plombier m'a dit que c'était juste un joint à 5€.",
    date: "Novembre 2023",
  },
  {
    name: "Sophie M.",
    location: "Marseille",
    service: "Électricité",
    rating: 1,
    text: "Panne de courant. L'électricien a 'diagnostiqué' un problème grave et m'a fait signer un devis de 2000€ en pleine nuit. C'était juste le disjoncteur.",
    date: "Janvier 2024",
  },
  {
    name: "Jean-Pierre R.",
    location: "Bordeaux",
    service: "Serrurerie",
    rating: 1,
    text: "Le serrurier a percé ma porte alors qu'une simple carte aurait suffi. 750€ + frais de nouvelle porte. Arnaque pure et simple.",
    date: "Octobre 2023",
  },
  {
    name: "Isabelle F.",
    location: "Toulouse",
    service: "Plomberie",
    rating: 1,
    text: "WC bouché. Le plombier a passé 15 minutes, facture de 650€. Il a refusé de me donner une facture détaillée. Je n'ai eu aucun recours.",
    date: "Septembre 2023",
  },
];

export default function ScamTestimonials() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const next = () => {
    setIsAutoPlaying(false);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setIsAutoPlaying(false);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Témoignages de <span className="text-red-500">victimes</span>
          </h2>
          <p className="text-gray-600">Des histoires vraies qui auraient pu être évitées.</p>
        </motion.div>

        <div className="relative">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-red-100"
          >
            <Quote className="text-red-200 mb-4" size={40} />
            
            <p className="text-lg text-gray-700 mb-6 italic">
              "{testimonials[current].text}"
            </p>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-gray-900">{testimonials[current].name}</div>
                <div className="text-sm text-gray-500">
                  {testimonials[current].location} • {testimonials[current].service}
                </div>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < testimonials[current].rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft size={24} className="text-gray-600" />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => { setIsAutoPlaying(false); setCurrent(index); }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === current ? "bg-joel-violet w-6" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={next}
              className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            >
              <ChevronRight size={24} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

