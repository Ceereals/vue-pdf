import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      rollupTypes: true,

      tsconfigPath: './tsconfig.app.json',
    }),
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
      '@dom': path.resolve(__dirname, './dom'),
      '@renderer': path.resolve(__dirname, './renderer'),
      '@utils': path.resolve(__dirname, './utils'),
      '@workers': path.resolve(__dirname, './dom/workers'),
      '@lib': path.resolve(__dirname, './lib'),
    },
  },
  build: {
    lib: {
      entry: 'index.ts',
      name: 'index',
      formats: ['es'],
    },
    sourcemap: true,
    rollupOptions: {
      external: [
        '@vue/shared',
        '@react-pdf/layout',
        '@react-pdf/types/primitive',
        '@react-pdf/pdfkit',
        '@react-pdf/render',
        '@react-pdf/font',
        '@react-pdf/primitives',
        'vue',
      ],
    },
  },
  base: './',
})
