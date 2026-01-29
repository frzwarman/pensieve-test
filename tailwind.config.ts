import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './containers/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        accent: '#06b6d4',
        card: 'rgba(255,255,255,0.75)',
        backdrop: 'rgba(15,23,42,0.6)',
      },
      boxShadow: {
        'soft-lg': '0 8px 30px rgba(2,6,23,0.12)',
        'glass': '0 6px 20px rgba(2,6,23,0.08)',
      },
      blur: {
        xs: '2px',
      },
    },
  },
};

export default config;
