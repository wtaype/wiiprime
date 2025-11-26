import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/wiiprime/' : '/',
  build: {
    outDir: 'dist',
    minify: 'esbuild', // ⚡ Minifica JS + HTML automáticamente
    cssMinify: true, // ⚡ CSS minificado (método default)
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      input: { main: resolve(__dirname, 'index.html') },
      output: {
        manualChunks: {
          vendor: ['jquery'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          icons: ['@fortawesome/fontawesome-free']
        }
      },
      plugins: [{
        name: 'minify-html',
        transformIndexHtml: (html) => html.replace(/>\s+</g, '><').replace(/\s{2,}/g, ' ').replace(/<!--.*?-->/gs, '').trim()
      }]
    }
  }, 
  publicDir: 'public'
}));