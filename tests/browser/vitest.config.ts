import { defineProject, mergeConfig } from 'vitest/config'
import vitestConfig from '../../vitest.config'
export default mergeConfig(
  vitestConfig,
  defineProject({
    test: {
      environment: 'happy-dom',
      setupFiles: ['@vitest/web-worker'],
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
