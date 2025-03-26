<script setup lang="ts">
import { View, Image } from '@/components'
defineProps<{ src: string }>()
</script>
<template>
  <View
    :style="{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }"
    fixed
  >
    <Image
      :src="src"
      :style="{
        opacity: 0.1,
        width: 200,
      }"
    ></Image>
  </View>
</template>
