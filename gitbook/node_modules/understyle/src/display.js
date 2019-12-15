
import assign from 'object-assign'
import prefix from './prefix'

const kebab = str => str.replace(/([A-Z])/g, g => '-' + g.toLowerCase())

const display = ({
  block,
  inlineBlock,
  inline,
  table,
  tableRow,
  tableCell,
  flex,
  inlineFlex
} = {}, {
  prefixed = true
} = {}) => {
  const props = {
    block,
    inlineBlock,
    inline,
    table,
    tableRow,
    tableCell,
    flex,
    inlineFlex
  }
  const key = Object.keys(props).reduce((a, b) => {
    return a || (props[b] === true ? b : null)
  }, null)

  if (!key) {
    return null
  }

  const val = kebab(key)

  const style = assign({}, {
    display: val
  })

  return prefixed ? prefix(style) : style
}

export default display

