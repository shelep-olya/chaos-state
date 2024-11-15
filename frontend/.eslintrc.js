// .eslintrc.js

const config = {
    env: {
        browser: true,
        node: true,
        es2021: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:unicorn/recommended",
        "plugin:cypress/recommended",
    ],
    settings: {
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx"],
            },
            webpack: {
                config: ".frontend/config/webpack.dev.config.js",
            },
        },
    },
    plugins: ["simple-import-sort", "react"],
    ignorePatterns: ["node_modules"],
    rules: {
        "unicorn/filename-case": [
            "error",
            {
                cases: {
                    camelCase: true,
                    pascalCase: true,
                },
            },
        ],
        "simple-import-sort/exports": "error",
        "simple-import-sort/imports": "error",
        "import/namespace": [2, { allowComputed: true }],
        "import/first": "error",
        "import/newline-after-import": "error",
        "react/react-in-jsx-scope": "off",
    },
    overrides: [
        {
            files: ["*rc.js", "*.config.js"],
            rules: {
                "unicorn/prefer-module": "off",
                "unicorn/filename-case": "off",
            },
        },
    ],
    globals: {
        Cypress: true,
    },
};

module.exports = config;
