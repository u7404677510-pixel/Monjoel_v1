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
              Le site monjoel.com est édité par :<br />
              <strong>Joël SAS</strong><br />
              Société par actions simplifiée<br />
              Capital social : [À compléter]<br />
              RCS Paris : [À compléter]<br />
              Siège social : Paris, France<br />
              Email : contact@monjoel.com
            </p>

            <h2>2. Directeur de la publication</h2>
            <p>[Nom du directeur de publication à compléter]</p>

            <h2>3. Hébergeur</h2>
            <p>
              Le site est hébergé par :<br />
              <strong>Vercel Inc.</strong><br />
              340 S Lemon Ave #4133<br />
              Walnut, CA 91789, USA
            </p>

            <h2>4. Propriété intellectuelle</h2>
            <p>
              L'ensemble du contenu de ce site (textes, images, vidéos, logos, etc.) 
              est protégé par le droit d'auteur. Toute reproduction, représentation, 
              modification ou exploitation non autorisée est interdite.
            </p>

            <h2>5. Données personnelles</h2>
            <p>
              Les informations collectées sur ce site sont destinées à Joël SAS. 
              Conformément au RGPD, vous disposez d'un droit d'accès, de rectification 
              et de suppression de vos données. Pour exercer ces droits, contactez-nous 
              à : contact@monjoel.com
            </p>

            <h2>6. Cookies</h2>
            <p>
              Ce site utilise des cookies pour améliorer votre expérience de navigation 
              et analyser le trafic. Vous pouvez configurer votre navigateur pour 
              refuser les cookies.
            </p>

            <h2>7. Limitation de responsabilité</h2>
            <p>
              Joël SAS s'efforce d'assurer l'exactitude des informations diffusées 
              sur ce site, mais ne peut garantir leur exhaustivité ou leur mise à jour. 
              Joël SAS décline toute responsabilité en cas d'erreur ou d'omission.
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

