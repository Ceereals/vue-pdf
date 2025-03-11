<script setup lang="ts">
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import { Document, Page, Text } from '@/components'
import { inject } from 'vue'
withDefaults(
  defineProps<{
    text?: string
  }>(),
  {
    text: 'testo',
  },
)
const bridge = inject('bridge', false)
</script>
<template>
  <Document :onRender="() => {}">
    <Page id="1">
      <Text>{{ text }}</Text>
    </Page>
    <Page id="2" v-if="bridge">
      <Text>{{ bridge }}</Text>
    </Page>
  </Document>
</template>
