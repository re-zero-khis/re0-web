
import { breakpoints as defaultBreakpoints } from './config'

const getMatches = (breakpoints = defaultBreakpoints) => {
  const matches = []

  if (typeof window !== 'undefined') {
    for (var key in breakpoints) {
      if (window.matchMedia(breakpoints[key]).matches) {
        matches.push(key)
      }
    }
  }

  return matches
}

export default getMatches

