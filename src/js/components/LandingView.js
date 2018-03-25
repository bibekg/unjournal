// @flow

import * as React from 'react'
import styled from 'styled-components'
import { colors } from '../styles'
import Button from './Button'
import Title from './Title'
import Text from './Text'
import NumberInput from './NumberInput'

const LandingViewWrapper = styled.div`
    background-color: ${colors.green};
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Centerizer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const TimeSpecifier = styled.div`
    display: flex;

    @media screen and (max-width: 767px) {
        flex-direction: column;
        align-items: center;
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
    writeTime: number
}

export default class LandingView extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props)

        this.state = {
            writeTime: 20
        }

        this.handleTimeChange = this.handleTimeChange.bind(this)
        this.handleStart = this.handleStart.bind(this)
    }

    handleTimeChange(event: SyntheticEvent<*>) {
        const proposedValue = Number(event.target.value)

        if (!isNaN(proposedValue)) {
            this.setState({ writeTime: proposedValue })
        }        
    }

    handleStart() {
        if (this.state.writeTime > 0) {
            this.props.onStartRequest(this.state.writeTime)
        }
    }

    render(): React.Element<*> {
        return (
            <LandingViewWrapper>
                <Centerizer>
                    <TimeSpecifier>
                        <Title>I want to write for</Title>
                        <NumberInput
                            width={100}
                            value={this.state.writeTime}
                            onChange={this.handleTimeChange}
                        />
                        <Title>minutes.</Title>
                    </TimeSpecifier>
                    <Button onClick={this.handleStart}>
                        Write
                    </Button>

                </Centerizer>
            </LandingViewWrapper>
        )
    }
}