"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import styled from "styled-components"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import HelpIcon from "@mui/icons-material/Help"
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import { MainColor } from "@/styles/palette"

// 네비게이션 item
const navItems = [
  { path: "/main", icon: AccountCircleIcon, label: "마이홈" },
  { path: "/main/ranking", icon: EmojiEventsIcon, label: "싱글랭킹" },
  { path: "/main/help", icon: HelpIcon, label: "게임설명" },
  {
    path: "/main/mode",
    icon: MeetingRoomIcon,
    label: "게임시작",
    color: MainColor,
  },
]

// 하단 네비게이션 바
const FooterNav = () => {
  const [choice, setChoice] = useState<string | null>("/main")
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setChoice(pathname)
  }, [pathname])

  return (
    <div>
      <hr style={{ margin: "10px 20px" }} />
      <MainContainer>
        {navItems.map((item, index) => {
          const Icon = item.icon
          const isActive = choice === item.path
          return (
            <IconBox key={index} onClick={() => router.push(item.path)}>
              <Icon
                sx={{
                  fontSize: "50px",
                  cursor: "pointer",
                  color: isActive ? item.color || "inherit" : "disabled",
                }}
              />
              <TitleText style={{ color: isActive ? "inherit" : "gray" }}>
                {item.label}
              </TitleText>
            </IconBox>
          )
        })}
      </MainContainer>
    </div>
  )
}

export default FooterNav

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 6px;
`

const TitleText = styled.div`
  font-size: 25px;
  cursor: pointer;
  margin-right: 5px;
`

const IconBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
