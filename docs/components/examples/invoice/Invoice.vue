<script setup lang="ts">
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import SimplePDFViewer from '../../SimplePDFViewer.vue'
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import InvoiceTemplate from './InvoiceTemplate.vue'
</script>

<template>
  <SimplePDFViewer :max="2">
    <InvoiceTemplate />
  </SimplePDFViewer>
</template>
