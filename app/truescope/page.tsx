"use client";

/**
 * TrueScope — landing dédiée à l'app de devis instantané IA.
 *
 * Refonte 2026-05-02 : suppression caps lock + ponctuation jaune décorative.
 * Voix Joël franche, mécanique expliquée pas slogan AI-marketing.
 */

import { motion } from "motion/react";
import { Sparkles, Zap, Eye, Clock, BadgeEuro, Target, ArrowRight, Wrench, MessageSquare, Camera } from "lucide-react";
import Link from "next/link";

const TRUESCOPE_URL = "https://monjoel.fr/app/truescope";

const steps = [
  {
    number: "01",
    icon: Wrench,
    title: "Choisissez votre métier",
    description: "Plomberie, serrurerie, électricité — un clic suffit pour cadrer le diagnostic.",
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "Décrivez en français",
    description: "Une phrase, vos mots. Pas de jargon technique, pas de QCM interminable.",
  },
  {
    number: "03",
    icon: Camera,
    title: "Prenez une photo",
    description: "L'image complète la description. Le diagnostic devient précis sans interprétation à la louche.",
  },
];

const features = [
  {
    icon: Clock,
    title: "Réponse en 60 s",
    description: "Devis fixe affiché à l'écran, pas d'attente, pas de rappel commercial différé.",
  },
  {
    icon: BadgeEuro,
    title: "Le même prix pour tous",
    description: "L'IA ne sait pas qui vous êtes. Elle ne peut pas adapter le tarif à votre tête, votre quartier, votre heure.",
  },
  {
    icon: Target,
    title: "Diagnostic défendable",
    description: "Le devis détaille la cause, la pièce, la durée estimée. Vous arrivez à l'intervention informé.",
  },
];

export default function TrueScopePage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-white via-joel-violet/5 to-joel-mauve/10 relative">
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-xs rounded-full mb-8 shadow-xs"
          >
            <Sparkles size={16} className="text-joel-violet" />
            <span className="text-sm font-semibold text-joel-violet uppercase tracking-wide">
              TrueScope — devis instantané
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Un prix fixe.
            <br />
            <span className="bg-gradient-joel bg-clip-text text-transparent">Avant qu&apos;on sonne</span>
            <span className="text-joel-yellow">.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Vous décrivez votre panne, vous prenez une photo. TrueScope renvoie
            le tarif fixe en 60 secondes. Le même pour tout le monde.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a
              href={TRUESCOPE_URL}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-joel text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Zap size={22} className="relative z-10" />
              <span className="relative z-10">Obtenir mon devis</span>
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
              Pourquoi TrueScope existe
            </h2>
            <p className="text-xl text-gray-600">
              Même problème, même prix. Pas par éthique : par mécanique.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-xs rounded-3xl p-8 md:p-12 shadow-lg border border-white/50"
          >
            <div className="max-w-none text-gray-600 leading-relaxed space-y-6 text-lg md:text-xl">
              <p>
                Le devis dépannage à domicile varie aujourd&apos;hui du simple
                au triple pour le même problème. La cause n&apos;est pas
                l&apos;artisan : c&apos;est l&apos;incitation. Tant que le
                tarif final est négociable sur place, on a tous intérêt à
                partir un peu plus haut.
              </p>

              <p>
                <strong className="text-gray-900">TrueScope</strong> coupe
                cette incitation à la source. L&apos;IA reçoit votre
                description et la photo. Elle ne sait pas votre nom, votre
                quartier, ni l&apos;heure qu&apos;il est pour vous. Elle
                renvoie un tarif fixe basé sur le problème — exactement le
                même qu&apos;elle renverrait à votre voisin avec la même
                fuite.
              </p>

              <p>
                C&apos;est ce tarif fixe qui apparaît au téléphone, qui est
                annoncé à l&apos;artisan partenaire, et qui figure sur la
                facture. Pas de variable, pas de marge négociée à la tête du
                client.
              </p>

              <p className="text-xl md:text-2xl font-semibold text-gray-900">
                Vous savez combien vous payez{" "}
                <span className="bg-gradient-joel bg-clip-text text-transparent italic">
                  avant qu&apos;on sonne
                </span>
                .
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
              Comment ça marche
            </h2>
            <p className="text-xl text-gray-600">
              Trois étapes, soixante secondes, pas de compte à créer.
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
                className="group relative bg-white/80 backdrop-blur-xs rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:shadow-joel-violet/20 hover:-translate-y-2 transition-all duration-300 border border-white/50"
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
                Votre devis fixe en 60 secondes
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-xl mx-auto">
                Pas d&apos;inscription, pas de carte bancaire, pas de rappel commercial.
                Vous décrivez, l&apos;IA répond, vous décidez.
              </p>
              <a
                href={TRUESCOPE_URL}
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-joel-violet font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <span className="absolute inset-0 bg-linear-to-r from-transparent via-joel-violet/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
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
            © {new Date().getFullYear()} TrueScope — l&apos;outil de devis fixe
            de Joël, plombier-serrurier-électricien IDF.
          </p>
          <Link href="/" className="text-joel-violet hover:text-joel-mauve text-sm mt-2 inline-block transition-colors">
            ← Retour à Joël
          </Link>
        </div>
      </section>
    </main>
  );
}
