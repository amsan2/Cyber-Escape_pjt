import styled from "styled-components"
import Button from "../common/Button"

interface InvitationItemProps {
  notification: GetNotificationListDataProps
  onAccept: (roomUuid: string, notificationId: string) => void
  onDeny: (notificationId: string) => void
}

// 각각의 초대 item
const InvitationItem = ({
  notification,
  onAccept,
  onDeny,
}: InvitationItemProps) => (
  <MainContainer>
    <ProfileBox>
      <ProfileImg src={notification.profileUrl} alt="프로필 이미지" />
      <div>{notification.nickname}</div>
    </ProfileBox>
    <ButtonBox>
      <Button
        text="수락"
        theme="success"
        width="60px"
        onClick={() => onAccept(notification.roomUuid, notification.id)}
      />
      <Button
        text="거절"
        theme="fail"
        width="60px"
        onClick={() => onDeny(notification.id)}
      />
    </ButtonBox>
  </MainContainer>
)

export default InvitationItem

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

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 30%;
  object-fit: cover;
`

const ButtonBox = styled.div`
  display: flex;
  gap: 5px;
`
