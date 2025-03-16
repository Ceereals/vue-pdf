<script setup lang="ts">
import type { VNode } from 'vue'
import { computed } from 'vue'
import { usePdf } from '@/src/composables'
import type { PDFViewerProps } from '@/src/components'
import { rootSymbol } from '@/src/symbols'
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
  { enableProvideBridge: props.enableProvideBridge },
)

defineExpose<{ execute: ReturnType<typeof usePdf>['execute'] }>({
  execute,
  // @ts-ignore
  [rootSymbol]: root,
})
const url = computed(() =>
  blobUrl.value
    ? `${blobUrl?.value}${
        props.showToolbar ? `#toolbar=${+props.showToolbar}` : ''
      }`
    : '',
)
</script>

<template>
  <iframe :src="url" frameborder="0"></iframe>
</template>
