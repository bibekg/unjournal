// @flow

import * as React from 'react'
import styled from 'styled-components'
import { colors } from '../styles'

export default styled.button`
    border-radius: 3px;
    border: none;
    background-color: ${colors.purple};
    color: ${colors.white};
    padding: 10px 30px;
    font-size: ${props => (props.fontSize || 18)}px;
    cursor: pointer;
`