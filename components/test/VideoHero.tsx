"use client";

import { Phone, Clock, Shield, Star, Users } from "lucide-react";
import { useSiteConfig, formatPhoneForTel } from "@/lib/hooks/useSiteConfig";
import { useState, useEffect } from "react";

interface VideoHeroProps {
  videoWebm?: string;
  videoMp4?: string;
  posterImage?: string;
}

export default function VideoHero({
  videoWebm = "/videos/hero-artisan.webm",
  videoMp4 = "/videos/hero-artisan.webm",
  posterImage = "/hero-serrurerie.webp",
}: VideoHeroProps) {
  const { config } = useSiteConfig();
  const [artisanCount, setArtisanCount] = useState(12);

  // Simuler un compteur dynamique d'artisans disponibles
  useEffect(() => {
    const interval = setInterval(() => {
      setArtisanCount(Math.floor(Math.random() * 5) + 10); // 10-14 artisans
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={posterImage}
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoWebm} type="video/webm" />
          <source src={videoMp4} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-0 w-full">
        <div className="max-w-2xl">
          {/* Badge SANS MAJORATION - GROS */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="inline-flex items-center gap-2 bg-emerald-500 text-white text-sm md:text-base font-bold px-5 py-2.5 rounded-full shadow-lg">
              <Shield size={20} />
              <span>SANS MAJORATION 24h/24</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-joel-yellow text-gray-900 text-sm font-bold px-4 py-2 rounded-full">
              <Clock size={16} />
              <span>Intervention 20 min</span>
            </div>
          </div>

          {/* Titre principal */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Dépannage{" "}
            <span className="text-joel-yellow">urgent</span>
            <br />
            Paris & Île-de-France
          </h1>

          {/* Sous-titre */}
          <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-lg">
            Serrurier, plombier, électricien disponible 24h/24. 
            Prix fixe annoncé avant intervention.
          </p>

          {/* Compteur artisans */}
          <div className="flex items-center gap-2 mb-8 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full w-fit">
            <Users size={18} className="text-emerald-400" />
            <span className="text-white font-medium">
              <span className="text-emerald-400 font-bold">{artisanCount} artisans</span> disponibles maintenant
            </span>
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          </div>

          {/* CTA Principal XXL */}
          <div className="flex flex-col gap-4 mb-8">
            <a
              href={`tel:${formatPhoneForTel(config.phone_number)}`}
              data-placement="video-hero"
              className="group flex items-center justify-center gap-4 px-10 py-6 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-2xl md:text-3xl rounded-2xl shadow-2xl hover:shadow-emerald-500/30 transition-all w-full md:w-auto"
            >
              <Phone size={32} className="animate-ring" />
              <span>{config.phone_number}</span>
            </a>
            <p className="text-white/70 text-sm text-center md:text-left">
              Appel gratuit • Devis immédiat • Paiement après intervention
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Star size={18} className="text-yellow-400 fill-yellow-400" />
              <span className="text-white text-sm font-medium">4.9/5 (947 avis Google)</span>
            </div>
          </div>

          {/* Prix indicatifs avec TTC */}
          <div className="grid grid-cols-3 gap-4 max-w-md bg-white/5 backdrop-blur-sm rounded-xl p-4">
            <div className="text-center">
              <p className="text-white/60 text-xs mb-1">Serrurerie</p>
              <p className="text-white font-bold text-xl">89€</p>
              <p className="text-white/50 text-[10px]">TTC tout compris</p>
            </div>
            <div className="text-center border-x border-white/20">
              <p className="text-white/60 text-xs mb-1">Plomberie</p>
              <p className="text-white font-bold text-xl">95€</p>
              <p className="text-white/50 text-[10px]">TTC tout compris</p>
            </div>
            <div className="text-center">
              <p className="text-white/60 text-xs mb-1">Électricité</p>
              <p className="text-white font-bold text-xl">89€</p>
              <p className="text-white/50 text-[10px]">TTC tout compris</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
