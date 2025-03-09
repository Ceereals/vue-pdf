import { Readable } from 'stream'
import {
  cleanObjectForSeralization,
  fileStreamToBlob,
  makeCancellable,
  mergeReactive,
} from '@utils'
import { describe, expect, it } from 'vitest'
import { isReactive, reactive } from 'vue'

describe('mergeReactive', () => {
  it('should merge two plain objects', () => {
    const target = { a: 1 }
    const source = { b: 2 }
    const result = mergeReactive(target, source)

    expect(result).toEqual({ a: 1, b: 2 })
    expect(isReactive(result)).toBe(true)
  })

  it('should merge reactive and plain object', () => {
    const target = reactive({ a: 1 })
    const source = { b: 2 }
    const result = mergeReactive(target, source)

    expect(result).toEqual({ a: 1, b: 2 })
    expect(isReactive(result)).toBe(true)
  })

  it('should merge two reactive objects', () => {
    const target = reactive({ a: 1 })
    const source = reactive({ b: 2 })
    const result = mergeReactive(target, source)

    expect(result).toEqual({ a: 1, b: 2 })
    expect(isReactive(result)).toBe(true)
  })
})

describe('fileStreamToBlob', () => {
  it('should convert file stream to blob', async () => {
    // Mocking a readable stream
    const mockStream = new Readable({
      read() {
        this.push('chunk1')
        this.push('chunk2')
        this.push(null)
      },
    })

    const blob = await fileStreamToBlob(mockStream)
    expect(blob instanceof Blob).toBe(true)
    expect(blob.type).toBe('application/pdf')

    const text = await blob.text()
    expect(text).toBe('chunk1chunk2')
  })

  it('should reject on error in stream', async () => {
    const mockStream = new Readable({
      read() {
        this.emit('error', new Error('Stream Error'))
      },
    })

    await expect(fileStreamToBlob(mockStream)).rejects.toThrow('Stream Error')
  })
  it('should reject on error in stream', async () => {
    const mockStream = new Readable({
      read() {
        this.push(0)
        this.push(1)
        this.push(null)
      },
    })

    await expect(fileStreamToBlob(mockStream)).rejects.toThrow()
  })
})

describe('cleanObjectForSeralization', () => {
  it('should remove circular references', () => {
    const obj = {
      a: 1,
      b: 2,
      c: {
        d: 3,
        e: 4,
        f: {
          g: 5,
          h: 6,
          i: {
            j: 7,
            k: 8,
            l: {
              m: 9,
              n: 10,
              o: {
                p: 11,
                q: 12,
                r: {
                  s: 13,
                  t: 14,
                  u: {
                    v: 15,
                    w: 16,
                    x: {
                      y: 17,
                      z: 18,
                      __proto__: null,
                    },
                  },
                },
              },
            },
          },
        },
      },
    }

    const result = cleanObjectForSeralization(obj)

    expect(result).toEqual({
      a: 1,
      b: 2,
      c: {
        d: 3,
        e: 4,
        f: {
          g: 5,
          h: 6,
          i: {
            j: 7,
            k: 8,
            l: {
              m: 9,
              n: 10,
              o: {
                p: 11,
                q: 12,
                r: {
                  s: 13,
                  t: 14,
                  u: {
                    v: 15,
                    w: 16,
                    x: {
                      y: 17,
                      z: 18,
                    },
                  },
                },
              },
            },
          },
        },
      },
    })
  })
})
describe('makeCancelable', () => {
    it('should resolve the promise if not cancelled', async () => {
      const asyncFunction = async (value: string) => {
        return new Promise<string>((resolve) => {
          setTimeout(() => resolve(value), 100)
        })
      }

      const cancellableFunction = makeCancellable(asyncFunction)
      const result = await cancellableFunction('test')

      expect(result).toBe('test')
    })

    it('should reject the promise if cancelled', async () => {
      const asyncFunction = async (value: string) => {
        return new Promise<string>((resolve) => {
          setTimeout(() => resolve(value), 100)
        })
      }

      const cancellableFunction = makeCancellable(asyncFunction)
      const promise = cancellableFunction('test')
      cancellableFunction('cancelled')

      await expect(promise).rejects.toThrow('Cancelled')
    })

    it('should handle multiple calls correctly', async () => {
      const asyncFunction = async (value: string) => {
        return new Promise<string>((resolve) => {
          setTimeout(() => resolve(value), 100)
        })
      }

      const cancellableFunction = makeCancellable(asyncFunction)
      const promise1 = cancellableFunction('first')
      const promise2 = cancellableFunction('second')

      await expect(promise1).rejects.toThrow('Cancelled')
      const result2 = await promise2

      expect(result2).toBe('second')
    })

    it('should propagate errors from the original function', async () => {
      const asyncFunction = async () => {
        throw new Error('Original Error')
      }

      const cancellableFunction = makeCancellable(asyncFunction)

      await expect(cancellableFunction()).rejects.toThrow('Original Error')
    })
})