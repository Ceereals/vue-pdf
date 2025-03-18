import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import pkg from './package.json' with { type: 'json' }
import cleanPlugin from './src/plugins/vite-clean.plugin'
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
          src: 'src/react-pdf/fns/lib/*',
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
      '@': path.resolve(__dirname, './src/'),
      '@renderer': path.resolve(__dirname, './src/renderer'),
      '@dom': path.resolve(__dirname, './src/dom'),
      '@node': path.resolve(__dirname, './src/node'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@workers': path.resolve(__dirname, './src/dom/workers'),
    },
  },
  build: {
    lib: {
      entry: {
        'node/index': path.resolve(__dirname, './src/node/index.ts'),
        'dom/index': path.resolve(__dirname, './src/dom/index.ts'),
        'vue-pdf-plugin': path.resolve(
          __dirname,
          './src/plugins/vue-pdf.plugin.ts',
        ),
      },
      name: 'vue-pdf',
      formats: ['es'],
    },
    outDir: 'dist',
    rollupOptions: {
      external: [
        'node:path',
        'node:fs',
        ...Object.keys(pkg.dependencies),
        ...Object.keys(pkg.peerDependencies),
      ],
    },
  },
})
