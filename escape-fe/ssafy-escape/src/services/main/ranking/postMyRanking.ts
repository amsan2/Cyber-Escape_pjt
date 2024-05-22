import api from "@/services/api"
import API_PATH from "@/constants/path"
import ERROR_MESSAGES from "@/constants/errorMessages"

// 테마별 나의 랭킹 조회
const postMyRanking = async (
  themaCategory: number,
): Promise<PostMyRankingDataProps> => {
  try {
    const response = await api.post<PostMyRankingResponseProps>(
      API_PATH.MAIN.RANKING.MY_RANK,
      {
        themaCategory,
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
    console.error("테마별 나의 랭킹 조회 에러:", error)

    throw new Error(error.response.data.message || ERROR_MESSAGES.GENERIC_ERROR)
  }
}

export default postMyRanking
