// @flow

import styled from 'styled-components'
import Text from './Text'
import { colors, fonts, breakpoints } from '../styles'

export default styled.h1`
  font-weight: bold;
  color: ${colors.cream};

  @media screen and (min-width: ${breakpoints.mobile}px) {
    font-size: 48px;
  }

  @media screen and (max-width: ${breakpoints.mobile - 1}px) {
    font-size: 24px;
  }
`