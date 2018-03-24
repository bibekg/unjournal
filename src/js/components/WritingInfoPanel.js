// @flow

import * as React from 'react'
import styled from 'styled-components'
import Text from './Text'
import Button from './Button'
import { colors } from '../styles'

const WrapperDiv = styled.div`
    width: 100%;
    height: 100%;
    padding: 15px;
    background-color: ${colors.green};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

type PropsType = {
    timeLeft: number,
    onDoneClick: () => void,
    writeState: 'writing' | 'time-end' | 'done'
}

const formatTime = (ms: number): { minutes: number, seconds: number } => {
    const minutes = Math.floor(ms / (60 * 1000))
    ms %= (60 * 1000)
    const seconds = Math.floor(ms / (1000))
    ms %= (1000)
    return { minutes, seconds }
}

export default function WritingInfoPanel(props: PropsType) {

    const getTimerText = () => {
        if (props.timeLeft > 0) {
            const t = formatTime(props.timeLeft)

            if (t.minutes === 0) {
                if (t.seconds <= 10) {
                    return 'Just a few seconds left.'
                }
                return 'Less than one minute remaining.'
            } else if (t.minutes === 1) {
                return '1 minute remaining.'
            } else {
                return `${t.minutes} minutes remaining.`
            }
        } else {
            return 'Done for today. Good work!'
        }
    }

    return (
        <WrapperDiv>
            <Text bold>{getTimerText()}</Text>
            {(props.timeLeft === 0 && props.writeState !== 'done') && (
                <Button fontSize={18} onClick={props.onDoneClick}>
                    Release into digital void
                </Button>
            )}
        </WrapperDiv>

    )

    
}