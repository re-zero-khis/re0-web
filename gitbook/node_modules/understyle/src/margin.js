
import assign from 'object-assign'
import getNumberProp from './get-number-prop'
import initialScale from './initial-scale'

export const setScale = (scale = initialScale) => ({
  m,
  mx,
  my,
  mt,
  mr,
  mb,
  ml,
  gutter
} = {}) => {
  const getScaledProp = getNumberProp(scale)

  const style = assign({},
    getScaledProp('margin')(m),
    getScaledProp('marginTop')(mt),
    getScaledProp('marginBottom')(mb),
    getScaledProp('marginTop')(my),
    getScaledProp('marginBottom')(my),
    getScaledProp('marginLeft')(ml),
    getScaledProp('marginRight')(mr),
    getScaledProp('marginLeft')(mx),
    getScaledProp('marginRight')(mx),

    getScaledProp('marginLeft')(-gutter),
    getScaledProp('marginRight')(-gutter)
  )

  return style
}

const margin = setScale()

export default margin

