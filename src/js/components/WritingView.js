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

    @media screen and (max-width: 767px) {
        padding: 10px 10px;   
    }

    @media screen and (min-width: 768px) {
        padding: 50px 0;
    }
`

const NotificationBarDiv = styled.div`
    position: fixed;
    width: 100vw;
    left: 0;
    bottom: ${props => props.show ? 0 : -100}px;
    height: ${props => props.useFullScreen ? '100%' : '100px'};
    transition: 0.5s ease all;
`

type PropsType = {
    totalWriteTime: number,
}

type StateType = {
    state: 'writing' | 'time-end' | 'done',
    startTime: number,
    remainingTime: number,
    showInfoBar: boolean
}

export default class WritingView extends React.Component<PropsType> {

    // typePanel: ?HTMLTextAreaElement
    // timerInterval: ?(() => void)

    constructor(props: PropsType) {
        super(props)

        this.state = {
            totalWriteTime: props.totalWriteTime,
            startTime: Date.now(),
            remainingTime: props.totalWriteTime,
            showInfoBar: true,
            state: 'writing'
        }

        this.updateRemainingTime = this.updateRemainingTime.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.handleMouseMove = this.handleMouseMove.bind(this)
        this.handleDoneClick = this.handleDoneClick.bind(this)
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

    handleDoneClick() {
        const backspaceTillEmpty = () => {
            const currValue = this.typePanel.value
            if (currValue.length === 0) {
                clearInterval(backspaceTillEmpty)
                this.setState({
                    state: 'done'
                })
            }
            this.typePanel.value = currValue.slice(0,-1)
        }
        setInterval(backspaceTillEmpty, 10)
    }

    updateRemainingTime() {
        if (this.state.remainingTime <= 0) {
            const nextState = { remainingTime: 0 }
            if (this.typePanel && this.typePanel.value.length === 0) {
                nextState.state = 'done'
            }
            this.setState(nextState)
            if (this.timerInterval) {
                clearInterval(this.timerInterval)
            }
        } else {
            const remainingTime = this.state.totalWriteTime - (Date.now() - this.state.startTime)

            const nextState = { remainingTime }
            if (remainingTime === 0) {
                nextState.process = 'time-end'
                this.animateEnd()
            }

            this.setState(nextState)
        }
    }

    render() {
        return (
            <WritingViewWrapper>
                <TypePanelWrapper>
                    <TypePanel 
                        innerRef={(ta: HTMLTextAreaElement) => { this.typePanel = ta }}
                        placeholder={'Write freely...'}
                        tabIndex={1}
                        onKeyDown={this.handleKeyDown}
                    />
                </TypePanelWrapper>
                <NotificationBarDiv 
                    show={this.state.showInfoBar || this.state.remainingTime === 0} 
                    useFullScreen={this.state.state === 'done'}
                >
                    <WritingInfoPanel 
                        onDoneClick={this.handleDoneClick}
                        timeLeft={this.state.remainingTime}
                        writeState={this.state.state}
                    />
                </NotificationBarDiv>
            </WritingViewWrapper>
        )
    }
}