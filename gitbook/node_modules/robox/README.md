
# Robox

Higher-order React component for adding style helper props based on [understyle](https://github.com/jxnblk/understyle)

[![Build Status](https://travis-ci.org/jxnblk/robox.svg?branch=master)](https://travis-ci.org/jxnblk/robox)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

```sh
npm i robox
```

```js
// Example component
import React from 'react'
import Robox from 'robox'

const Button = (props) => {
  return <button {...props} />
}

export default Robox(Button)
```

```js
// Example component instance

<div>
  <Button
    m={2}
    p={2}
    onClick={e => alert('hello')}
    children='Hello' />
</div>
```

## Props

### Margin

Sets margin based on a 0–6 spacing scale array `[0, 8, 16, 32, 48, 64, 96]`

prop | type | description
-----|------|------------
`m`  | number | margin
`mt` | number | margin-top
`mr` | number | margin-right
`mb` | number | margin-bottom
`ml` | number | margin-left
`mx` | number | margin-left and margin-right
`my` | number | margin-top and margin-bottom

### Padding

Sets padding based on the same spacing scale

prop | type | description
-----|------|------------
`p`  | number | padding
`pt` | number | padding-top
`pr` | number | padding-right
`pb` | number | padding-bottom
`pl` | number | padding-left
`px` | number | padding-left and padding-right
`py` | number | padding-top and padding-bottom

### Width

Sets percentage-based width based on a 12 column grid

prop | type | description
-----|------|------------
`col`| number | 0-12

### Display

Sets display based on the prop name

prop | type
-----|------
`block`| boolean
`inlineBlock`| boolean
`inline`| boolean
`table`| boolean
`tableRow`| boolean
`tableCell`| boolean
`flex`| boolean
`inlineFlex`| boolean

### Flexbox

Sets various flexbox layout properties

prop | type | description
-----|------|------------
`wrap`    | boolean | flex-wrap: wrap
`align`   | string  | align-items
`justify` | string  | justify-content
`flexColumn`| boolean | flex-direction: column
`flexAuto`| boolean | flex: 1 1 auto
`flexNone`| boolean | flex: none
`order`   | number  | order

## Configuration

The space scale and number of grid columns can be configured through React context.

```js
// Example context configuration
class App extends React.Component {
  getChildContext () {
    return {
      robox: {
        scale: [0, 6, 12, 18, 24, 30, 36],
        columns: 16
      }
    }
  }
}

App.contextTypes = {
  robox: React.PropTypes.object
}
```


MIT License
