// @flow

import * as React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import styled, { injectGlobal } from 'styled-components'
import LandingView from './components/LandingView'
import WritingView from './components/WritingView'
import CompletionView from './components/CompletionView'
import AboutPage from './components/AboutPage'
import copy from './copy'
import { fonts } from './styles'

injectGlobal([`
    @import url('https://fonts.googleapis.com/css?family=Lora:400,700|Open+Sans:400,700');

    body {
        font-family: ${fonts['sans-serif']}, sans-serif;
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
    totalWriteTime: ?number,
    writingPrompt: ?string
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

    handleStartRequest(time: number, wantWritingPrompt: boolean) {
        this.setState({ 
            currentView: 'writing',
            totalWriteTime: time * 60 * 1000,
            writingPrompt: wantWritingPrompt ? copy.writingPrompts[Math.floor(Math.random() * copy.writingPrompts.length)] : null
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
            writing: () => <WritingView totalWriteTime={this.state.totalWriteTime} writingPrompt={this.state.writingPrompt} onCompletion={this.handleCompletion} />,
            completion: () => <CompletionView />
        }[this.state.currentView]

        return (
            <AppWrapper>
                <BrowserRouter>
                    <Switch>
                        <Route path='/about' render={() => <AboutPage />} />
                        <Route exact path='/' render={renderer} />
                    </Switch>
                </BrowserRouter>
            </AppWrapper>
        )
    }
}

export default App