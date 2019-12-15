react-safe-html allows you to render user provided html (e.g. from ckeditor) safely. You choose how each element
renders and which attributes get passed through. It has defaults for basic elements and attributes but is fully customizable.

It uses a fast but flexible parser (htmlparser2) and implements shouldComponentUpdate for performance.

## status: alpha

## Install

You can install it with npm:

```sh
npm install --save react-safe-html
```

And require it:

```js
var ReactSafeHtml = require('react-safe-html');
// ...
<ReactSafeHtml html={html} />
```


## Customization

You can create a custom element set to allow.

```js
// the default allowed components
var components = ReactSafeHtml.components.makeElements({});
```

The argument is a mapping of allowed properties for all elements, for example you may pass `{style: true}` to allow
style props on all elements.

You may also pass a function which gets the attribute value and returns a tupple of `[propName, propValue]`.
This is the same as `{style: true}`: 
`{style: (theStyleString) => ['style', theStyleString]}`.

### Adding/replacing elements

You may want to add extra elements to the allowed set, or remove some.

`createSimpleElement` takes an object like the one described above.

```js
delete components.img;
components.input = ReactSafeHtml.components.createSimpleElement('input', {
  value: true,
  placeholder: true,
  'tab-index': (index) => ['tabIndex', index],
});
```

You can override the behavior for text nodes with a special component type `'#text'`.

```jsx
components['#text'] = (string) => <p>{string}</p>;
```

When you're done customizing, pass it as an extra prop to `ReactSafeHtml`.

```js
<ReactSafeHtml html={html} components={components} />
```

