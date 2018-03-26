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

const Item = styled.div`
    margin-bottom: 40px;
`

export default function AboutPage() {
    return (
        <PageWrapper>
            <Navbar theme='light' />
            {
                copy.aboutParagraphs.map(p => (
                    <Item key={p.title}>
                        <Title color={colors.green} size={36}>{p.title}</Title>
                        { p.content.map((c, i) => <Text key={i} color={colors.black}>{c}</Text>) }
                    </Item>
                ))
            }
        </PageWrapper>
    )
}