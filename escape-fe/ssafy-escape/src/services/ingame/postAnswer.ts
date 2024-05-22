import api from "@/services/api"
import API_PATH from "@/constants/path"
import ERROR_MESSAGES from "@/constants/errorMessages"

// 정답 여부 확인
const postAnswer = async (
  quizUuid: string,
  answer: string,
): Promise<PostAnswerDataProps> => {
  try {
    const response = await api.post<PostAnswerResponseProps>(
      API_PATH.INGAME.ANSWER,
      {
        quizUuid,
        answer,
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
    console.error("정답 여부 확인 에러:", error)

    throw new Error(error.response.data.message || ERROR_MESSAGES.GENERIC_ERROR)
  }
}

export default postAnswer
