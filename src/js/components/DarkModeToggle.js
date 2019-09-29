// @flow
import * as React from 'react'
import styled from 'styled-components'
import Toggle from 'react-toggle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

const Wrapper = styled.div`
  .react-toggle-track-x,
  .react-toggle-track-check {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export default props => (
  <Wrapper>
    <Toggle
      checked={props.isDarkMode}
      onChange={props.handleChange}
      icons={{
        checked: <FontAwesomeIcon icon={faMoon} color="white" size="xs" />,
        unchecked: <FontAwesomeIcon icon={faSun} color="white" size="xs" />,
      }}
    />
  </Wrapper>
)
