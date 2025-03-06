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
const bridge = inject('bridge')
</script>
<template>
  <Document>
    <Page id="1"><Text>{{ text }}</Text></Page>
    <Page id="2" v-if="bridge"
      ><Text>{{ bridge }}</Text></Page
    >
  </Document>
</template>
