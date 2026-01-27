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
            <h2>Article 1 - Mentions légales</h2>
            <p>
              Le site monjoel.fr et l'application Joël sont édités par :<br />
              <strong>Joël SAS</strong>, société par actions simplifiée au capital de 1 000 €<br />
              Siège social : 45 Rue Boursault, 75017 Paris<br />
              SIRET : 993 221 878 00016 | RCS Pontoise : 993 221 878<br />
              Téléphone : 01 72 68 22 02 | Email : contact@monjoel.com<br />
              Directeur de la publication : Yoël Berros
            </p>

            <h2>Article 2 - Objet</h2>
            <p>
              Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de 
              définir les modalités d'accès et d'utilisation du site monjoel.fr et de 
              l'application mobile Joël (ci-après "la Plateforme").
            </p>
            <p>
              Joël est une plateforme de mise en relation entre des particuliers ayant 
              besoin d'un dépannage d'urgence en plomberie, serrurerie ou électricité, 
              et des artisans professionnels vérifiés intervenant sur Paris et 
              l'Île-de-France.
            </p>

            <h2>Article 3 - Acceptation des CGU</h2>
            <p>
              L'utilisation de la Plateforme implique l'acceptation pleine et entière 
              des présentes CGU. Si vous n'acceptez pas ces conditions, veuillez ne pas 
              utiliser nos services.
            </p>
            <p>
              Joël se réserve le droit de modifier les présentes CGU à tout moment. 
              Les modifications prennent effet dès leur publication sur la Plateforme.
            </p>

            <h2>Article 4 - Description des services</h2>
            <p>Joël propose les services suivants :</p>
            <ul>
              <li>Demande de devis instantané pour un dépannage d'urgence</li>
              <li>Mise en relation avec un artisan professionnel vérifié</li>
              <li>Intervention rapide (30 minutes en moyenne)</li>
              <li>Prix fixes et transparents, annoncés avant intervention</li>
              <li>Suivi de l'intervention en temps réel</li>
              <li>Facturation et paiement sécurisés</li>
            </ul>

            <h2>Article 5 - Tarifs et paiement</h2>
            <p>
              Les prix affichés sur la Plateforme sont des prix fixes TTC (Toutes Taxes 
              Comprises). Le prix définitif est communiqué et accepté par le client 
              <strong> avant toute intervention</strong>.
            </p>
            <p>Les moyens de paiement acceptés sont :</p>
            <ul>
              <li>Carte bancaire (CB, Visa, Mastercard)</li>
              <li>Virement bancaire</li>
              <li>Paiement en ligne sur le site ou l'application</li>
            </ul>
            <p>
              Le paiement peut s'effectuer avant ou après l'intervention selon les 
              modalités convenues. Une facture est systématiquement émise et envoyée 
              par email.
            </p>

            <h2>Article 6 - Garantie des interventions</h2>
            <p>
              Toutes les interventions réalisées via Joël bénéficient d'une 
              <strong> garantie de 1 an</strong> (pièces et main d'œuvre).
            </p>
            <p>
              En cas de problème survenant dans les 12 mois suivant l'intervention, 
              contactez notre service client au 01 72 68 22 02 ou par email à 
              contact@monjoel.com pour une prise en charge.
            </p>
            <p>La garantie couvre :</p>
            <ul>
              <li>Les défauts de main d'œuvre</li>
              <li>Les pièces défectueuses fournies par l'artisan</li>
            </ul>
            <p>La garantie ne couvre pas :</p>
            <ul>
              <li>L'usure normale des équipements</li>
              <li>Les dommages causés par une mauvaise utilisation</li>
              <li>Les interventions sur des équipements préexistants défectueux</li>
            </ul>

            <h2>Article 7 - Obligations de l'utilisateur</h2>
            <p>L'utilisateur s'engage à :</p>
            <ul>
              <li>Fournir des informations exactes et complètes lors de sa demande</li>
              <li>Être présent ou représenté au moment de l'intervention</li>
              <li>Permettre l'accès à son domicile à l'artisan</li>
              <li>Régler le montant convenu après validation du devis</li>
              <li>Utiliser la Plateforme de manière loyale et conforme à sa destination</li>
            </ul>

            <h2>Article 8 - Obligations de Joël</h2>
            <p>Joël s'engage à :</p>
            <ul>
              <li>Vérifier les qualifications et assurances des artisans partenaires</li>
              <li>Fournir un devis clair et détaillé avant toute intervention</li>
              <li>Garantir les prix annoncés (pas de frais cachés)</li>
              <li>Assurer un service client réactif et disponible</li>
              <li>Respecter la confidentialité des données personnelles</li>
            </ul>

            <h2>Article 9 - Responsabilité</h2>
            <p>
              Joël agit en qualité d'intermédiaire entre les utilisateurs et les artisans 
              professionnels indépendants. Les interventions sont réalisées sous la 
              responsabilité des artisans, qui disposent de leurs propres assurances 
              professionnelles (RC Pro, décennale si applicable).
            </p>
            <p>
              Joël ne saurait être tenue responsable des dommages indirects, de la perte 
              de données ou de tout préjudice résultant de l'utilisation ou de 
              l'impossibilité d'utiliser la Plateforme.
            </p>

            <h2>Article 10 - Annulation</h2>
            <p>
              L'utilisateur peut annuler sa demande sans frais tant que l'artisan n'est 
              pas en route vers le lieu d'intervention. Passé ce délai, des frais de 
              déplacement peuvent être facturés.
            </p>

            <h2>Article 11 - Réclamations</h2>
            <p>
              Pour toute réclamation, contactez notre service client :<br />
              Email : contact@monjoel.com<br />
              Téléphone : 01 72 68 22 02<br />
              Courrier : Joël SAS - 45 Rue Boursault, 75017 Paris
            </p>
            <p>
              Conformément aux dispositions du Code de la consommation, vous pouvez 
              également recourir gratuitement au service de médiation de la consommation 
              en cas de litige non résolu.
            </p>

            <h2>Article 12 - Propriété intellectuelle</h2>
            <p>
              L'ensemble des éléments de la Plateforme (textes, images, logos, etc.) 
              sont protégés par le droit de la propriété intellectuelle. Toute 
              reproduction non autorisée est interdite.
            </p>

            <h2>Article 13 - Données personnelles</h2>
            <p>
              Les données personnelles collectées sont traitées conformément à notre{" "}
              <a href="/confidentialite" className="text-joel-violet hover:underline">
                Politique de confidentialité
              </a>{" "}
              et au RGPD.
            </p>

            <h2>Article 14 - Droit applicable</h2>
            <p>
              Les présentes CGU sont soumises au droit français. En cas de litige, et 
              à défaut de résolution amiable, les tribunaux français seront seuls 
              compétents.
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
