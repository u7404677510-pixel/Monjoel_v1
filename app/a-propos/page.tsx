"use client";

import { motion } from "motion/react";
import { Shield, Users, Award, Heart, Phone, Star } from "lucide-react";
import MidPageCTA from "@/components/MidPageCTA";
import { useSiteConfig, formatPhoneForTel } from "@/lib/hooks/useSiteConfig";
import Breadcrumbs from "@/components/Breadcrumbs";
import { generatePersonJoelStandaloneSchema } from "@/lib/seo/person-schema";

const values = [
  {
    icon: Shield,
    title: "Transparence",
    description: "Le prix annoncé au téléphone est le prix payé sur la facture. Une seule ligne, pas de « divers », pas de frais cachés.",
  },
  {
    icon: Users,
    title: "Confiance",
    description: "Chaque artisan partenaire est contrôlé : RC pro, qualifications, casier judiciaire vierge, identité vérifiée avant la première mission.",
  },
  {
    icon: Award,
    title: "Qualité",
    description: "Pièces neuves de marque (Vachette, Schneider, Legrand…) garanties 2 ans, main d'œuvre garantie 1 an, attestation conforme assurance.",
  },
  {
    icon: Heart,
    title: "Proximité",
    description: "Standard ouvert 24h/24 en français, jamais de robot, jamais de mise en relation à l'étranger. L'humain en première ligne.",
  },
];

const milestones = [
  { year: "2022", label: "L'idée Joël naît, après un débouchage à 590€." },
  { year: "2023", label: "Premiers artisans intégrés au réseau IDF." },
  { year: "2024", label: "5 000 interventions, prix fixe respecté à 100 %." },
  { year: "2025", label: "Couverture intégrale Île-de-France, 8 départements." },
];

function AProposHeroCTA() {
  const { config } = useSiteConfig();
  const handleClick = () => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "click_to_call",
        phone_number: config.phone_number,
        placement: "a_propos_hero",
      });
    }
  };
  if (!config.show_cta_phone) return null;
  return (
    <div className="mt-8 inline-flex flex-col items-center gap-3">
      <a
        href={`tel:${formatPhoneForTel(config.phone_number)}`}
        onClick={handleClick}
        data-placement="a-propos-hero"
        className="inline-flex items-center gap-3 bg-gradient-joel text-white font-bold text-base sm:text-lg px-7 sm:px-8 py-3.5 rounded-full shadow-xl shadow-joel-violet/30 hover:shadow-2xl hover:-translate-y-0.5 transition-all"
      >
        <Phone size={20} />
        <span>Appeler le {config.phone_number}</span>
      </a>
      <span className="inline-flex items-center gap-2 text-xs text-gray-500">
        <Star size={12} className="fill-joel-yellow text-joel-yellow" />
        <span>4.9/5 sur 947 avis Google · Disponible 24h/24</span>
      </span>
    </div>
  );
}

export default function AProposPage() {
  return (
    <>
      {/* Schema.org Person — page principale dédiée au fondateur. */}
      {/* Boost E-E-A-T : Google rattache le contenu à une personne réelle. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generatePersonJoelStandaloneSchema()),
        }}
      />
      <Breadcrumbs mode="standalone" items={[{ label: "À propos" }]} />
      <div className="pt-8 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="gradient-text">Joël</span>, en deux mots.
          </h1>
          <p className="text-xl text-gray-600">
            On a démonté l&apos;incitation à arnaquer. Le prix annoncé est le
            prix payé. Pas par éthique : par mécanique.
          </p>
          <AProposHeroCTA />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg max-w-none mb-16"
        >
          <div className="bg-white/80 backdrop-blur-xs rounded-3xl p-8 shadow-lg border border-white/50">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">L&apos;origine</h2>
            <p className="text-gray-600 mb-4">
              Octobre 2022. Une amie nous appelle un dimanche soir, son WC est
              bouché. Elle a déjà téléphoné au premier numéro Google.
              L&apos;artisan annonce 79€ au téléphone, repart 25 minutes plus
              tard avec un chèque de 590€ pour avoir « démonté la cuvette »
              — alors qu&apos;un coup de furet aurait suffi. Pas de devis écrit.
              Pas de SIRET vérifiable.
            </p>
            <p className="text-gray-600 mb-4">
              On regarde l&apos;adresse de la société : une boîte aux lettres
              partagée à Saint-Ouen, déjà signalée à la DGCCRF. On comprend
              que l&apos;arnaque n&apos;est pas le fait d&apos;un escroc isolé,
              c&apos;est un système : prix d&apos;appel cassé, devis flou
              signé sous pression, facturation à la tête du client. Le coupable
              technique n&apos;est pas l&apos;artisan, c&apos;est
              l&apos;incitation. Tant que celui qui répare est payé en
              pourcentage du prix client, il a un intérêt direct à le gonfler.
            </p>
            <p className="text-gray-600 mb-2">
              Joël est né de cette idée : on inverse l&apos;incitation. On paye
              chaque artisan partenaire à tarif fixe, indépendamment du prix
              facturé au client. Aucun bonus, aucune prime au volume. Le prix
              annoncé au téléphone est le prix payé. C&apos;est mécanique, pas
              moral. Et ça change tout.
            </p>
            <p className="text-sm text-gray-500 italic mt-4">
              Une urgence en cours ? On répond 24h/24 au 01 41 69 10 08.
            </p>
          </div>
        </motion.div>

        {/* La méthode — chronologie */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">La méthode</h2>
          <div className="bg-white/80 backdrop-blur-xs rounded-3xl p-6 sm:p-8 shadow-lg border border-white/50">
            <ul className="space-y-4">
              {milestones.map((m) => (
                <li key={m.year} className="flex items-baseline gap-4 sm:gap-6 border-b border-gray-100 last:border-b-0 pb-3 last:pb-0">
                  <span className="font-mono text-base sm:text-lg font-bold text-joel-violet shrink-0 w-16">
                    {m.year}
                  </span>
                  <span className="text-gray-700 leading-relaxed">{m.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Quote fondateur */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <blockquote className="relative bg-gradient-joel rounded-3xl p-8 sm:p-12 shadow-xl shadow-joel-violet/30">
            <p className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white leading-tight italic">
              « Tant que l&apos;artisan est payé au pourcentage,
              il a intérêt à gonfler. On paye à tarif fixe. »
            </p>
            <footer className="mt-6 text-sm text-white/80 font-mono uppercase tracking-wider">
              — Mehdi, fondateur Joël
            </footer>
          </blockquote>
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
                className="bg-white/80 backdrop-blur-xs rounded-2xl p-6 shadow-lg border border-white/50"
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

      {/* CTA conversion en bas — la page A propos doit aussi convertir */}
      <div className="mt-16">
        <MidPageCTA
          title="Une urgence dépannage ?"
          subtitle="Joël intervient 24h/24 — devis instantané, prix fixe garanti"
          placement="a_propos_bottom"
        />
      </div>
    </div>
    </>
  );
}


