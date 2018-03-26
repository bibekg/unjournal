// @flow

import * as React from 'react'
import styled from 'styled-components'
import Text from './Text'
import Button from './Button'
import { colors } from '../styles'

const WrapperDiv = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    opacity: ${props => props.show ? 1.0 : 0.0};
    height: ${props => props.useFullScreen ? '100%' : '100px'};
    transition: 0.5s ease all;
`

const TimeLeftBar = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 5px;
    display: flex;
    align-items: flex-start;
`

const RemainingTimeBar = styled.div`
    height: 100%;
    background-color: ${colors.green};
    width: ${props => 100 * props.remainingPercentage}%;
    transition: 0.5s ease width;
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
            <TimeLeftBar>
                <RemainingTimeBar remainingPercentage={timeLeft / totalTime} />
            </TimeLeftBar>
            {/* 
                Only render the completion banner near the end so that the buttons don't render in the DOM
                This prevents the user from accidentally pressing tab and selecting the button
                Need to render a little before 0 so that it animates open though
             */}
            { timeLeft < 500 && (
                <CompletionBanner show={timeLeft === 0}>
                    <Text bold>Time's up. Ready to release your words into the digital void?</Text>
                    <BannerButtons>
                        <Button onClick={onDoneClick}>Yes</Button>
                        <Button onClick={onWriteMoreClick}>Not yet</Button>
                    </BannerButtons>
                </CompletionBanner>
            )}
        </WrapperDiv>

    )   
}