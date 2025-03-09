import { Document } from '@/components'
import { usePdf } from '@/dom'
import { describe, expect, it, vi } from 'vitest'
import { h } from 'vue'
import TestDocument from '../stubs/TestDocument.vue'
vi.mock('@utils', async (importOriginal) => {
  const original = (await importOriginal()) as any
  return {
    ...original,
    fileStreamToBlob: async (_: any) => {
      throw new Error('Error throwed')
    },
  }
})
describe('usePdf errors', () => {
  it('execute should throw error', async () => {
    const { execute } = usePdf(() => h(TestDocument), {
      immediate: false,
    })
    try {
      await execute(true)
      expect(true).toBe(false)
    } catch (e: any) {
      expect(e).toBeInstanceOf(Error)
      expect(e.message).toBe('Error throwed')
    }
  })
  it('execute should throw error and runs onError hook', async () => {
    const onError = vi.fn(() => {
      return new Error('Error modified')
    })
    const { execute } = await usePdf(() => h(TestDocument), {
      immediate: false,
      onError,
    })
    expect(onError).not.toBeCalled()
    try {
      await execute()
      expect(true).toBe(false)
    } catch (e: any) {
      expect(e).toBeInstanceOf(Error)
      expect(e.message).toBe('Error modified')
      expect(onError).toHaveBeenCalledOnce()
    }
  })
}, 5000)
