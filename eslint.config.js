import js from "@eslint/js";

import { defineConfig } from "eslint/config";
import globals from "globals";

import CONFIG_PLUGIN_NEXT from "./.eslint/plugin-next.js";
import CONFIG_PLUGIN_REACT from "./.eslint/plugin-react.js";
import CONFIG_PLUGIN_UNICORN from "./.eslint/plugin-unicorn.js";
import { JS_SRC_PATTERN } from "./.eslint/utils.js";

export default defineConfig([
  {
    files: [JS_SRC_PATTERN],
    ignores: [".next/**", "node_modules/**", "out/**"],
    plugins: { js },
    ...js.configs.recommended,
  },
  {
    files: [JS_SRC_PATTERN],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    rules: {
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      camelcase: ["error", { properties: "never", ignoreDestructuring: true }],
    },
  },
  CONFIG_PLUGIN_UNICORN,
  CONFIG_PLUGIN_REACT,
  CONFIG_PLUGIN_NEXT,
]);
