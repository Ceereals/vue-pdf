import { Document, Page, View, usePdf } from '@/index'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

describe('usePdf', () => {
  it('Should render a pdf given a Document component', async () => {
    const promise = usePdf(Document, { enableProvideBridge: true })
    const { blob, isLoading, url } = promise
    expect(blob.value).toBe(null)
    expect(isLoading.value).toBe(true)
    expect(url.value).toBe(undefined)
    await promise
    expect(isLoading.value).toBe(false)
    expect(blob.value).toBeInstanceOf(Blob)
    expect(url.value).toBeDefined()
  })
  it('Should render a pdf given a document vnode', async () => {
    const promise = usePdf(() =>
      h(
        View,
        {
          onRender: () => {},
        },
        () => h(Page),
      ),
    )
    const { blob, isLoading, url } = promise
    expect(blob.value).toBe(null)
    expect(isLoading.value).toBe(true)
    expect(url.value).toBe(undefined)
    await promise
    expect(blob.value).toBeInstanceOf(Blob)
    expect(isLoading.value).toBe(false)
    expect(url.value).toBeDefined()
  })
  it('Should render a pdf given a document vnode', () => {
    const { blob, isLoading, isFinished, url, error, then } = usePdf(
      () => Document,
    )
    expect(isFinished.value).toBe(false)
    expect(error.value).toBe(null)
    expect(blob.value).toBe(null)
    expect(isLoading.value).toBe(true)
    expect(url.value).toBe(undefined)
    then(() => {
      expect(error.value).toBe(null)
      expect(blob.value).toBeInstanceOf(Blob)
      expect(isLoading.value).toBe(false)
      expect(url.value).toBeDefined()
      expect(error.value).toBe(null)
      expect(isFinished.value).toBe(true)
    })
  })
  it('Should render a pdf given a document vnode', async () => {
    const { blob, isLoading, isFinished, url } = await usePdf(h(Document))
    expect(blob.value).toBeInstanceOf(Blob)
    expect(isLoading.value).toBe(false)
    expect(isFinished.value).toBe(true)
    expect(url.value).toBeDefined()
  })
})
