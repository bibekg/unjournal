// @flow

import * as React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import Flex, { FlexItem } from 'styled-flex-component'
import Toggle from 'react-toggle'
import 'react-toggle/style.css'
import { colors } from '../styles'
import copy from '../copy'
import Button from './Button'
import Title from './Title'
import Text from './Text'
import WriteTimeInput from './WriteTimeInput'
import Navbar from './Navbar'

const LandingViewWrapper = styled.div`
    background-color: ${colors.green};
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const PromptSpecifier = styled(Flex)`
    & > * {
        margin: 0 5px;
    }
    margin-bottom: 15px;

    // Add custom styles for the toggle component which doesn't accept style props
    .react-toggle--checked .react-toggle-track {
        background-color: ${colors.cream} !important;
    }
    .react-toggle--checked .react-toggle-thumb {
        border-color: ${colors.green} !important;
    }
`

const TimeSpecifier = styled.div`
    display: flex;

    @media screen and (max-width: 767px) {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    @media screen and (min-width: 768px) {
        flex-direction: row;
        align-items: flex-end;
    }

    & > * {
        margin: 5px;
    }

    margin-bottom: 20px;
`

type PropsType = {
    onStartRequest: (number) => void
}

type StateType = {
    writeTime: number,
    wantWritingPrompt: boolean
}

export default class LandingView extends React.Component<PropsType, StateType> {

    timeInput: ?HTMLInputElement

    constructor(props: PropsType) {
        super(props)

        this.state = {
            writeTime: 20,
            wantWritingPrompt: false
        }

        this.handleTimeChange = this.handleTimeChange.bind(this)
        this.handleStart = this.handleStart.bind(this)
    }

    componentDidMount() {
        if (this.timeInput) {
            this.timeInput.select()
        }
    }

    handleTimeChange(event: SyntheticEvent<*>) {
        const proposedValue = Number(event.target.value)
        const isValidNumber = !isNaN(proposedValue) && proposedValue > 0 && proposedValue < 100
        if (event.target.value === '' || isValidNumber) {
            this.setState({ writeTime: parseInt(event.target.value, 10) })
        }        
    }

    handleStart() {
        if (this.state.writeTime > 0) {
            this.props.onStartRequest(this.state.writeTime, this.state.wantWritingPrompt)
        }
    }

    handlePromptToggle = () => {
        this.setState({
            wantWritingPrompt: !this.state.wantWritingPrompt
        })
    }

    render(): React.Element<*> {
        return (
            <LandingViewWrapper>
                <Navbar theme='dark' />
                <Flex column alignCenter justifyCenter>
                    <TimeSpecifier>
                        <Title>{copy.timeSelector.pre}</Title>
                        <WriteTimeInput
                            innerRef={(el: HTMLInputElement) => { this.timeInput = el }}
                            width={100}
                            value={this.state.writeTime}
                            onChange={this.handleTimeChange}
                            onEnterPress={this.handleStart}
                        />
                        <Title>{copy.timeSelector.post[this.state.writeTime === 1 ? 'singular' : 'plural']}</Title>
                    </TimeSpecifier>
                    <PromptSpecifier alignCenter>
                        <Toggle 
                            checked={this.state.wantWritingPrompt}
                            onChange={this.handlePromptToggle}
                            icons={false}
                        />
                        <Text bold size={18}>{copy.writingPromptInquiry}</Text>  
                    </PromptSpecifier>
                    <Button onClick={this.handleStart}>
                        Write
                    </Button>
                </Flex>
            </LandingViewWrapper>
        )
    }
}