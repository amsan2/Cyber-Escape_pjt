import CustomAlert from "@/components/common/CustomAlert"
import ERROR_MESSAGES from "@/constants/errorMessages"

// 아이디 유효성 검사 함수
const idRegex = /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/
const CheckValidateId = (id: string): boolean => {
  if (!idRegex.test(id)) {
    CustomAlert({ title: ERROR_MESSAGES.AUTH.INVALID_ID_FORMAT })
    return false
  }
  return true
}

export default CheckValidateId
