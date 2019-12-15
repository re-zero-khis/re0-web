
const getProp = scale => key => x =>
  typeof x === 'number' ? { [key]: scale[x] } : null

export default getProp

