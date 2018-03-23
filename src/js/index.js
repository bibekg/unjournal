// @flow

import React from "react"
import { render } from "react-dom"
import App from './App'

const wrapper = document.getElementById("app");

if (wrapper) {
    render(<App />, wrapper)
}