import api from "@/services/api"
import { removeSessionTokens } from "@/hooks/SessionToken"
import API_PATH from "@/constants/path"
import ERROR_MESSAGES from "@/constants/errorMessages"

// 로그아웃
const postLogout = async (): Promise<null> => {
  try {
    const response = await api.post<NullResponseProps>(API_PATH.AUTH.LOGOUT)

    // 잘못된 요청
    if (response.data.status === 400) {
      throw new Error(
        response.data.message || ERROR_MESSAGES.INVALID_CREDENTIALS,
      )
    }

    // 성공 -> 세션에 있는 accessToken, refreshToken 제거
    removeSessionTokens()
    return null
  } catch (error: any) {
    // 디버깅용
    console.error("로그아웃 에러:", error)

    throw new Error(
      error.response.data.message || ERROR_MESSAGES.GENERIC_ERROR,
    )
  }
}

export default postLogout
