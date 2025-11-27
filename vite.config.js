import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/wiiprime/' : '/',
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    sourcemap: false,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      input: { main: resolve(__dirname, 'index.html') },
      output: {
        manualChunks: {
          vendor: ['jquery'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore']
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      },
      plugins: [{
        name: 'minify-html',
        generateBundle(_, b) {
          for (const f in b) {
            if (f.endsWith('.html') && b[f].type === 'asset') {
              b[f].source = String(b[f].source)
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
  esbuild: {
    legalComments: 'none',
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true
  },
  publicDir: 'public'
}));