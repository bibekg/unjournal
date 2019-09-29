// @flow

import * as React from 'react'
import { Link } from 'react-router-dom'
import styled, { withTheme } from 'styled-components'
import Logo from './Logo'
import Text from './Text'
import { colors } from '../styles'

const NavbarDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  padding: 10px 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const NavItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  & > * {
    text-decoration: none;
    cursor: pointer;
  }
`

function Navbar(props: PropsType) {
  return (
    <NavbarDiv color={props.theme.navbar.background}>
      <Logo color={props.theme.navbar.text} />
      <NavItems>
        <Link to="/about">
          <Text bold color={props.theme.navbar.text}>
            About
          </Text>
        </Link>
      </NavItems>
    </NavbarDiv>
  )
}

Navbar.defaultProps = {
  theme: 'light',
}

export default withTheme(Navbar)
