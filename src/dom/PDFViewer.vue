<script setup lang="ts">
import type { VNode } from 'vue'
import { computed } from 'vue'
import { usePdf } from '@/composables'
import type { PDFViewerProps } from '@/components'
import { rootSymbol } from '@/symbols'
const props = withDefaults(defineProps<PDFViewerProps>(), {
  showToolbar: true,
  enableProvideBridge: true,
})
const slots = defineSlots<{
  default: () => VNode[]
}>()

const {
  url: blobUrl,
  execute,
  root,
} = usePdf(
  () =>
    slots.default().filter((slot) => {
      return slot.type !== Symbol.for('v-cmt')
    })[0],
  { enableProvideBridge: props.enableProvideBridge }
)

defineExpose<{
  execute: ReturnType<typeof usePdf>['execute']
  [rootSymbol]: typeof root
}>({
  execute,
  [rootSymbol]: root,
})
const url = computed(() => {
  if (!blobUrl.value) return ''

  const params = new URLSearchParams()

  if (props.showToolbar !== undefined) {
    params.append('toolbar', String(+props.showToolbar))
  }
  if (props.queryParams) {
    Object.entries(props.queryParams).forEach(([key, value]) => {
      params.append(key, String(value))
    })
  }

  const queryString = params.toString()
  return `${blobUrl.value}#${queryString}`
})
</script>

<template>
  <iframe :src="url" frameborder="0"></iframe>
</template>
