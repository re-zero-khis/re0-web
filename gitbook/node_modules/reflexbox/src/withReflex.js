
import React from 'react'
import Robox from 'robox'
import ruled from 'ruled'
import config from './config'

const getWidth = (props) => (matches = []) => {
  return matches.reduce((a, b) => {
    return props[b] || a
  }, props.col || null)
}

const bgGrid = ruled()

const QUERIES = Object.create(null)

function getMatchMedia (query) {
  if (!(query in QUERIES)) {
    QUERIES[query] = window.matchMedia(query)
  }

  return QUERIES[query]
}

const withReflex = ({
  listen = true
} = {}) => Comp => {
  const Base = Robox(Comp)

  class ReflexWrap extends React.Component {
    constructor () {
      super()
      this.state = {
        matches: [
          'server'
        ]
      }

      this.getBreakpoints = () => {
        const { breakpoints } = {
          ...config,
          ...this.context.reflexbox
        }
        return breakpoints
      }

      this.match = () => {
        if (this._unmounted) {
          return
        }

        const breakpoints = this.getBreakpoints()
        const matches = []

        for (let key in breakpoints) {
          const match = getMatchMedia(breakpoints[key]).matches
          if (match) {
            matches.push(key)
          }
        }

        this.setState({ matches })
      }
    }

    componentDidMount () {
      const breakpoints = this.getBreakpoints()
      this.match()

      if (listen) {
        for (let key in breakpoints) {
          getMatchMedia(breakpoints[key]).addListener(this.match)
        }
      }
    }

    componentWillUnmount () {
      this._unmounted = true

      const breakpoints = this.getBreakpoints()
      for (let key in breakpoints) {
        getMatchMedia(breakpoints[key]).removeListener(this.match)
      }
    }

    render () {
      const {
        debug,
        style,
        ...props
      } = this.props
      const { matches } = this.state
      const breakpoints = this.getBreakpoints()
      const grid = debug || (this.context.reflex ? this.context.reflex.debug : false)

      Object.keys(breakpoints).forEach((key) => {
        delete props[key]
      })

      const width = getWidth(this.props)(matches)

      const sx = grid ? {
        backgroundImage: bgGrid,
        backgroundSize: '8px 8px',
        ...style
      } : (style || null)

      // Map legacy props
      if (props.column) {
        props.flexColumn = props.column
        delete props.column
      }

      if (props.auto) {
        props.flexAuto = props.auto
        delete props.auto
      }

      return (
        <Base
          {...props}
          col={width}
          style={sx} />
      )
    }
  }

  ReflexWrap.contextTypes = {
    reflexbox: React.PropTypes.shape({
      breakpoints: React.PropTypes.object,
      debug: React.PropTypes.bool
    })
  }

  ReflexWrap.propTypes = {
    flex: React.PropTypes.bool,
    wrap: React.PropTypes.bool,
    flexColumn: React.PropTypes.bool,
    column: React.PropTypes.bool,
    align: React.PropTypes.oneOf([
      'stretch',
      'center',
      'baseline',
      'flex-start',
      'flex-end'
    ]),
    justify: React.PropTypes.oneOf([
      'center',
      'space-around',
      'space-between',
      'flex-start',
      'flex-end'
    ]),
    flexAuto: React.PropTypes.bool,
    auto: React.PropTypes.bool,
    flexNone: React.PropTypes.bool,
    order: React.PropTypes.number,
    col: React.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
    sm: React.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
    md: React.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
    lg: React.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
    is: (props, propName, componentName) => {
      if (props[propName]) {
        return new Error(
          'Warning! Deprecated prop `' + propName + '` supplied to' +
            ' `' + componentName + '`. Use the Reflex higher order component instead. https://github.com/jxnblk/reflexbox/'
        )
      }
    }
  }

  return ReflexWrap
}

export default withReflex
