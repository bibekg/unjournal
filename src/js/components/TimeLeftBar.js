// @flow

import * as React from 'react'
import styled from 'styled-components'
import { colors } from '../styles'

const ProgressBar = styled.div`
    width: 100%;
    height: 5px;
    display: flex;
    align-items: flex-start;
`

const RemainingBar = styled.div`
    height: 100%;
    background-color: ${colors.green};
    width: ${props => 100 * props.remainingPercentage}%;
    transition: 0.5s ease width;
`

type PropsType = {
    timeLeft: number,
    totalTime: number
}

export default function TimeLeftBar(props: PropsType) {
    return (
        <ProgressBar>
            <RemainingBar remainingPercentage={props.timeLeft / props.totalTime} />
        </ProgressBar>
    )
}