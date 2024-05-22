// 세션 토큰 저장 함수
export const setSessionTokens = (accessToken: string, refreshToken: string) => {
  sessionStorage.setItem("access_token", accessToken)
  sessionStorage.setItem("refresh_token", refreshToken)
}

// 세션 토큰 제거 함수
export const removeSessionTokens = () => {
  sessionStorage.removeItem("access_token")
  sessionStorage.removeItem("refresh_token")
}

