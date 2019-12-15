
const ruled = ({
  size = 8,
  strokeWidth = 1,
  horizontal = true,
  vertical = true,
  color = 'rgba(0, 255, 255, .125)'
} = {}) => {
  const backgrounds = []

  if (horizontal) {
    backgrounds.push(`linear-gradient(transparent ${size - strokeWidth}px, ${color} ${size}px)`)
  }

  if (vertical) {
    backgrounds.push(`linear-gradient(90deg, transparent ${size - strokeWidth}px, ${color} ${size}px)`)
  }

  return backgrounds.join()
}

module.exports = ruled

