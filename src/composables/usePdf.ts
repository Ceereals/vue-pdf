// oxlint-disable no-thenable
import { type PdfRoot, pdfRender } from '@/render'
import { render } from '@/renderer'
import { fileStreamToBlob } from '@/utils'
import type { PDFElement } from '@/renderer/nodeOps'
import {
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
  type ShallowRef,
  type VNode,
  defineComponent,
  getCurrentInstance,
  h,
  isVNode,
  onMounted,
  provide,
  readonly,
  ref,
  shallowRef,
  toValue,
} from 'vue'

// #region usePdf
interface UsePdfConfig {
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

interface UsePdfReturn {
  isLoading: Readonly<Ref<boolean>>
  isFinished: Readonly<Ref<boolean>>
  blob: Readonly<Ref<Blob | null>>
  url: Readonly<Ref<string | undefined>>
  error: Readonly<Ref<Error | null>>
  root: Readonly<ShallowRef<PdfRoot, PdfRoot>>
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
  // #endregion usePdf
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
  let settled = false
  const settleOk = () => {
    if (!settled) {
      settled = true
      readyOk()
    }
  }
  const settleErr = (err: Error) => {
    if (!settled) {
      settled = true
      readyErr(err)
    }
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
        provide('execute', () => {
          if (options.reactive) execute()
        })
        onMounted(() => {
          isMounted.value = true
          if (options.reactive) execute()
        })
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
    // Given the possibility that Suspense is used on the root node
    // we need to check if there is a document to render
    // otherwise we skip the render
    if (isMounted.value && 'type' in root.value.document) {
      loading(true)
      try {
        const result = await pdfRender(root.value, {
          signal: abortController.signal,
          compress: true,
        })
        const blobResult = await fileStreamToBlob(result)
        blob.value = blobResult
        loading(false)
        settleOk()
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
        settleErr(error.value as Error)
        if (throwOnFailed) throw error.value
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
  const {
    promise: ready,
    resolve: readyOk,
    reject: readyErr,
  } = Promise.withResolvers<void>()

  tryOnBeforeMount(() => {
    if (options.reactive) mount()
    if (!options.reactive) {
      settleOk()
    }
  })
  tryOnBeforeUnmount(() => {
    abortController.abort()
    unmount()
  })
  return {
    ...shell,
    then: (onFulfilled: any, onRejected?: any) =>
      ready.then(() => onFulfilled(shell), onRejected),
  }
}
