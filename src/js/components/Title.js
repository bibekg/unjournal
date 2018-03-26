// @flow

import styled from 'styled-components'
import Text from './Text'
import { colors, fonts } from '../styles'

export default Text.withComponent('h1').extend.attrs({
  size: props => props.size || 48
})`
  font-weight: bold;
`