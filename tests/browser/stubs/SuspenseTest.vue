<script setup lang="ts">
import { Document, Page, Text } from '@/components'
import { PDFSuspense } from '@/components'
import AsyncTestDocument from './AsyncTestDocument.vue'
</script>
<template>
  <PDFSuspense>
    <template #default>
      <AsyncTestDocument text="async text" />
    </template>
    <template #fallback>
      <Document>
        <Page>
          <Text>Loading...</Text>
        </Page>
      </Document>
    </template>
  </PDFSuspense>
</template>
