import api from "@/services/api"
import API_PATH from "@/constants/path"
import ERROR_MESSAGES from "@/constants/errorMessages"

// 나의 최고 기록 갱신
const postUpdateRank = async (
  clearTime: string,
  userUuid: string,
  themaCategory: number,
): Promise<null> => {
  try {
    const response = await api.post<NullResponseProps>(
      API_PATH.MAIN.RANKING.UPDATE_RANK,
      {
        clearTime,
        userUuid,
        themaCategory,
      },
    )
    
    // 잘못된 요청
    if (response.data.status === 400) {
      throw new Error(
        response.data.message || ERROR_MESSAGES.INVALID_CREDENTIALS,
      )
    }
    return null
  } catch (error: any) {
    // 디버깅용
    console.error("나의 최고 기록 갱신 에러:", error)

    throw new Error(error.response.data.message || ERROR_MESSAGES.GENERIC_ERROR)
  }
}

export default postUpdateRank
