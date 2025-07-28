import { defineComponent, h, inject, mergeProps, Suspense } from 'vue'
import type { SuspenseProps } from 'vue'

export default defineComponent<SuspenseProps>({
  name: 'PDFSuspense',
  emits: ['pending', 'resolve', 'fallback'],
  setup(props, { slots, emit }) {
    const execute = inject<() => any>('execute', () => void 0)
    function onPending() {
      emit('pending')
    }
    function onFallback() {
      emit('fallback')
      execute()
    }
    function onResolve() {
      emit('resolve')
      execute()
    }
    return () => {
      return h(
        Suspense,
        mergeProps(props, { onPending, onFallback, onResolve }),
        {
          default: () => slots.default?.(),
          fallback: () => slots.fallback?.(),
        }
      )
    }
  },
})
