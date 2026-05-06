/**
 * Schema.org Person — Joël (fondateur, persona principal du site).
 *
 * Pourquoi un Person schema dédié ?
 *   - Boost E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness).
 *     Google attache de plus en plus d'importance à l'identification d'auteurs
 *     réels derrière les contenus, surtout sur les sujets YMYL (Your Money Your
 *     Life) — et le dépannage urgence en relève partiellement (sécurité,
 *     dégâts financiers possibles).
 *   - Permet de rattacher un visage humain à l'organisation, ce qui renforce
 *     la confiance utilisateur affichée (CTR) et l'autorité aux yeux du moteur.
 *
 * Source des données :
 *   - prénom légal "Yoël" et nom "Berros" : `app/mentions-legales/page.tsx`
 *     (Directeur de la publication, président de Joël SAS).
 *   - rôle "Fondateur" : `app/a-propos/page.tsx` ("Mehdi, fondateur Joël").
 *     Note : le persona public du site reste "Joël" (marque), mais la
 *     personne réelle qui signe légalement et qui apparaît comme fondateur
 *     dans /a-propos est Yoël Berros (Mehdi est son prénom usuel).
 *
 * `sameAs` à compléter quand les profils sociaux officiels seront créés
 * (LinkedIn, Twitter/X, etc.). Laisser vide pour le moment plutôt que de
 * mettre des URLs fictives qui pourraient faire chuter la confiance.
 */

const BASE_URL = "https://monjoel.fr";
const PERSON_ID = `${BASE_URL}/#person-joel`;
const ORG_ID = `${BASE_URL}/#organization`;

export const PERSON_JOEL_ID = PERSON_ID;

/**
 * Retourne le schema Person pour Joël (fondateur).
 *
 * À injecter :
 *   - Dans le @graph de la homepage (HomeSchema.tsx) — déclaration canonique.
 *   - Dans le <head> de la page /a-propos — page principale dédiée.
 *   - Référencé via @id dans les Article schemas premium (auteur).
 */
export function generatePersonJoelSchema(): object {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Joël",
    givenName: "Yoël",
    familyName: "Berros",
    jobTitle: "Fondateur",
    description:
      "Fondateur de Joël, plateforme de dépannage à prix fixe à Paris et en Île-de-France. À l'origine du modèle anti-arnaque qui rémunère chaque artisan partenaire à tarif fixe pour casser l'incitation au gonflement des factures.",
    worksFor: { "@id": ORG_ID },
    affiliation: { "@id": ORG_ID },
    url: `${BASE_URL}/a-propos`,
    image: `${BASE_URL}/logo.webp`,
    knowsAbout: [
      "Dépannage urgence",
      "Plomberie",
      "Serrurerie",
      "Électricité",
      "Lutte contre les arnaques au dépannage",
      "Modèle économique transparent",
      "Île-de-France",
    ],
    knowsLanguage: "fr-FR",
    nationality: { "@type": "Country", name: "France" },
    sameAs: [
      // À compléter : LinkedIn, Twitter/X, etc., quand les profils officiels seront publics.
    ],
  };
}

/**
 * Wrapper standalone (avec @context) — pour usage hors @graph,
 * typiquement injecté dans <head> de la page /a-propos.
 */
export function generatePersonJoelStandaloneSchema(): object {
  return {
    "@context": "https://schema.org",
    ...generatePersonJoelSchema(),
  };
}
