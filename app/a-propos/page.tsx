"use client";

import { motion } from "framer-motion";
import { Shield, Users, Award, Heart } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Transparence",
    description: "Prix fixes annoncés à l'avance, sans surprise ni frais cachés.",
  },
  {
    icon: Users,
    title: "Confiance",
    description: "Artisans vérifiés, qualifiés et assurés pour votre sécurité.",
  },
  {
    icon: Award,
    title: "Qualité",
    description: "Un travail garanti et un service après-intervention inclus.",
  },
  {
    icon: Heart,
    title: "Proximité",
    description: "Une équipe à votre écoute 24h/24, 7j/7 pour vos urgences.",
  },
];

export default function AProposPage() {
  return (
    <div className="pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            À propos de <span className="gradient-text">Joël</span>
          </h1>
          <p className="text-xl text-gray-600">
            Notre mission : mettre fin aux arnaques au dépannage en France.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg max-w-none mb-16"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Notre histoire</h2>
            <p className="text-gray-600 mb-4">
              Joël est né d'un constat simple : trop de Français sont victimes d'arnaques 
              lors de dépannages d'urgence. Serruriers, plombiers, électriciens... 
              les histoires de factures abusives se multiplient.
            </p>
            <p className="text-gray-600 mb-4">
              Nous avons créé Joël pour offrir une alternative fiable et transparente. 
              Notre plateforme connecte les particuliers avec des artisans vérifiés, 
              qualifiés et engagés à respecter des prix fixes annoncés à l'avance.
            </p>
            <p className="text-gray-600">
              Aujourd'hui, Joël accompagne des milliers de Français dans leurs 
              dépannages d'urgence, avec un objectif : zéro arnaque, zéro stress.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Nos valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50"
              >
                <div className="w-12 h-12 bg-gradient-joel rounded-xl flex items-center justify-center mb-4">
                  <value.icon size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

