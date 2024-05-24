// 공통 제외 컴포넌트 관련 인터페이스

interface LoginProps {
  handleLoginback: () => void // 로그인 페이지에서 뒤로가기를 눌렀을 경우
}

interface AuthFormProps {
  mainText: string
  buttonText: string
  loginId: string
  password: string
  setLoginId: (id: string) => void
  setPassword: (password: string) => void
  onBack: () => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

interface InvitationItemProps {
  notification: GetNotificationListDataProps
  onAccept: (roomUuid: string, notificationId: string) => void
  onDeny: (notificationId: string) => void
}

interface FriendItemProps {
  friend: GetFriendListDataProps
  isDeleteMode: boolean
  onDelete: (friendUuid: string) => void
}

interface SearchResultItemProps {
  user: PostUserSearchDataProps
  onRequest: (userUuid: string) => void
}

interface NicknameSectionProps {
  isActiveChangeNickname: boolean
  nickname: string
  newNickname: string
  setNewNickname: (newNickname: string) => void
  setIsActiveChangeNickname: (isActive: boolean) => void
  handleNicknameSaveClick: () => void
  handleAutoNicknameClick: () => void
}

interface ProfileImageSectionProps {
  profileImg: string | undefined
  handleImgClick: () => void
  handleChangeImg: (e: React.ChangeEvent<HTMLInputElement>) => void
}

interface RankItemProps {
  user: RankData
}

interface RankData {
  rank: number
  profileUrl: string
  nickname: string
  bestTime: string
}

interface HomeProps {
  showText?: boolean // 배경만 쓸 건지 여부(showText가 false면 배경만 쓰겠다는 뜻)
}

interface CameraMoveToPositionRef {
  moveToPosition: (x: number, y: number, z: number) => void
}
