import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    solid(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Ludus Ignis',
        short_name: 'Ludus Ignis',
        description: 'Aprenda probabilidade com a sua Brasa.',
        theme_color: '#1a0f08',
        background_color: '#0a0604',
        display: 'standalone',
        orientation: 'portrait',
        lang: 'pt-BR',
        icons: []
      }
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 5173
  }
});
