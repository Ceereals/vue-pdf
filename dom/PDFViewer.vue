<script setup lang="ts">
import type { VNode } from 'vue'
import { computed } from 'vue'
import usePdf from './usePdf'
import { PDFViewerProps } from '@/components'
import { rootSymbol } from './symbols'
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
    slots.default!().filter((slot) => {
      console.log('slot', slot.type)
      return slot.type !== Symbol.for('v-cmt')
    })[0],
  { enableProvideBridge: props.enableProvideBridge },
)

defineExpose({ execute, [rootSymbol]: root })
const url = computed(() =>
  blobUrl.value
    ? `${blobUrl?.value}${props.showToolbar ? `#toolbar=${+props.showToolbar}` : ''}`
    : '',
)
</script>

<template>
  <iframe :src="url" frameborder="0"></iframe>
</template>
