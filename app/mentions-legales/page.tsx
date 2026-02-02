"use client";

import { motion } from "framer-motion";

export default function MentionsLegalesPage() {
  return (
    <div className="pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Mentions légales</h1>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50 prose prose-gray max-w-none">
            <h2>1. Éditeur du site</h2>
            <p>
              Le site monjoel.fr est édité par :<br />
              <strong>Joël SAS</strong><br />
              Société par Actions Simplifiée au capital de 1 000 €<br />
              SIRET : 993 221 878 00016<br />
              RCS Pontoise : 993 221 878<br />
              N° TVA Intracommunautaire : FR52993221878<br />
              Siège social : 45 Rue Boursault, 75017 Paris, France<br />
              Téléphone : 01 41 69 10 08<br />
              Email : contact@monjoel.com
            </p>

            <h2>2. Directeur de la publication</h2>
            <p>
              Monsieur Yoël Berros, en qualité de Président de la société Joël SAS.
            </p>

            <h2>3. Hébergeur</h2>
            <p>
              Le site est hébergé par :<br />
              <strong>Vercel Inc.</strong><br />
              340 S Lemon Ave #4133<br />
              Walnut, CA 91789, USA<br />
              Site web : vercel.com
            </p>

            <h2>4. Activité</h2>
            <p>
              Joël SAS est une plateforme de mise en relation entre des particuliers 
              ayant besoin d'un dépannage d'urgence (plomberie, serrurerie, électricité) 
              et des artisans professionnels vérifiés intervenant sur Paris et toute 
              l'Île-de-France.
            </p>

            <h2>5. Propriété intellectuelle</h2>
            <p>
              L'ensemble du contenu de ce site (textes, images, vidéos, logos, graphismes, 
              icônes, etc.) est la propriété exclusive de Joël SAS ou de ses partenaires 
              et est protégé par les lois françaises et internationales relatives à la 
              propriété intellectuelle.
            </p>
            <p>
              Toute reproduction, représentation, modification, publication, transmission, 
              ou exploitation de tout ou partie du contenu du site, par quelque procédé 
              que ce soit, sans l'autorisation écrite préalable de Joël SAS, est interdite 
              et constituerait une contrefaçon sanctionnée par les articles L.335-2 et 
              suivants du Code de la propriété intellectuelle.
            </p>

            <h2>6. Données personnelles</h2>
            <p>
              Les informations collectées sur ce site sont destinées à Joël SAS et sont 
              nécessaires au traitement de vos demandes. Conformément au Règlement Général 
              sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, 
              vous disposez d'un droit d'accès, de rectification, de suppression et de 
              portabilité de vos données.
            </p>
            <p>
              Pour exercer ces droits ou pour toute question relative à vos données 
              personnelles, contactez-nous à : <strong>contact@monjoel.com</strong>
            </p>
            <p>
              Pour plus d'informations, consultez notre{" "}
              <a href="/confidentialite" className="text-joel-violet hover:underline">
                Politique de confidentialité
              </a>.
            </p>

            <h2>7. Cookies</h2>
            <p>
              Ce site utilise des cookies pour améliorer votre expérience de navigation, 
              analyser le trafic et mesurer l'efficacité de nos campagnes publicitaires.
            </p>
            <p>Les cookies utilisés sont :</p>
            <ul>
              <li><strong>Google Analytics</strong> : mesure d'audience et analyse du comportement</li>
              <li><strong>Google Ads</strong> : suivi des conversions publicitaires</li>
              <li><strong>Ahrefs</strong> : analyse SEO et performance</li>
            </ul>
            <p>
              Vous pouvez configurer votre navigateur pour refuser les cookies ou être 
              averti avant leur installation.
            </p>

            <h2>8. Limitation de responsabilité</h2>
            <p>
              Joël SAS s'efforce d'assurer l'exactitude et la mise à jour des informations 
              diffusées sur ce site, mais ne peut garantir leur exhaustivité. Joël SAS 
              décline toute responsabilité en cas d'erreur, d'omission ou de résultat 
              obtenu suite à l'utilisation des informations fournies.
            </p>
            <p>
              Les liens hypertextes présents sur ce site peuvent renvoyer vers d'autres 
              sites internet. Joël SAS décline toute responsabilité quant au contenu de 
              ces sites externes.
            </p>

            <h2>9. Droit applicable et juridiction</h2>
            <p>
              Les présentes mentions légales sont soumises au droit français. En cas de 
              litige, et à défaut de résolution amiable, les tribunaux français seront 
              seuls compétents.
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
