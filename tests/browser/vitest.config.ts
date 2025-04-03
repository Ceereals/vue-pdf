import { defineProject, mergeConfig } from 'vitest/config'
import vitestConfig from '../../vitest.config'
import path from 'node:path'
console.log(path.resolve('./dist/fns/index.js'))
export default mergeConfig(
  vitestConfig,
  defineProject({
    test: {
      environment: 'happy-dom',
      setupFiles: ['@vitest/web-worker'],
          deps: {
        optimizer: {
            web: {
            exclude: ['@react-pdf/fns'],
            enabled: true,
            include: ['@react-pdf/primitives'],
          },
        },
      },
    },
    resolve: {
      alias: {
        '@react-pdf/fns': path.resolve('./dist/fns/index.js'),
      },
    },
  })
)
