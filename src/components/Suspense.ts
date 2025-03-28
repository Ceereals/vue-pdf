import { defineComponent, h, inject, mergeProps, Suspense } from 'vue'
import type { SuspenseProps } from 'vue'

export default defineComponent<SuspenseProps>({
  name: 'PDFSuspense',
  setup(props, { slots }) {
    const execute = inject<() => any>('execute', () => void 0)
    function onFallback() {
      props.onFallback?.()
      execute()
    }
    function onResolve() {
      props.onResolve?.()
      execute()
    }
    return () => {
      return h(Suspense, mergeProps(props, { onFallback, onResolve }), {
        default: () => slots.default?.(),
        fallback: () => slots.fallback?.(),
      })
    }
  },
})
