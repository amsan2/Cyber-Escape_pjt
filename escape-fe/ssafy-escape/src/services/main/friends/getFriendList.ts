import api from "@/services/api"
import API_PATH from "@/constants/path"
import ERROR_MESSAGES from "@/constants/errorMessages"

// 친구 목록 조회
const getFriendList = async (
  pageNumber: number,
): Promise<GetFriendListDataProps[]> => {
  try {
    const response = await api.get<GetFriendListResponseProps>(
      `${API_PATH.MAIN.FRIEND.LIST}?pageNumber=${pageNumber}`,
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
    console.error("친구 목록 조회 에러:", error)

    throw new Error(error.response.data.message || ERROR_MESSAGES.GENERIC_ERROR)
  }
}

export default getFriendList
