---
title: Browser API
---

# Browser API

## `<PDFViewer>` <Badge type="info" text="component" /> {#pdfviewer}

Iframe PDF viewer for client-side generated documents.

- **Props**

<<< ../../src/components/index.ts#PDFViewerProps

- **Example**

```vue
<script setup>
import { PDFViewer, Document, ... } from '@ceereals/vue-pdf'
</script>
<template>
  <PDFViewer :queryParams="{ toolbar: 1 }" :enableProvideBridge="false">
    <Document> ... </Document>
  </PDFViewer>
</template>
```

## `<PDFDownloadLink>` <Badge type="info" text="component" /> {#pdfdownloadlink}

Download link for client-side generated documents.

- **Props**

<<< ../../src/components/index.ts#PDFDownloadLinkProps

- **Slots**

<<< ../../src/components/index.ts#PDFDownloadLinkSlots

- **Events**

<<< ../../src/components/index.ts#PDFDownloadLinkEvents

- **Example**

```vue
<script setup>
import { PDFDownloadLink, Document, ... } from '@ceereals/vue-pdf'
</script>
<template>
  <PDFDownloadLink document="Hello world" fileName="somename.pdf">
    <template #label> Download Now! </template>
    <Document> ... </Document>
  </PDFDownloadLink>
</template>
```

## `<PDFPrint>` <Badge type="info" text="component" /> {#pdfprint}

Print link for client-side generated documents.

- **Props**

<<< ../../src/components/index.ts#PDFPrintProps

- **Slots**

<<< ../../src/components/index.ts#PDFPrintSlots

- **Events**

<<< ../../src/components/index.ts#PDFPrintEvents

- **Example**

```vue
<script setup>
import { PDFPrint, Document, ... } from '@ceereals/vue-pdf'
</script>
<template>
  <PDFPrint>
    <template #label> Print Now! </template>
    <Document> ... </Document>
  </PDFPrint>
</template>
```

## `usePdf` <Badge type="info" text="composable" /> {#usepdf}

Vue composable for generating PDF documents.

- **Type**

<<< ../../src/composables/usePdf.ts#usePdf

- **Example**

::: code-group

```vue [MyComponent.vue]
<script setup>
import { usePdf } from '@ceereals/vue-pdf'
import HelloWorldDocument from './HelloWorldDocument.vue'
const { execute } = usePdf(HellowWorldDocument, { reactive: false })
</script>
<template>
  <button @click="() => execute(true)">Generate PDF</button>
</template>
```

```vue [MyAsyncComponent.vue]
<script setup>
import { usePdf } from '@ceereals/vue-pdf'
import HelloWorldDocument from './HelloWorldDocument.vue'

const { url } = await usePdf(HelloWorldDocument)
</script>
<template>
  <a :href="url" download="output.pdf">Download PDF</a>
</template>
```

```ts [MyScript.ts]
import { h } from '@vue/runtime-core'
import { usePdf } from '@ceereals/vue-pdf'
import HelloWorldDocument from './HelloWorldDocument.vue'

const { url } = await usePdf(
  h(HelloWorldDocument, {
    /** props */
  })
)
```

:::
> [!Note]
> You can also use `usePdf` in Node.js and use the Vue reactivity system without needing to create a Vue App.
