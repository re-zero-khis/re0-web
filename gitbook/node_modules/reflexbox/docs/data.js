
import React from 'react'
import { Flex, Box, Grid } from '../src'

Flex.displayName = 'Flex'
Box.displayName = 'Box'

const examples = [
  <Flex wrap>
    <Box col={12} sm={6} lg={3}>Box</Box>
    <Box col={12} sm={6} lg={3}>Box</Box>
    <Box col={12} sm={6} lg={3}>Box</Box>
    <Box col={12} sm={6} lg={3}>Box</Box>
  </Flex>,
  <Flex>
    <Box children='Box' />
    <Box children='Box' />
    <Box children='Box' />
  </Flex>,
  <Flex align='center'>
    <Box p={1} children='Box p 1' />
    <Box p={2} children='Box p 2' />
    <Box p={3} children='Box p 3' />
    <Box p={4} children='Box p 4' />
  </Flex>,
  <Flex
    debug
    align='center'
    justify='space-between'>
    <Box px={4} children='Box px 4' />
    <Box py={4} children='Box py 4' />
    <Box pt={4} children='Box pt 4' />
    <Box pb={4} children='Box pb 4' />
    <Box pl={4} children='Box pl 4' />
    <Box pr={4} children='Box pr 4' />
  </Flex>,
  <Flex align='center' justify='space-between'>
    <Box auto p={3} children='Box auto' />
    <Box p={3} children='Box' />
  </Flex>,
  <Flex align='center'>
    <Box auto p={3} children='Box auto' />
    <Box auto p={3} children='Box auto' />
    <Box auto p={3} children='Box auto' />
  </Flex>,
  <Flex align='center'
    justify='space-between'
    gutter={3}>
    <Box col={6} p={3} children='Box col 6' />
    <Box col={6} p={3} children='Box col 6' />
  </Flex>,
  <Flex align='center'
    justify='space-between'
    gutter={2}
    wrap>
    <Box col={4} p={2} children='Box col 4' />
    <Box col={4} p={2} children='Box col 4' />
    <Box col={4} p={2} children='Box col 4' />
    <Box col={3} p={2} children='Box col 3' />
    <Box col={3} p={2} children='Box col 3' />
    <Box col={3} p={2} children='Box col 3' />
    <Box col={3} p={2} children='Box col 3' />
    <Box col={2} p={2} children='Box col 2' />
    <Box col={2} p={2} children='Box col 2' />
    <Box col={2} p={2} children='Box col 2' />
    <Box col={2} p={2} children='Box col 2' />
    <Box col={2} p={2} children='Box col 2' />
    <Box col={2} p={2} children='Box col 2' />
  </Flex>,
  <Flex align='stretch'>
    <Box px={3}>
      <h1 className='m0'>Stretch</h1>
    </Box>
    <Box p={3} children='Box' />
  </Flex>,
  <Flex align='center'>
    <Box px={3}>
      <h1 className='m0'>Center</h1>
    </Box>
    <Box p={3} children='Box' />
  </Flex>,
  <Flex align='baseline'>
    <Box px={3}>
      <h1 className='m0'>Baseline</h1>
    </Box>
    <Box p={3} children='Box' />
  </Flex>,
  <Flex align='flex-start'>
    <Box px={3}>
      <h1 className='m0'>Flex Start</h1>
    </Box>
    <Box p={3} children='Box' />
  </Flex>,
  <Flex align='flex-end'>
    <Box px={3}>
      <h1 className='m0'>Flex End</h1>
    </Box>
    <Box p={3} children='Box' />
  </Flex>,
  <Flex justify='center' align='center'>
    <Box p={3} children='Box' />
    <Box px={3}>
      <h1 className='m0'>Center</h1>
    </Box>
    <Box p={3} children='Box' />
  </Flex>,
  <Flex justify='space-around' align='center'>
    <Box p={3} children='Box' />
    <Box px={3}>
      <h1 className='m0'>Space Around</h1>
    </Box>
    <Box p={3} children='Box' />
  </Flex>,
  <Flex justify='space-between' align='center'>
    <Box p={3} children='Box' />
    <Box px={3}>
      <h1 className='m0'>Space Between</h1>
    </Box>
    <Box p={3} children='Box' />
  </Flex>,
  <Flex justify='flex-start' align='center'>
    <Box p={3} children='Box' />
    <Box px={3}>
      <h1 className='m0'>Flex Start</h1>
    </Box>
    <Box p={3} children='Box' />
  </Flex>,
  <Flex justify='flex-end' align='center'>
    <Box p={3} children='Box' />
    <Box px={3}>
      <h1 className='m0'>Flex End</h1>
    </Box>
    <Box p={3} children='Box' />
  </Flex>,
  <Flex column>
    <Box p={3}>
      <h1 className='m0'>Column</h1>
    </Box>
    <Box p={3} children='Box' />
    <Box p={3} children='Box' />
  </Flex>,
  <Flex wrap>
    <Box p={3} col={6}>
      <h1 className='m0'>Wrap</h1>
    </Box>
    <Box p={3} col={6} children='Box' />
    <Box p={3} col={6} children='Box' />
    <Box p={3} col={6} children='Box' />
  </Flex>,
  <Flex wrap>
    <Box p={3} col={6} sm={4} md={3} children='Box' />
    <Box p={3} col={6} sm={4} md={3} children='Box' />
    <Box p={3} col={6} sm={4} md={3} children='Box' />
  </Flex>,
  <div>
    <Grid col={4} p={2}>
      <h3>Inline Block Grid</h3>
    </Grid>
    <Grid col={4} p={2}>Grid</Grid>
    <Grid col={4} p={2}>Grid</Grid>
  </div>
]

const data = {
  title: 'reflexbox',
  href: 'http://jxnblk.com/reflexbox',
  description: 'Responsive React flexbox grid system higher order component',
  links: [
    {
      href: 'https://npmjs.com/package/reflexbox',
      children: 'npm'
    },
    {
      href: 'https://github.com/jxnblk/reflexbox',
      children: 'GitHub'
    }
  ],
  examples
}

module.exports = data

