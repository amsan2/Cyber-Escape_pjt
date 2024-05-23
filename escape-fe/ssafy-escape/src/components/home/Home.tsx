"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Canvas } from "@react-three/fiber"
import Login from "../login/Login"
import HomeRoom from "./HomeRoom"
import CameraMoveToPosition, {
  CameraMoveToPositionRef,
} from "./CameraMoveToPosition"
import HeaderNav from "../common/HeaderNav"
import useUserStore from "@/stores/UserStore"
import { paytoneOne } from "@/styles/GoogleFont"
import * as S from "../../app/homeStyle"

interface HomeProps {
  showText?: boolean // 배경만 쓸 건지 여부(showText가 false면 배경만 쓰겠다는 뜻)
}

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
              <S.TitleText className={paytoneOne.className}>
                Cyber Escape
              </S.TitleText>
              <S.StartButtton
                className={paytoneOne.className}
                onClick={handleStartClick}
              >
                START
              </S.StartButtton>
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
