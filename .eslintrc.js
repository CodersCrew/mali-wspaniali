module.exports = {
    plugins: ['i18next', 'react-hooks'],
    settings: {
        "react": {
            "version": "detect"
        }
    },
    parser: '@typescript-eslint/parser',
    extends: [
        'airbnb-base',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/@typescript-eslint',
        "plugin:react/recommended"
    ],
    root: true,
    env: {
        node: true,
        jest: true,
        jasmine: true,
        browser: true,
    },
    rules: {
        'import/no-extraneous-dependencies': [
            'error',
            { devDependencies: true },
        ],
        'no-useless-constructor': 'off',
        'import/prefer-default-export': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-useless-constructor': 'error',
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
        "@typescript-eslint/explicit-function-return-type": "off",
        "semi": ["warn", "always"],
        "quotes": ["warn", "single", "avoid-escape"],
        "indent": ["warn", 4],
        "react/prop-types": "off",
    },
};