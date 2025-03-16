import * as P from '@react-pdf/primitives'

import createComponent from './createComponent'
import type {
  Document as _Document,
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
export const Document = createComponent<Props<typeof _Document>>(
  P.Document,
  'Document',
  [
    'style',
    'title',
    'author',
    'subject',
    'creator',
    'keywords',
    'producer',
    'language',
    'creationDate',
    'modificationDate',
    'pdfVersion',
    'pageMode',
    'pageLayout',
    'onRender',
  ],
)
export const Page = createComponent<Props<typeof _Page>>(P.Page, 'Page', [
  'id',
  'style',
  'fixed',
  'break',
  'minPresenceAhead',
  'wrap',
  'debug',
  'size',
  'orientation',
  'dpi',
  'bookmark',
])
export const View = createComponent<Props<typeof _View>>(P.View, 'View', [
  'id',
  'style',
  'fixed',
  'break',
  'minPresenceAhead',
  'wrap',
  'debug',
  'onRender',
])
export const Text = createComponent<Props<typeof _Text>>(P.Text, 'Text', [
  'id',
  'style',
  'fixed',
  'break',
  'minPresenceAhead',
  'wrap',
  'debug',
  'onRender',
  'hyphenationCallback',
  'orphans',
  'widows',
])
export const Link = createComponent<Props<typeof _Link>>(P.Link, 'Link', [
  'id',
  'style',
  'fixed',
  'break',
  'minPresenceAhead',
  'wrap',
  'debug',
  'href',
  'src',
])
export const Note = createComponent<Props<typeof _Note>>(P.Note, 'Note', [
  'id',
  'style',
  'fixed',
  'break',
  'minPresenceAhead',
])
export const Path = createComponent<Props<typeof _Path>>(P.Path, 'Path', [
  'style',
  'd',
])
export const Rect = createComponent<Props<typeof _Rect>>(P.Rect, 'Rect', [
  'style',
  'x',
  'y',
  'width',
  'height',
  'rx',
  'ry',
])
export const Line = createComponent<Props<typeof _Line>>(P.Line, 'Line', [
  'style',
  'x1',
  'x2',
  'y1',
  'y2',
])
export const Stop = createComponent<Props<typeof _Stop>>(P.Stop, 'Stop', [
  'offset',
  'stopColor',
  'stopOpacity',
])
export const Defs = createComponent<Props<typeof _Defs>>(P.Defs, 'Defs')
export const Image = createComponent<Props<typeof _Image>>(P.Image, 'Image', [
  'id',
  'style',
  'fixed',
  'break',
  'minPresenceAhead',
  'debug',
  'cache',
  'src',
  'source',
])
export const Tspan = createComponent<Props<typeof _Tspan>>(P.Tspan, 'Tspan', [
  'x',
  'y',
])
export const Canvas = createComponent<Props<typeof _Canvas>>(
  P.Canvas,
  'Canvas',
  ['id', 'style', 'fixed', 'break', 'minPresenceAhead', 'debug', 'paint'],
)
export const Circle = createComponent<Props<typeof _Circle>>(
  P.Circle,
  'Circle',
  ['style', 'cx', 'cy', 'r'],
)
export const Ellipse = createComponent<Props<typeof _Ellipse>>(
  P.Ellipse,
  'Ellipse',
  ['style', 'cx', 'cy', 'rx', 'ry'],
)
export const Polygon = createComponent<Props<typeof _Polygon>>(
  P.Polygon,
  'Polygon',
  ['style', 'points'],
)
export const Polyline = createComponent<Props<typeof _Polyline>>(
  P.Polyline,
  'Polyline',
  ['style', 'points'],
)
export const ClipPath = createComponent<Props<typeof _ClipPath>>(
  P.ClipPath,
  'ClipPath',
  ['id'],
)
export const TextInstance = createComponent<Props<typeof _Tspan>>(
  P.TextInstance,
  'TextInstance',
  ['x', 'y'],
)
export const LinearGradient = createComponent<Props<typeof _LinearGradient>>(
  P.LinearGradient,
  'LinearGradient',
  ['id', 'x1', 'x2', 'y1', 'y2'],
)
export const RadialGradient = createComponent<Props<typeof _RadialGradient>>(
  P.RadialGradient,
  'RadialGradient',
  ['id', 'cx', 'cy', 'fr', 'fx', 'fy'],
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
