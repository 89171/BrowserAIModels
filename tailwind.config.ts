import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#000000',
          50: 'rgba(0,0,0,0.05)',
          100: 'rgba(0,0,0,0.1)',
          200: 'rgba(0,0,0,0.2)',
          400: 'rgba(0,0,0,0.4)',
          600: 'rgba(0,0,0,0.6)',
          800: 'rgba(0,0,0,0.8)',
        },
        paper: {
          DEFAULT: '#ffffff',
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
        },
      },
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'monospace',
        ],
      },
      maxWidth: { prose: '70ch' },
    },
  },
  plugins: [],
};

export default config;
