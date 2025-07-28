import FontStore from '@react-pdf/font'
import layoutDocument from '@react-pdf/layout'
import renderPDF from '@react-pdf/render'
// @ts-expect-error
import PDFDocument from '@react-pdf/pdfkit'
import { omitNils, upperFirst } from '@utils'
import type { DocumentNode as _DocumentNode } from '@react-pdf/types'
import type { PDFNode } from '@/renderer/nodeOps'
import type { Readable } from 'node:stream'
export interface DocumentNode
  extends Omit<_DocumentNode, 'props' | 'children'> {
  uid: string
  props?: _DocumentNode['props'] & {
    pdfVersion: string
    language: string
  }
  children?: PDFNode[]
}
export interface PdfRoot {
  type: 'ROOT'
  document: DocumentNode
}

export const fontStore = new FontStore()
export const pdfRender = (
  root: PdfRoot,
  { compress, signal }: Partial<{ compress: boolean; signal?: AbortSignal }> = {
    compress: true,
  },
): Promise<Readable> => {
  const { promise, resolve, reject } = Promise.withResolvers<Readable>()
  const {
    pdfVersion = '1.3',
    language = 'en',
    pageLayout = 'singlePage',
    pageMode = 'useNone',
    title,
    author,
    subject,
    keywords,
    creator = 'vue-pdf',
    producer = 'vue-pdf',
    creationDate = new Date(),
    modificationDate,
    /* v8 ignore next */
  } = root.document.props ?? {}

  const ctx = new PDFDocument({
    compress,
    pdfVersion,
    lang: language,
    displayTitle: true,
    autoFirstPage: false,
    info: omitNils({
      Title: title,
      Author: author,
      Subject: subject,
      Keywords: keywords,
      Creator: creator,
      Producer: producer,
      CreationDate: creationDate,
      ModificationDate: modificationDate,
    }),
  })
  if (pageLayout) {
    ctx._root.data.PageLayout = upperFirst(pageLayout)
  }

  if (pageMode) {
    ctx._root.data.PageMode = upperFirst(pageMode)
  }
  // @ts-expect-error
  const layoutPromise = layoutDocument(root.document, fontStore)
  signal?.addEventListener('abort', () => {
    // @ts-expect-error`
    if (typeof layoutPromise.abort !== 'function') {
      /* v8 ignore next 2 */
      return
    }
    // @ts-expect-error
    layoutPromise.abort()
    reject(new Error('Cancelled'))
  })
  layoutPromise
    .then((layout) => renderPDF(ctx, layout))
    .then(resolve)
    .catch(reject)
  return promise
}
