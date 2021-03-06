// @flow

import * as React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import Flex, { FlexItem } from 'styled-flex-component'
import Toggle from 'react-toggle'
import 'react-toggle/style.css'
import { colors, breakpoints } from '../styles'
import copy from '../copy'
import Button from './Button'
import Title from './Title'
import Text from './Text'
import WriteTimeInput from './WriteTimeInput'
import Navbar from './Navbar'

const FlexDiv = Flex.extend`
  position: relative;
`

const Disclaimer = styled.div`
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 0;
  padding: 20px;
`

const LandingViewWrapper = styled.div`
  background-color: ${props => props.theme.landing.background};
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const PromptSpecifier = styled(Flex)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  ${breakpoints.md`
    flex-direction: row;
    align-items: flex-end;
  `}

  & > * {
    margin: 0 5px;
  }
  margin-bottom: 15px;

  // Add custom styles for the toggle component which doesn't accept style props
  .react-toggle--checked .react-toggle-track {
    background-color: ${colors.cream} !important;
  }
  .react-toggle-thumb {
    background-color: ${colors.green};
    .react-toggle--checked {
      border-color: ${colors.green} !important;
    }
  }
`

const PostTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  & > *:first-child {
    margin-right: 8px;
    margin-left: 8px;
  }
`

const TimeSpecifier = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 25px;

  ${breakpoints.md`
    flex-direction: row;
    align-items: flex-end;
  `}
`

type PropsType = {
  onStartRequest: number => void,
}

type StateType = {
  writeTime: number,
  wantWritingPrompt: boolean,
}

const DEFAULT_WRITE_TIME = 20
const LOCAL_STORAGE_KEYS = {
  WRITE_TIME: 'writeTime',
}
export default class LandingView extends React.Component<PropsType, StateType> {
  timeInput: ?HTMLInputElement

  constructor(props: PropsType) {
    super(props)

    const writeTime = window.localStorage.getItem(LOCAL_STORAGE_KEYS.WRITE_TIME)

    this.state = {
      writeTime: writeTime || DEFAULT_WRITE_TIME,
      wantWritingPrompt: false,
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
    const isValidNumber =
      !isNaN(proposedValue) && proposedValue > 0 && proposedValue < 100
    if (event.target.value === '' || isValidNumber) {
      const targetValue = parseInt(event.target.value, 10)
      this.setState({ writeTime: targetValue })
      localStorage.setItem(LOCAL_STORAGE_KEYS.WRITE_TIME, targetValue)
    }
  }

  handleStart() {
    if (this.state.writeTime > 0) {
      this.props.onStartRequest(
        this.state.writeTime,
        this.state.wantWritingPrompt
      )
    }
  }

  handlePromptToggle = () => {
    this.setState({
      wantWritingPrompt: !this.state.wantWritingPrompt,
    })
  }

  render(): React.Element<*> {
    return (
      <LandingViewWrapper>
        <Navbar />
        <Flex column alignCenter justifyCenter>
          <TimeSpecifier>
            <Title>I want to write for</Title>
            <PostTitle>
              <WriteTimeInput
                innerRef={(el: HTMLInputElement) => {
                  this.timeInput = el
                }}
                width={100}
                value={this.state.writeTime}
                onChange={this.handleTimeChange}
                onEnterPress={this.handleStart}
              />
              <Title>{this.state.writeTime === 1 ? 'minute' : 'minutes'}</Title>
            </PostTitle>
          </TimeSpecifier>
          <PromptSpecifier alignCenter>
            <Toggle
              checked={this.state.wantWritingPrompt}
              onChange={this.handlePromptToggle}
              icons={false}
            />
            <Text bold size={18}>
              Writing prompt
            </Text>
          </PromptSpecifier>
          <Button onClick={this.handleStart}>Write</Button>

          <Disclaimer>
            <Text size={14}>{copy.disclaimerText}</Text>
          </Disclaimer>
        </Flex>
      </LandingViewWrapper>
    )
  }
}
