// @flow

import styled from 'styled-components'
import { colors } from '../styles'

export default styled.textarea`
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: none;
    font-size: 24px;
    line-height: ${1.37 * 24}px;
    outline: none;
    resize: none;

    ::placeholder {
        color: ${colors.grey};
    }

    ::-webkit-scrollbar {
        width: 6px;
    }

    ::-webkit-scrollbar-track {
        background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${colors.green};
        border-radius: 6px;
    }
`