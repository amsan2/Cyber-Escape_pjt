import api from "@/services/api"
import { removeSessionTokens } from "@/utils/SessionToken"
import API_PATH from "@/constants/path"
import ERROR_MESSAGES from "@/constants/errorMessages"

// 회원 탈퇴
const patchQuit = async (): Promise<null> => {
  try {
    const response = await api.patch<NullResponseProps>(API_PATH.AUTH.QUIT)

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
    console.error("회원 탈퇴 에러:", error)

    throw new Error(error.response.data.message || ERROR_MESSAGES.GENERIC_ERROR)
  }
}

export default patchQuit
