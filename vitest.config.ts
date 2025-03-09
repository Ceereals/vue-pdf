import { defineConfig, mergeConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import viteConfig from './vite.config'
export default mergeConfig(
  viteConfig,
  defineConfig({
    // plugins: [vue()],
    test: {
      environment: 'happy-dom',
      setupFiles: ['@vitest/web-worker'],
      include: ['./tests/**/*.test.ts'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html'],
      },
      deps: {
        optimizer: {
          web: {
            enabled: true,
            include: ['@react-pdf/primitives'],
          },
        },
      },
    },
  }),
)
