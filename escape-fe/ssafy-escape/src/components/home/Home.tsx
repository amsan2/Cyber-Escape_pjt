"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Canvas } from "@react-three/fiber"
import styled from "styled-components"
import Login from "../login/Login"
import HomeRoom from "./HomeRoom"
import CameraMoveToPosition from "./CameraMoveToPosition"
import HeaderNav from "../common/HeaderNav"
import useUserStore from "@/stores/UserStore"
import { paytoneOne } from "@/styles/GoogleFont"
import { MainColor } from "@/styles/palette"

// 첫 시작 페이지
const Home = ({ showText = true }: HomeProps) => {
  const [isModelLoaded, setIsModelLoaded] = useState<boolean>(false)
  const [isStartClicked, setIsStartClicked] = useState<boolean>(false)
  const pointerLockControlsRef = useRef<CameraMoveToPositionRef>(null)
  const router = useRouter()
  const { isLogin } = useUserStore()

  // START 버튼을 눌렀을 시
  const handleStartClick = () => {
    pointerLockControlsRef.current?.moveToPosition(3, 1, -7) // 카메라 이동
    const accessToken = sessionStorage.getItem("access_token")
    if (accessToken && isLogin) {
      // 세션에 accessToken 유무, 로그인 유무 확인하여 메인페이지로 보냄
      router.push("/main")
    } else {
      setIsStartClicked(true)
    }
  }

  // 로그인 창에서 뒤로가기 버튼을 눌렀을 시
  const handleBackClick = () => {
    pointerLockControlsRef.current?.moveToPosition(4, 3, -2)
    setIsStartClicked(false)
  }

  return (
    <div>
      <Canvas
        shadows
        style={{ width: "100vw", height: "100vh", backgroundColor: "white" }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={2}
          castShadow
          receiveShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <HomeRoom onLoaded={setIsModelLoaded} />
        <CameraMoveToPosition ref={pointerLockControlsRef} />
      </Canvas>
      {!showText && <HeaderNav />}
      {isModelLoaded && (
        <div>
          {!isStartClicked && showText ? (
            <div>
              <TitleText className={paytoneOne.className}>
                Cyber Escape
              </TitleText>
              <StartButtton
                className={paytoneOne.className}
                onClick={handleStartClick}
              >
                START
              </StartButtton>
            </div>
          ) : isStartClicked && showText ? (
            <Login handleLoginback={handleBackClick} />
          ) : null}
        </div>
      )}
    </div>
  )
}

export default Home

const TitleText = styled.div`
  font-size: 110px;
  color: ${MainColor};
  position: absolute;
  top: 40%;
  left: 50%;
  font-weight: bold;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
`

const StartButtton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 60px;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  margin-top: 50px;
  transition: font-size 0.3s ease;

  &:hover {
    font-size: 66px;
  }
`
