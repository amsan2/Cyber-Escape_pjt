import API_PATH from "@/constants/path"
import api from "@/services/api"

interface PostInviteRequestProps {
  roomUuid: string
  userUuid: string
}

// 친구 초대하기
const postInvite = async (
  data: PostInviteRequestProps,
): Promise<NullResponseProps> => {
  try {
    const response = await api.post<NullResponseProps>(
      API_PATH.GAME.MULTI.ROOM.INVITE,
      data,
    )
    if (response.status === 400) {
      throw new Error(`오류: ${response.data.message}`)
    }
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default postInvite
