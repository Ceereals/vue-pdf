<script setup lang="ts">
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
  <Document>
    <Page>
      <Text>{{ text }}</Text>
    </Page>
    <Page v-if="bridge">
      <Text>{{ bridge }}</Text>
    </Page>
  </Document>
</template>
