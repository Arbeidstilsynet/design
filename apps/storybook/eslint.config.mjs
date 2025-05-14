import { default as eslint } from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import storybook from "eslint-plugin-storybook";
import tseslint from "typescript-eslint";

/** @type {import("typescript-eslint").ConfigArray} */
const config = tseslint.config(
  {
    ignores: ["**/node_modules", "**/storybook-static", "**/*.config.*"],
  },

  eslint.configs.recommended,
  tseslint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  reactHooks.configs.recommended,
  storybook.configs["flat/recommended"],
  eslintConfigPrettier,

  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
);

export default config;
