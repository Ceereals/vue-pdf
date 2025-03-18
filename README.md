<p align="center">
  <img src="https://github.com/user-attachments/assets/23cc30bf-0935-4414-be49-ac0f2d619329" height="280px"/>
  <p align="center" style="font-size: 32px"><b>Vue PDF</b></p>
  <p align="center">Vue renderer for creating PDF files on the browser and server</p>
  <p align="center">
    <a href="https://www.npmjs.com/package/@ceereals/vue-pdf">
      <img src="https://img.shields.io/npm/v/@ceereals/vue-pdf?style=flat&colorA=000000&colorB=000000" />
    </a>
    <a href="https://github.com/Ceereals/vue-pdf/blob/main/LICENSE">
      <img src="https://img.shields.io/github/license/Ceereals/vue-pdf?style=flat&colorA=000000&colorB=000000" />
    </a>
    <a href="https://app.netlify.com/sites/ceereals-vue-pdf/deploys">
      <img src="https://api.netlify.com/api/v1/badges/4832595c-7f8c-48c4-bbc8-d1cc56c93b44/deploy-status" />
    </a>
  </p>
</p>

## Installation

```bash
npm install @ceereals/vue-pdf
```

## Usage

### Web

```html
<script setup>
import { Document, Page, Text, View, PDFViewer } from "@ceereals/vue-pdf";
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
  <PDFViewer>
    <Document>
      <Page size="A4">
        <View :style="viewStyle">
          <Text :style="textStyle">Hello, Vue PDF!</Text>
        </View>
      </Page>
    </Document>
  </PDFViewer>
</template>
```

### Node

```javascript
import { Document, Page, Text, View, renderToFile } from "@ceereals/vue-pdf";
import { defineComponent, h } from "@vue/runtime-core";
import fs from "fs";

const DocumentTemplate = defineComponent(() => {
    return () => (
      h(Document, [
        h(Page, { size: "A4" }, [
          h(
            View, { style: viewStyle },
            [
              h(
                Text, { style: textStyle },
                "Hello, Vue PDF!",
              ),
            ],
          ),
        ]),
      ])
    )
})

const stream = renderToFile(DocumentTemplate,'document.pdf');
```

## Documentation

For more information, check out the [documentation](https://vue-pdf.org).

## License

MIT © [Riccardo Romoli](http://github.com/Ceereals)
