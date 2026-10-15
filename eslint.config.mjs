import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

/*
 * ESLint 9+ dropped `.eslintrc.json` and `.eslintignore`; both are replaced by
 * this single flat config. `eslint-config-next` already returns a flat array
 * with the Next.js, react-hooks, jsx-a11y and TypeScript rules wired up, so the
 * only thing left to declare here is what not to lint.
 *
 * `npm run lint` no longer passes `--ext`: flat config determines which file
 * extensions are linted from the config itself.
 */
const config = [
  ...nextCoreWebVitals,
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      '.next-dev/**',
      'out/**',
      'next-env.d.ts',
    ],
  },
];

export default config;
