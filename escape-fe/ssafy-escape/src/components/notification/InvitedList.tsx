"use client"

import { useQuery } from "@tanstack/react-query"
import { styled } from "styled-components"
import Button from "../common/Button"
import getNotificationList from "@/services/notification/getNotificationList"
import Swal from "sweetalert2"
import postReadNotification from "@/services/notification/postReadNotification"
import postInviteAcceptance from "@/services/notification/postInviteAcceptance"
import { useRouter } from "next/navigation"
import useIngameThemeStore from "@/stores/IngameThemeStore"
import useUserStore from "@/stores/UserStore"
import { useEffect } from "react"
// 게임 초대 요청 리스트
const InvitedList = () => {
  const { data: notificationList, refetch } = useQuery({
    queryKey: ["notificationList"],
    queryFn: () => getNotificationList(),
  })

  useEffect(() => {
    refetch()
  }, [])

  const { setSelectedTheme, setRoomTitle } = useIngameThemeStore()
  const { setIsHost } = useUserStore()
  const router = useRouter()
  // 초대 요청 수락 시
  const handleAccept = async (roomUuid: string, objectId: string) => {
    try {
      const response = await postInviteAcceptance(roomUuid)
      setSelectedTheme(response.themaCategory)
      setRoomTitle(response.title)
      setIsHost(false)
      // 알림 읽음 처리
      await postReadNotification(objectId)
      router.push(`/gameroom/${roomUuid}`)
      refetch()
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire(
          "존재하지 않는 방입니다.",
          error instanceof Error ? error.message : "",
          "error",
        )
      }
    }
  }

  // 초대 요청 거절 시
  const handleDeny = async (objectId: string) => {
    Swal.fire({
      title: "초대를 거절했습니다.",
      width: "500px",
      padding: "40px",
    })
    await postReadNotification(objectId)
    refetch()
  }

  if (!notificationList) {
    return <div>데이터 없음</div>
  }

  return (
    <div>
      {notificationList.length === 0 ? (
        <NoText>받은 초대 요청이 없습니다.</NoText>
      ) : (
        notificationList
          .filter((data) => data.type === "GAME")
          .map((notification, i) => (
            <div key={i}>
              <MainContainer>
                <ProfileBox>
                  <ProfileImg
                    src={notification.profileUrl}
                    alt="프로필 이미지"
                  />
                  <div>{notification.nickname}</div>
                </ProfileBox>
                <ButtonBox>
                  <Button
                    text="수락"
                    theme="success"
                    width="60px"
                    onClick={() =>
                      handleAccept(notification.roomUuid, notification.id)
                    }
                  />
                  <Button
                    text="거절"
                    theme="fail"
                    width="60px"
                    onClick={() => handleDeny(notification.id)}
                  />
                </ButtonBox>
              </MainContainer>
            </div>
          ))
      )}
    </div>
  )
}

export default InvitedList

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 10px;
  font-size: 17px;
  border-radius: 0.25rem;
`
const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
const ButtonBox = styled.div`
  display: flex;
  gap: 5px;
`
const NoText = styled.div`
  font-size: 14px;
  text-align: center;
  padding: 5px;
`

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 30%;
  object-fit: cover;
`
