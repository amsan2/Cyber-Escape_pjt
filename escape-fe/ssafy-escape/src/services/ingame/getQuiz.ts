import api from "@/services/api"
import API_PATH from "@/constants/path"
import ERROR_MESSAGES from "@/constants/errorMessages"

// 퀴즈 가져오기
const getQuiz = async (themaId: number): Promise<QuizDataProps[]> => {
  try {
    const response = await api.get<GetQuizResponseProps>(
      `${API_PATH.INGAME.QUIZ}/${themaId}`,
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
    console.error("퀴즈 가져오기 에러:", error)

    throw new Error(error.response.data.message || ERROR_MESSAGES.GENERIC_ERROR)
  }
}

export default getQuiz
