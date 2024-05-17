"use client"
import React, { useState, useEffect, useRef } from "react"
import Container from "@/components/common/Container"
import * as S from "@/app/@modal/main/multi/waiting/waitingStyle"
import ChattingBox from "@/components/game/multi/gameroom/ChattingBox"
import InviteModal from "@/components/game/multi/gameroom/InviteModal"
import HeaderNav from "@/components/common/HeaderNav"
import Button from "@/components/common/Button"
import useUserStore from "@/stores/UserStore"
import useIngameThemeStore from "@/stores/IngameTheme"
import HomeRoom from "@/components/home/HomeRoom"
import { Canvas } from "@react-three/fiber"
import CameraMoveToPosition, {
  CameraMoveToPositionRef,
} from "@/components/home/CameraMoveToPosition"

import { CircularProgress } from "@mui/material"
interface GameRoomProps {
  chatting: chatData[]
  ready: () => void
  kick: () => void
  sendMessage: (text: string) => void
  roomData: PubResponseData | null
}
const Waiting = ({
  chatting,
  ready,
  kick,
  sendMessage,
  roomData,
}: GameRoomProps) => {
  const { userUuid } = useUserStore()
  const [showModal, setShowModal] = useState<boolean>(false)
  const handleModalClose = (): void => {
    setShowModal(false)
  }
  const [imgNumber, setImgNumber] = useState<number>(0)
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const pointerLockControlsRef = useRef<CameraMoveToPositionRef>(null)
  const { selectedTheme } = useIngameThemeStore()
  useEffect(() => {
    if (selectedTheme === 1 || selectedTheme === 2 || selectedTheme === 3) {
      setImgNumber(1)
    } else {
      setImgNumber(4)
    }
  }, [selectedTheme])
  return (
    <>
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
        <CameraMoveToPosition ref={pointerLockControlsRef} />
        <HomeRoom onLoaded={setIsModelLoaded} />
      </Canvas>
      <HeaderNav />
      {roomData ? (
        <Container display="flex" justifyContent="center" alignItems="center">
          <InviteModal open={showModal} handleClose={handleModalClose} />
          <S.UserBox style={{ marginRight: "20px" }}>
            <S.CharacterBox>
              <S.ProfileImage
                src={roomData?.host?.profileUrl}
                alt="호스트 프로필 이미지"
                width={100}
                height={100}
              />
              {roomData?.hostReady ? (
                <S.ReadyImage src={`/image/ready.png`} />
              ) : null}
            </S.CharacterBox>
            <S.Nickname>{roomData?.host?.nickname}</S.Nickname>
            <S.Nickname>
              {roomData?.host?.uuid === userUuid ? (
                <>
                  <Button
                    text={roomData?.hostReady ? "준비완료" : "게임시작"}
                    theme={roomData?.hostReady ? "fail" : "success"}
                    width="100px"
                    height="40px"
                    onClick={() => {
                      ready()
                    }}
                  />
                </>
              ) : (
                <div style={{ width: "100px", height: "40px" }}></div>
              )}
            </S.Nickname>
          </S.UserBox>
          <S.MainBox>
            <S.MainContentBox>
              <S.ThemeImage
                src={
                  process.env.NEXT_PUBLIC_IMAGE_URL + `/image/${imgNumber}.png`
                }
                alt=""
                width={400}
                height={220}
                priority
              />
            </S.MainContentBox>
            <ChattingBox
              chatData={chatting}
              sendMessage={sendMessage}
            ></ChattingBox>
          </S.MainBox>
          <S.UserBox style={{ marginLeft: "20px" }}>
            {roomData?.guest ? (
              <>
                <S.CharacterBox>
                  <S.ProfileImage
                    src={roomData?.guest?.profileUrl}
                    alt=""
                    width={100}
                    height={100}
                  />
                  {roomData?.guestReady ? (
                    <S.ReadyImage src={`/image/ready.png`} />
                  ) : null}
                </S.CharacterBox>
                <S.Nickname>{roomData?.guest?.nickname}</S.Nickname>
                <S.Nickname>
                  {roomData?.guest?.uuid === userUuid ? (
                    <>
                      <Button
                        text={roomData?.guestReady ? "준비완료" : "게임시작"}
                        theme={roomData?.guestReady ? "fail" : "success"}
                        width="100px"
                        height="40px"
                        onClick={() => {
                          ready()
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <Button
                        text={"강제퇴장"}
                        theme={"fail"}
                        width="100px"
                        height="40px"
                        onClick={() => {
                          kick()
                        }}
                      />
                    </>
                  )}
                </S.Nickname>
              </>
            ) : (
              <S.CharacterBox>
                <S.CharacterBoxContent>
                  <Button
                    text="초대하기"
                    theme="success"
                    width="100px"
                    height="40px"
                    onClick={() => {
                      setShowModal(true)
                    }}
                  />
                </S.CharacterBoxContent>
              </S.CharacterBox>
            )}
          </S.UserBox>
        </Container>
      ) : (
        <Container display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Container>
      )}
    </>
  )
}
export default Waiting
