<script setup lang="ts">
import { View } from '@ceereals/vue-pdf'
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
        alignItems: 'center',
        border: '1px solid #000',
        width: '100%',
        textAlign: 'center',
        fontSize: '10px',
        fontWeight: 'bold',
        backgroundColor: '#c0c0c0',
      },
      style || {},
    ]"
  >
    <slot />
  </View>
</template>
