
import React from 'react'
import withReflex from './withReflex'

const Base = withReflex()('div')

const Box = ({ className, ...props }) => {
  const cx = 'Box' + (className ? ' ' + className : '')

  return <Base {...props} className={cx} />
}

export default Box

