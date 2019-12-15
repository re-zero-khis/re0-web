
import assign from 'object-assign'
import display from './display'
import flex from './flex'
import { setScale as marginSetScale } from './margin'
import { setScale as paddingSetScale } from './padding'
import { setColumns } from './column'

export const createUnderstyle = ({
  scale,
  columns,
  prefixed = true
} = {}) => (props) => {
  const margin = marginSetScale(scale)
  const padding = paddingSetScale(scale)
  const column = setColumns(columns)

  const style = assign({},
    {
      boxSizing: 'border-box'
    },
    display(props, { prefixed }),
    flex(props, { prefixed }),
    margin(props),
    padding(props),
    column(props)
  )

  return style
}

const understyle = createUnderstyle()

export default understyle

