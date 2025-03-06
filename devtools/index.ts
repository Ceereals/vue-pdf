/* v8 ignore start */
import { PdfRoot } from '@/dom/usePdf'
import { PDFNode } from '@/renderer/nodeOps'
import { setupDevtoolsPlugin } from '@vue/devtools-api'
import { App, h, Ref, toValue, VNode } from 'vue'
const inspectorId = 'my-awesome-plugin'
const map = new Map()
export function setupDevtools(
  app: App,
  context: {
    execute: () => void
    root: Readonly<Ref<PdfRoot>>
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
            payload.rootNodes = tree
          }
        }
      })
      let prevNode = null
      api.on.getInspectorState((payload) => {
        if (payload.inspectorId === inspectorId) {
          console.log(
            'getInspectorState',
            payload,
            map,
            map.get(payload.nodeId),
          )
          if (map.get(payload.nodeId)) {
            if (prevNode && prevNode.uid !== payload.nodeId) {
              console.log(prevNode)
              map.set(prevNode.uid, prevNode)
              context.execute()
            }
            payload.state = {
              props: Object.entries(map.get(payload.nodeId).props).map(
                ([key, value]) => {
                  return {
                    key,
                    value,
                  }
                },
              ),
              style: Object.entries(map.get(payload.nodeId).style ?? {}).map(
                ([key, value]) => {
                  return {
                    key,
                    value,
                  }
                },
              ),
            }
            let currentNode = map.get(payload.nodeId)
            prevNode = toValue(map.get(payload.nodeId))
            currentNode.style = {
              ...currentNode.style,
              border: 1,
              borderColor: 'red',
            }
            context.execute()
          }
        }
      })
    },
  )
}

const createTree = (root: PdfRoot) => {
  const tree: {
    id: string
    label: string
    children: any[]
    tags: {
      label: string
      textColor: string
      backgroundColor: string
    }[]
  }[] = []
  tree.push(createNode(root.document))
  return tree
}

const createNode = (node: PDFNode) => {
  if (node.uid) {
    map.set(node.uid, node)
  }
  if (node.type === 'TEXT_INSTANCE') {
    return
  }
  const nodeData = {
    id: node.uid,
    label: '<' + firstLetterUppercase(node.type.toLowerCase()) + '>',
    tags: [],
    children:
      node.type === 'TEXT'
        ? null
        : (node.children?.map(createNode) ?? undefined),
  }
  return nodeData
}

const firstLetterUppercase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
/* v8 ignore end */
