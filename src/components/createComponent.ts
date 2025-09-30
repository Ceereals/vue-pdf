import {
  type ComponentObjectPropsOptions,
  defineComponent,
  h,
  inject,
  onUpdated,
} from 'vue'
import type { Primitive } from '@react-pdf/types/primitive'
export default function <M extends Record<string, any>>(
  type: Primitive | string,
  name: string,
  propsDef?: ComponentObjectPropsOptions<M>,
) {
  return defineComponent<M>(
    (props, { slots }) => {
      const execute = inject<() => any>('execute', () => void 0)
      onUpdated(() => {
        execute()
      })
      return () => {
        return h(type, props, slots.default?.())
      }
    },
    { props: propsDef, name, inheritAttrs: false },
  )
}
