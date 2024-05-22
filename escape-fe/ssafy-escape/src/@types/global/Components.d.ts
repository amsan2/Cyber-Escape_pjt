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
