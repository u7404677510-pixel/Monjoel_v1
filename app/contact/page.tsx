"use client";

/**
 * Contact — page de contact enrichie (refonte 2026-05-02).
 *
 * Apports vs version précédente :
 *  - Bandeau "Que se passe-t-il après l'appel" (4 étapes rassurantes)
 *  - Coordonnées détaillées : adresse postale + horaires URGENCE vs ADMIN + SIRET TODO
 *  - 4 FAQ contact (pourquoi appeler, délai mail, facture, problème post-intervention)
 *  - Form enrichi avec menu déroulant "Type de demande" + microcopy
 */

import { useState } from "react";
import { motion } from "motion/react";
import { Send, Mail, MapPin, CheckCircle, Loader2, Phone, Wrench, Truck, FileCheck, ShieldCheck, ChevronDown } from "lucide-react";
import PhoneButton from "@/components/PhoneButton";
import MidPageCTA from "@/components/MidPageCTA";
import Breadcrumbs from "@/components/Breadcrumbs";

const REQUEST_TYPES = [
  { value: "question", label: "Question avant intervention" },
  { value: "reclamation", label: "Réclamation post-intervention" },
  { value: "recrutement", label: "Recrutement artisan" },
  { value: "presse", label: "Presse / partenariat" },
  { value: "autre", label: "Autre" },
] as const;

const callJourney = [
  {
    icon: Phone,
    title: "Vous appelez",
    description: "Standard ouvert 24h/24 en français, décrochage en moins de 60 secondes en moyenne.",
  },
  {
    icon: Wrench,
    title: "On qualifie le problème",
    description: "Quelques questions précises (métier, panne, code postal). Devis fixe annoncé en 90 secondes.",
  },
  {
    icon: Truck,
    title: "L'artisan part",
    description: "Identité communiquée par SMS avec photo et matricule. Arrivée en 30 min Paris, 60 min couronne.",
  },
  {
    icon: FileCheck,
    title: "Vous payez après",
    description: "Le prix annoncé est le prix payé. CB, virement ou espèces. Facture conforme assurance par mail.",
  },
];

const contactFaqs = [
  {
    q: "Pourquoi appeler plutôt qu'écrire ?",
    a: "Pour une urgence dépannage, le téléphone reste le plus rapide : devis annoncé en 90 secondes et artisan en route immédiatement. Le mail est utile pour les questions non-urgentes (réclamation, devis travaux planifiés, recrutement).",
  },
  {
    q: "Combien de temps pour une réponse mail ?",
    a: "Réponse sous 24h ouvrées (Lun-Ven 9h-18h) pour les demandes administratives. Pour les urgences, ne pas écrire — appeler directement le 01 41 69 10 08, qui décroche 24h/24.",
  },
  {
    q: "Comment récupérer une facture déjà payée ?",
    a: "Toutes nos factures sont envoyées par mail dans les 24h après intervention. Si vous ne la trouvez plus, donnez-nous votre nom + date d'intervention par mail à contact@monjoel.fr, on la renvoie sous 4h ouvrées.",
  },
  {
    q: "Comment signaler un problème post-intervention ?",
    a: "Appel direct au 01 41 69 10 08 ou mail avec « Réclamation » en objet. Sous 30 jours, le retour de l'artisan pour la même cause est sans frais. Au-delà, garantie pièces 2 ans constructeur, garantie main d'œuvre 1 an.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    requestType: "question",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    // Simulate sending (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 1500));

    setSending(false);
    setSent(true);
    setFormData({ name: "", email: "", requestType: "question", subject: "", message: "" });
  };

  return (
    <>
      <Breadcrumbs mode="standalone" items={[{ label: "Contact" }]} />
      <div className="pt-8 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contacter <span className="gradient-text">Joël</span>
          </h1>
          <p className="text-xl text-gray-600">
            Pour une urgence : 01 41 69 10 08, on décroche 24h/24.
            Pour le reste, on lit chaque mail.
          </p>
        </motion.div>

        {/* Bloc 1 — Que se passe-t-il après l'appel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Que se passe-t-il après votre appel
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {callJourney.map((step, i) => (
              <div
                key={step.title}
                className="bg-white/80 backdrop-blur-xs rounded-2xl p-6 shadow-lg border border-white/50 relative"
              >
                <span className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-joel rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {i + 1}
                </span>
                <div className="w-12 h-12 bg-joel-violet/10 rounded-xl flex items-center justify-center mb-4">
                  <step.icon size={22} className="text-joel-violet" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Bloc 2 — Coordonnées détaillées */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-gradient-joel rounded-3xl p-8 text-white h-full">
              <h2 className="text-2xl font-bold mb-6">Coordonnées</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Phone size={18} className="text-joel-yellow" />
                    Urgence dépannage (24h/24)
                  </h3>
                  <PhoneButton variant="text" className="text-white hover:text-white/80 text-2xl font-bold" />
                  <p className="text-white/80 text-sm mt-1">
                    Standard humain en français, décrochage &lt;60s.
                    Pas de robot, pas de centre offshore.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Mail size={18} className="text-joel-yellow" />
                    Email administratif
                  </h3>
                  <a href="mailto:contact@monjoel.fr" className="text-white hover:text-white/80 underline">
                    contact@monjoel.fr
                  </a>
                  <p className="text-white/80 text-sm mt-1">
                    Lun-Ven 9h-18h, réponse sous 24h ouvrées.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <MapPin size={18} className="text-joel-yellow" />
                    Couverture
                  </h3>
                  <address className="not-italic text-white/90 text-sm leading-relaxed">
                    Joël SAS — Île-de-France<br />
                    Paris (75) · Petite couronne (92, 93, 94)<br />
                    Grande couronne (77, 78, 91, 95)
                  </address>
                </div>

                <div className="pt-4 border-t border-white/20 text-xs text-white/70">
                  <p>Société à responsabilité limitée Joël SAS</p>
                  <p>Mentions légales complètes : <a href="/mentions-legales" className="underline hover:text-joel-yellow">mentions-legales</a></p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/20">
                <h3 className="font-semibold mb-3 text-joel-yellow">Horaires</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span>Urgence intervention</span>
                    <span className="font-bold">24h/24, 7j/7</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Standard administratif</span>
                    <span className="font-bold">Lun-Ven 9h-18h</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Réclamations & SAV</span>
                    <span className="font-bold">Lun-Sam 8h-20h</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Bloc 4 — Form enrichi */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white/80 backdrop-blur-xs rounded-3xl p-8 shadow-lg border border-white/50">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Envoyer un message</h2>
              <p className="text-sm text-gray-500 mb-6">
                Pour une urgence dépannage, appelez plutôt le 01 41 69 10 08 — on intervient en 30 min sur Paris.
              </p>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message reçu</h3>
                  <p className="text-gray-600">
                    On vous répond sous 24h ouvrées sur l&apos;email indiqué.
                    Pour une urgence, appelez le <strong>01 41 69 10 08</strong>.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 text-joel-violet hover:underline"
                  >
                    Envoyer un autre message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="contact-request-type" className="block text-sm font-medium text-gray-700 mb-1">
                      Type de demande
                    </label>
                    <div className="relative">
                      <select
                        id="contact-request-type"
                        required
                        value={formData.requestType}
                        onChange={(e) => setFormData({ ...formData, requestType: e.target.value })}
                        className="w-full appearance-none px-4 py-3 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-joel-violet focus:border-transparent outline-hidden bg-white"
                      >
                        {REQUEST_TYPES.map((t) => (
                          <option key={t.value} value={t.value}>
                            {t.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={18}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-joel-violet focus:border-transparent outline-hidden"
                      placeholder="Prénom Nom"
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-joel-violet focus:border-transparent outline-hidden"
                      placeholder="vous@exemple.fr"
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 mb-1">Sujet (court)</label>
                    <input
                      id="contact-subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-joel-violet focus:border-transparent outline-hidden"
                      placeholder="Ex : Devis travaux planifiés ou Réclamation #1234"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">Message détaillé</label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-joel-violet focus:border-transparent outline-hidden resize-none"
                      placeholder="Décrivez votre demande en quelques lignes — métier concerné, ville, contexte si pertinent."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-joel text-white font-semibold rounded-xl hover:shadow-lg transition-shadow disabled:opacity-70"
                  >
                    {sending ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Envoi en cours…
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Envoyer
                      </>
                    )}
                  </button>
                  <p className="text-xs text-gray-500 text-center pt-2">
                    Vos données ne sont utilisées que pour traiter cette demande.
                    Aucun rappel commercial, aucun partage tiers.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Bloc 3 — FAQ contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-joel rounded-xl flex items-center justify-center shrink-0">
              <ShieldCheck size={20} className="text-white" />
            </div>
            <h2 className="font-display font-bold text-2xl text-gray-900">
              Questions fréquentes — Contact
            </h2>
          </div>
          <div className="space-y-3">
            {contactFaqs.map((faq) => (
              <details
                key={faq.q}
                className="group border border-gray-100 rounded-2xl overflow-hidden bg-white/80"
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

      {/* CTA conversion bas — urgence prend le dessus sur le formulaire */}
      <div className="mt-16">
        <MidPageCTA
          title="Une urgence ? N'attendez pas le mail."
          subtitle="Joël répond 24h/24 par téléphone — intervention en ~30 min Paris / 60 min IDF"
          placement="contact_bottom"
        />
      </div>
    </div>
    </>
  );
}
