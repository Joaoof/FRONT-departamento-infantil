import path from "node:path"
import { fileURLToPath } from "node:url"

import { includeIgnoreFile } from "@eslint/compat"
import js from "@eslint/js"
import { defineConfig, globalIgnores } from "eslint/config"
import pluginReact from "eslint-plugin-react"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import globals from "globals"
import tseslint from "typescript-eslint"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, ".gitignore")

export default defineConfig([
  includeIgnoreFile(gitignorePath),
  globalIgnores(["node_modules/*", ".next/*", "*.json"]),
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],},
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], languageOptions: { globals: globals.browser } },
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], plugins: { js }, extends: ["js/recommended"] },
  tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx,mjs}"],
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "semi": ["error", "never"],
      "simple-import-sort/imports": "error",
      "no-extra-semi": "error",
    },
  },
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/no-unknown-property": "off"
    }
  }
])