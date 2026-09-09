import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import solidPlugin from 'vite-plugin-solid';
import pkg from './package.json';

declare const process: { env: Record<string, string | undefined> };

export default defineConfig({
  base: process.env.BASE_URL || '/',
  publicDir: 'public',
  plugins: [
    solidPlugin(),
    VitePWA({
      strategies: 'generateSW',
      registerType: 'autoUpdate',
      manifest: {
        name: 'Kanttiinit',
        short_name: 'Kanttiinit',
        start_url: '.',
        display: 'standalone',
        background_color: '#f4f4f4',
        theme_color: '#2B3138',
        description: 'Student lunch effortlessly.',
        lang: 'en-US',
        orientation: 'any',
        icons: [
          {
            src: 'logo.png',
            sizes: '800x800',
            type: 'image/png',
          },
        ],
        related_applications: [
          {
            platform: 'web',
            url: 'https://kanttiinit.fi/',
          },
          {
            platform: 'itunes',
            url: 'https://itunes.apple.com/fi/app/kanttiinit/id1069903670?l=fi&mt=8',
          },
        ],
      },
    }),
  ],
  define: {
    VERSION: JSON.stringify(pkg.version),
    PUBLIC_ASSET_PATH: JSON.stringify(process.env.BASE_URL || '/'),
    API_BASE: JSON.stringify('https://kitchen.kanttiinit.fi'),
  },
  server: {
    port: 8080,
    hmr: false,
    proxy: {
      '/api/kitchen': {
        target: 'https://kitchen.kanttiinit.fi',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/kitchen/, ''),
      },
    },
  },
  build: {
    target: 'es2015',
  },
});
