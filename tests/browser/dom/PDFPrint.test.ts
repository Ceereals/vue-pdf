import { PDFPrint } from '@/dom'
import { mount } from '@vue/test-utils'
import { describe } from 'node:test'
import { expect, it, vi } from 'vitest'
import TestDocument from '../stubs/TestDocument.vue'
import { h } from 'vue'

describe('PDFPrint', () => {
  it('should render a link with the correct href', async () => {
    const wrapper = mount(PDFPrint, {
      slots: {
        label: 'Print PDF',
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
    expect(link.text()).toBe('Print PDF')
    expect(link.attributes('href')).toBe(url)
  })

  it('should open print dialog on click', async () => {
    const print = vi.fn()
    const focus = vi.fn()
    const addEventListener = vi.fn((_event, cb) => cb())
    const open = vi.spyOn(window, 'open').mockReturnValue({
      addEventListener,
      focus,
      print,
    } as unknown as Window)
    const wrapper = mount(PDFPrint, {
      props: {
        onClick: (e) => {
          expect(e).toBeDefined()
          expect(e).toBeInstanceOf(MouseEvent)
        },
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
    const link = wrapper.get('a')
    await link.trigger('click')

    expect(open).toHaveBeenCalledOnce()
    expect(addEventListener).toHaveBeenCalledWith(
      'load',
      expect.any(Function),
      expect.objectContaining({ once: true }),
    )
    expect(focus).toHaveBeenCalledOnce()
    expect(print).toHaveBeenCalledOnce()
  })

  it('should throw when no document is passed', async () => {
    try {
      mount(PDFPrint, {
        // @ts-expect-error
        slots: {
          label: 'Print',
        },
      })
    } catch (error) {
      // @ts-expect-error
      expect(error?.message).toMatch('PDFPrint requires a default slot')
    }
  })
})
