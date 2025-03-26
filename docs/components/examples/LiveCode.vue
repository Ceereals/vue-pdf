<script setup lang="ts">
import { useTemplateRef, watchEffect, shallowRef, ref, h, reactive } from 'vue'
import * as pdfjs from 'pdfjs-dist'
import { usePdf } from '../../../src/dom/index'
import DocumentTemplate from './DocumentTemplate.vue'
import { useCounter } from '@vueuse/core'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?url'
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker
const canvas = useTemplateRef('canvas')
const author = ref('Vue PDF')
const { blob } = usePdf(h(DocumentTemplate, { author }))
const {
  count: currentPage,
  inc,
  dec,
  reset,
} = useCounter(1, { min: 1, max: 2 })
const pdf = shallowRef<null | Awaited<
  ReturnType<typeof pdfjs.getDocument>['promise']
>>(null)
let render: pdfjs.RenderTask
watchEffect(async () => {
  if (!blob.value) return
  const document = await blob.value.arrayBuffer()
  pdf.value = await pdfjs.getDocument(document).promise
})

watchEffect(() => {
  if (!pdf.value || !canvas.value) return
  render?.cancel()
  pdf.value.getPage(currentPage.value).then((page) => {
    if (!canvas.value) return
    const viewport = page.getViewport({ scale: 1 })
    const context = canvas.value.getContext('2d')
    canvas.value.width = viewport.width
    canvas.value.height = viewport.height
    render = page.render({
      canvasContext: context,
      viewport,
    })
  })
})
</script>

<template>
  <input type="text" v-model="author" />
  <input
    type="button"
    @click="dec()"
    :disabled="currentPage == 1"
    value="Previous"
  />
  <input
    type="button"
    @click="inc()"
    :disabled="currentPage == 2"
    value="Next"
  />
  <canvas ref="canvas" />
</template>
