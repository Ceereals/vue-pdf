// @ts-nocheck
import { mount } from '@vue/test-utils'
import { describe } from 'node:test'
import { expect, it } from 'vitest'
import TestPdfViewer from '../stubs/TestPdfViewer.vue'
import { PDFViewer } from '@/src/dom'
import { h } from 'vue'
import { Page } from '@/src/components'
import { rootSymbol } from '@/src/symbols'
import TestDocument from '../stubs/TestDocument.vue'

describe('PdfViewer', () => {
  it('unmounts the component', async () => {
    const wrapper = mount(PDFViewer, {
      slots: {
        default() {
          return [h(TestDocument)]
        },
      },
    })
    expect(wrapper.vm[rootSymbol].document?.children).toHaveLength(1)
    wrapper.unmount()
    expect(wrapper.vm[rootSymbol]._vnode).toBeNull()
  })
  it('should render a pdf given a Document component', async () => {
    const wrapper = mount(TestPdfViewer, {
      props: {
        bridge: false,
      },
    })
    expect(wrapper.vm.root().document?.children).toHaveLength(1)
    wrapper.setProps({ bridge: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.root().document?.children).toHaveLength(2)
  })
  it('should call execute when a provided ref changes', async () => {
    const wrapper = mount(TestPdfViewer, {
      props: {
        bridge: false,
      },
    })
    expect(wrapper.vm.root().document?.children).toHaveLength(1)
    wrapper.setProps({ bridge: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.root().document?.children).toHaveLength(2)
  })
  it('should call execute when a provided ref changes', async () => {
    const wrapper = mount(TestPdfViewer, {
      props: {
        bridge: false,
      },
    })
    expect(wrapper.vm.root().document?.children).toHaveLength(1)
    wrapper.setProps({ bridge: true, text: 'Hello' })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.root().document?.children).toHaveLength(2)
    expect(
      wrapper.vm.root().document?.children[0].children[0].children[0].value,
    ).toBe('Hello')
  })
  it('should mount PdfViewer', async () => {
    const wrapper = mount(PDFViewer, {
      props: {
        showToolbar: true,
      },
      slots: {
        default() {
          return [h(Page)]
        },
      },
    })
    expect(wrapper.vm[rootSymbol].document?.children).toHaveLength(0)
  })
  it('should mount PdfViewer without toolbar', async () => {
    const wrapper = mount(PDFViewer, {
      props: {
        showToolbar: false,
      },
      slots: {
        default() {
          return [h(Page)]
        },
      },
    })
    expect(wrapper.vm[rootSymbol].document?.children).toHaveLength(0)
  })
})
