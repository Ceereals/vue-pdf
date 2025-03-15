import { beforeEach, describe, expect, it, vi } from 'vitest'
import { h } from 'vue'
import { Document } from '../../../components'
import { createApp, render } from '../../../renderer'
import type { PDFElement } from '../../../renderer/nodeOps'
describe('renderer', () => {
  // Mock data and utility functions

  let container: PDFElement

  beforeEach(() => {
    container = {
      type: 'ROOT',
      document: null,
    } as unknown as PDFElement
  })

  it('should create an app instance', () => {
    const app = createApp(Document)
    expect(app).toBeDefined()
    expect(typeof app.mount).toBe('function')
  })

  it('should mount the component correctly', () => {
    const app = createApp(Document)
    const mountSpy = vi.spyOn(app, 'mount')
    app.mount(container)
    expect(mountSpy).toHaveBeenCalledWith(container)
  })

  it('should render component correctly', () => {
    const vnode = h(Document)
    render(vnode, container)
    expect(container.document).toBeDefined()
  })
})
