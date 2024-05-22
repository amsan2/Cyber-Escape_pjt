import api from "@/services/api"
import API_PATH from "@/constants/path"
import ERROR_MESSAGES from "@/constants/errorMessages"

// 힌트 가져오기
const postHint = async (quizUuid: string): Promise<PostQuizDataProps> => {
  try {
    const response = await api.post<PostQuizResponseProps>(
      API_PATH.INGAME.HINT,
      {
        quizUuid,
      },
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
    console.error("힌트 가져오기 에러:", error)

    throw new Error(error.response.data.message || ERROR_MESSAGES.GENERIC_ERROR)
  }
}

export default postHint
