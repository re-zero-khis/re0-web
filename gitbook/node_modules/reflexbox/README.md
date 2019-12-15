
# Reflexbox

Responsive React flexbox grid system higher order component

[![Build Status](https://travis-ci.org/jxnblk/reflexbox.svg?branch=master)](https://travis-ci.org/jxnblk/reflexbox)
[![Code Climate](https://codeclimate.com/github/jxnblk/reflexbox/badges/gpa.svg)](https://codeclimate.com/github/jxnblk/reflexbox)
[![npm version](https://badge.fury.io/js/reflexbox.svg)](https://badge.fury.io/js/reflexbox)

## Features
- Uses inline-styles - no CSS dependencies or leaky global styles
- Simple API for quickly controlling layout
- Add layout capabilities to **any** component
- Helps promote composability and separation of concerns

## Getting Started

```
npm install reflexbox
```

```js
// Higher order component example
import React from 'react'
import { withReflex } from 'reflexbox'

const Button = (props) => {
  return <button {...props} />
}

export default withReflex()(Button)
```

```js
const App = () => {
  return (
    <div>
      <Button
        flex
        p={2}
        col={12}
        align='center'
        justify='space-between'>
        <span>Flex</span>
        <span>Button</span>
      </Button>
    </div>
  )
}
```

Usage with the Flex and Box components:

```js
// Basic component example
import React from 'react'
import { Flex, Box } from 'reflexbox'

class Component extends React.Component {
  render() {
    return (
      <Flex p={2} align='center'>
        <Box px={2}>Box A</Box>
        <Box px={2} flexAuto>Box B</Box>
      </Flex>
    )
  }
}
```

## API

Reflexbox is composed of a higher order component and three React components.

## withReflex

Higher order component that accepts several layout style helper props
that can handle virtually any layout composition.

### Props

- `col` (number 0–12) Sets width based on a 12 column grid.
- `sm` (number 0-12) Sets width from the `sm` breakpoint and up.
- `md` (number 0-12) Sets width from the `md` breakpoint and up.
- `lg` (number 0-12) Sets width from the `lg` breakpoint and up.
- `align` (string) Sets `align-items`
- `justify` (string) Sets `justify-content`
- `wrap` (boolean) Sets `flex-wrap: wrap`
- `flexColumn` (boolean) Sets `flex-direction: column`
- `flexAuto` (boolean) Sets `flex: 1 1 auto`
- `flex` (boolean) Sets `display: flex`
- `order` (boolean) Sets `order`

Components wrapped with the withReflex higher order component accept several layout props from
the [Robox](https://github.com/jxnblk/robox) higher order component, including the following:

- `gutter` (number) Sets negative left and right margin to compensate for child element padding.
- `m` (number) Sets margin based on a scale from 0–6.
- `mx` (number) Sets x-axis margin based on a scale from 0–6.
- `my` (number) Sets y-axis margin based on a scale from 0–6.
- `mt` (number) Sets margin-top based on a scale from 0–6.
- `mb` (number) Sets margin-bottom based on a scale from 0–6.
- `ml` (number) Sets margin-left based on a scale from 0–6.
- `mr` (number) Sets margin-right based on a scale from 0–6.
- `p` (number) Sets padding based on a scale from 0–6.
- `px` (number) Sets x-axis padding based on a scale from 0–6.
- `py` (number) Sets y-axis padding based on a scale from 0–6.
- `pt` (number) Sets padding-top based on a scale from 0–6.
- `pb` (number) Sets padding-bottom based on a scale from 0–6.
- `pl` (number) Sets padding-left based on a scale from 0–6.
- `pr` (number) Sets padding-right based on a scale from 0–6.

## Flex and Box components

The Flex and Box components are created with the withReflex component and use the same set of props.
They are intended to help with the readability of code and
to provide some backwards compatiblity with previous versions
of Reflexbox.
The only difference between the two is that the Flex component has `flex` prop set to true to set `display: flex`.

## Grid component

The Grid component is also based on the withReflex component, but sets display inline-block for use as a more widely supported page layout component. It also includes an `align` prop to set vertical alignment.

```js
<div>
  <Grid col={6} px={2}>
    Left column
  </Grid>
  <Grid col={6} px={2}>
    Right column
  </Grid>
</div>
```

## Update on window resize

By default, Reflexbox listens to `window.matchMedia` for the configured breakpoints.
To disable this, pass an options object to the `withReflex` higher-order component.

```js
const Box = withReflex({
  listen: false
})(MyComponent)
```

## Configuration

Values for the breakpoints can be configured with
[React Context](https://facebook.github.io/react/docs/context.html).

To configure reflexbox, add `childContextTypes` and `getChildContext` to a container component.

```js
class App extends React.Component {
  static childContextTypes = {
    reflexbox: React.PropTypes.object
  }

  getChildContext () {
    return {
      reflexbox: {
        breakpoints: {
          sm: '(min-width: 30em)',
          md: '(min-width: 48em)',
          lg: '(min-width: 60em)'
        }
      }
    }
  }

  render () {
    return (
      <Flex gutter={2}>
        <Box sm={6} md={3}>Box</Box>
        <Box sm={6} md={3}>Box</Box>
        <Box sm={6} md={3}>Box</Box>
        <Box sm={6} md={3}>Box</Box>
      </Flex>
    )
  }
}
```

## Debug Mode

To show an 8 ⨉ 8px background grid for layout debugging, add the following to the context object:

```js
getChildContext () {
  return {
    reflexbox: {
      debug: true
    }
  }
}
```

---

### Related

- [Rebass](http://jxnblk.com/rebass)
- [Reline](http://jxnblk.com/reline)
- [Robox](http://jxnblk.com/robox)
- [understyle](http://jxnblk.com/understyle)
- [Gx](http://jxnblk.com/gx)

[MIT License](.github/LICENSE.md)

