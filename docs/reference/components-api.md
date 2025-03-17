---
title: Components API
outline: 2,3
---

# Components API

vue-pdf implements custom Component types that allow you to structure your PDF document.

## `<Document>`

This component represents the PDF document itself. It _must_ be the root of your tree element structure, and under no circumstances should it be used as child of another vue-pdf component. In addition, it should only have children of type `<Page />`.

- **Props**

<<< ../../src/components/index.ts#DocumentProps

## `<Page>`

Represents single page inside the PDF documents, or a subset of them if using the wrapping feature. A `<Document />` can contain as many pages as you want, but ensures not rendering a page inside any component besides Document.

- **Props**

<<< ../../src/components/index.ts#PageProps

## `<View>`

The most fundamental component for building a UI and is designed to be nested inside other views and can have 0 to many children.

- **Props**

<<< ../../src/components/index.ts#ViewProps

## `<Image>`

A Vue component for displaying network or local (Node only) JPG or PNG images, as well as base64 encoded image strings.

- **Props**

<<< ../../src/components/index.ts#ImageProps

## `<Text>`

A Vue component for displaying text. Text supports nesting of other Text or Link components to create inline styling.

- **Props**

<<< ../../src/components/index.ts#TextProps

## `<Link>`

A Vue component for displaying an hyperlink. Link’s can be nested inside a Text component, or being inside any other valid primitive.

- **Props**

<<< ../../src/components/index.ts#LinkProps

## `<Note>`

A Vue component for displaying a note annotation inside the document.

- **Props**

<<< ../../src/components/index.ts#NoteProps

## `<Canvas>`

A Vue component for freely drawing any content on the page.

- **Props**

<<< ../../src/components/index.ts#CanvasProps

## SVG

### `<Svg>`

- **Props**

<<< ../../src/components/index.ts#SvgProps

### `<SvgText>`

- **Props**

<<< ../../src/components/index.ts#SvgTextProps

### `<Tspan>`

The SVG `<Tspan />` element defines a subtext within a `<Text />` element or another `<Tspan />` element. It allows for adjustment of the style and/or position of that subtext as needed.

- **Props**

<<< ../../src/components/index.ts#TspanProps

### `<Path>`

- **Props**

<<< ../../src/components/index.ts#PathProps

### `<Rect>`

- **Props**

<<< ../../src/components/index.ts#RectProps

### `<Circle>`

- **Props**

<<< ../../src/components/index.ts#CircleProps

### `<Ellipse>`

- **Props**

<<< ../../src/components/index.ts#EllipseProps

### `<Line>`

- **Props**

<<< ../../src/components/index.ts#LineProps

### `<Polyline>`

- **Props**

<<< ../../src/components/index.ts#PolylineProps

### `<Polygon>`

- **Props**

<<< ../../src/components/index.ts#PolygonProps

### `<Stop>`

- **Props**

<<< ../../src/components/index.ts#StopProps

### `<Defs>`

No props

### `<G>`

- **Props**

<<< ../../src/components/index.ts#GProps

### `<LinearGradient>`

- **Props**

<<< ../../src/components/index.ts#LinearGradientProps

### `<RadialGradient>`

- **Props**

<<< ../../src/components/index.ts#RadialGradientProps
