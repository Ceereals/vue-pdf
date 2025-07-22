---
outline: 2,3
---
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

### Vite plugin

The `vue-pdf` package includes a custom Vite plugin that streamlines the integration of modified `@react-pdf/fns` library into your project. This plugin automatically aliases `@react-pdf/fns` to the enhanced version bundled with `vue-pdf`, which introduces an `abort` method to halt layout execution, a critical improvement for managing long or resource-intensive PDF rendering tasks, due to reactivity changes.

```ts [vite.config.ts]
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuePdf from "@ceereals/vue-pdf/vite";

export default defineConfig({
  plugins: [vue(), vuePdf()],
});
```

> [!NOTE]
> The Vite plugin is *not mandatory*. Code includes runtime checks to verify if the modified feature is implemented, ensuring that even without the plugin, your project will work correctly. This design allows you to adopt the plugin for convenience, while still maintaining full functionality in its absence.

## Document component

Here's an example of how to write a simple PDF document template using the components provided by `vue-pdf`:
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

> [!WARNING]
> The `Document` component must be the root of your tree element structure, and under no circumstances should it be used as a child of another `vue-pdf` component. In addition, it should only have children of type `Page`. For more information, see the [API Reference for Document](../../reference/components-api#document).

## Browser Usage

### Rendering

We have more options to render the PDF document:

1. Render the document in the browser using the [`PDFViewer`](../../reference/browser-api#pdfviewer) component.
2. Render the PDF document to a `Blob` using `usePdf` composable.
3. Generate a PDF file using `Node.js`.

For more information about the rendering process, see the [Rendering process](https://react-pdf.org/rendering-process) section in the `@react-pdf` documentation.

#### Using `PDFViewer` <Badge type="info" text="component"/>

To render the document in the browser with [`PDFViewer`](../../reference/browser-api#pdfviewer) component do the following:

```vue [MyApp.vue] {6-8}
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

```vue [MyAppWithView.vue] {6-8}
<script setup>
import { PDFViewer } from "@ceereals/vue-pdf";
import HelloWorldDocument from "./HelloWorldDocument.vue";
</script>
<template>
  <PDFViewer view="fit" :showToolbar="true">
    <HelloWorldDocument />
  </PDFViewer>
</template>
```

`PDFViewer` is a web-only component that renders the PDF document in an iframe. It is useful for client-side generated documents. You can control the toolbar visibility with `showToolbar` and set the view mode with the `view` prop (e.g., `view="fit"`).

#### Using `usePdf` <Badge type="info" text="composable"/>

To render the document in the browser on your own, you can use the [`usePdf`](../../reference/browser-api#usepdf) composable:
::: code-group

```vue [MyVueComponent.vue] {6}
<script setup>
import { h } from "vue";
import { usePdf } from "@ceereals/vue-pdf";
import HelloWorldDocument from "./HelloWorldDocument.vue";

const { url } = usePdf(h(HelloWorldDocument, /* props */));
</script>
<template>
  <iframe :src="url"/>
</template>
```

```vue [MyVueComponent.vue - no render function] {5}
<script setup>
import { usePdf } from "@ceereals/vue-pdf";
import HelloWorldDocument from "./HelloWorldDocument.vue";

const { url } = usePdf(HelloWorldDocument);
</script>
<template>
  <iframe :src="url" />
</template>
```

:::

## Node Usage

### Render to File

To generate a PDF file using `Node.js`, you can use the `renderToFile` function from the `@ceereals/vue-pdf` package. This function returns a `Promise` that resolves to a `Stream.Readable` object containing the PDF document when has been succesfully writte to the filesystem.
::: code-group

```js [index.js]
import { renderToFile } from "@ceereals/vue-pdf";
import HelloWorldDocument from "./HelloWorldDocument.ts";


await renderToFile(HelloWorldDocument, "hello-world.pdf");

```

```js [withProps.js]
import { h } from "vue";
import { renderToFile } from "@ceereals/vue-pdf";
import HelloWorldDocument from "./HelloWorldDocument.ts";


await renderToFile(h(HelloWorldDocument, /** props */), "hello-world.pdf");

```

:::

Node API also includes a `renderToStream` and `renderToBuffer`, for more information see the [Node API Reference](../../reference/node-api).
