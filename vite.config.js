import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync, writeFileSync } from 'fs';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/wiiprime/' : '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: { main: resolve(__dirname, 'index.html') },
      output: { manualChunks: { vendor: ['jquery'], firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'] } },
      plugins: [{
        name: 'github-pages-spa',
        closeBundle() {
          const html404 = `<!DOCTYPE html><html><head><meta charset="utf-8"><script>sessionStorage.ghPath=location.pathname;location.replace(location.origin+'/wiiprime/')</script></head></html>`;
          writeFileSync('dist/404.html', html404);
          console.log('✅ 404.html creado para GitHub Pages');
        }
      }]
    }
  },
  publicDir: 'public'
}));