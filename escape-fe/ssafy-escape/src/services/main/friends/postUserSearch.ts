import api from "@/services/api"
import API_PATH from "@/constants/path"
import ERROR_MESSAGES from "@/constants/errorMessages"

// 유저 닉네임 검색
const postUserSearch = async (
  nickname: string,
): Promise<PostUserSearchDataProps[]> => {
  try {
    const response = await api.post<PostUserSearchResponseProps>(
      API_PATH.MAIN.FRIEND.SEARCH,
      { nickname },
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
    console.error("유저 닉네임 검색 에러:", error)

    throw new Error(error.response.data.message || ERROR_MESSAGES.GENERIC_ERROR)
  }
}

export default postUserSearch
