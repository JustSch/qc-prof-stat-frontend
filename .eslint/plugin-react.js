import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

import { JS_SRC_PATTERN } from "./utils.js";

export default defineConfig(pluginReact.configs.flat.recommended, {
  files: [JS_SRC_PATTERN],
  settings: {
    react: {
      version: "18.3.1",
    },
  },
  rules: {
    "react/react-in-jsx-scope": "off", // Next.js doesn't require React import
    "react/prop-types": "off", // Next.js apps often use TypeScript instead
  },
});
