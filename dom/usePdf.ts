import { setupDevtools } from '@/devtools'
import { upperFirst } from '@react-pdf/fns'
import FontStore from '@react-pdf/font'
import layoutDocument, { DocumentNode } from '@react-pdf/layout'
import { render } from '@renderer/index'
import type { PDFElement } from '@renderer/nodeOps'
import { fileStreamToBlob, omitNils } from '@utils'
import { tryOnBeforeMount, until, useObjectUrl } from '@vueuse/core'
import {
  type App,
  type Component,
  type MaybeRefOrGetter,
  type Ref,
  type VNode,
  defineComponent,
  getCurrentInstance,
  h,
  isVNode,
  onMounted,
  onUpdated,
  isProxy,
  readonly,
  ref,
  shallowRef,
  toValue,
  provide,
  inject,
  isReactive,
  isRef,
  watch,
} from 'vue'
const fontStore = new FontStore()
// @ts-expect-error
import PDFDocument from '@react-pdf/pdfkit'
import renderPDF from '@react-pdf/render'
import defu from 'defu'
import queue from 'queue'
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
export const pdfRender = async (root: PdfRoot, compress = true) => {
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
  // @ts-expect-error
  const layout = await layoutDocument(root.document, fontStore)
  const fileStream = renderPDF(ctx, layout)
  return fileStreamToBlob(fileStream)
}
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
export default function usePdf(
  doc: MaybeRefOrGetter<Component | VNode>,
  config?: UsePdfConfig,
): UsePdfReturn & PromiseLike<UsePdfReturn> {
  const root = shallowRef<PdfRoot>({
    type: 'ROOT',
    document: null,
  })
  const renderQueue = new queue({ autostart: true, concurrency: 1 })
  const options: UsePdfConfig = defu(config, {
    worker: false,
    immediate: true,
    enableProvideBridge: true,
  })

  const blob = shallowRef<Blob | null>(null)
  const isLoading = ref(!!options.immediate)
  const isFinished = ref(!options.immediate)
  const error = ref<Error | null>(null)
  const url = useObjectUrl(blob)
  const loading = (loading: boolean) => {
    isLoading.value = loading
    isFinished.value = !loading
  }
  const instance = getCurrentInstance()
  const provides: Map<string | symbol, Parameters<typeof provide>[1]> =
    new Map()

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
      Reflect.ownKeys(currentInstance.provides).forEach((key) => {
        provides.set(key, inject(key))
      })
    }
  }
  if (options.enableProvideBridge) {
    mergeProvides(instance)
  }
  const createInternalComponent = () =>
    defineComponent({
      setup() {
        // Start the recursion from the initial instance
        if (instance && options.enableProvideBridge) {
          for (let [key, value] of provides) {
            provide(key, value)
            watch(value as any, () => {
              execute()
            })
          }
        }

        onMounted(() => {
          if (options.immediate) {
            execute()
          }
        })
        onUpdated(() => {
          execute()
        })
        if (typeof window !== 'undefined') {
          // @ts-expect-error
          setupDevtools(instance?.appContext.app, { execute, root: root })
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
    blob.value = null
    if (options.onError) {
      let _err = Promise.resolve(options.onError(err))
      _err
        .then((e) => {
          if (e) error.value = e
        })
        .finally(() => loading(false))
      return
    }
    error.value = err
    loading(false)
  })
  renderQueue.addEventListener('success', ({ detail: { result } }) => {
    blob.value = result[0]
    loading(false)
  })
  const execute = async (throwOnFailed = false) => {
    loading(true)
    if (root.value.document) {
      renderQueue.splice(0, renderQueue.length, async () => {
        return await pdfRender(root.value)
      })
    }
    await waitUntilFinished()
    if (throwOnFailed && error.value) {
      throw error.value
    }
  }
  const mountCustomRenderer = () => {
    render(h(createInternalComponent()), root.value as PDFElement)
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
  async function waitUntilFinished() {
    await until(isFinished).toBe(true)
    return shell
  }

  tryOnBeforeMount(() => {
    mountCustomRenderer()
  })

  if (import.meta.hot) {
    console.log('hot')
  }
  return {
    ...shell,
    then(onFullfilled, onRejected) {
      return waitUntilFinished().then(onFullfilled).catch(onRejected)
    },
  }
}
