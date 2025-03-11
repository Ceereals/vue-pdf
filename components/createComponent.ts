import { defineComponent, h } from 'vue'
import type { Primitive } from '@react-pdf/types/primitive'
export default function <M extends Record<string, unknown>>(
  type: Primitive | string,
  name: string,
  propsDef?: string[],
) {
  return defineComponent<M>(
    (props, { slots }) => {
      return () => {
        if (props.onRender && typeof props.onRender === 'function') {
          props.onRender(props)
        }
        return h(type, props, slots.default?.())
      }
    },
    { props: propsDef, name, inheritAttrs: false },
  )
}
