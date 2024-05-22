"use client"

import styled from "styled-components"
import MyProfile from "./MyProfile"
import QuickStart from "./QuickStart"

// 메인홈
const Main = () => {
  return (
    <MainContainer>
      <MyProfile />
      <VerticalLine />
      <QuickStart />
    </MainContainer>
  )
}

export default Main

const MainContainer = styled.div`
  display: flex;
  width: 66vw;
  height: 66vh;
  padding: 20px;
  gap: 2vw;
  align-items: center;
  justify-content: center;
`

const VerticalLine = styled.div`
  height: 75%;
  width: 2px;
  background-color: #ccc;
  margin-right: 2.5vw;
`
