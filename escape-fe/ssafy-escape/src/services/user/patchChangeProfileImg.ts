import api from "@/services/api"
import API_PATH from "@/constants/path"
import ERROR_MESSAGES from "@/constants/errorMessages"

// 프로필 사진 변경
const patchChangeProfileImg = async (
  file: File | undefined,
): Promise<string> => {
  if (file) {
    const formData = new FormData()
    formData.append("multipartFile", file) // 서버에서 받을 파라미터 이름: "multipartFile"
    try {
      const response = await api.patch<StringResponseProps>(
        API_PATH.MAIN.PROFILE_IMG_CHANGE,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
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
      console.error("프로필 이미지 변경 에러:", error)

      throw new Error(
        error.response.data.message || ERROR_MESSAGES.GENERIC_ERROR,
      )
    }
  }
  return "파일을 올려주세요."
}

export default patchChangeProfileImg
