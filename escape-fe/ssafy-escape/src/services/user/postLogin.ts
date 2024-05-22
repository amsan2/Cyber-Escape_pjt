import api from "@/services/api"
import { setSessionTokens } from "@/utils/SessionToken"
import API_PATH from "@/constants/path"
import ERROR_MESSAGES from "@/constants/errorMessages"

// 로그인
const postLogin = async (
  loginId: string,
  password: string,
): Promise<UserInfoProps> => {
  try {
    const response = await api.post<PostLoginResponseProps>(
      API_PATH.AUTH.LOGIN,
      {
        loginId,
        password,
      },
    )

    switch (response.data.status) {
      case 400: // 잘못된 요청
        throw new Error(
          response.data.message || ERROR_MESSAGES.INVALID_CREDENTIALS,
        )
      case 4040: // 존재하지 않는 사용자 or 비밀번호 틀릴 시
        throw new Error(
          response.data.message || ERROR_MESSAGES.AUTH.USER_NOT_FOUND,
        )
      default: // 성공 -> 세션에 accessToken, refreshToken 저장
        const { accessToken, refreshToken } = response.data.data
        setSessionTokens(accessToken, refreshToken)
        return response.data.data
    }
  } catch (error: any) {
    // 디버깅용
    console.error("로그인 에러:", error)

    // 백엔드 에러 메세지 유무 알 수 없을 땐 옵셔널 체이닝 사용
    throw new Error(error.response.data.message || ERROR_MESSAGES.GENERIC_ERROR)
  }
}

export default postLogin
