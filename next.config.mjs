import createNextIntlPlugin from 'next-intl/plugin';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ESA Pages only hosts static assets; Next must emit ./out.
  output: 'export',
  reactStrictMode: true,
  poweredByHeader: false,
};

const config = (phase) => withNextIntl({
  ...nextConfig,
  // Keep production builds from overwriting a running dev server's chunks.
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next',
});

export default config;
