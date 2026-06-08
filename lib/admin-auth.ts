/**
 * Allowlist des emails autorisés à accéder au back-office /admin.
 *
 * Source : variable d'env ADMIN_ALLOWED_EMAILS, liste d'emails séparés par des
 * virgules. NON préfixée NEXT_PUBLIC_ → jamais incluse dans le bundle client.
 *
 * Exemple : ADMIN_ALLOWED_EMAILS="contact@monjoel.fr, admin@monjoel.fr"
 *
 * Comportement « fail-closed » : si l'allowlist est absente ou vide, AUCUN
 * email n'est considéré admin (accès refusé). Il faut donc configurer la
 * variable en production.
 *
 * Utilisé côté serveur uniquement (proxy/middleware + route handlers).
 */

export function getAdminAllowlist(): string[] {
  return (process.env.ADMIN_ALLOWED_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAllowedAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const allowlist = getAdminAllowlist();
  if (allowlist.length === 0) return false; // fail-closed
  return allowlist.includes(email.toLowerCase());
}
