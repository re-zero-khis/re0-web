
import React from 'react'
import { withReflex, Flex, Box } from '../../src'
import CarbonAd from './CarbonAd'
import TweetButton from './TweetButton'
import GithubButton from './GithubButton'

const H1 = withReflex()('h1')

const Header = ({ description, ...props }) => {
  return (
    <header className='gray bg-blue'>
      <Flex wrap align='center' px={3} py={6}>
        <Box auto py={3}>
          <H1 auto mr={2} my={6}>
            <Flex align='baseline'>
              <Box p={2} className='caps blue bg-gray b3 border-gray'>Reflex</Box>
              <Box p={2} className='caps b3'>
                Box
              </Box>
            </Flex>
          </H1>
          <Flex align='center'>
            <TweetButton mr={2} text={description} />
            <GithubButton />
          </Flex>
        </Box>
        <CarbonAd />
      </Flex>
    </header>
  )
}

export default Header

