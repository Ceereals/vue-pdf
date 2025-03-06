import type { Plugin } from 'vue'
import { setupDevtools } from './devtools'
export * from './components'
export * from './dom'
/* v8 ignore next 5 */
const plugin: Plugin = {
  install(app) {
    setupDevtools(app)
  },
}
export { setupDevtools }
export default plugin
export { createApp, render } from './renderer'
