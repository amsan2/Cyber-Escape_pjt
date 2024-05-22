interface NullBodyProps {
  status: number
  message: string
  data: null
}

interface StringBodyProps {
  status: number
  message: string
  data: string
}

interface PostLoginBodyProps {
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
