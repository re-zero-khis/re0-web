
import React from 'react'
import Example from './Example'
import { Box } from '../..'

const Examples = ({ examples, ...props }) => (
  <Box p={3} id='examples'>
    <h2>
      <a href='#examples'
        style={{
          color: 'inherit',
          textDecoration: 'none'
        }}>
        Examples
      </a>
    </h2>
    {examples.map((e, i) => (
      <Example key={i} example={e} />
    ))}
  </Box>
)

export default Examples

