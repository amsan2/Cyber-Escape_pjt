interface IngameState {
  penalty: number
  showFirstProblem: boolean
  showSecondProblem: boolean
  showThirdProblem: boolean
  subtitle: string
  interactNum: number
  result: string
  clearTime: string
  isGameFinished: boolean
  openHint: boolean
  isHintModalOpen: boolean
}

interface IngameAction {
  setPenalty: (penalty: number) => void
  setShowFirstProblem: (show: boolean) => void
  setShowSecondProblem: (show: boolean) => void
  setShowThirdProblem: (show: boolean) => void
  setSubtitle: (subtitle: string) => void
  setInteractNum: (num: number) => void
  setResult: (result: string) => void
  setClearTime: (time: string) => void
  setIsGameFinished: (finished: boolean) => void
  setOpenHint: (open: boolean) => void
  setIsHintModalOpen: (open: boolean) => void
}

interface IngameQuizState {
  solved: number
  hint: number
}

interface IngameQuizAction {
  setSolved: (solved: number) => void
  setHint: (hint: number) => void
  resetQuizState: () => void
}

interface ThemeState {
  selectedTheme: number
  selectedThemeType: "multi" | "single" | null
  roomTitle: string | null
  roomUuid: string | null
}

interface ThemeAction {
  setSelectedTheme: (theme: number) => void
  setSelectedThemeType: (theme: "multi" | "single" | null) => void
  setRoomTitle: (roomTitle: string) => void
  setRoomUuid: (roomUuid: string) => void
}

interface ModalState {
  isRequestModalOpen: boolean
  isDeleteMode: boolean
}

interface ModalAction {
  setIsRequestModalOpen: (isRequestModalOpen: boolean) => void
  setIsDeleteMode: (isDeleteMode: boolean) => void
  resetModalState: () => void
}

interface UserState {
  isLogin: boolean
  isHost: boolean
  userUuid: string
  nickname: string
  profileUrl: string
  accessToken: string | null
}

interface UserAction {
  setIsHost: (isHost: boolean) => void
  setNickname: (nickname: string) => void
  setProfileUrl: (profileUrl: string) => void
  setAccessToken: (accessToken: string | null) => void
  login: (loginId: string, password: string) => Promise<void>
  logout: () => Promise<void>
}
