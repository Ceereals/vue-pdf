import { defineProject, mergeConfig } from 'vitest/config'
import vitestConfig from '../../vitest.config'
export default mergeConfig(
  vitestConfig,
  defineProject({
    test: {
      environment: 'node',
    },
    resolve: {
      dedupe: ['vue'],
    },
    // ssr: true,
    appType: 'spa'
  })
)
