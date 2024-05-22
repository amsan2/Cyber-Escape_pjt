import styled from "styled-components"
import Button from "@/components/common/Button"
import { MainContainer, ProfileBox, ProfileImg } from "@/styles/UserItemStyles"

// 검색 결과 item
const SearchResultItem = ({ user, onRequest }: SearchResultItemProps) => (
  <CustomMainContainer>
    <ProfileBox>
      <ProfileImg src={user.profileUrl} alt="프로필 이미지" />
      <div>{user.nickname}</div>
    </ProfileBox>
    {user.relationship === "추가" && (
      <Button
        text={user.relationship}
        theme="success"
        width="60px"
        onClick={() => onRequest(user.userUuid)}
      />
    )}
  </CustomMainContainer>
)

export default SearchResultItem

const CustomMainContainer = styled(MainContainer)`
  margin: 10px;
  border-radius: 0.25rem;
`
