// @ts-nocheck
import { usePdf } from '@/dom'
import { describe, expect, it, vi } from 'vitest'
import { h } from 'vue'
import TestDocument from '../stubs/TestDocument.vue'
vi.mock('@utils', async (importOriginal) => {
  const original = await importOriginal()
  return {
    ...original,
    fileStreamToBlob: async (_) => {
      throw new Error('Error throwed')
    },
  }
})
describe('usePdf errors', () => {
  it('execute should throw error', async () => {
    const { execute } = usePdf(() => TestDocument, {
      reactive: false,
    })
    try {
      await execute(true)
      expect(true).toBe(false)
    } catch (e) {
      expect(e).toBeInstanceOf(Error)
      expect(e.message).toBe('Error throwed')
    }
  })
  it('execute should throw error and runs onError hook', async () => {
    const onError = vi.fn(() => {
      return new Error('Error modified')
    })
    const { execute } = usePdf(() => h(TestDocument), {
      reactive: false,
      onError,
    })
    expect(onError).not.toBeCalled()
    try {
      await execute(true)
      expect(true).toBe(false)
    } catch (e) {
      expect(e).toBeInstanceOf(Error)
      expect(e.message).toBe('Error modified')
      expect(onError).toHaveBeenCalledOnce()
    }
  })
  it('execute should throw error and runs onError hook on immediate', async () => {
    const onError = vi.fn(() => {
      return new Error('Error modified')
    })
    const promise = usePdf(() => h(TestDocument), {
      onError,
    })
    try {
      await promise
      expect(true).toBe(false)
    } catch (e) {
      expect(e).toBeInstanceOf(Error)
      expect(e.message).toBe('Error modified')
      expect(onError).toHaveBeenCalledOnce()
    }
    onError.mockImplementationOnce((e) => {
      return e
    })
    try {
      promise.execute(true).catch((e) => {
        expect(e).toBeInstanceOf(Error)
        expect(e.message).toBe('Cancelled')
      })
      await promise.execute(true)
      expect(true).toBe(false)
    } catch (e) {
      expect(e).toBeInstanceOf(Error)
      expect(e.message).toBe('Error modified')
      expect(onError).toHaveBeenCalled()
    }
  })
  it('execute should throw error and runs onError hook on immediate', async () => {
    const onError = vi.fn(() => {
      return new Error('Error modified')
    })
    const promise = usePdf(() => h(TestDocument), {
      onError,
    })
    try {
      await promise
      expect(true).toBe(false)
    } catch (e) {
      expect(e).toBeInstanceOf(Error)
      expect(e.message).toBe('Error modified')
      expect(onError).toHaveBeenCalledOnce()
    }
    onError.mockImplementationOnce((_) => {})
    try {
      promise.execute(true).catch((e) => {
        expect(e).toBeInstanceOf(Error)
        expect(e.message).toBe('Cancelled')
      })
      await promise.execute(true)
      expect(true).toBe(false)
    } catch (e) {
      expect(e).toBeInstanceOf(Error)
      expect(e.message).toBe('Error modified')
      expect(onError).toHaveBeenCalled()
    }
  })
}, 1000)
