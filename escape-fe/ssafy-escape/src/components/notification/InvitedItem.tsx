import Button from "../common/Button"
import * as S from "@/styles/UserItemStyles"

// 초대 item
const InvitationItem = ({
  notification,
  onAccept,
  onDeny,
}: InvitationItemProps) => (
  <S.MainContainer>
    <S.ProfileBox>
      <S.ProfileImg src={notification.profileUrl} alt="프로필 이미지" />
      <div>{notification.nickname}</div>
    </S.ProfileBox>
    <S.ButtonBox>
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
    </S.ButtonBox>
  </S.MainContainer>
)

export default InvitationItem


