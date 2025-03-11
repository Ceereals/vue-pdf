import type renderPDF from '@react-pdf/render'

export function fileStreamToBlob(
  fileStream: ReturnType<typeof renderPDF>,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = []
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    fileStream.on('data', (chunk: any) => {
      /* v8 ignore next */
      chunks.push(chunk instanceof Uint8Array ? chunk : new Uint8Array(chunk))
    })

    fileStream.on('end', () => {
      try {
        resolve(new Blob(chunks, { type: 'application/pdf' }))
        /* v8 ignore next 3 */
      } catch (error) {
        reject(error)
      }
    })
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    fileStream.on('error', (error: any) => {
      reject(error)
    })
  })
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
