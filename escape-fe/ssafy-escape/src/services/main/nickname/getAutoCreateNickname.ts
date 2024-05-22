import api from "@/services/api"
import API_PATH from "@/constants/path"
import ERROR_MESSAGES from "@/constants/errorMessages"

// 닉네임 자동 생성
const getAutoCreateNickname = async (): Promise<string> => {
  try {
    const response = await api.get<StringResponseProps>(
      API_PATH.MAIN.NICKNAME.AUTO_CREATE,
    )

    // 잘못된 요청
    if (response.data.status === 400) {
      throw new Error(
        response.data.message || ERROR_MESSAGES.INVALID_CREDENTIALS,
      )
    }
    return response.data.data
  } catch (error: any) {
    // 디버깅용
    console.error("닉네임 자동 생성 에러:", error)

    throw new Error(error.response.data.message || ERROR_MESSAGES.GENERIC_ERROR)
  }
}

export default getAutoCreateNickname
