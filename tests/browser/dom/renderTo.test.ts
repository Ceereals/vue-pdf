import { renderToBuffer, renderToFile, renderToStream } from '@/dom'
import { describe, expect, it } from 'vitest'
import TestDocument from '../stubs/TestDocument.vue'

describe('renderTo', () => {
  it('should throw exception renderToFile', () => {
    expect(() => renderToFile(TestDocument, 'hello')).toThrowError(
      'renderToFile is not available in the browser'
    )
  })
  it('should throw exception renderToBuffer', () => {
    expect(() => renderToBuffer(TestDocument)).toThrowError(
      'renderToBuffer is not available in the browser'
    )
  })
  it('should throw exception renderToStream', () => {
    expect(() => renderToStream(TestDocument)).toThrowError(
      'renderToStream is not available in the browser'
    )
  })
})
