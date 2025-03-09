import { setupDevtools } from '@/devtools'
import { upperFirst } from '@react-pdf/fns'
import FontStore from '@react-pdf/font'
import _layoutDocument from '@react-pdf/layout'
import type { DocumentNode } from '@react-pdf/layout'
import { render as createRender } from '@renderer/index'
import type { PDFElement } from '@renderer/nodeOps'
import { fileStreamToBlob, makeCancellable, omitNils } from '@utils'
import {
  createEventHook,
  tryOnBeforeMount,
  until,
  useObjectUrl,
  watchImmediate,
  watchOnce,
} from '@vueuse/core'
import {
  type App,
  type Component,
  type MaybeRefOrGetter,
  type Ref,
  type VNode,
  defineComponent,
  getCurrentInstance,
  h,
  hasInjectionContext,
  isVNode,
  provide,
  readonly,
  ref,
  shallowRef,
  toValue,
  watch,
} from 'vue'
// @ts-expect-error
import PDFDocument from '@react-pdf/pdfkit'
import renderPDF from '@react-pdf/render'
import defu from 'defu'
import queue from 'queue'
const layoutDocument = makeCancellable(_layoutDocument)
type UsePdfConfig = {
  /**
   * If true, the pdf will be rendered immediately
   * @default true
   */
  immediate?: boolean
  /**
   * if true, the Pdf components can inject the application provided values
   */
  enableProvideBridge?: boolean

  /**
   *
   * Will run immediately after the pdf is rendered
   */
  onError?: (error: Error) => Promise<Error | void> | Error | void
}
type Context = Parameters<typeof renderPDF>[0]
export const pdfRender = makeCancellable(
  async (root: PdfRoot, compress = true) => {
    const fontStore = new FontStore()
    /* v8 ignore next */
    const props = root.document?.props || {}
    const {
      pdfVersion,
      language,
      pageLayout,
      pageMode,
      title,
      author,
      subject,
      keywords,
      creator = 'vue-pdf',
      producer = 'vue-pdf',
      creationDate = new Date(),
      modificationDate,
    } = props
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
    }) as Context
    if (pageLayout) {
      ctx._root.data.PageLayout = upperFirst(pageLayout)
    }

    if (pageMode) {
      ctx._root.data.PageMode = upperFirst(pageMode)
    }
    console.log('calling layout', root.document)
    // @ts-expect-error
    const layout = await layoutDocument(root.document, ctx, fontStore)
    console.log('layout', layout)
    const stream = renderPDF(layout, ctx)
    return fileStreamToBlob(stream)
  },
)
export interface PdfRoot {
  type: 'ROOT'
  document: DocumentNode | null
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
  execute: (throwOnFailed?: boolean) => Promise<any>
}

export function usePdf(
  doc: MaybeRefOrGetter<Component | VNode>,
): UsePdfReturn & PromiseLike<UsePdfReturn>
export function usePdf(
  doc: MaybeRefOrGetter<Component | VNode>,
  options: UsePdfConfig,
): UsePdfReturn & PromiseLike<UsePdfReturn>
// biome-ignore lint/suspicious/noRedeclare: <explanation>
export default function usePdf(
  doc: MaybeRefOrGetter<Component | VNode>,
  config?: UsePdfConfig,
): UsePdfReturn & PromiseLike<UsePdfReturn> {
  const root = shallowRef<PdfRoot>({
    type: 'ROOT',
    document: null,
  })
  const instance = getCurrentInstance()
  const renderQueue = new queue({ autostart: true, concurrency: 1 })
  const options: UsePdfConfig = defu(config, {
    worker: false,
    immediate: true,
    enableProvideBridge: !!instance,
  })
  const renderHook = createEventHook()
  const isMounted = ref(false)
  const isMounting = ref(false)
  const blob = shallowRef<Blob | null>(null)
  const isLoading = ref(!!options.immediate)
  const isFinished = ref(!options.immediate)
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

        function mergeProvides(currentInstance: any) {
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

  renderQueue.addEventListener('error', ({ detail: { error: err } }) => {
    console.log('Error', err)
    blob.value = null
    if (options.onError) {
      const userError = options.onError(err)
      if (
        typeof (userError as Promise<Error | undefined>).then === 'function'
      ) {
        userError.then(() => {
          error.value = err
          loading(false)
          reject(err)
        })
        return
      }
      error.value = userError as Error
      loading(false)
      reject(userError as Error)
    } else {
      error.value = err
      loading(false)
      reject(err)
    }
  })

  renderQueue.addEventListener('success', ({ detail: { result } }) => {
    blob.value = result[0]
    loading(false)
    resolve(shell)
  })

  const execute = () => {
    // Promise.withResolvers
    // if (!isMounted.value && !isMounting.value) {
    //   mountCustomRenderer()
    //   return execute()
    // }
    // if (isMounting.value) {
    //   return promise
    // }
    loading(true)
    if (root.value.document) {
      const renderPromise = pdfRender(root.value)
      renderPromise
        .then((result) => {
          console.log(result)
          blob.value = result
          loading(false)
          resolve(shell)
        })
        .catch((err) => {
          if (err.name === 'CancelError') {
            console.log('Cancelled', blob.value)
          }
          console.log(err)
          blob.value = null
          if (options.onError) {
            const userError = options.onError(err)
            // If the onError callback returns a promise, wait for it.
            if (userError && typeof userError.then === 'function') {
              return userError.then(() => {
                error.value = err
                loading(false)
                reject(err)
              })
            }
            error.value = userError as Error
          } else {
            error.value = err
          }
          loading(false)
          reject(err)
        })
    } else {
      loading(false)
    }
    return promise
  }
  const mountCustomRenderer = () => {
    isMounting.value = true
    createRender(h(createInternalComponent()), root.value as PDFElement, {
      execute,
    })
    isMounted.value = true
    isMounting.value = false
  }
  const shell: UsePdfReturn = {
    isLoading: readonly(isLoading),
    isFinished: readonly(isFinished),
    error: readonly(error),
    blob: readonly(blob),
    url,
    execute,
    root: readonly(root) as UsePdfReturn['root'],
  }
  const { promise, resolve, reject } = Promise.withResolvers() as {
    promise: Promise<UsePdfReturn>
    resolve: (value: UsePdfReturn) => void
    reject: (error: Error) => void
  }

  tryOnBeforeMount(() => {
    if (options.immediate) {
      mountCustomRenderer()
    }
  })

  if (import.meta.hot) {
  }
  return {
    ...shell,
    then: promise.then.bind(promise),
  }
}
