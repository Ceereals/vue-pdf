import { defineComponent, h } from 'vue'
import { Primitive } from '@react-pdf/types/primitive'
export default function <M extends Record<string, any>>(
  type: Primitive | string,
  name: string,
  propsDef: Record<string, any>,
) {
  return defineComponent<M>(
    (props, { slots }) => {
      return () => {
        if (props.onRender && typeof props.onRender === 'function') {
          props.onRender(props)
        }
        return h(type, props, slots.default && slots.default())
      }
    },
    { props: propsDef as M, name, inheritAttrs: false },
  )
}
