// @flow

import * as React from 'react'
import styled from 'styled-components'
import Text from './Text'
import Button from './Button'
import TimeLeftBar from './TimeLeftBar'
import { colors } from '../styles'

const WrapperDiv = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    opacity: ${props => props.show ? 1.0 : 0.0};
    height: ${props => props.useFullScreen ? '100%' : '100px'};
    transition: 0.5s ease all;
`

const TimeLeftBarWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
`

const COMPLETION_BANNER_HEIGHT = 100
const CompletionBanner = styled.div`
    position: absolute;
    top: ${props => props.show ? 0 : -COMPLETION_BANNER_HEIGHT}px;
    width: 100vw;
    height: ${COMPLETION_BANNER_HEIGHT}px;
    transition: 0.5s ease top;

    background-color: ${colors.green};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const BannerButtons = styled.div`
    display: flex;
    align-items: center;
    & > * {
        margin: 0px 5px;
    }
`

type PropsType = {
    totalTime: number,
    timeLeft: number,
    onDoneClick: () => void,
    onWriteMoreClick: () => void,
    showHUD: boolean
}

export default function WritingHUD(props: PropsType) {
    const { showHUD, totalTime, timeLeft, onDoneClick, onWriteMoreClick } = props

    return (
        <WrapperDiv show={showHUD}>
            <TimeLeftBarWrapper>
                <TimeLeftBar totalTime={totalTime} timeLeft={timeLeft} />
            </TimeLeftBarWrapper>
            <CompletionBanner show={timeLeft === 0}>
                <Text bold>Time's up. Ready to release your words into the digital void?</Text>
                <BannerButtons>
                    <Button onClick={onDoneClick}>Yes</Button>
                    <Button onClick={onWriteMoreClick}>Not yet</Button>
                </BannerButtons>
            </CompletionBanner>
        </WrapperDiv>

    )

    
}