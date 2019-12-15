
# understyle

Functional style utilities for authoring JavaScript style objects

[![Build Status](https://travis-ci.org/jxnblk/understyle.svg?branch=master)](https://travis-ci.org/jxnblk/understyle)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)


```sh
npm i understyle
```

```js
// Example
import _style from 'understyle'

const style = _style({
  m: 2,
  flex: true
})

// { margin: 16, display: 'flex' }
```

```js
// Individual modules
import { margin, padding } from 'understyle'

const style = {
  ...margin({ m: 2 }),
  ...padding({ p: 2 })
}

// { margin: 16, padding: 16 }
```

### Usage in React

Understyle is intended for use in functional component-based UI systems, like React.

```js
// Example component
import React from 'react'
import _style from 'understyle'

const MyComponent = ({ children, ...props }) => {
  const style = {
    ..._style(props),
    color: 'tomato'
  }

  return <div style={style}>{children}</div>
}

export default MyComponent
```

```js
// Example component instance
return (
  <div>
    <MyComponent p={2} mb={4}>
      Hello
    </MyComponent>
  </div>
)
```

## Functions

Each function accepts its own unique set of shorthand options to create style objects

### `margin`

```js
import { margin } from 'understyle'
const style = margin({ m: 1 })
// { margin: 8 }
```

Each option should be a number from 0–6, which will return a value based on a spacing scale
array `[0, 8, 16, 32, 48, 64, 96]`.
Negative numbers return negative values, and `'auto'` will return `margin: auto`.

Props:
- `m`: `margin`
- `mt`: `marginTop`
- `mr`: `marginRight`
- `mb`: `marginBottom`
- `ml`: `marginLeft`
- `mx`: `marginLeft` & `marginRight`
- `my`: `marginTop` & `marginBottom`
- `gutter`: negative `marginLeft` & `marginRight`

### `padding`

Padding uses the same spacing scale array

```js
import { padding } from 'understyle'
const style = padding({ p: 1 })
// { padding: 8 }
```

Props:
- `p`: `padding`
- `pt`: `paddingTop`
- `pr`: `paddingRight`
- `pb`: `paddingBottom`
- `pl`: `paddingLeft`
- `px`: `paddingLeft` & `paddingRight`
- `py`: `paddingTop` & `paddingBottom`

### `column`

```js
import { column } from 'understyle'
const style = column({ col: 6 })
// { width: '50%' }
```

The `col` option should be a number from 1–12 to return a percentage-based width based on a 12 column grid.

### `display`

```js
import { display } from 'understyle'
const style = display({ inlineBlock: true })
// { display: 'inline-block' }
```

Each display option should be a boolean.

Props:
- `block`
- `inlineBlock`
- `inline`
- `table`
- `tableRow`
- `tableCell`
- `flex`
- `inlineFlex`

### `flex`

```js
import { flex } from 'understyle'
const style = flex({
  align: 'center',
  justify: 'center'
})
// { alignItems: 'center', justifyContent: 'center' }
```

The flex options are a mix of booleans and strings to set various flexbox style properties.

Props:
- `wrap` boolean - sets `flexWrap: 'wrap'`
- `align` string - sets `alignItems`
- `justify` string - sets `justifyContent`
- `flexColumn` boolean - sets `flexDirection: 'column'`
- `flexAuto` boolean - sets `flex: '1 1 auto'`
- `flexNone` boolean - sets `flex: 'none'`

MIT License
