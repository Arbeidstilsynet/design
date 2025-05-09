// @ts-check

import { default as eslint } from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import storybook from "eslint-plugin-storybook";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["**/node_modules", "**/dist", "**/coverage", "**/*.config.*"],
  },

  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  reactHooks.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  storybook.configs["flat/recommended"],
  eslintConfigPrettier,

  {
    settings: {
      react: {
        version: "detect",
      },
    },

    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },

        project: "./tsconfig.json",
      },
    },

    rules: {
      "react-hooks/react-compiler": "error",
      eqeqeq: "error",

      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          // ikke feil på vanlig bruk av async event handlers i React om de returnerer Promise<void>
          checksVoidReturn: false,
        },
      ],
    },
  }
);
