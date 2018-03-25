// @flow
import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Text from './Text'

const StyledLink = styled(Link)`
    text-decoration: none;
    cursor: pointer;
`

export default (props) => <StyledLink to='/'><Text bold size={24} color={props.color}>Unjournal</Text></StyledLink>