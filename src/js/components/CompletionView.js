// @flow

import * as React from 'react'
import styled from 'styled-components'
import Title from './Title'
import Text from './Text'
import { colors } from '../styles'

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${colors.green};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export default function() {
    return (
        <Wrapper>
            <Title>Great writing session today.</Title>
            <Text bold center>I hope you were able to get some things off your mind.</Text>
        </Wrapper>
    )
}