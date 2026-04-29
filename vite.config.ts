import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    solid(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'probgame',
        short_name: 'probgame',
        description: 'Aprende probabilidade com o teu Cinder.',
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
