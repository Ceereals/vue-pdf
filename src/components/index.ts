import * as P from '@react-pdf/primitives'
import createComponent from './createComponent'
import type { VNode } from 'vue'

// #region PDFViewerProps
interface PDFViewerProps {
  /**
   * Toggle the visibility of the toolbar
   * @default true
   */
  showToolbar?: boolean
  /**
   * Enable the provide bridge to provide
   * App provides to the Document context
   * @default true
   */
  enableProvideBridge?: boolean
}
// #endregion PDFViewerProps

// #region PDFDownloadLinkProps
interface PDFDownloadLinkProps {
  /**
   * The file name of the pdf file
   * @default 'document.pdf'
   */
  fileName: string
  /**
   * The label of the download link
   * @default 'Download'
   */
  label?: string
}
// #endregion PDFDownloadLinkProps

// #region PDFDownloadLinkSlots
interface PDFDownloadLinkSlots {
  /**
   * @returns VNode[] Must return an array with a single `<Document>` component's VNode, if more than one is provided, only the first one will be used
   */
  default: () => VNode[]
  label?: (params: { blob: Blob | null }) => VNode[] | string
}
// #endregion PDFDownloadLinkSlots

// #region PDFDownloadLinkEvents
interface PDFDownloadLinkEvents {
  click: [event: MouseEvent]
}
// #endregion PDFDownloadLinkEvents

export type { PDFViewerProps, PDFDownloadLinkProps, PDFDownloadLinkSlots, PDFDownloadLinkEvents }
// #region DocumentProps
type PageMode =
  | 'useNone'
  | 'useOutlines'
  | 'useThumbs'
  | 'fullScreen'
  | 'useOC'
  | 'useAttachments'

type PageLayout =
  | 'singlePage'
  | 'oneColumn'
  | 'twoColumnLeft'
  | 'twoColumnRight'
  | 'twoPageLeft'
  | 'twoPageRight'

interface DocumentProps {
  /**
   * Sets title info on the document's metadata
   */
  title?: string
  /**
   * Sets author info on the document's metadata
   */
  author?: string
  /**
   * Sets subject info on the document's metadata
   */
  subject?: string
  /**
   * Sets keywords associated info on the document's metadata
   */
  keywords?: string
  /**
   * Sets creator info on the document's metadata
   * @default 'vue-pdf'
   */
  creator?: string
  /**
   * Sets producer info on the document's metadata
   * @default 'vue-pdf'
   */
  producer?: string
  /**
   * Sets PDF version for generated document
   * @default '1.3'
   */
  pdfVersion?: string
  /**
   * Sets PDF default language
   */
  language?: string
  /**
   * Specifying how the document should be displayed when opened
   * @default 'useNone'
   */
  pageMode?: PageMode
  /**
   * This controls how (some) PDF viewers choose to show pages
   * @default 'singlePage'
   */
  pageLayout?: PageLayout
}
// #endregion DocumentProps

// #region PageProps
interface ExpandedBookmark {
  title: string
  top?: number
  left?: number
  zoom?: number
  fit?: true | false
  expanded?: true | false
}

type Bookmark = string | ExpandedBookmark

interface PageProps {
  /**
   * Defines page size. If String, must be one of the available page sizes. Height is optional, if omitted it will behave as "auto"
   * @default 'A4'
   */
  size?: string | string[] | number | object
  /**
   * Defines page orientation. Valid values: "portrait" or "landscape"
   * @default 'portrait'
   */
  orientation?: 'portrait' | 'landscape'
  /**
   * Enables page wrapping for this page
   * @default true
   */
  wrap?: boolean
  /**
   * Defines page styles
   */
  style?: object | object[]
  /**
   * Enables debug mode on page bounding box
   * @default false
   */
  debug?: boolean
  /**
   * Enables setting a custom DPI for page contents
   * @default 72
   */
  dpi?: number
  /**
   * Destination ID to be linked to
   */
  id?: string
  /**
   * Attach bookmark to element
   */
  bookmark?: string | Bookmark
}
// #endregion PageProps

// #region ViewProps
interface ViewProps {
  /**
   * Enable/disable page wrapping for element
   */
  wrap: boolean
  /**
   * Defines view styles
   */
  style: object | object[]
  /**
   * Enables debug mode on view bounding box
   */
  debug: boolean
  /**
   * Render component in all wrapped pages
   */
  fixed: boolean
  /**
   * Destination ID to be linked to
   */
  id: string
  /**
   * Attach bookmark to element
   */
  bookmark: string | Bookmark
}
// #endregion ViewProps

// #region ImageProps
type HTTPMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

type SourceURL = string

type SourceBuffer = Buffer

type SourceBlob = Blob

type SourceDataBuffer = { data: Buffer; format: 'png' | 'jpg' }

type SourceURLObject = {
  uri: string
  method?: HTTPMethod
  body?: any
  headers?: any
  credentials?: 'omit' | 'same-origin' | 'include'
}

type Source =
  | SourceURL
  | SourceBuffer
  | SourceBlob
  | SourceDataBuffer
  | SourceURLObject
  | undefined

type SourceFactory = () => Source

type SourceAsync = Promise<Source>

type SourceAsyncFactory = () => Promise<Source>

export type SourceObject =
  | Source
  | SourceFactory
  | SourceAsync
  | SourceAsyncFactory

interface ImageProps {
  /**
   * Source of the image.
   * todo: add link
   */
  src?: Source
  /**
   * Alias of src.
   * todo: add @see link
   */
  source?: Source
  /**
   * Defines view styles
   */
  style?: object | object[]
  /**
   * Enables debug mode on view bounding box
   * @default false
   */
  debug?: boolean
  /**
   * Renders component in all wrapped pages
   * @default false
   */
  fixed?: boolean
  /**
   * Enables image caching between consecutive renders
   * @default true
   */
  cache?: boolean
  /**
   * Attach bookmark to element
   */
  bookmark?: string | Bookmark
}
// #endregion ImageProps

// #region TextProps
interface TextProps {
  /**
   * Enables/disables page wrapping for element
   * @default true
   */
  wrap?: boolean
  /**
   * Defines view styles
   */
  style?: object | object[]
  /**
   * Enables debug mode on view bounding box
   * @default false
   */
  debug?: boolean
  /**
   * Renders component in all wrapped pages
   * @default false
   */
  fixed?: boolean
  /**
   * Specify hyphenation callback at a text level
   */
  hyphenationCallback?: (word: string) => string[]
  /**
   * Destination ID to be linked to
   */
  id?: string
  /**
   * Attach bookmark to element
   */
  bookmark?: string | Bookmark
}
// #endregion TextProps

// #region LinkProps
interface LinkProps {
  /**
   * Valid URL or destination ID. ID must be prefixed with `#`
   */
  src?: string
  /**
   * Enable/disable page wrapping for element
   * @default true
   */
  wrap?: boolean
  /**
   * Defines view styles
   */
  style?: object | object[]
  /**
   * Enables debug mode on view bounding box
   * @default false
   */
  debug?: boolean
  /**
   * Renders component in all wrapped pages
   * @default false
   */
  fixed?: boolean
  /**
   * Attach bookmark to element
   */
  bookmark?: string | Bookmark
}
// #endregion LinkProps

// #region NoteProps
interface NoteProps {
  /**
   * Defines view styles
   */
  style?: object | object[]
  /**
   * Renders component in all wrapped pages
   * @default false
   */
  fixed?: boolean
}
// #endregion NoteProps

// #region CanvasProps
interface CanvasProps {
  /**
   * Defines view styles
   */
  style?: object | object[]
  /**
   * Painter function
   */
  paint?: (
    painter?: any,
    availableWidth?: number,
    availableHeight?: number,
  ) => null
  /**
   * Enables debug mode on view bounding box
   * @default false
   */
  debug?: boolean
  /**
   * Renders component in all wrapped pages
   * @default false
   */
  fixed?: boolean
  /**
   * Attach bookmark to element
   */
  bookmark?: string | Bookmark
}
// #endregion CanvasProps

// #region PathProps
interface PathProps extends PresentationAttributes {
  style?: PresentationAttributes
  d?: string
}

interface PresentationAttributes {
  /**
   * Provides a potential indirect value for the fill or stroke attributes.
   */
  color?: string
  /**
   * Defines the baseline used to align the box’s text and inline-level contents.
   * @default auto
   */
  dominantBaseline?:
    | 'auto'
    | 'middle'
    | 'central'
    | 'hanging'
    | 'mathematical'
    | 'text-after-edge'
    | 'text-before-edge'
  /**
   * It defines the color of the inside of the graphical element it applies to.
   */
  fill?: string
  /**
   * It specifies the opacity of the color or the content the current object is filled with.
   * @default 1
   */
  fillOpacity?: string | number
  /**
   * It indicates how to determine what side of a path is inside a shape.
   * @default nonzero
   */
  fillRule?: 'nonzero' | 'evenodd'
  /**
   * It specifies the transparency of an object or a group of objects.
   * @default 1
   */
  opacity?: string | number
  /**
   * Defines the color used to paint the outline of the shape.
   */
  stroke?: string
  /**
   * Defines the width of the stroke to be applied to the shape.
   * @default 1
   */
  strokeWidth?: string | number
  /**
   * Defines the opacity of the stroke of a shape.
   * @default 1
   */
  strokeOpacity?: string | number
  /**
   * Defines the shape to be used at the end of open subpaths when they are stroked.
   * @default butt
   */
  strokeLinecap?: 'butt' | 'round' | 'square'
  /**
   * Defines the shape to be used at the corners of paths when they are stroked.
   * @default miter
   */
  strokeLinejoin?: 'butt' | 'round' | 'square' | 'miter' | 'bevel'
  /**
   * Defines the pattern of dashes and gaps used to paint the outline of the shape.
   */
  strokeDasharray?: string
  /**
   * Defines a list of transform definitions that are applied to an element and its children.
   */
  transform?: string
  /**
   * Defines the horizontal alignment of a string of text.
   */
  textAnchor?: 'start' | 'middle' | 'end'
  /**
   * Lets you control the visibility of graphical elements.
   * @default visible
   */
  visibility?: 'visible' | 'hidden' | 'collapse'
}
// #endregion PathProps

// #region SvgProps
interface SvgProps {
  /**
   * The displayed width of the rectangular viewport
   */
  width?: string | number
  /**
   * The displayed height of the rectangular viewport
   */
  height?: string | number
  /**
   * The SVG viewport coordinates for the current SVG fragment
   */
  viewBox?: string
  /**
   * How the svg fragment must be deformed if it is displayed with a different aspect ratio
   */
  preserveAspectRatio?: string
  /**
   * Defines SVG styles
   */
  style?: object | object[]
}
// #endregion SvgProps

// #region LineProps
interface LineProps {
  /**
   * Defines the x-axis coordinate of the line starting point.
   */
  x1?: string | number
  /**
   * Defines the x-axis coordinate of the line ending point.
   */
  x2?: string | number
  /**
   * Defines the y-axis coordinate of the line starting point.
   */
  y1?: string | number
  /**
   * Defines the y-axis coordinate of the line ending point.
   */
  y2?: string | number
}
// #endregion LineProps

// #region PolylineProps
interface PolylineProps {
  /**
   * Defines the list of points (pairs of x,y absolute coordinates) required to draw the polyline.
   */
  points?: string
}
// #endregion PolylineProps

// #region PolygonProps
interface PolygonProps {
  /**
   * Defines the list of points (pairs of x,y absolute coordinates) required to draw the polygon.
   */
  points?: string
}
// #endregion PolygonProps

// #region RectProps
interface RectProps {
  /**
   * The x coordinate of the rect.
   */
  x?: string | number
  /**
   * The y coordinate of the rect.
   */
  y?: string | number
  /**
   * The width of the rect.
   */
  width?: string | number
  /**
   * The height of the rect.
   */
  height?: string | number
  /**
   * The horizontal corner radius of the rect.
   */
  rx?: string | number
  /**
   * The vertical corner radius of the rect.
   */
  ry?: string | number
}
// #endregion RectProps

// #region CircleProps
interface CircleProps {
  /**
   * The x-axis coordinate of the center of the circle.
   */
  cx?: string | number
  /**
   * The y-axis coordinate of the center of the circle.
   */
  cy?: string | number
  /**
   * The radius of the circle.
   */
  r?: string | number
}
// #endregion CircleProps

// #region EllipseProps
interface EllipseProps {
  /**
   * The x position of the ellipse.
   */
  cx?: string | number
  /**
   * The y position of the ellipse.
   */
  cy?: string | number
  /**
   * The radius of the ellipse on the x axis.
   */
  rx?: string | number
  /**
   * The radius of the ellipse on the y axis.
   */
  ry?: string | number
}
// #endregion EllipseProps

// #region SvgTextProps
interface SvgTextProps {
  /**
   * The x coordinate of the starting point of the text baseline.
   */
  x?: string | number
  /**
   * The y coordinate of the starting point of the text baseline.
   */
  y?: string | number
}
// #endregion SvgTextProps

// #region TspanProps
interface TspanProps {
  /**
   * The x coordinate of the starting point of the text baseline.
   */
  x?: string | number
  /**
   * The y coordinate of the starting point of the text baseline.
   */
  y?: string | number
}
// #endregion TspanProps

// #region GProps
interface GProps extends PresentationAttributes {}
// #endregion GProps

// #region StopProps
interface StopProps {
  /**
   * Defines where the gradient stop is placed along the gradient vector.
   */
  offset?: string | number
  /**
   * Defines the color of the gradient stop.
   */
  stopColor?: string
  /**
   * Defines the opacity of the gradient stop.
   * @default 1
   */
  stopOpacity?: string | number
}
// #endregion StopProps

// #region ClipPathProps
interface ClipPathProps {
  id?: string
}
// #endregion ClipPathProps

// #region LinearGradientProps
interface LinearGradientProps {
  /**
   * Defines the x coordinate of the starting point of the vector gradient.
   */
  x1?: string | number
  /**
   * Defines the x coordinate of the ending point of the vector gradient.
   */
  x2?: string | number
  /**
   * Defines the y coordinate of the starting point of the vector gradient.
   */
  y1?: string | number
  /**
   * Defines the y coordinate of the ending point of the vector gradient.
   */
  y2?: string | number
  xlinkHref?: string
  gradientTransform?: string
  gradientUnits?: 'userSpaceOnUse' | 'objectBoundingBox'
}
// #endregion LinearGradientProps

// #region RadialGradientProps
interface RadialGradientProps {
  /**
   * Defines the x coordinate of the end circle of the radial gradient.
   */
  cx?: string | number
  /**
   * Defines the y coordinate of the end circle of the radial gradient.
   */
  cy?: string | number
  /**
   * Defines the radius of the start circle of the radial gradient.
   */
  fr?: string | number
  /**
   * Defines the x coordinate of the start circle of the radial gradient.
   */
  fx?: string | number
  /**
   * Defines the y coordinate of the start circle of the radial gradient.
   */
  fy?: string | number
  xlinkHref?: string
  gradientTransform?: string
  gradientUnits?: 'userSpaceOnUse' | 'objectBoundingBox'
}
// #endregion RadialGradientProps

export const Document = createComponent<DocumentProps>(P.Document, 'Document', [
  'title',
  'author',
  'subject',
  'creator',
  'keywords',
  'producer',
  'language',
  'pdfVersion',
  'pageMode',
  'pageLayout',
])
export const Page = createComponent<PageProps>(P.Page, 'Page', [
  'id',
  'style',
  'wrap',
  'debug',
  'size',
  'orientation',
  'dpi',
  'bookmark',
])
export const View = createComponent<ViewProps>(P.View, 'View', [
  'id',
  'style',
  'fixed',
  'wrap',
  'debug',
])
export const Text = createComponent<TextProps>(P.Text, 'Text', [
  'id',
  'style',
  'fixed',
  'wrap',
  'debug',
  'hyphenationCallback',
])
export const Link = createComponent<LinkProps>(P.Link, 'Link', [
  'style',
  'fixed',
  'wrap',
  'debug',
  'src',
])
export const Note = createComponent<NoteProps>(P.Note, 'Note', [
  'style',
  'fixed',
])
export const Path = createComponent<PathProps>(P.Path, 'Path', [
  'style',
  'd',
  'fill',
  'stroke',
  'transform',
  'strokeDasharray',
  'opacity',
  'strokeWidth',
  'fillOpacity',
  'fillRule',
  'strokeOpacity',
  'textAnchor',
  'strokeLinecap',
  'strokeLinejoin',
  'visibility',
  'dominantBaseline',
])
export const Rect = createComponent<RectProps>(P.Rect, 'Rect', [
  'x',
  'y',
  'width',
  'height',
  'rx',
  'ry',
])
export const Line = createComponent<LineProps>(P.Line, 'Line', [
  'x1',
  'x2',
  'y1',
  'y2',
])
export const Stop = createComponent<StopProps>(P.Stop, 'Stop', [
  'offset',
  'stopColor',
  'stopOpacity',
])
export const Defs = createComponent(P.Defs, 'Defs')
export const Image = createComponent<ImageProps>(P.Image, 'Image', [
  'style',
  'fixed',
  'debug',
  'cache',
  'src',
  'source',
])
export const Tspan = createComponent<TspanProps>(P.Tspan, 'Tspan', ['x', 'y'])
export const Canvas = createComponent<CanvasProps>(P.Canvas, 'Canvas', [
  'style',
  'fixed',
  'debug',
  'paint',
])
export const Svg = createComponent<SvgProps>(P.Svg, 'Svg', [
  'width',
  'height',
  'viewBox',
  'preserveAspectRatio',
  'style',
])
export const SvgText = createComponent<SvgTextProps>(P.Text, 'Text', ['x', 'y'])
export const Circle = createComponent<CircleProps>(P.Circle, 'Circle', [
  'cx',
  'cy',
  'r',
])
export const Ellipse = createComponent<EllipseProps>(P.Ellipse, 'Ellipse', [
  'cx',
  'cy',
  'rx',
  'ry',
])
export const Polygon = createComponent<PolygonProps>(P.Polygon, 'Polygon', [
  'points',
])
export const Polyline = createComponent<PolylineProps>(P.Polyline, 'Polyline', [
  'points',
])
export const ClipPath = createComponent<ClipPathProps>(P.ClipPath, 'ClipPath', [
  'id',
])
export const G = createComponent<GProps>(P.G, 'G', [
  'color',
  'dominantBaseline',
  'fill',
  'fillOpacity',
  'fillRule',
  'opacity',
  'stroke',
  'strokeWidth',
  'strokeOpacity',
  'strokeLinecap',
  'strokeLinejoin',
  'strokeDasharray',
  'transform',
  'textAnchor',
  'visibility',
])
export const TextInstance = createComponent<TspanProps>(
  P.TextInstance,
  'TextInstance',
  ['x', 'y'],
)
export const LinearGradient = createComponent<LinearGradientProps>(
  P.LinearGradient,
  'LinearGradient',
  ['x1', 'x2', 'y1', 'y2'],
)
export const RadialGradient = createComponent<RadialGradientProps>(
  P.RadialGradient,
  'RadialGradient',
  ['cx', 'cy', 'fr', 'fx', 'fy'],
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
  G,
  SvgText,
  Svg,
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
