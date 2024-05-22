import api from "@/services/api"
import API_PATH from "@/constants/path"
import ERROR_MESSAGES from "@/constants/errorMessages"

// 받은 알림 리스트(친구 초대, 친구 요청)
const getNotificationList = async (): Promise<
  GetNotificationListDataProps[]
> => {
  try {
    const response = await api.get<GetNotificationListResponseProps>(
      API_PATH.MAIN.NOTIFICATION.LIST,
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
    console.error("알림 리스트 불러오기 에러:", error)

    throw new Error(error.response.data.message || ERROR_MESSAGES.GENERIC_ERROR)
  }
}

export default getNotificationList
