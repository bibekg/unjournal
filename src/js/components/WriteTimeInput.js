// @flow

import * as React from 'react'
import styled from 'styled-components'
import { colors, fonts, breakpoints } from '../styles'
import { placeholderMixin } from '../styles/mixins'

const InputElement = styled.input`
  width: ${props => (props.width ? `${props.width}px` : '100%')};
  padding: 10px 5px 0px 5px;
  margin-bottom: 30px;
  background-color: transparent;
  text-align: center;
  border: none;
  border-radius: 0;
  border-bottom: 4px solid ${colors.cream};
  color: ${colors.cream};
  outline: none;

  font-size: 36px;
  ${breakpoints.md`
    font-size: 48px;
  `}

  ::selection {
    background-color: ${colors.cream};
    color: ${colors.black};
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
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
  innerRef: (?HTMLInputElement) => void,
  value: number,
  onChange: number => void,
  onEnterPress: () => void,
}

export default function WriteTimeInput(props: PropsType) {
  const checkForEnter = (event: SyntheticEvent<*>) => {
    if (event.key === 'Enter') {
      props.onEnterPress()
    }
  }

  return (
    <InputElement
      type="number"
      autofocus="autofocus"
      min={1}
      max={99}
      innerRef={props.innerRef}
      width={props.width}
      value={props.value}
      onChange={props.onChange}
      onKeyDown={checkForEnter}
    />
  )
}

WriteTimeInput.defaultProps = {
  innerRef: () => {},
}
