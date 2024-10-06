import globals from "globals";
import pluginJs from "@eslint/js";

import compat from "eslint-plugin-compat";
import pluginPromise from "eslint-plugin-promise";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
    compat.configs["flat/recommended"],
    {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.builtin,
                ...globals.browser,
                ...globals.jest,
                ...globals.jquery,
                global: "readonly",
                module: "readonly",
                process: "readonly",
                require: "readonly",
                window: "readonly",
            },
        },
    },
    eslintConfigPrettier,
    {
        ignores: ["**.vscode-server/**", "**/vendors/**", "**/dist/", "**/bin/", "**/public/"],
    },
    {
        rules: {
            "no-unused-vars": ["error", {caughtErrors: "none"}],
            "no-debugger": "off",
            "linebreak-style": ["error", "unix"],
            quotes: ["error", "double", {avoidEscape: true, allowTemplateLiterals: true}],
            curly: ["error", "all"],
            semi: ["error", "always"],
            "array-bracket-spacing": ["error", "never"],
            "object-curly-spacing": ["error", "never"],
            "no-lonely-if": ["error"],
        },
    },
    pluginPromise.configs["flat/recommended"],
    pluginJs.configs.recommended,
];
