<script setup lang="ts">
import { View } from '@/components'
import { Style } from '@react-pdf/types'
defineProps<{
  style?: Style
}>()
</script>
<template>
  <View
    :style="[
      {
        display: 'flex',
        flexDirection: 'row',
      },
      style || {},
    ]"
  >
    <slot />
  </View>
</template>
