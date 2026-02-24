<script setup lang="ts">
import { usePdf } from '@/composables'
import type { PDFPrintEvents, PDFPrintProps, PDFPrintSlots } from '@/components'

const props = withDefaults(defineProps<PDFPrintProps>(), {
  label: 'Print',
})
const emits = defineEmits<PDFPrintEvents>()
const slots = defineSlots<PDFPrintSlots>()
if (!slots.default) {
  throw new Error('PDFPrint requires a default slot')
}

const { url, blob, isLoading } = usePdf(
  () =>
    slots.default().filter((slot) => {
      return slot.type !== Symbol.for('v-cmt')
    })[0] ??
    (() => {
      throw new Error('PDFPrint requires a default slot')
    })(),
)
const onClick = (event: MouseEvent) => {
  if (!url.value) {
    return
  }
  event.preventDefault()
  const printWindow = window.open(url.value, '_blank')
  printWindow?.addEventListener(
    'load',
    () => {
      printWindow.focus()
      printWindow.print()
    },
    { once: true },
  )
  emits('click', event)
}
defineExpose({ blob, isLoading, url })
</script>
<template>
  <a v-if="url" :href="url" @click="onClick">
    <slot name="label" :blob="blob">
      {{ props.label }}
    </slot>
  </a>
</template>
