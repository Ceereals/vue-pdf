import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import pkg from './package.json' with { type: 'json' }
import cleanPlugin from './vite-clean.plugin'
export default defineConfig({
  plugins: [
    vue(),
    dts({
      rollupTypes: true,
      outDir: 'dist/types',
      tsconfigPath: './tsconfig.app.json',
      exclude: ['**/node_modules/**', 'tests/**'],
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'react-pdf/fns/lib/*',
          dest: 'fns',
        },
      ],
      hook: 'writeBundle',
    }),
    cleanPlugin(),
  ],

  worker: {
    format: 'es',
    rollupOptions: {
      external: ['comlink', '../usePdf'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@renderer': path.resolve(__dirname, './renderer'),
      '@dom': path.resolve(__dirname, './dom'),
      '@node': path.resolve(__dirname, './node'),
      '@utils': path.resolve(__dirname, './utils'),
      '@workers': path.resolve(__dirname, './dom/workers'),
      '@lib': path.resolve(__dirname, './lib'),
    },
  },
  build: {
    lib: {
      entry: {
        'node/index': path.resolve(__dirname, 'node/index.ts'),
        'dom/index': path.resolve(__dirname, 'dom/index.ts'),
        'vue-pdf-plugin': path.resolve(__dirname, 'vue-pdf.plugin.ts'),
      },
      name: 'vue-pdf',
      formats: ['es'],
    },
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      external: [
        'node:path',
        ...Object.keys(pkg.dependencies),
        ...Object.keys(pkg.peerDependencies),
      ],
    },
  },
})
