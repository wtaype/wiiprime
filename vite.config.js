import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/wiiprime/' : '/',
  build: {
    outDir: 'dist',
    minify: 'esbuild', // ⚡ JS minificado
    cssMinify: 'lightningcss', // ⚡ CSS minificado
    sourcemap: false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096,
    reportCompressedSize: false,
    rollupOptions: {
      input: { main: resolve(__dirname, 'index.html') },
      output: {
        manualChunks: {
          vendor: ['jquery'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          icons: ['@fortawesome/fontawesome-free']
        }
      },
      plugins: [
        {
          name: 'html-minify',
          transformIndexHtml(html) {
            return html
              .replace(/>\s+</g, '><') // ⚡ Elimina espacios entre tags
              .replace(/\s+/g, ' ') // ⚡ Espacios múltiples a uno
              .replace(/<!--.*?-->/g, '') // ⚡ Elimina comentarios HTML
              .trim();
          }
        }
      ]
    }
  }, 
  publicDir: 'public'
}));