import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: [
            'node_modules/**',
            'coverage/**',
            'dist/**',
        ],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{ts,mts}'],
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.es2022,
            },
        },
        rules: {
            'no-console': 'off',
            'no-undef': 'off',
            'no-trailing-spaces': 'error',
            'eol-last': ['error', 'always'],
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],
        },
    },
);
