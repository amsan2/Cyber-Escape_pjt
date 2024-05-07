"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { styled } from "styled-components"
import { MainColor } from "@/styles/palette"

const QuickStart = () => {
  const router = useRouter()
  return (
    <StartContainer>
      <div style={{ textAlign: "center" }}>
        <TitleText>Cyber Escape</TitleText>
        <SubTitleText>바로 시작하기</SubTitleText>
      </div>
      <MainContent>
        <SelectMode
          className="selectmode"
          onClick={() => {
            router.push("/game/theme?mode=single")
          }}
        >
          <Image
            src="/image/single.png"
            alt=""
            width={250}
            height={250}
            style={{ cursor: "pointer" }}
          />
          <ThemeText>싱글(1인)</ThemeText>
        </SelectMode>
        <SelectMode
          className="selectmode"
          onClick={() => {
            router.push("/game/multi")
          }}
        >
          <Image
            src="/image/multi.png"
            alt=""
            width={250}
            height={250}
            style={{ cursor: "pointer" }}
          />
          <ThemeText>멀티(2인)</ThemeText>
        </SelectMode>
      </MainContent>
    </StartContainer>
  )
}

export default QuickStart

const TitleText = styled.div`
  font-size: 80px;
  font-weight: bold;
  color: ${MainColor};
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
`

const SubTitleText = styled.div`
  font-size: 22px;
`

const StartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

const MainContent = styled.div`
  display: flex;
  margin-top: 10px;
  gap: 26px;
`

const SelectMode = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`

const ThemeText = styled.div`
  font-size: 20px;
  text-align: center;
`
