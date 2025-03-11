import {
  type ComponentPublicInstance,
  type CreateAppFunction,
  type Renderer,
  type RootRenderFunction,
  createRenderer,
} from 'vue'
import { type PDFElement, type PDFNode, nodeOps } from './nodeOps'

let renderer: Renderer<PDFElement | PDFNode>

export function ensureRenderer() {
  if (!renderer) {
    renderer = createRenderer(nodeOps)
  }
  return renderer
}
export const render = ((...args) => {
  ensureRenderer().render(...args)
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
