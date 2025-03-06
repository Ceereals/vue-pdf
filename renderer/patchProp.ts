import type { RendererOptions } from 'vue'
import type { PDFElement, PDFNode } from './nodeOps'

type PDFRendererOptions = RendererOptions<PDFNode, PDFElement>

export const patchProp: PDFRendererOptions['patchProp'] = (
  el,
  key,
  _1,
  nextValue,
  _2,
  _3,
) => {
  if (key === 'style') {
    el.style = nextValue
  } else {
    // @ts-expect-error
    el.props[key] = nextValue
  }
  return el
}
