
const getNumberProp = scale => key => x => {
  if (x === 'auto') {
    return {
      [key]: 'auto'
    }
  }
  const multiplier = x < 0 ? -1 : 1
  x = Math.abs(x)

  if (!Number.isInteger(x) || typeof scale[x] === 'undefined') {
    return null
  }

  return {
    [key]: scale[x] * multiplier
  }
}

export default getNumberProp

