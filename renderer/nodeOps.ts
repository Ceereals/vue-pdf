import type { RendererOptions } from 'vue'

const appendChild = (
  parentInstance: PDFNode | PDFElement,
  child: PDFNode,
  anchor?: PDFNode | null,
) => {
  const isParentText =
    parentInstance.type === 'TEXT' ||
    parentInstance.type === 'LINK' ||
    parentInstance.type === 'TSPAN' ||
    parentInstance.type === 'NOTE'
  const isChildTextInstance = child.type === 'TEXT_INSTANCE'
  const isOrphanTextInstance = isChildTextInstance && !isParentText

  // Ignore orphan text instances.
  // Caused by cases such as <>{name && <Text>{name}</Text>}</>
  if (isOrphanTextInstance) {
    console.warn(
      `Invalid '${child.value}' string child outside <Text> component`,
    )
    return
  }
  // @ts-expect-error
  child.parentNode = parentInstance
  if (anchor) {
    // @ts-expect-error
    const index = parentInstance.children.indexOf(anchor)
    if (index !== -1) {
      // @ts-expect-error
      parentInstance.children.splice(index, 0, child)
      return
    }
  }
  // @ts-expect-error
  parentInstance.children.push(child)
}

export type PDFElement = {
  uid: string
  type: string
  document: PDFNode
  style?: Record<string, string>
  props?: Record<string, unknown>
  box?: Record<string, unknown>
}
export type PDFNode = Omit<PDFElement, 'document'> & {
  children: PDFNode[]
  parentNode: PDFNode | null
  value?: string
}

export const nodeOps: (context: any) => RendererOptions<PDFNode, PDFElement> = (
  context,
) => ({
  insert: (child, parent, anchor) => {
    if (!child || !parent) return
    if (child.type === 'COMMENT') return
    if (parent.type === 'ROOT') {
      parent.document = child
    } else {
      appendChild(parent, child, anchor)
    }
    context.execute()
  },

  remove: (child) => {
    const index = child.parentNode?.children?.indexOf(child)
    if (index === undefined) return

    if (index !== -1) {
      child.parentNode?.children.splice(index, 1)
      child.parentNode = null
    }
    // context.execute()
  },
  createElement: (
    tag,
    _,
    __,
    // @ts-expect-error
    { style, ...props } = { style: undefined },
  ): PDFElement => {
    return {
      uid: crypto.randomUUID(),
      type: tag,
      children: [],
      parentNode: null,
      style: style || {},
      /* v8 ignore next */
      props: props || {},
      box: {},
    } as unknown as PDFElement
  },

  createText: (text) => {
    return { type: 'TEXT_INSTANCE', value: text } as unknown as PDFNode
  },
  createComment: (text) =>
    ({ type: 'COMMENT', value: text }) as unknown as PDFNode,

  setText: (node, text) => {
    node.value = text
    context.execute()
  },

  setElementText: (el, text) => {
    // @ts-expect-error
    el.value = text
    context.execute()
  },

  /* v8 ignore next */
  querySelector: () => null,
  /* v8 ignore next */
  setScopeId(_, __) {},
  parentNode(node: PDFNode | null): PDFElement | null {
    if (!node) return node
    return node.parentNode as unknown as PDFElement
  },
  nextSibling: (node: PDFNode): PDFNode | null => {
    const parent = node.parentNode || null
    const siblings = parent?.children || []
    const index = siblings.indexOf(node)
    // NOTE: If not found OR this is the last of the siblings ...
    if (index < 0 || index >= siblings.length - 1) {
      return null
    }

    return siblings[index + 1]
  },
  patchProp: (el, key, _1, nextValue, _2, _3) => {
    if (key === 'style') {
      el.style = nextValue
    } else {
      // @ts-expect-error
      el.props[key] = nextValue
    }
    context.execute()
    return el
  },
})
