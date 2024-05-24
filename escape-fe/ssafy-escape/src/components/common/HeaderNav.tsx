"use client"

import { useEffect, useState } from "react"
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { styled } from "styled-components"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import HomeIcon from "@mui/icons-material/Home"
import LogoutIcon from "@mui/icons-material/Logout"
import GroupIcon from "@mui/icons-material/Group"
import useUserStore from "@/stores/UserStore"
import getFriendList from "@/services/main/friends/getFriendList"
import getNotificationList from "@/services/notification/getNotificationList"
import FriendMainModal from "../main/friends/FriendMainModal"
import NotificationModal from "../notification/NotificationModal"
import CustomAlert from "./CustomAlert"
import ALERT_MESSAGES from "@/constants/alertMessages"
import ERROR_MESSAGES from "@/constants/errorMessages"
import SetupEventSource from "@/utils/SetupEventSource"
import useNotification from "@/hooks/useNotification"
import HeaderNavItem from "./HeaderNavItem"

// 상단 네비게이션 바
const HeaderNav = () => {
  const router = useRouter()
  const { logout } = useUserStore()
  const [friendModalopen, setfriendModalOpen] = useState<boolean>(false)
  const [notificationModalopen, setNotificationModalopen] =
    useState<boolean>(false)
  const {
    isFriendAlram,
    isNotificationAlram,
    setIsFriendAlram,
    setIsNotificationAlram,
  } = useNotification()

  const queryClient = new QueryClient()
  
  useEffect(() => {
    const accessToken = sessionStorage.getItem("access_token") || ""
    queryClient.prefetchQuery({
      queryKey: ["friendList"],
      queryFn: () => getFriendList(1), // 친구 목록 1페이지만 prefetch
    }),
      queryClient.prefetchQuery({
        queryKey: ["notificationList"], // 알림 목록 prefetch
        queryFn: getNotificationList,
      }),
      SetupEventSource({
        accessToken,
        setIsFriendAlram,
        setIsNotificationAlram,
      }) // SSE 구독 함수
  }, [])

  // 로그아웃 버튼 클릭 시
  const handleLogout = async () => {
    try {
      await logout()
      CustomAlert({ title: ALERT_MESSAGES.AUTH.LOGOUT })
      router.push("/")
    } catch (error) {
      console.error("로그아웃 에러:", error)
      if (error instanceof Error) {
        CustomAlert({ title: ERROR_MESSAGES.AUTH.LOGOUT_FAILED })
      }
    }
  }

  // 네비게이션 item
  const navItems = [
    { Icon: HomeIcon, text: "홈", onClick: () => router.push("/main") },
    {
      Icon: LogoutIcon,
      text: "로그아웃",
      onClick: handleLogout,
    },
    {
      Icon: GroupIcon,
      text: "친구",
      onClick: () => setfriendModalOpen(true),
    },
    {
      Icon: NotificationsNoneIcon,
      text: "알림",
      onClick: () => setNotificationModalopen(true),
    },
  ]

  return (
    <ParentDiv>
      <MainContainer>
        {navItems.map(({ Icon, text, onClick }, index) => (
          <HeaderNavItem
            key={index}
            Icon={Icon}
            text={text}
            onClick={onClick}
            isFriendAlram={isFriendAlram}
            isNotificationAlram={isNotificationAlram}
          />
        ))}
      </MainContainer>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <FriendMainModal
          isOpen={friendModalopen}
          onClose={() => setfriendModalOpen(false)}
        />
        <NotificationModal
          isOpen={notificationModalopen}
          onClose={() => setNotificationModalopen(false)}
        />
      </HydrationBoundary>
    </ParentDiv>
  )
}

export default HeaderNav

const ParentDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`
const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 5px;
  gap: 3px;
  margin-right: 10px;
`
