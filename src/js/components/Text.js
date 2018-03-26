// @flow

import styled from 'styled-components'
import { colors, fonts } from '../styles'

const getSize = props => props.size ? props.size : 14

export default styled.p`
    font-size: ${getSize}px;
    font-weight: ${props => props.bold ? 'bold' : 'normal'};
    line-height: ${props => (getSize(props) * (props.paragraph ? 2.0 : 1.37))}px;
    color: ${props => props.color ? props.color : colors.cream};
    ${props => props.center && 'text-align: center;'}
    text-decoration: ${props => props.underline ? 'underline' : 'none'};
    cursor: ${props => props.pointer ? 'pointer' : 'inherit'};
    text-align: ${props => props.center ? 'center' : 'inherit'};
    margin: 5px 0;
    font-family: ${props => props.serif ? `${fonts.serif}, serif` : `${fonts['sans-serif']}, sans-serif`};
    font-style: ${props => props.italic ? 'italic' : 'normal'};
`