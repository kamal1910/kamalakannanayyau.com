import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["build/", ".react-router/", "node_modules/", "test-results/", "playwright-report/"] },
  js.configs.recommended,
  ...tseslint.configs.strict,
  reactHooks.configs.flat.recommended,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      // Route modules use `meta({}: Route.MetaArgs)` from the official template.
      "no-empty-pattern": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", destructuredArrayIgnorePattern: "^_" },
      ],
    },
  },
);
