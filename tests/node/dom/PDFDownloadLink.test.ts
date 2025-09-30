import { PDFDownloadLink } from '@/node'
import { describe, expect, it } from 'vitest'

describe('PDFDownloadLink', () => {
  it('should throw', () => {
    expect(PDFDownloadLink).toThrow(
      'PDFDownloadLink is not available in the browser'
    )
  })
})
