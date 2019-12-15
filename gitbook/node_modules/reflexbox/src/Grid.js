
import React from 'react'
import withReflex from './withReflex'

const Base = withReflex()('div')

const Grid = ({
  align,
  className,
  style,
  ...props
}) => {
  const cx = 'Grid' + (className ? ' ' + className : '')
  const sx = {
    verticalAlign: align,
    ...style
  }

  return <Base inlineBlock {...props} style={sx} className={cx} />
}

Grid.propTypes = {
  align: React.PropTypes.oneOf([
    'top',
    'middle',
    'bottom',
    'baseline'
  ])
}

Grid.defaultProps = {
  align: 'top'
}

export default Grid

