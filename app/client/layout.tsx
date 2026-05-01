import type { Metadata } from "next";
import { ClientShell } from "./_components/ClientShell";

export const metadata: Metadata = {
  title: "Mon espace client — Joël",
  description:
    "Suivez vos interventions, retrouvez vos factures, contactez Joël en un clic.",
  robots: { index: false, follow: false },
};

/**
 * Layout de l'espace client MonJoël — DA Purple lumineuse.
 *
 * Différence avec /admin : moins dense, plus aéré, ton chaleureux et rassurant.
 * Le client peut être en pleine urgence ou rentré chez lui post-intervention.
 *
 * Structure :
 *  - Header sticky avec logo + nav (Mes demandes / Aide / Déconnexion)
 *  - Body : gradient subtil blanc → joel-yellow-light/30
 *  - Footer minimal avec téléphone 24h/24
 *  - Mobile : nav burger avec slide-in (géré dans ClientShell client component)
 */
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientShell>{children}</ClientShell>;
}
