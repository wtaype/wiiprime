import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/wiiprime/' : '/',
  build: {
    outDir: 'dist',
    minify: 'terser',          // 🔧 más agresivo que esbuild para JS
    sourcemap: false,
    terserOptions: {
      format: { comments: false },
      compress: {
        passes: 2,
        drop_console: false,   // ← mantiene tus console.log
        drop_debugger: true
      },
      mangle: true
    },
    rollupOptions: {
      input: { main: resolve(__dirname, 'index.html') },
      output: {
        manualChunks: {
          vendor: ['jquery'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          icons: ['@fortawesome/fontawesome-free'] // ⚡  FontAwesome
        }
      },
      plugins: [{
        name: 'minify-html',
        generateBundle(_, b) {
          for (const f in b) {
            if (f.endsWith('.html') && b[f].type === 'asset') {
              b[f].source = b[f].source.replace(/\n\s*/g, '').replace(/>\s+</g, '><').replace(/\s{2,}/g, ' ').replace(/<!--.*?-->/g, '').trim();
            }
          }
        }
      }]
    }
  }, 
  publicDir: 'public'
}));