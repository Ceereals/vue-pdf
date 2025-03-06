// @ts-nocheck
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { PDFElement } from '../../renderer/nodeOps'
import { patchProp } from '../../renderer/patchProp'

describe('patchProp', () => {
  let element: PDFElement

  beforeEach(() => {
    element = {
      type: 'VIEW',
      document: {
        type: 'DOCUMENT',
        children: [],
        parentNode: null,
      } as PDFElement,
      style: {},
      props: {},
      box: {},
      children: [],
      parentNode: null,
    }
  })

  it('should update the style property of an element', () => {
    const newStyle = { color: 'blue' }
    patchProp(element, 'style', null, newStyle, null, null)
    expect(element.style).toBe(newStyle)
  })

  it('should update a generic property of an element', () => {
    const newPropValue = 'new value'
    const key = 'propKey'
    patchProp(element, key, null, newPropValue, null, null)
    expect(element.props[key]).toBe(newPropValue)
  })

  it('should handle multiple style updates correctly', () => {
    const style1 = { color: 'red' }
    const style2 = { fontSize: '12px' }
    patchProp(element, 'style', null, style1, null, null)
    expect(element.style).toBe(style1)
    patchProp(element, 'style', style1, style2, null, null)
    expect(element.style).toBe(style2)
  })

  it('should handle undefined and null values correctly', () => {
    const key = 'propKey'
    patchProp(element, key, null, undefined, null, null)
    expect(element.props[key]).toBeUndefined()
    patchProp(element, key, undefined, null, null, null)
    expect(element.props[key]).toBeNull()
  })

  it('should handle boolean properties correctly', () => {
    const key = 'boolProp'
    patchProp(element, key, null, true, null, null)
    expect(element.props[key]).toBe(true)
    patchProp(element, key, true, false, null, null)
    expect(element.props[key]).toBe(false)
  })
})
