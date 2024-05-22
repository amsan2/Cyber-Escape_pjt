import MyProfile from "./MyProfile"
import QuickStart from "./QuickStart"
import * as S from "@/app/@modal/main/mainStyle"

// 메인홈
const Main = () => {
  return (
    <S.MainContainer>
      <MyProfile />
      <S.VerticalLine />
      <QuickStart />
    </S.MainContainer>
  )
}

export default Main
