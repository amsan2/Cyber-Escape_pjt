import styled from "styled-components"
import Button from "@/components/common/Button"
import * as S from "@/styles/UserItemStyles"

// 친구 item
const FriendItem = ({ friend, isDeleteMode, onDelete }: FriendItemProps) => (
  <MainContainer>
    <S.ProfileBox>
      <S.ProfileImg src={friend.profile} alt="프로필 이미지" />
      <div>{friend.nickname}</div>
    </S.ProfileBox>
    {isDeleteMode && (
      <Button
        text="삭제"
        theme="fail"
        width="60px"
        onClick={() => onDelete(friend.friendUuid)}
      />
    )}
  </MainContainer>
)

export default FriendItem

const MainContainer = styled(S.MainContainer)`
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none; // 스크롤바 숨김
  }
`