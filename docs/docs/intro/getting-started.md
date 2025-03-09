# Getting Started

## Installation

### Prerequisites

- [Vue.js](https://vuejs.org/) version 3.3 or higher.
- [Node.js](https://nodejs.org/) version 18 or higher.

To start using `vue-pdf`, you need to install the package. Run one of the following commands in your terminal:

::: code-group

```sh [npm]
$ npm add -D @ceereals/vue-pdf
```

```sh [pnpm]
$ pnpm add -D @ceereals/vue-pdf
```

```sh [yarn]
$ yarn add -D @ceereals/vue-pdf
```

```sh [yarn (pnp)]
$ yarn add -D @ceereals/vue-pdf
```

```sh [bun]
$ bun add -D @ceereals/vue-pdf
```

:::

## Basic Usage

### Create a PDF Document component

Here's an example of how to create a simple PDF document using the components provided by vue-pdf:
::: code-group

```vue [HelloWorldDocument.vue]
<script setup>
import { Document, Page, Text, View } from "@ceereals/vue-pdf";
import { reactive } from "vue";
const viewStyle = reactive({
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

const textStyle = reactive({
  fontSize: 24,
});
</script>
<template>
  <Document>
    <Page size="A4">
      <View :style="viewStyle">
        <Text :style="textStyle">Hello, Vue PDF!</Text>
      </View>
    </Page>
  </Document>
</template>
```

```ts [HelloWorldDocument.ts]
import { Document, Page, Text, View } from "@ceereals/vue-pdf";
import { defineComponent, h, reactive } from "vue";

export default defineComponent(() => {
  const viewStyle = reactive({
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  });

  const textStyle = reactive({
    fontSize: 24,
  });
  return () =>
    h(Document, [
      h(Page, { size: "A4" }, [
        h(
          View,
          {
            style: viewStyle,
          },
          [
            h(
              Text,
              {
                style: textStyle,
              },
              "Hello, Vue PDF!",
            ),
          ],
        ),
      ]),
    ]);
});
```

```tsx [HelloWorldDocument.tsx]
import { Document, Page, Text, View } from "@ceereals/vue-pdf";
import { defineComponent, reactive } from "vue";

export default defineComponent(() => {
  const viewStyle = reactive({
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  });

  const textStyle = reactive({
    fontSize: 24,
  });
  return () => (
    <Document>
      <Page size="A4">
        <View style={viewStyle}>
          <Text style={textStyle}>Hello, Vue PDF!</Text>
        </View>
      </Page>
    </Document>
  );
});
```

:::

### Render the PDF Document

We have more options to render the PDF document:

1. Render the document in the browser using the [`PDFViewer`](../components#pdfviewer) component.
2. Render the PDF document to a `Blob` using `usePdf` composable.
3. Generate a PDF file using `Node.js`.

#### Render the document in the browser with `PDFViewer`

To render the document in the browser with [`PDFViewer`](../components#pdfviewer) component do the following:

```vue [MyApp.vue]
<script setup>
import { PDFViewer } from "@ceereals/vue-pdf";
import HelloWorldDocument from "./HelloWorldDocument.vue";
</script>
<template>
  <PDFViewer>
    <HelloWorldDocument />
  </PDFViewer>
</template>
```

`PDFViewer` is a web-only component that renders the PDF document in an iframe. It is useful for client-side generated documents.

#### Render the document in the browser with `usePdf`

To render the document in the browser, you can use the [`usePdf`](../composables#usepdf) composable:

```vue [MyApp.vue]
<script setup>
import { h } from "vue";
import { usePdf } from "@ceereals/vue-pdf";
import HelloWorldDocument from "./HelloWorldDocument.vue";

const { url } = usePdf(h(HelloWorldDocument, /* props */));
</script>
<template>
  
</template>
```

`PDFViewer` is a web-only component that renders the PDF document in an iframe. It is useful for client-side generated documents.
