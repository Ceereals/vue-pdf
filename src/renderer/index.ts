import {
  type ComponentPublicInstance,
  type CreateAppFunction,
  type Renderer,
  type RootRenderFunction,
  createRenderer,
} from 'vue'
import { type PDFElement, type PDFNode, nodeOps } from './nodeOps'

let renderer: Renderer<PDFElement | PDFNode>

export function ensureRenderer(root?: PDFElement | PDFNode) {
  if (!renderer) {
    renderer = createRenderer(nodeOps(root))
  }
  return renderer
}
export const render = ((...args) => {
  ensureRenderer(args[1]).render(args[0], args[1])
}) as RootRenderFunction<PDFElement>

export const createApp = ((...args) => {
  const app = ensureRenderer().createApp(...args)

  const { mount } = app
  app.mount = (containerOrSelector: PDFElement): ComponentPublicInstance => {
    const proxy = mount(containerOrSelector, false)
    return proxy
  }
  return app
}) as CreateAppFunction<PDFElement>

export { usePdf } from '@/src/composables/usePdf'
