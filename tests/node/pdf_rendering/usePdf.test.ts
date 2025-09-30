// oxlint-disable no-unused-vars
import { usePdf } from '@/node'
import { describe, expect, it } from 'vitest'
import TestDocument from '../stubs/TestDocument.ts'
import { h } from 'vue'

describe('usePdf', () => {
  it('Should render a pdf given a Document component', () => {
    try {
      const promise = usePdf(() => h(TestDocument), {
        enableProvideBridge: false,
      })
      const { blob, isLoading, url, unmount } = promise
      expect(blob.value).toBe(null)
      expect(url.value).toBe(undefined)
      promise.then(
        () => {
          expect(isLoading.value).toBe(false)
          expect(blob.value).toBeInstanceOf(Blob)
          expect(url.value).toBeDefined()
        },
        () => {
          expect(true).toBe(false)
        }
      )
      unmount()
    } catch (_) {
      expect(true).toBe(false)
    }
  })
  it('Should render a pdf given a document vnode awaiting external', async () => {
    try {
      const promise = usePdf(() => TestDocument, { enableProvideBridge: false })
      const { blob, isLoading, url, error } = promise
      expect(blob.value).toBe(null)
      expect(isLoading.value).toBe(true)
      expect(url.value).toBe(undefined)
      try {
        await promise
      } catch (_) {
        expect(true).toBe(false)
      }
      expect(blob.value).toBeInstanceOf(Blob)
      expect(isLoading.value).toBe(false)
      expect(error.value).toBe(null)
      expect(url.value).toBeDefined()
    } catch (_) {
      expect(true).toBe(false)
    }
  })
  it('Should render a pdf given a document vnode', () => {
    const { blob, isLoading, isFinished, url, error, then } = usePdf(
      () => TestDocument
    )
    expect(isFinished.value).toBe(false)
    expect(error.value).toBe(null)
    expect(blob.value).toBe(null)
    expect(isLoading.value).toBe(true)
    expect(url.value).toBe(undefined)
    then(
      () => {
        expect(error.value).toBe(null)
        expect(blob.value).toBeInstanceOf(Blob)
        expect(isLoading.value).toBe(false)
        expect(url.value).toBeDefined()
        expect(error.value).toBe(null)
        expect(isFinished.value).toBe(true)
      },
      () => {
        expect(true).toBe(false)
      }
    )
  })
  it('Should render a pdf given a document vnode with await', async () => {
    try {
      const { blob, isLoading, isFinished, url } = await usePdf(TestDocument)
      expect(blob.value).toBeInstanceOf(Blob)
      expect(isLoading.value).toBe(false)
      expect(isFinished.value).toBe(true)
      expect(url.value).toBeDefined()
    } catch (_) {
      expect(true).toBe(false)
    }
  })
}, 1000)
