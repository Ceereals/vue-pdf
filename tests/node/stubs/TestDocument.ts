import { defineComponent, h } from "vue";
import { Document, Page, Text } from '@/node'

export default defineComponent((props: { text: 'test'}) => {
    return () => (
    h(Document, { onRender: () => {}}, [
        h(Page, { id: '1'}, [
            h(Text, {}, props.text)
        ])
    ])
    )
})