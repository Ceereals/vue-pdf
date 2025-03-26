<script setup lang="ts">
import { Document, Page, Text } from '@/components'
import PageCounter from './PageCounter.vue'
defineProps<{
  author?: string
}>()
</script>
<template>
  <Document>
    <Page>
      <Text>{{ author }}</Text>
      <Text>Hello World!</Text>
      <PageCounter />
    </Page>
    <Page>
      <Text>Hello World 2!</Text>
      <PageCounter />
    </Page>
  </Document>
</template>
