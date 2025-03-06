import * as P from '@react-pdf/primitives'

import type {
  Bookmark,
  HyphenationCallback,
  Orientation,
  SVGPresentationAttributes as OriginalSVGPresentationAttributes,
  PDFVersion,
  PageLayout,
  PageMode,
  PageSize,
  SourceObject,
  Style,
} from '@react-pdf/types'
import type { VNodeProps } from 'vue'
import createComponent from './createComponent'

interface Styles {
  [key: string]: Style
}

interface OnRenderProps {
  blob?: Blob
}

interface DocumentProps extends VNodeProps {
  style?: Style | Style[]
  title?: string
  author?: string
  subject?: string
  creator?: string
  keywords?: string
  producer?: string
  language?: string
  creationDate?: Date
  modificationDate?: Date
  pdfVersion?: PDFVersion
  pageMode?: PageMode
  pageLayout?: PageLayout
  onRender?: (props: OnRenderProps) => any
}

interface NodeProps extends VNodeProps {
  id?: string
  style?: Style | Style[]
  fixed?: boolean
  break?: boolean
  minPresenceAhead?: number
}

interface PageProps extends NodeProps {
  wrap?: boolean
  debug?: boolean
  size?: PageSize
  orientation?: Orientation
  dpi?: number
  bookmark?: Bookmark
}

interface ViewProps extends NodeProps {
  wrap?: boolean
  debug?: boolean
  onRender?: (props: { pageNumber: number; subPageNumber: number }) => any
}

interface BaseImageProps extends NodeProps {
  debug?: boolean
  cache?: boolean
}

interface ImageWithSrcProp extends BaseImageProps {
  src: SourceObject
}

interface ImageWithSourceProp extends BaseImageProps {
  source: SourceObject
}

type ImageProps = ImageWithSrcProp | ImageWithSourceProp

interface TextProps extends NodeProps {
  wrap?: boolean
  debug?: boolean
  onRender?: (props: {
    pageNumber: number
    totalPages: number
    subPageNumber: number
    subPageTotalPages: number
  }) => any
  hyphenationCallback?: HyphenationCallback
  orphans?: number
  widows?: number
}

interface SVGTextProps extends SVGPresentationAttributes {
  style?: SVGPresentationAttributes
  x: string | number
  y: string | number
  hyphenationCallback?: HyphenationCallback
}

interface LinkProps extends NodeProps {
  wrap?: boolean
  debug?: boolean
  href?: string
  src?: string
}

interface NoteProps extends NodeProps {}

interface CanvasProps extends NodeProps {
  debug?: boolean
  paint: (painter: any, availableWidth: number, availableHeight: number) => null
}
interface SVGPresentationAttributes
  extends OriginalSVGPresentationAttributes,
    VNodeProps {}
interface SVGProps extends NodeProps, SVGPresentationAttributes {
  debug?: boolean
  width?: string | number
  height?: string | number
  viewBox?: string
  preserveAspectRatio?: string
}

interface LineProps extends SVGPresentationAttributes {
  style?: SVGPresentationAttributes
  x1: string | number
  x2: string | number
  y1: string | number
  y2: string | number
}

interface PolylineProps extends SVGPresentationAttributes {
  style?: SVGPresentationAttributes
  points: string
}

interface PolygonProps extends SVGPresentationAttributes {
  style?: SVGPresentationAttributes
  points: string
}

interface PathProps extends SVGPresentationAttributes {
  style?: SVGPresentationAttributes
  d: string
}

interface RectProps extends SVGPresentationAttributes {
  style?: SVGPresentationAttributes
  x?: string | number
  y?: string | number
  width: string | number
  height: string | number
  rx?: string | number
  ry?: string | number
}

interface CircleProps extends SVGPresentationAttributes {
  style?: SVGPresentationAttributes
  cx?: string | number
  cy?: string | number
  r: string | number
}

interface EllipseProps extends SVGPresentationAttributes {
  style?: SVGPresentationAttributes
  cx?: string | number
  cy?: string | number
  rx: string | number
  ry: string | number
}

interface TspanProps extends SVGPresentationAttributes {
  x?: string | number
  y?: string | number
}

interface GProps extends SVGPresentationAttributes {
  style?: Style
}

interface StopProps extends VNodeProps {
  offset: string | number
  stopColor: string
  stopOpacity?: string | number
}

interface DefsProps extends VNodeProps {}

interface ClipPathProps extends VNodeProps {
  id?: string
}

interface LinearGradientProps extends VNodeProps {
  id: string
  x1?: string | number
  x2?: string | number
  y1?: string | number
  y2?: string | number
}

interface RadialGradientProps extends VNodeProps {
  id: string
  cx?: string | number
  cy?: string | number
  fr?: string | number
  fx?: string | number
  fy?: string | number
}

interface BlobProviderParams {
  blob: Blob | null
  url: string | null
  loading: boolean
  error: Error | null
}

interface BlobProviderProps {
  document: any
  children: (params: BlobProviderParams) => any
}

interface PDFViewerProps {
  showToolbar?: boolean
  enableProvideBridge?: boolean
}

interface PDFDownloadLinkProps extends Omit<any, 'href'> {
  fileName?: string
  document: any
  children?: any | ((params: BlobProviderParams) => any)
  onClick?(event: any, instance: UsePDFInstance): void
}

interface UsePDFInstance {
  loading: boolean
  blob: Blob | null
  url: string | null
  error: string | null
}
export type {
  BlobProviderParams,
  BlobProviderProps,
  CanvasProps,
  CircleProps,
  ClipPathProps,
  DefsProps,
  DocumentProps,
  EllipseProps,
  GProps,
  ImageProps,
  LineProps,
  LinearGradientProps,
  LinkProps,
  NoteProps,
  PDFDownloadLinkProps,
  PDFViewerProps,
  PageProps,
  PathProps,
  PolygonProps,
  PolylineProps,
  RadialGradientProps,
  RectProps,
  SVGProps,
  SVGTextProps,
  StopProps,
  Styles,
  TextProps,
  TspanProps,
  UsePDFInstance,
  ViewProps,
}
export const Document = createComponent<DocumentProps>(P.Document, 'Document', {
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
})
export const Page = createComponent<PageProps>(P.Page, 'Page', {
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
export const View = createComponent<ViewProps>(P.View, 'View', {
  id: String,
  style: [Object, Array],
  fixed: Boolean,
  break: Boolean,
  minPresenceAhead: Number,
  wrap: Boolean,
  debug: Boolean,
  onRender: Function,
})
export const Text = createComponent<TextProps>(P.Text, 'Text', {
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
export const Link = createComponent<LinkProps>(P.Link, 'Link', {
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
export const Note = createComponent<NoteProps>(P.Note, 'Note', {
  id: String,
  style: [Object, Array],
  fixed: Boolean,
  break: Boolean,
  minPresenceAhead: Number,
})
export const Path = createComponent<PathProps>(P.Path, 'Path', {
  style: Object,
  d: String,
})
export const Rect = createComponent<RectProps>(P.Rect, 'Rect', {
  style: Object,
  x: [String, Number],
  y: [String, Number],
  width: [String, Number],
  height: [String, Number],
  rx: [String, Number],
  ry: [String, Number],
})
export const Line = createComponent<LineProps>(P.Line, 'Line', {
  style: Object,
  x1: [String, Number],
  x2: [String, Number],
  y1: [String, Number],
  y2: [String, Number],
})
export const Stop = createComponent<StopProps>(P.Stop, 'Stop', {
  offset: [String, Number],
  stopColor: String,
  stopOpacity: [String, Number],
})
export const Defs = createComponent<DefsProps>(P.Defs, 'Defs', {})
export const Image = createComponent<ImageProps>(P.Image, 'Image', {
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
export const Tspan = createComponent<TspanProps>(P.Tspan, 'Tspan', {
  x: [String, Number],
  y: [String, Number],
})
export const Canvas = createComponent<CanvasProps>(P.Canvas, 'Canvas', {
  id: String,
  style: [Object, Array],
  fixed: Boolean,
  break: Boolean,
  minPresenceAhead: Number,
  debug: Boolean,
  paint: Function,
})
export const Circle = createComponent<CircleProps>(P.Circle, 'Circle', {
  style: Object,
  cx: [String, Number],
  cy: [String, Number],
  r: [String, Number],
})
export const Ellipse = createComponent<EllipseProps>(P.Ellipse, 'Ellipse', {
  style: Object,
  cx: [String, Number],
  cy: [String, Number],
  rx: [String, Number],
  ry: [String, Number],
})
export const Polygon = createComponent<PolygonProps>(P.Polygon, 'Polygon', {
  style: Object,
  points: String,
})
export const Polyline = createComponent<PolylineProps>(P.Polyline, 'Polyline', {
  style: Object,
  points: String,
})
export const ClipPath = createComponent<ClipPathProps>(P.ClipPath, 'ClipPath', {
  id: String,
})
export const TextInstance = createComponent<TspanProps>(
  P.TextInstance,
  'TextInstance',
  {
    x: [String, Number],
    y: [String, Number],
  },
)
export const LinearGradient = createComponent<LinearGradientProps>(
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
export const RadialGradient = createComponent<RadialGradientProps>(
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
