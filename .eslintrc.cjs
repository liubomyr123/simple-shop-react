module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "standard-with-typescript",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [
                ".eslintrc.{js,cjs}",
            ],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
    },
    plugins: [
        "react",
        "@typescript-eslint",
    ],
    settings: {
        react: {
            version: "detect",
        },
    },
    rules: {
        "@typescript-eslint/quotes": ["error", "double"],
        "@typescript-eslint/indent": ["error", 2],
        indent: ["error", 2],
        "@typescript-eslint/member-delimiter-style": ["error", {
            multiline: {
                delimiter: "semi",
                requireLast: true,
            },
            singleline: {
                delimiter: "semi",
                requireLast: true,
            },
        }],
        "@typescript-eslint/semi": ["error", "always"],
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/comma-dangle": ["error", "always-multiline"],
        "@typescript-eslint/consistent-type-imports": [
            "error",
            { prefer: "type-imports", disallowTypeAnnotations: false },
        ],
        "@typescript-eslint/triple-slash-reference": ["error", { types: "prefer-import" }],
        "react/display-name": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/naming-convention": [
            "error",
            {
                selector: "variable",
                format: null,
            },
        ],
        "@typescript-eslint/no-confusing-void-expression": [
            "off",
            {
                allowArrowShorthand: true,
                ignoreVoidOperator: true
            }
        ],
    },
    ignorePatterns: [".eslintrc.cjs"],
};
