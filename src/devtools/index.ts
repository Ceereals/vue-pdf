/* v8 ignore start */
import type { PdfRoot } from '@/render'
import { isTextInstance, type PDFNode } from '@/renderer/nodeOps'
import type { TextInstanceNode } from '@react-pdf/types'
import { setupDevtoolsPlugin } from '@vue/devtools-api'
import { type App, type Ref, toValue } from 'vue'
const inspectorId = 'my-awesome-plugin'
const map = new Map<string, Exclude<PDFNode, TextInstanceNode>>()
export function setupDevtools(
  app: App,
  context: {
    execute: () => void
    root: Readonly<Ref<PdfRoot>>
    onRender: (fn: () => void) => void
  },
) {
  map.clear()
  setupDevtoolsPlugin(
    {
      id: 'vue-pdf',
      label: 'vue-pdf',
      packageName: 'vue-pdf',
      homepage: 'https://github.com/vue-pdf-final/vue-pdf-final',
      componentStateTypes: ['vue-pdf-final'],
      enableEarlyProxy: true,
      app,
    },
    (api) => {
      context.onRender(() => {
        api.sendInspectorTree(inspectorId)
      })

      api.addInspector({
        id: inspectorId,
        label: 'VuePDF',
        noSelectionText: 'Select a component to inspect.',
        treeFilterPlaceholder: 'Searching...',
        stateFilterPlaceholder: 'Visit Components Tab first!',
        nodeActions: [
          {
            icon: 'play_circle',
            tooltip: 'Play',
            action: () => {},
          },
        ],
        actions: [
          {
            icon: 'refresh',
            tooltip: 'Play',
            action: () => {
              api.sendInspectorTree(inspectorId)
            },
          },
        ],
      })

      api.on.getInspectorTree((payload) => {
        if (payload.inspectorId === inspectorId) {
          if (context.root.value) {
            const tree = createTree(context.root.value)
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            payload.rootNodes = tree as any
          }
        }
      })
      let prevNode: PDFNode | null = null
      api.on.getInspectorState((payload) => {
        if (payload.inspectorId === inspectorId) {
          const currentNode = map.get(payload.nodeId)
          if (currentNode && !isTextInstance(currentNode)) {
            if (
              prevNode &&
              !isTextInstance(prevNode) &&
              prevNode.uid !== payload.nodeId
            ) {
              prevNode.props = {
                ...prevNode.props,
                debug: false,
              }
              map.set(prevNode.uid, prevNode)
            }
            payload.state = {
              props: Object.entries(currentNode.props ?? {}).map(
                ([key, value]) => {
                  return {
                    key,
                    value,
                  }
                },
              ),
              // @ts-expect-error
              style: Object.entries(currentNode.style ?? {}).map(
                ([key, value]) => {
                  return {
                    key,
                    value,
                  }
                },
              ),
            }
            prevNode = toValue(currentNode)
            if (!prevNode) return
            if (prevNode.type === 'DOCUMENT') return
            prevNode.props = {
              ...prevNode.props,
              debug: true,
            }
            context.execute()
          }
        }
      })
    },
  )
}

const createTree = (root: PdfRoot) => {
  const tree: NodeData[] = []
  const node = createNode(root.document as unknown as PDFNode)
  if (node) tree.push(node)
  return tree as unknown[]
}
type NodeData = {
  id: string
  label: string
  tags: {
    label: string
    textColor: string
    backgroundColor: string
  }[]
  children: NodeData[] | null
}
const createNode = (node: PDFNode) => {
  if (isTextInstance(node)) return
  if (node.uid) {
    map.set(node.uid, node)
  }
  const nodeData: NodeData = {
    id: node.uid,
    // @ts-expect-error
    label: `<${firstLetterUppercase(node.type.toLowerCase())}${node.props?.id ? ` id="${node.props.id}"` : ''}>`,
    tags: [],
    children:
      node.type === 'TEXT'
        ? null
        : node.children
          ? (node.children as Exclude<PDFNode, TextInstanceNode>[])
              .map(createNode)
              .filter((e) => e !== undefined)
          : null,
  }
  return nodeData
}

const firstLetterUppercase = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
/* v8 ignore end */
