"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { AlertTriangle } from "lucide-react";
import { useSiteAsset } from "@/lib/hooks/useSiteAssets";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function StopArnaquesHero() {
  // Slot dynamique : scène conceptuelle facture déchirée 890€ → 89€ Joël.
  // Fallback path est défini dans site-asset-slots.ts.
  const sceneAsset = useSiteAsset("stop-arnaques-hero", "/images/stop-arnaques-hero.png");

  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      {/* Static violet elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-joel-violet/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-10 w-48 h-48 bg-joel-mauve/15 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Breadcrumbs SEO + UX */}
        <Breadcrumbs
          className="mb-6"
          items={[{ label: "Stop arnaques" }]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-12 items-center">
          {/* ── Côté gauche : H1 + lead ─────────────────────────────────── */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full mb-8"
            >
              <AlertTriangle size={18} />
              <span className="font-medium">Manifeste anti-arnaque</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              L&apos;arnaque au dépannage est un système.
              <br />
              <span className="gradient-text">On l&apos;a démonté.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Comment ça fonctionne, qui en profite, et ce qu&apos;on a changé
              pour que ça s&apos;arrête chez Joël.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-base md:text-lg text-gray-700 max-w-xl mx-auto lg:mx-0 text-left bg-white/60 backdrop-blur-xs rounded-2xl p-6 border border-white/50"
            >
              <p className="leading-relaxed">
                <strong className="text-joel-violet">8 200 signalements
                DGCCRF</strong> par an pour le seul dépannage à domicile.
                Derrière ce chiffre, un mécanisme bien rodé : prix d&apos;appel
                cassé au téléphone, devis qui explose une fois sur place,
                pression psychologique pour signer. On vous explique ce qui se
                passe vraiment, et pourquoi le tarif fixe payé à
                l&apos;artisan coupe l&apos;incitation à la racine.
              </p>
            </motion.div>
          </div>

          {/* ── Côté droit : scène conceptuelle facture déchirée ───────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative"
          >
            {/* Halo violet/jaune derrière l'image */}
            <div
              aria-hidden="true"
              className="absolute -inset-8 -z-10 opacity-70"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(112,85,167,0.25) 0%, rgba(245,213,71,0.12) 45%, transparent 75%)",
                filter: "blur(40px)",
              }}
            />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-joel-violet/30 ring-1 ring-white/50">
              <Image
                src={sceneAsset.url}
                alt="Mains tenant une facture Joël à 89€ remplaçant une facture de 890€ déchirée — illustration anti-arnaque concrète."
                width={1200}
                height={675}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Caption sous l'image — explique la scène */}
            <p className="mt-3 text-xs text-gray-500 italic text-center lg:text-right">
              Cas type IDF : devis annoncé 890€ → prix réel chez Joël 89€.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
