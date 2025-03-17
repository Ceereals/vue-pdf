import { defineComponent, h } from 'vue'
import type { Primitive } from '@react-pdf/types/primitive'
export default function <M extends Record<string, any>>(
  type: Primitive | string,
  name: string,
  propsDef?: Array<keyof M>,
) {
  return defineComponent<M>(
    (props, { slots }) => {
      return () => {
        return h(type, props, slots.default?.())
      }
    },
    { props: propsDef, name, inheritAttrs: false },
  )
}
