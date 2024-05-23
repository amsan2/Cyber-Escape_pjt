"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Swal from "sweetalert2"
import useIngameThemeStore from "@/stores/IngameThemeStore"
import StartScene from "@/components/ingame/StartScene"
import ExitGame from "@/components/ingame/ExitGame"
import SpaceTheme from "@/components/ingame/main/space/SpaceTheme"
import HorrorTheme from "@/components/ingame/main/horror/HorrorTheme"
import HorrorTheme2 from "@/components/ingame/main/horror2/HorrorTheme2"
import SsafyTheme from "@/components/ingame/main/ssafy/SsafyTheme"
import SsafyTheme2 from "@/components/ingame/main/ssafy2/SsafyTheme2"
import * as S from "./ingameStyle"

// 인게임 페이지
const Page = () => {
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [isGameStart, setIsGameStart] = useState(false)
  const { selectedTheme } = useIngameThemeStore()

  // 게임 시작하는 클릭
  const handleStartClick = () => {
    const canvas = document.querySelector("canvas")
    if (canvas && !document.pointerLockElement) {
      canvas.requestPointerLock()
    }
  }

  // 나가기 버튼
  const exitGame = (e: any) => {
    e.preventDefault()
    Swal.fire({
      title: "정말 나가시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "네",
      cancelButtonText: "아니요",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/main"
      }
    })
  }

  useEffect(() => {
    document.addEventListener("click", handleStartClick)
  }, [])

  return (
    <S.Container>
      {selectedTheme === 7 ? (
        <SpaceTheme
          setIsModelLoaded={setIsModelLoaded}
          isGameStart={isGameStart}
        />
      ) : selectedTheme === 1 || selectedTheme === 2 ? (
        <HorrorTheme
          setIsModelLoaded={setIsModelLoaded}
          isGameStart={isGameStart}
        />
      ) : selectedTheme === 4 || selectedTheme === 5 ? (
        <SsafyTheme
          setIsModelLoaded={setIsModelLoaded}
          isGameStart={isGameStart}
        />
      ) : selectedTheme === 3 ? (
        <HorrorTheme2
          setIsModelLoaded={setIsModelLoaded}
          isGameStart={isGameStart}
        />
      ) : selectedTheme === 6 ? (
        <SsafyTheme2
          setIsModelLoaded={setIsModelLoaded}
          isGameStart={isGameStart}
        />
      ) : null}

      {isModelLoaded && !isGameStart ? (
        <div>
          <StartScene
            onFinish={() => setIsGameStart(true)}
            selectedTheme={selectedTheme}
          />
          <ExitGame>
            <Image
              src={process.env.NEXT_PUBLIC_IMAGE_URL + "/image/exitbutton.png"}
              alt="exit game image"
              onClick={(e) => exitGame(e)}
              width="40"
              height="40"
            />
          </ExitGame>
        </div>
      ) : (
        <S.LoadingText
          style={{
            color:
              selectedTheme === 1 || selectedTheme === 2 || selectedTheme === 3
                ? "red"
                : "white",
          }}
        >
          Now Loading...
        </S.LoadingText>
      )}
    </S.Container>
  )
}

export default Page
