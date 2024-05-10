import API_PATH from "@/constants/path"
import api from "@/services/api"


interface PostFriendRequestBodyProps {
  status: number
  message: string
  data: string
}

// interface PostFriendRequestDataProps {
//   response: string
// }

// 친구 신청
const postFriendRequest = async (
  receiverUuid: string,
  aim : string
): Promise<string> => {
  // 리턴값
    const accessToken = sessionStorage.getItem("access_token")
  try {
      const response = await api.post<PostFriendRequestBodyProps>(
        // 서버에서 받는 데이터
      API_PATH.MAIN.FRIEND.REQUEST,
      {
        receiverUuid,
        aim,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    )
    if (response.data.status === 400) {
      throw new Error(`오류: ${response.data.message}`)
    }
    return response.data.data;
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default postFriendRequest
