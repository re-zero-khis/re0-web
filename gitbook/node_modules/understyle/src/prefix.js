
// Small library-specific style prefixer for flexbox properties

const getPrefixedValue = (prop, val) => {
  try {
    const div = document.createElement('div')
    div.style[prop] = val
    return div.style[prop] === val ? val : '-webkit-' + val
  } catch (e) {
    return val
  }
}

const prefixProp = prop => prefix => prefix + prop.charAt(0).toUpperCase() + prop.slice(1)

const prefixer = (style = {}) => {
  const prefixed = {}

  for (let key in style) {
    const val = style[key]
    let webkitKey
    let msKey

    switch (key) {
      case 'flexDirection':
      case 'flexWrap':
      case 'alignItems':
      case 'justifyContent':
      case 'flex':
        webkitKey = prefixProp(key)('Webkit')
        msKey = prefixProp(key)('ms')
        prefixed[webkitKey] = val
        prefixed[msKey] = val
        prefixed[key] = val
        break
      case 'order':
        webkitKey = prefixProp(key)('Webkit')
        msKey = prefixProp(key)('msFlex')
        prefixed[webkitKey] = val
        prefixed[msKey] = val
        prefixed[key] = val
        break
      default:
        prefixed[key] = val
    }

    switch (val) {
      case 'flex':
      case 'inline-flex':
        prefixed[key] = getPrefixedValue('display', val)
        break
    }
  }

  return prefixed
}

export default prefixer

