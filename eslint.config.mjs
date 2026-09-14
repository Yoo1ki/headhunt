import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  globalIgnores([
    '.next/**',
    '.open-next/**',
    '.wrangler/**',
    'cloudflare-env.d.ts',
    'next-env.d.ts',
  ]),
  {
    rules: {
      // These React 19 rules are new in eslint-config-next 16. Keep the
      // existing runtime behavior during this framework-only upgrade.
      'react-hooks/purity': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/set-state-in-effect': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'separate-type-imports', prefer: 'type-imports' },
      ],
    },
  },
  eslintConfigPrettier,
]);
