"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Send,
  CheckCircle,
  Loader2,
  Wrench,
  Zap,
  KeyRound,
  MapPin,
  Clock,
  BadgeCheck,
  TrendingUp,
  Users,
  Quote,
  ChevronDown,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

const trades = [
  { value: "serrurerie", label: "Serrurerie", icon: KeyRound },
  { value: "plomberie", label: "Plomberie", icon: Wrench },
  { value: "electricite", label: "Électricité", icon: Zap },
];

const advantages = [
  {
    icon: TrendingUp,
    title: "Volume garanti",
    description:
      "En moyenne 18 à 25 missions/mois sur Paris intra-muros, 8 à 14 en couronne IDF — selon votre disponibilité.",
    stat: "≈ 200 missions/an",
  },
  {
    icon: BadgeCheck,
    title: "Tarif fixe à l'artisan",
    description:
      "Vous êtes payé à un tarif fixe par mission, indépendant du prix client. Pas de commission au pourcentage, pas de variable cachée.",
    stat: "0 % commission",
  },
  {
    icon: Clock,
    title: "Agenda libre",
    description:
      "Vous validez chaque mission individuellement avant qu'elle vous soit attribuée. Pas de pénalité au refus, pas de quota imposé.",
    stat: "Disponibilité à la carte",
  },
  {
    icon: Users,
    title: "Image marque & outils",
    description:
      "Identité Joël (uniforme + logos), back-office mobile pour suivi missions, factures auto, paiement sous 7 jours après intervention.",
    stat: "Paiement à 7 j",
  },
];

const artisanTestimonial = {
  name: "David M.",
  trade: "Plombier",
  city: "Vitry-sur-Seine",
  text: "J'ai rejoint Joël il y a 14 mois après 8 ans en indépendant. Aujourd'hui je tourne à 22 missions par mois en moyenne, payé tarif fixe sans avoir à négocier sur place. Je passe 3h de moins par semaine en relances client. Mon CA est plus stable, ma tête plus claire.",
};

const artisanFaqs = [
  {
    q: "Comment je suis payé concrètement ?",
    a: "Tarif fixe par mission, défini à l'avance par grille de service (ex : ouverture porte claquée = 89€ artisan, débouchage WC = 79€). Vous êtes payé sous 7 jours par virement après chaque intervention validée par le client. Aucune commission, aucune retenue surprise.",
  },
  {
    q: "Quelle est la commission Joël sur mon travail ?",
    a: "Joël ne prend pas de commission au pourcentage. Le client paye un service global (intervention + garantie + back-office), et vous êtes rémunéré au tarif convenu sans variable. Ce qu'il facture au client en plus couvre nos coûts (téléphone, plateforme, garantie SAV) — c'est totalement décorrélé de votre rémunération.",
  },
  {
    q: "Quels documents demandés pour rejoindre ?",
    a: "RC pro à jour, qualifications (Qualibat / Qualifelec / certif A2P selon métier), extrait Kbis, attestation URSSAF, casier judiciaire vierge (B3 personnel), permis B. Documents à fournir une fois pour toute après validation du profil. Pas de cotisation d'entrée.",
  },
  {
    q: "Combien de missions par mois en réalité ?",
    a: "Sur Paris intra-muros, un artisan disponible 5j/7 + 2 nuits tourne entre 18 et 25 missions/mois après 3 mois d'ancienneté. En couronne IDF (77/78/91/95), plutôt 8 à 14 missions/mois. Volume monté progressivement selon retours clients.",
  },
  {
    q: "Puis-je refuser une mission ?",
    a: "Oui, sans pénalité ni explication. Chaque mission est proposée en notification (push + SMS) — vous avez 90 secondes pour accepter ou décliner avant qu'elle parte au suivant. Aucun quota, aucun TJM imposé. La seule contrainte : honorer les missions acceptées (sinon retrait du réseau).",
  },
];

export default function RecrutementPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    trades: [] as string[],
    zone: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSending(true);

    try {
      const res = await fetch("/api/recruitment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Une erreur est survenue.");
        setSending(false);
        return;
      }

      setSending(false);
      setSent(true);

      // Google Ads conversion tracking - Envoi formulaire lead recrutement
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', {
          send_to: 'AW-17805011663/lrrjCIqzkPobEM_Vi6pC',
        });
      }

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        trades: [],
        zone: "",
        message: "",
      });
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
      setSending(false);
    }
  };

  return (
    <>
    <Breadcrumbs mode="standalone" items={[{ label: "Recrutement" }]} />
    <div className="min-h-screen pt-8 pb-16 bg-linear-to-br from-joel-violet/5 via-white to-joel-mauve/5 relative overflow-hidden">
      {/* Background decorations continues */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-joel-violet/8 rounded-full blur-3xl" />
        <div className="absolute top-[40%] right-0 w-[400px] h-[400px] bg-joel-mauve/8 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-[450px] h-[450px] bg-joel-violet/6 rounded-full blur-3xl" />
        <div className="absolute bottom-[30%] right-1/4 w-[350px] h-[350px] bg-joel-yellow/5 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-joel-violet/10 text-joel-violet text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <Users size={16} />
              Recrutement artisans
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Rejoignez le réseau{" "}
              <span className="gradient-text">Joël</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Serruriers, plombiers, électriciens : devenez artisan partenaire
              et recevez des missions qualifiées en Île-de-France.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Avantages Section */}
      <div className="max-w-6xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            Pourquoi rejoindre <span className="gradient-text">Joël</span> ?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white/80 backdrop-blur-xs rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-joel rounded-xl flex items-center justify-center mb-4">
                  <advantage.icon size={24} className="text-white" />
                </div>
                <h3 className="font-display text-lg font-bold text-gray-900 mb-2">
                  {advantage.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  {advantage.description}
                </p>
                <span className="inline-block text-xs font-mono uppercase tracking-wider text-joel-violet bg-joel-violet/10 px-2 py-1 rounded-md">
                  {advantage.stat}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Témoignage artisan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 max-w-3xl mx-auto"
        >
          <div className="bg-gradient-joel rounded-3xl p-8 md:p-10 text-white shadow-xl shadow-joel-violet/20 relative overflow-hidden">
            <Quote className="absolute top-6 right-6 text-white/15" size={80} />
            <div className="relative z-10">
              <p className="text-lg md:text-xl leading-relaxed italic mb-6">
                « {artisanTestimonial.text} »
              </p>
              <footer className="flex items-center gap-3 pt-4 border-t border-white/20">
                <div className="w-12 h-12 bg-joel-yellow text-joel-violet rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                  {artisanTestimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold">{artisanTestimonial.name}</p>
                  <p className="text-white/80 text-sm">
                    {artisanTestimonial.trade} · {artisanTestimonial.city}
                  </p>
                </div>
              </footer>
            </div>
          </div>
        </motion.div>

        {/* FAQ artisan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 max-w-3xl mx-auto"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            Questions concrètes — artisans
          </h2>
          <div className="space-y-3">
            {artisanFaqs.map((faq) => (
              <details
                key={faq.q}
                className="group border border-gray-100 rounded-2xl overflow-hidden bg-white/80 backdrop-blur-xs"
              >
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 px-6 py-5 hover:bg-gray-50 transition-colors">
                  <span className="font-bold text-gray-900 text-sm sm:text-base pr-2">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={20}
                    className="shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-180"
                  />
                </summary>
                <div className="px-6 pb-5 border-t border-gray-100">
                  <p className="text-gray-600 text-sm leading-relaxed pt-4">
                    {faq.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Form Section */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-gradient-joel rounded-3xl p-8 text-white h-full flex flex-col justify-between">
              <div>
                <h2 className="font-display text-2xl font-bold mb-6">
                  Comment ça marche ?
                </h2>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Inscrivez-vous</h3>
                      <p className="text-white/80 text-sm">
                        Remplissez le formulaire avec vos informations et votre
                        zone d&apos;intervention.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">
                        Validation du profil
                      </h3>
                      <p className="text-white/80 text-sm">
                        Joël vérifie vos qualifications et vous
                        recontacte rapidement.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">
                        Recevez des missions
                      </h3>
                      <p className="text-white/80 text-sm">
                        Commencez à recevoir des demandes d&apos;intervention
                        qualifiées sur votre zone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/20">
                <div className="flex items-center gap-3">
                  <MapPin size={20} />
                  <div>
                    <p className="font-semibold">Zone couverte</p>
                    <p className="text-white/80 text-sm">
                      Toute l&apos;Île-de-France (75, 77, 78, 91, 92, 93, 94,
                      95)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-white/80 backdrop-blur-xs rounded-3xl p-8 shadow-lg border border-white/50">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
                Déposez votre candidature
              </h2>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Candidature envoyée !
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Merci pour votre intérêt. Joël examinera votre profil
                    et vous recontactera dans les plus brefs délais.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 text-joel-violet hover:underline font-medium"
                  >
                    Envoyer une autre candidature
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Prénom + Nom */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Prénom <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({ ...formData, firstName: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-joel-violet focus:border-transparent outline-hidden transition-all"
                        placeholder="Votre prénom"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nom <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-joel-violet focus:border-transparent outline-hidden transition-all"
                        placeholder="Votre nom"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-joel-violet focus:border-transparent outline-hidden transition-all"
                      placeholder="votre@email.com"
                    />
                  </div>

                  {/* Téléphone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Téléphone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-joel-violet focus:border-transparent outline-hidden transition-all"
                      placeholder="06 12 34 56 78"
                    />
                  </div>

                  {/* Corps de métier - sélection multiple */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Corps de métier <span className="text-red-500">*</span>
                      <span className="text-gray-400 font-normal text-xs ml-1">(un ou plusieurs)</span>
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {trades.map((trade) => {
                        const isSelected = formData.trades.includes(trade.value);
                        return (
                          <button
                            key={trade.value}
                            type="button"
                            onClick={() => {
                              const newTrades = isSelected
                                ? formData.trades.filter((t) => t !== trade.value)
                                : [...formData.trades, trade.value];
                              setFormData({ ...formData, trades: newTrades });
                            }}
                            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                              isSelected
                                ? "border-joel-violet bg-joel-violet/5 text-joel-violet shadow-md"
                                : "border-gray-200 text-gray-500 hover:border-joel-violet/30 hover:bg-gray-50"
                            }`}
                          >
                            <trade.icon
                              size={24}
                              className={
                                isSelected ? "text-joel-violet" : "text-gray-400"
                              }
                            />
                            <span className="text-sm font-medium">
                              {trade.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    {/* Hidden required input for form validation */}
                    <input
                      type="text"
                      required
                      value={formData.trades.join(",")}
                      onChange={() => {}}
                      className="sr-only"
                      tabIndex={-1}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Zone d'intervention */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Zone d&apos;intervention{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.zone}
                      onChange={(e) =>
                        setFormData({ ...formData, zone: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-joel-violet focus:border-transparent outline-hidden transition-all"
                      placeholder="Ex : Paris, Hauts-de-Seine, Val-de-Marne..."
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Indiquez les villes ou départements où vous intervenez
                    </p>
                  </div>

                  {/* Message optionnel */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message{" "}
                      <span className="text-gray-400 font-normal">
                        (optionnel)
                      </span>
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-joel-violet focus:border-transparent outline-hidden resize-none transition-all"
                      placeholder="Présentez-vous en quelques mots, votre expérience..."
                    />
                  </div>

                  {/* Error message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                      {error}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-joel text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-70"
                  >
                    {sending ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Envoyer ma candidature
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-400 text-center">
                    En soumettant ce formulaire, vous acceptez d&apos;être
                    recontacté par Joël.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
    </>
  );
}
