<script setup lang="ts">
import type { VNode } from 'vue'
import { usePdf } from '@/composables'
const props = withDefaults(
  defineProps<{
    fileName: string
  }>(),
  {
    fileName: 'document.pdf',
  },
)
const emits = defineEmits<{
  click: [event: MouseEvent]
}>()
const slots = defineSlots<{
  default: () => VNode[]
  label: () => VNode[]
}>()
if (!slots.default) {
  throw new Error('PDFDownloadLink requires a default slot')
}
const { url, blob, isLoading } = usePdf(
  () =>
    slots.default().filter((slot) => {
      return slot.type !== Symbol.for('v-cmt')
    })[0] ??
    (() => {
      throw new Error('PDFDownloadLink requires a default slot')
    })(),
)
const handleDownloadIE = () => {
  /* v8 ignore next 6 */
  // @ts-expect-error
  if (window.navigator.msSaveBlob) {
    // IE 10+
    // @ts-expect-error
    window.navigator.msSaveBlob(blob.value, props.fileName)
  }
}
const onClick = (event: MouseEvent) => {
  handleDownloadIE()
  emits('click', event)
}
defineExpose({ blob, isLoading, url })
</script>
<template>
  <a v-if="url" :href="url" :download="fileName" @click="onClick">
    <slot name="label" :blob="blob"></slot>
  </a>
</template>
