import * as P from '@react-pdf/primitives'

import createComponent from './createComponent'
import type {
  Link as _Link,
  Page as _Page,
  View as _View,
  Text as _Text,
  Note as _Note,
  Path as _Path,
  Rect as _Rect,
  Line as _Line,
  Stop as _Stop,
  Defs as _Defs,
  Image as _Image,
  Tspan as _Tspan,
  Canvas as _Canvas,
  Circle as _Circle,
  Ellipse as _Ellipse,
  Polygon as _Polygon,
  Polyline as _Polyline,
  ClipPath as _ClipPath,
  LinearGradient as _LinearGradient,
  RadialGradient as _RadialGradient,
} from '@react-pdf/renderer'
import type React from 'react'

export interface PDFViewerProps {
  /**
   * Toggle the visibility of the toolbar
   * @default true
   */
  showToolbar?: boolean
  /**
   * Enable the provide bridge to provide App provides to the Document context
   * @default true
   */
  enableProvideBridge?: boolean
}
type Props<
  T extends
    | keyof React.JSX.IntrinsicElements
    // biome-ignore lint/suspicious/noExplicitAny: any is needed to support all React components
    | React.JSXElementConstructor<any>,
> = Omit<React.ComponentProps<T>, 'children'>
export const Document = createComponent<Props<typeof _Link>>(
  P.Document,
  'Document',
  {
    style: Object,
    title: String,
    author: String,
    subject: String,
    creator: {
      type: String,
      default: 'vue-pdf',
    },
    keywords: String,
    producer: {
      type: String,
      default: 'vue-pdf',
    },
    language: String,
    creationDate: Date,
    modificationDate: Date,
    pdfVersion: {
      type: String,
      default: '1.3',
    },
    pageMode: {
      type: String,
      default: 'useNone',
    },
    pageLayout: {
      type: String,
      default: 'singlePage',
    },
    onRender: Function,
  },
)
export const Page = createComponent<Props<typeof _Page>>(P.Page, 'Page', {
  id: String,
  style: [Object, Array],
  fixed: Boolean,
  break: Boolean,
  minPresenceAhead: Number,
  wrap: Boolean,
  debug: Boolean,
  size: [Object, String, Number],
  orientation: String,
  dpi: Number,
  bookmark: Object,
})
export const View = createComponent<Props<typeof _View>>(P.View, 'View', {
  id: String,
  style: [Object, Array],
  fixed: Boolean,
  break: Boolean,
  minPresenceAhead: Number,
  wrap: Boolean,
  debug: Boolean,
  onRender: Function,
})
export const Text = createComponent<Props<typeof _Text>>(P.Text, 'Text', {
  id: String,
  style: [Object, Array],
  fixed: Boolean,
  break: Boolean,
  minPresenceAhead: Number,
  wrap: Boolean,
  debug: Boolean,
  onRender: Function,
  hyphenationCallback: Function,
  orphans: Number,
  widows: Number,
})
export const Link = createComponent<Props<typeof _Link>>(P.Link, 'Link', {
  id: String,
  style: [Object, Array],
  fixed: Boolean,
  break: Boolean,
  minPresenceAhead: Number,
  wrap: Boolean,
  debug: Boolean,
  href: String,
  src: String,
})
export const Note = createComponent<Props<typeof _Note>>(P.Note, 'Note', {
  id: String,
  style: [Object, Array],
  fixed: Boolean,
  break: Boolean,
  minPresenceAhead: Number,
})
export const Path = createComponent<Props<typeof _Path>>(P.Path, 'Path', {
  style: Object,
  d: String,
})
export const Rect = createComponent<Props<typeof _Rect>>(P.Rect, 'Rect', {
  style: Object,
  x: [String, Number],
  y: [String, Number],
  width: [String, Number],
  height: [String, Number],
  rx: [String, Number],
  ry: [String, Number],
})
export const Line = createComponent<Props<typeof _Line>>(P.Line, 'Line', {
  style: Object,
  x1: [String, Number],
  x2: [String, Number],
  y1: [String, Number],
  y2: [String, Number],
})
export const Stop = createComponent<Props<typeof _Stop>>(P.Stop, 'Stop', {
  offset: [String, Number],
  stopColor: String,
  stopOpacity: [String, Number],
})
export const Defs = createComponent<Props<typeof _Defs>>(P.Defs, 'Defs', {})
export const Image = createComponent<Props<typeof _Image>>(P.Image, 'Image', {
  id: String,
  style: [Object, Array],
  fixed: Boolean,
  break: Boolean,
  minPresenceAhead: Number,
  debug: Boolean,
  cache: Boolean,
  src: Object,
  source: Object,
})
export const Tspan = createComponent<Props<typeof _Tspan>>(P.Tspan, 'Tspan', {
  x: [String, Number],
  y: [String, Number],
})
export const Canvas = createComponent<Props<typeof _Canvas>>(
  P.Canvas,
  'Canvas',
  {
    id: String,
    style: [Object, Array],
    fixed: Boolean,
    break: Boolean,
    minPresenceAhead: Number,
    debug: Boolean,
    paint: Function,
  },
)
export const Circle = createComponent<Props<typeof _Circle>>(
  P.Circle,
  'Circle',
  {
    style: Object,
    cx: [String, Number],
    cy: [String, Number],
    r: [String, Number],
  },
)
export const Ellipse = createComponent<Props<typeof _Ellipse>>(
  P.Ellipse,
  'Ellipse',
  {
    style: Object,
    cx: [String, Number],
    cy: [String, Number],
    rx: [String, Number],
    ry: [String, Number],
  },
)
export const Polygon = createComponent<Props<typeof _Polygon>>(
  P.Polygon,
  'Polygon',
  {
    style: Object,
    points: String,
  },
)
export const Polyline = createComponent<Props<typeof _Polyline>>(
  P.Polyline,
  'Polyline',
  {
    style: Object,
    points: String,
  },
)
export const ClipPath = createComponent<Props<typeof _ClipPath>>(
  P.ClipPath,
  'ClipPath',
  {
    id: String,
  },
)
export const TextInstance = createComponent<Props<typeof _Tspan>>(
  P.TextInstance,
  'TextInstance',
  {
    x: [String, Number],
    y: [String, Number],
  },
)
export const LinearGradient = createComponent<Props<typeof _LinearGradient>>(
  P.LinearGradient,
  'LinearGradient',
  {
    id: String,
    x1: [String, Number],
    x2: [String, Number],
    y1: [String, Number],
    y2: [String, Number],
  },
)
export const RadialGradient = createComponent<Props<typeof _RadialGradient>>(
  P.RadialGradient,
  'RadialGradient',
  {
    id: String,
    cx: [String, Number],
    cy: [String, Number],
    fr: [String, Number],
    fx: [String, Number],
    fy: [String, Number],
  },
)

const components = {
  Document,
  Page,
  View,
  Text,
  Link,
  Note,
  Path,
  Rect,
  Line,
  Stop,
  Defs,
  Image,
  Tspan,
  Canvas,
  Circle,
  Ellipse,
  Polygon,
  Polyline,
  ClipPath,
  TextInstance,
  LinearGradient,
  RadialGradient,
}

export default components
