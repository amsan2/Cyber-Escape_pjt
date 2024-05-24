"use client"

import { useRouter, usePathname } from "next/navigation"
import styled from "styled-components"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import useIngameThemeStore from "@/stores/IngameThemeStore"
import useUserStore from "@/stores/UserStore"
import patchExit from "@/services/game/room/patchExit"

const Container = (props: ContainerProps) => {
  const { children, isBackButton = true } = props
  const router = useRouter()
  const pathname = usePathname()
  const segments = pathname.split("/")
  const { roomUuid } = useIngameThemeStore()
  const { userUuid } = useUserStore()

  const gameOut = async () => {
    try {
      await patchExit({
        roomUuid: roomUuid || "",
        userUuid: userUuid || "",
      })
    } catch (e) {
      console.error(e)
    }
  }

  const movePage = async () => {
    if (segments[1] === "gameroom") {
      await gameOut()
      window.location.href = "/main"
    } else if (segments[1] === "main" && segments[2] === "multi") {
      router.push("/main")
    } else {
      router.back()
    }
  }

  return (
    <ContainerStyle {...props}>
      {isBackButton ? (
        <BackIcon onClick={() => movePage()}>
          <ArrowBackIosNewIcon />
        </BackIcon>
      ) : null}
      {children}
    </ContainerStyle>
  )
}

export default Container

const ContainerStyle = styled.div<ContainerProps>`
  width: 70vw;
  height: 80vh;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 30px;
  background: ${(props) =>
    props.$backgroundColor ? `none` : `rgba(255, 255, 255, 0.8)`};
  transform: translate(-50%, -50%);
  padding: 20px;
  display: ${(props) => props.$display};
  flex-direction: ${(props) => props.$flexDirection};
  justify-content: ${(props) => props.$justifyContent};
  align-items: ${(props) => props.$alignItems};
  gap: ${(props) => props.$gap};
`
const BackIcon = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  cursor: pointer;
`
