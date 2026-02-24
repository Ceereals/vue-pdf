import PDFViewer from './PDFViewer.vue'
import PDFDownloadLink from './PDFDownloadLink.vue'
import PDFPrint from './PDFPrint.vue'
export { usePdf } from '@/composables'
export { fontStore } from '@/render'
export type { Style } from '@react-pdf/types'

export * from '@/components'
import type {
  renderToBufferType,
  renderToStreamType,
  renderToFileType,
} from '@/node'
const renderToFile: renderToFileType = () => {
  throw new Error('renderToFile is not available in the browser')
}
const renderToBuffer: renderToBufferType = () => {
  throw new Error('renderToBuffer is not available in the browser')
}
const renderToStream: renderToStreamType = () => {
  throw new Error('renderToStream is not available in the browser')
}
export { renderToBuffer, renderToStream, renderToFile }
export { PDFViewer, PDFDownloadLink, PDFPrint }
