import { setupDevtools } from '@/devtools'
import { type PdfRoot, pdfRender } from '@/render'
import { render } from '@/renderer'
import type { PDFElement } from '@renderer/nodeOps'
import {
  createEventHook,
  tryOnBeforeMount,
  tryOnBeforeUnmount,
  useObjectUrl,
} from '@vueuse/core'
import defu from 'defu'
import {
  type App,
  type Component,
  type ComponentInternalInstance,
  type MaybeRefOrGetter,
  type Ref,
  type VNode,
  defineComponent,
  getCurrentInstance,
  h,
  isVNode,
  onMounted,
  onUpdated,
  provide,
  readonly,
  ref,
  shallowRef,
  toValue,
} from 'vue'

type UsePdfConfig = {
  /**
   * If true, the pdf will be rendered immediately and updated
   * @default true
   */
  reactive?: boolean
  /**
   * if true, the Pdf components can inject the application provided values
   */
  enableProvideBridge?: boolean

  /**
   *
   * Will run immediately after the pdf is rendered
   */
  onError?: (error: Error) => Promise<Error | undefined> | Error | undefined
}

export interface UsePdfReturn {
  isLoading: Readonly<Ref<boolean>>
  isFinished: Readonly<Ref<boolean>>
  blob: Readonly<Ref<Blob | null>>
  url: ReturnType<typeof useObjectUrl>
  error: Readonly<Ref<Error | null>>
  root: Readonly<Ref<PdfRoot>>
  /**
   * Manually call the render function
   * @param throwOnFailed false
   */
  execute: (throwOnFailed?: boolean) => Promise<void>

  /**
   * Unmount the current pdf
   */
  unmount: () => void
}

export function usePdf(
  doc: MaybeRefOrGetter<Component | VNode>
): UsePdfReturn & PromiseLike<UsePdfReturn>
export function usePdf(
  doc: MaybeRefOrGetter<Component | VNode>,
  options: UsePdfConfig
): UsePdfReturn & PromiseLike<UsePdfReturn>
export function usePdf(
  doc: MaybeRefOrGetter<Component | VNode>,
  config?: UsePdfConfig
): UsePdfReturn & PromiseLike<UsePdfReturn> {
  const root = shallowRef<PdfRoot>({
    type: 'ROOT',
    document: {} as PdfRoot['document'],
  })
  const instance = getCurrentInstance()
  const options: UsePdfConfig = defu(config, {
    worker: false,
    reactive: true,
    enableProvideBridge: !!instance,
  })
  const renderHook = createEventHook()
  const isMounted = ref(false)
  const blob = shallowRef<Blob | null>(null)
  const isLoading = ref(!!options.reactive)
  const isFinished = ref(!options.reactive)
  const error = ref<Error | null>(null)
  const url = useObjectUrl(blob)
  const loading = (loading: boolean) => {
    isLoading.value = loading
    isFinished.value = !loading
  }

  const createInternalComponent = () =>
    defineComponent({
      setup() {
        const ctx = getCurrentInstance()?.appContext

        if (ctx && instance) {
          ctx.app = instance?.appContext.app as App
        }

        const provides = {}

        // Helper function to recursively merge provides from parents

        function mergeProvides(
          currentInstance?: ComponentInternalInstance & {
            provides?: Record<string, unknown>
          }
        ) {
          /* v8 ignore next 3 */
          if (!currentInstance) {
            return
          }

          // Recursively process the parent instance

          if (currentInstance.parent) {
            mergeProvides(currentInstance.parent)
          }

          // Extract provides from the current instance and merge them

          if (currentInstance.provides) {
            Object.assign(provides, currentInstance.provides)
          }
        }

        if (instance?.parent && options.enableProvideBridge) {
          // Start the recursion from the initial instance

          mergeProvides(instance.parent)

          for (const [key, value] of Object.entries(provides)) {
            provide(key, value)
          }
        }
        onMounted(() => {
          isMounted.value = true
          if (options.reactive) execute()
        })
        onUpdated(() => {
          if (options.reactive) execute()
        })
        if (typeof window !== 'undefined') {
          // @ts-expect-error
          setupDevtools(instance?.appContext.app, {
            execute,
            root: root,
            onRender: renderHook.on,
          })
        }
        return () => {
          return getDoc()
        }
      },
    })

  const getDoc = () => {
    const _doc = toValue(doc)
    return isVNode(_doc) ? _doc : h(_doc)
  }

  let abortController = new AbortController()

  const execute = async (throwOnFailed = false) => {
    if (!options.reactive) {
      mount()
    }
    abortController.abort()
    abortController = new AbortController()
    if (isMounted.value) {
      loading(true)
      try {
        const result = await pdfRender(root.value, {
          signal: abortController.signal,
          compress: true,
        })
        blob.value = result
        loading(false)
        resolve(shell)
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      } catch (err: any) {
        if (err.message === 'Cancelled') {
          if (options.onError) {
            error.value = (await options.onError(err)) ?? err
          }
          if (throwOnFailed) throw error.value
          // We don't reject cause the execution was cancelled by another call
          return
        }
        blob.value = null
        error.value = err
        if (options.onError) {
          const userError = await options.onError(err)
          // If the onError callback returns a promise, wait for it.
          if (userError) {
            error.value = userError as Error
          }
        }
        loading(false)
        if (throwOnFailed) throw error.value
        reject(error.value as Error)
        // if canceled is another execute that is called
        return
      }
    }
  }
  const mount = () => {
    render(h(createInternalComponent()), root.value as unknown as PDFElement)
  }
  const unmount = () => {
    render(null, root.value as unknown as PDFElement)
  }
  const shell: UsePdfReturn = {
    isLoading: readonly(isLoading),
    isFinished: readonly(isFinished),
    error: readonly(error),
    blob: readonly(blob),
    url,
    execute,
    unmount,
    root: readonly(root) as UsePdfReturn['root'],
  }
  const { promise, resolve, reject } = Promise.withResolvers() as {
    promise: Promise<UsePdfReturn>
    resolve: (value: UsePdfReturn) => void
    reject: (error: Error) => void
  }

  tryOnBeforeMount(() => {
    if (options.reactive) mount()
    if (!options.reactive) {
      resolve(shell)
    }
  })
  tryOnBeforeUnmount(() => {
    unmount()
  })

  return {
    ...shell,
    then(onFullfilled, onRejected) {
      return promise.then(onFullfilled, onRejected)
    },
  }
}
