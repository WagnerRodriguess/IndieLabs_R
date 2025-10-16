
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-background': '#20102b',
        'brand-primary': '#9B65EC',
        'brand-footer': '#21022E',
        'brand-text': '#F6F6F6',
      },
    },
  },
  plugins: [],
};
export default config;