<script setup lang="ts">
import { useTemplateRef, watchEffect, shallowRef, type VNode } from 'vue'
import * as pdfjs from 'pdfjs-dist'
import { usePdf } from '@ceereals/vue-pdf'
import { useCounter, useMediaQuery } from '@vueuse/core'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?url'
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker

const slots = defineSlots<{ default: () => VNode[]; header: () => any }>()
const props = defineProps<{
  max: number
}>()
const canvas = useTemplateRef('canvas')
const outputScale = window.devicePixelRatio || 1
const { blob } = usePdf(() => slots.default()[0])
const {
  count: currentPage,
  inc,
  dec,
} = useCounter(1, { min: 1, max: props.max })

const pdf = shallowRef<null | Awaited<
  ReturnType<typeof pdfjs.getDocument>['promise']
>>(null)

let render: pdfjs.RenderTask
watchEffect(async () => {
  if (!blob.value) return
  const document = await blob.value.arrayBuffer()
  pdf.value = await pdfjs.getDocument(document).promise
})
const isLargeScreen = useMediaQuery('(min-width: 1024px)')

watchEffect(() => {
  if (!pdf.value || !canvas.value) return
  render?.cancel()
  pdf.value.getPage(currentPage.value).then((page) => {
    if (!canvas.value) return
    const viewport = page.getViewport({
      scale: 1 / (1 + +!isLargeScreen.value),
    })
    const context = canvas.value.getContext('2d')
    canvas.value.width = Math.floor(viewport.width * outputScale)
    canvas.value.height = Math.floor(viewport.height * outputScale)
    canvas.value.style.width = Math.floor(viewport.width) + 'px'
    canvas.value.style.height = Math.floor(viewport.height) + 'px'

    const transform =
      outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : undefined
    render = page.render({
      // @ts-expect-error
      canvasContext: context,
      viewport,
      transform,
    })
  })
})
</script>
<template>
  <div
    style="width: 100%; height: 100%; display: flex; justify-content: center"
  >
    <div
      style="
        padding: 1rem;
        background-color: var(--vp-c-bg-soft);
        display: flex;
        width: fit-content;
        height: 100%;
        flex-direction: column;
        align-items: center;
      "
    >
      <slot name="header"></slot>
      <canvas ref="canvas" />
      <div style="display: flex; gap: 1rem; margin-top: 1rem">
        <input
          type="button"
          class="button"
          value="Prev"
          @click="dec()"
          :disabled="currentPage === 1"
        />
        <input
          type="button"
          class="button"
          value="Next"
          @click="inc()"
          :disabled="currentPage === props.max"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
.button {
  border-radius: 6px;
  padding: 0 20px;
  line-height: 38px;
  font-size: 14px;
  border-color: var(--vp-button-brand-border);
  color: var(--vp-button-brand-text);
  background-color: var(--vp-button-brand-bg);
  transition: background-color 0.25s, color 0.25s;
}
.button:hover {
  cursor: pointer;
  color: var(--vp-button-brand-hover-text);
  background-color: var(--vp-button-brand-hover-bg);
}
</style>
