import { type Component, h, isVNode, type VNode } from 'vue'

export * from '@/components'
export * from '@/renderer'
import { usePdf } from '@/composables'
import { pdfRender, type PdfRoot } from '@/render'
import { render } from '@/renderer'
import type { PDFElement } from '@/renderer/nodeOps'
import fs from 'node:fs'
import type { Readable } from 'node:stream'
export { usePdf }
export const PDFViewer = () => {
  throw new Error('PDFViewer is not available in the browser')
}
export const PDFDownloadLink = () => {
  throw new Error('PDFDownloadLink is not available in the browser')
}
// #region renderToStream
type renderToStream = (
  document: Component | VNode,
  options?: Parameters<typeof pdfRender>[1],
) => Promise<Readable>
// #endregion renderToStream
export const renderToStream: renderToStream = (document, options) => {
  const root = {
    type: 'ROOT',
    document: null,
  } as unknown as PDFElement
  let documentVnode = document
  if (!isVNode(document)) {
    documentVnode = h(document)
  }

  render(documentVnode as VNode, root)

  return pdfRender(root as unknown as PdfRoot, options)
}

// #region renderToBuffer
type renderToBuffer = (
  document: Component | VNode,
  options?: Parameters<typeof pdfRender>[1],
) => Promise<Buffer<ArrayBuffer>>
// #endregion renderToBuffer`
export const renderToBuffer: renderToBuffer = (
  document,
  options,
) => {
  return renderToStream(document, options).then((stream) => {
    const chunks: Uint8Array[] = []
    return new Promise<Buffer<ArrayBuffer>>((resolve, reject) => {
      stream.on('data', (chunk) => {
        chunks.push(chunk)
      })
      stream.on('end', () => {
        resolve(Buffer.concat(chunks))
      })
      stream.on('error', reject)
    })
  })
}

// #region renderToFile
type renderToFile = (
  document: Component | VNode,
  filePath: string,
  options?: Parameters<typeof pdfRender>[1],
) => Promise<Readable>
// #endregion renderToFile
export const renderToFile = async (
  document: Component | VNode,
  filePath: string,
  options?: Parameters<typeof pdfRender>[1],
) => {
  const output = await renderToStream(document, options)
  const writeStream = fs.createWriteStream(filePath)
  output.pipe(writeStream)

  return new Promise<Readable>((resolve, reject) => {
    writeStream.on('finish', () => resolve(output))
    writeStream.on('error', reject)
  })
}
