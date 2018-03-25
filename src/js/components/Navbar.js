// @flow

import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Logo from './Logo'
import Text from './Text'
import { colors } from '../styles'

const NavbarDiv = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
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

type PropsType = {
    theme: 'light' | 'dark'
}

export default function Navbar(props: PropsType) {
    const textColor = {
        'light': colors.green,
        'dark': colors.white
    }[props.theme]

    return (
        <NavbarDiv>
            <Logo color={textColor}/>
            <NavItems>
                <Link to='/about'>
                    <Text bold color={textColor}>About</Text>
                </Link>
            </NavItems>
        </NavbarDiv>
    )
}

Navbar.defaultProps = {
    theme: 'light'
}