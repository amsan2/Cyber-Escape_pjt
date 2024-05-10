import { MainColor } from "@/styles/palette"
import { styled } from "styled-components"

export const TitleText = styled.div`
  font-size: 90px;
  color: ${MainColor};
  position: absolute;
  top: 40%;
  left: 50%;
  font-weight: bold;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
`

export const StartButtton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 50px;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  margin-top: 30px;
`
