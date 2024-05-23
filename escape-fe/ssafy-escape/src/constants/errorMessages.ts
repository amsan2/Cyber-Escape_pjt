const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: "잘못된 요청입니다.",
  GENERIC_ERROR: "문제가 발생했습니다. 다시 시도해 주세요.",
  AUTH: {
    USER_NOT_FOUND: "사용자를 찾을 수 없습니다.",
    DUPLICATE_ID: "중복된 아이디입니다.",
    INVALID_ID_FORMAT:
      "아이디는 3~20자 사이 대소문자 또는 숫자만 입력해 주세요!",
    LOGOUT_FAILED: "로그아웃 실패!",
    INVALID_PASSWORD_FORMAT: "비밀번호 형식이 올바르지 않습니다.",
  },
  INVITATION: {
    ROOM_NOT_FOUND: "존재하지 않는 방입니다.",
  },
}

export default ERROR_MESSAGES
