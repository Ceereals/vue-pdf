<script setup lang="ts">
import { PDFViewer } from '@/dom'
import TestDocument from './TestDocument.vue'
import { provide, toRef, useTemplateRef } from 'vue'
import { rootSymbol } from '@/symbols'
import type { PdfRoot } from '@/render'
const props = withDefaults(
  defineProps<{
    bridge: boolean
    text?: string
  }>(),
  {
    bridge: false,
  }
)
provide(
  'bridge',
  toRef(() => props.bridge)
)
const pdfViewer = useTemplateRef('pdfViewer')

defineExpose<{ root: () => PdfRoot }>({
  root: () => pdfViewer.value![rootSymbol],
})
</script>
<template>
  <PDFViewer ref="pdfViewer" enableProvideBridge :queryParams="{ toolbar: 1 }">
    <TestDocument :text="text"></TestDocument>
  </PDFViewer>
</template>
