import FlagIcon from "@mui/icons-material/Flag"
import formatTime from "@/utils/FormatTime"
import * as S from "@/styles/RankingStyles"

// 랭킹 item
const RankItem = ({ user }: RankItemProps) => (
  <S.RankInfo>
    <S.RankPosition>
      {user.rank === 1 ? (
        <S.First>1위.</S.First>
      ) : user.rank === 2 ? (
        <S.Second>2위.</S.Second>
      ) : user.rank === 3 ? (
        <S.Third>3위.</S.Third>
      ) : (
        <div>{user.rank}위.</div>
      )}
    </S.RankPosition>
    <S.ProfileBox>
      <S.ProfileImg src={user.profileUrl} alt="프로필 이미지" />
      <S.Nickname $isTopThree={user.rank <= 3}>{user.nickname}</S.Nickname>
      <S.Time $isTopThree={user.rank <= 3}>
        <FlagIcon />
        {formatTime(user.bestTime)} 클리어
      </S.Time>
    </S.ProfileBox>
  </S.RankInfo>
)

export default RankItem
