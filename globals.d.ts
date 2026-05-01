/**
 * Déclarations globales TypeScript pour le projet MonJoël.
 *
 * TypeScript 6+ exige une déclaration explicite pour les imports side-effect
 * de fichiers CSS / médias. Ce fichier déclare ces modules pour que
 * `import "./globals.css"` (ou similaire) soit accepté par tsc.
 *
 * Voir : https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html
 */

// CSS / SCSS / SASS imports
declare module "*.css";
declare module "*.scss";
declare module "*.sass";

// Worker scripts (Web Workers)
declare module "*.worker?worker";

// JSON déjà géré par tsconfig resolveJsonModule, pas besoin
