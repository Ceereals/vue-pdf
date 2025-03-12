/* eslint-disable no-await-in-loop */

type Fn = (arg: any, ...args: any[]) => Promise<any> | any

type FirstFnParameterType<T extends Fn[]> = T extends [
  ...any,
  (arg: infer A, ...args: any[]) => Promise<any> | any,
]
  ? A
  : never

type LastFnReturnType<T extends Fn[]> = T extends [
  (arg: any, ...args: any[]) => Promise<infer R> | infer R,
  ...any[],
]
  ? R
  : never

// Extend the Promise interface to include an abort method.
interface AbortablePromise<T> extends Promise<T> {
  abort: () => void
}

/**
 * Performs right-to-left function composition with async functions support
 * and returns an abortable promise.
 *
 * @param fns - Functions to compose
 * @returns A function that, when invoked, returns an AbortablePromise
 */
const asyncCompose =
  <T extends Fn[]>(...fns: T) =>
  (
    value: FirstFnParameterType<T>,
    ...args: Parameters<T[0]> extends [any, ...infer Rest] ? Rest : []
  ): AbortablePromise<LastFnReturnType<T>> => {
    const { promise: abortPromise, reject, resolve } = Promise.withResolvers()
    // Create a promise that will never resolve normally, but can be rejected on abort.

    const abort: () => void = () => reject(new Error('Async compose aborted'))

    // Compose the functions. Each async step is raced against the abortPromise.
    const composedPromise = (async () => {
      let result = value
      const reversedFns = fns.slice().reverse()

      for (const fn of reversedFns) {
        result = await Promise.race([fn(result, ...args), abortPromise])
      }
      resolve(null)
      return result as LastFnReturnType<T>
    })() as AbortablePromise<LastFnReturnType<T>>

    // Attach the abort method to the promise.
    composedPromise.abort = abort
    return composedPromise
  }

export default asyncCompose
