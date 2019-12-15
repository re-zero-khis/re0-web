
import React from 'react'
import withReflex from './withReflex'

const Base = withReflex()('div')

const Flex = ({ className, ...props }) => {
  const cx = 'Flex' + (className ? ' ' + className : '')

  return <Base {...props} flex className={cx} />
}

const responsivePropCheck = (props, propName, componentName) => {
  if (typeof props[propName] === 'boolean') {
    return new Error(
      `Warning! The \`${propName}\` prop supplied to \`${componentName}\` now sets width instead of setting display flex. See https://github.com/jxnblk/reflexbox`
    )
  }
}

Flex.propTypes = {
  sm: responsivePropCheck,
  md: responsivePropCheck,
  lg: responsivePropCheck
}

export default Flex

