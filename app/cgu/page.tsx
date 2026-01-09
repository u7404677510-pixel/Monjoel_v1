"use client";

import { motion } from "framer-motion";

export default function CGUPage() {
  return (
    <div className="pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Conditions Générales d'Utilisation</h1>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50 prose prose-gray max-w-none">
            <h2>Article 1 - Objet</h2>
            <p>
              Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet 
              de définir les modalités d'accès et d'utilisation du site monjoel.com 
              et de l'application Joël.
            </p>

            <h2>Article 2 - Acceptation des CGU</h2>
            <p>
              L'utilisation du site et de l'application implique l'acceptation pleine 
              et entière des présentes CGU. Si vous n'acceptez pas ces conditions, 
              veuillez ne pas utiliser nos services.
            </p>

            <h2>Article 3 - Description des services</h2>
            <p>
              Joël est une plateforme de mise en relation entre des particuliers 
              ayant besoin d'un dépannage d'urgence (plomberie, serrurerie, électricité) 
              et des artisans professionnels vérifiés.
            </p>
            <p>Nos services comprennent :</p>
            <ul>
              <li>La demande de devis instantané</li>
              <li>La mise en relation avec un artisan qualifié</li>
              <li>Le suivi de l'intervention</li>
              <li>La garantie des prix annoncés</li>
            </ul>

            <h2>Article 4 - Inscription et compte utilisateur</h2>
            <p>
              Pour utiliser certains services, vous devez créer un compte en fournissant 
              des informations exactes et à jour. Vous êtes responsable de la 
              confidentialité de vos identifiants.
            </p>

            <h2>Article 5 - Obligations de l'utilisateur</h2>
            <p>L'utilisateur s'engage à :</p>
            <ul>
              <li>Fournir des informations exactes</li>
              <li>Utiliser le service de manière loyale</li>
              <li>Ne pas perturber le fonctionnement du site</li>
              <li>Respecter les droits des tiers</li>
            </ul>

            <h2>Article 6 - Responsabilité</h2>
            <p>
              Joël agit en tant qu'intermédiaire entre les utilisateurs et les artisans. 
              Les interventions sont réalisées par des professionnels indépendants. 
              Joël s'engage à vérifier les qualifications des artisans partenaires.
            </p>

            <h2>Article 7 - Prix et paiement</h2>
            <p>
              Les prix affichés sont des prix fixes TTC. Le paiement s'effectue 
              après l'intervention, directement à l'artisan ou via notre plateforme 
              sécurisée.
            </p>

            <h2>Article 8 - Garanties</h2>
            <p>
              Toutes les interventions réalisées via Joël bénéficient d'une garantie. 
              En cas de problème, contactez notre service client pour une prise 
              en charge rapide.
            </p>

            <h2>Article 9 - Modification des CGU</h2>
            <p>
              Joël se réserve le droit de modifier les présentes CGU à tout moment. 
              Les utilisateurs seront informés des modifications par email ou 
              notification sur le site.
            </p>

            <h2>Article 10 - Droit applicable</h2>
            <p>
              Les présentes CGU sont soumises au droit français. En cas de litige, 
              les tribunaux de Paris seront seuls compétents.
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




