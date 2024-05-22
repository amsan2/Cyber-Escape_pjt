import Image from "next/image"
import styled from "styled-components"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import ShuffleIcon from "@mui/icons-material/Shuffle"
import Button from "@/components/common/Button"
import Input from "@/components/common/Input"

// 내 프로필 중 닉네임 section 
const NicknameSection = ({
  isActiveChangeNickname,
  nickname,
  newNickname,
  setNewNickname,
  setIsActiveChangeNickname,
  handleNicknameSaveClick,
  handleAutoNicknameClick,
}: NicknameSectionProps) => {
  return (
    <NicknameMainBox>
      {isActiveChangeNickname ? (
        <EditBox>
          <ShuffleIconBox onClick={handleAutoNicknameClick}>
            <ShuffleIcon sx={{ fontSize: "30px" }} />
          </ShuffleIconBox>
          <Input
            placeholder={nickname ? nickname : "닉네임을 입력하세요"}
            value={newNickname}
            onChange={(event) => setNewNickname(event.target.value)}
          />
          {newNickname && (
            <CustomHighlightOffIcon onClick={() => setNewNickname("")} />
          )}
          <Button
            text="저장"
            theme="success"
            width="55px"
            onClick={handleNicknameSaveClick}
          />
          <Button
            text="닫기"
            theme="fail"
            width="55px"
            onClick={() => setIsActiveChangeNickname(false)}
          />
        </EditBox>
      ) : (
        <NicknameSubBox>
          <Nickname>{nickname}</Nickname>
          <BlackEditIcon
            src={process.env.NEXT_PUBLIC_IMAGE_URL + "/image/edit_black.png"}
            alt="닉네임 수정 아이콘"
            width={25}
            height={25}
            onClick={() => setIsActiveChangeNickname(!isActiveChangeNickname)}
          />
        </NicknameSubBox>
      )}
    </NicknameMainBox>
  )
}

export default NicknameSection

const NicknameMainBox = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
  height: 40px;
`

const NicknameSubBox = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`

const ShuffleIconBox = styled.div`
  cursor: pointer;
`

const EditBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: 4vw;
  position: relative;
`

const CustomHighlightOffIcon = styled(HighlightOffIcon)`
  display: flex;
  align-items: center;
  position: absolute;
  top: 7px;
  right: 125px;
  opacity: 50%;
  cursor: pointer;
`

const Nickname = styled.div`
  font-size: 22px;
  word-break: keep-all;
  text-align: center;
`

const BlackEditIcon = styled(Image)`
  opacity: 0.5;
  cursor: pointer;
  filter: drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.5));
`
