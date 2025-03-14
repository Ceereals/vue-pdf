import type { Plugin } from 'vite'
import path from 'node:path'
export default function vuepdfPlugin(): Plugin {
  return {
    name: 'vite-plugin-vue-pdf',
    config: () => {
      return {
        resolve: {
          alias: {
            '@react-pdf/fns': path.resolve(
              './node_modules/@ceereals/vue-pdf/dist/fns/index.js'
            ),
          },
        },
      }
    },
  }
}
