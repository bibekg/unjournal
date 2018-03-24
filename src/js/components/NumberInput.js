// @flow

import * as React from 'react'
import styled from 'styled-components'
import { colors, fonts } from '../styles'
import { placeholderMixin } from '../styles/mixins'

const InputElement = styled.input`
  width: ${props => props.width ? `${props.width}px` : '100%'};
  padding: 10px 5px 0px 5px;
  margin-bottom: 30px;
  background-color: transparent;
  text-align: center;
  border: none;
  border-bottom: 4px solid ${colors.cream};
  color: ${colors.cream};
  outline: none;
  font-size: 64px;

  &::placeholder {
    color: rgba(0,0,0,0.5);
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
  }
  -moz-appearance: textfield;

  ${placeholderMixin}
`

type PropsType = {
  value: number,
  onChange: (number) => void
}

export default function(props: PropsType) {
  return (
    <InputElement
      type='number'
      min={0}
      width={props.width}
      value={props.value}
      onChange={props.onChange}
    />
  )
}
