"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { styled } from "styled-components"
import FormatTime from "@/utils/FormatTime"
import postMyRanking from "@/services/main/ranking/postMyRanking"
import getAutoCreateNickname from "@/services/main/nickname/getAutoCreateNickname"
import postIsDuplicationNickname from "@/services/main/nickname/postIsDuplicationNickname"
import patchNicknameChange from "@/services/main/nickname/patchNicknameChange"
import patchChangeProfileImg from "@/services/user/patchChangeProfileImg"
import useUserStore from "@/stores/UserStore"
import ALERT_MESSAGES from "@/constants/alertMessages"
import NicknameSection from "./NicknameSection"
import ProfileImageSection from "./ProfileImageSection"
import ThemeSelectBox, { themeIdx } from "@/components/common/ThemeSelectBox"
import CustomAlert from "@/components/common/CustomAlert"

// 내 프로필
const MyProfile = () => {
  const [activeTheme, setActiveTheme] = useState<number>(0)
  const [isActiveChangeNickname, setIsActiveChangeNickname] =
    useState<boolean>(false)
  const [newNickname, setNewNickname] = useState<string>("")
  const { nickname, profileUrl, setNickname, setProfileUrl } = useUserStore()
  const [profileImg, setProfileImg] = useState<string | undefined>(profileUrl)

  // 내 랭킹 데이터 가져옴
  const { data: myRankingData } = useQuery({
    queryKey: ["myRanking", themeIdx[activeTheme]],
    queryFn: () => postMyRanking(activeTheme),
  })

  // 테마 아이콘 클릭 시
  const handleThemeClick = (index: number) => {
    setActiveTheme(index)
  }

  // 닉네임 저장 버튼 클릭 시
  const handleNicknameSaveClick = async () => {
    const idDuplicate = await postIsDuplicationNickname(nickname)
    if (idDuplicate) {
      await patchNicknameChange(nickname, newNickname)
      CustomAlert({ title: ALERT_MESSAGES.PROFILE.CHANGE_NICKNAME })
      setNickname(newNickname)
      setNewNickname("")
      setIsActiveChangeNickname(false)
    } else {
      CustomAlert({ title: ALERT_MESSAGES.PROFILE.DUPLICATE_NICKNAME })
    }
  }

  // 프로필 이미지 변경
  const handleChangeImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = async () => {
        setProfileImg(reader.result as string)
        const newImgUrl = await patchChangeProfileImg(file)
        setProfileUrl(newImgUrl)
        CustomAlert({ title: ALERT_MESSAGES.PROFILE.CHANGE_IMG })
      }
      reader.readAsDataURL(file)
    }
  }

  // 프로필 이미지 수정 버튼 클릭 시
  const handleImgClick = () => {
    const fileInputElement = document.getElementById("fileInput") // id가 "fileInput"인 요소에 클릭 이벤트를 발생시킴
    if (fileInputElement) {
      fileInputElement.click()
    }
  }

  // 닉네임 자동 생성 버튼 클릭 시
  const handleAutoNicknameClick = async () => {
    const autoNickname = await getAutoCreateNickname()
    setNewNickname(autoNickname)
  }

  if (!myRankingData) {
    return <div>데이터 없음</div>
  }

  return (
    <MainContainer>
      <NicknameSection
        isActiveChangeNickname={isActiveChangeNickname}
        nickname={nickname}
        newNickname={newNickname}
        setNewNickname={setNewNickname}
        setIsActiveChangeNickname={setIsActiveChangeNickname}
        handleNicknameSaveClick={handleNicknameSaveClick}
        handleAutoNicknameClick={handleAutoNicknameClick}
      />
      <ProfileImageSection
        profileImg={profileImg}
        handleImgClick={handleImgClick}
        handleChangeImg={handleChangeImg}
      />
      <ThemeSelectBox
        activeTheme={activeTheme}
        handleThemeClick={handleThemeClick}
      />
      <MyRankBox>
        <SubText>나의 최고 기록</SubText>
        {myRankingData.bestTime !== "00:00:00" ? (
          <SubText style={{ color: "#dd3232" }}>
            {FormatTime(myRankingData.bestTime)}
          </SubText>
        ) : (
          <NoText>클리어 기록이 없습니다. 지금 바로 도전해보세요!</NoText>
        )}
      </MyRankBox>
    </MainContainer>
  )
}

export default MyProfile

const SubText = styled.div`
  font-size: 22px;
  word-break: keep-all;
  text-align: center;
`

const NoText = styled.div`
  margin-top: 5px;
  font-size: 14px;
`

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  gap: 20px;
  width: 320px;
  border-radius: 20px;
`

const MyRankBox = styled.div`
  text-align: center;
  width: 150px;
  height: 65px;
`
