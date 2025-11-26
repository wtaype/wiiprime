import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/wiiprime/' : '/',
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      input: { main: resolve(__dirname, 'index.html') },
      output: {
        manualChunks: {
          vendor: ['jquery'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          icons: ['@fortawesome/fontawesome-free'] // ⚡ Separar FontAwesome
        }
      },
      plugins: [{
        name: 'minify-html',
        generateBundle(_, bundle) {
          for (const fileName in bundle) {
            const file = bundle[fileName];
            if (fileName.endsWith('.html') && file.type === 'asset') {
              file.source = file.source
                .replace(/\n\s*/g, '')
                .replace(/>\s+</g, '><')
                .replace(/\s{2,}/g, ' ')
                .replace(/<!--.*?-->/g, '')
                .trim();
            }
          }
        }
      }]
    }
  }, 
  publicDir: 'public'
}));