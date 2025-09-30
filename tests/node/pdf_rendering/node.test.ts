// oxlint-disable no-unused-vars
import { renderToBuffer, renderToFile, renderToStream } from '@/node'
import { describe, expect, it, vi } from 'vitest'
import TestDocument from '../stubs/TestDocument'
import Stream from 'node:stream'
import { fs } from 'memfs'
vi.mock('node:fs')
describe('renderTo', () => {
  it('should render to Stream', async () => {
    try {
      const stream = await renderToStream(TestDocument)
      expect(stream).toBeDefined()
      expect(stream).toBeInstanceOf(Stream.Readable)
    } catch (_) {
      expect(true).toBe(false)
    }
  })
  it('should render to Buffer', async () => {
    try {
      const buffer = await renderToBuffer(TestDocument)
      expect(buffer).toBeDefined()
      expect(buffer).toBeInstanceOf(Buffer)
    } catch (e) {
      // @ts-expect-error
      if (e.name === 'AssertionError') throw e
      expect(true).toBe(false)
    }
  })
  it('should render to File', async () => {
    try {
      const buffer = await renderToFile(TestDocument, '/document.pdf')
      expect(buffer).toBeDefined()
      expect(buffer).toBeInstanceOf(Stream.Readable)
      const pdf = fs.readFileSync('/document.pdf') as Buffer
      expect(pdf).toBeDefined()
      expect(pdf).toBeInstanceOf(Buffer)
      expect(pdf.byteLength).toBeGreaterThan(0)
    } catch (e) {
      // @ts-expect-error
      if (e.name === 'AssertionError') throw e
      expect(true).toBe(false)
    }
  })
})
