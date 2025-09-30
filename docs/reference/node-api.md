---
title: Node API
---

# Node API

## `renderToFile`

- **Type**:

<<< ../../src/node/index.ts#renderToFile

- **Example**
  ::: code-group

```ts [index.ts]
import { renderToFile } from '@ceereals/vue-pdf/node'
import HelloWorldDocument from './HelloWorldDocument.ts'

await renderToFile(HelloWorldDocument, 'output.pdf')
```

```ts [indexWithProp.ts]
import { h } from 'vue'
import { renderToFile } from '@ceereals/vue-pdf/node'
import HelloWorldDocument from './HelloWorldDocument.ts'

await renderToFile(
  h(HelloWorldDocument, {
    /** props */
  }),
  'output.pdf'
)
```

```ts [HelloWorldDocument.ts]
import { Document, Page, Text, View } from '@ceereals/vue-pdf'
import { defineComponent, h, reactive } from 'vue'

export default defineComponent(() => {
  const viewStyle = reactive({
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  })

  const textStyle = reactive({
    fontSize: 24,
  })
  return () =>
    h(Document, [
      h(Page, { size: 'A4' }, [
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
              'Hello, Vue PDF!'
            ),
          ]
        ),
      ]),
    ])
})
```

:::

## `renderToStream`

- **Type**:

<<< ../../src/node/index.ts#renderToStream

- **Example**
  ::: code-group

```ts [index.ts]
import { renderToStream } from '@ceereals/vue-pdf'
import HelloWorldDocument from './HelloWorldDocument.ts'

const stream = await renderToStream(HelloWorldDocument)
stream.pipe(fs.createWriteStream('output.pdf'))
```

```ts [indexWithProp.ts]
import { h } from 'vue'
import
import { renderToStream } from '@ceereals/vue-pdf'
import HelloWorldDocument from './HelloWorldDocument.ts'

const stream = await renderToStream(h(HelloWorldDocument, {/** props */}))
stream.pipe(fs.createWriteStream('output.pdf'))
```

:::

## `renderToBuffer`

- **Type**:

<<< ../../src/node/index.ts#renderToBuffer

- **Example**

::: code-group

```ts [index.ts]
import { renderToBuffer } from '@ceereals/vue-pdf'
import HelloWorldDocument from './HelloWorldDocument.ts'

const buffer = await renderToBuffer(HelloWorldDocument)
fs.writeFileSync('output.pdf', buffer)
```

```ts [indexWithProp.ts]
import { h } from 'vue'
import { renderToBuffer } from '@ceereals/vue-pdf'
import HelloWorldDocument from './HelloWorldDocument.ts'

const buffer = await renderToBuffer(
  h(HelloWorldDocument, {
    /** props */
  })
)
fs.writeFileSync('output.pdf', buffer)
```

:::
