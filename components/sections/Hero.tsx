"use client";

import { Phone, Star, MapPin, Clock, Shield, BadgeCheck, Users, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useSiteConfig, formatPhoneForTel } from "@/lib/hooks/useSiteConfig";
import { useState, useEffect, useCallback } from "react";
import QuickQuoteForm from "@/components/QuickQuoteForm";

const carouselSlides = [
  {
    src: "/hero-serrurerie.webp",
    alt: "Serrurier professionnel Joël - Dépannage serrurerie Paris",
    label: "Serrurerie",
    color: "from-joel-violet/60",
  },
  {
    src: "/hero-plomberie.webp",
    alt: "Plombier professionnel Joël - Dépannage plomberie Paris",
    label: "Plomberie",
    color: "from-blue-600/60",
  },
  {
    src: "/hero-electricite.webp",
    alt: "Électricien professionnel Joël - Dépannage électricité Paris",
    label: "Électricité",
    color: "from-amber-500/60",
  },
];

export default function Hero() {
  const { config } = useSiteConfig();
  
  const [artisansCount, setArtisansCount] = useState(3);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % carouselSlides.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + carouselSlides.length) % carouselSlides.length);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    const interval = setInterval(() => {
      setArtisansCount(Math.floor(Math.random() * 4) + 2);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const handleCallClick = () => {
    // Track call click
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "click_to_call",
        phone_number: config.phone_number,
        placement: "hero_main",
      });
    }
  };

  return (
    <section className="relative min-h-[100svh] lg:min-h-screen flex items-center pt-20 lg:pt-20 overflow-hidden bg-white">
      {/* Mobile Background - CSS background-image excludes from LCP calculation */}
      <div className="absolute inset-0 lg:hidden hero-bg-main opacity-15">
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8 py-6 lg:py-16 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-8 items-center">
          {/* Content - Always first on mobile - No animation to ensure LCP element is visible */}
          <div className="order-1">
            {/* Artisans disponibles - Urgence */}
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-medium mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <Users size={14} />
              <span>{artisansCount} artisans disponibles maintenant</span>
            </div>
            
            {/* Google Reviews - Trust Signal */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">4.9/5</span>
              <span className="text-sm text-gray-500 hidden xs:inline">sur Google (847 avis vérifiés)</span>
            </div>

            {/* Main title - SEO optimized */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-3 lg:mb-4 leading-[1.15]">
              Plombier, Serrurier
              <br />
              & Électricien
              <br />
              <span className="gradient-text">Paris & Île-de-France</span>
            </h1>

            {/* Subtitle - Value proposition */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-4 lg:mb-6 font-medium">
              Intervention en 30 min • Prix Fixes & Transparents • Agréé Assurances
            </p>

            {/* Location badge - Hidden on mobile */}
            <div className="hidden lg:inline-flex items-center gap-2 text-sm text-gray-600 mb-8 bg-gray-50 px-4 py-3 rounded-xl">
              <MapPin size={18} className="text-joel-violet" />
              <span>
                <strong>Zone d'intervention :</strong> Toute l'Île-de-France (75, 77, 78, 91, 92, 93, 94, 95)
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="mb-4 lg:mb-8 flex flex-col sm:flex-row gap-3 lg:gap-4">
              <a
                href={`tel:${formatPhoneForTel(config.phone_number)}`}
                onClick={handleCallClick}
                data-placement="hero-main"
                className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base sm:text-lg lg:text-xl px-6 sm:px-8 py-4 sm:py-5 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                {/* Badge GRATUIT */}
                <span className="absolute -top-2 -right-2 bg-joel-yellow text-gray-900 text-xs font-bold px-2 py-1 rounded-full shadow-md">
                  GRATUIT
                </span>
                <Phone size={22} className="animate-pulse" />
                <span>APPELER LE {config.phone_number}</span>
              </a>
              
              <button
                onClick={() => setShowQuoteModal(true)}
                className="inline-flex items-center justify-center gap-2 bg-white text-joel-violet font-bold text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-5 rounded-2xl border-2 border-joel-violet/30 hover:border-joel-violet hover:bg-joel-violet/5 transition-all"
              >
                <span>Demander un devis</span>
                <ArrowRight size={18} />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-4 lg:mb-0">
              Appel gratuit • Devis instantané • Sans engagement
            </p>

            {/* Quote Modal */}
            {showQuoteModal && (
              <QuickQuoteForm
                variant="modal"
                onClose={() => setShowQuoteModal(false)}
              />
            )}

            {/* Trust badges - Brands - Hidden on mobile */}
            <div className="hidden lg:block border-t border-gray-100 pt-6">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">Artisans certifiés</p>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-gray-600 bg-white border border-gray-200 px-3 py-2 rounded-lg">
                  <BadgeCheck size={16} className="text-joel-violet" />
                  <span className="text-sm font-medium">Vachette</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 bg-white border border-gray-200 px-3 py-2 rounded-lg">
                  <BadgeCheck size={16} className="text-joel-violet" />
                  <span className="text-sm font-medium">Grohe</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 bg-white border border-gray-200 px-3 py-2 rounded-lg">
                  <BadgeCheck size={16} className="text-joel-violet" />
                  <span className="text-sm font-medium">Legrand</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 bg-white border border-gray-200 px-3 py-2 rounded-lg">
                  <Shield size={16} className="text-emerald-500" />
                  <span className="text-sm font-medium">Artisan Confiance</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Carousel - Desktop only */}
          <div className="hidden lg:block order-2 relative">
            <div className="relative max-w-lg mx-auto lg:max-w-none">

              {/* Carousel container */}
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
                {carouselSlides.map((slide, index) => (
                  <div
                    key={slide.src}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      sizes="(max-width: 1280px) 50vw, 600px"
                      className="object-cover"
                      loading={index === 0 ? "eager" : "lazy"}
                      priority={index === 0}
                    />
                    {/* Label overlay */}
                    <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${slide.color} to-transparent px-6 py-4`}>
                      <span className="text-white text-sm font-semibold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        {slide.label}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Prev / Next arrows */}
                <button
                  onClick={prevSlide}
                  aria-label="Image précédente"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:bg-white transition-all"
                >
                  <ChevronLeft size={18} className="text-gray-700" />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Image suivante"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:bg-white transition-all"
                >
                  <ChevronRight size={18} className="text-gray-700" />
                </button>

                {/* Dots */}
                <div className="absolute bottom-4 right-4 z-10 flex gap-2">
                  {carouselSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      aria-label={`Aller à l'image ${index + 1}`}
                      className={`transition-all duration-300 rounded-full ${
                        index === currentSlide
                          ? "w-6 h-2 bg-white"
                          : "w-2 h-2 bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Floating badge - Availability */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl px-4 py-3 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                    <Clock className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Disponible</p>
                    <p className="font-bold text-gray-900">24h/24 • 7j/7</p>
                  </div>
                </div>
              </div>

              {/* Floating badge - Price */}
              <div className="absolute -top-2 -right-2 bg-joel-yellow text-gray-900 rounded-2xl px-4 py-2 shadow-lg">
                <p className="text-xs font-medium">À partir de</p>
                <p className="font-bold text-xl">89€</p>
              </div>
            </div>
          </div>

          {/* Mobile carousel - full width below content */}
          <div className="lg:hidden order-2 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] shadow-xl">
              {carouselSlides.map((slide, index) => (
                <div
                  key={slide.src}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    loading="lazy"
                  />
                  <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${slide.color} to-transparent px-4 py-3`}>
                    <span className="text-white text-xs font-semibold bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
                      {slide.label}
                    </span>
                  </div>
                </div>
              ))}

              {/* Mobile dots */}
              <div className="absolute bottom-3 right-3 z-10 flex gap-1.5">
                {carouselSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    aria-label={`Image ${index + 1}`}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentSlide
                        ? "w-5 h-1.5 bg-white"
                        : "w-1.5 h-1.5 bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
