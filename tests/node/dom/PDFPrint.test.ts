import { PDFPrint } from '@/node'
import { describe, expect, it } from 'vitest'

describe('PDFPrint', () => {
  it('should throw', () => {
    expect(PDFPrint).toThrow('PDFPrint is not available in the browser')
  })
})
