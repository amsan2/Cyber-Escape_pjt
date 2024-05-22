import api from "@/services/api"
import API_PATH from "@/constants/path"
import ERROR_MESSAGES from "@/constants/errorMessages"

// 친구 수락
const postFriendAddition = async (toUserUuid: string): Promise<null> => {
  try {
    const response = await api.post<NullResponseProps>(
      API_PATH.MAIN.FRIEND.ADDITION,
      {
        toUserUuid,
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
    console.error("친구 수락 에러:", error)

    throw new Error(error.response.data.message || ERROR_MESSAGES.GENERIC_ERROR)
  }
}

export default postFriendAddition
