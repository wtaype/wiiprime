import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/wiiprime/' : '/',
  build: {
    outDir: 'dist',
    minify: 'esbuild', // ✅ Minifica JS y HTML automáticamente
    cssMinify: 'esbuild', // ✅ Minifica CSS (agregado)
    sourcemap: false,
    cssCodeSplit: true, // ✅ Divide CSS en chunks
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096, // ✅ Inline assets pequeños
    reportCompressedSize: false, // ✅ Build más rápido
    rollupOptions: {
      input: { main: resolve(__dirname, 'index.html') },
      output: {
        manualChunks: {
          vendor: ['jquery'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          icons: ['@fortawesome/fontawesome-free']
        }
      }
    }
  }, 
  publicDir: 'public'
}));