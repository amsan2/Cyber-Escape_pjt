import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { styled } from "styled-components"
import Swal from "sweetalert2"
import { useFriendContext } from "@/context/FriendContext"
import postReadNotification from "@/services/notification/postReadNotification"
import postFriendAddition from "@/services/main/friends/postFriendAddition"
import getNotificationList from "@/services/notification/getNotificationList"
import ALERT_MESSAGES from "@/constants/alertMessages"
import Button from "@/components/common/Button"
import * as S from "@/styles/UserItemStyles"

// 받은 친구 요청 목록
const FriendRequestList = () => {
  const { refetchFriends } = useFriendContext()
  const { data: requestData, refetch: refetchRequest } = useQuery({
    queryKey: ["notificationList"],
    queryFn: () => getNotificationList(),
  })

  useEffect(() => {
    refetchRequest()
  }, [])

  // 친구 요청 수락 눌렀을 시
  const handleAccept = async (requestUserUuid: string, objectId: string) => {
    await postFriendAddition(requestUserUuid)
    postReadNotification(objectId)
    Swal.fire({
      title: ALERT_MESSAGES.FRIEND.ACCEPT,
      width: "500px",
      padding: "40px",
    })
    refetchFriends() // 친구 목록 바로 갱신되도록 refetchFriends 실행
    refetchRequest() // 요청 목록도 같이 갱신
  }

  // 친구 요청 거절 눌렀을 시
  const handleDeny = async (objectId: string) => {
    postReadNotification(objectId)
    Swal.fire({
      title: ALERT_MESSAGES.FRIEND.DENY,
      width: "500px",
      padding: "40px",
    })
    refetchFriends()
    refetchRequest()
  }

  if (!requestData) {
    return <div>데이터 없음</div>
  }

  return (
    <div>
      <Text>받은 친구 요청 목록</Text>
      {requestData.length === 0 && (
        <S.NoText>받은 친구 요청이 없습니다.</S.NoText>
      )}
      {requestData
        .filter((data) => data.type === "FRIEND")
        .map((notification) => (
          <div key={notification.senderUuid}>
            <S.MainContainer>
              <S.ProfileBox>
                <S.ProfileImg
                  src={notification.profileUrl}
                  alt="프로필 이미지"
                />
                <div>{notification.nickname}</div>
              </S.ProfileBox>
              <CustomButtonBox>
                <Button
                  text="수락"
                  theme="success"
                  width="60px"
                  onClick={() =>
                    handleAccept(notification.senderUuid, notification.id)
                  }
                />
                <Button
                  text="거절"
                  theme="fail"
                  width="60px"
                  onClick={() => handleDeny(notification.id)}
                />
              </CustomButtonBox>
            </S.MainContainer>
          </div>
        ))}
    </div>
  )
}

export default FriendRequestList

const Text = styled.div`
  padding-left: 5px;
  font-weight: bold;
`
const CustomButtonBox = styled(S.ButtonBox)`
  gap: 10px;
`
