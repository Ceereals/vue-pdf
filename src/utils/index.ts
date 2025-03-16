import type { pdfRender } from '@/render'

export function fileStreamToBlob(
  fileStream: Awaited<ReturnType<typeof pdfRender>>,
): Promise<Blob> {
  const { promise, resolve, reject } = Promise.withResolvers<Blob>()
  const chunks: Uint8Array[] = []
  fileStream.on('data', (chunk: Uint8Array) => {
    chunks.push(chunk)
  })
  fileStream.on('end', () => {
    try {
      resolve(new Blob(chunks, { type: 'application/pdf' }))
      /* v8 ignore next 3 */
    } catch (error) {
      reject(error)
    }
  })
  fileStream.on('error', (error) => {
    reject(error)
  })
  return promise
}
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function removeCircular(obj: any) {
  const seen = new Map()
  obj._vnode = undefined
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const recurse = (obj: any) => {
    seen.set(obj, true)
    /* v8 ignore next */
    if (!obj) return
    for (const [k, v] of Object.entries(obj)) {
      if (typeof v !== 'object') continue
      /* v8 ignore next */
      if (seen.has(v)) delete obj[k]
      else recurse(v)
    }
  }
  recurse(obj)
}
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function cleanObjectForSeralization(obj: any, recursive = false) {
  !recursive && removeCircular(obj)
  for (const key in obj) {
    /* v8 ignore next 16 */
    if (key === 'props') {
      for (const key2 in obj[key]) {
        if (key2 === 'render') {
          delete obj[key][key2]
        }
      }
    }
    if (key === 'children') {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      obj[key] = obj[key].map((child: any) =>
        cleanObjectForSeralization(child, true),
      )
    }
    if (key === 'document') {
      obj[key] = cleanObjectForSeralization(obj[key], true)
    }
  }
  return obj
}
export const omitNils = (object: object) =>
  Object.fromEntries(
    Object.entries(object).filter(([, value]) => value !== undefined),
  )
