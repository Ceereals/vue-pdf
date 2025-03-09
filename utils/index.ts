import { isReactive, reactive, toRefs } from 'vue'
export function mergeReactive(target: any, source: any) {
  const _target = isReactive(target) ? toRefs(target) : target
  const _source = isReactive(source) ? toRefs(source) : source
  return reactive({
    ..._target,
    ..._source,
  })
}

export function fileStreamToBlob(fileStream: any): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = []
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
    fileStream.on('error', (error: any) => {
      reject(error)
    })
  })
}
function removeCircular(obj: any) {
  const seen = new Map()
  delete obj['_vnode']
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
export const omitNils = (object: any) =>
  Object.fromEntries(
    Object.entries(object).filter(([, value]) => value !== undefined),
  )
class CancelError extends Error {
  constructor(message = 'Cancelled') {
    super(message)
    this.name = 'CancelError'
  }
}
export function makeCancellable<T extends (...args: any[]) => Promise<any>>(
  fn: T,
) {
  // Keep track of the current active call's controllers (promise and its resolvers)
  let current: {
    promise: Promise<T>
    resolve: (value: T) => void
    reject: (error: Error) => void
  } | null = null

  return function cancellableWrapper(...args: Parameters<T>): ReturnType<T> {
    // If a previous call is still pending, cancel it by rejecting its promise
    if (current) {
      console.log('canceling')
      current.reject(new CancelError()) // Immediately abort previous execution
    }

    // Create a new promise with manual resolvers using Promise.withResolvers
    const { promise, resolve, reject } = Promise.withResolvers()
    current = { promise, resolve, reject } // mark this as the active execution

    // Start the original async function in the background
    ;(async () => {
      try {
        const result = await fn(...args) // execute the original function
        if (current.promise === promise) {
          // if still the latest call (not cancelled by a newer one)
          resolve(result) // resolve with the result
          current = null // clear current (no active task)
        }
      } catch (err) {
        if (current?.promise === promise) {
          // if this is still the active call
          reject(err) // propagate the error
          current = null
        }
      }
      // If this call was superseded by a newer call, its result/error is ignored.
    })()

    return promise // return the cancellable promise
  }
}
