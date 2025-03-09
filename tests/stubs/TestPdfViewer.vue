<script setup lang="ts">
import { PDFViewer } from "@/dom";
import TestDocument from "./TestDocument.vue";
import { provide, toRef } from "vue";
import { templateRef } from "@vueuse/core";
const props = withDefaults(
  defineProps<{
    bridge: boolean;
    text?: string;
  }>(),
  {
    bridge: false,
  },
);
provide(
  "bridge",
  toRef(() => props.bridge),
);
const pdfViewer = templateRef<InstanceType<typeof PDFViewer>>("pdfViewer");
defineExpose({
  root: () => pdfViewer.value[Symbol.for("root")],
});
</script>
<template>
  <PDFViewer ref="pdfViewer" enableProvideBridge show-toolbar>
    <TestDocument :text="text"></TestDocument>
  </PDFViewer>
</template>
