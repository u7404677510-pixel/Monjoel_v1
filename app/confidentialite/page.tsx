"use client";

import { motion } from "framer-motion";

export default function ConfidentialitePage() {
  return (
    <div className="pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Politique de confidentialité</h1>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50 prose prose-gray max-w-none">
            <h2>1. Introduction</h2>
            <p>
              Joël SAS s'engage à protéger la vie privée des utilisateurs de son site 
              et de son application. Cette politique de confidentialité explique 
              comment nous collectons, utilisons et protégeons vos données personnelles.
            </p>

            <h2>2. Données collectées</h2>
            <p>Nous collectons les données suivantes :</p>
            <ul>
              <li><strong>Données d'identification</strong> : nom, prénom, email, téléphone</li>
              <li><strong>Données de localisation</strong> : adresse pour l'intervention</li>
              <li><strong>Données de navigation</strong> : cookies, adresse IP, pages visitées</li>
              <li><strong>Données de transaction</strong> : historique des interventions</li>
            </ul>

            <h2>3. Finalités du traitement</h2>
            <p>Vos données sont utilisées pour :</p>
            <ul>
              <li>Fournir nos services de mise en relation</li>
              <li>Établir les devis et factures</li>
              <li>Améliorer nos services</li>
              <li>Vous envoyer des communications (avec votre consentement)</li>
              <li>Respecter nos obligations légales</li>
            </ul>

            <h2>4. Base légale</h2>
            <p>
              Le traitement de vos données repose sur : l'exécution du contrat, 
              votre consentement, nos intérêts légitimes et le respect de nos 
              obligations légales.
            </p>

            <h2>5. Destinataires des données</h2>
            <p>Vos données peuvent être partagées avec :</p>
            <ul>
              <li>Les artisans partenaires (pour l'intervention)</li>
              <li>Nos prestataires techniques (hébergement, paiement)</li>
              <li>Les autorités (en cas d'obligation légale)</li>
            </ul>

            <h2>6. Durée de conservation</h2>
            <p>
              Vos données sont conservées pendant la durée nécessaire aux finalités 
              pour lesquelles elles ont été collectées, et au maximum 3 ans après 
              votre dernière interaction avec nous.
            </p>

            <h2>7. Vos droits</h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul>
              <li><strong>Droit d'accès</strong> : obtenir une copie de vos données</li>
              <li><strong>Droit de rectification</strong> : corriger vos données</li>
              <li><strong>Droit à l'effacement</strong> : supprimer vos données</li>
              <li><strong>Droit à la portabilité</strong> : récupérer vos données</li>
              <li><strong>Droit d'opposition</strong> : refuser certains traitements</li>
            </ul>
            <p>
              Pour exercer vos droits, contactez-nous à : contact@monjoel.com
            </p>

            <h2>8. Cookies</h2>
            <p>
              Nous utilisons des cookies pour améliorer votre expérience et analyser 
              le trafic. Vous pouvez gérer vos préférences via les paramètres de 
              votre navigateur.
            </p>

            <h2>9. Sécurité</h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles 
              pour protéger vos données contre tout accès non autorisé, modification, 
              divulgation ou destruction.
            </p>

            <h2>10. Contact</h2>
            <p>
              Pour toute question relative à cette politique, contactez notre 
              Délégué à la Protection des Données (DPO) à : contact@monjoel.com
            </p>

            <p className="text-gray-500 text-sm mt-8">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

