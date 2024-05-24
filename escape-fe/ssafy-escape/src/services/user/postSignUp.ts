import api from "@/services/api"
import API_PATH from "@/constants/path"
import ERROR_MESSAGES from "@/constants/errorMessages"

// 회원가입
const postSignUp = async (loginId: string, password: string): Promise<null> => {
  try {
    const response = await api.post<NullResponseProps>(API_PATH.AUTH.SIGNUP, {
      loginId,
      password,
    })

    switch (response.data.status) {
      case 400: // 잘못된 요청
        throw new Error(
          response.data.message || ERROR_MESSAGES.INVALID_CREDENTIALS,
        )
      case 4091: // 중복된 아이디
        throw new Error(
          response.data.message || ERROR_MESSAGES.AUTH.DUPLICATE_ID,
        )
      case 4092: // 잘못된 아이디 형식
        throw new Error(
          response.data.message || ERROR_MESSAGES.AUTH.INVALID_ID_FORMAT,
        )
      case 4093: // 잘못된 비밀번호 형식
        throw new Error(
          response.data.message || ERROR_MESSAGES.AUTH.INVALID_PASSWORD_FORMAT,
        )
      default: // 성공 -> 반환값 없음
        return null
    }
  } catch (error: any) {
    // 디버깅용
    console.error("회원가입 에러:", error.message)

    throw new Error(error.message || ERROR_MESSAGES.GENERIC_ERROR)
  }
}

export default postSignUp
