
import assign from 'object-assign'
import getNumberProp from './get-number-prop'
import initialScale from './initial-scale'

export const setScale = (scale = initialScale) => ({
  p,
  px,
  py,
  pt,
  pr,
  pb,
  pl
} = {}) => {
  const getScaledProp = getNumberProp(scale)

  const style = assign({},
    getScaledProp('padding')(p),
    getScaledProp('paddingTop')(pt),
    getScaledProp('paddingBottom')(pb),
    getScaledProp('paddingTop')(py),
    getScaledProp('paddingBottom')(py),
    getScaledProp('paddingLeft')(pl),
    getScaledProp('paddingRight')(pr),
    getScaledProp('paddingLeft')(px),
    getScaledProp('paddingRight')(px)
  )

  return style
}

const padding = setScale()

export default padding

