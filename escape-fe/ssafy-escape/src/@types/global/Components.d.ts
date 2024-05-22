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

interface ThemeSelectBoxProps {
  activeTheme: number
  handleThemeClick: (idx: number) => void
}