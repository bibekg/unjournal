// @flow

import styled from 'styled-components'
import { colors, fonts } from '../styles'

export default styled.textarea.attrs({
  autoFocus: 'autofocus',
})`
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
  font-size: 18px;
  font-family: ${fonts.serif}, serif;
  line-height: ${1.37 * 18}px;
  outline: none;
  resize: none;

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${colors.green};
    border-radius: 6px;
  }
`
