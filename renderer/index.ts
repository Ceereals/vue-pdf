import {
  type CreateAppFunction,
  type Renderer,
  type RootRenderFunction,
  createRenderer,
} from 'vue'
import { type PDFElement, type PDFNode, nodeOps } from './nodeOps'

let renderer: Renderer<PDFElement>

export function ensureRenderer() {
  return renderer || (renderer = createRenderer<PDFNode, PDFElement>(nodeOps))
}
export const render = ((...args) => {
  ensureRenderer().render(...args)
}) as RootRenderFunction<PDFElement>

export const createApp = ((...args) => {
  const app = ensureRenderer().createApp(...args)

  const { mount } = app
  app.mount = (containerOrSelector: PDFElement): any => {
    const proxy = mount(containerOrSelector, false)
    return proxy
  }
  // return proxy}
  return app
}) as CreateAppFunction<PDFElement>
