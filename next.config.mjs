import createNextIntlPlugin from 'next-intl/plugin';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
};

const config = (phase) => withNextIntl({
  ...nextConfig,
  // Keep production builds from overwriting a running dev server's chunks.
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next',
});

export default config;
