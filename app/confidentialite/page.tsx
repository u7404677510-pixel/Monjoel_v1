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
              La société Joël SAS (ci-après "Joël", "nous", "notre") s'engage à protéger 
              la vie privée des utilisateurs de son site monjoel.fr et de son application 
              mobile (ci-après "la Plateforme").
            </p>
            <p>
              Cette politique de confidentialité explique comment nous collectons, utilisons, 
              partageons et protégeons vos données personnelles, conformément au Règlement 
              Général sur la Protection des Données (RGPD) et à la loi Informatique et 
              Libertés.
            </p>

            <h2>2. Responsable du traitement</h2>
            <p>
              Le responsable du traitement de vos données personnelles est :<br />
              <strong>Joël SAS</strong><br />
              45 Rue Boursault, 75017 Paris<br />
              SIRET : 993 221 878 00016<br />
              Email : contact@monjoel.com<br />
              Téléphone : 01 72 68 22 02
            </p>

            <h2>3. Données collectées</h2>
            <p>Nous collectons les catégories de données suivantes :</p>
            
            <h3>3.1 Données d'identification</h3>
            <ul>
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone</li>
              <li>Adresse postale (lieu d'intervention)</li>
            </ul>

            <h3>3.2 Données de transaction</h3>
            <ul>
              <li>Historique des demandes et interventions</li>
              <li>Devis et factures</li>
              <li>Informations de paiement (traitées de manière sécurisée)</li>
            </ul>

            <h3>3.3 Données de navigation</h3>
            <ul>
              <li>Adresse IP</li>
              <li>Type de navigateur et appareil</li>
              <li>Pages visitées et temps passé</li>
              <li>Données de cookies (voir section 8)</li>
            </ul>

            <h2>4. Finalités du traitement</h2>
            <p>Vos données personnelles sont utilisées pour :</p>
            <ul>
              <li><strong>Fournir nos services</strong> : traitement de vos demandes, mise en relation avec un artisan, suivi d'intervention</li>
              <li><strong>Facturation</strong> : établissement des devis et factures</li>
              <li><strong>Communication</strong> : répondre à vos questions, notifications sur l'état de votre demande</li>
              <li><strong>Amélioration des services</strong> : analyse statistique, amélioration de l'expérience utilisateur</li>
              <li><strong>Marketing</strong> : envoi d'offres et actualités (avec votre consentement)</li>
              <li><strong>Obligations légales</strong> : respect de nos obligations comptables et fiscales</li>
            </ul>

            <h2>5. Bases légales du traitement</h2>
            <p>Nous traitons vos données sur les bases légales suivantes :</p>
            <ul>
              <li><strong>Exécution du contrat</strong> : pour fournir les services que vous avez demandés</li>
              <li><strong>Consentement</strong> : pour l'envoi de communications marketing</li>
              <li><strong>Intérêt légitime</strong> : pour améliorer nos services et prévenir la fraude</li>
              <li><strong>Obligation légale</strong> : pour la conservation des factures et documents comptables</li>
            </ul>

            <h2>6. Destinataires des données</h2>
            <p>Vos données peuvent être partagées avec :</p>
            <ul>
              <li><strong>Artisans partenaires</strong> : uniquement les informations nécessaires à l'intervention (nom, adresse, téléphone, description du problème)</li>
              <li><strong>Prestataires techniques</strong> :
                <ul>
                  <li>Vercel (hébergement du site)</li>
                  <li>Supabase (base de données)</li>
                  <li>Prestataires de paiement sécurisé</li>
                </ul>
              </li>
              <li><strong>Outils d'analyse</strong> : Google Analytics, Google Ads, Ahrefs (données anonymisées)</li>
              <li><strong>Autorités</strong> : en cas d'obligation légale uniquement</li>
            </ul>
            <p>
              Nous ne vendons jamais vos données personnelles à des tiers.
            </p>

            <h2>7. Durée de conservation</h2>
            <p>Vos données sont conservées pendant :</p>
            <ul>
              <li><strong>Données clients actifs</strong> : pendant toute la durée de la relation commerciale</li>
              <li><strong>Données prospects</strong> : 3 ans après le dernier contact</li>
              <li><strong>Factures et documents comptables</strong> : 10 ans (obligation légale)</li>
              <li><strong>Données de navigation</strong> : 13 mois maximum</li>
            </ul>

            <h2>8. Cookies</h2>
            <p>Notre Plateforme utilise des cookies pour :</p>
            
            <h3>8.1 Cookies strictement nécessaires</h3>
            <p>Indispensables au fonctionnement du site (session, authentification).</p>
            
            <h3>8.2 Cookies analytiques</h3>
            <ul>
              <li><strong>Google Analytics</strong> : mesure d'audience, analyse du comportement des visiteurs</li>
              <li><strong>Ahrefs</strong> : analyse des performances SEO</li>
            </ul>
            
            <h3>8.3 Cookies publicitaires</h3>
            <ul>
              <li><strong>Google Ads</strong> : suivi des conversions, remarketing</li>
            </ul>
            
            <p>
              Vous pouvez gérer vos préférences de cookies via les paramètres de votre 
              navigateur ou en nous contactant.
            </p>

            <h2>9. Vos droits</h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul>
              <li><strong>Droit d'accès</strong> : obtenir une copie de vos données personnelles</li>
              <li><strong>Droit de rectification</strong> : corriger des données inexactes ou incomplètes</li>
              <li><strong>Droit à l'effacement</strong> : demander la suppression de vos données</li>
              <li><strong>Droit à la limitation</strong> : limiter le traitement de vos données</li>
              <li><strong>Droit à la portabilité</strong> : récupérer vos données dans un format structuré</li>
              <li><strong>Droit d'opposition</strong> : vous opposer au traitement de vos données</li>
              <li><strong>Droit de retirer votre consentement</strong> : à tout moment pour les traitements basés sur le consentement</li>
            </ul>
            <p>
              Pour exercer vos droits, contactez-nous par email à <strong>contact@monjoel.com</strong> ou 
              par courrier à : Joël SAS - 45 Rue Boursault, 75017 Paris.
            </p>
            <p>
              Nous répondrons à votre demande dans un délai d'un mois. Vous avez également 
              le droit d'introduire une réclamation auprès de la CNIL (Commission Nationale 
              de l'Informatique et des Libertés).
            </p>

            <h2>10. Sécurité des données</h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées 
              pour protéger vos données contre tout accès non autorisé, modification, 
              divulgation ou destruction :
            </p>
            <ul>
              <li>Chiffrement des données sensibles (SSL/TLS)</li>
              <li>Accès restreint aux données personnelles</li>
              <li>Sauvegardes régulières</li>
              <li>Audits de sécurité</li>
            </ul>

            <h2>11. Transferts hors UE</h2>
            <p>
              Certains de nos prestataires (Vercel, Google) peuvent être situés en dehors 
              de l'Union Européenne. Dans ce cas, nous nous assurons que des garanties 
              appropriées sont en place (Clauses Contractuelles Types, décision d'adéquation, 
              etc.) pour assurer un niveau de protection équivalent.
            </p>

            <h2>12. Mineurs</h2>
            <p>
              Nos services ne sont pas destinés aux personnes de moins de 18 ans. Nous ne 
              collectons pas sciemment de données personnelles de mineurs.
            </p>

            <h2>13. Modifications</h2>
            <p>
              Nous nous réservons le droit de modifier cette politique de confidentialité 
              à tout moment. Les modifications seront publiées sur cette page avec une 
              date de mise à jour.
            </p>

            <h2>14. Contact</h2>
            <p>
              Pour toute question relative à cette politique ou à vos données personnelles, 
              contactez-nous :
            </p>
            <p>
              <strong>Joël SAS</strong><br />
              45 Rue Boursault, 75017 Paris<br />
              Email : contact@monjoel.com<br />
              Téléphone : 01 72 68 22 02
            </p>

            <p className="text-gray-500 text-sm mt-8">
              Dernière mise à jour : Janvier 2026
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
