"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, Eye, Clock, BadgeEuro, Target, ArrowRight, Wrench, MessageSquare, Camera } from "lucide-react";
import Link from "next/link";

const TRUESCOPE_URL = "https://www.truescope-by-joel.tech/nouvelle-demande";

const steps = [
  {
    number: "01",
    icon: Wrench,
    title: "CHOISISSEZ VOTRE MÉTIER",
    description: "Serrurerie, plomberie ou électricité ? Sélectionnez le corps de métier qui correspond à votre urgence.",
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "DÉCRIVEZ LE PROBLÈME",
    description: "En une phrase simple, dites-nous ce qui ne va pas. Notre IA comprend le langage humain, pas besoin de jargon technique.",
  },
  {
    number: "03",
    icon: Camera,
    title: "PRENEZ UNE PHOTO",
    description: "Capturez le problème en image. TrueScope analyse visuellement la situation pour un diagnostic ultra-précis.",
  },
];

const features = [
  {
    icon: Clock,
    title: "INSTANTANÉ",
    description: "Devis et solution en moins de 60 secondes. L'urgence n'attend pas.",
  },
  {
    icon: BadgeEuro,
    title: "PRIX TRANSPARENT",
    description: "Connaissez le prix exact avant même que l'artisan se déplace. Zéro mauvaise surprise.",
  },
  {
    icon: Target,
    title: "SOLUTION PRÉCISE",
    description: "Notre IA analyse en profondeur pour identifier la vraie cause et la vraie solution.",
  },
];

export default function TrueScopePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-joel-violet/5 to-joel-mauve/10 relative">
      {/* Global Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-joel-violet/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-joel-mauve/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-joel-yellow/5 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-8 shadow-sm"
          >
            <Sparkles size={16} className="text-joel-violet" />
            <span className="text-sm font-semibold text-joel-violet uppercase tracking-wide">
              Propulsé par l'Intelligence Artificielle
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          >
            VOTRE URGENCE<span className="text-joel-yellow">.</span>
            <br />
            <span className="bg-gradient-joel bg-clip-text text-transparent">RÉSOLUE EN 3 CLICS<span className="text-joel-yellow">.</span></span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Serrurerie<span className="text-joel-yellow">.</span> Plomberie<span className="text-joel-yellow">.</span> Électricité<span className="text-joel-yellow">.</span> TrueScope analyse votre problème, 
            vous donne le prix exact et la solution immédiate<span className="text-joel-yellow">.</span>
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a
              href={TRUESCOPE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-joel text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Zap size={22} className="relative z-10" />
              <span className="relative z-10">Essayer TrueScope Gratuitement</span>
              <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-joel-violet/30 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-3 bg-joel-violet rounded-full mt-2"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Manifeste Section */}
      <section className="relative py-16">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              POURQUOI TRUESCOPE<span className="text-joel-yellow"> ?</span>
            </h2>
            <p className="text-xl text-gray-600">
              Même problème = même prix<span className="text-joel-yellow">.</span> Toujours<span className="text-joel-yellow">.</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-lg border border-white/50"
          >
            <div className="max-w-none text-gray-600 leading-relaxed space-y-6 text-lg md:text-xl">
              <p>
                Joël a vu trop de clients se faire arnaquer<span className="text-joel-yellow font-bold">.</span> Des devis qui varient du simple au triple, pour le même problème, parce que l'artisan "sent" qu'il peut facturer plus<span className="text-joel-yellow font-bold">.</span>
              </p>
              
              <p>
                Alors on a développé <strong className="text-gray-900">TrueScope</strong><span className="text-joel-yellow font-bold">.</span> Une IA incorruptible<span className="text-joel-yellow font-bold">.</span> Un algorithme qui ne triche pas<span className="text-joel-yellow font-bold">.</span> Un système qui analyse votre urgence et fixe le prix — le même, pour tous<span className="text-joel-yellow font-bold">.</span>
              </p>
              
              <p>
                Pas de négociation à la tête du client<span className="text-joel-yellow font-bold">.</span> Pas de tarif "ça dépend"<span className="text-joel-yellow font-bold">.</span> Pas de majoration surprise<span className="text-joel-yellow font-bold">.</span>
              </p>
              
              <p className="text-xl md:text-2xl font-semibold text-gray-900">
                L'ère de l'arnaque est terminée<span className="text-joel-yellow">.</span> Bienvenue dans l'ère de la transparence totale<span className="text-joel-yellow">.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="relative py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              COMMENT ÇA MARCHE<span className="text-joel-yellow"> ?</span>
            </h2>
            <p className="text-xl text-gray-600">
              Trois étapes<span className="text-joel-yellow">.</span> Zéro prise de tête<span className="text-joel-yellow">.</span>
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:shadow-joel-violet/20 hover:-translate-y-2 transition-all duration-300 border border-white/50"
              >
                {/* Number badge */}
                <div className="absolute -top-4 -left-4 w-14 h-14 bg-gradient-joel rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">{step.number}</span>
                </div>

                {/* Icon */}
                <div className="w-16 h-16 bg-joel-violet/10 rounded-2xl flex items-center justify-center mb-6 mt-4 group-hover:bg-joel-violet/20 transition-colors">
                  <step.icon size={28} className="text-joel-violet" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group text-center p-8"
              >
                {/* Icon */}
                <div className="w-20 h-20 bg-gradient-joel rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <feature.icon size={36} className="text-white" />
                </div>

                {/* Content */}
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-24">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-joel rounded-[2.5rem] p-12 md:p-16 text-center relative overflow-hidden"
          >
            {/* Background decorations */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
                PRÊT À RÉSOUDRE VOTRE URGENCE<span className="text-joel-yellow"> ?</span>
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-xl mx-auto">
                Accédez gratuitement à TrueScope et obtenez votre devis instantané<span className="text-joel-yellow">.</span> Aucune inscription requise<span className="text-joel-yellow">.</span>
              </p>
              <a
                href={TRUESCOPE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-joel-violet font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-joel-violet/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Eye size={22} className="relative z-10" />
                <span className="relative z-10">Lancer TrueScope</span>
                <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <section className="relative py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} TrueScope<span className="text-joel-yellow">.</span> Propulsé par l'intelligence artificielle au service de vos urgences<span className="text-joel-yellow">.</span>
          </p>
          <Link href="/" className="text-joel-violet hover:text-joel-mauve text-sm mt-2 inline-block transition-colors">
            ← Retour à Joël
          </Link>
        </div>
      </section>
    </main>
  );
}
