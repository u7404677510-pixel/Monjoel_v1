"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Phone, Star, Shield, Check, Clock, ArrowRight,
  ChevronDown, Droplets, MapPin, Award, Quote
} from "lucide-react";
import { useSiteConfig, formatPhoneForTel } from "@/lib/hooks/useSiteConfig";
import QuickQuoteForm from "@/components/QuickQuoteForm";
import PaymentLogos from "@/components/sections/PaymentLogos";

const STATIC_PHONE = "01 41 69 10 08";
const STATIC_PHONE_TEL = "+33141691008";

const pricingServices = [
  { name: "Fuite d'eau", price: "89€", note: "robinet, tuyau, joint", popular: true },
  { name: "WC bouchés", price: "79€", note: "furet ou haute pression", popular: false },
  { name: "Chauffe-eau en panne", price: "dès 99€", note: "toutes marques", popular: false },
  { name: "Dégât des eaux", price: "129€", note: "arrêt + constat assurance", popular: false },
  { name: "Recherche de fuite cachée", price: "dès 129€", note: "sans casse, rapport inclus", popular: false },
  { name: "Débouchage canalisation", price: "dès 99€", note: "furet électrique ou hydrocurage", popular: false },
];

const testimonials = [
  {
    initial: "M",
    name: "Marie L.",
    city: "Paris 15e",
    rating: 5,
    text: "Fuite sous l'évier réparée en 25 minutes. Prix annoncé au téléphone, confirmé sur place. Rien de plus, rien de moins. Rare.",
    service: "Fuite d'eau",
  },
  {
    initial: "T",
    name: "Thomas D.",
    city: "Boulogne-Billancourt",
    rating: 5,
    text: "WC bouchés à 22h un dimanche. Plombier arrivé en 20 minutes, problème réglé en 30. Même tarif que la semaine. Franchement impressionnant.",
    service: "WC bouchés",
  },
  {
    initial: "S",
    name: "Sophie M.",
    city: "Vincennes",
    rating: 5,
    text: "Chauffe-eau réparé le jour même. Il m'a expliqué le problème avant de toucher à quoi que ce soit. C'est la première fois qu'un artisan fait ça.",
    service: "Chauffe-eau",
  },
];

const differentiators = [
  {
    headline: "Le prix annoncé est le prix payé.",
    body: "Pas d'estimation. Pas de 'on verra sur place'. Votre devis est confirmé par téléphone avant que notre plombier parte de chez lui.",
  },
  {
    headline: "Si la fuite reprend, on revient.",
    body: "Toutes nos interventions sont garanties 30 jours. Si le problème n'est pas réglé, on revient — gratuitement, sans discussion.",
  },
  {
    headline: "Aucune majoration, jamais.",
    body: "21h un mercredi ou 7h un dimanche de Noël : même tarif. On ne facture pas l'urgence deux fois.",
  },
];

export default function PlomberieV2Landing() {
  const { config } = useSiteConfig();
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [artisansCount, setArtisansCount] = useState(3);

  const phoneNumber = config.phone_number || STATIC_PHONE;
  const phoneTel = formatPhoneForTel(phoneNumber) || STATIC_PHONE_TEL;

  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setArtisansCount(Math.floor(Math.random() * 4) + 2);
    }, 30000);
    return () => clearInterval(t);
  }, []);

  const trackCall = useCallback((placement: string) => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({ event: "click_to_call", phone_number: phoneNumber, placement });
    }
  }, [phoneNumber]);

  return (
    <main className="min-h-screen font-sans">

      {/* ─── HEADER MINIMAL ──────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B172A]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplets size={20} className="text-[#F5D547]" />
            <span className="font-display font-bold text-white text-lg">Joël</span>
            <span className="text-white/40 text-sm ml-1">— Plomberie</span>
          </div>
          <a
            href={`tel:${phoneTel}`}
            onClick={() => trackCall("header")}
            className="flex items-center gap-2 bg-p1-red hover:bg-p1-red-dark text-white font-bold text-sm px-4 py-2 rounded-xl transition-colors"
          >
            <Phone size={14} />
            <span className="hidden sm:inline">{phoneNumber}</span>
            <span className="sm:hidden">Appeler</span>
          </a>
        </div>
      </header>

      {/* ─── HERO — PHOTO FULL-BLEED ─────────────────────────────── */}
      <section className="relative min-h-screen flex items-center">
        {/* Photo de fond */}
        <div className="absolute inset-0">
          <Image
            src="/hero-plomberie.webp"
            alt="Plombier professionnel Joël — intervention urgence Paris"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* Overlay sombre */}
          <div className="absolute inset-0 bg-[#0B172A]/78" />
          {/* Dégradé bas pour lisibilité */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0B172A] to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-20 w-full">
          <div className="max-w-2xl">
            {/* Disponibilité live */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              {artisansCount} plombiers disponibles maintenant en IDF
            </div>

            {/* H1 massif */}
            <h1 className="font-display font-bold leading-[1.05] mb-6">
              <span className="block text-5xl sm:text-6xl lg:text-7xl text-white">
                Plombier à Paris
              </span>
              <span className="block text-4xl sm:text-5xl lg:text-6xl text-[#F5D547] mt-1">
                en 20 minutes.
              </span>
            </h1>

            {/* Sous-titre */}
            <p className="text-white/80 text-lg sm:text-xl mb-4 leading-relaxed">
              Fuite, WC bouchés, chauffe-eau — Prix fixe annoncé avant intervention.
              <br className="hidden sm:block" />
              Zéro surprise. Zéro arnaque.
            </p>

            {/* Google rating inline */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-white font-bold">4.9/5</span>
              <span className="text-white/60 text-sm">sur Google (947 avis vérifiés)</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${phoneTel}`}
                onClick={() => trackCall("hero_main")}
                className="relative flex items-center justify-center gap-3 bg-p1-red hover:bg-p1-red-dark text-white font-bold text-xl px-8 py-5 rounded-2xl shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="absolute -top-2.5 -right-2.5 bg-[#F5D547] text-gray-900 text-xs font-black px-2.5 py-0.5 rounded-full">
                  GRATUIT
                </span>
                <Phone size={24} className="animate-pulse" />
                <span>{phoneNumber}</span>
              </a>

            </div>

            {/* Formulaire devis inline — directement dans le hero */}
            <div className="mt-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
              <div className="px-4 pt-3 pb-1">
                <p className="text-white/70 text-xs font-semibold uppercase tracking-widest">
                  Devis gratuit en 30 secondes
                </p>
              </div>
              <QuickQuoteForm variant="inline" trade="plomberie" />
            </div>

            <div className="mt-3">
              <PaymentLogos variant="dark" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
          <ChevronDown size={24} />
        </div>
      </section>

      {/* ─── TRUST STRIP — NAVY ──────────────────────────────────── */}
      <section className="bg-[#0B2545] py-5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x md:divide-white/20">
            {[
              { icon: Star, value: "4.9/5 Google", sub: "947 avis vérifiés" },
              { icon: Clock, value: "20 min maxi", sub: "Paris & IDF" },
              { icon: Shield, value: "Prix fixe", sub: "Annoncé avant départ" },
              { icon: Phone, value: "24h/24 • 7j/7", sub: "Sans majoration" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center md:px-6 py-2">
                <item.icon size={20} className="text-[#F5D547] mb-1" />
                <span className="text-white font-bold text-sm">{item.value}</span>
                <span className="text-white/50 text-xs">{item.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING — ÉDITORIAL ─────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Gauche — titre massif */}
            <div className="lg:sticky lg:top-24">
              <p className="text-p1-red font-bold text-sm uppercase tracking-widest mb-4">Tarifs transparents</p>
              <h2 className="font-display font-bold text-4xl sm:text-5xl text-gray-900 leading-tight mb-6">
                Ce que vous payez.
                <br />
                <span className="text-p1-blue">Rien de plus.</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                Annoncé au téléphone. Confirmé sur place. Jamais modifié.
                <br />
                C&apos;est notre seul engagement — et on ne le trahit pas.
              </p>
              <a
                href={`tel:${phoneTel}`}
                onClick={() => trackCall("pricing_section")}
                className="inline-flex items-center gap-3 bg-p1-red hover:bg-p1-red-dark text-white font-bold text-lg px-7 py-4 rounded-2xl transition-all hover:scale-[1.02] shadow-lg"
              >
                <Phone size={20} />
                <span>Obtenir mon devis</span>
              </a>
            </div>

            {/* Droite — liste de prix */}
            <div className="space-y-3">
              {pricingServices.map((service, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${
                    service.popular
                      ? "border-p1-blue bg-blue-50 shadow-lg shadow-blue-100"
                      : "border-gray-100 bg-gray-50 hover:border-gray-200"
                  }`}
                >
                  <div>
                    {service.popular && (
                      <span className="inline-block bg-p1-blue text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1.5">
                        Le plus demandé
                      </span>
                    )}
                    <p className={`font-bold ${service.popular ? "text-gray-900 text-lg" : "text-gray-800"}`}>
                      {service.name}
                    </p>
                    <p className="text-gray-400 text-sm mt-0.5">{service.note}</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <span className={`font-display font-bold text-2xl ${service.popular ? "text-p1-blue" : "text-gray-900"}`}>
                      {service.price}
                    </span>
                    <p className="text-gray-400 text-xs">TTC</p>
                  </div>
                </div>
              ))}

              <div className="pt-3 flex items-start gap-2 text-gray-400 text-xs">
                <Shield size={14} className="flex-shrink-0 mt-0.5" />
                <span>Prix fixe garanti • Pas de frais de déplacement • Paiement après intervention</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION ARTISAN — PHOTO + TEXTE ────────────────────── */}
      <section className="bg-[#0B2545] overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-0 items-stretch">
            {/* Photo gauche */}
            <div className="relative h-72 lg:h-auto lg:min-h-[560px] order-2 lg:order-1">
              <Image
                src="/hero-plomberie.webp"
                alt="Plombier Joël — artisan professionnel Paris Île-de-France"
                fill
                className="object-cover object-top lg:object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0B2545]/50 hidden lg:block" />
            </div>

            {/* Texte droite */}
            <div className="py-16 lg:py-20 lg:pl-12 order-1 lg:order-2">
              <p className="text-[#F5D547] font-bold text-sm uppercase tracking-widest mb-6">
                Pourquoi Joël
              </p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white leading-tight mb-10">
                On fait ce qu&apos;on dit.
                <br />
                <span className="text-white/60">Ni plus. Ni moins.</span>
              </h2>

              <div className="space-y-8">
                {differentiators.map((d, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#F5D547]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={16} className="text-[#F5D547]" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg leading-snug mb-1.5">{d.headline}</p>
                      <p className="text-white/60 text-sm leading-relaxed">{d.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Vidéo artisan en action */}
              <div className="mt-8 relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  poster="/hero-plomberie.webp"
                >
                  <source src="/videos/hero-artisan.webm" type="video/webm" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/60 to-transparent flex items-end p-4">
                  <span className="text-white/80 text-xs font-medium">
                    Artisan Joël — intervention réelle
                  </span>
                </div>
              </div>

              {/* Zone d'intervention */}
              <div className="mt-8 flex items-center gap-2 text-white/50 text-sm border-t border-white/10 pt-8">
                <MapPin size={14} className="flex-shrink-0" />
                <span>Toute l'Île-de-France — 75, 77, 78, 91, 92, 93, 94, 95</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── AVIS CLIENTS — FOND BLEU CLAIR ──────────────────────── */}
      <section className="py-20 bg-[#EFF6FF]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            <div>
              <p className="text-p1-blue font-bold text-sm uppercase tracking-widest mb-2">Ce qu'ils en disent</p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900">
                947 clients ne se sont pas trompés.
              </h2>
            </div>
            <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-3 shadow-sm border border-blue-100 flex-shrink-0">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">4.9 / 5</p>
                <p className="text-gray-400 text-xs">Google Reviews</p>
              </div>
            </div>
          </div>

          {/* Cards — asymétrique : centrale plus haute */}
          <div className="grid md:grid-cols-3 gap-5 items-start">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl p-6 border border-blue-100 shadow-sm ${
                  i === 1 ? "md:mt-0 md:pt-8 md:pb-8" : ""
                }`}
              >
                <Quote size={24} className="text-p1-blue/30 mb-4" />
                <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                  <div className="w-10 h-10 rounded-full bg-p1-blue flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">{t.initial}</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.city} · {t.service}</p>
                  </div>
                  <div className="ml-auto flex">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} size={12} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FORMULAIRE DEVIS — SECTION BLANCHE ─────────────────── */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-p1-red font-bold text-sm uppercase tracking-widest mb-3">Devis instantané</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-4">
              Décrivez votre problème.<br />
              <span className="text-p1-blue">On rappelle en 2 minutes.</span>
            </h2>
            <p className="text-gray-500">Aucun engagement. Aucun frais cachés.</p>
          </div>
          <QuickQuoteForm variant="inline" trade="plomberie" />
        </div>
      </section>

      {/* ─── LOGOS ASSURANCES ────────────────────────────────────── */}
      <section className="py-10 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-6 font-medium">
            Agréé par les principales compagnies d&apos;assurance
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { name: "AXA", logo: "/logos/axa.svg" },
              { name: "Allianz", logo: "/logos/allianz.svg" },
              { name: "MAIF", logo: "/logos/maif.svg" },
              { name: "Groupama", logo: "/logos/groupama.svg" },
              { name: "MACIF", logo: "/logos/macif.svg" },
              { name: "Matmut", logo: "/logos/matmut.svg" },
            ].map((ins) => (
              <div
                key={ins.name}
                className="flex items-center justify-center w-24 h-12 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all"
              >
                <Image
                  src={ins.logo}
                  alt={ins.name}
                  width={80}
                  height={32}
                  className="w-auto h-8 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA FINAL — ROUGE PLEIN ─────────────────────────────── */}
      <section className="bg-p1-red py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Award size={40} className="text-white/30 mx-auto mb-6" />
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white leading-tight mb-6">
            Votre problème ne peut pas attendre.
          </h2>
          <p className="text-white/70 text-lg mb-10">
            Nos plombiers interviennent maintenant, pas demain.
          </p>
          <a
            href={`tel:${phoneTel}`}
            onClick={() => trackCall("final_cta")}
            className="inline-flex items-center gap-4 bg-white text-p1-red font-bold text-xl sm:text-2xl px-10 py-6 rounded-2xl shadow-2xl hover:bg-white/95 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Phone size={26} className="animate-pulse" />
            <span>APPELER MAINTENANT</span>
          </a>
          <p className="text-white/50 text-sm mt-6">
            Appel gratuit · Devis en 30 secondes · Prix confirmé avant déplacement
          </p>
        </div>
      </section>

      {/* ─── FOOTER MINIMAL ──────────────────────────────────────── */}
      <footer className="bg-[#0B172A] py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Droplets size={16} className="text-[#F5D547]" />
            <span className="text-white font-bold">Joël</span>
            <span className="text-white/40 text-sm">— Plomberie d'urgence Paris & IDF</span>
          </div>
          <div className="flex items-center gap-6 text-white/40 text-xs">
            <a href="/mentions-legales" className="hover:text-white/70 transition-colors">Mentions légales</a>
            <a href="/confidentialite" className="hover:text-white/70 transition-colors">Confidentialité</a>
          </div>
        </div>
      </footer>

      {/* ─── STICKY MOBILE — ROUGE ───────────────────────────────── */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[60] md:hidden transition-transform duration-300 ${
          stickyVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="bg-p1-red px-4 pt-3 pb-4 safe-area-bottom shadow-2xl">
          <div className="flex items-center justify-center gap-1 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
            <span className="text-white/70 text-[11px] font-medium">
              {artisansCount} plombiers disponibles · Intervention 20 min
            </span>
          </div>
          <a
            href={`tel:${phoneTel}`}
            onClick={() => trackCall("sticky_mobile")}
            className="flex items-center justify-between gap-3 w-full bg-white text-p1-red font-bold text-lg py-3.5 px-5 rounded-xl shadow-lg"
          >
            <div className="flex items-center gap-3">
              <Phone size={22} className="animate-pulse" />
              <span>Appeler</span>
            </div>
            <span className="text-gray-400 text-sm font-normal">dès 79€</span>
          </a>
          <button
            onClick={() => setShowQuoteModal(true)}
            className="w-full text-white/70 text-xs text-center mt-2 hover:text-white transition-colors"
          >
            Ou recevoir un devis par écrit →
          </button>
        </div>
      </div>

      {/* ─── QUOTE MODAL ─────────────────────────────────────────── */}
      {showQuoteModal && (
        <QuickQuoteForm
          variant="modal"
          trade="plomberie"
          onClose={() => setShowQuoteModal(false)}
        />
      )}
    </main>
  );
}
