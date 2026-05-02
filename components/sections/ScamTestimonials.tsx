"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

// Avatar par témoignage : path canonique vers /public/images/testimonials/.
// Le fichier "avatar-jean-pierre" est utilisé pour Thomas R. (homme mature
// barbe grise) car les noms de fichiers ChatGPT correspondent aux profils.
// `null` = pas d'avatar disponible → fallback initiale dans le rendu.
const testimonials = [
  {
    name: "Sarah K.",
    location: "Paris 11e",
    service: "Serrurerie",
    rating: 1,
    text: "Porte claquée à 23h. J'ai pris le premier numéro Google. Annoncé 89€ au téléphone. Une fois sur place, devis à 850€ pour « ouverture impossible sans perçage ». J'ai signé pour qu'il parte.",
    date: "Mars 2025",
    outcome: "victim" as const,
    avatar: "/images/testimonials/avatar-sarah.png",
  },
  {
    name: "Thomas R.",
    location: "Saint-Denis",
    service: "Plomberie",
    rating: 1,
    text: "Fuite sous l'évier un dimanche. Le gars annonce 79€, repart avec 1 240€ pour avoir « changé toute l'évacuation ». Le vrai plombier de l'immeuble m'a dit après que c'était un joint de 4€.",
    date: "Janvier 2026",
    outcome: "victim" as const,
    avatar: "/images/testimonials/avatar-jean-pierre.png",
  },
  {
    name: "Laëtitia B.",
    location: "Boulogne-Billancourt",
    service: "Électricité",
    rating: 1,
    text: "Disjoncteur qui sautait. L'électricien a parlé de « tableau dangereux à refaire d'urgence ». Devis de 1 980€ signé en pleine nuit. C'était juste un différentiel à enclencher.",
    date: "Novembre 2025",
    outcome: "victim" as const,
    avatar: "/images/testimonials/avatar-laetitia.png",
  },
  {
    name: "Karim D.",
    location: "Nanterre",
    service: "Serrurerie",
    rating: 1,
    text: "Porte simplement claquée. Le serrurier l'a percée d'office en 30 secondes alors qu'une carte radio aurait suffi. 720€, plus 380€ pour le nouveau cylindre obligatoire d'après lui.",
    date: "Septembre 2025",
    outcome: "victim" as const,
    avatar: "/images/testimonials/avatar-karim.png",
  },
  {
    name: "Isabelle F.",
    location: "Versailles",
    service: "Plomberie",
    rating: 1,
    text: "WC bouché. 12 minutes de furet, facture à 590€. Pas de devis écrit, pas de SIRET sur la quittance. J'ai signalé sur SignalConso, dossier toujours en cours.",
    date: "Mai 2025",
    outcome: "victim" as const,
    avatar: "/images/testimonials/avatar-isabelle.png",
  },
  {
    name: "Mehdi T.",
    location: "Vincennes",
    service: "Serrurerie",
    rating: 1,
    text: "Devis flou signé sous pression à 3h du matin : 460€ qui sont devenus 1 100€ sur la facture finale. Le SIRET sur le papier ne correspond à aucune entreprise active. Banque saisie.",
    date: "Février 2026",
    outcome: "victim" as const,
    avatar: null,
  },
  {
    name: "Charlotte M.",
    location: "Asnières-sur-Seine",
    service: "Électricité",
    rating: 1,
    text: "Panne sur une prise. Le « technicien » a refusé la CB, m'a forcée à payer 380€ en espèces. Pas de facture conforme, juste un papier griffonné. Mon assurance a refusé la prise en charge.",
    date: "Octobre 2025",
    outcome: "victim" as const,
    avatar: "/images/testimonials/avatar-charlotte.png",
  },
  {
    name: "François L.",
    location: "Pantin",
    service: "Plomberie",
    rating: 1,
    text: "Chauffe-eau en panne un samedi. Annoncé 99€, parti à 870€ pour un « démontage complet » de 25 minutes. La sécurité thermique n'avait juste pas été réarmée. J'ai porté plainte.",
    date: "Décembre 2025",
    outcome: "victim" as const,
    avatar: null,
  },
  {
    name: "Aïcha N.",
    location: "Créteil",
    service: "Serrurerie",
    rating: 5,
    text: "Porte claquée un samedi soir. J'allais rappeler le numéro habituel quand mon voisin m'a passé Joël. Prix annoncé au téléphone : 89€. Facture finale : 89€. Ouverture sans perçage en 15 minutes.",
    date: "Janvier 2026",
    outcome: "avoided" as const,
    avatar: null,
  },
  {
    name: "Antoine P.",
    location: "Montreuil",
    service: "Électricité",
    rating: 5,
    text: "Coupure totale en pleine soirée. Le premier devis Google annonçait 49€ « pour voir ». J'ai préféré appeler Joël : 79€ annoncés, 79€ payés. Disjoncteur réparmé en 10 minutes.",
    date: "Mars 2026",
    outcome: "avoided" as const,
    avatar: null,
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
            className="bg-white/90 backdrop-blur-xs rounded-3xl p-8 shadow-xl border border-red-100"
          >
            <Quote className="text-red-200 mb-4" size={40} />
            
            <p className="text-lg text-gray-700 mb-6 italic">
              "{testimonials[current].text}"
            </p>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                {/* Avatar rond — image si disponible, sinon initiale sur fond gradient */}
                {testimonials[current].avatar ? (
                  <Image
                    src={testimonials[current].avatar!}
                    alt=""
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover shrink-0 ring-2 ring-joel-violet/20 shadow-sm"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-joel text-white font-bold text-base flex items-center justify-center shrink-0 shadow-sm">
                    {testimonials[current].name.charAt(0)}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="font-bold text-gray-900 truncate">{testimonials[current].name}</div>
                  <div className="text-sm text-gray-500 truncate">
                    {testimonials[current].location} • {testimonials[current].service}
                  </div>
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
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




