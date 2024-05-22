import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { styled } from "styled-components"
import SearchIcon from "@mui/icons-material/Search"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import Swal from "sweetalert2"
import MainModal from "@/components/common/MainModal"
import Input from "@/components/common/Input"
import SearchResultItem from "./SearchResultItem"
import postUserSearch from "@/services/main/friends/postUserSearch"
import postFriendRequest from "@/services/main/friends/postFriendRequest"
import ALERT_MESSAGES from "@/constants/alertMessages"

// 친구 추가 모달(검색)
const FriendRequestModal = ({ isOpen, onClose }: ModalProps) => {
  const [keyword, setKeyword] = useState<string>("")

  // 친구 추가 모달 닫기
  const handleClose = () => {
    setKeyword("")
    onClose()
  }

  // 검색 결과 데이터 불러옴
  const { data: searchData, refetch: refetchSearch } = useQuery({
    queryKey: ["searchUser", keyword],
    queryFn: () => postUserSearch(keyword),
    enabled: false, // 자동으로 쿼리 실행되지 않도록 false
  })

  // 검색 이벤트
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (keyword.trim()) {
      refetchSearch()
    }
  }

  // 친구 신청
  const handleRequest = async (receiverUuid: string) => {
    await postFriendRequest(receiverUuid, "FRIEND") // 신청받는 유저의 uuid와 알림 type(GAME || FRIEND)
    Swal.fire({
      title: ALERT_MESSAGES.FRIEND.REQUEST,
      width: "500px",
      padding: "40px",
    })
  }

  return (
    <div>
      <MainModal isOpen={isOpen} onClose={handleClose} text="친구 추가">
        <InputBox onSubmit={(e) => handleSearch(e)}>
          <Input
            $width="60%"
            $textIndent="25px"
            placeholder="닉네임을 입력해주세요."
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
          <CustomSearchIcon onClick={(e) => handleSearch(e)} />
          {keyword && (
            <CustomHighlightOffIcon
              onClick={() => {
                setKeyword("")
              }}
            />
          )}
        </InputBox>
        {!searchData || searchData.length === 0 ? (
          <NoText>결과가 없습니다.</NoText>
        ) : (
          searchData.map((user, i) => (
            <SearchResultItem key={i} user={user} onRequest={handleRequest} />
          ))
        )}
      </MainModal>
    </div>
  )
}

export default FriendRequestModal

const InputBox = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-top: 10px;
`

const CustomSearchIcon = styled(SearchIcon)`
  display: flex;
  align-items: center;
  position: absolute;
  top: 7px;
  left: 6.8vw;
  cursor: pointer;
`

const CustomHighlightOffIcon = styled(HighlightOffIcon)`
  display: flex;
  align-items: center;
  position: absolute;
  top: 7px;
  right: 6.8vw;
  cursor: pointer;
  opacity: 50%;
`

const NoText = styled.div`
  padding: 10px;
  text-align: center;
`
