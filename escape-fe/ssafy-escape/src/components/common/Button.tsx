"use client"

import styled from "styled-components"
import {
  MainColor,
  MainColorDarker,
  RedColor,
  RedColorBrighter,
  RedColorDarker,
} from "@/styles/palette"

const Button = (props: ButtonProps) => {
  const { text } = props
  return <ButtonStyle {...props}>{text}</ButtonStyle>
}

export default Button

const getBackgroundColor = (theme: string, backgroundColor?: string) => {
  switch (theme) {
    case "success":
      return MainColor
    case "fail":
      return RedColor
    case "game":
      return RedColorBrighter
    default:
      return backgroundColor || "initial"
  }
}

const getHoverBackgroundColor = (theme: string) => {
  switch (theme) {
    case "success":
      return MainColorDarker
    case "fail":
      return RedColorDarker
    default:
      return null
  }
}

const ButtonStyle = styled.button<ButtonProps>`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  font-size: ${(props) => props.fontSize || "13px"};
  padding: 10px;
  border: none;
  border-radius: 0.25rem;
  background-color: ${(props) =>
    getBackgroundColor(props.theme, props.backgroundColor)};
  color: white;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
  opacity: ${(props) => props.opacity || "1"};

  &:hover {
    background-color: ${(props) => getHoverBackgroundColor(props.theme)};
  }

  &:focus {
    background-color: ${(props) => getHoverBackgroundColor(props.theme)};
    box-shadow: 0 0 0 0.2rem rgba(15, 15, 15, 0.25);
  }
`
