import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // Appliquer ESLint à tous les fichiers pertinents
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser, // Ajoute les globales du navigateur
        ...globals.node, // Ajoute les globales Node.js
        ...globals.jest, // Ajoute les globales Jest pour les tests
      },
    },
  },

  // Configurations recommandées pour JavaScript
  pluginJs.configs.recommended,

  // Configurations recommandées pour TypeScript
  ...tseslint.configs.recommended,

  // Configurations recommandées pour React
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: "detect", // Détecte automatiquement la version de React
      },
    },
    rules: {
      // Désactive l'exigence de React en portée pour JSX
      "react/react-in-jsx-scope": "off",
    },
  },
];
