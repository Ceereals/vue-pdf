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
        justifyContent: 'center',
        border: '1px solid #000',
        textAlign: 'center',
        width: '100%',
        fontSize: '10px',
      },
      style || {},
    ]"
  >
    <slot />
  </View>
</template>
