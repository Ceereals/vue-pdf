// @ts-nocheck
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { type PDFNode, nodeOps as nodeOpsFn } from '../../renderer/nodeOps'
const nodeOps = nodeOpsFn({ execute: () => {} })
// Utility function to create a mock PDFNode

describe('nodeOps', () => {
  let documentNode: PDFNode
  let pageNode: PDFNode
  let viewNode: PDFNode
  let textNode: PDFNode
  let imageNode: PDFNode
  let commentNode: PDFNode

  beforeEach(() => {
    documentNode = nodeOps.createElement('DOCUMENT') as unknown as PDFNode
    pageNode = nodeOps.createElement('PAGE') as unknown as PDFNode
    viewNode = nodeOps.createElement('VIEW') as unknown as PDFNode
    textNode = nodeOps.createElement('TEXT') as unknown as PDFNode
    imageNode = nodeOps.createElement('IMAGE') as unknown as PDFNode
    commentNode = nodeOps.createElement('COMMENT') as unknown as PDFNode
  })
  it('should create a root element', () => {
    const root = nodeOps.createElement('ROOT')
    expect(root.type).toBe('ROOT')
  })
  it('should insert a Document in a root element', () => {
    const root = nodeOps.createElement('ROOT')
    const document = nodeOps.createElement('DOCUMENT')
    nodeOps.insert(document, root, null)
    expect(root.document).toBe(document)
  })
  it('should insert a Document in a root element', () => {
    const document = nodeOps.createElement('DOCUMENT', undefined, undefined, {
      size: 'A4',
    })
    document.parentNode = {}
    nodeOps.remove(document)
    expect(document.parentNode.children).not.toBeDefined()
    expect(document.props.size).toBe('A4')
  })
  it('should insert a Document in a root element', () => {
    const document = nodeOps.createElement('DOCUMENT', undefined, undefined, {
      size: 'A4',
    })
    document.parentNode = null
    const sibling = nodeOps.nextSibling(document)
    expect(sibling).toBeNull()
  })
  it('should insert a page node inside a document node', () => {
    nodeOps.insert(pageNode, documentNode, null)
    expect(documentNode.children).toContain(pageNode)
    expect(pageNode.parentNode).toBe(documentNode)
  })

  it('should insert a view node inside a page node', () => {
    nodeOps.insert(viewNode, pageNode, null)
    expect(pageNode.children).toContain(viewNode)
    expect(viewNode.parentNode).toBe(pageNode)
  })

  it('should insert a text node inside a view node', () => {
    nodeOps.insert(textNode, viewNode, null)
    expect(viewNode.children).toContain(textNode)
    expect(textNode.parentNode).toBe(viewNode)
  })

  it('should handle orphan text instance properly', () => {
    const orphanTextNode = nodeOps.createText('Orphan Text')
    const consoleWarnSpy = vi.spyOn(console, 'warn')

    nodeOps.insert(orphanTextNode, viewNode, null)

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "Invalid 'Orphan Text' string child outside <Text> component",
    )
    expect(viewNode.children).not.toContain(orphanTextNode)
  })

  it('should remove a child node properly', () => {
    nodeOps.insert(viewNode, pageNode, null)
    nodeOps.remove(viewNode)
    expect(pageNode.children).not.toContain(viewNode)
    expect(viewNode.parentNode).toBeNull()
  })

  it('should create an element with the correct properties', () => {
    const style = { color: 'red' }
    const props = { someProp: 'value' }
    const element = nodeOps.createElement('VIEW', '', false, {
      style,
      ...props,
    })
    expect(element.type).toBe('VIEW')
    expect(element.style).toEqual(style)
    expect(element.props).toEqual(props)
  })

  it('should create a text node with the correct value', () => {
    const text = 'Hello World'
    const textNode = nodeOps.createText(text)
    expect(textNode.type).toBe('TEXT_INSTANCE')
    expect(textNode.value).toBe(text)
  })

  it('should set text value of a node', () => {
    const node = nodeOps.createText('Old Text')
    nodeOps.setText(node, 'New Text')
    expect(node.value).toBe('New Text')
  })

  it('should set element text value correctly', () => {
    const element = nodeOps.createText('TEXT')
    nodeOps.setElementText(element, 'New Text')
    expect(element.value).toBe('New Text')
  })

  it('should get the parent node correctly', () => {
    nodeOps.insert(viewNode, pageNode, null)
    expect(nodeOps.parentNode(viewNode)).toBe(pageNode)
  })

  it('should get the next sibling correctly', () => {
    const siblingNode = nodeOps.createElement('VIEW')
    nodeOps.insert(viewNode, pageNode, null)
    nodeOps.insert(siblingNode, pageNode, null)

    expect(nodeOps.nextSibling(viewNode)).toBe(siblingNode)
    expect(nodeOps.nextSibling(siblingNode)).toBeNull()
  })
  it('should not insert a comment node', () => {
    nodeOps.insert(commentNode, pageNode, null)
    expect(pageNode.children).not.toContain(commentNode)
    expect(commentNode.parentNode).toBeNull()
  })
  it('should insert a Page next to a Page', () => {
    const page1 = nodeOps.createElement('PAGE')
    const page2 = nodeOps.createElement('PAGE')
    nodeOps.insert(page2, documentNode, null)
    nodeOps.insert(page1, documentNode, page2)
    expect(documentNode.children[0].uid).toEqual(page1.uid)
    expect(documentNode.children[1].uid).toEqual(page2.uid)
  })
})
