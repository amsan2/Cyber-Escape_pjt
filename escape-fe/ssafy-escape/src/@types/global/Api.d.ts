// api 함수 관련 인터페이스

interface NullResponseProps {
  status: number
  message: string
  data: null
}

interface StringResponseProps {
  status: number
  message: string
  data: string
}

interface PostLoginResponseProps {
  status: number
  message: string
  data: UserInfoProps
}

interface UserInfoProps {
  loginId: string
  grantType: string
  accessToken: string
  refreshToken: string
  userUuid: string
  nickname: string
  profileUrl: string
}

interface GetNotificationListResponseProps {
  status: number
  message: string
  data: GetNotificationListDataProps[]
}

interface GetNotificationListDataProps {
  id: string
  senderUuid: string
  roomUuid: string
  nickname: string
  profileUrl: string
  content: string
  type: string
  isRead: string
  createdAt: string
}

interface PostAcceptanceResponseProps {
  status: number
  message: string
  data: PostAcceptanceDataProps
}

interface PostAcceptanceDataProps {
  title: string
  themaCategory: number
  roomUuid: string
}

interface GetFriendListResponseProps {
  status: number
  message: string
  data: GetFriendListDataProps[]
}

interface GetFriendListDataProps {
  friendUuid: string
  nickname: string
  profile: string
}

interface PostUserSearchResponseProps {
  status: number
  message: string
  data: PostUserSearchDataProps[]
}

interface PostUserSearchDataProps {
  userUuid: string
  nickname: string
  profileUrl: string
  relationship: string
}

interface PostMyRankingResponseProps {
  status: number
  message: string
  data: PostMyRankingDataProps
}

interface PostMyRankingDataProps {
  rank: number
  profileUrl: string
  nickname: string
  bestTime: string
  theme: string
}

interface PostRankingListResponseProps {
  status: number
  message: string
  data: PostRankingListDataProps[]
}

interface PostRankingListDataProps {
  rank: number
  nickname: string
  bestTime: string
  themaCategory: number
  profileUrl: string
}

interface GetQuizResponseProps {
  status: number
  message: string
  data: QuizDataProps[]
}

interface QuizDataProps {
  quizUuid: string
  content: string
  url: string
  difficulty: number
}

interface PostAnswerDataProps {
  clue: string
  order: number
  right: boolean
}

interface PostAnswerResponseProps {
  status: number
  message: string
  data: PostAnswerDataProps
}

interface PostQuizDataProps {
  hint: string
}

interface PostQuizResponseProps {
  status: number
  message: string
  data: postQuizDataProps
}