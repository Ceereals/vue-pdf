---
layout: doc
---
# Components

vue-pdf implements custom Component types that allow you to structure your PDF document.

## Document

This component represents the PDF document itself. It _must_ be the root of your tree element structure, and under no circumstances should it be used as child of another vue-pdf component. In addition, it should only have children of type `<Page />`.

[API Reference for Document](../api-reference#document)

## Page

Represents single page inside the PDF documents, or a subset of them if using the wrapping feature. A `<Document />` can contain as many pages as you want, but ensures not rendering a page inside any component besides Document.

[API Reference for Page](../api-reference#page)

## View

The most fundamental component for building a UI and is designed to be nested inside other views and can have 0 to many children.

[API Reference for View](../api-reference#view)

## Image

A Vue component for displaying network or local (Node only) JPG or PNG images, as well as base64 encoded image strings.

[API Reference for Image](../api-reference#image)

## Text

A Vue component for displaying text. Text supports nesting of other Text or Link components to create inline styling.

[API Reference for Text](../api-reference#text)

## Link

A Vue component for displaying an hyperlink. Link’s can be nested inside a Text component, or being inside any other valid primitive.

[API Reference for Link](../api-reference#link)

## Note

A Vue component for displaying a note annotation inside the document.

[API Reference for Note](../api-reference#note)

## Canvas

A Vue component for freely drawing any content on the page.

[API Reference for Canvas](../api-reference#canvas)

## PDFViewer `Web only` {#pdfviewer}

Iframe PDF viewer for client-side generated documents.

[API Reference for PDFViewer](../api-reference#pdfviewer)
