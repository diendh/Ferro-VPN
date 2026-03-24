// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import alpinejs from '@astrojs/alpinejs';

// https://astro.build/config
export default defineConfig({
  site: 'https://ferro.vietts.app',
  adapter: cloudflare(),
  build: {
    assets: 'assets'
  },
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [alpinejs()]
});