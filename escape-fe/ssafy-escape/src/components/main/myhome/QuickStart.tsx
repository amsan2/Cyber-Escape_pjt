"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { styled } from "styled-components"
import useIngameThemeStore from "@/stores/IngameThemeStore"
import { MainColor } from "@/styles/palette"
import { paytoneOne } from "@/styles/GoogleFont"

// 메인홈의 바로 시작 
const QuickStart = () => {
  const router = useRouter()
  const { setSelectedThemeType } = useIngameThemeStore()
  return (
    <MainContainer>
      <div style={{ textAlign: "center" }}>
        <TitleText className={paytoneOne.className}>Cyber Escape</TitleText>
        <SubTitleText>바로 시작하기</SubTitleText>
      </div>
      <MainContent>
        <SelectMode
          onClick={() => {
            router.push("/main/theme"), setSelectedThemeType("single")
          }}
        >
          <Image
            src={process.env.NEXT_PUBLIC_IMAGE_URL + "/image/single.png"}
            alt="싱글 이미지"
            width={250}
            height={250}
            style={{ cursor: "pointer" }}
          />
          <ThemeText>싱글(1인)</ThemeText>
        </SelectMode>
        <SelectMode
          onClick={() => {
            router.push("/main/multi"), setSelectedThemeType("multi")
          }}
        >
          <Image
            src={process.env.NEXT_PUBLIC_IMAGE_URL + "/image/multi.png"}
            alt="멀티 이미지"
            width={250}
            height={250}
            style={{ cursor: "pointer" }}
          />
          <ThemeText>멀티(2인)</ThemeText>
        </SelectMode>
      </MainContent>
    </MainContainer>
  )
}

export default QuickStart

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

const TitleText = styled.div`
  font-size: 80px;
  font-weight: bold;
  color: ${MainColor};
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
`

const SubTitleText = styled.div`
  font-size: 22px;
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
