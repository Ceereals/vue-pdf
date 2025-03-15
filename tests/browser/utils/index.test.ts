import { Readable } from 'node:stream'
import { cleanObjectForSeralization, fileStreamToBlob } from '@utils'
import { describe, expect, it } from 'vitest'

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
