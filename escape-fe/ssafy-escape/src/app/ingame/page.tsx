"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Swal from "sweetalert2"
import useIngameThemeStore from "@/stores/IngameThemeStore"
import StartScene from "@/components/ingame/StartScene"
import ExitGame from "@/components/ingame/ExitGame"
import RenderTheme from "@/components/ingame/elements/common/RenderTheme"
import LoadingText from "@/components/ingame/elements/common/LoadingText"
import { Container } from "./ingameStyle"

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

  // 클릭 이벤트 리스너 부착(언마운트 시 제거)
  useEffect(() => {
    document.addEventListener("click", handleStartClick)
    return () => {
      document.removeEventListener("click", handleStartClick)
    }
  }, [handleStartClick])

  return (
    <Container>
      {RenderTheme({ selectedTheme, setIsModelLoaded, isGameStart })}
      {isModelLoaded && !isGameStart && (
        <StartScene
          onFinish={() => setIsGameStart(true)}
          selectedTheme={selectedTheme}
        />
      )}
      {isModelLoaded && (
        <ExitGame>
          <Image
            src={process.env.NEXT_PUBLIC_IMAGE_URL + "/image/exitbutton.png"}
            alt="exit game image"
            onClick={exitGame}
            width="40"
            height="40"
          />
        </ExitGame>
      )}
      {LoadingText({ isModelLoaded, selectedTheme })}
    </Container>
  )
}

export default Page
