// @flow

import * as React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import TypePanel from './TypePanel'
import WritingHUD from './WritingHUD'
import { colors } from '../styles'
import copy from '../copy'

const WritingViewWrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${colors.cream};
`

const TypePanelWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    flex-basis: 0;

    & > * { max-width: 800px; }

    @media screen and (max-width: 767px) {
        padding: 10px 10px;   
    }

    @media screen and (min-width: 768px) {
        padding: 50px 0;
    }
`

const HUDToggle = styled.div`
    position: fixed;
    top: 10px;
    right: 10px;
    color: ${colors.brown};
    display: ${props => props.show ? 'block' : 'none'};
    cursor: pointer;
`

type PropsType = {
    totalWriteTime: number,
    onCompletion: () => void
}

type StateType = {
    state: 'writing' | 'done',
    startTime: number,
    remainingTime: number,
    showHUD: boolean,
    showHUDToggle: boolean,
    actionBasedHUD: boolean
}

export default class WritingView extends React.Component<PropsType> {

    typePanel: ?HTMLTextAreaElement
    timerInterval: ?(() => void)

    constructor(props: PropsType) {
        super(props)

        this.state = {
            totalWriteTime: props.totalWriteTime,
            startTime: Date.now(),
            remainingTime: props.totalWriteTime,
            showHUD: true,
            showHUDToggle: false,
            actionBasedHUD: true,
            writingState: 'writing'
        }
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

    handleKeyDown = () => {
        if (this.state.actionBasedHUD) {
            this.setState({ showHUD: false })
        }

        if (this.state.writingState === 'done') {
            this.setState({ showHUDToggle: false})
        }
    }

    handleMouseMove = () => {
        if (this.state.actionBasedHUD) {
            this.setState({ showHUD: true })
        }

        if (this.state.writingState === 'done') {
            this.setState({ showHUDToggle: true })
        }
    }

    animateErasure() {
        if (!this.typePanel) return
        const numCharacters = this.typePanel.value.length

        const TOTAL_TIME = 5000 // ms
        const frequency = Math.min(TOTAL_TIME / numCharacters, 100)

        const backspaceTillEmpty = setInterval(() => {
            if (this.typePanel) {
                const currValue = this.typePanel.value
                if (currValue.length === 0) {
                    clearInterval(backspaceTillEmpty)
                    this.props.onCompletion()
                } else {
                    this.typePanel.value = currValue.slice(0, -1)
                }
            } else {
                clearInterval(backspaceTillEmpty)
            }
        }, frequency)
    }

    handleDoneClick = () => {
        this.setState({
            showHUD: false
        })
        this.animateErasure()
    }

    handleWriteMoreClick = () => {
        this.setState({ 
            showHUD: false,
            showHUDToggle: true,
        })
    }

    toggleHUD = () => {
        this.setState({ showHUD: !this.state.showHUD })
    }

    endWriting() {
        this.setState({
            remainingTime: 0,
            actionBasedHUD: false,
            showHUD: true,
            state: (this.typePanel && this.typePanel.value.length === 0) ? 'done' : 'done'
        })

        if (this.timerInterval) {
            clearInterval(this.timerInterval)
        }
    }

    updateRemainingTime = () => {
        if (this.state.remainingTime <= 0) {
            this.endWriting()
        } else {
            const remainingTime = this.state.totalWriteTime - (Date.now() - this.state.startTime)

            const nextState = { remainingTime }
            if (remainingTime === 0) {
                nextState.process = 'done'
                this.animateEnd()
            }

            this.setState(nextState)
        }
    }

    render() {
        return (
            <WritingViewWrapper showHUD={this.state.showHUD || this.state.remainingTime === 0}>
                <TypePanelWrapper>
                    <TypePanel 
                        innerRef={(ta: HTMLTextAreaElement) => { this.typePanel = ta }}
                        placeholder={copy.typePanelPlaceholder}
                        tabIndex={1}
                        onKeyDown={this.handleKeyDown}
                    />
                </TypePanelWrapper>
                <WritingHUD 
                    onDoneClick={this.handleDoneClick}
                    onWriteMoreClick={this.handleWriteMoreClick}
                    totalTime={this.state.totalWriteTime}
                    timeLeft={this.state.remainingTime}
                    showHUD={this.state.showHUD}
                />

                <HUDToggle 
                    show={this.state.showHUDToggle && !this.state.showHUD} 
                    onClick={this.toggleHUD}
                >
                    {copy.hudToggle}
                </HUDToggle>
            </WritingViewWrapper>
        )
    }
}