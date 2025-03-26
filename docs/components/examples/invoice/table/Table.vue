<script setup lang="ts">
import { View } from '@/components'
import { VNode } from 'vue'
const slots = defineSlots<{
  header: () => VNode[]
  body: () => VNode[]
}>()
</script>
<template>
  <View>
    <View
      :style="{
        display: 'flex',
        flexDirection: 'row',
      }"
    >
      <slot name="header" />
    </View>
    <slot name="body" />
  </View>
</template>
