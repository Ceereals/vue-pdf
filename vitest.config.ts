import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'
export default mergeConfig(
  viteConfig,
  defineConfig({
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
            include: ['@react-pdf/types/primitive', '@react-pdf/primitives'],
          },
        },
      },
    },
  }),
)
