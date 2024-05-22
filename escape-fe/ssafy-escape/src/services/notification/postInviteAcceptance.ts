import api from "@/services/api"
import API_PATH from "@/constants/path"
import ERROR_MESSAGES from "@/constants/errorMessages"


// 게임방 초대 수락
const postInviteAcceptance = async (
  roomUuid: string,
): Promise<PostAcceptanceDataProps> => {
  try {
    const response = await api.post<PostAcceptanceResponseProps>(
      API_PATH.MAIN.NOTIFICATION.ACCEPT,
      roomUuid,
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
    console.error("초대 수락 에러:", error)

    throw new Error(error.response.data.message || ERROR_MESSAGES.GENERIC_ERROR)
  }
}

export default postInviteAcceptance
