
import React from 'react'
import { Flex, Box } from '../../src'

const Footer = () => (
  <footer>
    <Flex align='flex-end' py={3}>
      <Box auto p={3}>
        <a href='//github.com/jxnblk/reflexbox'>
          View on GitHub
        </a>
      </Box>
      <Box p={3}>
        <a href='//jxnblk.com'>Made by Jxnblk</a>
      </Box>
    </Flex>
  </footer>
)

export default Footer

