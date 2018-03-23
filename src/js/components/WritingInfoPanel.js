// @flow

import * as React from 'react'
import styled from 'styled-components'
import Text from './Text'
import { colors } from '../styles'

const WrapperDiv = styled.div`
    width: 100%;
    height: 100%;
    padding: 15px;
    background-color: ${colors.green};
    display: flex;
    justify-content: center;
    align-items: center;
`

type PropsType = {
    timeLeft: number
}

const formatTime = (ms: number): { minutes: number, seconds: number } => {
    const minutes = Math.floor(ms / (60 * 1000))
    ms %= (60 * 1000)
    const seconds = Math.floor(ms / (1000))
    ms %= (1000)
    return { minutes, seconds }
}

export default function WritingInfoPanel(props: PropsType) {

    if (props.timeLeft > 0) {

        const t = formatTime(props.timeLeft)

        let timeText
        if (t.minutes === 0) {
            timeText = `${t.seconds} seconds remaining`
        } else if (t.minutes === 1) {
            timeText = `1 minute, ${t.seconds} seconds remaining`
        } else {
            timeText = `${t.minutes} minutes remaining`
        }

        return (
            <WrapperDiv>
                <Text bold>{timeText}</Text>
            </WrapperDiv>
        )
    } else {
        return (
            <WrapperDiv>
                <Text bold>You're done! See you back here tomorrow.</Text>
            </WrapperDiv>
        )
    }
}