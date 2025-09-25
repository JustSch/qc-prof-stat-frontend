import nextPlugin from "@next/eslint-plugin-next";

import reactHooksPlugin from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";

import { JS_SRC_PATTERN } from "./utils.js";

export default defineConfig({
  files: [JS_SRC_PATTERN],
  plugins: {
    "@next/next": nextPlugin,
    "react-hooks": reactHooksPlugin,
  },
  rules: {
    ...reactHooksPlugin.configs.recommended.rules,
    ...nextPlugin.configs.recommended.rules,
    ...nextPlugin.configs["core-web-vitals"].rules,
  },
});
