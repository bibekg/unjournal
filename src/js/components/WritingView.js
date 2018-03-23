// @flow

import * as React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import TypePanel from './TypePanel'
import WritingInfoPanel from './WritingInfoPanel'
import { colors } from '../styles'

const WritingViewWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${colors.cream};
`

const TypePanelWrapper = styled.div`
    width: 100%;
    height: 100%;
    max-width: 800px;
    padding-top: 50px;
`

const NotificationBarDiv = styled.div`
    position: fixed;
    width: 100vw;
    left: 0;
    bottom: ${props => props.show ? 0 : -100}px;
    height: 100px;
    transition: 0.5s ease bottom;
`

type PropsType = {
    totalWriteTime: number,
    remainingTime: number,
}

type StateType = {
    remainingTime: number
}

export default class WritingView extends React.Component<PropsType> {

    constructor(props: PropsType) {
        super(props)

        const writeTime = props.totalWriteTime * 60 * 1000

        this.state = {
            totalWriteTime: writeTime,
            startTime: Date.now(),
            remainingTime: writeTime,
            showInfoBar: true
        }

        this.updateRemainingTime = this.updateRemainingTime.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.handleMouseMove = this.handleMouseMove.bind(this)
    }

    componentDidMount() {
        this.timerInterval = setInterval(this.updateRemainingTime, 500)
        window.addEventListener('mousemove', this.handleMouseMove)
    }

    componentWillMount() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval)
        }
    }

    handleKeyDown() {
        this.setState({ showInfoBar: false })
    }

    handleMouseMove() {
        this.setState({ showInfoBar: true })
    }

    updateRemainingTime() {
        this.setState({
            remainingTime: this.state.totalWriteTime - (Date.now() - this.state.startTime)
        })
    }

    render() {
        return (
            <WritingViewWrapper>
                <TypePanelWrapper>
                    <TypePanel 
                        placeholder={'Write freely...'}
                        tabIndex={1}
                        onKeyDown={this.handleKeyDown}
                    />
                </TypePanelWrapper>
                <NotificationBarDiv show={this.state.showInfoBar} >
                    <WritingInfoPanel 
                        timeLeft={this.state.remainingTime} 
                    />
                </NotificationBarDiv>
            </WritingViewWrapper>
        )
    }
}