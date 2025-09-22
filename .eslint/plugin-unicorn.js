import eslintPluginUnicorn from "eslint-plugin-unicorn";
import { defineConfig } from "eslint/config";
import globals from "globals";

export default defineConfig(eslintPluginUnicorn.configs.recommended, {
  languageOptions: {
    globals: globals.builtin,
  },
  rules: {
    "unicorn/consistent-destructuring": "off",
    "unicorn/custom-error-definition": "off",
    "unicorn/no-array-for-each": "off",
    "unicorn/no-keyword-prefix": "off",
    "no-negated-condition": "off",
    "no-nested-ternary": "off",
    "unicorn/no-null": "off",
    "unicorn/no-static-only-class": "off",
    "unicorn/no-unused-properties": "off",
    "unicorn/prefer-dom-node-text-content": "off",
    "unicorn/prefer-json-parse-buffer": "off",
    "unicorn/prefer-query-selector": "off",
    "unicorn/prevent-abbreviations": "off",
    // Turned off because we can't distinguish `widow.postMessage` and `{Worker,MessagePort,Client,BroadcastChannel}#postMessage()`
    // See #1396
    "unicorn/require-post-message-target-origin": "off",
    "unicorn/string-content": "off",
    "unicorn/filename-case": "off",
  },
});
