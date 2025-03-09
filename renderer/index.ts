import {
  type CreateAppFunction,
  type Renderer,
  type RootRenderFunction,
  createRenderer,
} from 'vue'
import { type PDFElement, type PDFNode, nodeOps } from './nodeOps'

let renderer: Renderer<PDFElement>

export function ensureRenderer(context: any) {
  if (!renderer) {
    renderer = createRenderer<PDFNode, PDFElement>(nodeOps(context))
  }
  return renderer
}
export const render = ((...args) => {
  ensureRenderer(args[2]).render(args[0], args[1])
}) as RootRenderFunction<PDFElement>

export const createApp = ((...args) => {
  const app = ensureRenderer({ execute: () => {} }).createApp(...args)

  const { mount } = app
  app.mount = (containerOrSelector: PDFElement): any => {
    const proxy = mount(containerOrSelector, false)
    return proxy
  }
  // return proxy}
  return app
}) as CreateAppFunction<PDFElement>
