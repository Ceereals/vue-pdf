import type { LinkNode, NoteNode, TspanNode } from '@react-pdf/layout'
import type {
  DocumentNode,
  Node,
  TextInstanceNode,
  TextNode,
} from '@react-pdf/types'
import type { RendererOptions } from 'vue'

export type PDFElement = {
  uid: string
  type: string
  document: PDFNode
  style?: Record<string, string>
  props?: Record<string, unknown>
  box?: Record<string, unknown>
}
export type PDFNode = (
  | Node
  | TextNode
  | LinkNode
  | TspanNode
  | NoteNode
  | TextInstanceNode
) & {
  parentNode: PDFNode | null
  uid: string
}

const isParentText = (node: PDFNode) => {
  return (
    node.type === 'TEXT' ||
    node.type === 'LINK' ||
    node.type === 'TSPAN' ||
    node.type === 'NOTE'
  )
}
export const isTextInstance = (node: PDFNode) => {
  return node.type === 'TEXT_INSTANCE'
}
const hasParentNode = (
  _: PDFNode,
): _ is (Node | TextNode | LinkNode | TspanNode | NoteNode) & {
  parentNode: Exclude<PDFNode, TextInstanceNode> | null
  uid: string
} => {
  return true
}
const appendChild = (
  parentInstance: PDFNode,
  child: PDFNode,
  anchor?: PDFNode | null,
) => {
  const isOrphanTextInstance =
    isTextInstance(child) && !isParentText(parentInstance)

  // Ignore orphan text instances.
  // Caused by cases such as <>{name && <Text>{name}</Text>}</>
  if (isOrphanTextInstance) {
    console.warn(
      `Invalid '${child.value}' string child outside <Text> component`,
    )
    return
  }
  if (!isTextInstance(parentInstance)) {
    child.parentNode = parentInstance
    if (anchor) {
      const index = parentInstance.children?.indexOf(anchor as never)
      if (index !== -1 && index !== undefined) {
        parentInstance.children?.splice(index, 0, child as never)
        return
      }
    }
    parentInstance.children?.push(child as never)
  }
}

export const nodeOps: RendererOptions<PDFNode, PDFElement | PDFNode> = {
  insert: (child, parent, anchor) => {
    // @ts-expect-error
    if (child.type === 'COMMENT') return
    if (parent.type === 'ROOT') {
      parent.document = child
    } else {
      appendChild(parent as PDFNode, child, anchor)
    }
  },

  remove: (child) => {
    if (hasParentNode(child)) {
      const index = child.parentNode?.children?.indexOf(child as never)
      if (index === undefined) return

      if (index !== -1) {
        child.parentNode?.children?.splice(index, 1)
        child.parentNode = null
      }
    }
  },
  createElement: (tag, _, __, _props): PDFElement => {
    const { style, ...props } = _props || {}
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
    return {
      type: 'TEXT_INSTANCE',
      value: text,
    } as PDFNode
  },
  createComment: (text) =>
    ({ type: 'COMMENT', value: text }) as unknown as PDFNode,

  setText: (node, text) => {
    ;(node as TextInstanceNode).value = text
  },

  setElementText: (el, text) => {
    // @ts-expect-error
    el.value = text
  },

  /* v8 ignore next */
  querySelector: () => null,
  /* v8 ignore next */
  setScopeId(_, __) {},
  parentNode(node) {
    return node.parentNode
  },
  nextSibling: (node: Exclude<PDFNode, TextInstanceNode>) => {
    const parent = node.parentNode as typeof node
    const siblings = parent?.children || []
    const index = siblings.indexOf(node as never)
    // NOTE: If not found OR this is the last of the siblings ...
    if (index < 0 || index >= siblings.length - 1) {
      return null
    }

    return siblings[index + 1] as PDFNode
  },
  patchProp: (el, key, _1, nextValue, _2, _3) => {
    if (key === 'style') {
      ;(el as Exclude<Node, DocumentNode>).style = nextValue
    } else {
      // @ts-expect-error
      el.props[key] = nextValue
    }
    return el
  },
}
