<script setup lang="ts">
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import { View, Text } from '@/components'
</script>
<template>
  <Text
    :style="{
      position: 'absolute',
      bottom: 10,
      textAlign: 'center',
      left: 0,
      right: 0,
    }"
    fixed
    :render="({ pageNumber, totalPages }) => `${pageNumber}/${totalPages}`"
  />
</template>
