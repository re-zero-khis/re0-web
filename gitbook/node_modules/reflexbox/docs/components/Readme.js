
import React from 'react'
import cxs from 'cxs'
import readme from '../../README.md'
import { Box } from '../..'
import { colors } from './style'

const Readme = () => {
  const cx = cxs({
    maxWidth: 640,
    h1: {
      margin: 0
    },
    h2: {
      marginTop: 32,
      marginBottom: 0
    },
    h3: {
      marginTop: 32,
      marginBottom: 0
    },
    h4: {
      marginTop: 32,
      marginBottom: 0
    },
    ul: {
      marginTop: 0
    },
    p: {
      marginTop: 0,
      ':first-of-type': {
        fontSize: 20,
        fontWeight: 600
      },
      ':last-of-type': {
        display: 'none'
      }
    },
    a: {
      color: 'inherit',
      fontWeight: 600
    },
    'code:not(pre code)': {
      fontFamily: 'Menlo, monospace',
      fontSize: 14,
      fontWeight: 600
    },
    pre: {
      fontFamily: 'Menlo, monospace',
      fontSize: 14,
      overflowX: 'scroll',
      padding: 16,
      backgroundColor: colors.gray,
      borderRadius: 1
    },

    img: {
      WebkitFilter: 'hue-rotate(100deg)',
      filter: 'hue-rotate(100deg)'
    }
  })
  return (
    <Box p={3}>
      <div
        className={cx}
        dangerouslySetInnerHTML={{ __html: readme }} />
    </Box>
  )
}

export default Readme

