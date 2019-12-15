
import React from 'react'
import toJsx from 'react-element-to-jsx-string'
import { Box } from '../..'

const Example = ({ example, ...props }) => (
  <Box mb={3}>
    <Box py={2} className='Example' children={example} />
    <pre style={{ margin: 0 }} children={toJsx(example)} />
  </Box>
)

Example.propTypes = {
  example: React.PropTypes.node
}

export default Example

