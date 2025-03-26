<script setup lang="ts">
import { View, Text } from '@/components'
</script>
<template>
  <View
    :style="{
      position: 'absolute',
      bottom: 0,
      textAlign: 'center',
      width: '100%',
    }"
  >
    <Text
      :render="({ pageNumber, totalPages }) => `${pageNumber}/${totalPages}`"
    />
  </View>
</template>
