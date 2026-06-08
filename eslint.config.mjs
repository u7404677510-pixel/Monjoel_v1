import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import reactHooks from "eslint-plugin-react-hooks";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    plugins: { "react-hooks": reactHooks },
    rules: {
      // Site FR : apostrophes typographiques partout dans le contenu éditorial.
      // Règle purement cosmétique (React rend les apostrophes correctement) qui
      // génère ~150 faux-positifs et noie les vrais problèmes. Désactivée à dessein.
      "react/no-unescaped-entities": "off",

      // ── Règles React Compiler (eslint-plugin-react-hooks v7) ──────────────────
      // Ce sont des HINTS d'optimisation du compilateur React (expérimental), pas
      // des erreurs de correction. Elles ne changent rien au comportement runtime :
      // le code reste valide et fonctionne, le compilateur se contente de ne pas
      // mémoïser certains segments. Rétrogradées en "warn" (au lieu de "error" par
      // défaut) pour ne pas bloquer le lint sur des refactors risqués non triviaux
      // (réordonnancement de useCallback => TDZ, sortie de setState hors effet de
      // synchro d'hydratation, etc.). À traiter au cas par cas, sans régression.
      // `incompatible-library` (useForm / useReactTable) est déjà "warn" et inévitable.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/preserve-manual-memoization": "warn",
      "react-hooks/immutability": "warn",
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
