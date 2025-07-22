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
  { enableProvideBridge: props.enableProvideBridge },
)

defineExpose<{ execute: ReturnType<typeof usePdf>['execute'] }>({
  execute,
  // @ts-ignore
  [rootSymbol]: root,
})
const url = computed(() => {
  if (!blobUrl.value) return ''

  const params = []

  if (props.showToolbar !== undefined) {
    params.push(`toolbar=${+props.showToolbar}`)
  }

  if (props.view) {
    params.push(`view=${props.view}`)
  }

  const hash = params.length > 0 ? `#${params.join('&')}` : ''

  return `${blobUrl.value}${hash}`
})
</script>

<template>
  <iframe :src="url" frameborder="0"></iframe>
</template>
