"use client"

import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import getNotificationList from "@/services/notification/getNotificationList"
import postReadNotification from "@/services/notification/postReadNotification"
import postInviteAcceptance from "@/services/notification/postInviteAcceptance"
import useIngameThemeStore from "@/stores/IngameThemeStore"
import useUserStore from "@/stores/UserStore"
import ERROR_MESSAGES from "@/constants/errorMessages"
import ALERT_MESSAGES from "@/constants/alertMessages"
import FilterGameInvitations from "@/utils/FilterGameInvitations"
import InvitationItem from "./InvitedItem"
import { NoText } from "@/styles/UserItemStyles"

// 받은 초대 목록
const InvitedList = () => {
  const router = useRouter()
  const { setSelectedTheme, setRoomTitle } = useIngameThemeStore()
  const { setIsHost } = useUserStore()

  // 알림 목록 데이터를 불러옴
  const { data: notificationList, refetch: refetchRequest } = useQuery({
    queryKey: ["notificationList"],
    queryFn: () => getNotificationList(),
  })

  // 컴포넌트가 마운트 될 때 데이터 갱신
  useEffect(() => {
    refetchRequest()
  }, [])

  // 초대 요청 수락 시
  const handleAccept = async (roomUuid: string, objectId: string) => {
    try {
      const response = await postInviteAcceptance(roomUuid)
      setSelectedTheme(response.themaCategory) // 초대된 방의 테마 카테고리로 set
      setRoomTitle(response.title) // 초대된 방의 제목으로 set
      setIsHost(false) // guest 이므로 host는 false
      await postReadNotification(objectId) // 알림 읽음 처리
      router.push(`/gameroom/${roomUuid}`) // 초대된 방으로 이동
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire(
          ERROR_MESSAGES.INVITATION.ROOM_NOT_FOUND, // 수락 전에 방이 폭파됐을 경우
          error.message,
          "error",
        )
      }
    }
  }

  // 초대 요청 거절 시
  const handleDeny = async (objectId: string) => {
    Swal.fire({
      title: ALERT_MESSAGES.INVITATION.INVITATION_DENIED,
      width: "500px",
      padding: "40px",
    })
    await postReadNotification(objectId) // 알림 읽음 처리
    refetchRequest() // 바로 refetch 해주면서 읽은 알림은 사라지게 됨
  }

  if (!notificationList) {
    return <div>데이터 없음</div>
  }

  // 게임 초대 알림만 가져오도록 필터링
  const gameInvitations = FilterGameInvitations(notificationList)

  return (
    <div>
      {gameInvitations.length === 0 ? (
        <NoText>{ALERT_MESSAGES.INVITATION.NO_INVITATIONS}</NoText>
      ) : (
        gameInvitations.map((notification, i) => (
          <InvitationItem
            key={i}
            notification={notification}
            onAccept={handleAccept}
            onDeny={handleDeny}
          />
        ))
      )}
    </div>
  )
}

export default InvitedList
