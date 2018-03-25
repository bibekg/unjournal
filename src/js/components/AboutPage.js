// @flow

import * as React from 'react'
import styled from 'styled-components'
import Title from './Title'
import Text from './Text'
import Navbar from './Navbar'
import { colors } from '../styles'
import copy from '../copy'

const PageWrapper = styled.div`
    background-color: ${colors.cream};
    width: 100%;
    height: 100%;

    padding: 10%;
`

export default function AboutPage() {
    return (
        <PageWrapper>
            <Navbar theme='light' />
            <Title color={colors.green}>{'What is Unjournal?'}</Title>
            <Text bold color={colors.black}>
                {copy.whatIsUnjournal}
            </Text>

            <Title color={colors.green}>{'How do I use it?'}</Title>
            <Text bold color={colors.black}>
                {copy.howToUse}
            </Text>
        </PageWrapper>
    )
}