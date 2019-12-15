
# ruled

[![Build Status](https://travis-ci.org/jxnblk/ruled.svg?branch=master)](https://travis-ci.org/jxnblk/ruled)

Grid/Graph paper like CSS background gradient generator

```sh
npm i ruled
```

```js
import ruled from 'ruled'

const styles = {
  backgroundImage: ruled(),
  backgroundSize: '8px 8px'
}
```

## Options

The `ruled` function accepts one options object argument.

```js
const bg = ruled({
  size: 8, // width & height of each grid square
  strokeWidth: 1, // stroke width of each rule line
  horizontal: true, // Include horizontal rules
  vertical: true, // Include vertical rules
  color: 'rgba(0, 255, 255, .25)' // Color of rule line
})
```

MIT License

