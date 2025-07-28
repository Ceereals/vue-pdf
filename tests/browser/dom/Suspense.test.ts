import { afterEach, beforeEach, expect, it, describe, vi } from 'vitest'
import { PDFSuspense, usePdf } from '@/dom'
import { h } from 'vue'
import SuspenseTest from '../stubs/SuspenseTest.vue'
import AsyncTestDocument from '../stubs/AsyncTestDocument.vue'
import LoadingDocument from '../stubs/LoadingDocument.vue'

describe('PdfSuspense', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('renders the document with awaited text', async () => {
    const promise = usePdf(() => h(SuspenseTest))
    const { blob, isLoading, url, root } = promise
    expect(blob.value).toBe(null)
    expect(url.value).toBe(undefined)
    // @ts-expect-error
    expect(root.value.document?.children[0].children[0].children[0].value).toBe(
      'Loading...'
    )

    await promise.then(
      () => {
        expect(isLoading.value).toBe(false)
        expect(blob.value).toBeInstanceOf(Blob)
        expect(url.value).toBeDefined()
      },
      () => {
        expect(true).toBe(false)
      }
    )
    await vi.runAllTimersAsync()
    // @ts-expect-error
    expect(root.value.document?.children[0].children[0].children[0].value).toBe(
      'async text'
    )
  })
  it('renders the document with awaited text and callbacks', async () => {
    const promise = usePdf(() =>
      h(
        PDFSuspense,
        {
          onPending: () => {
            expect(true).toBe(true)
          },
          onResolve: () => {
            expect(true).toBe(true)
          },
        },
        {
          default: () => h(AsyncTestDocument, { text: 'async text' }),
          fallback: () => h(LoadingDocument),
        }
      )
    )
    const { blob, isLoading, url, root } = promise
    expect(blob.value).toBe(null)
    expect(url.value).toBe(undefined)
    // @ts-expect-error
    expect(root.value.document?.children[0].children[0].children[0].value).toBe(
      'Loading...'
    )

    await promise.then(
      () => {
        expect(isLoading.value).toBe(false)
        expect(blob.value).toBeInstanceOf(Blob)
        expect(url.value).toBeDefined()
      },
      () => {
        expect(true).toBe(false)
      }
    )
    await vi.runAllTimersAsync()
    // @ts-expect-error
    expect(root.value.document?.children[0].children[0].children[0].value).toBe(
      'async text'
    )
  })
})
