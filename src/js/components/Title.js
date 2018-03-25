// @flow

import styled from 'styled-components'
import { colors } from '../styles'

export default styled.h1`
  font-size: ${props => ((props.sizeDelta || 1.0) * 48)}px;
  font-weight: 400;
  color: ${props => props.color ? props.color : colors.cream};
  text-align: ${props => props.center ? 'center': 'left'};
  text-decoration: ${props => props.underline ? 'underline' : 'none'};
  @media (max-width: 700px) {
    font-size: 20px;
  }
`