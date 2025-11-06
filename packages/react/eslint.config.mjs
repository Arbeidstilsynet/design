// @ts-check

import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import storybook from "eslint-plugin-storybook";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  globalIgnores(["dist/", "coverage/", "*.config.*"]),

  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  reactHooks.configs.flat["recommended-latest"],
  // @ts-ignore
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
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      eqeqeq: "error",

      "@typescript-eslint/prefer-nullish-coalescing": [
        "error",
        {
          ignoreBooleanCoercion: true,
          ignorePrimitives: {
            boolean: true,
          },
        },
      ],

      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          // ikke feil på vanlig bruk av async event handlers i React om de returnerer Promise<void>
          checksVoidReturn: false,
        },
      ],
    },
  },

  {
    files: ["**/*.stories.tsx"],
    rules: {
      "@typescript-eslint/no-empty-function": "off",
    },
  },
);
