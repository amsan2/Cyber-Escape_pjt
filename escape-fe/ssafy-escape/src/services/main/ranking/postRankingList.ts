import api from "@/services/api"
import API_PATH from "@/constants/path"
import ERROR_MESSAGES from "@/constants/errorMessages"

// 테마별 전체 랭킹 정보 조회(20개씩 페이지네이션)
const postRankingList = async (
  pageNumber: number,
  themaCategory: number,
): Promise<PostRankingListDataProps[]> => {
  try {
    const response = await api.post<PostRankingListResponseProps>(
      API_PATH.MAIN.RANKING.LIST,
      {
        pageNumber,
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
    console.error("테마별 전체 랭킹 정보 조회 에러:", error)

    throw new Error(error.response.data.message || ERROR_MESSAGES.GENERIC_ERROR)
  }
}

export default postRankingList
