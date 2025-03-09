# API Reference

## Document

### Props

| Prop name  |                               Description                               |                                          Type |             Default |
| ---------- | :---------------------------------------------------------------------: | --------------------------------------------: | ------------------: |
| title      |               Sets title info on the document's metadata                |                                      _String_ |         _undefined_ |
| author     |               Sets author info on the document's metadata               |                                      _String_ |         _undefined_ |
| subject    |              Sets subject info on the document's metadata               |                                      _String_ |         _undefined_ |
| keywords   |        Sets keywords associated info on the document's metadata         |                                      _String_ |         _undefined_ |
| creator    |              Sets creator info on the document's metadata               |                                      _String_ |          _"Up2You"_ |
| producer   |              Sets producer info on the document's metadata              |                                      _String_ | _"@u2y-it/vue-pdf"_ |
| pdfVersion |                 Sets PDF version for generated document                 |                                      _String_ |             _"1.3"_ |
| language   |                        Sets PDF default language                        |                                      _String_ |         _undefined_ |
| pageMode   |       Specifying how the document should be displayed when opened       |     [PageMode](./api-reference.md#pagemode-type) |           _useNone_ |
| pageLayout |        This controls how (some) PDF viewers choose to show pages        | [PageLayout](./api-reference.md#pagelayout-type) |        _singlePage_ |
| onRender   | Callback after document renders. Receives document blob argument in web |                                    _Function_ |         _undefined_ |

### PageMode type

`pageMode` prop can take one of the following values. Take into account some viewers might ignore this setting.

| Value          |                                   Description                                    |
| -------------- | :------------------------------------------------------------------------------: |
| useNone        |             Neither document bookmarks nor thumbnail images visible              |
| useOutlines    |                            Document bookmarks visible                            |
| useThumbs      |                             Thumbnail images visible                             |
| fullScreen     | Full-screen mode, with no menu bar, window controls, or any other window visible |
| useOC          |                       Optional content group panel visible                       |
| useAttachments |                            Attachments panel visible                             |

### PageLayout type

`pageLayout` prop can take one of the following values. Take into account some viewers might ignore this setting.

| Value          |                              Description                               |
| -------------- | :--------------------------------------------------------------------: |
| singlePage     |                       Display one page at a time                       |
| oneColumn      |                    Display the pages in one column                     |
| twoColumnLeft  | Display the pages in two columns, with odd numbered pages on the left  |
| twoColumnRight | Display the pages in two columns, with odd numbered pages on the right |
| twoPageLeft    |  Display the pages two at a time, with odd-numbered pages on the left  |
| twoPageRight   | Display the pages two at a time, with odd-numbered pages on the right  |

---

## Page

### Props

| Prop name   |                                                                                                        Description                                                                                                        |                                                                    Type |      Default |
| ----------- | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | ----------------------------------------------------------------------: | -----------: |
| size        | Defines page size. If _String_, must be one of the [available page sizes](https://github.com/diegomura/vue-pdf/blob/master/packages/layout/src/page/getSize.js). Height is optional, if ommited it will behave as "auto". |                                   _String_, _Array_, _Number_, _Object_ |       _"A4"_ |
| orientation |                                                                            Defines page orientation. _Valid values: "portrait" or "landscape"_                                                                            |                                                                _String_ | _"portrait"_ |
| wrap        |                                                             Enables page wrapping for this page. [See more](https://v4.react-pdf.org/advanced#page-wrapping)                                                              |                                                               _Boolean_ |       _true_ |
| style       |                                                                             Defines page styles. [See more](https://v4.react-pdf.org/styling)                                                                             |                                                       _Object_, _Array_ |  _undefined_ |
| debug       |                                                             Enables debug mode on page bounding box. [See more](https://v4.react-pdf.org/advanced#debugging)                                                              |                                                               _Boolean_ |      _false_ |
| dpi         |                                                                                      Enables setting a custom DPI for page contents.                                                                                      |                                                                _Number_ |         _72_ |
| id          |                                                                           Destination ID to be linked to. [See more](https://v4.react-pdf.org/advanced#document-navigation)                                                                            |                                                                _String_ |  _undefined_ |
| bookmark    |                                                                    Attach bookmark to element. [See more](https://v4.react-pdf.org/advanced#bookmarks)                                                                    | _String_ or [Bookmark](https://v4.react-pdf.org/advanced#bookmark-type) |  _undefined_ |

---

## View

### Props

| Prop name |                                              Description                                              |                                                                    Type |     Default |
| --------- | :---------------------------------------------------------------------------------------------------: | ----------------------------------------------------------------------: | ----------: |
| wrap      | Enable/disable page wrapping for element. [See more](https://v4.react-pdf.org/advanced#page-wrapping) |                                                               _Boolean_ |      _true_ |
| style     |                   Defines view styles. [See more](https://v4.react-pdf.org/styling)                   |                                                       _Object_, _Array_ | _undefined_ |
| render    |                                        _NOT SUPPORTED BY NOW_                                         |                                                              _Function_ | _undefined_ |
| debug     |   Enables debug mode on view bounding box. [See more](https://v4.react-pdf.org/advanced#debugging)    |                                                               _Boolean_ |     _false_ |
| fixed     |  Render component in all wrapped pages. [See more](https://v4.react-pdf.org/advanced#page-wrapping)   |                                                               _Boolean_ |     _false_ |
| id        |                 Destination ID to be linked to. [See more](https://v4.react-pdf.org/advanced#document-navigation)                  |                                                                _String_ | _undefined_ |
| bookmark  |          Attach bookmark to element. [See more](https://v4.react-pdf.org/advanced#bookmarks)          | _String_ or [Bookmark](https://v4.react-pdf.org/advanced#bookmark-type) | _undefined_ |

---

## Image

### Props

| Prop name |                                             Description                                             |                                                                    Type |     Default |
| --------- | :-------------------------------------------------------------------------------------------------: | ----------------------------------------------------------------------: | ----------: |
| src       |                   Source of the image. [See more](./api-reference.md#source-object)                    |                                                         _Source object_ | _undefined_ |
| source    |                      Alias of _src_. [See more](./api-reference.md#source-object)                      |                                                         _Source object_ | _undefined_ |
| style     |                  Defines view styles. [See more](https://v4.react-pdf.org/styling)                  |                                                       _Object_, _Array_ | _undefined_ |
| debug     |  Enables debug mode on view bounding box. [See more](https://v4.react-pdf.org/advanced#debugging)   |                                                               _Boolean_ |     _false_ |
| fixed     | Renders component in all wrapped pages. [See more](https://v4.react-pdf.org/advanced#page-wrapping) |                                                               _Boolean_ |     _false_ |
| cache     |                          Enables image caching between consecutive renders                          |                                                               _Boolean_ |      _true_ |
| bookmark  |         Attach bookmark to element. [See more](https://v4.react-pdf.org/advanced#bookmarks)         | _String_ or [Bookmark](https://v4.react-pdf.org/advanced#bookmark-type) | _undefined_ |

### Source object

Defines the source of an image. Can be in any of these four valid forms:

| Form type   |                                                             Description                                                             | Example                                                    |
| ----------- | :---------------------------------------------------------------------------------------------------------------------------------: | ---------------------------------------------------------- |
| String      |                                           Valid image URL or filesystem path (Node only)                                            | `www.vue-pdf.org/test.jpg`                                 |
| URL object  |                                       Enables to pass extra parameters on how to fetch images                                       | `{ uri: valid-url, method: 'GET', headers: {}, body: '' }` |
| Buffer      |                   Renders image directly from Buffer. Image format (png or jpg) will be guessed based on Buffer.                    | `Buffer`                                                   |
| Data buffer | Renders buffer image via the _data_ key. It's also recommended to provide the image _format_ so the engine knows how to proccess it | `{ data: Buffer, format: 'png' \| 'jpg' }`                 |
| Function    |                    A function that returns (can also return a promise that resolves to) any of the above formats                    | `() => String \| Promise<String>`                          |

---

## Text

### Props

| Prop name           |                                                   Description                                                   |                                                                    Type |     Default |
| ------------------- | :-------------------------------------------------------------------------------------------------------------: | ----------------------------------------------------------------------: | ----------: |
| wrap                |                    Enables/disables page wrapping for element. [See more](page-wrapping.md)                     |                                                               _Boolean_ |      _true_ |
| render              |                                             _NOT SUPPORTED BY NOW_                                              |                                                              _Function_ | _undefined_ |
| style               |                        Defines view styles. [See more](https://v4.react-pdf.org/styling)                        |                                                       _Object_, _Array_ | _undefined_ |
| debug               |        Enables debug mode on view bounding box. [See more](https://v4.react-pdf.org/advanced#debugging)         |                                                               _Boolean_ |     _false_ |
| fixed               |       Renders component in all wrapped pages. [See more](https://v4.react-pdf.org/advanced#page-wrapping)       |                                                               _Boolean_ |     _false_ |
| hyphenationCallback | Specify hyphenation callback at a text level. See [hypthenation](https://v4.react-pdf.org/advanced#hyphenation) |                                                              _Function_ | _undefined_ |
| id                  |                      Destination ID to be linked to. [See more](https://v4.react-pdf.org/advanced#document-navigation)                       |                                                                _String_ | _undefined_ |
| bookmark            |               Attach bookmark to element. [See more](https://v4.react-pdf.org/advanced#bookmarks)               | _String_ or [Bookmark](https://v4.react-pdf.org/advanced#bookmark-type) | _undefined_ |

---

## Link

### Props

| Prop name |                                                      Description                                                      |                                                                    Type |     Default |
| --------- | :-------------------------------------------------------------------------------------------------------------------: | ----------------------------------------------------------------------: | ----------: |
| src       | Valid URL or destination ID. ID must be prefixed with `#`. [See more](https://v4.react-pdf.org/advanced#destinations) |                                                                _String_ | _undefined_ |
| wrap      |         Enable/disable page wrapping for element. [See more](https://v4.react-pdf.org/advanced#page-wrapping)         |                                                               _Boolean_ |      _true_ |
| style     |                           Defines view styles. [See more](https://v4.react-pdf.org/styling)                           |                                                       _Object_, _Array_ | _undefined_ |
| debug     |           Enables debug mode on view bounding box. [See more](https://v4.react-pdf.org/advanced#debugging)            |                                                               _Boolean_ |     _false_ |
| fixed     |          Render component in all wrapped pages. [See more](https://v4.react-pdf.org/advanced#page-wrapping)           |                                                               _Boolean_ |     _false_ |
| bookmark  |                  Attach bookmark to element. [See more](https://v4.react-pdf.org/advanced#bookmarks)                  | _String_ or [Bookmark](https://v4.react-pdf.org/advanced#bookmark-type) | _undefined_ |

---

## Note

### Props

| Prop name |                                             Description                                             |              Type |     Default |
| --------- | :-------------------------------------------------------------------------------------------------: | ----------------: | ----------: |
| style     |                  Defines view styles. [See more](https://v4.react-pdf.org/styling)                  | _Object_, _Array_ | _undefined_ |
| children  |                                         Note string content                                         |          _String_ | _undefined_ |
| fixed     | Renders component in all wrapped pages. [See more](https://v4.react-pdf.org/advanced#page-wrapping) |         _Boolean_ |     _false_ |

---

## Canvas

### Props

| Prop name |                                             Description                                             |                                                                    Type |     Default |
| --------- | :-------------------------------------------------------------------------------------------------: | ----------------------------------------------------------------------: | ----------: |
| style     |                  Defines view styles. [See more](https://v4.react-pdf.org/styling)                  |                                                       _Object_, _Array_ | _undefined_ |
| paint     |                                          Painter function                                           |                                                              _Function_ | _undefined_ |
| debug     |  Enables debug mode on view bounding box. [See more](https://v4.react-pdf.org/advanced#debugging)   |                                                               _Boolean_ |     _false_ |
| fixed     | Renders component in all wrapped pages. [See more](https://v4.react-pdf.org/advanced#page-wrapping) |                                                               _Boolean_ |     _false_ |
| bookmark  |         Attach bookmark to element. [See more](https://v4.react-pdf.org/advanced#bookmarks)         | _String_ or [Bookmark](https://v4.react-pdf.org/advanced#bookmark-type) | _undefined_ |

vue-pdf does not check how much space your drawing takes, so make sure you always define a `width` and `height` on the `style` prop.

### Painter function

Prop used to perform drawings inside the Canvas. It takes 3 arguments:

- `Painter object`: Wrapper around _pdfkit_ drawing methods. Use this to draw inside the Canvas
- `availableWidth`: Width of the Canvas element.
- `availableHeight`: Height of the Canvas element.

### Painter object

Wrapper around _pdfkit_ methods you can use to draw inside the Canvas. All operations are chainable. For more information about how these methods work, please refer to [pdfkit documentation](http://pdfkit.org/).

Available methods:

- `dash`
- `clip`
- `save`
- `path`
- `fill`
- `font`
- `text`
- `rect`
- `scale`
- `moveTo`
- `lineTo`
- `stroke`
- `rotate`
- `circle`
- `lineCap`
- `opacity`
- `ellipse`
- `polygon`
- `restore`
- `lineJoin`
- `fontSize`
- `fillColor`
- `lineWidth`
- `translate`
- `miterLimit`
- `strokeColor`
- `fillOpacity`
- `roundedRect`
- `strokeOpacity`
- `bezierCurveTo`
- `quadraticCurveTo`
- `linearGradient`
- `radialGradient`

---

## PDFViewer

### Props

| Prop name   |                       Description                        |               Type |     Default |
| ----------- | :------------------------------------------------------: | -----------------: | ----------: |
| style       |                  Defines iframe styles                   |  _Object_, _Array_ | _undefined_ |
| className   |                Defines iframe class name                 |           _String_ | _undefined_ |
| children    |               PDF document implementation                |         _Document_ | _undefined_ |
| width       |               Width of embedded PDF iframe               | _String_, _Number_ | _undefined_ |
| height      |              Height of embedded PDF iframe               | _String_, _Number_ | _undefined_ |
| showToolbar | Render the toolbar. Supported on Chrome, Edge and Safari |          _Boolean_ |      _true_ |

Other props are passed through to the iframe.
