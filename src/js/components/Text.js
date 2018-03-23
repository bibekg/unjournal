// @flow

import styled from 'styled-components'
import { colors } from '../styles'

export default styled.p`
    font-size: ${props => props.size ? props.size : 14}px;
    font-weight: ${props => props.bold ? 400 : 300};
    line-height: ${props => (14 * (props.paragraph ? 2.0 : 1.37))}px;
    color: ${props => props.color ? props.color : colors.white};
    ${props => props.center && 'text-align: center;'}
    letter-spacing: 0.8px;
    margin: 5px 0;
`