// import type {
//   Bookmark,
//   HyphenationCallback,
//   Orientation,
//   PDFVersion,
//   PageLayout,
//   PageMode,
//   PageSize,
//   SVGPresentationAttributes,
//   SourceObject,
//   Style,
// } from '@react-pdf/types'

// interface Styles {
//   [key: string]: Style
// }

// interface OnRenderProps {
//   blob?: Blob
// }

// interface DocumentProps {
//   style?: Style | Style[]
//   title?: string
//   author?: string
//   subject?: string
//   creator?: string
//   keywords?: string
//   producer?: string
//   language?: string
//   creationDate?: Date
//   modificationDate?: Date
//   pdfVersion?: PDFVersion
//   pageMode?: PageMode
//   pageLayout?: PageLayout
//   onRender?: (props: OnRenderProps) => void
// }

// interface NodeProps {
//   id?: string
//   style?: Style | Style[]
//   fixed?: boolean
//   break?: boolean
//   minPresenceAhead?: number
// }

// interface PageProps extends NodeProps {
//   wrap?: boolean
//   debug?: boolean
//   size?: PageSize
//   orientation?: Orientation
//   dpi?: number
//   bookmark?: Bookmark
// }

// interface ViewProps extends NodeProps {
//   wrap?: boolean
//   debug?: boolean
//   onRender?: (props: { pageNumber: number; subPageNumber: number }) => any
// }

// interface BaseImageProps extends NodeProps {
//   debug?: boolean
//   cache?: boolean
// }

// interface ImageWithSrcProp extends BaseImageProps {
//   src: SourceObject
// }

// interface ImageWithSourceProp extends BaseImageProps {
//   source: SourceObject
// }

// type ImageProps = ImageWithSrcProp | ImageWithSourceProp

// interface TextProps extends NodeProps {
//   wrap?: boolean
//   debug?: boolean
//   onRender?: (props: {
//     pageNumber: number
//     totalPages: number
//     subPageNumber: number
//     subPageTotalPages: number
//   }) => void
//   hyphenationCallback?: HyphenationCallback
//   orphans?: number
//   widows?: number
// }

// interface SVGTextProps extends SVGPresentationAttributes {
//   style?: SVGPresentationAttributes
//   x: string | number
//   y: string | number
//   hyphenationCallback?: HyphenationCallback
// }

// interface LinkProps extends NodeProps {
//   wrap?: boolean
//   debug?: boolean
//   href?: string
//   src?: string
// }

// interface NoteProps extends NodeProps {
//   children: string
// }

// interface CanvasProps extends NodeProps {
//   debug?: boolean
//   paint: (painter: any, availableWidth: number, availableHeight: number) => null
// }

// interface SVGProps extends NodeProps, SVGPresentationAttributes {
//   debug?: boolean
//   width?: string | number
//   height?: string | number
//   viewBox?: string
//   preserveAspectRatio?: string
// }

// interface LineProps extends SVGPresentationAttributes {
//   style?: SVGPresentationAttributes
//   x1: string | number
//   x2: string | number
//   y1: string | number
//   y2: string | number
// }

// interface PolylineProps extends SVGPresentationAttributes {
//   style?: SVGPresentationAttributes
//   points: string
// }

// interface PolygonProps extends SVGPresentationAttributes {
//   style?: SVGPresentationAttributes
//   points: string
// }

// interface PathProps extends SVGPresentationAttributes {
//   style?: SVGPresentationAttributes
//   d: string
// }

// interface RectProps extends SVGPresentationAttributes {
//   style?: SVGPresentationAttributes
//   x?: string | number
//   y?: string | number
//   width: string | number
//   height: string | number
//   rx?: string | number
//   ry?: string | number
// }

// interface CircleProps extends SVGPresentationAttributes {
//   style?: SVGPresentationAttributes
//   cx?: string | number
//   cy?: string | number
//   r: string | number
// }

// interface EllipseProps extends SVGPresentationAttributes {
//   style?: SVGPresentationAttributes
//   cx?: string | number
//   cy?: string | number
//   rx: string | number
//   ry: string | number
// }

// interface TspanProps extends SVGPresentationAttributes {
//   x?: string | number
//   y?: string | number
// }

// interface GProps extends SVGPresentationAttributes {
//   style?: Style
// }

// interface StopProps {
//   offset: string | number
//   stopColor: string
//   stopOpacity?: string | number
// }

// type DefsProps = {}

// interface ClipPathProps {
//   id?: string
// }

// interface LinearGradientProps {
//   id: string
//   x1?: string | number
//   x2?: string | number
//   y1?: string | number
//   y2?: string | number
// }

// interface RadialGradientProps {
//   id: string
//   cx?: string | number
//   cy?: string | number
//   fr?: string | number
//   fx?: string | number
//   fy?: string | number
// }

// interface BlobProviderParams {
//   blob: Blob | null
//   url: string | null
//   loading: boolean
//   error: Error | null
// }

// interface BlobProviderProps {
//   document: any
//   children: (params: BlobProviderParams) => any
// }

// interface PDFViewerProps {
//   width?: number | string
//   height?: number | string
//   style?: Style | Style[]
//   className?: string
//   children?: any
//   innerRef?: any
//   showToolbar?: boolean
// }

// interface PDFDownloadLinkProps extends Omit<any, 'href'> {
//   fileName?: string
//   document: any
//   children?: any | ((params: BlobProviderParams) => any)
//   onClick?(event: any, instance: UsePDFInstance): void
// }

// interface UsePDFInstance {
//   loading: boolean
//   blob: Blob | null
//   url: string | null
//   error: string | null
// }
// export type {
//   Styles,
//   DocumentProps,
//   PageProps,
//   ViewProps,
//   ImageProps,
//   TextProps,
//   SVGTextProps,
//   LinkProps,
//   NoteProps,
//   CanvasProps,
//   SVGProps,
//   LineProps,
//   PolylineProps,
//   PolygonProps,
//   PathProps,
//   RectProps,
//   CircleProps,
//   EllipseProps,
//   TspanProps,
//   GProps,
//   StopProps,
//   DefsProps,
//   ClipPathProps,
//   LinearGradientProps,
//   RadialGradientProps,
//   BlobProviderParams,
//   BlobProviderProps,
//   PDFViewerProps,
//   PDFDownloadLinkProps,
//   UsePDFInstance,
// }
