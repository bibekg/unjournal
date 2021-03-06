import { css } from 'styled-components'

export const sizes = {
  xl: 1200,
  lg: 992,
  md: 768,
  sm: 576,
}

// Iterate through the sizes and create a media template
// which can then be used like
// media.medium`
//   WRITE CSS HERE
// `
const breakpoints = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `

  return acc
}, {})

export default breakpoints
