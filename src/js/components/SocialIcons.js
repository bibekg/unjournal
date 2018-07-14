// @flow

import * as React from 'react'
import styled from 'styled-components'
import { colors } from '../styles'

import gitHubIcon from '../images/github.svg'
import mediumIcon from '../images/medium.svg'

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const SocialIcon = styled.img`
  margin: 5px;
  width: 30px;
  height: 30px;
`

export default function SocialIcons() {

  const githubLink = 'https://github.com/bibekg/unjournal'
  const mediumLink = 'https://medium.com/@bibekg/the-most-expressive-way-to-journal-is-to-unjournal-283bd8e9b72c'
  return (
    <WrapperDiv>
      <a href={githubLink}><SocialIcon src={gitHubIcon} alt='GitHub link' /></a>
      <a href={mediumLink}><SocialIcon src={mediumIcon} alt='Medium article link' /></a>
    </WrapperDiv>
  )
}