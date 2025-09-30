// @ts-nocheck
import { mount } from '@vue/test-utils'
import { describe } from 'node:test'
import { expect, it } from 'vitest'
import TestPdfViewer from '../stubs/TestPdfViewer.vue'
import { PDFViewer } from '@/dom'
import { h } from 'vue'
import { Page } from '@/components'
import { rootSymbol } from '@/symbols'
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
      wrapper.vm.root().document?.children[0].children[0].children[0].value
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

  it('should add query parameters to the iframe src', async () => {
    const wrapper = mount(PDFViewer, {
      props: {
        queryParams: {
          toolbar: 0,
          zoom: 150,
          page: 2,
          search: 'test query',
          highlight: true,
        },
      },
      slots: {
        default() {
          return [h(TestDocument, { text: 'text' })]
        },
      },
    })

    // Wait for the component to generate the URL
    await wrapper.vm.execute()
    const iframe = wrapper.find('iframe')
    const src = iframe.attributes('src')

    // Check that query parameters are properly encoded in the URL
    expect(src).toContain('toolbar=0')
    expect(src).toContain('zoom=150')
    expect(src).toContain('page=2')
    expect(src).toContain('search=test+query')
    expect(src).toContain('highlight=true')
  })

  it('should handle empty query parameters', async () => {
    const wrapper = mount(PDFViewer, {
      props: {
        showToolbar: true,
      },
      slots: {
        default() {
          return [h(TestDocument)]
        },
      },
    })

    await wrapper.vm.execute()

    const iframe = wrapper.find('iframe')
    const src = iframe.attributes('src')

    // Should only contain the toolbar parameter
    expect(src).toContain('toolbar=1')
    expect(src.split('&')).toHaveLength(1)
  })
})
