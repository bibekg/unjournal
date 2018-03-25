// @flow

import * as React from 'react'
import styled, { injectGlobal } from 'styled-components'
import LandingView from './components/LandingView'
import WritingView from './components/WritingView'
import CompletionView from './components/CompletionView'

injectGlobal([`
  body {
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  body.disable-scroll {
    overflow: hidden;
  }

  *, *:before, *:after {
    box-sizing: border-box;
  }
`])

const AppWrapper = styled.div`
    width: 100vw;
    height: 100vh;
`

type PropsType = {}

type StateType = {
    currentView: 'landing' | 'writing',
    totalWriteTime: ?number
}

class App extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props)
        this.state = {
            currentView: 'landing',
            totalWriteTime: null
        }
        this.handleStartRequest = this.handleStartRequest.bind(this)
        this.handleCompletion = this.handleCompletion.bind(this)
    }

    handleStartRequest(time: number) {
        this.setState({ 
            currentView: 'writing',
            totalWriteTime: time * 60 * 1000
        })
    }

    handleCompletion() {
        this.setState({
            currentView: 'completion'
        })
    }

    render() {
        const renderer = {
            landing: () => <LandingView onStartRequest={this.handleStartRequest} />,
            writing: () => <WritingView totalWriteTime={this.state.totalWriteTime} onCompletion={this.handleCompletion} />,
            completion: () => <CompletionView />
        }[this.state.currentView]

        return (
            <AppWrapper>
                {renderer()}
            </AppWrapper>
        )
    }
}

export default App