<script setup lang="ts">
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import { Document, Page, Text } from '@/components'
import { ref } from 'vue'
const props = withDefaults(
  defineProps<{
    text?: string
  }>(),
  {
    text: 'testo',
  }
)
const { promise, resolve } = Promise.withResolvers<string>()
setTimeout(() => resolve(props.text), 500)
const awaitedText = ref(await promise)
</script>
<template>
  <Document>
    <Page>
      <Text>{{ awaitedText }}</Text>
    </Page>
  </Document>
</template>
