import { PDFDownloadLink } from '@/dom'
import { mount } from '@vue/test-utils'
import { describe } from 'node:test'
import { expect, it } from 'vitest'
import TestDocument from '../stubs/TestDocument.vue'
import { h } from 'vue'

describe('PDFDownloadLink', () => {
  it('should render a link with the correct href', async () => {
    const wrapper = mount(PDFDownloadLink, {
      props: {
        fileName: 'test.pdf',
      },
      slots: {
        label: 'Download PDF',
        default() {
          return [h(TestDocument)]
        },
      },
    })
    const { promise, resolve } = Promise.withResolvers()
    setTimeout(resolve, 150)
    await promise
    const url = wrapper.vm.url
    const link = wrapper.get('a')
    expect(link.text()).toBe('Download PDF')
    expect(link.attributes('href')).toBe(url)
    expect(link.attributes('download')).toBe('test.pdf')
  })
  it('should render a link with the correct href without label slot', async () => {
    const wrapper = mount(PDFDownloadLink, {
      props: {
        fileName: 'test.pdf',
      },
      slots: {
        default() {
          return [h(TestDocument)]
        },
      },
    })
    const { promise, resolve } = Promise.withResolvers()
    setTimeout(resolve, 100)
    await promise
    const url = wrapper.vm.url
    const link = wrapper.get('a')
    expect(link.text()).toBe('Download')
    expect(link.attributes('href')).toBe(url)
    expect(link.attributes('download')).toBe('test.pdf')
  })
  it('should throw when no document is passed', async () => {
    try {
      mount(PDFDownloadLink, {
        props: {
          fileName: 'test.pdf',
        },
        // @ts-expect-error
        slots: {
          label: 'Download',
        },
      })
    } catch (error) {
      // @ts-expect-error
      expect(error?.message).toMatch('PDFDownloadLink requires a default slot')
    }
  })
  it('should throw when an empty array is passed as default slot', async () => {
    try {
      mount(PDFDownloadLink, {
        props: {
          fileName: 'test.pdf',
        },
        slots: {
          label: 'Download',
          default() {
            return []
          },
        },
      })
    } catch (error) {
      // @ts-expect-error
      expect(error?.message).toMatch('PDFDownloadLink requires a default slot')
    }
  })
  it('should handle onclick event', async () => {
    const wrapper = mount(PDFDownloadLink, {
      props: {
        fileName: 'test.pdf',
        onClick: (e) => {
          expect(e).toBeDefined()
          expect(e).toBeInstanceOf(MouseEvent)
        },
      },
      slots: {
        label: 'Download',
        default() {
          return [h(TestDocument)]
        },
      },
    })
    const { promise, resolve } = Promise.withResolvers()
    setTimeout(resolve, 100)
    await promise
    const link = wrapper.get('a')
    await link.trigger('click')
  })
})
