// @flow

import * as React from 'react'
import styled from 'styled-components'
import { colors } from '../styles'

export default styled.button`
    border-radius: 10px;
    border: none;
    background-color: ${colors.purple};
    color: ${colors.white};
    padding: 10px 30px;
    font-size: 48px;
    cursor: pointer;
`