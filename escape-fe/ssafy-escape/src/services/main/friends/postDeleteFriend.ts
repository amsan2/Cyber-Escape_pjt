import api from "@/services/api"
import API_PATH from "@/constants/path"
import ERROR_MESSAGES from "@/constants/errorMessages"

// 친구 삭제
const postDeleteFriend = async (friendUuid: string): Promise<null> => {
  try {
    const response = await api.post<NullResponseProps>(
      API_PATH.MAIN.FRIEND.DELETE,
      { friendUuid },
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
    console.error("친구 삭제 에러:", error)

    throw new Error(error.response.data.message || ERROR_MESSAGES.GENERIC_ERROR)
  }
}

export default postDeleteFriend
